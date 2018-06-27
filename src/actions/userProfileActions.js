import USER_PROFILE from "../constants/userProfile";

export function addUserProfile(payload) {
    return {
        type: USER_PROFILE.CREATE,
        payload
    };
}

export function updateUserProfile(payload) {
    return {
        type: USER_PROFILE.UPDATE,
        payload
    };
}

export function addKeysToUserProfile(userProfile) {
    return {
        type: USER_PROFILE.ADD_KEYS,
        payload: userProfile
    };
}
export function uploadUserProfileToIPFS(userProfile) {
    return {
        type: USER_PROFILE.UPLOAD_PROFILE_TO_IPFS,
        payload: userProfile
    };
}
export function finishUploadNewProfileToIPFS(payload) {
    return {
        type: USER_PROFILE.FINISH_UPLOAD_NEW_PROFILE,
        payload
    };
}
export function finishUploadModifiedProfileToIPFS(payload) {
    return {
        type: USER_PROFILE.FINISH_UPLOAD_MODIFIED_PROFILE,
        payload
    };
}
