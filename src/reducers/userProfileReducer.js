import USER_PROFILE from "../constants/userProfile";
import ACC_ACTION from "../constants/accActions";
// import { METAMASK } from "../components/Modal/constants";
const initState = {
    data: { }
};

const userProfileReducer = (state = initState, action) => {
    var data = {};
    switch (action.type) {
    case USER_PROFILE.CREATE:
        return {
            ...state,
            data: action.payload.userProfile
        };
    case USER_PROFILE.UPDATE:
        return {
            ...state,
            data: action.payload.userProfile
        };
    case USER_PROFILE.ADD_KEYS:
        data = state.data;
        return {
            ...state,
            data: {
                ...data,
                ...action.payload
            }
        };
    case ACC_ACTION.LOG_OUT:
        return {
            ...state,
            data: {}
        };
    default:
        return state;
    }

};

export default userProfileReducer;
