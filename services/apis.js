import { sendGet, sendPost } from "../src/utils/sendApiRequest"


export const loginApi = sendPost("auth")
export const logoutApi = sendPost("logout")
export const fetchUsersApi = sendPost("users")
export const updateUserProfileApi = sendPost("update-profile")

export const getChatsList = sendGet("chat/chat-list")

export const jobCreateApi = sendPost("job/create")

export const jobUpdateApi = sendPost("job/update")

export const jobDeleteApi = sendPost("job/delete")

export const jobLikeDisLikeApi = sendPost("job/like")

export const jobBookmarkApi = sendPost("job/bookmark")

export const fetchJobsApi = sendGet("job")

export const addPostApi = sendPost("post/create")

export const updatePostApi = sendPost("post/update")

export const upvotePostApi = sendPost("post/upvote")

export const commentApi = sendPost("comment/create")

export const replyCommentApi = sendPost("comment/reply")

export const likeCommentApi = sendPost("comment/like")

export const deleteCommentApi = sendPost("comment/delete")

export const deletePosttApi = sendPost("post/delete")



