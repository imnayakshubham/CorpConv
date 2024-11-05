import { handleActions } from "redux-actions";
import { AddPostActionTypes, CommentActionTypes, DeleteCommentActionTypes, DeletePostActionTypes, EditPostActionTypes, FetchPostsActionTypes, GetCommentRepliesActionTypes, LikeCommentActionTypes, ReplyToCommentActionTypes, UpvotePostActionTypes } from "../action/posts";
import { AsyncStates } from "../../constants";

const defaultState = {
    addPostStatus: AsyncStates.INITIAL,
    addPostError: null,
    postsList: [],
    fetchPostsStatus: AsyncStates.INITIAL,
    fetchPostsError: null,
    editPostStatus: AsyncStates.INITIAL,
    editPostError: null,
    deletePostStatus: AsyncStates.INITIAL,
    deletePostError: null,
    postUpvoteStatus: AsyncStates.INITIAL,
    postUpvoteError: null,
    commentStatus: AsyncStates.INITIAL,
    commentError: null,
    replyToCommentStatus: AsyncStates.INITIAL,
    replyToCommentError: null,
    likeCommentStatus: AsyncStates.INITIAL,
    likeCommentError: null,
    deleteCommentStatus: AsyncStates.INITIAL,
    deleteCommentError: null,
    // bookmarkStatus: AsyncStates.INITIAL,
    // bookmarkStatusError: null,

    getCommentRepliesStatus: {},
    getCommentRepliesError: {},
};


const postsReducer = handleActions<any>({
    [AddPostActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            addPostStatus: AsyncStates.LOADING,
            addPostError: null,
        }
    },
    [AddPostActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            addPostStatus: AsyncStates.SUCCESS,
            addPostError: null,
            postsList: [action.payload, ...state.postsList],
        };
    },
    [AddPostActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            addPostStatus: AsyncStates.ERROR,
            addPostError: action.payload,
        }
    },
    [AddPostActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            addPostStatus: AsyncStates.INITIAL,
            addPostError: null,
        }
    },
    [FetchPostsActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            fetchPostsStatus: AsyncStates.LOADING,
            fetchPostsError: null,
        }
    },
    [FetchPostsActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            fetchPostsStatus: AsyncStates.SUCCESS,
            fetchPostsError: null,
            postsList: action.payload,
        }
    },
    [FetchPostsActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            fetchPostsStatus: AsyncStates.ERROR,
            fetchPostsError: action.payload,
        }
    },
    [FetchPostsActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            fetchPostsStatus: AsyncStates.INITIAL,
            fetchPostsError: null,
        }
    },
    [UpvotePostActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            postUpvoteStatus: AsyncStates.LOADING,
            postUpvoteError: null,
        }
    },
    [UpvotePostActionTypes.SUCCESS]: (state, action) => {
        const newPostsList = JSON.parse(JSON.stringify(state.postsList)).map((post: any) => {
            if (post._id === action.payload._id) {
                return action.payload
            }
            return post
        })
        return {
            ...state,
            postUpvoteStatus: AsyncStates.SUCCESS,
            postUpvoteError: null,
            postsList: newPostsList
        }
    },
    [UpvotePostActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            postUpvoteStatus: AsyncStates.ERROR,
            postUpvoteError: action.payload,
        }
    },
    [UpvotePostActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            postUpvoteStatus: AsyncStates.INITIAL,
            postUpvoteError: null,
        }
    },
    [CommentActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            commentStatus: AsyncStates.LOADING,
            commentError: null,
        }
    },
    [CommentActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            commentStatus: AsyncStates.SUCCESS,
            commentError: null,
            postsList: state.postsList.map((post: any) => {
                if (post._id === action.payload._id) {
                    return action.payload
                }
                return post
            })
        }
    },
    [CommentActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            commentStatus: AsyncStates.ERROR,
            commentError: action.payload,
        }
    },
    [CommentActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            commentStatus: AsyncStates.INITIAL,
            commentError: null,
        }
    },
    [ReplyToCommentActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            replyToCommentStatus: AsyncStates.LOADING,
            replyToCommentError: null,
        }
    },
    [ReplyToCommentActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            replyToCommentStatus: AsyncStates.SUCCESS,
            replyToCommentError: null,
            postsList: state.postsList.map((post: any) => {
                if (post._id === action.payload._id) {
                    return action.payload
                }
                return post
            })
        }
    },
    [ReplyToCommentActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            replyToCommentStatus: AsyncStates.ERROR,
            replyToCommentError: action.payload,
        }
    },
    [ReplyToCommentActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            replyToCommentStatus: AsyncStates.INITIAL,
            replyToCommentError: null,
        }
    },
    [LikeCommentActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            likeCommentStatus: AsyncStates.LOADING,
            likeCommentError: null,
        }
    },
    [LikeCommentActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            likeCommentStatus: AsyncStates.SUCCESS,
            likeCommentError: null,
            postsList: state.postsList.map((post: any) => {
                if (post._id === action.payload._id) {
                    return action.payload
                }
                return post
            })
        }
    },
    [LikeCommentActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            likeCommentStatus: AsyncStates.ERROR,
            likeCommentError: action.payload,
        }
    },
    [LikeCommentActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            likeCommentStatus: AsyncStates.INITIAL,
            likeCommentError: null,
        }
    },
    [DeleteCommentActionTypes.REQUEST]: (state,) => {
        return {
            ...state,
            deleteCommentStatus: AsyncStates.LOADING,
            deleteCommentError: null,
        }
    },
    [DeleteCommentActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            deleteCommentStatus: AsyncStates.SUCCESS,
            deleteCommentError: null,
            postsList: state.postsList.map((post: any) => {
                if (post._id === action.payload._id) {
                    return action.payload
                }
                return post
            })
        }
    },
    [DeleteCommentActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            deleteCommentStatus: AsyncStates.ERROR,
            deleteCommentError: action.payload,
        }
    },
    [DeleteCommentActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            deleteCommentStatus: AsyncStates.INITIAL,
            deleteCommentError: null,
        }
    },
    [EditPostActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            editPostStatus: AsyncStates.LOADING,
            editPostError: null,
        }
    },
    [EditPostActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            editPostStatus: AsyncStates.SUCCESS,
            editPostError: null,
            postsList: state.postsList.map((post: any) => {
                if (post._id === action.payload._id) {
                    return action.payload
                }
                return post
            })
        }
    },
    [EditPostActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            editPostStatus: AsyncStates.ERROR,
            editPostError: action.payload,
        }
    },
    [EditPostActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            editPostStatus: AsyncStates.INITIAL,
            editPostError: null,
        }
    },
    [DeletePostActionTypes.REQUEST]: (state) => {
        return {
            ...state,
            deletePostStatus: AsyncStates.LOADING,
            deletePostError: null,
        }
    },
    [DeletePostActionTypes.SUCCESS]: (state, action) => {
        return {
            ...state,
            deletePostStatus: AsyncStates.SUCCESS,
            deletePostError: null,
            postsList: state.postsList.filter((post: any) => post._id !== action.payload)
        }
    },
    [DeletePostActionTypes.FAILURE]: (state, action) => {
        return {
            ...state,
            deletePostStatus: AsyncStates.ERROR,
            deletePostError: action.payload,
        }
    },
    [DeletePostActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            deletePostStatus: AsyncStates.INITIAL,
            deletePostError: null,
        }
    },
    [GetCommentRepliesActionTypes.REQUEST]: (state, action) => {
        const comment_id = action.payload.comment_id
        return {
            ...state,
            getCommentRepliesStatus: {
                ...state.getCommentRepliesStatus,
                [comment_id]: AsyncStates.LOADING
            },
            getCommentRepliesError: {
                ...state.getCommentRepliesError,
                [comment_id]: null
            },
        }
    },
    [GetCommentRepliesActionTypes.SUCCESS]: (state, action) => {
        const commentPayload = action.payload.payload
        const commentData = action.payload.data
        const newPostList = JSON.parse(JSON.stringify(state.postsList))

        newPostList.forEach((post: any, postIndex: number) => {
            if (post._id === commentPayload.post_id) {
                post.comments.forEach((comment: any, commentIndex: number) => {
                    if (comment._id === commentPayload.comment_id) {
                        newPostList[postIndex].comments[commentIndex] = commentData
                    }
                });
            }
        })

        return {
            ...state,
            getCommentRepliesStatus: {
                ...state.getCommentRepliesStatus,
                [commentPayload.comment_id]: AsyncStates.SUCCESS
            },
            getCommentRepliesError: {
                ...state.getCommentRepliesError,
                [commentPayload.comment_id]: null
            },
            postsList: newPostList
        }
    },
    [GetCommentRepliesActionTypes.FAILURE]: (state, action) => {
        const comment_id = action.payload.comment_id

        return {
            ...state,
            getCommentRepliesStatus: {
                ...state.getCommentRepliesStatus,
                [comment_id]: AsyncStates.ERROR
            },
            getCommentRepliesError: {
                ...state.getCommentRepliesError,
                [comment_id]: action.payload.error
            },
        }
    },
    [GetCommentRepliesActionTypes.CLEAR]: (state) => {
        return {
            ...state,
            getCommentRepliesStatus: {},
            getCommentRepliesError: {},
        }
    }
}, defaultState)

export default postsReducer;
