import { handleActions } from "redux-actions";
import { SocketActionTypes, } from "../action/common";

const defaultState = {
    socketInstance: null
}


const commonReducer = handleActions({
    [SocketActionTypes.SAVE]: (state, action) => {
        return {
            ...state,
            socketInstance: action.payload,

        }
    },
}, defaultState);

export default commonReducer;