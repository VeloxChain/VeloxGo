import constants from "../services/constants";
import _ from "lodash";
import { unlock } from "../utils/keys";
import CryptoJS from "crypto-js";
import coder from "web3/lib/solidity/coder";
const leftPad = require("left-pad");
const solsha3 = require("solidity-sha3").default;
var utils = require("ethereumjs-util");

//Left packs a (hex) string. Should probably use leftpad
function pad(n) {
    let data;
    if (n.startsWith("0x")) {
        data = "0x" + leftPad(n.slice(2), "64", "0");
        // assert.equal(data.length, 66, "packed incorrectly")
        return data;
    } else {
        data = "0x" + leftPad(n, "64", "0");
        // assert.equal(data.length, 66, "packed incorrectly")
        return data;
    }
}

function encodeFunctionTxData(functionName, types, args) {
    var fullName = functionName + "(" + types.join() + ")";
    var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8);
    var dataHex = "0x" + signature + coder.encodeParams(types, args);
    return dataHex;
}

function signPayload(signingAddr, txRelay, whitelistOwner, destinationAddress, functionName, functionTypes, functionParams, privKey, isMetamask, callBack) {
    if (functionTypes.length !== functionParams.length) {
        return; //should throw error
    }
    if (typeof (functionName) !== "string") {
        return; //should throw error
    }
    let nonce;
    // let blockTimeout;
    let data;
    let hashInput;
    let hash;
    let sig;
    let retVal = {};
    data = encodeFunctionTxData(functionName, functionTypes, functionParams);

    nonce = txRelay.getNonce.call(signingAddr);
    //Tight packing, as Solidity sha3 does
    hashInput = "0x1900" + txRelay.address.slice(2) + whitelistOwner.slice(2) + pad(nonce.toString("16")).slice(2)
    + destinationAddress.slice(2) + data.slice(2);
    // console.log(hashInput); //eslint-disable-line
    hash = solsha3(hashInput);
    let hexHashInput = new Buffer(utils.stripHexPrefix(hash), "hex");
    if (isMetamask) {
        window.web3.eth.sign(signingAddr, hash,(e,r)=> {
            if (e == undefined) {
                sig = utils.fromRpcSig(r);
                retVal.r = "0x" + sig.r.toString("hex");
                retVal.s = "0x" + sig.s.toString("hex");
                retVal.v = sig.v;
                retVal.data = data;
                retVal.hash = hash;
                retVal.nonce = nonce;
                retVal.dest = destinationAddress;
                callBack(retVal);
            } else {
                callBack(false);
            }
        });
    } else {
        sig = utils.ecsign(hexHashInput, privKey);
        retVal.r = "0x" + sig.r.toString("hex");
        retVal.s = "0x" + sig.s.toString("hex");
        retVal.v = sig.v;
        retVal.data = data;
        retVal.hash = hash;
        retVal.nonce = nonce;
        retVal.dest = destinationAddress;
        callBack(retVal);
    }
}

export const createNewUserProfile = async (address, ipfsHash ,ethereum, keyStore, password) => {
    console.log(address, ipfsHash); //eslint-disable-line
    let isMetamask = _.isUndefined(password) || password === "";
    let zeroAddress = "0x0000000000000000000000000000000000000000";
    let types = ["address", "string"];
    let params = [address, ipfsHash];
    let destinationAddress = constants.BIKECOIN_NETWORK_ADDRESS;
    let txRelay = ethereum.relayTxContract;
    var privKey = "";
    if (!isMetamask) {
        privKey = unlock(keyStore, password, true);
    }
    return new Promise( (resolve) => {
        signPayload(address, txRelay, zeroAddress, destinationAddress, "createUserProfile", types, params,privKey, isMetamask, (res) => {
            if (res === false) {
                resolve(res);
                return;
            }
            resolve(callApiReplayTx(res));
        });
    });
};
export const updateUserProfile = async (address, profileAddress, ipfsHash ,ethereum, keyStore, password) => {
    console.log(address, profileAddress, ipfsHash); //eslint-disable-line
    let isMetamask = _.isUndefined(password) || password === "";
    let updateUserProfileData = encodeFunctionTxData("setIPFSHash", ["string"], [ipfsHash]);
    let zeroAddress = "0x0000000000000000000000000000000000000000";
    let types = ["address", "address", "address", "uint256", "bytes", "bytes32"];
    let params = [address,profileAddress , constants.BIKECOIN_NETWORK_ADDRESS, 0, updateUserProfileData, "0x0"];
    let destinationAddress = constants.BIKECOIN_NETWORK_ADDRESS;
    let txRelay = ethereum.relayTxContract;
    var privKey = "";
    if (!isMetamask) {
        privKey = unlock(keyStore, password, true);
    }
    return new Promise( (resolve) => {
        signPayload(address, txRelay, zeroAddress, destinationAddress, "forwardTo", types, params,privKey, isMetamask, (res) => {
            if (res === false) {
                resolve(res);
                return;
            }
            resolve(callApiReplayTx(res));
        });
    });
};
export const createNewBike = async (address, ipfsHash ,ethereum, keyStore, password) => {
    console.log(address, ipfsHash); //eslint-disable-line
    let isMetamask = _.isUndefined(password) || password === "";
    let createNewBikeData = encodeFunctionTxData("create", ["string"], [ipfsHash]);
    let zeroAddress = "0x0000000000000000000000000000000000000000";
    let types = ["address", "address", "address", "uint256", "bytes", "bytes32"];
    let params = [address, constants.BIKECOIN_OWNER_SHIP_ADDRESS , , 0, createNewBikeData, "0x0"];
    let destinationAddress = constants.BIKECOIN_NETWORK_ADDRESS;
    let txRelay = ethereum.relayTxContract;
    var privKey = "";
    if (!isMetamask) {
        privKey = unlock(keyStore, password, true);
    }
    return new Promise( (resolve) => {
        signPayload(address, txRelay, zeroAddress, destinationAddress, "forwardTo", types, params,privKey, isMetamask, (res) => {
            if (res === false) {
                resolve(res);
                return;
            }
            resolve(callApiReplayTx(res));
        });
    });
};


const callApiReplayTx = (txData) => {
    console.log("TX Data", txData); // eslint-disable-line
    return fetch("/api/relayTx", {
        method: "POST",
        body: JSON.stringify(txData),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then(
        (response) => {
            return response.json();
        });
};
