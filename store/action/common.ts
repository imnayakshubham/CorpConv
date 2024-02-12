import { createActions } from "redux-actions";


export const SocketActionTypes = {
    SAVE: "SOCKET_SAVE",
}

export const {
    socketSave
} = createActions({
    [SocketActionTypes.SAVE]: (payload) => payload,
});