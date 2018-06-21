import IPFS from "ipfs";
import series from "async/series";
import _ from "lodash";

const node = new IPFS({
    repo: "QmNLiRSpcxTvaQKh53paJixMEs7FKMxTbGLNq7vzt8noos"
});

let IPSFTest = {};

IPSFTest.test = async () => {
    let resultCheckNodeReady = await IPSFTest.checkNodeReady();
    if(resultCheckNodeReady != "OK") {
        return;
    }

    let resultPutDataToIPFS = await IPSFTest.putDataToIPFS("VuongDaiCaLA");

    if(!_.isEmpty(resultPutDataToIPFS.err)) {
        return;
    }

    let resultGetDataFromIPFS = await IPSFTest.getDataFromIPFS(resultPutDataToIPFS);

    console.log(resultGetDataFromIPFS);
};

IPSFTest.putDataToIPFS = (data) => {
    return new Promise( (resolve, reject) => {
        node.dag.put(data, { format: "dag-cbor", hashAlg: "sha2-256" }, (err, cid) => {
            if (err) {
                reject({err: err});
            }
            console.log(cid.toBaseEncodedString());
            resolve(cid.toBaseEncodedString());
        });
    });
};

IPSFTest.getDataFromIPFS = (hash) => {
    return new Promise( (resolve, reject) => {
        node.dag.get(hash, (err, result) => {
            if (err) {
                reject({err: err});
            }
            resolve(JSON.stringify(result.value));
        });
    });
};

IPSFTest.checkNodeReady = () => {
    return new Promise( (resolve, reject) => {
        node.once("ready",  () => {resolve("OK");});
    });
};

IPSFTest.registerdBike = (bikeData) => {
    node.once("ready",  () => {
        node.dag.put(bikeData, { format: "dag-cbor", hashAlg: "sha2-256" }, (err, cid) => {
            if (err) {
                throw err;
            }
            console.log(cid.toBaseEncodedString());
      
            node.dag.get(cid.toBaseEncodedString(), (err, result) => {
                if (err) {
                    throw err;
                }
  
                console.log(JSON.stringify(result.value));
            });
        });
    });
};

export default IPSFTest;
