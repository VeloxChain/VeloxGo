const Datastore = require("nedb");
const path = require("path");
let dbNetworkVehicles = new Datastore({filename: path.join("./data_store/networkVehicles.db"), autoload: true});

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
    findOne(query) {
        return new Promise( (resolve, reject) => {
            dbNetworkVehicles.findOne(query, (err, data) =>{
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
    update(tokenId, values) {
        return new Promise( (resolve, reject) => {
            dbNetworkVehicles.update({ tokenId: tokenId }, { $set: values }, {}, (err, numReplaced) =>{
                if (err) {
                    return reject({err: err});
                }
                resolve(numReplaced);
            });
        });
    }
}

module.exports = new NeDb();
// export default new NeDb();
