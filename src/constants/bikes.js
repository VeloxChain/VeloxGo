let target = {
    CREATE: "BIKES.CREATE",
    INIT: "BIKES.INIT",
    LOAD_BIKES: "BIKES.LOAD_BIKES",
    UPDATE: "BIKES.UPDATE",
    DESTROY: "BIKES.DESTROY",
    TRANSFER: "BIKES.TRANSFER",
    FINISH_UPLOAD_TO_IPFS: "BIKES.FINISH_UPLOAD_TO_IPFS",
    UPLOAD_TO_IPFS: "BIKES.UPLOAD_TO_IPFS",
    FINISH_UPLOAD_MODIFIED_TO_IPFS: "BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS",
    UPLOAD_MODIFIED_TO_IPFS: "BIKES.UPLOAD_MODIFIED_TO_IPFS",
};
let handler = {
    get: (target, key) => {
        if (target.hasOwnProperty(key)) return target[key];
        else throw new Error(`Fired a wrong actionname: ${key}. Available Actions: ${Object.keys(target)}`);
    }
};
const proxy = new Proxy(target, handler);
export default proxy;
