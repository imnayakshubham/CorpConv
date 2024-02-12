import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import {
    LoginActionTypes, LogoutActionTypes, UpdateProfileActionTypes,
} from "../action/login";

const defaultState = {
    loginStatus: AsyncStates.INITIAL,
    loginErrorMessage: null,
    loginResponse: null,
    logoutStatus: AsyncStates.INITIAL,
    logoutErrorMessage: null,
    updateProfileStatus: AsyncStates.INITIAL,
    updateProfileErrorMessage: null,
};

const loginReducer = handleActions(
    {
        [LoginActionTypes.REQUEST]: (state) => ({
            ...state,
            loginStatus: AsyncStates.LOADING,
            loginErrorMessage: null,
        }),
        [LoginActionTypes.SUCCESS]: (state, action) => {
            return {
                ...state,
                loginStatus: AsyncStates.SUCCESS,
                loginErrorMessage: null,
                loginResponse: action.payload.loginResponse,
            };
        },
        [LoginActionTypes.FAILURE]: (state, action) => {
            return {
                ...state,
                loginStatus: AsyncStates.ERROR,
                loginErrorMessage: action.payload.error,
            }
        },
        [LogoutActionTypes.REQUEST]: (state) => ({
            ...state,
            logoutStatus: AsyncStates.LOADING,
            logoutErrorMessage: null,
        }),
        [LogoutActionTypes.SUCCESS]: (state) => {
            return {
                ...state,
                logoutStatus: AsyncStates.SUCCESS,
                logoutErrorMessage: null,
            };
        },
        [LogoutActionTypes.FAILURE]: (state, action) => {
            return {
                ...state,
                logoutStatus: AsyncStates.ERROR,
                logoutErrorMessage: action.payload.error,
            }
        },
        [UpdateProfileActionTypes.REQUEST]: (state) => ({
            ...state,
            updateProfileStatus: AsyncStates.LOADING,
            updateProfileErrorMessage: null,
        }),
        [UpdateProfileActionTypes.SUCCESS]: (state, action) => {
            return {
                ...state,
                updateProfileStatus: AsyncStates.SUCCESS,
                updateProfileErrorMessage: null,
                loginResponse: { ...state.loginResponse, ...action.payload },
            };
        },
        [UpdateProfileActionTypes.FAILURE]: (state, action) => {
            return {
                ...state,
                updateProfileStatus: AsyncStates.ERROR,
                updateProfileErrorMessage: action.payload.error,
            }
        },
    },
    defaultState
);

export default loginReducer;