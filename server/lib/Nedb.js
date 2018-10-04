const Datastore = require("nedb");

let dbNetworkVehicles = new Datastore({filename: "./data_store/networkVehicles.db"});
dbNetworkVehicles.loadDatabase(function (err) {
    if(err) {
        throw(err);
    }
});

class NeDb {
    constructor() {
        this.dbNetworkVehicles = dbNetworkVehicles;
    }

    insert(json) {
        return new Promise( (resolve, reject) => {
            dbNetworkVehicles.insert(json, (err, data) => {
                if (err) {
                    return reject({err: err});
                }
                resolve(data);
            });
        });
    }

    find(query) {
        return new Promise( (resolve, reject) => {
            dbNetworkVehicles.find(query, (err, data) =>{
                if (err) {
                    return reject({err: err});
                }

                resolve(data);
            });
        });
    }

    remove(data) {
        return new Promise( (resolve, reject) => {
            dbNetworkVehicles.remove(data, { multi: true }, (err, numRemoved) =>{
                if (err) {
                    return reject({err: err});
                }

                resolve(numRemoved);
            });
        });
    }
}

module.exports = new NeDb();
// export default new NeDb();
