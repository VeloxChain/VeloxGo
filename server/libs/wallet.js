var Web3 = require("web3");
var Transaction = require("ethereumjs-tx");
const {
    EthHdWallet
} = require("eth-hd-wallet");

var BinaryTreeServices = require("./binaryTreeServices");

const menenomic = require("../constants/menenomic.js")

// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/faF0xSQUt0ezsDFYglOe"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const hdWallet = EthHdWallet.fromMnemonic(menenomic);
hdWallet.generateAddresses(10);

let listSigningWalletAddress = hdWallet._children.map((child) => {
    return {
        address: "0x" + child.wallet.getAddress().toString("hex"),
        privateKey: child.wallet.getPrivateKey()
    }
});

// for (var i = hdWallet._children.length - 1; i >= 0; i--) {
//     let a = hdWallet._children[i].wallet.getAddress().toString('hex');
//     console.log(a);
//     let balance = web3.eth.getBalance("0x"+a);
//     console.log(web3.fromWei(balance.toNumber()));
// }
// let wallet1 = hdWallet._children[9].wallet;
// let wallet2 = hdWallet._children[1].wallet;

function transferTo(to, ethAmount, wallet, callBack) {
    let from = wallet.address
    let balance = web3.eth.getBalance(from);
    console.log("---------------------------------")
    console.log("Balance: "+ web3.fromWei(balance.toNumber()));
    console.log("Value: "+ ethAmount);
    const nonce = web3.eth.getTransactionCount(from);
    console.log("from: " + from)
    console.log("to: " + to)
    console.log("---------------------------------")
    const txParams = {
        from: from,
        to: to,
        value: ethAmount,
        nonce: nonce,
        gasPrice: 1000000000,
        gasLimit: 2100000,
        // data: txData,
        chainId: 5777,
    };
    const tx = new Transaction(txParams);
    tx.sign(wallet.privateKey);

    var raw = "0x" + tx.serialize().toString("hex");
    web3.eth.sendRawTransaction(raw, (e, r) => {
        callBack(e, r);
    });
}


// function addressFromWallet(wallet) {
// 	return "0x"+wallet1.getAddress().toString('hex');
// }

// transferTo(addressFromWallet(wallet2),0.00001,wallet1);

let binaryTreeServices = new BinaryTreeServices(listSigningWalletAddress);

let tempCount = 1;

function traverseBinaryDataForTransfer(root, val) {
    if (root.left) {
        transferTo(root.left.val.address, (val-100000000000000000) / 2, root.val, (error, tx) => {
            console.log(error, tx);
            if (tx) {
                if (root.right) {
                    transferTo(root.right.val.address, (val-100000000000000000) / 2, root.val, (error, tx) => {
                        console.log(error, tx);
                        if (tx) {
                            traverseBinaryDataForTransfer(root.left, (val-100000000000000000) / 2);
                            traverseBinaryDataForTransfer(root.right, (val-100000000000000000) / 2);
                        }                
                    })
                } else {
                    traverseBinaryDataForTransfer(root.left, (val-100000000000000000) / 2);
                }
            }                
        })
    } else {
        if (root.right) {
            transferTo(root.right.val.address, (val-100000000000000000) / 2, root.val, (error, tx) => {
                console.log(error, tx);
                if (tx) {
                    traverseBinaryDataForTransfer(root.right, (val-100000000000000000) / 2);
                }                
            })
        }
    }        
};

web3.eth.sendTransaction({
    from: web3.eth.accounts[0],
    to: binaryTreeServices.root.val.address,
    value: web3.toWei(11)
}, function (e, r) {
    console.log(e,r);
    let balance = web3.eth.getBalance(binaryTreeServices.root.val.address);
    console.log("Balance: "+ web3.fromWei(balance));
    traverseBinaryDataForTransfer(binaryTreeServices.root, web3.toWei(11))
});
// console.log(web3.eth.getBalance(binaryTreeServices.root.val.address).toNumber());

// traverseBinaryDataForTransfer(binaryTreeServices.root);

// let signingWalletAddress = "0x" + wallet.getAddress().toString("hex");
// console.log("signingWalletAddress " + signingWalletAddress); // eslint-disable-line
// console.log("privateKey " + wallet.getPrivateKey().toString("hex")); // eslint-disable-line