import Account from "../services/account";
import Token from "../services/token";
import {REHYDRATE} from "redux-persist/constants";
import ACC_ACTION from "../constants/accActions";
import IMPORT_KEY from "../constants/importKeyStoreActions";
import USER_PROFILE from "../constants/userProfile";
import _ from "lodash";
const initState = {
    accounts: {},
    newAccountAdding: false,
    isLogout: false
};

const accounts = (state=initState, action) => {
    var newAccounts, newAcc, address, account, newAddedAcc,oldAccounts,order,field,accountArr;
    switch (action.type) {
    case REHYDRATE: {
        if (action.payload.accounts) {
            var loadedAccounts = action.payload.accounts.accounts;
            if (_.isEmpty(loadedAccounts)) {
                return {
                    ...state,
                    isLogout: true
                };
            }
            var acc = new Account(
                loadedAccounts.address,
                loadedAccounts.key,
                loadedAccounts.name,
                loadedAccounts.description,
                loadedAccounts.balance,
                loadedAccounts.nonce,
                loadedAccounts.tokens,
                loadedAccounts.manualNonce,
                loadedAccounts.joined,
                loadedAccounts.wallet,
                loadedAccounts.walletCreationTx,
            );
            var newTokens = {};
            Object.keys(acc.tokens).forEach((address) => {
                var token = acc.tokens[address];
                newTokens[token.address] = new Token(
                    token.name,
                    token.icon,
                    token.symbol,
                    token.address,
                    acc.address,
                    token.balance,
                );
            });
            acc.tokens = newTokens;
            var accounts = acc;
            var newState = {...state, accounts: accounts, deleteAccount : action.payload.accounts?action.payload.accounts.deleteAccount:"", isLogout:false};
            return newState;
        }

        return {
            ...state,
            isLogout: true
        };
    }
    case ACC_ACTION.JOINING_NEXTID_WALLET: {
        newAccounts = {...state.accounts};
        newAcc = newAccounts[action.payload.account.address].shallowClone();
        newAcc.walletCreationTx = action.payload.hash;
        newAccounts[newAcc.address] = newAcc;
        return {...state, accounts: newAccounts};
    }
    case ACC_ACTION.JOINED_NEXTID_WALLET: {
        newAccounts = {...state.accounts};
        newAcc = newAccounts[action.payload.address].shallowClone();
        newAcc.wallet = action.payload.contractAddress;
        newAcc.joined = true;
        newAccounts[newAcc.address] = newAcc;
        return {...state, accounts: newAccounts};
    }
    case ACC_ACTION.LOAD_ACCOUNTS: {
        return {...state, accounts: action.payload};
    }
    case ACC_ACTION.UPDATE_ACCOUNT_FULFILLED: {
        newAccounts = {...state.accounts};
        newAcc = newAccounts[action.payload.address].shallowClone();
        newAcc.balance = action.payload.balance;
        newAcc.nonce = action.payload.nonce;
        newAcc.manualNonce = action.payload.manualNonce;
        newAcc.tokens = action.payload.tokens;
        newAccounts[newAcc.address] = newAcc;
        return {...state, accounts: newAccounts};
    }
    case ACC_ACTION.INC_MANUAL_NONCE_ACCOUNT: {
        newAccounts = {...state.accounts};
        address = action.payload;
        account = newAccounts[address];
        account = account.incManualNonce();
        newAccounts[address] = account;
        return {...state,
            accounts: newAccounts};
    }
    case ACC_ACTION.DELETE_ACCOUNT: {
        newAccounts = {...state.accounts};
        address = action.payload;
        delete(newAccounts[address]);
        return {...state, accounts: newAccounts};
    }
    case ACC_ACTION.ADD_DELETE_ACCOUNT: {
        address = action.payload;
        return {...state, deleteAccount: address};
    }
    case ACC_ACTION.NEW_ACCOUNT_CREATED_FULFILLED: {
        newAddedAcc = action.payload;
        return {...state, newAccountCreating: false, accounts: newAddedAcc};
    }
    case ACC_ACTION.NEW_ACCOUNT_CREATED_PENDING: {
        return {...state, newAccountCreating: true, isLogout: false};
    }
    case ACC_ACTION.NEW_ACCOUNT_ADDED_FULFILLED: {
        newAddedAcc = action.payload;
        return {...state, newAccountAdding: false, accounts: newAddedAcc};
    }
    case ACC_ACTION.NEW_ACCOUNT_ADDED_PENDING: {
        return {...state, newAccountAdding: true, ...action.payload, isLogout: false};
    }
    case ACC_ACTION.MODIFY_ACCOUNT:{
        newAccounts = {...state.accounts};
        address = action.payload.address;
        newAccounts[address].name = action.payload.name;
        return {...state, accounts: newAccounts};
    }
    case ACC_ACTION.SORT_ACCOUNT_BY_FIELD:{
        oldAccounts = {...state.accounts};
        order = action.payload.order;
        field = action.payload.field;
        accountArr = [];
        _.forEach(Object.keys(oldAccounts), (keyName) => {
            accountArr.push(oldAccounts[keyName]);
        });
        if (order === "ASC"){
            accountArr.sort(function(a,b) {return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0);} );
        }else{
            accountArr.sort(function(a,b) {return (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0);} );
        }
        newAccounts = {};
        for(var i = 0; i < accountArr.length; i++){
            newAccounts[accountArr[i].address] = accountArr[i];
        }
        return {...state, accounts: newAccounts};
    }
    case IMPORT_KEY.ACCOUNT_KEY_UPLOADED: {
        return {
            ...state,
            isLogout: false
        };
    }
    case USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE: {
        return {
            ...state,
            isLogout: false
        };
    }
    case ACC_ACTION.LOG_OUT:
        return {
            ...state,
            accounts: {},
            isLogout: true
        };
    default:
        return state;
    }
};

export default accounts;
