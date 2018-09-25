import constants from "./constants";
import _ from "lodash";
function retrieveAddress(address) {
    address = "0x" + address.slice(26);
    return address;
}
export const getEventLogs = (ethereum) => {
    let module = "logs";
    let action = "getLogs";
    let fromBlock = 0;
    let toBlock = "latest";
    let address = constants.BIKECOIN_OWNER_SHIP_ADDRESS;
    // let topic2 = pad(profileAddress);
    let apikey = constants.BIKECOIN_APIKEY;
    return fetch(`https://api-ropsten.etherscan.io/api?module=${module}&action=${action}&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${address}&apikey=${apikey}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then((response) => {
        return response.json();
    }).then((res) => {
        var ownerHistories = [];
        _.forEach(res.result, (item) => {
            let ownerHistory = {};
            ownerHistory.tokenId = ethereum.rpc.toBigNumber(item.data).toNumber();
            ownerHistory.from = retrieveAddress(item.topics[1]);
            ownerHistory.to = retrieveAddress(item.topics[2]);
            ownerHistories.push(ownerHistory);
        });
        ownerHistories = JSON.stringify(ownerHistories);
        localStorage.setItem("ownerHistories", ownerHistories);
    });
};

export const getContractLog = () => {
    return new Promise((resolve) => {
        // let module = "account";
        // let action = "txlist";
        // let fromBlock = 0;
        // let toBlock = "latest";
        let address = constants.TX_RELAY_ADDRESS;
        // let apikey = constants.BIKECOIN_APIKEY;
        return fetch(`${constants.SCAN_API}txs?page=1&limit=15&address=${address}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((response) => {
            return response.json();
        }).then((res) => {
            resolve(res);
        });
    });

};
