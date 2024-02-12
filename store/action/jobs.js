// Create Job sAGA ACTION

import { createActions } from "redux-actions";



export const CreateJobActionTypes = {
    REQUEST: "CREATE_JOB_REQUEST",
    SUCCESS: "CREATE_JOB_SUCCESS",
    FAILURE: "CREATE_JOB_FAILURE",
    CLEAR: "CREATE_JOB_ClEAR",
}


export const FetchJobsActionTypes = {
    REQUEST: "FETCH_JOBS_REQUEST",
    SUCCESS: "FETCH_JOBS_SUCCESS",
    FAILURE: "FETCH_JOBS_FAILURE",
    CLEAR: "FETCH_JOBS_ClEAR",
}

//EDIT JOB
export const EditJobActionTypes = {
    REQUEST: "EDIT_JOB_REQUEST",
    SUCCESS: "EDIT_JOB_SUCCESS",
    FAILURE: "EDIT_JOB_FAILURE",
    CLEAR: "EDIT_JOB_ClEAR",
}

// Delete Job

export const DeleteJobActionTypes = {
    REQUEST: "DELETE_JOB_REQUEST",
    SUCCESS: "DELETE_JOB_SUCCESS",
    FAILURE: "DELETE_JOB_FAILURE",
    CLEAR: "DELETE_JOB_ClEAR",
}

//Like and Dislike

export const LikeDislikeActionTypes = {
    REQUEST: "LIKE_DISLIKE_REQUEST",
    SUCCESS: "LIKE_DISLIKE_SUCCESS",
    FAILURE: "LIKE_DISLIKE_FAILURE",
    CLEAR: "LIKE_DISLIKE_ClEAR",
}

// Create Bookmark Action Types

export const CreateBookmarkActionTypes = {
    REQUEST: "CREATE_BOOKMARK_REQUEST",
    SUCCESS: "CREATE_BOOKMARK_SUCCESS",
    FAILURE: "CREATE_BOOKMARK_FAILURE",
    CLEAR: "CREATE_BOOKMARK_ClEAR",
}


export const {
    createJobRequest,
    createJobSuccess,
    createJobFailure,
    createJobClear,
    fetchJobsRequest,
    fetchJobsSuccess,
    fetchJobsFailure,
    fetchJobsClear,
    editJobRequest,
    editJobSuccess,
    editJobFailure,
    editJobClear,
    deleteJobRequest,
    deleteJobSuccess,
    deleteJobFailure,
    deleteJobClear,
    likeDislikeRequest,
    likeDislikeSuccess,
    likeDislikeFailure,
    likeDislikeClear,
    createBookmarkRequest,
    createBookmarkSuccess,
    createBookmarkFailure,
    createBookmarkClear,
} = createActions({
    [CreateJobActionTypes.REQUEST]: (payload) => payload,
    [CreateJobActionTypes.SUCCESS]: (payload) => (payload),
    [CreateJobActionTypes.FAILURE]: () => { },
    [CreateJobActionTypes.CLEAR]: () => { },
    [FetchJobsActionTypes.REQUEST]: (payload) => payload,
    [FetchJobsActionTypes.SUCCESS]: (payload) => (payload),
    [FetchJobsActionTypes.FAILURE]: () => { },
    [FetchJobsActionTypes.CLEAR]: () => { },
    [EditJobActionTypes.REQUEST]: (payload) => payload,
    [EditJobActionTypes.SUCCESS]: (payload) => (payload),
    [EditJobActionTypes.FAILURE]: () => { },
    [EditJobActionTypes.CLEAR]: () => { },
    [DeleteJobActionTypes.REQUEST]: (payload) => payload,
    [DeleteJobActionTypes.SUCCESS]: (payload) => (payload),
    [DeleteJobActionTypes.FAILURE]: (payload) => payload,
    [DeleteJobActionTypes.CLEAR]: () => { },
    [LikeDislikeActionTypes.REQUEST]: (payload) => payload,
    [LikeDislikeActionTypes.SUCCESS]: (payload) => (payload),
    [LikeDislikeActionTypes.FAILURE]: (payload) => payload,
    [LikeDislikeActionTypes.CLEAR]: () => { },
    [CreateBookmarkActionTypes.REQUEST]: (payload) => payload,
    [CreateBookmarkActionTypes.SUCCESS]: (payload) => (payload),
    [CreateBookmarkActionTypes.FAILURE]: (payload) => payload,
    [CreateBookmarkActionTypes.CLEAR]: () => { },
});

