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
        newNetwork = state.network;
        newNetwork.push(action.payload);
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
    case BIKES.RESET_NETWORK_BIKE:
        return {
            ...state,
            network: [],
        };
    case BIKES.FINISH_ADJUST_BIKE_PRICE:
        newState = state.data;
        newState[action.payload.index].price = action.payload.price;
        newState[action.payload.index].forRent = action.payload.forRent;
        return {
            ...state,
            data: newState
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
    case BIKES.GET_NETWORK_BIKE_PRICE:
        newState = state.network;
        newState[action.payload.index].price = action.payload.price;
        newState[action.payload.index].forRent = action.payload.price > 0;
        return {
            ...state,
            network: newState
        };
    case BIKES.GET_USER_BIKE_PRICE:
        newState = state.data;
        newState[action.payload.index].price = action.payload.price;
        newState[action.payload.index].forRent = action.payload.price > 0;
        return {
            ...state,
            data: newState
        };
    case BIKES.CHANGE_BIKE_FORENT_STATUS:
        newState = state.data;
        newState[action.payload.index].forRent = !newState[action.payload.index].forRent;
        return {
            ...state,
            data: newState
        };
    default:
        return state;
    }

};

export default bikesReducer;
