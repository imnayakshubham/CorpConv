import { appKey } from "../../constants"
import { appReducer } from "../configSaga"

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT_SUCCESS") {
        localStorage.removeItem(appKey)
        return appReducer(undefined, action)
    }
    if (action.type.includes('REQUEST')) {
        return appReducer({ ...state }, action)
    }
    return appReducer(state, action)
}

export { rootReducer };