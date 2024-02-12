import { handleActions } from "redux-actions";
import { AsyncStates } from "../../constants";
import { CreateBookmarkActionTypes, CreateJobActionTypes, DeleteJobActionTypes, EditJobActionTypes, FetchJobsActionTypes, LikeDislikeActionTypes } from "../action/jobs";



// Job Default STATE
const defaultState = {
    createJobStatus: AsyncStates.INITIAL,
    createJobError: null,
    jobsList: [],
    fetchJobsStatus: AsyncStates.INITIAL,
    fetchJobsError: null,
    editJobStatus: AsyncStates.INITIAL,
    editJobError: null,
    deleteJobStatus: AsyncStates.INITIAL,
    deleteJobError: null,
    jobLikeDislikeStatus: AsyncStates.INITIAL,
    jobLikeDislikeError: null,
    bookmarkStatus: AsyncStates.INITIAL,
    bookmarkStatusError: null,
};


// Job Reducer

const jobsReducer = handleActions({
    [CreateJobActionTypes.REQUEST]: (state, action) => {
        return {
            ...state,
            createJobStatus: AsyncStates.LOADING,
            createJobError: null,
        }
    },
    [CreateJobActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            createJobStatus: AsyncStates.SUCCESS,
            createJobError: null,
            jobsList: [action.payload, ...state.jobsList],
        };
    },
    [CreateJobActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            createJobStatus: AsyncStates.ERROR,
            createJobError: action.payload,
        }
    },
    [CreateJobActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            createJobStatus: AsyncStates.INITIAL,
            createJobError: null,
        }
    },
    [FetchJobsActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            fetchJobsStatus: AsyncStates.LOADING,
            fetchJobsError: null,
        }
    },
    [FetchJobsActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            fetchJobsStatus: AsyncStates.SUCCESS,
            fetchJobsError: null,
            jobsList: action.payload,
        };
    },
    [FetchJobsActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            fetchJobsStatus: AsyncStates.ERROR,
            fetchJobsError: action.payload,
        }
    },
    [FetchJobsActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            fetchJobsStatus: AsyncStates.INITIAL,
            fetchJobsError: null,
        }
    },
    [EditJobActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            editJobStatus: AsyncStates.LOADING,
            editJobError: null,
        }
    },
    [EditJobActionTypes.SUCCESS]: (state, action) => {
        console.log(action.payload)
        return {
            ...state,
            editJobStatus: AsyncStates.SUCCESS,
            editJobError: null,
            jobsList: state.jobsList.map(job => job._id === action.payload._id ? action.payload : job)
        };
    },
    [EditJobActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            editJobStatus: AsyncStates.ERROR,
            editJobError: action.payload,
        }
    },
    [EditJobActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            editJobStatus: AsyncStates.INITIAL,
            editJobError: null,
        }
    },
    [DeleteJobActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            deleteJobStatus: AsyncStates.LOADING,
            deleteJobError: null,
        }
    },
    [DeleteJobActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            deleteJobStatus: AsyncStates.SUCCESS,
            deleteJobError: null,
            jobsList: state.jobsList.filter(job => job._id !== action.payload._id)
        };
    },
    [DeleteJobActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            deleteJobStatus: AsyncStates.ERROR,
            deleteJobError: action.payload,
        }
    },
    [DeleteJobActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            deleteJobStatus: AsyncStates.INITIAL,
            deleteJobError: null,
        }
    },
    [LikeDislikeActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            jobLikeDislikeStatus: AsyncStates.LOADING,
            jobLikeDislikeError: null,
        }
    },
    [LikeDislikeActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            jobLikeDislikeStatus: AsyncStates.SUCCESS,
            jobLikeDislikeError: null,
            jobsList: state.jobsList.map(job => job._id === action.payload._id ? action.payload : job)
        };
    },
    [LikeDislikeActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            jobLikeDislikeStatus: AsyncStates.ERROR,
            jobLikeDislikeError: action.payload,
        }
    },
    [LikeDislikeActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            jobLikeDislikeStatus: AsyncStates.INITIAL,
            jobLikeDislikeError: null,
        }
    },
    [CreateBookmarkActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            bookmarkStatus: AsyncStates.LOADING,
            bookmarkStatusError: null,
        }
    },

    [CreateBookmarkActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            bookmarkStatus: AsyncStates.SUCCESS,
            bookmarkStatusError: null,
            jobsList: state.jobsList.map(job => job._id === action.payload._id ? action.payload : job)
        };
    },
    [CreateBookmarkActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            bookmarkStatus: AsyncStates.ERROR,
            bookmarkStatusError: action.payload,
        }
    },
    [CreateBookmarkActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            bookmarkStatus: AsyncStates.INITIAL,
            bookmarkStatusError: null,
        }
    },

}, defaultState)

export default jobsReducer;

