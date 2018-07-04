import { put, call, takeEvery, all, takeLatest, fork, select } from "redux-saga/effects";
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
    let [hashAvatar, hashInvoice] = yield [ call(SERVICE_IPFS.putFileToIPFS, bikeInfo.imageData), call(SERVICE_IPFS.putFileToIPFS, bikeInfo.invoiceData)];
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
    yield call(callBack);
    yield put({
        type: BIKES.CREATE,
        payload: {
            bikeInfo: bikeInfo,
            hashData: hashData,
        }
    });
    yield put({type: "APP_LOADING_END"});
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

function* loadBikeFromNetWork(action){
    const { address, ethereum } = action.payload;
    console.log("loading bike.....");
    const bikes = yield select(bikesState);
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let networkTokens = yield call(ethereum.networkAdress.getBikeTokens);
    let userBikeTokens = yield call(ethereum.userProfileContract.at(userProfileAddress).getBikeTokens);
    userBikeTokens = JSON.parse("[" + userBikeTokens + "]");
    networkTokens = JSON.parse("[" + networkTokens + "]");
    let loaddedUser = _.difference(networkTokens, bikes.loadded);
    let loaddedNetwork = _.difference(userBikeTokens, bikes.loadded);
    let isLoaddedUser = _.isEmpty(loaddedUser);
    let isLoaddedNetwork = _.isEmpty(loaddedNetwork);
    if (isLoaddedUser && isLoaddedNetwork) {
        return;
    }
    if (!isLoaddedUser) {
        yield fork(loadHashFromUserToken, ethereum, userBikeTokens);
    }
    if (!isLoaddedUser) {
        let differenceBike = _.difference(networkTokens, userBikeTokens);
        yield fork(loadHashFromNetworkToken, ethereum, differenceBike);
    }
    // let ownerHashs = yield all(userBikeTokens.map((value) => {
    //     return call(ethereum.ownerShipContract.tokenURI, value);
    // }));
    // let bikeOwnerDatas = yield all(ownerHashs.map((value) => {
    //     return call(SERVICE_IPFS.getDataFromIPFS, value);
    // }));
    // let anotherHashs = yield all(anotherBikes.map((value) => {
    //     return call(ethereum.ownerShipContract.tokenURI, value);
    // }));
    // let anotherBikesData = yield all(anotherHashs.map((value) => {
    //     return call(SERVICE_IPFS.getDataFromIPFS, value);
    // }));
    // _.forEach(bikeOwnerDatas, (value, index) => {
    //     value = JSON.parse(value);
    //     value.tokenId = userBikeTokens[index];
    //     ownerBikes.push(value);
    //     networkBikes.push(value);
    // });
    // _.forEach(anotherBikesData, (value, index) => {
    //     value = JSON.parse(value);
    //     value.tokenId = anotherBikes[index];
    //     networkBikes.push(value);
    // });
    // yield put({type: BIKES.LOAD_BIKES, payload:ownerBikes, networkBikes: networkBikes});
}

function* loadHashFromUserToken(ethereum, userBikeTokens) {
    for (const key in userBikeTokens) {
        let hash = yield call(ethereum.ownerShipContract.tokenURI, userBikeTokens[key]);
        yield fork(getDataFromBikeHash, hash, userBikeTokens[key], "owner");
    }
}
function* loadHashFromNetworkToken(ethereum, networkTokens) {
    for (const key in networkTokens) {
        let hash = yield call(ethereum.ownerShipContract.tokenURI, networkTokens[key]);
        yield fork(getDataFromBikeHash, hash, networkTokens[key], "network");
    }
}
function* getDataFromBikeHash(hash, tokenId, dataOf) {
    let bikeData = yield call(SERVICE_IPFS.getDataFromIPFS, hash);
    bikeData = JSON.parse(bikeData);
    bikeData.tokenId = tokenId;
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
    const { address, addressTo, tokenId, ethereum, keyStore, passphrase } = action.payload;
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

    // yield put({
    //     type: BIKES.UPDATE,
    //     payload: {bikeInfo: bikeInfo, index: index, hashData: hashData}
    // });
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}
export function* watchBikes() {
    yield takeEvery(BIKES.UPLOAD_TO_IPFS, uploadNewBikeToIPFS);
    yield takeEvery(BIKES.FINISH_UPLOAD_TO_IPFS, finishUploadNewBikeToIPFS);
    yield takeEvery(BIKES.UPLOAD_MODIFIED_TO_IPFS, uploadModifiedBikeToIPFS);
    // yield takeEvery(BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS, finishUploadModifiedBikeToIPFS);
    yield takeLatest(BIKES.INIT, loadBikeFromNetWork);
    yield takeEvery(BIKES.TRANSFER, transferBikeInNetwork);
}
