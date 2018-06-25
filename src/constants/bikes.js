let target = {
    CREATE: "BIKES.CREATE",
    UPDATE: "BIKES.UPDATE",
};
let handler = {
    get: (target, key) => {
        if (target.hasOwnProperty(key)) return target[key];
        else throw new Error(`Fired a wrong actionname: ${key}. Available Actions: ${Object.keys(target)}`);
    }
};
const proxy = new Proxy(target, handler);
export default proxy;
