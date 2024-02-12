import { call, put, select, takeLatest } from "redux-saga/effects"
import { getChatsList } from "../../services/apis"
import { defaultHeaders } from "../../constants"
import { fetchChatListFailure, fetchChatListRequest, fetchChatListSuccess } from "../action/chats"




function* fetchChatsListSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { result, status, message } } = yield call(getChatsList, payload, headers)

        if (status === "Success") {
            yield put(fetchChatListSuccess(result))
        }
        else {
            yield put(fetchChatListFailure(message))
        }
    } catch (error) {
        yield put(fetchChatListFailure(error))
    }
}


export default function* rootSaga() {
    yield takeLatest(fetchChatListRequest, fetchChatsListSaga)
}