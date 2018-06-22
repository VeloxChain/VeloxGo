import IPFS from "ipfs";
// import series from "async/series";
// import _ from "lodash";

const node = new IPFS({
    repo: "QmNLiRSpcxTvaQKh53paJixMEs7FKMxTbGLNq7vzt8noos"
});

let SERVICE_IPFS = {};

SERVICE_IPFS.init = async () => {
    let resultCheckNodeReady = await SERVICE_IPFS.checkNodeReady();
    if(resultCheckNodeReady !== "OK") {
        throw "IPSF is not loaded!";
    }
};

SERVICE_IPFS.putDataToIPFS = (data) => {
    return new Promise( (resolve, reject) => {
        node.dag.put(data, { format: "dag-cbor", hashAlg: "sha2-256" }, (err, cid) => {
            if (err) {
                return reject({err: err});
            }
            resolve(cid.toBaseEncodedString());
        });
    });
};

SERVICE_IPFS.getDataFromIPFS = (hash) => {
    return new Promise( (resolve, reject) => {
        node.dag.get(hash, (err, result) => {
            if (err) {
                return reject({err: err});
            }
            resolve(JSON.stringify(result.value));
        });
    });
};

SERVICE_IPFS.checkNodeReady = () => {
    return new Promise( (resolve) => {
        node.once("ready",  () => {resolve("OK");});
    });
};

// SERVICE_IPFS.putFileToIPFS = (buf) => {
//     return new Promise( (resolve, reject) => {
//         ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
//             if(err) {
//                 return reject({ err: err})
//             }
//             return resolve(result[0].hash);
//         })
//     });
// };

// SERVICE_IPFS.registerdBike = (bikeData) => {
//     node.once("ready",  () => {
//         node.dag.put(bikeData, { format: "dag-cbor", hashAlg: "sha2-256" }, (err, cid) => {
//             if (err) {
//                 throw err;
//             }
//             node.dag.get(cid.toBaseEncodedString(), (err, result) => {
//                 if (err) {
//                     throw err;
//                 }
//
//                 console.log(JSON.stringify(result.value));
//             });
//         });
//     });
// };

export default SERVICE_IPFS;
