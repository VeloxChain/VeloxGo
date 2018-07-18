var Web3 = require("web3");
var Transaction = require("ethereumjs-tx");
const {
    EthHdWallet
} = require("eth-hd-wallet");
var BinaryTreeServices = require("./binaryTreeServices");
var storeService = require("./storeService");
var _ = require("lodash");
var menenomic = require("../constants/menenomic");

let web3 = null;


class WalletManager {
    constructor(numberOfWallet, menenomic, providerAddress){
        this.totalNode = numberOfWallet;
        this.totalToken = 0;
        this.txAvgFee = 0;
        this.tokenForOneNode= 0;
        this.countTemp = 0;
        
        web3 = new Web3(new Web3.providers.HttpProvider(providerAddress));
        const hdWallet = EthHdWallet.fromMnemonic(menenomic);
        hdWallet.generateAddresses(numberOfWallet);
        let listSigningWalletAddress = hdWallet._children.map((child) => {
            return {
                address: "0x" + child.wallet.getAddress().toString("hex"),
                privateKey: child.wallet.getPrivateKey()
            }
        });
        this.binaryTreeServices = new BinaryTreeServices(listSigningWalletAddress);
    }

    transferTo(to, ethAmount, wallet, callBack) {
        const nonce = web3.eth.getTransactionCount(wallet.address);
        const txParams = {
            from: wallet.address,
            to: to,
            value:ethAmount*Math.pow(10,18),
            nonce: nonce,
            gasPrice: 20000000000,
            gasLimit: 2100000,
            chainId: 5777,
        };
        const tx = new Transaction(txParams);
        tx.sign(wallet.privateKey);
    
        var raw = "0x" + tx.serialize().toString("hex");
        web3.eth.sendRawTransaction(raw, (e, r) => {
            callBack(e, r);
        });
    }

    traverseBinaryDataForTransferToken() {
        let countTemp = 0;
        let traverseBinaryDataForTransfer = (root) => {
            if(++countTemp == this.binaryTreeServices.getLeafCount(this.binaryTreeServices.root)) {
                console.log("\n==========================================\n")
                this.traverseBinaryDataForGetBalance();
            }
        
            if (root.left) {
                let NumberOfSubNode = this.binaryTreeServices.getLeafCount(root.left);
                this.transferTo(root.left.val.address, this.tokenForOneNode*NumberOfSubNode + this.txAvgFee*(NumberOfSubNode-1), root.val, (error, tx) => {
                    console.log(error, tx);
                    if (tx) {
                        if (root.right) {
                            NumberOfSubNode = this.binaryTreeServices.getLeafCount(root.right);
                            this.transferTo(root.right.val.address, this.tokenForOneNode*NumberOfSubNode + this.txAvgFee*(NumberOfSubNode-1), root.val, (error, tx) => {
                                console.log(error, tx);
                                if (tx) {
                                    traverseBinaryDataForTransfer(root.left);
                                    traverseBinaryDataForTransfer(root.right);
                                }                
                            })
                        } else {
                            traverseBinaryDataForTransfer(root.left);
                        }
                    }                
                })
            } else {
                if (root.right) {
                    let NumberOfSubNode = this.binaryTreeServices.getLeafCount(root.right);
                    this.transferTo(root.right.val.address, this.tokenForOneNode*NumberOfSubNode + this.txAvgFee*(NumberOfSubNode-1), root.val, (error, tx) => {
                        console.log(error, tx);
                        if (tx) {
                            traverseBinaryDataForTransfer(root.right);
                        }                
                    })
                }
            }        
        };

        traverseBinaryDataForTransfer(this.binaryTreeServices.root)
    }

    traverseBinaryDataForGetBalance() {
        let getBalance = (root) => {
            let balance = web3.eth.getBalance(root.val.address);
            console.log(`Balance of ${root.val.address}  ----->  ${web3.fromWei(balance)}`);
        
            if (root.left) {
                getBalance(root.left);
            } 
            
            if (root.right) {
                getBalance(root.right);
            }
        }
        getBalance(this.binaryTreeServices.root)
    };

    sendTokenToAllWalletOnLocal(totalToken){
        this.totalToken = totalToken;
        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: this.binaryTreeServices.root.val.address,
            value: web3.toWei(totalToken)
        }, (e, r) => {
            if(e) {
                console.log(e);
                return;
            }

            let tx = web3.eth.getTransactionReceipt(r);
            this.txAvgFee = parseFloat(web3.fromWei(tx.gasUsed*20000000000));
            this.tokenForOneNode = this.totalToken/this.totalNode - this.txAvgFee*(this.totalToken-1)/this.totalToken;
            this.traverseBinaryDataForTransferToken()
        });
    }

    async getAvailableWallet(ethAmount = 0) {
        let listWalletFromStore = await storeService.getDataFromStore();

        return new Promise(async (resolve, reject) => {
            let countLoop = 0;
            let getAvailableNode = (root) => {
                if(++countLoop == this.totalNode) {
                    resolve(null);
                }
                
                if(root.val != null && !_.find(listWalletFromStore, {address: root.val.address})) {
                    let balance = web3.eth.getBalance(root.val.address);
                    if (web3.fromWei(balance.toNumber()) >= ethAmount) {
                        resolve(root.val);
                    }
                }

                if (root.left) {
                    getAvailableNode(root.left);
                }
                if (root.right) {
                    getAvailableNode(root.right);
                }
            };

            getAvailableNode(this.binaryTreeServices.root);
        });
    }
}

//=================Test=================
// let walletManager = new WalletManager(5, menenomic, "http://localhost:7545");
// walletManager.sendTokenToAllWalletOnLocal(10);

// walletManager.getAvailableWallet(3.999665).then((result) => {
//     console.log('result', result);
// }).catch((err) => {
//     console.log('err', err);
// });
//=================End Test=================

module.exports = WalletManager;

