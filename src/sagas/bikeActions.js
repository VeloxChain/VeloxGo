import { put, call, takeEvery, takeLatest, fork, select } from "redux-saga/effects";
import BIKES from "../constants/bikes";
import { createNewBike, transferBike, rentBike, returnBike, adjustBikePrice } from "../services/exchange";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
import _ from "lodash";
import moment from "moment";

import { get, post } from "../utils/fetch";

const delay = (ms) => new Promise(res => setTimeout(res, ms));
export const bikesState = (state) => state.bikes;
function* uploadNewBikeToIPFS(action) {
    yield put({type: "APP_LOADING_START"});
    let { bikeInfo, location, callBack, ethereum, keyStore, passphrase } = action.payload;
    let hashAvatar, hashInvoice;
    try {
        [hashAvatar, hashInvoice] = yield [ call(SERVICE_IPFS.putFileToIPFS, bikeInfo.imageData), call(SERVICE_IPFS.putFileToIPFS, bikeInfo.invoiceData)];
    } catch (e) {
        toast.error("Files size is too large!");
        yield put({type: "APP_LOADING_END"});
        return;
    }
    let bike = {
        avatar: hashAvatar,
        invoice: hashInvoice,
        snNumber: bikeInfo.snNumber ,
        manufacturer: bikeInfo.manufacturer,
        originalOwner: bikeInfo.owner,
        location: location,
        forRent: false,
        model: bikeInfo.model
    };
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bike);
    yield put({
        type: BIKES.FINISH_UPLOAD_TO_IPFS,
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
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, bikeInfo.originalOwner);
    let tx = yield call(createNewBike, bikeInfo.originalOwner, userProfileAddress, hashData, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;
    const bikes = yield select(bikesState);
    var latestToken = bikes.data.length;
    while (latestToken === bikes.data.length) {
        yield delay(2000);
        console.log("syncing bike..."); //eslint-disable-line
        latestToken = yield call(ethereum.ownerShipContract.balanceOf,userProfileAddress);
        latestToken = latestToken.toNumber();
    }
    latestToken = latestToken - 1;
    const url = "/api/newVehicle";
    let newVehicleData = yield call(post, url, {
        latestToken: latestToken,
        ownerAddress: userProfileAddress
    });
    yield put({
        type: BIKES.CREATE,
        payload: newVehicleData.data
    });
    yield put({type: "APP_LOADING_END"});
    yield call(callBack);
}

function* uploadModifiedBikeToIPFS(action) {
    yield put({type: "APP_LOADING_START"});
    const { bikeInfo, index, ethereum, keyStore, passphrase } = action.payload;
    let hashData = yield call(SERVICE_IPFS.putDataToIPFS, bikeInfo);
    yield put({
        type: BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS,
        payload: {
            bikeInfo: bikeInfo,
            hashData: hashData,
            ethereum: ethereum,
            keyStore: keyStore,
            passphrase: passphrase,
            index: index
        }
    });
}

function* loadUserBikeFromNetWork(action){
    const { address, ethereum } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    const url = `/api/getYourVehicle?ownerAddress=${userProfileAddress}`;
    let userVehicles = yield call(get, url);
    const { data } = userVehicles;
    yield put({
        type: BIKES.LOAD_OWNER_BIKES,
        payload: data
    });
}
function* loadNetworkBikeFromNetWork(action){
    yield put({type: "APP_LOADING_START", payload: "Loading vehicles from network...."});
    const { ethereum, address } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    yield fork(getRentingBike, userProfileAddress);
    const url = `/api/getNetworkVehicle?ownerAddress=${userProfileAddress}`;
    let networkVehicles = yield call(get, url);
    const { data } = networkVehicles;
    yield put({
        type: BIKES.LOAD_NETWORK_BIKE,
        payload: data
    });
    yield put({type: "APP_LOADING_END"});
}

function* transferBikeInNetwork(action) {
    yield put({type: "APP_LOADING_START"});
    const { address, addressTo, tokenId, ethereum, keyStore, passphrase, callBack } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(transferBike, address, userProfileAddress, addressTo, tokenId, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;
    const url = "/api/transferVehicle";
    yield call(post, url, {
        tokenId: tokenId,
        toOwnerAddress: addressTo,
        ownerAddress: userProfileAddress
    });
    yield put({
        type: BIKES.FINISH_TRANSFER,
        payload: tokenId
    });
    yield call(callBack);
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}

function* rentBikeAction(action) {
    yield put({type: "APP_LOADING_START", payload: "Booking vehicle......"});
    const { address, ethereum, keyStore, passphrase, bikeInfo } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let balanceOfBKC = yield call(ethereum.getBKCBalance, userProfileAddress);
    balanceOfBKC = parseInt(balanceOfBKC, 10);
    if (balanceOfBKC < 200) {
        yield put({type: "APP_LOADING_END"});
        toast.error("You should have at least 200 Velox to book a vehicle!");
        return;
    }
    let seconds = moment().unix();
    let tx = yield call(rentBike, address, userProfileAddress, bikeInfo.tokenId, seconds, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum, "Waiting For Approval.....");
    if (txStatus === false) return;

    const url = "/api/rentingVehicle";
    yield call(post, url, {
        tokenId: bikeInfo.tokenId,
        renter: userProfileAddress
    });

    yield put({
        type: BIKES.FINISH_RENT_BIKE,
        payload: {
            bikeInfo: bikeInfo,
            startTime: seconds
        }
    });
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}
function* getRentingBike(userProfileAddress) {
    const url = `/api/getRentingVehicle?renter=${userProfileAddress}`;
    let response = yield call(get, url);
    const { data } = response;
    if (data) {
        const { bikeInfo, startTime } = data;
        yield put({
            type: BIKES.FINISH_RENT_BIKE,
            payload: {
                bikeInfo: bikeInfo,
                startTime: startTime
            }
        });
    } else {
        yield put({ type: BIKES.FINISH_RETURN_BIKE });
    }
}
function* returnBikeAction(action) {
    yield put({type: "APP_LOADING_START", payload: "Processing Payment....."});
    yield delay(10000);
    const { address, tokenId, totalTime, ethereum, keyStore, passphrase, callBack } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(returnBike, address, userProfileAddress, tokenId, totalTime, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum, "Processing Payment.....");
    if (txStatus === false) return;
    const url = "/api/returnVehicle";
    yield call(post, url, {
        tokenId: tokenId,
        renter: userProfileAddress
    });
    yield call(callBack);
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}
function* adjustBikePriceAction(action) {
    yield put({type: "APP_LOADING_START"});
    const { address, tokenId, price, ethereum, keyStore, passphrase, callBack, forRent, index } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(adjustBikePrice, address, userProfileAddress, tokenId, price, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;

    const url = "/api/updatePrice";
    yield call(post, url, {
        tokenId: tokenId,
        price: price,
        ownerAddress: userProfileAddress,
    });

    yield put({
        type: BIKES.FINISH_ADJUST_BIKE_PRICE,
        payload: {
            index: index,
            forRent: forRent,
            price: price
        }
    });
    yield call(callBack);
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}

function* getTxStatus(tx, ethereum, txTitle) {
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
    yield put({type: "APP_LOADING_START", payload: tx.tx, txTitle: txTitle});
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

export function* watchBikes() {
    yield takeEvery(BIKES.UPLOAD_TO_IPFS, uploadNewBikeToIPFS);
    yield takeEvery(BIKES.FINISH_UPLOAD_TO_IPFS, finishUploadNewBikeToIPFS);
    yield takeEvery(BIKES.UPLOAD_MODIFIED_TO_IPFS, uploadModifiedBikeToIPFS);
    yield takeLatest(BIKES.USER_INIT, loadUserBikeFromNetWork);
    yield takeLatest(BIKES.NETWORK_INIT, loadNetworkBikeFromNetWork);
    yield takeLatest(BIKES.TRANSFER, transferBikeInNetwork);
    yield takeEvery(BIKES.RENT_BIKE, rentBikeAction);
    yield takeEvery(BIKES.RETURN_BIKE, returnBikeAction);
    yield takeEvery(BIKES.ADJUST_BIKE_PRICE, adjustBikePriceAction);
}
