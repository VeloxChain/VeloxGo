import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = {
    data: []
};

const bikesReducer = (state = initState, action) => {
    var newState, bikeInfo;
    switch (action.type) {
    case BIKES.CREATE:
        newState = state.data;
        bikeInfo = action.payload.bikeInfo;
        bikeInfo["hash"] = action.payload.hashData;
        bikeInfo["prevHash"] = "";
        newState.push(bikeInfo);
        return {
            ...state,
            data: newState
        };
    case BIKES.UPDATE:
        newState = state.data;
        bikeInfo = action.payload.bikeInfo;
        bikeInfo["prevHash"] = bikeInfo.hash;
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
