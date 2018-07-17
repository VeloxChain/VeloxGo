var Web3 = require("web3");
var Transaction = require("ethereumjs-tx");
const { EthHdWallet } = require("eth-hd-wallet");
const TXRELAYABI = require("./TXRELAYABI.json");
const bikeToken = require("./bikeToken.json");
var Datastore = require('nedb')
const _ = require('lodash');
var BinaryTreeServices = require('../libs/binaryTreeServices')

var db = new Datastore({ filename: 'data_store/datafile.json', autoload : true});

db.loadDatabase(function (err, ddd) {    // Callback is optional
    if(err) {
        console.log("DB connection fail");
    }
});

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/faF0xSQUt0ezsDFYglOe"));

let TXRELAY = web3.eth.contract(TXRELAYABI);
let TXRELAYAddress = "0x20f2f0eb661db8c8e52e3b5bca64bb80c8838afa";
let BIKE_TOKEN_CONTRACT = web3.eth.contract(bikeToken).at("0x4c9aa6ca9cbc1fa4b3b5c68ea32c247d7b060b32");
const hdWallet = EthHdWallet.fromMnemonic("frost mimic deer annual build develop discover split rose gather ahead gloom");
hdWallet.generateAddresses(10);
const { wallet } = hdWallet._children[0];

let listSigningWalletAddress = hdWallet._children.map((child) => {
    return {
        address: "0x" + child.wallet.getAddress().toString("hex"),
        privateKey: child.wallet.getPrivateKey()
    }
});

function saveDataToStore(data) {
    return new Promise((resolve, reject) => {
        db.insert(data, function (err, newDocs) {
            if(err) {
                reject({err});
            }
            resolve(newDocs);
        });
    });
}

function getDataFromStore(condition = {}) {
    return new Promise((resolve, reject) => {
        db.find(condition, function (err, docs) {
            if(err) {
                reject({err});
            }
            resolve(docs);
        });
    });
}

function removeDataFromStore(condition) {
    return new Promise((resolve, reject) => {
        db.remove(condition, function (err, numRemoved) {
            if(err) {
                reject({err});
            }
            resolve(numRemoved);
        });
    });
}

function getAvailableWallet() {
    return new Promise((resolve, reject) => {
        getDataFromStore().then(function(wallets){
            _.forEach(listSigningWalletAddress, function(wallet) {
                if(!_.find(wallets, {address: wallet.address})){
                    resolve(wallet);
                }
            });
            reject(null);
        }).catch(function(){
            reject(null);
        })
    });
}

let binaryTreeServices = new BinaryTreeServices(listSigningWalletAddress);
console.log('--------------------------------------------------');

function traverseBinaryData(root) {

    if (root.val) {
        console.log(root.val);

        // Chuyen tien cho nay
                
    }

    if (root.left) {
        traverseBinaryData(root.left);
    } 
    if (root.right) {
        traverseBinaryData(root.right);
    }
};



traverseBinaryData(binaryTreeServices.root);
console.log('--------------------------------------------------');

module.exports = function (app) {
    app.post("/api/relayTx", async function (req, res) {
        let signingWallet = await getAvailableWallet();
        if(_.isEmpty(signingWallet)) {
            return res.json({ error: "No wallet is available"});
        }

        saveDataToStore({address: signingWallet.address});

        let p = req.body;
        let txRelay = TXRELAY.at(TXRELAYAddress);
        let txRelayData = txRelay.relayMetaTx.getData(p.v, p.r, p.s, p.dest, p.data, 0, { from: signingWallet.address});

        web3.eth.getTransactionCount(signingWallet.address, (e, r) => {
            if(e) {
                removeDataFromStore({address: signingWallet.address});
                return res.json({ error: e});
            }
    
            console.log("Nonce: ", r); // eslint-disable-line
            const nonce = r;
            const txParams = {
                from: signingWallet.address,
                to: TXRELAYAddress,
                value: 0,
                nonce: nonce,
                gasPrice: 100000000000,
                gasLimit: 2000000,
                data: txRelayData,
                chainId: 3 /* see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md */
            };

            const tx = new Transaction(txParams);

            tx.sign(signingWallet.privateKey);

            var raw = "0x" + tx.serialize().toString("hex");

            web3.eth.sendRawTransaction(raw, (e, r) => {
                if(e) {
                    removeDataFromStore({address: signingWallet.address});
                    return res.json({ error: e});
                }

                let txHash = r;
                console.log(e, txHash); // eslint-disable-line

                removeDataFromStore({address: signingWallet.address});
                return res.json({ error: e, tx: txHash });
            });
        });
    });
    app.post("/api/collectToken", async (req, res) => {
        let signingWallet = await getAvailableWallet();
        if(_.isEmpty(signingWallet)) {
            return res.json({ error: "No wallet is available"});
        }

        saveDataToStore({address: signingWallet.address});

        let from = signingWallet.address;
        let to = req.body.address;
        let amount = 200000000000000000000;
        let txData = BIKE_TOKEN_CONTRACT.transfer.getData(to, amount, { from: from });
        const nonce = web3.eth.getTransactionCount(from);
        const txParams = {
            from: from,
            to: BIKE_TOKEN_CONTRACT.address,
            value: 0,
            nonce: nonce,
            gasPrice: 50000000000,
            gasLimit: 2100000,
            data: txData,
            chainId: 3,
        };
        const tx = new Transaction(txParams);
        tx.sign(signingWallet.privateKey);

        var raw = "0x" + tx.serialize().toString("hex");

        web3.eth.sendRawTransaction(raw, (e,r) => {
            if(e) {
                removeDataFromStore({address: signingWallet.address});
                return res.json({ error: e});
            }
        
            let txHash = r;
            console.log(e, txHash); // eslint-disable-line

            removeDataFromStore({address: signingWallet.address});
            return res.json({ error: e, tx: txHash });
        });
    });
};
