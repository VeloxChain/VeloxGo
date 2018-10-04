const Datastore = require("nedb");
const fs = require("fs");
let dbNetworkVehicles = new Datastore("./data_store/networkVehicles.db");

class NeDb {

    store = (json) => {
        fs.truncate("./data_store/networkVehicles.db", 0);
        dbNetworkVehicles.insert(json, (err, newVehicles) => {
            if (err) {
                console.log(err); // eslint-disable-line
            } else {
                return newVehicles;
            }
        });
    }
    find = (query) => {
        dbNetworkVehicles.find(query, (err, vehicles) =>{
            if (err) {
                console.log(err); // eslint-disable-line
            } else {
                return vehicles;
            }
        });
    }
}
export default NeDb;
