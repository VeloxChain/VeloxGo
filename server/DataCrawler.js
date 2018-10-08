var Web3 = require("web3");
var dbInstance = require("./lib/Nedb");
require("dotenv").config();
var _ = require("lodash");

const BIKECOIN_OWNER_SHIP_PROTOCOL_ABI = require("../src/services/bikeCoinOwnerShipProtocol.json");

var httpProvider = process.env.HTTPP_ROVIDER || "https://rpc-testnet.veloxchain.io";
var bikeCoinOwnerShipProtocolAddress = process.env.BIKECOIN_OWNER_SHIP_ADDRESS || "0xb18c880fa59645b557985651b3f29ee30913c3c2";

let web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
let bikeCoinOwnerShipProtocolContract = web3.eth.contract(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI);
bikeCoinOwnerShipProtocolContract = bikeCoinOwnerShipProtocolContract.at(bikeCoinOwnerShipProtocolAddress);

function getAllBikeTokenHashFromChain(){
    let totalTokens = bikeCoinOwnerShipProtocolContract.totalSupply();
    totalTokens = totalTokens.toNumber();

    let listOwnerOfToken = [];

    let listHashOfToken = [];

    for (var key=0; key < totalTokens; key++) {
        let tokenIndex = bikeCoinOwnerShipProtocolContract.tokenByIndex(key);
        tokenIndex = tokenIndex.toNumber();

        let ownerOfToken = bikeCoinOwnerShipProtocolContract.ownerOf(tokenIndex);

        listOwnerOfToken.push(ownerOfToken);

        let hash = bikeCoinOwnerShipProtocolContract.tokenURI(tokenIndex);
        listHashOfToken.push(hash);
    }

    return {
        listOwnerOfToken: listOwnerOfToken,
        listHashOfToken: listHashOfToken
    };
}

function check2ArrayIsTheSame(arrayRoot, arrayDest) {
    if(!_.isArray(arrayRoot) || !_.isArray(arrayDest)) {
        return false;
    }

    return (arrayRoot.sort().join(",") === arrayDest.sort().join(","));
}

async function watch() {
    console.log("watching...."); //eslint-disable-line

    let fetchBikeCoinData = getAllBikeTokenHashFromChain();
    fetchBikeCoinData._id = "root_id";

    let rootData = await dbInstance.find({}) || {};

    let isTheSameOfData =
        check2ArrayIsTheSame(fetchBikeCoinData.listOwnerOfToken, rootData.listOwnerOfToken) &&
        check2ArrayIsTheSame(fetchBikeCoinData.listHashOfToken, rootData.listHashOfToken);

    if (isTheSameOfData) {
        console.log("isTheSameOfData: ", isTheSameOfData); //eslint-disable-line
        Promise.resolve();
        return;
    }

    let result = await dbInstance.update({_id: "root_id"}, fetchBikeCoinData);

    console.log(result); //eslint-disable-line
    Promise.resolve();
}

watch();