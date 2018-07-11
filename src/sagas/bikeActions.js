import { put, call, takeEvery, takeLatest, fork, select } from "redux-saga/effects";
import BIKES from "../constants/bikes";
import { createNewBike, transferBike } from "../services/exchange";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
import _ from "lodash";
const delay = (ms) => new Promise(res => setTimeout(res, ms));
export const bikesState = (state) => state.bikes;
function* uploadNewBikeToIPFS(action) {
    yield put({type: "APP_LOADING_START"});
    let { bikeInfo, location, callBack, ethereum, keyStore, passphrase } = action.payload;
    let hashAvatar, hashInvoice;
    try {
        [hashAvatar, hashInvoice] = yield [ call(SERVICE_IPFS.putFileToIPFS, bikeInfo.imageData), call(SERVICE_IPFS.putFileToIPFS, bikeInfo.invoiceData)];
    } catch (e) {
        toast.error("Files size is too large!");
        yield put({type: "APP_LOADING_END"});
        return;
    }
    let bike = {
        avatar: hashAvatar,
        invoice: hashInvoice,
        snNumber: bikeInfo.snNumber ,
        manufacturer: bikeInfo.manufacturer,
        originalOwner: bikeInfo.owner,
        year: 2018,
        location: location,
        status: "ACTIVE",
        forRent: false,
        isLocked: false,
        isFlash: false,
        isHonk: false,
        isLock: false,
    };
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bike);
    yield put({
        type: BIKES.FINISH_UPLOAD_TO_IPFS,
        payload: {
            bikeInfo: bike,
            hashData: hashData,
            callBack: callBack,
            ethereum: ethereum,
            keyStore: keyStore,
            passphrase: passphrase
        }
    });
}

function* finishUploadNewBikeToIPFS(action) {
    const { bikeInfo, hashData, callBack, ethereum, keyStore, passphrase } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, bikeInfo.originalOwner);
    let tx = yield call(createNewBike, bikeInfo.originalOwner, userProfileAddress, hashData, ethereum, keyStore, passphrase);
    if  (tx.error === true) {
        toast.error(tx.msg);
        yield put({type: "APP_LOADING_END"});
        return;
    }
    if (tx === false || _.isUndefined(tx.tx)) {
        toast.error("Transaction failed!.");
        yield put({type: "APP_LOADING_END"});
        return;
    }
    yield put({type: "APP_LOADING_START", payload: tx.tx});
    var res = null;
    while (res === null) {
        yield delay(2000);
        yield call(ethereum.rpc.eth.getTransactionReceipt, tx.tx, (error, txData) => {
            res = txData;
        });
        console.log("syncing..."); //eslint-disable-line
    }
    if (res.status === "0x0") {
        yield put({type: "APP_LOADING_END"});
        toast.error("Transaction failed!.");
        return;
    }
    const bikes = yield select(bikesState);
    var latestToken = bikes.data.length;
    while (latestToken === bikes.data.length) {
        yield delay(2000);
        console.log("syncing bike..."); //eslint-disable-line
        latestToken = yield call(ethereum.ownerShipContract.balanceOf,userProfileAddress);
        latestToken = latestToken.toNumber();
    }
    latestToken = latestToken - 1;
    let tokenIndex = yield call(ethereum.ownerShipContract.tokenOfOwnerByIndex, userProfileAddress, latestToken);
    tokenIndex = parseInt(tokenIndex.toString());
    let hash = yield call(ethereum.ownerShipContract.tokenURI, tokenIndex);
    yield fork(getDataFromBikeHash, hash, tokenIndex, "owner");
    yield put({type: "APP_LOADING_END"});
    yield call(callBack);
}

function* uploadModifiedBikeToIPFS(action) {
    yield put({type: "APP_LOADING_START"});
    const { bikeInfo, index, ethereum, keyStore, passphrase } = action.payload;
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bikeInfo);
    yield put({
        type: BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS,
        payload: {
            bikeInfo: bikeInfo,
            hashData: hashData,
            ethereum: ethereum,
            keyStore: keyStore,
            passphrase: passphrase,
            index: index
        }
    });
}
// function* finishUploadModifiedBikeToIPFS(action) {
//     const { bikeInfo, hashData, index, ethereum, keyStore, passphrase } = action.payload;
//     let tx = yield call(updateBike, bikeInfo.owner, hashData, ethereum, keyStore, passphrase);
//     if  (tx.error === true) {
//         toast.error(tx.msg);
//         yield put({type: "APP_LOADING_END"});
//         return;
//     }
//     if (tx === false || _.isUndefined(tx.tx)) {
//         toast.error("Transaction failed!.");
//         yield put({type: "APP_LOADING_END"});
//         return;
//     }
//     yield put({type: "APP_LOADING_START", payload: tx.tx});
//     var res = null;
//     while (res === null) {
//         yield delay(2000);
//         yield call(ethereum.rpc.eth.getTransactionReceipt, tx.tx, (error, txData) => {
//             res = txData;
//         });
//         console.log("syncing..."); //eslint-disable-line
//     }
//     if (res.status === "0x0") {
//         yield put({type: "APP_LOADING_END"});
//         toast.error("Transaction failed!.");
//         return;
//     }
//
//     yield put({
//         type: BIKES.UPDATE,
//         payload: {bikeInfo: bikeInfo, index: index, hashData: hashData}
//     });
//     yield put({type: "APP_LOADING_END"});
//     toast.success("Saved!");
// }

function* loadUserBikeFromNetWork(action){
    yield put({type: "APP_LOADING_START", payload: "Loading your bikes from network....."});
    yield delay(500);
    const { address, ethereum } = action.payload;
    const bikes = yield select(bikesState);
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let totalTokens = yield call(ethereum.ownerShipContract.balanceOf,userProfileAddress);
    totalTokens = totalTokens.toNumber();
    if (totalTokens === bikes.data.length) {
        yield put({type: "APP_LOADING_END"});
        return;
    }
    totalTokens = totalTokens - 1;
    yield call(loadHashFromUserToken, ethereum, totalTokens, userProfileAddress, bikes);
    yield put({type: "APP_LOADING_END"});
}
function* loadNetworkBikeFromNetWork(action){
    yield put({type: "APP_LOADING_START", payload: "Loading bikes from network....."});
    yield delay(500);
    const { ethereum } = action.payload;
    const bikes = yield select(bikesState);
    let totalTokens = yield call(ethereum.ownerShipContract.totalSupply);
    totalTokens = totalTokens.toNumber();
    if (totalTokens === bikes.network.length) {
        yield put({type: "APP_LOADING_END"});
        return;
    }
    totalTokens = totalTokens - 1;
    yield call(loadHashFromNetworkToken, ethereum, totalTokens, bikes.loaded);
    yield put({type: "APP_LOADING_END"});
}

function* loadHashFromUserToken(ethereum, totalTokens, userProfileAddress, bikes) {
    for (var key=0; key <= totalTokens; key++) {
        let tokenIndex = yield call(ethereum.ownerShipContract.tokenOfOwnerByIndex, userProfileAddress, key);
        tokenIndex = tokenIndex.toNumber();
        if (_.isUndefined(_.find(bikes.data, (bike) => bike.tokenId == tokenIndex))) {
            let hash = yield call(ethereum.ownerShipContract.tokenURI, tokenIndex);
            yield fork(getDataFromBikeHash, hash, tokenIndex, "owner");
        }
    }
}
function* loadHashFromNetworkToken(ethereum, totalTokens, loaded) {
    for (var key=0; key <= totalTokens; key++) {
        let tokenIndex = yield call(ethereum.ownerShipContract.tokenByIndex, key);
        tokenIndex = tokenIndex.toNumber();
        if (loaded.includes(tokenIndex) === false) {
            let hash = yield call(ethereum.ownerShipContract.tokenURI, tokenIndex);
            yield fork(getDataFromBikeHash, hash, tokenIndex, "network");
        }
    }
}
function* getDataFromBikeHash(hash, tokenId, dataOf) {
    let bikeData = yield call(SERVICE_IPFS.getDataFromIPFS, hash);
    bikeData = JSON.parse(bikeData);
    bikeData.tokenId = parseInt(tokenId);
    if (dataOf === "network") {
        yield put({
            type: BIKES.LOAD_NETWORK_BIKE,
            payload: bikeData
        });
        return;
    }
    yield put({
        type: BIKES.LOAD_OWNER_BIKES,
        payload: bikeData
    });
}

function* transferBikeInNetwork(action) {
    yield put({type: "APP_LOADING_START"});
    const { address, addressTo, tokenId, ethereum, keyStore, passphrase, callBack } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(transferBike, address, userProfileAddress, addressTo, tokenId, ethereum, keyStore, passphrase);
    if  (tx.error === true) {
        toast.error(tx.msg);
        yield put({type: "APP_LOADING_END"});
        return;
    }
    if (tx === false || _.isUndefined(tx.tx)) {
        toast.error("Transaction failed!.");
        yield put({type: "APP_LOADING_END"});
        return;
    }
    yield put({type: "APP_LOADING_START", payload: tx.tx});
    var res = null;
    while (res === null) {
        yield delay(2000);
        yield call(ethereum.rpc.eth.getTransactionReceipt, tx.tx, (error, txData) => {
            res = txData;
        });
        console.log("syncing..."); //eslint-disable-line
    }
    if (res.status === "0x0") {
        yield put({type: "APP_LOADING_END"});
        toast.error("Transaction failed!.");
        return;
    }

    yield put({
        type: BIKES.FINISH_TRANSFER,
        payload: tokenId
    });
    yield call(callBack);
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}
export function* watchBikes() {
    yield takeEvery(BIKES.UPLOAD_TO_IPFS, uploadNewBikeToIPFS);
    yield takeEvery(BIKES.FINISH_UPLOAD_TO_IPFS, finishUploadNewBikeToIPFS);
    yield takeEvery(BIKES.UPLOAD_MODIFIED_TO_IPFS, uploadModifiedBikeToIPFS);
    // yield takeEvery(BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS, finishUploadModifiedBikeToIPFS);
    yield takeLatest(BIKES.USER_INIT, loadUserBikeFromNetWork);
    yield takeLatest(BIKES.NETWORK_INIT, loadNetworkBikeFromNetWork);
    yield takeEvery(BIKES.TRANSFER, transferBikeInNetwork);
}
