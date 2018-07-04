import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = {
    data: [],
    network: [],
    loadded: []
};

const bikesReducer = (state = initState, action) => {
    var newState, bikeInfo, newNetwork, newLoadded;
    switch (action.type) {
    case BIKES.LOAD_OWNER_BIKES :
        newLoadded = state.loadded;
        if (newLoadded.includes(action.payload.tokenId)) {
            return state;
        }
        newState = state.data;
        newNetwork = state.network;
        newState.push(action.payload);
        newNetwork.push(action.payload);
        newLoadded.push(action.payload.tokenId);
        return {
            ...state,
            data: newState,
            network: newNetwork
        };
    case BIKES.LOAD_NETWORK_BIKE :
        newLoadded = state.loadded;
        if (newLoadded.includes(action.payload.tokenId)) {
            return state;
        }
        newNetwork = state.network;
        newNetwork.push(action.payload);
        newLoadded.push(action.payload.tokenId);
        return {
            ...state,
            network: newNetwork
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
        return {
            data: [],
            network: [],
            loadded: []
        };
    default:
        return state;
    }

};

export default bikesReducer;
