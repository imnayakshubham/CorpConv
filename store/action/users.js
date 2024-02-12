import { createActions } from "redux-actions";


export const FetchUsersActionTypes = {
    REQUEST: "FETCH_USERS_REQUEST",
    SUCCESS: "FETCH_USERS_SUCCESS",
    FAILURE: "FETCH_USERS_FAILURE",
    CLEAR: "FETCH_USERS_ClEAR"
}

export const FollowUserActionTypes = {
    REQUEST: "FOLLOW_USER_REQUEST",
    SUCCESS: "FOLLOW_USER_SUCCESS",
    FAILURE: "FOLLOW_USER_FAILURE",
    CLEAR: "FOLLOW_USER_ClEAR"
}

export const AcceptInvitationActionTypes = {
    REQUEST: "ACCEPT_INVITATION_REQUEST",
    SUCCESS: "ACCEPT_INVITATION_SUCCESS",
    FAILURE: "ACCEPT_INVITATION_FAILURE",
    CLEAR: "ACCEPT_INVITATION_ClEAR"
}

export const GetUserInfoActionTypes = {
    REQUEST: "GET_USER_INFO_REQUEST",
    SUCCESS: "GET_USER_INFO_SUCCESS",
    FAILURE: "GET_USER_INFO_FAILURE",
    CLEAR: "GET_USER_INFO_ClEAR"
}


export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUsersClear,
    followUserRequest,
    followUserSuccess,
    followUserFailure,
    followUserClear,
    acceptInvitationRequest,
    acceptInvitationSuccess,
    acceptInvitationFailure,
    acceptInvitationClear,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFailure,
    getUserInfoClear,
} = createActions({
    [FetchUsersActionTypes.REQUEST]: (payload) => payload,
    [FetchUsersActionTypes.SUCCESS]: (payload) => (payload),
    [FetchUsersActionTypes.FAILURE]: (error) => (error),
    [FetchUsersActionTypes.CLEAR]: () => { },
    [FollowUserActionTypes.REQUEST]: (payload) => payload,
    [FollowUserActionTypes.SUCCESS]: (payload) => (payload),
    [FollowUserActionTypes.FAILURE]: (error) => (error),
    [FollowUserActionTypes.CLEAR]: () => { },
    [AcceptInvitationActionTypes.REQUEST]: (payload) => payload,
    [AcceptInvitationActionTypes.SUCCESS]: (payload) => (payload),
    [AcceptInvitationActionTypes.FAILURE]: (error) => (error),
    [AcceptInvitationActionTypes.CLEAR]: () => { },
    [GetUserInfoActionTypes.REQUEST]: (payload) => payload,
    [GetUserInfoActionTypes.SUCCESS]: (payload) => (payload),
    [GetUserInfoActionTypes.FAILURE]: (error) => (error),
    [GetUserInfoActionTypes.CLEAR]: () => { },
});