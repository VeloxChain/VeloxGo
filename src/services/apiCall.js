import constants from "./constants";
const leftPad = require("left-pad");
function pad(n) {
    let data;
    if (n.startsWith("0x")) {
        data = "0x" + leftPad(n.slice(2), "64", "0");
        // assert.equal(data.length, 66, "packed incorrectly")
        return data;
    } else {
        data = "0x" + leftPad(n, "64", "0");
        // assert.equal(data.length, 66, "packed incorrectly")
        return data;
    }
}
export const getEventLogs = (profileAddress) => {
    let module = "logs";
    let action = "getLogs";
    let fromBlock = 0;
    let toBlock = "latest";
    let address = constants.BIKECOIN_OWNER_SHIP_ADDRESS;
    let topic2 = pad(profileAddress);
    let apikey = constants.BIKECOIN_APIKEY;
    return fetch(`https://api-ropsten.etherscan.io/api?module=${module}&action=${action}&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${address}&topic2=${topic2}&apikey=${apikey}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then((response) => {
        return response.json();
    });
};
