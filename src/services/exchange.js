// import { sealTxByKeystore } from "../utils/sealer";
// import { verifyNonce } from "../utils/validators";
// import store from "../store";
// import { doTransaction, doApprovalTransaction } from "../actions/exchangeFormActions";
import constants from "../services/constants";
// import Rate from "./rate";
import CryptoJS from "crypto-js";
import coder from "web3/lib/solidity/coder";
const leftPad = require("left-pad");
const solsha3 = require("solidity-sha3").default;
var utils = require("ethereumjs-util");
import { unlock } from "../utils/keys";

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

function signPayload(signingAddr, txRelay, whitelistOwner, destinationAddress, functionName, functionTypes, functionParams, privKey) {
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
    console.log(hashInput); //eslint-disable-line
    hash = solsha3(hashInput);
    sig = utils.ecsign(new Buffer(utils.stripHexPrefix(hash), "hex"), privKey);
    // sig = lightwallet.signing.signMsgHash(lw, keyFromPw, hash, signingAddr)
    retVal.r = "0x" + sig.r.toString("hex");
    retVal.s = "0x" + sig.s.toString("hex");
    retVal.v = sig.v;  //Q: Why is this not converted to hex?
    retVal.data = data;
    retVal.hash = hash;
    retVal.nonce = nonce;
    retVal.dest = destinationAddress;
    return retVal;
}

export const createNewUserProfile = async (address, ethereum, keyStore, password, isMetaMask) => {
    var privKey = "";
    if (isMetaMask) {
        privKey = unlock(keyStore, password, true);
    }
    let zeroAddress = "0x0000000000000000000000000000000000000000";
    let types = ["address"];
    let params = [address];
    let networkAddress = constants.NETWORK_ADDRESS;
    let txRelay = ethereum.relayTxContract;
    let p = await signPayload(address, txRelay, zeroAddress, networkAddress, "createUserProfile", types, params,privKey);
    callApiReplayTx(p);
};
const callApiReplayTx = (txData) => {
    console.log("TX Data", txData); // eslint-disable-line
    fetch("/api/relayTx", {
        method: "POST",
        body: JSON.stringify(txData),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then(
        (response) => {
            return response.json();
        })
        .then((responseJson) => {
            console.log('responseJson----->' , responseJson); // eslint-disable-line
        })
        .catch((error) => {
            console.log('error: ', error); // eslint-disable-line
        });
};
