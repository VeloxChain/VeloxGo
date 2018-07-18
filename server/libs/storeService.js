var Datastore = require('nedb');
var datastore = new Datastore({ filename: '../data_store/datafile.json', autoload : true});

module.exports = {
    saveDataToStore : (data) => {
        return new Promise((resolve, reject) => {
            datastore.insert(data, function (err, newDocs) {
                if(err) {
                    reject({err});
                }
                resolve(newDocs);
            });
        });
    },
    
    getDataFromStore: (condition = {}) => {
        return new Promise((resolve, reject) => {
            datastore.find(condition, function (err, docs) {
                if(err) {
                    reject({err});
                }
                resolve(docs);
            });
        });
    },
    
    removeDataFromStore: (condition) => {
        return new Promise((resolve, reject) => {
            datastore.remove(condition, function (err, numRemoved) {
                if(err) {
                    reject({err});
                }
                resolve(numRemoved);
            });
        });
    }
}