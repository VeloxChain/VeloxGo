import { put, call, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/globalActions";
import GLOBAL from "../constants/globalActions";

function* getLatestBlock(action) {
    const ethereum = action.payload;
    const block = yield call(ethereum.getLatestBlockPromise, ethereum);
    yield put(actions.updateBlockComplete(block));
}

export function* watchGlobal() {
    yield takeEvery(GLOBAL.NEW_BLOCK_INCLUDED_PENDING, getLatestBlock);
}
