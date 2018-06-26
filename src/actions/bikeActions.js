import BIKES from "../constants/bikes";

export function createBike(payload, hashBike) {
    return {
        type: BIKES.CREATE,
        payload: payload,
        hash: hashBike
    };
}
export function updateBike(index, data, bikeHash) {
    return {
        type: BIKES.UPDATE,
        payload: data,
        index: index,
        hash: bikeHash
    };
}
export function destroyBike(index, bikeHash) {
    return {
        type: BIKES.DESTROY,
        index: index,
        hash: bikeHash
    };
}
