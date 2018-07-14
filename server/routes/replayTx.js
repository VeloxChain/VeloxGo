var Web3 = require("web3");
var Transaction = require("ethereumjs-tx");
const { EthHdWallet } = require("eth-hd-wallet");
const TXRELAYABI = require("./TXRELAYABI.json");
const bikeToken = require("./bikeToken.json");

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/faF0xSQUt0ezsDFYglOe"));

let TXRELAY = web3.eth.contract(TXRELAYABI);
let TXRELAYAddress = "0x37eff432ad7710c4b0ab7653db70824c791ac3aa";
let BIKE_TOKEN_CONTRACT = web3.eth.contract(bikeToken).at("0x4c9aa6ca9cbc1fa4b3b5c68ea32c247d7b060b32");
const hdWallet = EthHdWallet.fromMnemonic("frost mimic deer annual build develop discover split rose gather ahead gloom");
hdWallet.generateAddresses(1);
const { wallet } = hdWallet._children[0];
let signingWalletAddress = "0x" + wallet.getAddress().toString("hex");
console.log("signingWalletAddress " + signingWalletAddress); // eslint-disable-line
console.log("privateKey " + wallet.getPrivateKey().toString("hex")); // eslint-disable-line

module.exports = function (app) {
    app.post("/api/relayTx", function (req, res) {
        let p = req.body;
        let txRelay = TXRELAY.at(TXRELAYAddress);
        let txRelayData = txRelay.relayMetaTx.getData(p.v, p.r, p.s, p.dest, p.data, 0, { from: signingWalletAddress });

        web3.eth.getTransactionCount(signingWalletAddress, (e, r) => {
            console.log("Nonce: ", r); // eslint-disable-line
            const nonce = r;
            const txParams = {
                from: signingWalletAddress,
                to: TXRELAYAddress,
                value: 0,
                nonce: nonce,
                gasPrice: 100000000000,
                gasLimit: 1000000,
                data: txRelayData,
                chainId: 3 /* see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md */
            };

            const tx = new Transaction(txParams);

            tx.sign(wallet.getPrivateKey());

            var raw = "0x" + tx.serialize().toString("hex");

            web3.eth.sendRawTransaction(raw, (e, r) => {
                let txHash = r;
                console.log(e, txHash); // eslint-disable-line
                return res.json({ error: e, tx: txHash });
            });
        });
    });
    app.post("/api/collectToken", async (req, res) => {
        let from = signingWalletAddress;
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
        tx.sign(wallet.getPrivateKey());

        var raw = "0x" + tx.serialize().toString("hex");
        web3.eth.sendRawTransaction(raw, (e,r) => {
            let txHash = r;
            console.log(e, txHash); // eslint-disable-line
            return res.json({ error: e, tx: txHash });
        });
    });
};
