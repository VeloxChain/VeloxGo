import { put, call, takeEvery} from "redux-saga/effects";
import BIKES from "../constants/bikes";
// import * as service from "../services/accounts";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
function* uploadNewBikeToIPFS(action) {
    let { bikeInfo, location } = action.payload;
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
        isLost: false
    };
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bike);
    yield put({
        type: BIKES.CREATE,
        payload: {bikeInfo: bike, hashData: hashData}
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
    yield takeEvery(BIKES.UPLOAD_MODIFIED_TO_IPFS, uploadModifiedBikeToIPFS);
}
