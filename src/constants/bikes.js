let target = {
    CREATE: "BIKES.CREATE",
    USER_INIT: "BIKES.USER_INIT",
    NETWORK_INIT: "BIKES.NETWORK_INIT",
    LOAD_BIKES: "BIKES.LOAD_BIKES",
    UPDATE: "BIKES.UPDATE",
    DESTROY: "BIKES.DESTROY",
    TRANSFER: "BIKES.TRANSFER",
    FINISH_TRANSFER: "BIKES.FINISH_TRANSFER",
    LOAD_OWNER_BIKES: "BIKES.LOAD_OWNER_BIKES",
    LOAD_NETWORK_BIKE: "BIKES.LOAD_NETWORK_BIKE",
    FINISH_UPLOAD_TO_IPFS: "BIKES.FINISH_UPLOAD_TO_IPFS",
    UPLOAD_TO_IPFS: "BIKES.UPLOAD_TO_IPFS",
    FINISH_UPLOAD_MODIFIED_TO_IPFS: "BIKES.FINISH_UPLOAD_MODIFIED_TO_IPFS",
    UPLOAD_MODIFIED_TO_IPFS: "BIKES.UPLOAD_MODIFIED_TO_IPFS",
    RESET_YOUR_BIKES: "BIKES.RESET_YOUR_BIKES",
};
let handler = {
    get: (target, key) => {
        if (target.hasOwnProperty(key)) return target[key];
        else throw new Error(`Fired a wrong actionname: ${key}. Available Actions: ${Object.keys(target)}`);
    }
};
const proxy = new Proxy(target, handler);
export default proxy;
