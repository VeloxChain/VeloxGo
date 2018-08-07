const _ = require("lodash");
const abiDecoder = require("abi-decoder");
var util = require("ethereumjs-util");

const MetaNANJCOINManager = require("../../assets/json/MetaNANJCOINManager.json");
const NanJABI = require("../../assets/json/NanJABI.json");

abiDecoder.addABI(MetaNANJCOINManager);
abiDecoder.addABI(NanJABI);

class ReplayTXParser {
    constructor(replayTXData){
        this.replayTXData = replayTXData;

        this.deCodedReplayTXData = this.decodeMetaTx();
    }

    getWalletDataFromRawMetaSignedTxData(encodedDataSignedTxData) {
        let rawMetaSignedTxDataTransaction = {};

        if(_.isEmpty(encodedDataSignedTxData)) {
            return rawMetaSignedTxDataTransaction;
        }

        const decodedDataSignedTxData = abiDecoder.decodeMethod(encodedDataSignedTxData);

        if(_.isEmpty(decodedDataSignedTxData)) {
            return rawMetaSignedTxDataTransaction;
        }

        let toAddress = _.find(decodedDataSignedTxData.params, { name : "_to" });
        rawMetaSignedTxDataTransaction.to = _.isEmpty(toAddress) ? null: toAddress.value;

        let valueTransaction = _.find(decodedDataSignedTxData.params, {name : "_value" });
        rawMetaSignedTxDataTransaction.value = _.isEmpty(valueTransaction) ? null: valueTransaction.value;

        return rawMetaSignedTxDataTransaction;
    }

    getDataFromRawMetaSignedTxData() {
        let rawMetaSignedTxDataTransaction = {};

        if(_.isEmpty(this.replayTXData.data)) {
            return rawMetaSignedTxDataTransaction;
        }

        const decodedData = abiDecoder.decodeMethod(this.replayTXData.data);

        if(_.isEmpty(decodedData)) {
            return rawMetaSignedTxDataTransaction;
        }

        let senderAddress = _.find(decodedData.params, { name : "sender" });

        if(_.isEmpty(senderAddress)) {
            senderAddress = _.find(decodedData.params, { name : "owner" });
        }

        rawMetaSignedTxDataTransaction.senderAddress = _.isEmpty(senderAddress) ? null: senderAddress.value;

        let walletAddress = _.find(decodedData.params, { name : "wallet" });
        rawMetaSignedTxDataTransaction.walletAddress = _.isEmpty(walletAddress) ? null: walletAddress.value;

        let destination = _.find(decodedData.params, {name : "destination" });
        rawMetaSignedTxDataTransaction.destination =  _.isEmpty(destination) ? null: destination.value;

        let encodedDataSignedTxData = _.find(decodedData.params, {name : "data" });
        encodedDataSignedTxData =  _.isEmpty(encodedDataSignedTxData) ? null: encodedDataSignedTxData.value;
        let walletDataFromRawMetaSignedTxData = this.getWalletDataFromRawMetaSignedTxData(encodedDataSignedTxData);

        return {
            ...rawMetaSignedTxDataTransaction,
            ...walletDataFromRawMetaSignedTxData
        };
    }

    getTypeOfReplayTX(){
        if(_.isEmpty(this.replayTXData.data)) {
            return "";
        }

        let decodedReplayTXData = abiDecoder.decodeMethod(this.replayTXData.data);

        if( _.isEmpty(decodedReplayTXData)) {
            return "";
        }

        let typeOfReplayTX = _.find(MetaNANJCOINManager, {name: decodedReplayTXData.name});

        return _.isEmpty(typeOfReplayTX)? "" : typeOfReplayTX.name;
    }

    decodeMetaTx(){
        let decodedMetaTx = {};

        decodedMetaTx.v = _.toNumber(this.replayTXData.v);
        decodedMetaTx.r = Buffer.from(util.stripHexPrefix(this.replayTXData.r), "hex");
        decodedMetaTx.s = Buffer.from(util.stripHexPrefix(this.replayTXData.s), "hex");
        decodedMetaTx.to = util.stripHexPrefix(this.replayTXData.dest);
        decodedMetaTx.data = util.stripHexPrefix(this.replayTXData.data);
        decodedMetaTx.whitelistOwner = "0000000000000000000000000000000000000000";
        decodedMetaTx.claimedAddress = "0x" + decodedMetaTx.data.slice(32, 72);
        decodedMetaTx.transactionData = this.getDataFromRawMetaSignedTxData();

        return decodedMetaTx;
    }
}

module.exports = ReplayTXParser;

