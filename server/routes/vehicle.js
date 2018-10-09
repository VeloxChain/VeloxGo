const _ = require("lodash");
const dbInstance = require("../lib/Nedb");
const Web3 = require("web3");
const IPFS = require("../lib/ipfs");
require("dotenv").config();

const BIKECOIN_OWNER_SHIP_PROTOCOL_ABI = require("../../src/services/bikeCoinOwnerShipProtocol.json");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER));
const bikecoinOwnerShipProtocolContract = web3.eth.contract(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI).at(process.env.BIKECOIN_OWNER_SHIP_ADDRESS);
const whitelistAddress = "0x0000000000000000000000000000000000000000";

module.exports = function (app) {
    app.get("/api/getYourVehicle", async (req, res) => {
        const { ownerAddress } = req.query;
        let yourVehicle = await dbInstance.find({owner: ownerAddress});
        return res.json({
            data: yourVehicle,
            status: 200
        });
    });
    app.get("/api/getNetworkVehicle", async (req, res) => {
        const { ownerAddress } = req.query;
        let networkVehicle = await dbInstance.find({
            $not: { owner: ownerAddress },
            forRent: true,
            renter: whitelistAddress
        });
        return res.json({
            data: networkVehicle,
            status: 200
        });
    });

    app.get("/api/getRentingVehicle", async (req, res) => {
        const { renter } = req.query;
        let rentingVehicle = await dbInstance.findOne({
            renter: renter
        });

        if (_.isNull(rentingVehicle)) {
            return res.json({
                data: false,
                status: 200
            });
        }
        let startTime = bikecoinOwnerShipProtocolContract.rentalStartTime(rentingVehicle.tokenId).toNumber();
        return res.json({
            data: {
                startTime: startTime,
                bikeInfo: rentingVehicle
            },
            status: 200
        });
    });

    app.post("/api/updatePrice", async (req, res) => {
        const { tokenId, price } = req.body;
        await dbInstance.update(tokenId, {
            price: price,
            forRent: price > 0
        });
        return res.json({
            status: 200
        });
    });

    app.post("/api/rentingVehicle", async (req, res) => {
        const { tokenId, renter } = req.body;
        await dbInstance.update(tokenId, {
            renter: renter
        });
        return res.json({
            status: 200
        });
    });

    app.post("/api/returnVehicle", async (req, res) => {
        const { tokenId } = req.body;
        await dbInstance.update(tokenId, {
            renter: whitelistAddress
        });
        return res.json({
            status: 200
        });
    });

    app.post("/api/transferVehicle", async (req, res) => {
        const { tokenId, toOwnerAddress } = req.body;
        await dbInstance.update(tokenId, {
            owner: toOwnerAddress
        });
        return res.json({
            status: 200
        });
    });

    app.post("/api/newVehicle", async (req, res) => {
        const { latestToken, ownerAddress } = req.body;
        let tokenIndex = bikecoinOwnerShipProtocolContract.tokenOfOwnerByIndex(ownerAddress, latestToken);
        tokenIndex = tokenIndex.toNumber();
        let hash = bikecoinOwnerShipProtocolContract.tokenURI(tokenIndex);
        //get data from IPFS
        let vehicleData = await IPFS.getDataFromIPFS(hash);
        // parse to json
        vehicleData = JSON.parse(vehicleData);
        // binding onwer of token and tokenId
        vehicleData.owner = ownerAddress;
        vehicleData.tokenId = tokenIndex;
        vehicleData._id = tokenIndex;
        vehicleData.forRent = false;
        vehicleData.price = 0; // initial price value of vehicle
        vehicleData.renting = false;
        vehicleData.renter = whitelistAddress;
        await dbInstance.insert(vehicleData);
        return res.json({
            status: 200,
            data: vehicleData
        });
    });
};
