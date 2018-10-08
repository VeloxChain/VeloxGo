const Web3 = require("web3");
const dbInstance = require("./lib/Nedb");
const IPFS = require("./lib/ipfs");
require("dotenv").config();

const BIKECOIN_OWNER_SHIP_PROTOCOL_ABI = require("../src/services/bikeCoinOwnerShipProtocol.json");

// console.log(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI);
// console.log(process.env.HTTPP_ROVIDER);
// console.log(process.env.BIKECOIN_OWNER_SHIP_ADDRESS);


let web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER));
let bikecoinOwnerShipProtocolContract = web3.eth.contract(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI);
bikecoinOwnerShipProtocolContract = bikecoinOwnerShipProtocolContract.at(process.env.BIKECOIN_OWNER_SHIP_ADDRESS);

const vehicleCrawler = async () => {

    let totalTokens = bikecoinOwnerShipProtocolContract.totalSupply();
    totalTokens = totalTokens.toNumber();

    let listVehicle = [];

    for (var key=0; key < totalTokens; key++) {
        let tokenIndex = bikecoinOwnerShipProtocolContract.tokenByIndex(key);
        tokenIndex = tokenIndex.toNumber();

        // get owner of token
        let ownerOfToken = bikecoinOwnerShipProtocolContract.ownerOf(tokenIndex);
        // get token hash
        let hash = bikecoinOwnerShipProtocolContract.tokenURI(tokenIndex);
        // get price of vehicle
        let vehiclePrice = bikecoinOwnerShipProtocolContract.getBikeRentalPrice(tokenIndex);
        vehiclePrice = vehiclePrice.toNumber();
        vehiclePrice = parseInt(web3.fromWei(vehiclePrice), 10);
        //get data from IPFS
        let vehicleData = await IPFS.getDataFromIPFS(hash);
        // parse to json
        vehicleData = JSON.parse(vehicleData);
        // binding onwer of token and tokenId
        vehicleData.owner = ownerOfToken;
        vehicleData.tokenId = tokenIndex;
        vehicleData._id = tokenIndex;
        vehicleData.forRent = vehiclePrice > 0;
        vehicleData.price = vehiclePrice;
        // push to list
        listVehicle.push(vehicleData);
    }
    dbInstance.remove({});
    const result = await dbInstance.insert(listVehicle);
    console.log(result); //eslint-disable-line
};
vehicleCrawler();
