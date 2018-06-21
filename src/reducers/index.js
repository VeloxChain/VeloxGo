import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import AppReducer from "./AppReducer";
import createKeyStore from "./createKeyStoreReducer";
import accounts from "./accountsReducer";
import global from "./globalReducer";
import connection from "./connectionReducer";
import importKeystore from "./importKeystoreReducer";
import txs from "./txsReducer";
import userProfile from "./userProfileReducer";


const rootReducer = combineReducers({
    AppReducer,
    accounts, global, txs, connection,
    importKeystore,
    createKeyStore,
    userProfile,
    router: routerReducer,
});

export default rootReducer;
