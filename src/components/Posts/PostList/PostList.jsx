import { useDispatch, useSelector } from "react-redux"
import "./PostList.css"
import DOMPurify from 'dompurify';
import { fromNow } from "@/utils/helperFn";
import { commentRequest, deleteCommentRequest, deletePostRequest, likeCommentRequest, replyToCommentRequest, upvotePostRequest } from '../../../../store/action/posts'
import { useEffect, useState } from "react";
import { Mentions } from "antd";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import { MoreVertical, PlusCircle, Reply, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AsyncStates, categoriesList } from '../../../../constants'

const UpVoteIcon = ({ size = 20, fill = "none" }) => {
    return <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17.5 10L10 2.5L2.5 10H6.25V17.5H13.75V10H17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
        ></path>
    </svg>
}



export const PostList = ({ setPostModalData }) => {
    const { loginResponse: userInfo } = useSelector(state => state.login)
    const posts = useSelector((state) => state.posts.postsList)
    const dispatch = useDispatch();
    const [viewedParentCommentsIds, setViewedParentCommentsIds] = useState(new Set())

    const handleUpvote = (postId) => {
        dispatch(upvotePostRequest({ post_id: postId }))
    }

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

    const handleDeletePost = (post) => {
        dispatch(deletePostRequest({ _id: post._id }))
    }

    return (
        <div className="posts__container">
            {
                posts.map((post) => {
                    const sanitizedContent = DOMPurify.sanitize(post.content);
                    return (
                        <article key={post._id} className="post__container__header bg-white p-4 md:p-6 lg:px-6 border border-primaryBorder hover:bg-gray-100 cursor-pointer">
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <UserAvatar isUserVerified={post.posted_by?.is_email_verified} title={<h3 className="post_by__header">{post.posted_by.public_user_name}</h3>}
                                        description={<div className="post__header__info">
                                            <span className="gray__color_sub_title">{categoriesList[post.category]}</span>
                                            <span className="gray__color_sub_title">{fromNow(post.createdAt)}</span>
                                            {/* {post.updatedAt !== post.createdAt && <span className="gray__color_sub_title">Edited</span>} */}
                                        </div>}
                                    />
                                    <div>
                                    </div>
                                </div>
                                {userInfo?._id === post.posted_by._id &&
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="border-none"><MoreVertical /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => setPostModalData({
                                                showModel: true,
                                                data: post,
                                                mode: "edit"
                                            })}>
                                                <div className="flex w-full gap-3">
                                                    <UpVoteIcon size={20} />
                                                    Edit
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleDeletePost(post)}>
                                                <div className="flex w-full gap-3">
                                                    <Trash size={20} />
                                                    Delete
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                            </div>
                            <div className="mt-2 pl-12">
                                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                            </div>
                            <div className="mt-2 w-full pl-12">
                                <div className="flex items-center">
                                    <button
                                        title="Upvote"
                                        type="button"
                                        className="flex items-center text-xs group relative pr-8"
                                        disabled={!userInfo?._id}
                                    >
                                        <span className="text-primary flex items-center justify-center rounded-full -ml-2 h-8 w-8" onClick={() => handleUpvote(post._id)} >
                                            <UpVoteIcon size={20} />
                                        </span>
                                        <span className="absolute font-semibold text-xs px-1 left-6 text-light">{post.upvoted_by.length}</span>
                                    </button>

                                    <button
                                        title="Comment"
                                        type="button"
                                        className="flex items-center text-xs group relative pr-8"
                                    >
                                        <span className="group-hover:bg-blue-light group-hover:text-blue-dark text-primary flex items-center justify-center rounded-full -ml-2 h-8 w-8"
                                            onClick={() => handleParentComment(post._id)}
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
                                        <span className="absolute font-semibold text-xs px-1 left-6 text-light">{post.comments.length}</span>
                                    </button>
                                </div>
                            </div>


                            {viewedParentCommentsIds.has(post._id) &&
                                <section className="mt-2 w-full pl-12">

                                    <div className="mt-4">
                                        <CommentList comments={post.comments} />
                                    </div>
                                    <CommentForm
                                        parentId={null}
                                        postId={post._id}
                                        commentId={null}
                                        loading={false}
                                        error={"error"}
                                        onSubmit={onCommentCreate}
                                    />
                                </section>
                            }
                        </article>
                    )
                })
            }
        </div>
    )
}


export function CommentForm({
    loading,
    parentId = null,
    postId,
    commentId = null,
    onSubmit,
    initialValue = "",
}) {
    const commentStatus = useSelector(state => state.posts.commentStatus)
    const replyToCommentStatus = useSelector(state => state.posts.replyToCommentStatus)



    const [message, setMessage] = useState(initialValue)
    const [prefix, setPrefix] = useState('@');
    const onSearch = (_, newPrefix) => {
        console.log(_, newPrefix)
        setPrefix(newPrefix);
    };

    const MOCK_DATA = {
        '@': ['afc163', 'zombiej', 'yesmeck'],
        '#': ['1.0', '2.0', '3.0'],
    };

    useEffect(() => {
        if (replyToCommentStatus === AsyncStates.SUCCESS || commentStatus === AsyncStates.SUCCESS) {
            setMessage("")
        }
    }, [replyToCommentStatus, commentStatus])

    function handleSubmit(e) {
        if (message.length === 0) return
        if (e.key === "Enter" || (e.type === "click")) {
            e.preventDefault();
            const commentData = {
                comment: message.trim(),
                parent_comment_id: parentId,
                post_id: postId,
                comment_id: commentId
            }
            onSubmit(commentData);
        }

    }

    return (
        <>
            <div className="flex items-center gap-2 border p-3 bg-[#fff] rounded-3xl">
                <Mentions
                    value={message}
                    className="border-none outline-none forced-colors:no-underline shadow-none mention"
                    placeholder="input @ to mention people, # to mention tag"
                    prefix={['@', '#']}
                    onSearch={onSearch}
                    onKeyDown={(e) => handleSubmit(e.nativeEvent)}
                    options={(MOCK_DATA[prefix] || []).map((value) => ({
                        key: value,
                        value,
                        label: value,
                    }))}
                    onInput={(e) => {
                        console.log("ghfhgfhgfjhg")
                        const text = e.target.value;
                        setMessage(text);
                    }}
                />
                <button className="btn p-1" onClick={(e) => handleSubmit(e)} disabled={loading || !message.length}>
                    <PlusCircle />
                </button>
            </div>
        </>
    )
}


export const Comment = ({ comment }) => {
    const dispatch = useDispatch();
    const [viewedComments, setViewedComments] = useState(new Set());
    const { loginResponse: userInfo } = useSelector(state => state.login)
    const commentStatus = useSelector(state => state.posts.commentStatus)
    const replyToCommentStatus = useSelector(state => state.posts.replyToCommentStatus)

    const handleReply = (comment) => {
        setViewedComments((prev) => {
            // Create a new Set based on the previous state
            const newSet = new Set(prev);

            // Add the new comment ID if it doesn't exist in the set
            if (!newSet.has(comment._id)) {
                newSet.add(comment._id);
            } else {
                newSet.delete(comment._id);
            }

            // Return the new Set to update the state
            return newSet;
        });
    };

    useEffect(() => {
        if (commentStatus === AsyncStates.SUCCESS || replyToCommentStatus === AsyncStates.SUCCESS) {
            setViewedComments(new Set())
        }
    }, [commentStatus, replyToCommentStatus])

    const onCommentCreate = (data) => {
        dispatch(replyToCommentRequest(data))
    }

    const handleLikeComment = (comment) => {
        dispatch(likeCommentRequest({
            comment_id: comment._id,
            post_id: comment.post_id,
            parent_comment_id: comment.parent_comment_id
        }))
    }

    const handleDeleteComment = (comment) => {
        dispatch(deleteCommentRequest({
            comment_id: comment._id,
            post_id: comment.post_id,
            parent_comment_id: comment.parent_comment_id
        }))
    }
    return <div className="comment__container py-4 px-2 ">
        <div className="flex flex-col">
            <UserAvatar isUserVerified={comment.commented_by.is_email_verified} title={comment.commented_by.public_user_name} titleClassName="font-medium text-base leading-5" />
            <div className="ml-12">{comment.comment}</div>
        </div>
        <div className="comment__action flex gap-1 justify-start">
            <Button className="py-1" onClick={() => handleLikeComment(comment)} variant={"ghost"} disabled={!userInfo?._id}>
                <UpVoteIcon size={20} /> {comment.upvoted_by.length}
            </Button>
            <Button disabled={!userInfo?._id} className="py-1" variant={"ghost"} onClick={() => handleReply(comment)}><Reply size={20} /> {comment.nested_comments.length}</Button>
            {/* <Button className="py-1" variant={"ghost"}>Edit</Button> */}
            {(!!userInfo?._id) && (userInfo?._id === comment.commented_by._id) &&
                <Button className="py-1" onClick={() => handleDeleteComment(comment)} variant={"ghost"}><Trash size={20} /></Button>
            }
        </div>
        <div className="nested__comments ml-6 border-l-2">
            {
                comment.nested_comments.map((reply) => {
                    return <Comment key={reply._id} comment={reply} />
                })
            }
        </div>
        {
            viewedComments.has(comment._id) && <CommentForm
                parentId={comment.parentId}
                postId={comment.post_id}
                commentId={comment._id}
                loading={false}
                error={"error"}
                onSubmit={onCommentCreate}
            />
        }
    </div>
}


export function CommentList({ comments }) {
    return comments.map(commentData => (
        <div key={commentData._id} className="comment-stack">
            <Comment comment={commentData} />
        </div>
    ))
}
