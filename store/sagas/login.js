import {
    takeLatest,
    call,
    put,
    select,

} from "redux-saga/effects"
import { defaultHeaders } from "../../constants"
import { loginApi, logoutApi, updateUserProfileApi } from "../../services/apis"
import { loginFailure, loginRequest, loginSuccess, logoutFailure, logoutRequest, logoutSuccess, updateProfileFailure, updateProfileRequest, updateProfileSuccess } from "../action/login"
import { notification } from "antd"
import { history } from "../../src/main"

function* loginSaga({ payload }) {
    try {
        const { data: { result, status, message } } = yield call(loginApi, payload, defaultHeaders)

        if (status === "Success") {
            yield put(loginSuccess(result))

        }
        else {
            yield put(loginFailure(message))
        }
    } catch (error) {
        yield put(loginFailure(error))
    }
}

function* logoutSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message } } = yield call(logoutApi, payload, headers)
        if (status === "Success") {
            yield put(logoutSuccess())
            yield call(history.push, `/`)
        }
        else {
            yield put(logoutFailure(message))
        }
    } catch (error) {
        yield put(logoutFailure(error))
    }
}

function* updateProfileSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { result, status, message } } = yield call(updateUserProfileApi, payload, headers)

        if (status === "Success") {
            yield put(updateProfileSuccess(result))
            notification.success({
                message
            })
            yield call(history.push, `user/${result._id}`)
        }
        else {
            yield put(updateProfileFailure(message))
            notification.error({
                message
            })
        }
    } catch (error) {
        yield put(updateProfileFailure(error))
        notification.error({
            message: "Error"
        })
    }
}


export default function* rootSaga() {
    yield takeLatest(loginRequest, loginSaga)
    yield takeLatest(logoutRequest, logoutSaga)
    yield takeLatest(updateProfileRequest, updateProfileSaga)
}