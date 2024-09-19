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

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <>
            <div className="py-4">
                <h2 className="text-xl font-bold col-span-2">Your Surveys</h2>
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
                        surveyList.map((survey: any) => {
                            return <SurveyCard key={survey?.guid} survey={survey} />
                        })
                    }
                </div>
            </div>
            <CreateSurveyForm survey={null} showCreateSurveyModal={showCreateSurveyModal} setShowCreateSurveyModal={setShowCreateSurveyModal} />
        </>

    )
}

export default SurveyList