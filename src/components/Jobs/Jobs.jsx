import { useEffect, useState } from 'react'
import { AddJobLink } from './AddJobLink/AddJobLink'
import { useDispatch, useSelector } from 'react-redux'
import { createBookmarkRequest, createBookmarkSuccess, createJobSuccess, deleteJobRequest, editJobSuccess, fetchJobsRequest, likeDislikeRequest, likeDislikeSuccess } from '../../../store/action/jobs'
import './Jobs.css'
import { Avatar, Button, Tooltip } from 'antd'
import { Pencil, Trash, Bookmark, Copy, ExternalLink } from 'lucide-react';
import { fromNow } from '@/utils/helperFn'
import { UpVoteIcon } from '../Posts/PostList/PostList'

const HandHeart = ({ liked }) => {
    return <svg className={`${liked ? "job_liked" : ""} lucide lucide-hand-heart`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" /><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 15 6 6" /><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" /></svg>
}


export const Jobs = ({ from, user_id = null }) => {
    const socket = useSelector((state) => state.common.socketInstance)
    const jobs = useSelector((state) => state.jobs.jobsList)

    const [openAddJobModal, setOpenAddJobModal] = useState({
        isModalOpen: false,
        selectedJob: null,
        mode: "add"
    })

    const userInfo = useSelector((state) => state.login.loginResponse)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!socket) return
        socket.on("listen_job_creation", (jobData) => {
            if (userInfo?._id !== jobData.job_posted_by._id) {
                dispatch(createJobSuccess(jobData))
            }
        })
        socket.on("listen_job_edition", (jobData) => {
            if (userInfo?._id !== jobData.job_posted_by._id) {
                dispatch(editJobSuccess(jobData))
            }
        })
        socket.on("listen_job_like", (jobData) => {
            if (userInfo?._id !== jobData.job_posted_by._id) {
                dispatch(likeDislikeSuccess(jobData))
            }
        })
        socket.on("listen_job_bookmark", (jobData) => {
            if (userInfo?._id !== jobData.job_posted_by._id) {
                dispatch(createBookmarkSuccess(jobData))
            }
        })
    }, [dispatch, socket, userInfo?._id])

    useEffect(() => {
        if (from === "user_profile") {
            if (user_id) {
                dispatch(fetchJobsRequest({ _id: user_id }))
            }
        } else {
            dispatch(fetchJobsRequest())
        }
    }, [dispatch, from, user_id])

    const handleLike = (job) => {
        dispatch(likeDislikeRequest({ job_id: job._id }))
    }

    const bookmarkJob = (job) => {
        dispatch(createBookmarkRequest({ job_id: job._id }))
    }

    const handleEditJob = (job) => {
        setOpenAddJobModal({
            isModalOpen: true,
            selectedJob: job,
            mode: "edit"
        })
    }

    const handleDelete = (job) => {
        dispatch(deleteJobRequest({ job_id: job._id }))
    }


    return (
        <div>
            {from === "user_profile" && !!jobs.length &&
                <h1 className='font-semibold p-2 text-lg'>Jobs</h1>
            }
            {(userInfo && userInfo._id === user_id) &&
                <AddJobLink openAddJobModal={openAddJobModal} setOpenAddJobModal={setOpenAddJobModal} />
            }


            {/* <div className='grid grid-cols-1 gap-2 bg-red-400 md:grid-cols-2'>
                {jobs.map((job) => {
                    const jobData = job.job_data
                    return <Card key={job._id} className='w-full'>
                        <Meta
                            avatar={<Avatar src={jobData.image} />}
                            title={jobData.title}
                            description={jobData.description}
                        />

                        <h5 style={{ padding: "1rem", display: "flex", justifyContent: "flex-end" }}>
                            Posted By: {job.job_posted_by.public_user_name}
                        </h5>

                        <div className={`post__actions`}>
                            {job.job_posted_by?._id === userInfo?._id &&
                                <>
                                    <Button  className='border-none p-1 outline-none' onClick={() => handleEditJob(job)}>
                                        <Pencil />
                                    </Button>
                                    <Button  className='border-none p-1 outline-none' style={{ color: "red" }} onClick={() => handleDelete(job)} >
                                        <Trash />
                                    </Button>
                                </>
                            }
                            <>
                                <Button  className='border-none p-1 outline-none'
                                    disabled={(job.job_posted_by._id === userInfo?._id) || !userInfo}
                                    onClick={() => {
                                        bookmarkJob(job)
                                    }} >
                                    <Bookmark
                                        style={{ fill: job.bookmarked_by.includes(userInfo?._id) ? "black" : "transparent" }}
                                    />
                                </Button>
                                <Button  className='border-none p-1 outline-none'
                                    disabled={(job.job_posted_by._id === userInfo?._id) || !userInfo}
                                    onClick={() => handleLike(job)}>
                                    <HandHeart liked={job.liked_by.includes(userInfo?._id)} />
                                </Button>
                            </>

                            <Button
                                 className='border-none p-1 outline-none'
                                onClick={() => navigator.clipboard.writeText(`${jobData.job_post_link}?ref=corpconv`)}
                            >
                                <Copy />
                            </Button>
                            <Button
                                 className='border-none p-1 outline-none'
                                onClick={() => {
                                    window.open(`${jobData.job_post_link}?ref=corpconv`, "_blank", "noreferrer");
                                }
                                }>
                                <ExternalLink />
                            </Button>
                        </div>
                    </Card>
                })}
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => {
                    const jobData = job.job_data
                    return <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 flex-col h-full w-full" key={job._id} >
                        <div className="flex-1">
                            <div className='flex gap-2'>
                                <Avatar src={jobData.image} />
                                <h2 className="text-lg font-semibold mb-2">{jobData.title}</h2>
                            </div>
                            <p className="text-gray-600">{jobData.description}</p>
                        </div>
                        <div className="mt-auto py-2">
                            <p className="text-sm text-gray-500">
                                Posted By: {job.job_posted_by.public_user_name} | {fromNow(job.job_posted_at)}
                            </p>
                        </div>
                        <div className="mt-auto py-2 border-t-2">
                            <div className='flex gap-1 items-center'>
                                {job.job_posted_by?._id === userInfo?._id &&
                                    <>
                                        <Button className='border-none p-1 outline-none' onClick={() => handleEditJob(job)}>
                                            <Pencil />
                                        </Button>
                                        <Button className='border-none p-1 outline-none' style={{ color: "red" }} onClick={() => handleDelete(job)} >
                                            <Trash />
                                        </Button>
                                    </>
                                }
                                <>
                                    <Tooltip title={job.bookmarked_by.includes(userInfo?._id) ? "You bookmarked this job" : "Bookmark this job"} placement="top">
                                        <Button className='border-none p-1 outline-none'
                                            disabled={(job.job_posted_by._id === userInfo?._id) || !userInfo}
                                            onClick={() => {
                                                bookmarkJob(job)
                                            }} >
                                            <Bookmark
                                                style={{ fill: job.bookmarked_by.includes(userInfo?._id) ? "black" : "transparent" }}
                                            />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={job.liked_by.includes(userInfo?._id) ? "You liked this job" : "Like this job"} placement="top">
                                        <Button className='border-none p-1 outline-none focus:outline-none'
                                            disabled={(job.job_posted_by._id === userInfo?._id) || !userInfo}
                                            onClick={() => handleLike(job)}>
                                            <UpVoteIcon size={25} fill={job.liked_by.includes(userInfo?._id) ? "black" : "transparent"} />
                                        </Button>
                                    </Tooltip>
                                </>
                                <Tooltip title="Copy Job Link" placement="top">
                                    <Button
                                        className='border-none p-1 outline-none'
                                        onClick={() => navigator.clipboard.writeText(`${jobData.job_post_link}?ref=corpconv`)}
                                    >
                                        <Copy />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Open Job Link" placement="top">
                                    <Button
                                        className='border-none p-1 outline-none'
                                        onClick={() => {
                                            window.open(`${jobData.job_post_link}?ref=corpconv`, "_blank", "noreferrer");
                                        }
                                        }>
                                        <ExternalLink />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                })}

            </div>

        </div>
    )
}
