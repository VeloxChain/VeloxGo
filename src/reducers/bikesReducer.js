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
        newState[action.index] = action.payload;
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
