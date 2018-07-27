var Web3 = require("web3");
var Transaction = require("ethereumjs-tx");
var util = require("ethereumjs-util");
const { EthHdWallet } = require("eth-hd-wallet");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var leftPad = require("left-pad");
var solsha3 = require("solidity-sha3").default;

// var ReplayTXParser = require("./replayTXParser");
const TXRELAYABI = require("../config/TXRELAYABI.json");
const bikeToken = require("../config/bikeToken.json");

let web3 = null;

const TRANSACTION_TYPE = {
    transfer: "forwardTo"
};

class WalletManager {
    constructor(menenomic, providerAddress, chainId, TXRELAYAddress){
        this.chainId = _.toNumber(chainId);
        this.TXRELAYAddress = TXRELAYAddress;
        web3 = new Web3(new Web3.providers.HttpProvider(providerAddress));
        let TXRELAY = web3.eth.contract(TXRELAYABI);

        this.ERC223Contract = web3.eth.contract(bikeToken).at(process.env.BIKECOIN_TOKEN_ADDRESS);
        
        this.txRelay = TXRELAY.at(TXRELAYAddress);
        const hdWallet = EthHdWallet.fromMnemonic(menenomic);
        hdWallet.generateAddresses(1);
        
        this.signingWallet = {
            address: "0x" + hdWallet._children[0].wallet.getAddress().toString("hex"),
            privateKey: hdWallet._children[0].wallet.getPrivateKey()
        };

        console.log(this.signingWallet); //eslint-disable-line
    }

    getTransactionCount(address){
        return new Promise(async (resolve) => {
            web3.eth.getTransactionCount(address, "pending", (error, result) => {
                resolve({ error, result });
            });
        });
    }

    async getNonce(address) {
        let nonceCounter = 0;

        try {
            nonceCounter = fs.readFileSync(path.join(__dirname, "data_store/nonce_counter.json"), "utf8");
        } catch(e) {
            nonceCounter = 0;
        }

        nonceCounter = _.toNumber(nonceCounter);

        if(_.isNaN(nonceCounter) || nonceCounter == 0 ) {

            let resultGetTransactionCount = await this.getTransactionCount(address);

            if(resultGetTransactionCount.error) {
                return Promise.resolve({error: resultGetTransactionCount.error});
            }

            nonceCounter = resultGetTransactionCount.result;
        } else {
            ++nonceCounter;
        }

        return nonceCounter;
    }

    pad(n){
        let data;
        if (n.startsWith("0x")) {
            data = "0x" + leftPad(n.slice(2), "64", "0");
            return data;
        } else {
            data = "0x" + leftPad(n, "64", "0");
            return data;
        }
    }

    checkBalanceIsEnoughToTransfer(decodedMetaTx) {
        if(
            _.isEmpty(decodedMetaTx.transactionData) ||
            _.isEmpty(decodedMetaTx.transactionData.destination) ||
            _.isEmpty(decodedMetaTx.transactionData.to) ||
            _.isEmpty(decodedMetaTx.transactionData.value) ||
            _.isEmpty(decodedMetaTx.transactionData.walletAddress)
        ) {
            return false;
        }

        let contract = this.ERC223Contract.at(decodedMetaTx.transactionData.destination);

        let balanceOfWallet  = contract.balanceOf(decodedMetaTx.transactionData.walletAddress);
        balanceOfWallet = balanceOfWallet.toNumber();

        return balanceOfWallet > decodedMetaTx.transactionData.value * 1.01;
    }

    isMetaSignatureValid(decodedMetaTx, nonce, rawMetaSignedTx){

        var pubKey = util.ecrecover(Buffer.from(util.stripHexPrefix(rawMetaSignedTx.hash), "hex"), decodedMetaTx.v, decodedMetaTx.r, decodedMetaTx.s);

        var address = "0x" + util.pubToAddress(pubKey).toString("hex");

        return address === decodedMetaTx.claimedAddress;
    }

    async revertNonceWhenTxFail(address) {
        let resultGetTransactionCount = await this.getTransactionCount(address);

        if(address.error) {
            return;
        }

        fs.writeFileSync(path.join(__dirname, "data_store/nonce_counter.json"), resultGetTransactionCount.result, {encoding: "utf8"});
    }

    checkValidateNone(decodedMetaTx, rawMetaSignedTx) {
        if(
            _.isEmpty(decodedMetaTx.transactionData) ||
            _.isEmpty(decodedMetaTx.transactionData.senderAddress)
        ) {
            return false;
        }

        let relayNonce = this.txRelay.getNonce(decodedMetaTx.transactionData.senderAddress);

        let hashInput = "0x1900" + this.TXRELAYAddress.slice(2) + "0000000000000000000000000000000000000000" + this.pad(relayNonce.toNumber().toString("16")).slice(2)
            + rawMetaSignedTx.dest.slice(2) + rawMetaSignedTx.data.slice(2);
        
        let hash = solsha3(hashInput);

        return hash == rawMetaSignedTx.hash;
    }

    checkValidateParam(rawMetaSignedTx, nonceCounter) {
        if(_.isEmpty(rawMetaSignedTx)) {
            return "Bad request";
        }

        // let replayTXParser = new ReplayTXParser(rawMetaSignedTx);
        let replayTXParser= {};

        let typeOfReplayTX = replayTXParser.getTypeOfReplayTX();

        if(_.isEmpty(typeOfReplayTX)) {
            return "Not found type of transaction";
        }

        if(!this.isMetaSignatureValid(replayTXParser.deCodedReplayTXData, nonceCounter, rawMetaSignedTx)) {
            return "Invalid Signature";
        }

        if(typeOfReplayTX == TRANSACTION_TYPE.transfer) {
            if(!this.checkBalanceIsEnoughToTransfer(replayTXParser.deCodedReplayTXData, rawMetaSignedTx)) {
                return "Balance is not enough";
            }
        }

        if(!this.checkValidateNone(replayTXParser.deCodedReplayTXData, rawMetaSignedTx)) {
            return "Invalid Nonce";
        }

        return "";
    }

    async replayTXTransaction(rawMetaSignedTx) {
        try {
            let signingWallet = this.signingWallet;
            
            if(_.isEmpty(signingWallet)) {
                return Promise.reject("Not found wallet");
            }

            let nonceCounter = await this.getNonce(signingWallet.address);

            // let resultCheckValidateParam = this.checkValidateParam(rawMetaSignedTx, nonceCounter)
            // if(!_.isEmpty(resultCheckValidateParam)){
            //     return Promise.reject(resultCheckValidateParam);
            // }

            fs.writeFileSync(path.join(__dirname, "data_store/nonce_counter.json"), nonceCounter, {encoding: "utf8"});

            let txRelayData = this.txRelay.relayMetaTx.getData(rawMetaSignedTx.v, rawMetaSignedTx.r, rawMetaSignedTx.s, rawMetaSignedTx.dest, rawMetaSignedTx.data, 0, { from: signingWallet.address });        
            const tx = new Transaction({
                from: signingWallet.address,
                to: this.TXRELAYAddress,
                value: 0,
                nonce: nonceCounter,
                gasPrice: 50000000000,
                gasLimit: 2100000,
                data: txRelayData,
                chainId: this.chainId
            });

            tx.sign(signingWallet.privateKey);

            var raw = "0x" + tx.serialize().toString("hex");
            return new Promise((resolve, reject) => {
                web3.eth.sendRawTransaction(raw, (error, result) => {
                    if(error) {
                        this.revertNonceWhenTxFail(signingWallet.address);
                        reject(error);
                    }

                    web3.eth.getTransaction(result, (e, r) => {
                        if(_.isEmpty(r)) {
                            this.revertNonceWhenTxFail(signingWallet.address);
                        }
                    });

                    resolve({ txHash: result });
                });
            });
        } catch(e) {
            console.log("e, ex", e); //eslint-disable-line
            throw "Server internal error";
        }
    }

    async collectToken(receiverAddress){
        try {
            let signingWallet = this.signingWallet;
            
            if(_.isEmpty(signingWallet)) {
                return Promise.reject("Not found wallet");
            }

            let nonceCounter = await this.getNonce(signingWallet.address);

            // let resultCheckValidateParam = this.checkValidateParam(rawMetaSignedTx, nonceCounter)
            // if(!_.isEmpty(resultCheckValidateParam)){
            //     return Promise.reject(resultCheckValidateParam);
            // }

            fs.writeFileSync(path.join(__dirname, "data_store/nonce_counter.json"), nonceCounter, {encoding: "utf8"});

            let txRelayData = this.ERC223Contract.transfer.getData(receiverAddress, _.toNumber(process.env.BIKECOIN_TOKEN_COLLECT_VALUE), { from: signingWallet.address });

            const tx = new Transaction({
                from: signingWallet.address,
                to: this.ERC223Contract.address,
                value: 0,
                nonce: nonceCounter,
                gasPrice: 50000000000,
                gasLimit: 2100000,
                data: txRelayData,
                chainId: this.chainId
            });
    
            tx.sign(signingWallet.privateKey);

            var raw = "0x" + tx.serialize().toString("hex");
            return new Promise((resolve, reject) => {
                web3.eth.sendRawTransaction(raw, (error, result) => {
                    if(error) {
                        this.revertNonceWhenTxFail(signingWallet.address);
                        reject(error);
                    }

                    web3.eth.getTransaction(result, (e, r) => {
                        if(_.isEmpty(r)) {
                            this.revertNonceWhenTxFail(signingWallet.address);
                        }
                    });

                    resolve({ txHash: result });
                });
            });
        } catch(e) {
            console.log("e, ex", e); //eslint-disable-line
            throw "Server internal error";
        }
    }
}

module.exports = WalletManager;

