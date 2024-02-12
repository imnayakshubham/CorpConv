import { useEffect, useState } from 'react'
import { CreatePost } from './CreatePost/CreatePost'
import "./Posts.css"
import { useDispatch, useSelector } from 'react-redux'
import { addPostSuccess, fetchPostsRequest, upvotePostSuccess } from '../../../store/action/posts'
import { PostList } from './PostList/PostList'


export const Posts = () => {
    const socket = useSelector((state) => state.common.socketInstance)

    const [postModalData, setPostModalData] = useState({
        showModel: false,
        data: null,
        mode: "create"
    })

    const userInfo = useSelector((state) => state.login.loginResponse)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!socket) return
        socket.on("listen_post_creation", (postData) => {
            if (userInfo?._id !== postData.post_posted_by._id) {
                dispatch(addPostSuccess(postData))
            }
        })
        // socket.on("listen_job_edition", (jobData) => {
        //     if (userInfo?._id !== jobData.job_posted_by._id) {
        //         dispatch(editJobSuccess(jobData))
        //     }
        // })
        socket.on("listen_upvote", (postData) => {
            if (userInfo?._id !== postData.upvoted_by) {
                if (postData.data) {
                    dispatch(upvotePostSuccess(postData.data))
                }
            }
        })
        // socket.on("listen_job_bookmark", (jobData) => {
        //     if (userInfo?._id !== jobData.job_posted_by._id) {
        //         dispatch(createBookmarkSuccess(jobData))
        //     }
        // })
    }, [dispatch, socket, userInfo?._id])

    useEffect(() => {
        dispatch(fetchPostsRequest())
    }, [dispatch])

    return (
        <div>
            {
                userInfo &&
                <CreatePost postModalData={postModalData} setPostModalData={setPostModalData} />
            }
            <PostList setPostModalData={setPostModalData} />

        </div>
    )
}
