import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { fromNow } from "@/utils/helperFn"
import { EyeIcon } from "lucide-react"
import { useMemo } from "react"

export const SurveyCard = ({ survey }: any) => {
    const navigateTo = useNavigate()
    const isSurveyPublished = useMemo(() => survey.status === "published", [survey])

    return (
        <Card
            className={isSurveyPublished ? "cursor-pointer" : ""}
            onClick={() => {
                if (isSurveyPublished) {
                    navigateTo(`/survey/${survey._id}`)
                }
            }}
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{survey.survey_title}</span>
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
            <CardFooter>
                {isSurveyPublished && (
                    <Button asChild className="w-full mt-2 text-md gap-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigateTo(`/survey/submissions/${survey._id}`)
                        }}
                    >
                        {`View submissions ${survey.submissions.length ? `(${survey.submissions.length})` : ""}`}
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
    )
}
