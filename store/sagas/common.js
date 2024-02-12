import { put, takeLatest } from "redux-saga/effects"
import { socketSave } from "../action/common"




// function* socketSaveSaga(payload) {
//     yield put(socketSave(payload))
// }

// export default function* rootSaga() {
//     yield takeLatest(socketSave, socketSaveSaga)
// }