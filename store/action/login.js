import { createActions } from "redux-actions";

export const LoginActionTypes = {
    REQUEST: "LOGIN_REQUEST",
    SUCCESS: "LOGIN_SUCCESS",
    FAILURE: "LOGIN_FAILURE",
}

export const LogoutActionTypes = {
    REQUEST: "LOGOUT_REQUEST",
    SUCCESS: "LOGOUT_SUCCESS",
    FAILURE: "LOGOUT_FAILURE",
}

export const UpdateProfileActionTypes = {
    REQUEST: "UPDATE_PROFILE_REQUEST",
    SUCCESS: "UPDATE_PROFILE_SUCCESS",
    FAILURE: "UPDATE_PROFILE_FAILURE",
}


export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
} = createActions({
    [LoginActionTypes.REQUEST]: (payload) => payload,
    [LoginActionTypes.SUCCESS]: (loginResponse) => ({ loginResponse }),
    [LoginActionTypes.FAILURE]: (error) => ({ error }),
    [LogoutActionTypes.REQUEST]: () => { },
    [LogoutActionTypes.SUCCESS]: () => { },
    [LogoutActionTypes.FAILURE]: (error) => ({ error }),
    [UpdateProfileActionTypes.REQUEST]: (payload) => payload,
    [UpdateProfileActionTypes.SUCCESS]: (loginResponse) => (loginResponse),
    [UpdateProfileActionTypes.FAILURE]: (error) => ({ error }),
});