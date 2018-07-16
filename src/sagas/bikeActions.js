import { put, call, takeEvery, takeLatest, fork, select } from "redux-saga/effects";
import BIKES from "../constants/bikes";
import { createNewBike, transferBike, rentBike, returnBike, adjustBikePrice } from "../services/exchange";
import { toast } from "react-toastify";
import SERVICE_IPFS from "../services/ipfs";
import _ from "lodash";
import moment from "moment";
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
    let tokenIndex = yield call(ethereum.ownerShipContract.tokenOfOwnerByIndex, userProfileAddress, latestToken);
    tokenIndex = parseInt(tokenIndex.toString());
    let hash = yield call(ethereum.ownerShipContract.tokenURI, tokenIndex);
    yield fork(getDataFromBikeHash, hash, tokenIndex, "owner");
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
    const bikes = yield select(bikesState);
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let totalTokens = yield call(ethereum.ownerShipContract.balanceOf,userProfileAddress);
    totalTokens = totalTokens.toNumber();
    if (totalTokens === bikes.data.length) {
        return;
    } else if (totalTokens < bikes.data.length) {
        yield put({type: BIKES.RESET_YOUR_BIKES});
    }
    totalTokens = totalTokens - 1;
    yield fork(loadHashFromUserToken, ethereum, totalTokens, userProfileAddress, bikes);
}
function* loadNetworkBikeFromNetWork(action){
    yield put({type: "APP_LOADING_START", payload: "Loading bikes from network...."});
    const { ethereum, address } = action.payload;
    let totalTokens = yield call(ethereum.ownerShipContract.totalSupply);
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    totalTokens = totalTokens.toNumber();
    totalTokens = totalTokens - 1;
    yield put({type: BIKES.RESET_NETWORK_BIKE});
    yield call(loadHashFromNetworkToken, ethereum, totalTokens, userProfileAddress);
    yield put({type: "APP_LOADING_END"});
}

function* loadHashFromUserToken(ethereum, totalTokens, userProfileAddress, bikes) {
    for (var key=0; key <= totalTokens; key++) {
        let tokenIndex = yield call(ethereum.ownerShipContract.tokenOfOwnerByIndex, userProfileAddress, key);
        tokenIndex = tokenIndex.toNumber();
        if (_.isUndefined(_.find(bikes.data, (bike) => bike.tokenId == tokenIndex))) {
            let hash = yield call(ethereum.ownerShipContract.tokenURI, tokenIndex);
            yield fork(getDataFromBikeHash, hash, tokenIndex, "owner", ethereum);
        } else {
            yield fork(getBikePrice, tokenIndex, ethereum, bikes, "user");
        }
    }
}
function* loadHashFromNetworkToken(ethereum, totalTokens, userProfileAddress) {
    for (var key=0; key <= totalTokens; key++) {
        let tokenIndex = yield call(ethereum.ownerShipContract.tokenByIndex, key);
        tokenIndex = tokenIndex.toNumber();
        let ownerOfToken = yield call(ethereum.ownerShipContract.ownerOf, tokenIndex);
        if (userProfileAddress !== ownerOfToken){
            let price = yield call(getBikePrice, tokenIndex, ethereum, null, null, true);
            if (price > 0) {
                let hash = yield call(ethereum.ownerShipContract.tokenURI, tokenIndex);
                yield fork(getDataFromBikeHash, hash, tokenIndex, "network", ethereum, price);
            }
        }
    }
}

function* getBikePrice(tokenId, ethereum, bikesReducer, type, isNew) {
    let price = yield call(ethereum.ownerShipContract.getBikeRentalPrice, tokenId);
    price = price.toNumber();
    price = parseInt(ethereum.rpc.fromWei(price));
    if (isNew) {
        return price;
    }
    let index;
    if (type === "network") {
        index = _.findIndex(bikesReducer.network, (bike) => bike.tokenId === tokenId);
    } else {
        index = _.findIndex(bikesReducer.data, (bike) => bike.tokenId === tokenId);
    }
    if (type === "network") {
        yield put({
            type: BIKES.GET_NETWORK_BIKE_PRICE,
            payload: {
                index: index,
                price: price
            }
        });
    } else {
        yield put({
            type: BIKES.GET_USER_BIKE_PRICE,
            payload: {
                index: index,
                price: price
            }
        });
    }
}

function* getDataFromBikeHash(hash, tokenId, dataOf, ethereum, price) {
    let bikeData = yield call(SERVICE_IPFS.getDataFromIPFS, hash);
    bikeData = JSON.parse(bikeData);
    bikeData.tokenId = parseInt(tokenId);
    if (_.isUndefined(price)) {
        price = yield call(getBikePrice, tokenId, ethereum, null, null, true);
    }
    bikeData.price = price;
    if (price > 0) {
        bikeData.forRent = true;
    } else {
        bikeData.forRent = false;
    }
    if (dataOf === "network") {
        yield put({
            type: BIKES.LOAD_NETWORK_BIKE,
            payload: bikeData
        });
        return;
    }
    yield put({
        type: BIKES.LOAD_OWNER_BIKES,
        payload: bikeData
    });
}

function* transferBikeInNetwork(action) {
    yield put({type: "APP_LOADING_START"});
    const { address, addressTo, tokenId, ethereum, keyStore, passphrase, callBack } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(transferBike, address, userProfileAddress, addressTo, tokenId, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;

    yield put({
        type: BIKES.FINISH_TRANSFER,
        payload: tokenId
    });
    yield call(callBack);
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}

function* rentBikeAction(action) {
    yield put({type: "APP_LOADING_START", payload: "Booking bike......"});
    const { address, ethereum, keyStore, passphrase, bikeInfo } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let balanceOfBKC = yield call(ethereum.getBKCBalance, userProfileAddress);
    balanceOfBKC = parseInt(balanceOfBKC);
    if (balanceOfBKC < 200) {
        yield put({type: "APP_LOADING_END"});
        toast.error("You should have at least 200 BKC to book a bike!");
        return;
    }
    let tx = yield call(rentBike, address, userProfileAddress, bikeInfo.tokenId, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;
    yield put({
        type: BIKES.FINISH_RENT_BIKE,
        payload: {
            bikeInfo: bikeInfo,
            startTime: moment().unix()
        }
    });
    yield put({type: "APP_LOADING_END"});
    toast.success("Success!");
}
function* returnBikeAction(action) {
    yield put({type: "APP_LOADING_START"});
    yield delay(10000);
    const { address, tokenId, totalTime, ethereum, keyStore, passphrase, callBack } = action.payload;
    let userProfileAddress = yield call(ethereum.networkAdress.getUserProfile, address);
    let tx = yield call(returnBike, address, userProfileAddress, tokenId, totalTime, ethereum, keyStore, passphrase);
    let txStatus = yield call(getTxStatus, tx, ethereum);
    if (txStatus === false) return;
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
