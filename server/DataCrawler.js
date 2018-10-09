require("dotenv").config();
const Web3 = require("web3");
const dbInstance = require("./lib/Nedb");
const IPFS = require("./lib/ipfs");
const _ = require("lodash");
const BIKECOIN_OWNER_SHIP_PROTOCOL_ABI = require("../src/services/bikeCoinOwnerShipProtocol.json");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER));
const bikecoinOwnerShipProtocolContract = web3.eth.contract(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI).at(process.env.BIKECOIN_OWNER_SHIP_ADDRESS);

const vehicleCrawler = async () => {
    let totalTokens = bikecoinOwnerShipProtocolContract.totalSupply();
    totalTokens = totalTokens.toNumber();

    for (var key=0; key < totalTokens; key++) {
        let tokenIndex = bikecoinOwnerShipProtocolContract.tokenByIndex(key);
        tokenIndex = tokenIndex.toNumber();

        // get owner of token
        let ownerOfToken = bikecoinOwnerShipProtocolContract.ownerOf(tokenIndex);
        // get vehicleData and status
        const { isNew, vehicleData } = await getVehicleData(tokenIndex);
        // get price of vehicle
        let vehiclePrice = bikecoinOwnerShipProtocolContract.getBikeRentalPrice(tokenIndex);
        vehiclePrice = vehiclePrice.toNumber();
        vehiclePrice = parseInt(web3.fromWei(vehiclePrice), 10);
        // get rent status
        let renter = bikecoinOwnerShipProtocolContract.renters(tokenIndex);
        // binding fields
        vehicleData.owner = ownerOfToken;
        vehicleData.tokenId = tokenIndex;
        vehicleData._id = tokenIndex;
        vehicleData.forRent = vehiclePrice > 0;
        vehicleData.price = vehiclePrice;
        vehicleData.renter = renter;
        // push to db
        if (isNew) {
            await dbInstance.insert(vehicleData);
        } else {
            await dbInstance.replaceRow(tokenIndex, vehicleData);
        }
    }
};

const getVehicleData = async (tokenId) => {
    let isExistsVehicle = await dbInstance.findOne({tokenId:tokenId});
    if (!_.isNull(isExistsVehicle)) {
        return {
            isNew: false,
            vehicleData: isExistsVehicle
        };
    }
    let hash = bikecoinOwnerShipProtocolContract.tokenURI(tokenId);
    //get data from IPFS
    let vehicleData = await IPFS.getDataFromIPFS(hash);
    // parse to json
    vehicleData = JSON.parse(vehicleData);
    return {
        isNew: true,
        vehicleData: vehicleData
    };
};

vehicleCrawler();
