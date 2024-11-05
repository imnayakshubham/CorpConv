import { UserAvatar } from '@/components/UserAvatar/UserAvatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { fromNow } from '@/utils/helperFn'
import { AsyncStates, categoriesList } from '../../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { CommentForm, CommentList, UpVoteIcon } from '../PostList/PostList'
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from 'react'
import { commentRequest, deletePostRequest, upvotePostRequest } from '../../../../store/action/posts'
import DOMPurify from 'dompurify'
import { useNavigate, useParams } from 'react-router-dom'
import { CreatePost } from '../CreatePost/CreatePost'
import { sendGet } from '@/utils/sendApiRequest'
import { message } from 'antd'
import { PostSkeleton } from '../PostsSkeleton/PostSkeleton'

const Post = ({ post = null }) => {
    const { loginResponse: userInfo } = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const params = useParams()

    const [fetchPostStatus, setfetchPostStatus] = useState(AsyncStates.INITIAL)

    const [postModalData, setPostModalData] = useState({
        showModel: false,
        data: null,
        mode: "create"
    })

    const [postData, setPostData] = useState(post ?? null)
    const [viewedParentCommentsIds, setViewedParentCommentsIds] = useState(new Set())

    const commentStatus = useSelector(state => state.posts.commentStatus)
    const postUpvoteStatus = useSelector(state => state.posts.postUpvoteStatus)
    const deletePostStatus = useSelector(state => state.posts.deletePostStatus)
    const likeCommentStatus = useSelector(state => state.posts.likeCommentStatus)
    const replyToCommentStatus = useSelector(state => state.posts.replyToCommentStatus)
    const deleteCommentStatus = useSelector(state => state.posts.deleteCommentStatus)

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const handleParentComment = (post_id) => {
        setViewedParentCommentsIds((prev) => {
            const newSet = new Set(prev);

            if (!newSet.has(post_id)) {
                newSet.add(post_id);
            } else {
                newSet.delete(post_id);
            }

            return newSet;
        });
    };

    const onCommentCreate = (data) => {
        dispatch(commentRequest(data))
    }

    const handleUpvote = (postId) => {
        dispatch(upvotePostRequest({ post_id: postId }))
    }

    const handleDeletePost = (post) => {
        dispatch(deletePostRequest({ _id: post?._id }))
    }

    const fetchPost = useCallback(async (post_id, backgroundFetch = false) => {
        if (!backgroundFetch) {
            setfetchPostStatus("Loading")
        }
        try {
            const apiResponse = await sendGet(`post/${post_id}`)
            const { data: { data, status, message } } = await apiResponse()
            if (status === "Success") {
                if (!backgroundFetch) {
                    setfetchPostStatus("Success")
                }
                setPostData(data)
            }
            else if (status === AsyncStates.ERROR) {
                message.error(message)
                if (!backgroundFetch) {
                    setfetchPostStatus(AsyncStates.ERROR)
                }
            }

        } catch (error) {
            message.error("Error fetching post")
            setfetchPostStatus(AsyncStates.ERROR)
        }

    }, [])

    useEffect(() => {
        if (!postData && !!params?.id && fetchPostStatus === AsyncStates.INITIAL) {
            fetchPost(params.id);
        }
    }, [fetchPost, postData, params?.id, fetchPostStatus]);

    useEffect(() => {
        if (!post && (commentStatus === AsyncStates.SUCCESS || postUpvoteStatus === AsyncStates.SUCCESS || deletePostStatus === AsyncStates.SUCCESS || likeCommentStatus === AsyncStates.SUCCESS || replyToCommentStatus === AsyncStates.SUCCESS || likeCommentStatus === AsyncStates.SUCCESS || deleteCommentStatus === AsyncStates.SUCCESS)) {
            fetchPost(params.id, true)
        }
    }, [commentStatus, deletePostStatus, fetchPost, likeCommentStatus, params.id, post, postUpvoteStatus, replyToCommentStatus, deleteCommentStatus])

    if (fetchPostStatus === "Loading") return <PostSkeleton />

    if (!postData && fetchPostStatus !== "Loading") return <>No Post Found</>

    return (
        <div className="post__container__header p-4 md:p-6 lg:px-6 border  cursor-pointer">
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    navigateTo(`/post/${postData._id}`, { state: postData })
                }}
            >
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <UserAvatar avatarImage={postData?.posted_by?.user_public_profile_pic} isUserVerified={postData?.posted_by?.is_email_verified} title={<h3 className="post_by__header">{postData?.posted_by.public_user_name}</h3>}
                            description={<div className="post__header__info">
                                <span className="gray__color_sub_title">{categoriesList[postData?.category]}</span>
                                <span className="gray__color_sub_title">{fromNow(postData?.createdAt)}</span>
                                {/* {postData?.updatedAt !== postData?.createdAt && <span className="gray__color_sub_title">Edited</span>} */}
                            </div>}
                        />
                        <div>
                        </div>
                    </div>
                    {userInfo?._id === postData?.posted_by._id &&
                        <DropdownMenu onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuTrigger className="border-none"><MoreVertical /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setPostModalData({
                                            showModel: true,
                                            data: postData,
                                            mode: "edit"
                                        })
                                    }}
                                >
                                    <div className="flex w-full gap-3">
                                        <Edit size={20} />
                                        Edit
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePost(post)
                                }
                                }>
                                    <div className="flex w-full gap-3 ">
                                        <Trash size={20} className='text-red-600' />
                                        <span className='text-red-600'> Delete</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
                <div className="mt-2 pl-12">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postData?.content) }} />
                </div>
            </div>
            <div className="mt-2 w-full pl-12">
                <div className="flex items-center">
                    <button
                        title="Upvote"
                        type="button"
                        className="flex items-center text-xs group relative pr-8"
                        disabled={!userInfo?._id}
                    >
                        <span className="text-primary flex items-center justify-center rounded-full -ml-2 h-8 w-8" onClick={(e) => {
                            e.stopPropagation()
                            handleUpvote(postData?._id)
                        }} >
                            <UpVoteIcon size={20} fill={postData.upvoted_by.includes(userInfo?._id) ? "black" : "transparent"} />
                        </span>
                        <span className="absolute font-semibold text-xs px-1 left-6 text-light">{postData?.upvoted_by.length}</span>
                    </button>

                    <button
                        title="Comment"
                        type="button"
                        className="flex items-center text-xs group relative pr-8"
                    >
                        <span className="group-hover:bg-blue-light group-hover:text-blue-dark text-primary flex items-center justify-center rounded-full -ml-2 h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleParentComment(postData?._id)
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.33337 16.2197V4.82398C3.33337 4.42865 3.48946 4.04951 3.76729 3.76996C4.04512 3.49042 4.42194 3.33337 4.81486 3.33337H15.1852C15.5781 3.33337 15.955 3.49042 16.2328 3.76996C16.5106 4.04951 16.6667 4.42865 16.6667 4.82398V12.277C16.6667 12.6724 16.5106 13.0515 16.2328 13.331C15.955 13.6106 15.5781 13.7676 15.1852 13.7676H7.00819C6.78614 13.7677 6.56694 13.8179 6.36679 13.9147C6.16664 14.0114 5.99067 14.1522 5.85189 14.3266L4.12523 16.4984C4.06776 16.5709 3.98934 16.6236 3.90081 16.6492C3.81228 16.6749 3.71801 16.6722 3.63105 16.6416C3.54409 16.611 3.46873 16.554 3.4154 16.4784C3.36207 16.4028 3.33341 16.3124 3.33337 16.2197V16.2197Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                ></path>
                                <path
                                    d="M5.83337 9.99996H14.1667M5.83337 6.66663H10.8334"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="md:opacity-0 md:group-hover:opacity-100 group-hover:text-blue-dark"
                                ></path>
                            </svg>
                        </span>
                        <span className="absolute font-semibold text-xs px-1 left-6 text-light">{postData?.comments.length}</span>
                    </button>
                </div>
            </div>


            {viewedParentCommentsIds.has(postData?._id) &&
                <section className="mt-2 w-full pl-12">

                    <div className="mt-4">
                        <CommentList comments={postData?.comments} />
                    </div>
                    {
                        !!userInfo?._id &&
                        <CommentForm
                            parentId={null}
                            postId={postData?._id}
                            commentId={null}
                            loading={false}
                            error={"error"}
                            onSubmit={onCommentCreate}
                        />
                    }
                </section>
            }
            {postModalData.showModel &&
                <CreatePost postModalData={postModalData} setPostModalData={setPostModalData} />
            }
        </div>
    )
}

export default Post

