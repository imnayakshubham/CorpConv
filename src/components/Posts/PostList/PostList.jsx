import { useDispatch, useSelector } from "react-redux"
import "./PostList.css"
import { deleteCommentRequest, getCommentRepliesRequest, likeCommentRequest, replyToCommentRequest } from '../../../../store/action/posts'
import { useEffect, useState } from "react";
import { Mentions } from "antd";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import { PlusCircle, Reply, Trash } from "lucide-react";
import { AsyncStates } from '../../../../constants'
import { PostsListSkeleton } from "../PostsSkeleton/PostsListSkeleton";
import Post from "../Post/Post";

export const UpVoteIcon = ({ size = 20, fill = "none" }) => {
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



export const PostList = () => {
    const posts = useSelector((state) => state.posts.postsList)
    const fetchPostsStatus = useSelector((state) => state.posts.fetchPostsStatus)

    return (
        <div className="posts__container py-2">
            {fetchPostsStatus === AsyncStates.LOADING ? <PostsListSkeleton /> :
                posts.map((post) => {
                    return (
                        <article key={post._id} >
                            <Post post={post} />
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
    const getCommentRepliesStatus = useSelector(state => state.posts.getCommentRepliesStatus)

    const handleReply = (comment) => {
        setViewedComments((prev) => {
            const newSet = new Set(prev);
            const viewIds = [comment._id, ...comment.nested_comments.map((reply) => reply._id)]

            viewIds.forEach((id) => {
                if (!newSet.has(id)) {
                    newSet.add(id);
                } else {
                    newSet.delete(id);
                }
            })
            return newSet;
        });
        handleGetCommentReply(comment)
    };

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

    const handleGetCommentReply = (currentComment) => {
        const payload = {
            comment_id: currentComment._id,
            post_id: currentComment.post_id
        }
        dispatch(getCommentRepliesRequest(payload))
    }

    return <div className="comment__container py-4 px-2 ">
        <div className="flex flex-col">
            <UserAvatar avatarImage={comment.commented_by?.user_public_profile_pic} isUserVerified={comment.commented_by?.is_email_verified} title={comment.commented_by?.public_user_name} titleClassName="font-medium text-base leading-5" />
            <div className="ml-12">{comment.comment}</div>
        </div>
        <div className="comment__action flex gap-1 justify-start">
            <Button className="py-1" onClick={(e) => {
                e.stopPropagation()
                handleLikeComment(comment)
            }}
                variant={"ghost"} disabled={!userInfo?._id}>
                <UpVoteIcon size={20} fill={comment.upvoted_by?.includes(userInfo?._id) ? "black" : "transparent"} /> {comment.upvoted_by?.length}
            </Button>
            <Button
                disabled={!userInfo?._id} className="py-1"
                variant={"ghost"}
                onClick={(e) => {
                    e.stopPropagation()
                    handleReply(comment)
                }}
            >
                {comment.nested_comments?.length === 0 ?
                    <>Reply</> :
                    <div>
                        <Reply size={20} /> {comment.nested_comments?.length}
                    </div>
                }
            </Button>
            {/* <Button className="py-1" variant={"ghost"}>Edit</Button> */}
            {(!!userInfo?._id) && (userInfo?._id === comment.commented_by?._id) &&
                <Button className="py-1" onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteComment(comment)
                }
                } variant={"ghost"}><Trash size={20} /></Button>
            }
        </div>
        <div className="nested__comments ml-6 border-l-2">
            {getCommentRepliesStatus[comment._id] === AsyncStates.SUCCESS &&
                <>
                    {
                        comment.nested_comments?.map((reply) => {
                            if (viewedComments.has(comment._id) || viewedComments.has(reply?._id)) {
                                return <Comment key={reply?._id} comment={reply} />
                            }
                        })
                    }
                </>
            }
        </div>
        {
            (viewedComments.has(comment._id)) && <CommentForm
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
