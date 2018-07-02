import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = {
    data: [],
    network: []
};

const bikesReducer = (state = initState, action) => {
    var newState, bikeInfo, newNetwork;
    switch (action.type) {
    case BIKES.LOAD_BIKES :
        return {
            ...state,
            data: action.payload,
            network: action.networkBikes
        };
    case BIKES.CREATE:
        newState = state.data;
        newNetwork = state.network;
        bikeInfo = action.payload.bikeInfo;
        newState.push(bikeInfo);
        newNetwork.push(bikeInfo);
        return {
            ...state,
            data: newState,
            network: newNetwork
        };
    case BIKES.UPDATE:
        newState = state.data;
        bikeInfo = action.payload.bikeInfo;
        bikeInfo["hash"] = action.payload.hashData;
        newState[action.payload.index] = bikeInfo;
        return {
            ...state,
            data: newState
        };
    case BIKES.DESTROY:
        newState = state.data;
        newState.splice(action.index, 1);
        return {
            ...state,
            data: newState
        };
    case ACC_ACTION.LOG_OUT:
        return initState;
    default:
        return state;
    }

};

export default bikesReducer;
