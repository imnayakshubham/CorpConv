import { call, put, select, takeLatest } from "redux-saga/effects"
import { acceptInvitationFailure, acceptInvitationRequest, acceptInvitationSuccess, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, followUserFailure, followUserRequest, followUserSuccess, getUserInfoFailure, getUserInfoRequest, getUserInfoSuccess } from "../action/users"
import { fetchUsersApi } from "../../services/apis"
import { defaultHeaders } from "../../constants"
import { updateProfileSuccess } from "../action/login"
import { sendGet, sendPost } from "../../src/utils/sendApiRequest"




function* fetchUsersListSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { result, status, message } } = yield call(fetchUsersApi, payload, headers)

        if (status === "Success") {
            yield put(fetchUsersSuccess(result))
        }
        else {
            yield put(fetchUsersFailure(message))
        }
    } catch (error) {
        yield put(fetchUsersFailure(error))
    }
}

function* followUserSaga({ payload }) {
    try {
        const loginResponse = yield select((state) => state.login.loginResponse);
        const headers = {
            ...defaultHeaders,
            token: loginResponse.token,
        }
        const newPayload = {
            senderId: payload.senderId, receiverId: payload.receiverId
        }
        const url = `send-follow-request`
        const { data: { result, status, message } } = yield call(sendPost(url), newPayload, headers)
        if (status === "Success") {
            yield put(followUserSuccess({ tab: payload.tab, receiverId: payload.receiverId }))
            if (loginResponse._id === result._id) {
                yield put(updateProfileSuccess(result))
            }
        }
        else {
            yield put(followUserFailure(message))
        }
    } catch (error) {
        yield put(followUserFailure(error))
    }
}

function* acceptInvitationSaga({ payload }) {
    try {
        const loginResponse = yield select((state) => state.login.loginResponse);
        const headers = {
            ...defaultHeaders,
            token: loginResponse.token,
        }
        const url = `accept-follow-request`
        const { data: { result, status, message } } = yield call(sendPost(url), payload, headers)
        if (status === "Success") {
            yield put(acceptInvitationSuccess(result))
            if (loginResponse._id === result._id) {
                yield put(updateProfileSuccess(result))
            }
        }
        else {
            yield put(acceptInvitationFailure(message))
        }
    } catch (error) {
        yield put(acceptInvitationFailure(error))
    }
}

function* fetchUserInfoSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse?.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const url = `user/${payload._id}`
        const { data: { result, status, message } } = yield call(sendGet(url), null, headers)
        if (status === "Success") {
            yield put(getUserInfoSuccess(result))
        }
        else {
            yield put(getUserInfoFailure(message))
        }
    } catch (error) {
        console.log(error)
        yield put(getUserInfoFailure(error))
    }
}

export default function* rootSaga() {
    yield takeLatest(fetchUsersRequest, fetchUsersListSaga)
    yield takeLatest(followUserRequest, followUserSaga)
    yield takeLatest(acceptInvitationRequest, acceptInvitationSaga)
    yield takeLatest(getUserInfoRequest, fetchUserInfoSaga)
}