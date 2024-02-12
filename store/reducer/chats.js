import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import { AddToChatListActionTypes, FetchChatListActionTypes, SelectedChatActionTypes, UpdateChatListActionTypes } from "../action/chats";

const defaultState = {
    chatList: [],
    fetchChatListStatus: AsyncStates.INITIAL,
    fetchChatListError: null,
    selectedChat: null
}


const chatReducer = handleActions({
    [FetchChatListActionTypes.REQUEST]: (state, action) => {
        return {
            ...state,
            ...(!action.payload?.background && { fetchChatListStatus: AsyncStates.LOADING }),
            fetchChatListError: null,
        }
    },
    [FetchChatListActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            fetchChatListStatus: AsyncStates.SUCCESS,
            fetchChatListError: null,
            chatList: action.payload,
        };
    },
    [FetchChatListActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            fetchChatListStatus: AsyncStates.ERROR,
            fetchChatListError: action.payload,
        }
    },
    [FetchChatListActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            chatList: [],
            fetchChatListStatus: AsyncStates.INITIAL,
            fetchChatListError: null,
        }
    },

    [SelectedChatActionTypes.REQUEST]: (state, action) => ({
        ...state,
        selectedChat: action.payload,
    }),
    [SelectedChatActionTypes.CLEAR]: (state) => ({
        ...state,
        selectedChat: null,
    }),
    [AddToChatListActionTypes.REQUEST]: (state, action) => {
        return {
            ...state,
            fetchChatListStatus: AsyncStates.SUCCESS,
            fetchChatListError: null,
            chatList: [...state.chatList, action.payload],
        };
    },

    [UpdateChatListActionTypes.REQUEST]: (state, action) => {
        const newChatList = JSON.parse(JSON.stringify(state.chatList))
        newChatList.forEach((chat, index) => {
            if (chat._id === action.payload?._id) {
                newChatList[index] = action.payload
            }
        })
        return {
            ...state,
            chatList: [...newChatList],
        };
    },

}, defaultState);

export default chatReducer;