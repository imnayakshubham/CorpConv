import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUrl } from "@/utils/sendApiRequest"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import { fromNow } from "@/utils/helperFn"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { useNavigate } from "react-router-dom"


export const AnswerLinkQuestions = () => {
    const navigateTo = useNavigate()
    const [selectedTab, setSelectedTab] = useState("all-questions")
    const [questionsData, setQuestionsData] = useState({
        data: {},
        loading: false,
        message: null
    })
    const loginResponse = useSelector(state => state.login.loginResponse)

    const onTabChange = useCallback((async () => {
        setQuestionsData((prev) => {
            return {
                ...prev,
                loading: true,
                message: null
            }
        })
        const { data: { data: apiResponse } } = await axios.post(getUrl(`question`), {
            type: selectedTab,
            user_id: loginResponse?._id
        })
        setQuestionsData((prev) => {
            return {
                ...prev,
                loading: false,
                data: {
                    ...prev.data,
                    ...apiResponse
                }
            }
        })

    }), [selectedTab])


    useEffect(() => {
        onTabChange()
    }, [selectedTab])

    const handleDeleteQuestion = async (e, questionId: string) => {
        e.stopPropagation()
        const config = {
            headers: {
                "Content-type": "application/json",
                token: `${loginResponse.token}`,
            },
        };
        const { data: apiResponse } = await axios.delete(getUrl(`question/delete/${questionId}`), config)
        if (apiResponse.status === "Success") {
            setQuestionsData((prev) => {
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        [selectedTab]: prev?.data?.[selectedTab].filter((question) => question._id !== questionId)
                    }
                }
            })

        }
    }

    return (
        <div className="w-full">
            <Tabs defaultValue={selectedTab} className="w-full" onValueChange={(value) => {
                setSelectedTab(value)
            }}>
                {
                    !!loginResponse?._id ?
                        <TabsList className="w-full">
                            <TabsTrigger className="w-full" value="all-questions">All Questions</TabsTrigger>
                            <TabsTrigger className="w-full" value="your-questions">Your Questions</TabsTrigger>
                        </TabsList>
                        :
                        <h3 className="text-3xl font-extrabold">Questions</h3>
                }
                <div className="py-2">
                    {
                        questionsData.loading ?
                            <div className="flex-1 overflow-y-scroll">
                                <div className="animate-pulse">
                                    <div className="h-20 bg-gray-300 rounded w-full mb-1"></div>
                                    <div className="h-20 bg-gray-300 rounded w-full mb-1"></div>
                                    <div className="h-20 bg-gray-300 rounded w-full mb-1"></div>
                                    <div className="h-20 bg-gray-300 rounded w-full mb-1"></div>
                                </div>
                            </div>

                            : <div className=" p-2">
                                {
                                    questionsData?.data?.[selectedTab]?.map((question) => <div key={question._id}
                                        onClick={() => navigateTo(`/answerlink/question/${question._id}`)}
                                        className="flex sm:justify-between md:gap-2 gap-1 flex-wrap p-2 border cursor-pointer"
                                    >
                                        <div>
                                            <UserAvatar avatarImage={question?.question_posted_by?.user_public_profile_pic}>
                                            </UserAvatar>
                                        </div>
                                        <div className="sm:flex-1 flex-wrap">
                                            <div >
                                                <span className="font-extrabold text-xl">{question.question}</span>
                                            </div>
                                            <div className="flex gap-1 flex-wrap">
                                                <span className="text-gray-400 font-semibold text-clip text-sm">{fromNow(question.question_posted_at)} | {question.question_posted_by.public_user_name}</span>
                                            </div>
                                        </div>
                                        {
                                            question.question_posted_by._id === loginResponse?._id &&
                                            <div className="w-full sm:w-auto"><Button onClick={(e) => handleDeleteQuestion(e, question._id)} className="bg-red-500 w-full sm:w-auto">Delete</Button></div>
                                        }
                                    </div>)

                                }

                            </div>
                    }
                </div>

            </Tabs >
        </div >
    )
}
