import { useCallback, useState } from "react"
import { CreateSurveyForm } from "../CreateSurvey/CreateSurveyForm"
import { SurveyCard } from "../SurveyCard/SurveyCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { Button } from "antd"
import { PlusSquare } from "lucide-react"


const SurveyList = () => {
    const loginResponse = useSelector((state: any) => state.login.loginResponse)


    const [showCreateSurveyModal, setShowCreateSurveyModal] = useState({
        isModalVisible: false,
        data: null,
        mode: "create"
    })


    const fetchPosts = useCallback(async () => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}survey/survey-list`, config);
        return response.data;
    }, [])

    const { data = {}, error, isLoading, isError } = useQuery({
        queryKey: ['surveys'], // Unique key for caching
        queryFn: fetchPosts,
    });
    const { data: surveyList = [] } = data

    return (
        <>
            <div className="py-4">
                <h2 className="text-xl font-bold col-span-2 py-2">Your Surveys</h2>
                {isError ? <p className="text-red-800 py-2">Error: {error?.message ?? "Failed To Load Surveys"}</p> : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Button
                        onClick={() => {
                            setShowCreateSurveyModal((prev) => ({
                                ...prev,
                                isModalVisible: true
                            }))
                        }}
                        className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                    >
                        <PlusSquare className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                        <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create new Survey</p>
                    </Button>
                    {
                        isLoading ? <SurveyCardSkeleton count={8} /> :
                            <>
                                {
                                    surveyList.map((survey: any) => {
                                        return <SurveyCard key={survey?.guid} survey={survey} />
                                    })
                                }
                            </>
                    }
                </div>
            </div>
            <CreateSurveyForm survey={null} showCreateSurveyModal={showCreateSurveyModal} setShowCreateSurveyModal={setShowCreateSurveyModal} />
        </>

    )
}

const SurveyCardSkeleton = ({ count = 9 }) => {
    const cardArray = new Array(count).fill(null)
    return cardArray.map((_, index) => {
        return <div key={index} className="card skeleton border rounded-lg p-4 animate-shimmer">
            {/* Card Header Skeleton */}
            <div className="flex flex-col gap-2">
                {/* Title and Badge Skeleton */}
                <div className="flex items-center gap-2 justify-between">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>

                {/* Description Skeleton */}
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-6"></div>
                    </div>
                </div>
            </div>

            {/* Card Content Skeleton */}
            <div className="h-[20px] bg-gray-200 rounded my-4"></div>

            {/* Card Footer Skeleton */}
            <div className="mt-2">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    })
}

export default SurveyList