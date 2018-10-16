const IPFS = require("../lib/ipfs");

module.exports = function (app) {
    app.get("/api/getDataFromIPFS", async (req, res) => {
        const { hash } = req.query;
        //get data from IPFS
        let IPFSData = await IPFS.getDataFromIPFS(hash);
        return res.json({
            status: 200,
            data: IPFSData
        });
    });
    app.post("/api/putDataToIPFS", async (req, res) => {
        const { data } = req.body;
        // put data to IPFS
        let IPFSHash = await IPFS.putDataToIPFS(data);
        return res.json({
            status: 200,
            hash: IPFSHash
        });
    });
    app.post("/api/putFileToIPFS", async (req, res) => {
        const { fileData } = req.body;
        // put file data to IPFS
        let IPFSHash = await IPFS.putFileToIPFS(fileData);
        return res.json({
            status: 200,
            hash: IPFSHash
        });
    });
};
