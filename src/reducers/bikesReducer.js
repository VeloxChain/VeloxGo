import BIKES from "../constants/bikes";
import ACC_ACTION from "../constants/accActions";
const initState = {
    data: []
};

const bikesReducer = (state = initState, action) => {
    var newState;
    switch (action.type) {
    case BIKES.CREATE:
        newState = state.data;
        newState.push(action.payload.bikeInfo);
        return {
            ...state,
            data: newState
        };
    case BIKES.UPDATE:
        newState = state.data;
        newState[action.payload.index] = action.payload.bikeInfo;
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
