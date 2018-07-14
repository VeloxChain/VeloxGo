import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = {
    data: [],
    network: [],
    loaded: [],
    rendingBike: {
        isRent: false,
        bikeInfo: null,
        startTime: null,
    },
    rented: []
};

const bikesReducer = (state = initState, action) => {
    var newState, bikeInfo, newNetwork, newLoadded;
    switch (action.type) {
    case BIKES.LOAD_OWNER_BIKES :
        newLoadded = state.loaded;
        newState = state.data;
        newNetwork = state.network;
        if (newLoadded.includes(action.payload.tokenId) === false) {
            newLoadded.push(action.payload.tokenId);
            newNetwork.push(action.payload);
        }
        newState.push(action.payload);
        return {
            ...state,
            data: newState,
            network: newNetwork
        };
    case BIKES.LOAD_NETWORK_BIKE :
        newLoadded = state.loaded;
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
    case BIKES.FINISH_TRANSFER:
        newState = state.data;
        newState = newState.filter((bike) =>  bike.tokenId != action.payload);
        return {
            ...state,
            data: newState
        };
    case BIKES.RESET_YOUR_BIKES:
        return {
            ...state,
            data: [],
        };
    case ACC_ACTION.LOG_OUT:
        return {
            data: [],
            network: [],
            loaded: [],
            rendingBike: {
                isRent: false,
                bikeInfo: null,
                startTime: null,
            }
        };
    case BIKES.FINISH_RENT_BIKE:
        return {
            ...state,
            rendingBike: {
                isRent: true,
                bikeInfo: action.payload.bikeInfo,
                startTime: action.payload.startTime,
            }
        };
    case BIKES.FINISH_RETURN_BIKE:
        return {
            ...state,
            rendingBike: {
                isRent: false,
                bikeInfo: null,
                startTime: null,
            }
        };
    default:
        return state;
    }

};

export default bikesReducer;
