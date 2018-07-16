import { put, call, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/accountActions";
import ACC_ACTION from "../constants/accActions";
import * as service from "../services/accounts";
import { collectBikeToken } from "../services/exchange";
import { toast } from "react-toastify";
import _ from "lodash";
const delay = (ms) => new Promise(res => setTimeout(res, ms));
function* createNewAccount(action) {
    // console.log("Create new account......");
    const {address, keystring, name, desc} = action.payload;
    const account = yield call(service.newAccountInstance, address, keystring, name, desc);
    yield put(actions.createAccountComplete(account));
}

function* addNewAccount(action) {
    const {address, keystring, name, desc} = action.payload;
    const account = yield call(service.newAccountInstance, address, keystring, name, desc);
    yield put(actions.addAccountComplete(account));
}

function* updateAccount(action) {
    const {account, ethereum} = action.payload;
    const newAccount = yield call(account.sync, ethereum, account);
    yield put(actions.updateAccountComplete(newAccount));
}

function* collectToken(action) {
    yield put({type: "APP_LOADING_START"});
    const { address, ethereum, callBack } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(collectBikeToken, userProfileAddress);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;
    yield put({
        type: ACC_ACTION.FINISH_COLLECT_TOKEN,
    });
    if (!_.isUndefined(callBack)) {
        yield call(callBack, userProfileAddress);
    }
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}

function* getTxStatus(tx, ethereum) {
    if  (tx.error === true) {
        toast.error(tx.msg);
        yield put({type: "APP_LOADING_END"});
        return false;
    }
    if (tx === false || _.isUndefined(tx.tx)) {
        toast.error("Transaction failed!.");
        yield put({type: "APP_LOADING_END"});
        return false;
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
        return false;
    }
    return true;
}

export function* watchAccount() {
    yield takeEvery(ACC_ACTION.NEW_ACCOUNT_CREATED_PENDING, createNewAccount);
    yield takeEvery(ACC_ACTION.NEW_ACCOUNT_ADDED_PENDING, addNewAccount);
    yield takeEvery(ACC_ACTION.UPDATE_ACCOUNT_PENDING, updateAccount);
    yield takeEvery(ACC_ACTION.COLLECT_TOKEN, collectToken);
}
