import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = [];

const bikesReducer = (state = initState, action) => {
    var newState;
    switch (action.type) {
    case BIKES.CREATE:
        newState = state;
        newState.push(action.payload.bikeInfo);
        return newState;
    case BIKES.UPDATE:
        newState = state;
        newState[action.payload.index] = action.payload.bikeInfo;
        return newState;
    case BIKES.DESTROY:
        newState = state;
        newState.splice(action.index, 1);
        return state;
    case ACC_ACTION.LOG_OUT:
        return initState;
    default:
        return state;
    }

};

export default bikesReducer;
