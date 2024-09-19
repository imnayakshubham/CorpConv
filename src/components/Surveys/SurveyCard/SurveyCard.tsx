import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { fromNow } from "@/utils/helperFn"

export const SurveyCard = ({ survey }: any) => {
    const navigateTo = useNavigate()

    return (
        <>
            <Card
                className="cursor-pointer"
                onClick={() => {
                    navigateTo(`/survey/${survey._id}`)
                }}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 justify-between">
                        <span className="truncate font-bold">{survey.survey_title}</span>
                        {survey.status === "published" && <Badge>Published</Badge>}
                        {survey.status === "draft" && <Badge variant={"destructive"}>Draft</Badge>}
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                        {fromNow(survey.createdAt)}
                        {survey.status === "published" && (
                            <span className="flex items-center gap-2">
                                {/* <LuView className="text-muted-foreground" /> */}
                                <span>{survey.visit_count}</span>
                                {/* <FaWpforms className="text-muted-foreground" /> */}
                                <span>{survey.submissions.length.toLocaleString()}</span>
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                    {survey.survey_description || "No description"}
                </CardContent>
                <CardFooter>
                    {survey.status === "published" && (
                        <Button asChild className="w-full mt-2 text-md gap-4 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigateTo(`/survey/submissions/${survey._id}`)
                            }}
                        >
                            View submissions
                        </Button>
                    )}
                    {survey.status === "draft" && (
                        <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigateTo(`/survey/builder/${survey._id}`)
                            }}
                        >
                            Edit form
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}
