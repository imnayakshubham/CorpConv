import { call, put, select, takeLatest } from "redux-saga/effects";
import { createBookmarkFailure, createBookmarkRequest, createBookmarkSuccess, createJobFailure, createJobRequest, createJobSuccess, deleteJobFailure, deleteJobRequest, deleteJobSuccess, editJobFailure, editJobRequest, editJobSuccess, fetchJobsFailure, fetchJobsRequest, fetchJobsSuccess, likeDislikeFailure, likeDislikeRequest, likeDislikeSuccess } from "../action/jobs";
import { jobBookmarkApi, jobCreateApi, jobDeleteApi, jobLikeDisLikeApi, jobUpdateApi } from "../../services/apis";
import { defaultHeaders } from "../../constants";
import { sendGet } from "../../src/utils/sendApiRequest";

function* createJobSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(jobCreateApi, payload, headers);
        if (status === "Success") {
            yield put(createJobSuccess(data));
        } else {
            yield put(createJobFailure(apiMessage));
        }
    } catch (error) {
        console.log({ error })
        yield put(createJobFailure(error));
    }
}


function* fetchJobsSaga({ payload }) {
    try {
        const headers = {
            ...defaultHeaders,
        }
        const url = payload?._id ? `job?user_id=${payload?._id}` : `job`
        const { data: { data, status, message: apiMessage } } = yield call(sendGet(url), payload, headers);
        if (status === "Success") {
            yield put(fetchJobsSuccess(data));
        } else {
            yield put(fetchJobsFailure(apiMessage));
        }
    } catch (error) {
        yield put(fetchJobsFailure(error));
    }
}

function* editJobSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data }, } = yield call(jobUpdateApi, payload, headers);
        if (status === "Success") {
            yield put(editJobSuccess(data));
        } else {
            yield put(editJobFailure(apiMessage));
        }
    } catch (error) {
        console.log({ error })
        yield put(editJobFailure(error));
    }
}

function* deleteJobSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(jobDeleteApi, payload, headers);
        if (status === "Success") {
            yield put(deleteJobSuccess(data));
        } else {
            yield put(deleteJobFailure(apiMessage));
        }
    } catch (error) {
        console.log({ error })
        yield put(deleteJobFailure(error));
    }
}

function* likeDislikeJobSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(jobLikeDisLikeApi, payload, headers);
        if (status === "Success") {
            yield put(likeDislikeSuccess(data));
        } else {
            yield put(likeDislikeFailure(apiMessage));
        }
    } catch (error) {
        yield put(likeDislikeFailure(error));
    }
}

function* createBookmarkSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(jobBookmarkApi, payload, headers);
        if (status === "Success") {
            yield put(createBookmarkSuccess(data));
        } else {
            yield put(createBookmarkFailure(apiMessage));
        }
    } catch (error) {
        yield put(createBookmarkFailure(error));
    }
}

export default function* rootSaga() {
    yield takeLatest(createJobRequest, createJobSaga);
    yield takeLatest(fetchJobsRequest, fetchJobsSaga);
    yield takeLatest(editJobRequest, editJobSaga);
    yield takeLatest(deleteJobRequest, deleteJobSaga);
    yield takeLatest(likeDislikeRequest, likeDislikeJobSaga);
    yield takeLatest(createBookmarkRequest, createBookmarkSaga);
}