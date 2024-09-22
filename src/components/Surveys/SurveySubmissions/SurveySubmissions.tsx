import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fromNow } from '@/utils/helperFn'
import { Checkbox, Col, Input, InputNumber, message, Radio, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Edit2Icon, Share2 } from 'lucide-react'


const getDefaultComponents = (survey: any, disabled = false) => {
    const type = survey.input_type === "select" ? survey.select_option_type : survey.input_type
    const placeholder: string = survey.placeholder
    const className = `w-full ${disabled ? "border-none bg-none" : ""}`
    const value = survey?.value ?? null
    switch (type) {
        case "input":
            return <Input type='text' className={className} placeholder={placeholder} disabled value={value} />
        case "number":
            return <InputNumber type='number' className={className} placeholder={placeholder} disabled value={value} />
        case "single_select":
            return <Select className={className} placeholder={placeholder} options={survey.user_select_options} disabled value={value} />
        case "multi_select":
            return <Select mode='multiple' className={className} placeholder={placeholder} options={survey.user_select_options} disabled value={value} />

        case "radio":
            return <Radio.Group className={className} options={survey.user_select_options} disabled value={value} />

        case "checkbox":
            return <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                    {survey.user_select_options.map((surveyOption: any) => {
                        return <Col className='py-2' span={8} key={surveyOption.value}>
                            <Checkbox checked={value} value={surveyOption.value} disabled>{surveyOption.label}</Checkbox>
                        </Col>
                    })}
                </Row>
            </Checkbox.Group>


        case "textarea":
            return <TextArea className={className} placeholder={placeholder} disabled={disabled} value={value} />

        default:
            return null
    }
}

const SurveySubmissions = () => {
    const { id: surveyId } = useParams()

    const loginResponse = useSelector((state: any) => state.login.loginResponse)

    const getSurvey = async () => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}survey/submissions/${surveyId}`, config);
        return response.data;
    };

    const { data = {}, error, isLoading, isError } = useQuery({
        queryKey: [`survey_submissions_${surveyId}`], // Unique key for caching
        queryFn: getSurvey,
    });
    const { data: survey } = data

    console.log({ survey })

    if (isLoading) return <>Loading...</>
    if (isError) return <>{error}</>

    return (
        <div>
            <div className='justify-between flex p-3 border-b gap-4 md:gap-2'>
                <div className='flex gap-2 flex-col'>
                    <h1 className={`flex-bold font-bold text-2xl`}>{survey.survey_title}</h1>
                    <span className="text-sm text-muted-foreground line-clamp-2"
                        title={survey.survey_description}
                    >
                        {survey.survey_description}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <Share2 className='cursor-pointer' onClick={() => {
                        const site = `${window.location.origin}/survey/${survey._id}`
                        navigator.clipboard.writeText(`${site}?ref=corpconv`)
                        message.info("Link Copied")
                    }} />

                    <Edit2Icon className='cursor-pointer' onClick={() => {
                        window.open(`${window.location.origin}/survey/builder/${survey._id}`, '_blank', 'noopener,noreferrer');
                    }} />
                </div>
            </div>

            <div className="py-4">
                <SubmissionsCards data={survey.submissions} />
            </div>
        </div>
    )
}


function SubmissionsCards({ data }: any) {
    const submissions = useMemo(() => data, [])
    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
            <div className="border flex flex-col gap-2">
                {
                    submissions.map((submission: any, index: number) => {
                        return <div className='p-2 border' key={submission._id}>
                            <div className='flex justify-between'>
                                <div>{`Submission ${index + 1}`}</div>
                                <div>{fromNow(submission.createdAt)}</div>
                            </div>
                            <div className='border m-1'></div>
                            <div className='p-2'>
                                {
                                    submission.submissions.map((surveySubmissionData: any) => {
                                        return <div className='py-2'>
                                            <div>{surveySubmissionData.label}</div>
                                            {getDefaultComponents(surveySubmissionData, true)}
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                    })
                }
            </div>
        </>
    );
}

export default SurveySubmissions