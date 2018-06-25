import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = [];

const bikesReducer = (state = initState, action) => {
    var newState;
    switch (action.type) {
    case BIKES.CREATE:
        newState = state;
        newState.push(action.payload);
        return newState;
    case BIKES.UPDATE:
        newState = state;
        newState[action.payload.index] = action.payload.data;
        return newState;
    case ACC_ACTION.LOG_OUT:
        return initState;
    default:
        return state;
    }

};

export default bikesReducer;
