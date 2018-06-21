import { fork, all } from "redux-saga/effects";
import { watchAccount } from "./accountActions";
import { watchGlobal } from "./globalActions";
import { watchTx } from "./txActions";

export default function* root() {
    yield all([
        fork(watchAccount),
        fork(watchGlobal),
        fork(watchTx)
    ]);
}
