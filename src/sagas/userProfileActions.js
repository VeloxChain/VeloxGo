import { put, call, takeEvery} from "redux-saga/effects";
import USER_PROFILE from "../constants/userProfile";
import * as actions from "../actions/accountActions";
// import * as service from "../services/accounts";
import _ from "lodash";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
function* uploadProfileToIPFS(action) {
    let userInfo = action.payload;
    var isNewProfile = false;
    if (!_.isUndefined(userInfo.avatarData)) {
        isNewProfile = true;
        let resultPutFileToIPFS = yield call(SERVICE_IPFS.putFileToIPFS, userInfo.avatarData);
        userInfo["avatar"] = resultPutFileToIPFS;
        delete userInfo.avatarData;
    }
    let hashData = yield call (SERVICE_IPFS.putDataToIPFS, userInfo);
    if (isNewProfile) {
        yield put({
            type: USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE,
            payload: {userInfo: userInfo,hashData: hashData}
        });
    } else {
        yield put({
            type: USER_PROFILE.FINISH_UPLOAD_MODIFIED_PROFILE,
            payload: {userInfo: userInfo,hashData: hashData}
        });
    }

}

function* finishUploadNewProfileToIPFS(action) {
    const { payload } = action;
    localStorage.setItem("hash", payload.hashData);
    yield put(actions.addAccount(payload.userInfo.accountAddress, "", payload.userInfo.firstname + " " + payload.userInfo.lastname, ""));
    yield put({
        type: USER_PROFILE.CREATE,
        payload: {userProfile: payload.userInfo,hash: payload.hashData}
    });
}
function* finishUploadModifiedProfileToIPFS(action) {
    const { payload } = action;
    localStorage.setItem("hash", payload.hashData);
    yield put({
        type: USER_PROFILE.UPDATE,
        payload: {userProfile:payload.userInfo,hash: payload.hashData}
    });
    toast.success("Saved!");
}

export function* watchUserProfile() {
    yield takeEvery(USER_PROFILE.UPLOAD_PROFILE_TO_IPFS, uploadProfileToIPFS);
    yield takeEvery(USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE, finishUploadNewProfileToIPFS);
    yield takeEvery(USER_PROFILE.FINISH_UPLOAD_MODIFIED_PROFILE, finishUploadModifiedProfileToIPFS);
}
