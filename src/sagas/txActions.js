import { put, call, takeEvery } from "redux-saga/effects";
import {updateTxComplete} from "../actions/txActions";
// import {deployPrimaryDataOnUserProfileCompleted} from "../actions/userProfileActions";
import TX from "../constants/txActions";
// import { addNewFacet, shareData, revokeShare, reShareData } from '../actions/facetActions';
// import _ from "lodash";
// import ServerService from "../services/server";

function* updateTx(action) {

    const {tx, ethereum} = action.payload;
    const newTx = yield call(tx.sync, ethereum, tx);

    // if (newTx.type=="revoke facet" && !_.isEmpty(newTx.hash) && newTx.status === 'mined') {
    //   let data = newTx.data
    //   let paramsRevoke = data.extraData;
    //   yield put(revokeShare(data.facetIndex, paramsRevoke))
    // }

    yield put(updateTxComplete(newTx));
}

export function* watchTx() {
    yield takeEvery(TX.UPDATE_TX_PENDING, updateTx);
}
