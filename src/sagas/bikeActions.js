import { put, call, takeEvery, all, fork, take} from "redux-saga/effects";
import BIKES from "../constants/bikes";
import { createNewBike, updateBike } from "../services/exchange";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
import _ from "lodash";
const delay = (ms) => new Promise(res => setTimeout(res, ms));
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
    console.log(tx);
    if (tx === false && _.isUndefined(tx.tx)) {
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
function* finishUploadModifiedBikeToIPFS(action) {
    const { bikeInfo, hashData, index, ethereum, keyStore, passphrase } = action.payload;
    let tx = yield call(updateBike, bikeInfo.owner, hashData, ethereum, keyStore, passphrase);
    if (tx === false) {
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
        type: BIKES.UPDATE,
        payload: {bikeInfo: bikeInfo, index: index, hashData: hashData}
    });
    yield put({type: "APP_LOADING_END"});
    toast.success("Saved!");
}

function* loadBikeFromNetWork(){
    const action = yield take(BIKES.INIT);
    const { address, ethereum } = action.payload;
    let ownerBikes = [];
    let networkBikes = [];
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let bikeTokens = yield call(ethereum.networkAdress.getBikeTokens);
    let userBikeTokens = yield call(ethereum.userProfileContract.at(userProfileAddress).getBikeTokens);
    userBikeTokens = JSON.parse("[" + userBikeTokens + "]");
    bikeTokens = JSON.parse("[" + bikeTokens + "]");
    let anotherBikes = _.difference(userBikeTokens, bikeTokens);
    let ownerHashs = yield all(userBikeTokens.map((value) => {
        return call(ethereum.ownerShipContract.tokenURI, value);
    }));
    let bikeOwnerDatas = yield all(ownerHashs.map((value) => {
        return call(SERVICE_IPFS.getDataFromIPFS, value);
    }));
    let anotherHashs = yield all(anotherBikes.map((value) => {
        return call(ethereum.ownerShipContract.tokenURI, value);
    }));
    let anotherBikesData = yield all(anotherHashs.map((value) => {
        return call(SERVICE_IPFS.getDataFromIPFS, value);
    }));
    _.forEach(bikeOwnerDatas, (value) => {
        value = JSON.parse(value);
        ownerBikes.push(value);
        networkBikes.push(value);
    });
    _.forEach(anotherBikesData, (value) => {
        value = JSON.parse(value);
        networkBikes.push(value);
    });
    yield put({type: BIKES.LOAD_BIKES, payload:ownerBikes, networkBikes: networkBikes});
}

export function* watchBikes() {
    yield takeEvery(BIKES.UPLOAD_TO_IPFS, uploadNewBikeToIPFS);
    yield takeEvery(BIKES.FINISH_UPLOAD_TO_IPFS, finishUploadNewBikeToIPFS);
    yield takeEvery(BIKES.UPLOAD_MODIFIED_TO_IPFS, uploadModifiedBikeToIPFS);
    yield takeEvery(BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS, finishUploadModifiedBikeToIPFS);
    yield fork(loadBikeFromNetWork);
}
