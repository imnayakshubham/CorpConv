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

} = createActions({
    [AddPostActionTypes.REQUEST]: (payload: any) => payload,
    [AddPostActionTypes.SUCCESS]: (payload: any) => payload,
    [AddPostActionTypes.FAILURE]: (error: any) => error,
    [AddPostActionTypes.CLEAR]: () => { },
    [FetchPostsActionTypes.REQUEST]: (payload: any) => payload,
    [FetchPostsActionTypes.SUCCESS]: (payload: any) => payload,
    [FetchPostsActionTypes.FAILURE]: (error: any) => error,
    [FetchPostsActionTypes.CLEAR]: () => { },
    [UpvotePostActionTypes.REQUEST]: (payload: any) => payload,
    [UpvotePostActionTypes.SUCCESS]: (payload: any) => payload,
    [UpvotePostActionTypes.FAILURE]: (error: any) => error,
    [UpvotePostActionTypes.CLEAR]: () => { },
    [CommentActionTypes.REQUEST]: (payload: any) => payload,
    [CommentActionTypes.SUCCESS]: (payload: any) => payload,
    [CommentActionTypes.FAILURE]: (error: any) => error,
    [CommentActionTypes.CLEAR]: () => { },
    [ReplyToCommentActionTypes.REQUEST]: (payload: any) => payload,
    [ReplyToCommentActionTypes.SUCCESS]: (payload: any) => payload,
    [ReplyToCommentActionTypes.FAILURE]: (error: any) => error,
    [ReplyToCommentActionTypes.CLEAR]: () => { },
    [LikeCommentActionTypes.REQUEST]: (payload: any) => payload,
    [LikeCommentActionTypes.SUCCESS]: (payload: any) => payload,
    [LikeCommentActionTypes.FAILURE]: (error: any) => error,
    [LikeCommentActionTypes.CLEAR]: () => { },
    [DeleteCommentActionTypes.REQUEST]: (payload: any) => payload,
    [DeleteCommentActionTypes.SUCCESS]: (payload: any) => payload,
    [DeleteCommentActionTypes.FAILURE]: (error: any) => error,
    [DeleteCommentActionTypes.CLEAR]: () => { },
    [EditPostActionTypes.REQUEST]: (payload: any) => payload,
    [EditPostActionTypes.SUCCESS]: (payload: any) => payload,
    [EditPostActionTypes.FAILURE]: (error: any) => error,
    [EditPostActionTypes.CLEAR]: () => { },
    [DeletePostActionTypes.REQUEST]: (payload: any) => payload,
    [DeletePostActionTypes.SUCCESS]: (payload: any) => payload,
    [DeletePostActionTypes.FAILURE]: (error: any) => error,
    [DeletePostActionTypes.CLEAR]: () => { },
})