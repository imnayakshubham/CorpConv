import { createActions } from "redux-actions";

export const AddPostActionTypes = {
    REQUEST: 'ADD_POST_REQUEST',
    SUCCESS: 'ADD_POST_SUCCESS',
    FAILURE: 'ADD_POST_FAILURE',
    CLEAR: 'ADD_POST_CLEAR',
}

export const FetchPostsActionTypes = {
    REQUEST: 'FETCH_POSTS_REQUEST',
    SUCCESS: 'FETCH_POSTS_SUCCESS',
    FAILURE: 'FETCH_POSTS_FAILURE',
    CLEAR: 'FETCH_POSTS_CLEAR',
}

export const UpvotePostActionTypes = {
    REQUEST: 'UPVOTE_POST_REQUEST',
    SUCCESS: 'UPVOTE_POST_SUCCESS',
    FAILURE: 'UPVOTE_POST_FAILURE',
    CLEAR: 'UPVOTE_POST_CLEAR',
}

export const CommentActionTypes = {
    REQUEST: 'COMMENT_REQUEST',
    SUCCESS: 'COMMENT_SUCCESS',
    FAILURE: 'COMMENT_FAILURE',
    CLEAR: 'COMMENT_CLEAR',
}

export const ReplyToCommentActionTypes = {
    REQUEST: 'REPLY_TO_COMMENT_REQUEST',
    SUCCESS: 'REPLY_TO_COMMENT_SUCCESS',
    FAILURE: 'REPLY_TO_COMMENT_FAILURE',
    CLEAR: 'REPLY_TO_COMMENT_CLEAR',
}

export const LikeCommentActionTypes = {
    REQUEST: 'LIKE_COMMENT_REQUEST',
    SUCCESS: 'LIKE_COMMENT_SUCCESS',
    FAILURE: 'LIKE_COMMENT_FAILURE',
    CLEAR: 'LIKE_COMMENT_CLEAR',
}

export const DeleteCommentActionTypes = {
    REQUEST: 'DELETE_COMMENT_REQUEST',
    SUCCESS: 'DELETE_COMMENT_SUCCESS',
    FAILURE: 'DELETE_COMMENT_FAILURE',
    CLEAR: 'DELETE_COMMENT_CLEAR',
}

export const EditPostActionTypes = {
    REQUEST: 'EDIT_POST_REQUEST',
    SUCCESS: 'EDIT_POST_SUCCESS',
    FAILURE: 'EDIT_POST_FAILURE',
    CLEAR: 'EDIT_POST_CLEAR',
}

export const DeletePostActionTypes = {
    REQUEST: 'DELETE_POST_REQUEST',
    SUCCESS: 'DELETE_POST_SUCCESS',
    FAILURE: 'DELETE_POST_FAILURE',
    CLEAR: 'DELETE_POST_CLEAR',
}

export const GetCommentRepliesActionTypes = {
    REQUEST: 'GET_COMMENT_REPLIES_REQUEST',
    SUCCESS: 'GET_COMMENT_REPLIES_SUCCESS',
    FAILURE: 'GET_COMMENT_REPLIES_FAILURE',
    CLEAR: 'GET_COMMENT_REPLIES_CLEAR',
}

export const {
    addPostRequest,
    addPostSuccess,
    addPostFailure,
    addPostClear,
    fetchPostsRequest,
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchPostsClear,
    upvotePostRequest,
    upvotePostSuccess,
    upvotePostFailure,
    upvotePostClear,
    commentRequest,
    commentSuccess,
    commentFailure,
    commentClear,
    replyToCommentRequest,
    replyToCommentSuccess,
    replyToCommentFailure,
    replyToCommentClear,
    likeCommentRequest,
    likeCommentSuccess,
    likeCommentFailure,
    likeCommentClear,
    deleteCommentRequest,
    deleteCommentSuccess,
    deleteCommentFailure,
    deleteCommentClear,
    editPostRequest,
    editPostSuccess,
    editPostFailure,
    editPostClear,
    deletePostRequest,
    deletePostSuccess,
    deletePostFailure,
    deletePostClear,

    getCommentRepliesRequest,
    getCommentRepliesSuccess,
    getCommentRepliesFailure,
    getCommentRepliesClear

} = createActions({
    [AddPostActionTypes.REQUEST]: (payload) => payload,
    [AddPostActionTypes.SUCCESS]: (payload) => payload,
    [AddPostActionTypes.FAILURE]: (error) => error,
    [AddPostActionTypes.CLEAR]: () => { },
    [FetchPostsActionTypes.REQUEST]: (payload) => payload,
    [FetchPostsActionTypes.SUCCESS]: (payload) => payload,
    [FetchPostsActionTypes.FAILURE]: (error) => error,
    [FetchPostsActionTypes.CLEAR]: () => { },
    [UpvotePostActionTypes.REQUEST]: (payload) => payload,
    [UpvotePostActionTypes.SUCCESS]: (payload) => payload,
    [UpvotePostActionTypes.FAILURE]: (error) => error,
    [UpvotePostActionTypes.CLEAR]: () => { },
    [CommentActionTypes.REQUEST]: (payload) => payload,
    [CommentActionTypes.SUCCESS]: (payload) => payload,
    [CommentActionTypes.FAILURE]: (error) => error,
    [CommentActionTypes.CLEAR]: () => { },
    [ReplyToCommentActionTypes.REQUEST]: (payload) => payload,
    [ReplyToCommentActionTypes.SUCCESS]: (payload) => payload,
    [ReplyToCommentActionTypes.FAILURE]: (error) => error,
    [ReplyToCommentActionTypes.CLEAR]: () => { },
    [LikeCommentActionTypes.REQUEST]: (payload) => payload,
    [LikeCommentActionTypes.SUCCESS]: (payload) => payload,
    [LikeCommentActionTypes.FAILURE]: (error) => error,
    [LikeCommentActionTypes.CLEAR]: () => { },
    [DeleteCommentActionTypes.REQUEST]: (payload) => payload,
    [DeleteCommentActionTypes.SUCCESS]: (payload) => payload,
    [DeleteCommentActionTypes.FAILURE]: (error) => error,
    [DeleteCommentActionTypes.CLEAR]: () => { },
    [EditPostActionTypes.REQUEST]: (payload) => payload,
    [EditPostActionTypes.SUCCESS]: (payload) => payload,
    [EditPostActionTypes.FAILURE]: (error) => error,
    [EditPostActionTypes.CLEAR]: () => { },
    [DeletePostActionTypes.REQUEST]: (payload) => payload,
    [DeletePostActionTypes.SUCCESS]: (payload) => payload,
    [DeletePostActionTypes.FAILURE]: (error) => error,
    [DeletePostActionTypes.CLEAR]: () => { },
    [GetCommentRepliesActionTypes.REQUEST]: (payload) => payload,
    [GetCommentRepliesActionTypes.SUCCESS]: (payload) => payload,
    [GetCommentRepliesActionTypes.FAILURE]: (error) => error,
    [GetCommentRepliesActionTypes.CLEAR]: () => { },
})