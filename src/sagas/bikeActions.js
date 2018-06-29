import { put, call, takeEvery} from "redux-saga/effects";
import BIKES from "../constants/bikes";
import { createNewBike } from "../services/exchange";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
const delay = (ms) => new Promise(res => setTimeout(res, ms));
function* uploadNewBikeToIPFS(action) {
    let { bikeInfo, location, callBack, ethereum, keyStore, passphrase } = action.payload;
    yield put({type: "APP_LOADING_START"});
    let [hashAvatar, hashInvoice] = yield [ call(SERVICE_IPFS.putFileToIPFS, bikeInfo.imageData), call(SERVICE_IPFS.putFileToIPFS, bikeInfo.invoiceData)];
    let bike = {
        avatar: hashAvatar,
        invoice: hashInvoice,
        snNumber: bikeInfo.snNumber ,
        manufacturer: bikeInfo.manufacturer,
        owner: bikeInfo.owner,
        year: 2018,
        location: location,
        status: "ACTIVE",
        forRent: false,
        bikeAddress: "0x0000000000000000000000000000000000000000",
        isLocked: false,
        isFlash: false,
        isHonk: false,
        isLock: false,
    };
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bike);
    yield put({
        type: BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS,
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
    let tx = yield call(createNewBike, bikeInfo.owner, hashData, ethereum, keyStore, passphrase);
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
    yield call(callBack);
    yield put({
        type: BIKES.CREATE,
        payload: {
            bikeInfo: bikeInfo,
            hashData: hashData,
        }
    });


}

function* uploadModifiedBikeToIPFS(action) {
    const { bikeInfo, index } = action.payload;
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bikeInfo);
    yield put({
        type: BIKES.UPDATE,
        payload: {bikeInfo: bikeInfo, index: index, hashData: hashData}
    });
    toast.success("Saved!");
}


export function* watchBikes() {
    yield takeEvery(BIKES.UPLOAD_TO_IPFS, uploadNewBikeToIPFS);
    yield takeEvery(BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS, finishUploadNewBikeToIPFS);
    yield takeEvery(BIKES.UPLOAD_MODIFIED_TO_IPFS, uploadModifiedBikeToIPFS);
}
