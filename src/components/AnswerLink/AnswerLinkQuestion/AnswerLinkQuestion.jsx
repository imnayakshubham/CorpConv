import { Input } from "antd"
import { Pen } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { PencilOff } from 'lucide-react';


export const AnswerLinkQuestion = () => {
    const questionId = useParams()?.id
    const socket = useSelector((state) => state.common.socketInstance)
    const [question, setQuestion] = useState({
        status: null,
        data: null,
        message: null
    })
    const loginResponse = useSelector(state => state.login.loginResponse)


    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const questionData = question?.data
        if (loginResponse?._id === questionData?.question_posted_by) {
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
        }

    }, [questionId, socket])

    console.log({ editMode })

    return (
        <div className="flex h-[82vh] flex-col focus-visible:outline-0 bg-red-400">
            <div className="flex items-center gap-2">
                {editMode ?
                    <textarea className="w-full outline-none p-2 font-bold text-lg sm:text-4xl text-wrap" defaultValue={question?.data?.question} />
                    : <span className="w-full outline-none p-2 font-bold text-lg sm:text-4xl">{question?.data?.question}</span>}
                <div className="cursor-pointer" onClick={() => setEditMode((prev) => !prev)}>{editMode ? <PencilOff /> : <Pen />}</div>
            </div>
            <div className="flex-1 overflow-hidden">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur qui atque, amet voluptas maxime temporibus illum doloremque, iste id non nihil provident est. Nemo incidunt possimus dolore dicta eum dolor.
            </div>
            <div className="w-full md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)] juice:w-full">
                <Input />
            </div>
        </div>
    )
}
