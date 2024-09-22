import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { fromNow } from "@/utils/helperFn"
import { Edit, EyeIcon, Trash } from "lucide-react"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import axios from "axios"

export const SurveyCard = ({ survey }: any) => {
    const navigateTo = useNavigate()
    const queryClient = useQueryClient();
    const loginResponse = useSelector((state: any) => state.login.loginResponse)

    const isSurveyPublished = useMemo(() => survey.status === "published", [survey])

    const deleteSurvey = async (selectedSurvey: any) => {
        const config = {
            headers: {
                token: `${loginResponse.token} `,
            },
        };
        const surveyId = selectedSurvey._id
        const response = await axios.delete(`${import.meta.env.VITE_APP_API_URL}survey/${surveyId} `, config);
        return response.data;
    };


    const deleteSurveyMutation = useMutation({
        mutationFn: deleteSurvey,  // Define your mutation function here
        onSuccess: () => {
            queryClient.invalidateQueries(['surveys'] as any);
        },
        onError: (error) => {
            console.log({ error })
        }
    });


    return (
        <Card
            className={`${isSurveyPublished ? "cursor-pointer" : ""}`}
            onClick={() => {
                if (isSurveyPublished) {
                    navigateTo(`/survey/${survey._id}`)
                }
            }}
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate text-xl font-bold">{survey.survey_title}</span>
                    {isSurveyPublished && <Badge>Published</Badge>}
                    {survey.status === "draft" && <Badge variant={"destructive"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {fromNow(survey.createdAt)}
                    {isSurveyPublished && (
                        <span className="flex items-center gap-2">
                            <EyeIcon />
                            <span>{survey.view_count}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {survey.survey_description || "No description"}
            </CardContent>
            <CardFooter className="flex-col">
                <Button className="w-full mt-2 text-md gap-4 cursor-pointer"
                    disabled={!isSurveyPublished}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (isSurveyPublished) {
                            navigateTo(`/survey/submissions/${survey._id}`)
                        }
                    }}
                >
                    {`View Submissions ${survey.submissions.length ? `(${survey.submissions.length})` : ""}`}
                </Button>
                <div className="flex gap-2 justify-end w-full">
                    <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigateTo(`/survey/builder/${survey._id}`)
                        }}
                    >
                        <Edit />
                    </Button>

                    <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log(survey._id)
                            deleteSurveyMutation.mutate(survey)
                        }}
                    >
                        <Trash className="text-red-500" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
