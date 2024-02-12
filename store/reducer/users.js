// const  

import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import { AcceptInvitationActionTypes, FetchUsersActionTypes, FollowUserActionTypes, GetUserInfoActionTypes } from "../action/users";

const defaultState = {
    usersList: {
        all_users: [],
        followers: [],
        pending_followings: [],
        followings: []
    },
    fetchUsersStatus: {
        all_users: AsyncStates.INITIAL,
        followers: AsyncStates.INITIAL,
        pending_followings: AsyncStates.INITIAL
    },
    fetchUsersError: {
        all_users: null,
        followers: null,
        pending_followings: null
    },
    followUserStatus: {},
    followUserError: {},
    acceptInvitationStatus: {},
    acceptInvitationError: {},
    userInfo: null,
    getUserInfoStatus: AsyncStates.INITIAL,
    getUserInfoError: null,

}


const hommiesReducer = handleActions({
    [FetchUsersActionTypes.REQUEST]: (state, action) => {
        const tab = action.payload.type
        return {
            ...state,
            fetchUsersStatus: {
                ...state.fetchUsersStatus,
                [tab]: AsyncStates.LOADING
            },
            fetchUsersError: {
                ...state.fetchUsersError,
                [tab]: null
            },
        }
    },
    [FetchUsersActionTypes.SUCCESS]: (state, action) => {
        const tab = Object.keys(action.payload)?.[0]
        return {
            ...state,
            fetchUsersStatus: {
                ...state.fetchUsersStatus,
                [tab]: AsyncStates.SUCCESS
            },
            fetchUsersError: {
                ...state.fetchUsersError,
                [tab]: null
            },
            usersList: {
                ...state.usersList,
                [tab]: action.payload?.[tab]
            },
        };
    },
    [FetchUsersActionTypes.FAILURE]: (state, action) => {
        const tab = action.payload.type

        return {
            ...state,
            fetchUsersStatus: {
                ...state.fetchUsersStatus,
                [tab]: AsyncStates.ERROR
            },
            fetchUsersError: {
                ...state.fetchUsersError,
                [tab]: AsyncStates.ERROR
            },
        }
    },
    [FetchUsersActionTypes.CLEAR]: (state, action) => {
        const tab = action.payload.type

        return {
            ...state,
            fetchUsersStatus: {
                ...state.fetchUsersStatus,
                [tab]: AsyncStates.INITIAL
            },
            fetchUsersError: {
                ...state.fetchUsersError,
                [tab]: AsyncStates.INITIAL
            },
        }
    },
    [FollowUserActionTypes.REQUEST]: (state) => ({
        ...state,
        followUserStatus: AsyncStates.LOADING,
        followUserError: null,
    }),
    [FollowUserActionTypes.SUCCESS]: (state, action) => {
        const newUserList = JSON.parse(JSON.stringify(state.usersList))
        const payloadData = action.payload
        const data = {
            ...newUserList,
            [payloadData.tab]: newUserList?.[payloadData.tab]?.filter((user) => user._id !== payloadData.receiverId)
        }
        return {
            ...state,
            followUserStatus: AsyncStates.SUCCESS,
            followUserError: null,
            usersList: data
        };
    },
    [FollowUserActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            followUserStatus: AsyncStates.ERROR,
            followUserError: action.payload,
        }
    },
    [FollowUserActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            followUserStatus: AsyncStates.INITIAL,
            followUserError: null,
        }
    },

    [AcceptInvitationActionTypes.REQUEST]: (state) => ({
        ...state,
        acceptInvitationStatus: AsyncStates.LOADING,
        acceptInvitationError: null,
    }),
    [AcceptInvitationActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            acceptInvitationStatus: AsyncStates.SUCCESS,
            acceptInvitationError: null,
        };
    },
    [AcceptInvitationActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            acceptInvitationStatus: AsyncStates.ERROR,
            acceptInvitationError: action.payload,
        }
    },
    [AcceptInvitationActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            acceptInvitationStatus: AsyncStates.INITIAL,
            acceptInvitationError: null,
        }
    },

    [GetUserInfoActionTypes.REQUEST]: (state) => ({
        ...state,
        getUserInfoStatus: AsyncStates.LOADING,
        getUserInfoError: null,
    }),
    [GetUserInfoActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            userInfo: action.payload,
            getUserInfoStatus: AsyncStates.SUCCESS,
            getUserInfoError: null,
        };
    },
    [GetUserInfoActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            getUserInfoStatus: AsyncStates.ERROR,
            getUserInfoError: action.payload,
        }
    },
    [GetUserInfoActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            userInfo: null,
            getUserInfoStatus: AsyncStates.INITIAL,
            getUserInfoError: null,
        }
    },


}, defaultState);

export default hommiesReducer;