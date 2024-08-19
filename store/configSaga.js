
import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistReducer, createTransform } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "./reducer/index"
import loginReducer from "./reducer/login"
import { AsyncStates, appKey } from "../constants"

import loginSaga from "./sagas/login";
import usersSaga from "./sagas/users";
import usersReducer from "./reducer/users"
import chatsSaga from "./sagas/chats";
// import commonSaga from "./sagas/common";
import postsReducer from "./reducer/posts"
import { axiosInstance } from "../src/utils/sendApiRequest"

import chatReducer from "./reducer/chats"
import commonReducer from "./reducer/common"
import jobsReducer from "./reducer/jobs"
import jobsSaga from "./sagas/jobs";
import postsSaga from "./sagas/posts";
import { notification } from "antd"


const sagaMiddleware = createSagaMiddleware()
const setTransform = createTransform(
    (inboundState) => inboundState,
    (outboundState) => ({
        ...outboundState,
        status: AsyncStates.INITIAL,
    }),
    // define which reducers this transform gets called for.
    { whitelist: ["login"] }
)

const persistConfig = {
    key: appKey,
    storage,
    whitelist: [
        "login",
    ],
    transforms: [setTransform],
}

export const appReducer = combineReducers({
    login: loginReducer,
    users: usersReducer,
    chatData: chatReducer,
    common: commonReducer,
    jobs: jobsReducer,
    posts: postsReducer

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
)

const rootSagas = [
    loginSaga,
    usersSaga,
    chatsSaga,
    jobsSaga,
    postsSaga
    // commonSaga
]

rootSagas.forEach(sagaMiddleware.run)
const persistor = persistStore(store)
export { store, persistor }


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                notification.error({
                    message: "Session Expired",
                    description: "Your session has expired. Please log in again.",
                });
                store.dispatch({ type: "LOGOUT_SUCCESS" });
            } else if (status === 400) {
                notification.error({

                    message: "Invalid Request", description: "There was an issue with your request. Please try again.",
                });
                store.dispatch({ type: "LOGOUT_SUCCESS" });

            } else if (status === 404) {
                notification.error({

                    message: "User Not Found",
                    description: "User not found or access is revoked.",
                }); store.dispatch({ type: "LOGOUT_SUCCESS" });
            }
        } else {
            // Handle errors without a response (e.g., network errors)
            notification.error({
                message: "Network Error",
                description: "An error occurred. Please check your connection and try again.",
            });
        }

        // Pass the error to the next handler (if any)
        return Promise.reject(error);
    }
);
