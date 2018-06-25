import BIKES from "../constants/bikes";

export function createBike(payload) {
    return {
        type: BIKES.CREATE,
        payload: payload
    };
}
export function updateBike(index, data) {
    return {
        type: BIKES.UPDATE,
        payload: {index: index, data: data}
    };
}
