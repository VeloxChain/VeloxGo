import { put, call, takeEvery} from "redux-saga/effects";
import USER_PROFILE from "../constants/userProfile";
import ACC_ACTION from "../constants/accActions";
import { createNewUserProfile, updateUserProfile } from "../services/exchange";
// import * as service from "../services/accounts";
import _ from "lodash";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
const delay = (ms) => new Promise(res => setTimeout(res, ms));
function* uploadProfileToIPFS(action) {
    yield put({type: "APP_LOADING_START"});
    let userInfo = action.payload;
    let ethereum = userInfo.ethereum;
    let keyStore = userInfo.keyStore;
    let passphrase = userInfo.passphrase;
    let resultPutFileToIPFS;
    delete userInfo.ethereum;
    delete userInfo.keyStore;
    delete userInfo.passphrase;
    if (!_.isEmpty(userInfo.avatarData)) {
        try {
            resultPutFileToIPFS = yield call(SERVICE_IPFS.putFileToIPFS, userInfo.avatarData);
            userInfo["avatar"] = resultPutFileToIPFS;
            delete userInfo.avatarData;
        } catch (e) {
            toast.error("Files size is too large!");
            yield put({type: "APP_LOADING_END"});
            return;
        }

    } else {
        userInfo["avatar"] = "Qmdqv5Jo1R94WykcpPc1L2JJkfTAG8GUeNkgTuExaZ7g3m";
    }
    let hashData = yield call (SERVICE_IPFS.putDataToIPFS, userInfo);

    if (userInfo.isCreateNew) {
        yield put({
            type: USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE,
            payload: {userInfo: userInfo,hashData: hashData, ethereum: ethereum, keyStore: keyStore, passphrase: passphrase}
        });
    } else {
        yield put({
            type: USER_PROFILE.FINISH_UPLOAD_MODIFIED_PROFILE,
            payload: {userInfo: userInfo,hashData: hashData, ethereum: ethereum, keyStore: keyStore, passphrase: passphrase}
        });
    }

}

function* finishUploadNewProfileToIPFS(action) {
    const { payload } = action;
    let tx = yield call(createNewUserProfile, payload.userInfo.accountAddress, payload.hashData, payload.ethereum, payload.keyStore, payload.passphrase);
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
        yield call(payload.ethereum.rpc.eth.getTransactionReceipt, tx.tx, (error, txData) => {
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
        type:ACC_ACTION.NEW_ACCOUNT_ADDED_PENDING,
        payload: {
            address: payload.userInfo.accountAddress,
            keystring: payload.keyStore,
            name: payload.userInfo.firstname + " " + payload.userInfo.lastname,
            desc: "",
            userProfileAddress: "",
            publicKey: "",
            privateKey: ""
        }
    });
    yield put({
        type: USER_PROFILE.CREATE,
        payload: {userProfile: payload.userInfo,hash: payload.hashData}
    });
    yield put({type: "APP_LOADING_END"});
}
function* finishUploadModifiedProfileToIPFS(action) {
    const { payload } = action;
    let userProfileAddress = yield call(payload.ethereum.networkAdress.getUserProfile, payload.userInfo.accountAddress);
    let tx = yield call(updateUserProfile, payload.userInfo.accountAddress, userProfileAddress, payload.hashData, payload.ethereum, payload.keyStore, payload.passphrase);
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
        yield call(payload.ethereum.rpc.eth.getTransactionReceipt, tx.tx, (error, txData) => {
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
        type: USER_PROFILE.UPDATE,
        payload: {userProfile:payload.userInfo,hash: payload.hashData}
    });
    yield put({type: "APP_LOADING_END"});
    toast.success("Saved!");
}

function* retrieveUserProfile(action) {
    yield put({type: "APP_LOADING_START"});
    let { userProfileAddress, ethereum, userInfo } = action.payload;
    let ipfsHash = yield call(ethereum.userProfileContract.at(userProfileAddress).getIPFSHash);
    let retreiveUserProfile = yield call(SERVICE_IPFS.getDataFromIPFS, ipfsHash);
    retreiveUserProfile = JSON.parse(retreiveUserProfile);
    yield put({
        type:ACC_ACTION.NEW_ACCOUNT_ADDED_PENDING,
        payload: {
            address: userInfo.address,
            keystring: userInfo.keystring,
            name: userInfo.accountName,
            desc: userInfo.desc,
            userProfileAddress: "",
            publicKey: "",
            privateKey: ""
        }
    });
    yield put({
        type: USER_PROFILE.CREATE,
        payload: {userProfile: retreiveUserProfile,hash: ipfsHash}
    });
    yield put({type: "APP_LOADING_END"});
}

export function* watchUserProfile() {
    yield takeEvery(USER_PROFILE.UPLOAD_PROFILE_TO_IPFS, uploadProfileToIPFS);
    yield takeEvery(USER_PROFILE.CREATE_PROFILE_TO_IPFS, uploadProfileToIPFS);
    yield takeEvery(USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE, finishUploadNewProfileToIPFS);
    yield takeEvery(USER_PROFILE.FINISH_UPLOAD_MODIFIED_PROFILE, finishUploadModifiedProfileToIPFS);
    yield takeEvery(USER_PROFILE.RETRIEVE_PROFILE, retrieveUserProfile);
}
