import { Pen, SendHorizontal, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { PencilOff } from 'lucide-react';
import { UserAvatar } from "@/components/UserAvatar/UserAvatar"
import { fromNow } from "@/utils/helperFn"
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const AnswerLinkQuestion = () => {
    const navigateTo = useNavigate()
    const questionId = useParams()?.id
    const socket = useSelector((state) => state.common.socketInstance)
    const [question, setQuestion] = useState({
        status: null,
        data: null,
        message: null
    })
    const [updatedQuestion, setUpdatedQuestion] = useState(question?.data?.question)

    const loginResponse = useSelector(state => state.login.loginResponse)

    const [editMode, setEditMode] = useState(false)
    const [answer, setAnswer] = useState("")

    const sendAnswer = () => {
        const answerText = answer?.trim()
        if (!!answerText.length && socket) {
            socket.emit("send_answer_for_question", {
                answer: answerText,
                question_id: questionId,
                user_id: loginResponse?._id
            })
        }
    }

    useEffect(() => {
        const questionData = question?.data
        if (loginResponse?._id && loginResponse?._id === questionData?.question_posted_by) {
            setEditMode(true)
        }
    }, [question, loginResponse])


    useEffect(() => {
        if (socket) {
            if (questionId) {
                setQuestion((prev) => ({
                    ...prev,
                    status: "loading"
                }))
                socket.emit("get_question", questionId)
            }
            socket.on("send_question", (questionData) => {
                setQuestion(questionData)
            })

            socket.on("get_answer_for_question", (answerData) => {
                if (answerData?.status === "Success") {
                    setQuestion((prev) => {
                        const newState = JSON.parse(JSON.stringify(prev))
                        newState.data.answers = [...newState.data.answers, answerData.data]
                        return newState
                    })
                    setAnswer("")
                }
            })
            socket.on("update_title_response", (updatedQuestion) => {
                if (updatedQuestion?.status === "Success") {
                    if (questionId === updatedQuestion.data._id) {
                        setQuestion((prev) => {
                            return {
                                ...prev,
                                data: {
                                    ...prev.data,
                                    question: updatedQuestion.data.question
                                }
                            }
                        })
                    }
                    setUpdatedQuestion(updatedQuestion.data.question)
                }
            })

            socket.on("update_likes_response", (updatedQuestion) => {
                if (updatedQuestion?.status === "Success") {
                    if (questionId === updatedQuestion.data._id) {
                        setQuestion((prev) => {
                            return {
                                ...prev,
                                data: {
                                    ...prev.data,
                                    liked_by: updatedQuestion.data.liked_by
                                }
                            }
                        })
                    }
                }
            })

            socket.on("delete_answer_response", (updatedAnswer) => {
                if (updatedAnswer?.status === "Success") {
                    if (questionId === updatedAnswer.data.question_id) {
                        setQuestion((prev) => {
                            const newState = JSON.parse(JSON.stringify(prev))
                            newState.data.answers = newState.data.answers.filter((answer) => answer._id !== updatedAnswer.data._id)
                            return newState
                        })
                    }
                }
            })
        }
    }, [questionId, socket])

    const handleDeleteAnswer = (e, answer_id) => {
        if (socket) {
            socket.emit("delete_answer", { question_id: questionId, answer_id })
            setQuestion((prev) => {
                const newState = JSON.parse(JSON.stringify(prev))
                newState.data.answers = newState.data.answers.filter((answer) => answer._id !== answer_id)
                return newState
            })
        }
    }

    const updatedTitle = () => {
        const trimmedQuestion = updatedQuestion?.trim()
        if (socket && !!trimmedQuestion?.length) {

            const payload = {
                question: trimmedQuestion,
                user_id: loginResponse?._id,
                question_id: question.data._id
            }
            socket.emit("update_question_title", payload)
        }
    }

    const handleLike = () => {
        if (socket) {
            const payload = {
                user_id: loginResponse?._id ?? null,
                question_id: question.data._id
            }
            socket.emit("update_question_likes", payload)
        }
    }

    return (
        <>
            <Helmet>
                <title>AnswerLink - {question?.data?.question ?? 'Q&A platform, expert answers, real-time interaction, community knowledge, Ask Anything, AnswerLink, expert community'}</title>
                <meta name="description" content={question?.data?.question} />
                <meta name="keywords" content="Q&A platform, expert answers, real-time interaction, community knowledge, Ask Anything, AnswerLink, expert community" />
                <meta property="og:title" content={question?.data?.question} />
                <meta property="og:description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                <meta name="twitter:description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
            </Helmet>
            {
                question?.status === "loading" ?
                    <div className="flex-1 overflow-y-scroll">
                        <div className="animate-pulse">
                            <div className="h-20 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-24 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-24 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-24 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-24 bg-gray-300 rounded w-full mb-4"></div>
                            <div className="h-16 bg-gray-300 rounded w-full mb-4"></div>
                        </div>
                    </div>

                    :
                    !!question.data ?
                        <div className="flex h-[82vh] flex-col focus-visible:outline-0 gap-2">
                            <div className="flex items-center gap-4">
                                {editMode ?
                                    <textarea
                                        onChange={(e) => setUpdatedQuestion(e.target.value)}
                                        className="w-full outline-none p-2 font-bold text-lg sm:text-4xl text-wrap"
                                        defaultValue={question?.data?.question}
                                    />
                                    : <span className="w-full outline-none p-2 font-bold text-lg sm:text-4xl">{question?.data?.question}</span>}
                                {loginResponse?._id && (loginResponse?._id === question?.data?.question_posted_by) && <div className="cursor-pointer" onClick={() => setEditMode((prev) => !prev)}>{editMode ? <PencilOff /> : <Pen />}</div>}
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <div className={`flex items-center gap-2 cursor-pointer ${question.data?.liked_by?.includes(loginResponse?._id) ? 'text-blue-500' : ""}`} onClick={() => handleLike()}>
                                        <ThumbsUp /> {question.data?.liked_by?.length}
                                    </div>
                                </div>
                                {
                                    loginResponse?._id && (loginResponse?._id === question?.data?.question_posted_by) && (question?.data?.question !== updatedQuestion?.trim()) &&
                                    <div>
                                        <Button
                                            disabled={!updatedQuestion?.length}
                                            onClick={() => updatedTitle()}
                                        >Update</Button>
                                    </div>
                                }
                            </div>

                            {/* {!!question?.data?.answers?.length && */}
                            <div className="flex-1 overflow-y-scroll">
                                {
                                    question?.data?.answers?.map((answer) => {
                                        return <div key={answer._id}
                                            className="flex sm:justify-between md:gap-2 gap-1 flex-wrap p-2 border cursor-pointer"
                                        >
                                            <div>
                                                {/* {answer.answer?.answered_by?.public_profile_pic} */}
                                                <UserAvatar avatarImage={answer?.answered_by?.user_public_profile_pic}></UserAvatar>
                                            </div>

                                            <div className="sm:flex-1 flex-wrap">
                                                <div >
                                                    <span className="font-extrabold text-xl">{answer.answer}</span>
                                                </div>
                                                <div className="flex gap-1 flex-wrap">
                                                    <span className="text-gray-400 font-semibold text-clip text-sm">{fromNow(answer.answered_at)} | {answer.answered_by?.public_user_name ?? "Anonymous User"}</span>
                                                </div>
                                            </div>
                                            {
                                                loginResponse?._id && (answer.answered_by?._id === loginResponse?._id) &&
                                                <div className="w-full sm:w-auto"><Button onClick={(e) => handleDeleteAnswer(e, answer._id)} className="bg-red-500 w-full sm:w-auto">Delete</Button></div>
                                            }
                                        </div>

                                    })
                                }
                            </div>
                            {/* } */}
                            <div className="w-full md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent juice:w-full">
                                <div className="border flex gap-1 items-center p-2 justify-center rounded">
                                    <textarea
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className="border-none outline-none focus:border-none w-full resize-none"
                                    />
                                    <Button
                                        type="button"
                                        disabled={!answer?.trim()?.length}
                                        onClick={() => sendAnswer()}
                                        className="border-none"
                                        icon={<SendHorizontal />}>

                                    </Button>
                                </div>
                            </div>
                        </div>
                        : <div className="flex flex-col items-center justify-center h-[80vh] text-gray-700">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold mb-4">No Results Found</h1>
                                <p className="text-lg mb-8">{`Sorry, we couldn't find what you were looking for.`}</p>
                                <Button
                                    onClick={() => navigateTo("/answerlink")}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Go to Home
                                </Button>
                            </div>
                        </div>

            }
        </>
    )
}

export default AnswerLinkQuestion
