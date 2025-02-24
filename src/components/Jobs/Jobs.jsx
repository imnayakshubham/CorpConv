import { useEffect, useState } from 'react'
import { AddJobLink } from './AddJobLink/AddJobLink'
import { useDispatch, useSelector } from 'react-redux'
import { createBookmarkRequest, createBookmarkSuccess, createJobSuccess, deleteJobRequest, editJobSuccess, fetchJobsRequest, likeDislikeRequest, likeDislikeSuccess } from '../../../store/action/jobs'
import './Jobs.css'
import { Avatar, Button, message, Tooltip } from 'antd'
import { Pencil, Trash, Bookmark, Copy, ExternalLink } from 'lucide-react';
import { fromNow } from '@/utils/helperFn'
import { UpVoteIcon } from '../Posts/PostList/PostList'
import { AsyncStates } from '../../../constants'
import { Helmet } from 'react-helmet'


const Jobs = ({ from, user_id = null }) => {
    const socket = useSelector((state) => state.common.socketInstance)
    const jobs = useSelector((state) => state.jobs.jobsList)
    const fetchJobsStatus = useSelector((state) => state.jobs.fetchJobsStatus)


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
            <Helmet>
                <title>Post Job Opportunities Anonymously | Hushwork</title>
                <meta name="description" content="Post job opportunities and engage in one-on-one conversations while prioritizing user anonymity. Discover how Hushwork allows you to manage job postings securely and confidentially." />
                <meta name="keywords" content="Post Job Opportunities, Job Posting, Anonymously Post Jobs, Secure Job Posting, User Anonymity, Hushwork Job Board" />

                <meta property="og:title" content="Post Job Opportunities Anonymously | Hushwork" />
                <meta property="og:description" content="Post job opportunities and engage in one-on-one conversations while prioritizing user anonymity. Discover how Hushwork allows you to manage job postings securely and confidentially." />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Post Job Opportunities Anonymously | Hushwork" />
                <meta name="twitter:description" content="Post job opportunities and engage in one-on-one conversations while prioritizing user anonymity. Discover how Hushwork allows you to manage job postings securely and confidentially." />
            </Helmet>

            <div className={from !== "user_profile" ? `pt-4` : ""}>
                {from === "user_profile" && !!jobs.length &&
                    <h1 className='font-bold p-2 text-xl'>Jobs</h1>
                }
                {(userInfo && (user_id && from === "user_profile" ? (userInfo._id === user_id) : userInfo)) &&
                    <AddJobLink openAddJobModal={openAddJobModal} setOpenAddJobModal={setOpenAddJobModal} />
                }


                {
                    (jobs.length === 0 && fetchJobsStatus !== AsyncStates.LOADING) &&
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-semibold">No Jobs Found</h1>
                    </div>
                }

                {
                    fetchJobsStatus === AsyncStates.LOADING && <JobsSkeletonLoader />
                }

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                    {jobs.map((job) => {
                        const jobData = job.job_data
                        return <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 flex-col h-full w-full border" key={job._id} >
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
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${jobData.job_post_link}?ref=corpconv`)
                                                message.info("Link Copied")
                                            }}
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
        </div>
    )
}

const JobsSkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {Array(6).fill(null).map((_, index) => (
                <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex gap-2 flex-col h-full w-full border"
                >
                    <div className="flex-1">
                        <div className="flex gap-2">
                            <div className="w-12 h-12 bg-gray-300 rounded-full animate-shimmer" />
                            <div className="flex-1">
                                <div className="h-6 bg-gray-300 rounded mb-2 animate-shimmer" />
                                <div className="h-4 bg-gray-300 rounded animate-shimmer" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto py-2">
                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-1 animate-shimmer" />
                        <div className="h-4 bg-gray-300 rounded w-1/2 animate-shimmer" />
                    </div>
                    <div className="mt-auto py-2 border-t-2">
                        <div className="flex gap-1 items-center">
                            <div className="w-6 h-6 bg-gray-300 rounded animate-shimmer" />
                            <div className="w-6 h-6 bg-gray-300 rounded animate-shimmer" />
                            <div className="w-6 h-6 bg-gray-300 rounded animate-shimmer" />
                            <div className="w-6 h-6 bg-gray-300 rounded animate-shimmer" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Jobs
