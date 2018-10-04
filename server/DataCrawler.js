var Web3 = require("web3");
var dbInstance = require("./lib/Nedb");
require('dotenv').config();

const BIKECOIN_OWNER_SHIP_PROTOCOL_ABI = require("../src/services/bikeCoinOwnerShipProtocol.json");

// console.log(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI);
// console.log(process.env.HTTPP_ROVIDER);
// console.log(process.env.BIKECOIN_OWNER_SHIP_ADDRESS);


let web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPP_ROVIDER));
let bikecoinOwnerShipProtocolContract = web3.eth.contract(BIKECOIN_OWNER_SHIP_PROTOCOL_ABI);
bikecoinOwnerShipProtocolContract = bikecoinOwnerShipProtocolContract.at(process.env.BIKECOIN_OWNER_SHIP_ADDRESS);

let totalTokens = bikecoinOwnerShipProtocolContract.totalSupply();
totalTokens = totalTokens.toNumber();


let listOwnerOfToken = [];

let listHashOfToken = [];

for (var key=0; key < totalTokens; key++) {
    let tokenIndex = bikecoinOwnerShipProtocolContract.tokenByIndex(key);
    tokenIndex = tokenIndex.toNumber();

    let ownerOfToken = bikecoinOwnerShipProtocolContract.ownerOf(tokenIndex);

    listOwnerOfToken.push(ownerOfToken);

    let hash = bikecoinOwnerShipProtocolContract.tokenURI(tokenIndex);
    listHashOfToken.push(hash);
}


dbInstance.insert({listOwnerOfToken: listOwnerOfToken, listHashOfToken: listHashOfToken}).then(result => {
    console.log(result);
});