let target = {
    CREATE: "USER_PROFILE.CREATE",
    VERIFY_CREATE: "USER_PROFILE.VERIFY_CREATE",
    UPDATE: "USER_PROFILE.UPDATE",
    ADD_KEYS: "USER_PROFILE.ADD_KEYS",
    UPLOAD_PROFILE_TO_IPFS: "USER_PROFILE.UPLOAD_PROFILE_TO_IPFS",
    FINISH_UPLOAD_NEW_PROFILE: "USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE",
    FINISH_UPLOAD_MODIFIED_PROFILE: "USER_PROFILE.FINISH_UPLOAD_MODIFIED_PROFILE",
};
let handler = {
    get: (target, key) => {
        if (target.hasOwnProperty(key)) return target[key];
        else throw new Error(`Fired a wrong actionname: ${key}. Available Actions: ${Object.keys(target)}`);
    }
};
const proxy = new Proxy(target, handler);
export default proxy;
