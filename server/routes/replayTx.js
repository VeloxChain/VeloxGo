var WalletManager = require("../lib/wallet");

let walletManager = new WalletManager(
    process.env.TXRELAY_MNEMONIC,
    process.env.HTTPP_ROVIDER,
    process.env.CHAIN_ID,
    process.env.TXRELAY_ADDRESS
);

module.exports = function (app) {
    app.post("/api/relayTx", function (req, res) {
        let p = req.body;
        walletManager.replayTXTransaction(p).then((result)=>{
            return res.json({ 
                tx: result.txHash,
                status: "success",
                data: {
                    tx: result.txHash,
                },
                code: 200
            });
        }).catch((error) => {
            console.log("error", error); //eslint-disable-line
            return res.json({ 
                e: error ,
                status: "error",
                code: 400,
                message: error
            });
        });
    });
    app.post("/api/collectToken", async (req, res) => {
        walletManager.collectToken(req.body.address).then((result)=>{
            return res.json({ 
                tx: result.txHash,
                status: "success",
                data: {
                    tx: result.txHash,
                },
                code: 200
            });
        }).catch((error) => {
            console.log("error", error); //eslint-disable-line
            return res.json({ 
                e: error ,
                status: "error",
                code: 400,
                message: error
            });
        });
    });
};
