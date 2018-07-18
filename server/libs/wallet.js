var Web3 = require("web3");
var Transaction = require("ethereumjs-tx");
const {
    EthHdWallet
} = require("eth-hd-wallet");
var BinaryTreeServices = require("./binaryTreeServices");
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

    traverseBinaryDataForTransferToken(root) {
        this.countTemp = 0;
        this.traverseBinaryDataForTransfer(root);
    }

    traverseBinaryDataForTransfer(root) {
        if(++this.countTemp == this.binaryTreeServices.getLeafCount(this.binaryTreeServices.root)) {
            this.traverseBinaryDataForGetBalance(this.binaryTreeServices.root);
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
                                this.traverseBinaryDataForTransfer(root.left);
                                this.traverseBinaryDataForTransfer(root.right);
                            }                
                        })
                    } else {
                        this.traverseBinaryDataForTransfer(root.left);
                    }
                }                
            })
        } else {
            if (root.right) {
                let NumberOfSubNode = this.binaryTreeServices.getLeafCount(root.right);
                this.transferTo(root.right.val.address, this.tokenForOneNode*NumberOfSubNode + this.txAvgFee*(NumberOfSubNode-1), root.val, (error, tx) => {
                    console.log(error, tx);
                    if (tx) {
                        this.traverseBinaryDataForTransfer(root.right);
                    }                
                })
            }
        }        
    };

    traverseBinaryDataForGetBalance(root) {
        let balance = web3.eth.getBalance(root.val.address);
        console.log("Balance: "+ web3.fromWei(balance));
    
        if (root.left) {
            this.traverseBinaryDataForGetBalance(root.left);
        } 
        
        if (root.right) {
            this.traverseBinaryDataForGetBalance(root.right);
        }
    };

    sendTokenToAllWallet(totalToken){
        this.totalToken = totalToken;
        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: this.binaryTreeServices.root.val.address,
            value: web3.toWei(totalToken)
        }, (e, r) => {
            console.log(e,r);
            let tx = web3.eth.getTransactionReceipt(r);
            this.txAvgFee = parseFloat(web3.fromWei(tx.gasUsed*20000000000));
            this.tokenForOneNode = this.totalToken/this.totalNode - this.txAvgFee*(this.totalToken-1)/this.totalToken;
            this.traverseBinaryDataForTransferToken(this.binaryTreeServices.root)
        });
    }

    sendTokenToAllWalletOnLocal(totalToken){
        this.totalToken = totalToken;
        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: this.binaryTreeServices.root.val.address,
            value: web3.toWei(totalToken)
        }, (e, r) => {
            console.log(e,r);
            let tx = web3.eth.getTransactionReceipt(r);
            this.txAvgFee = parseFloat(web3.fromWei(tx.gasUsed*20000000000));
            this.tokenForOneNode = this.totalToken/this.totalNode - this.txAvgFee*(this.totalToken-1)/this.totalToken;
            this.traverseBinaryDataForTransferToken(this.binaryTreeServices.root)
        });
    }

    getRootWalletAddress() {
        return this.binaryTreeServices.root.val.address;
    }

    sendTokenToAllWallet(totalToken, txAvgFee) {
        this.totalToken = totalToken;
        this.txAvgFee = txAvgFee;
        this.traverseBinaryDataForTransferToken(this.binaryTreeServices.root)
    }
}

//Test
// let walletManager = new WalletManager(10, "frost mimic deer annual build develop discover split rose gather ahead gloom", "https://ropsten.infura.io/faF0xSQUt0ezsDFYglOe");
// walletManager.sendTokenToAllWallet(9, 0.000021);
// walletManager.sendTokenToAllWalletOnLocal(10);
//0x2578314766afa317e921981e05b5337b02ef8d10

module.exports = WalletManager;

