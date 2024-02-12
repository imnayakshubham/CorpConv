import { createActions } from "redux-actions";


export const FetchChatListActionTypes = {
    REQUEST: "FETCH_CHAT_LIST_REQUEST",
    SUCCESS: "FETCH_CHAT_LIST_SUCCESS",
    FAILURE: "FETCH_CHAT_LIST_FAILURE",
    CLEAR: "FETCH_CHAT_LIST_ClEAR",
}

export const AddToChatListActionTypes = {
    REQUEST: "ADD_TO_CHAT_LIST_REQUEST",
}

export const UpdateChatListActionTypes = {
    REQUEST: "UPDATE_CHAT_LIST",
}

export const SelectedChatActionTypes = {
    REQUEST: "SELECTED_CHAT_REQUEST",
    CLEAR: "SELECTED_CHAT_ClEAR"
}

export const {
    fetchChatListRequest,
    fetchChatListSuccess,
    fetchChatListFailure,
    fetchChatListClear,
    selectedChatRequest,
    selectedChatClear,
    addToChatListRequest,
    updateChatList
} = createActions({
    [FetchChatListActionTypes.REQUEST]: (payload) => payload,
    [FetchChatListActionTypes.SUCCESS]: (payload) => (payload),
    [FetchChatListActionTypes.FAILURE]: (error) => (error),
    [FetchChatListActionTypes.FAILURE]: () => { },
    [SelectedChatActionTypes.REQUEST]: (payload) => payload,
    [SelectedChatActionTypes.CLEAR]: () => { },
    [AddToChatListActionTypes.REQUEST]: (payload) => payload,
    [UpdateChatListActionTypes.REQUEST]: (payload) => payload,
});