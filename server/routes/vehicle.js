const dbInstance = require("../lib/Nedb");

module.exports = function (app) {
    app.get("/api/getYourVehicle", async (req, res) => {
        const { ownerAddress } = req.body;
        let yourVehicle = await dbInstance.find({owner: ownerAddress});
        return res.json({
            data: yourVehicle,
            status: 200
        });
    });
    app.get("/api/getNetworkVehicle", async (req, res) => {
        const { ownerAddress } = req.body;
        let networkVehicle = await dbInstance.find({
            $not: { owner: ownerAddress },
            forRent: true
        });
        return res.json({
            data: networkVehicle,
            status: 200
        });
    });

    app.post("/api/updateVehicle", async (req, res) => {
        const { tokenId, price } = req.body;
        await dbInstance.update(tokenId, {
            price: price,
            forRent: price > 0
        });
        return res.json({
            status: 200
        });
    });
};
