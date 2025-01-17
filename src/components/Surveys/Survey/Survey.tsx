
import { useState } from 'react'
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import confetti from 'canvas-confetti';

const Survey = () => {
    const { id: surveyId } = useParams()
    const loginResponse = useSelector((state: any) => state.login.loginResponse)
    const navigateTo = useNavigate()

    const [surveyValues, setSurveyValues] = useState<{ [key: string]: any }>({})

    const getSurvey = async () => {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}survey/${surveyId}`);
        return response.data;
    };

    const { data = {}, isLoading, failureReason } = useQuery({
        queryKey: [`survey_${surveyId}`],
        queryFn: getSurvey,
    });
    const { data: selectedSurvey } = data

    const [surveyform] = Form.useForm();

    const getDefaultComponents = (survey: any) => {
        const type = survey.input_type === "select" ? survey.select_option_type : survey.input_type
        const placeholder: string = survey.placeholder
        switch (type) {
            case "input":
                return <Input type='text' className='w-full' placeholder={placeholder} />
            case "number":
                return <InputNumber type='number' className='w-full' placeholder={placeholder} />
            case "single_select":
                return <Select className='w-full' placeholder={placeholder} options={survey.user_select_options} />
            case "multi_select":
                return <Select mode='multiple' className='w-full' placeholder={placeholder} options={survey.user_select_options} />

            case "radio":
                return <Radio.Group className='w-full' options={survey.user_select_options} />

            case "checkbox":
                return <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                        {survey.user_select_options.map((surveyOption: any) => {
                            return <Col className='py-2' span={8} key={surveyOption.value}>
                                <Checkbox value={surveyOption.value}>{surveyOption.label}</Checkbox>
                            </Col>
                        })}
                    </Row>
                </Checkbox.Group>


            case "textarea":
                return <TextArea className='w-full' placeholder={placeholder} />

            default:
                return null
        }
    }

    const submitSurveySubmission = async (payload: any) => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const surveyId = selectedSurvey._id
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}survey/submission/${surveyId}`, payload, config);
        return response.data;
    };


    const launchConfetti = () => {
        const submitButton = document.getElementById("survey-submit-btn");
        const rect = submitButton?.getBoundingClientRect();
        if (rect) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const origin = {
                x: (rect.left + rect.width / 2) / viewportWidth,
                y: (rect.top + rect.height / 2) / viewportHeight
            }
            confetti({
                spread: 180,
                particleCount: 500,
                origin: origin,
            });
        }
    };


    const sendSurveySubmissionMutation = useMutation({
        mutationFn: submitSurveySubmission,
        onSuccess: () => {
            launchConfetti()
            surveyform.resetFields()
        },
        onError: (error) => {
            notification.error({
                message: JSON.stringify(error)
            })
        }
    });

    const handleFormSubmission = async () => {
        let validationError = false;

        try {
            await surveyform.validateFields();
        } catch (errorInfo: any) {
            validationError = !!errorInfo?.errorFields?.length;
        }


        if (!validationError) {
            const submissions = selectedSurvey?.survey_form.reduce((acc: any[], curr: any) => {
                const updatedData = {
                    ...curr,
                    value: surveyValues?.[curr?._id] ?? null
                }

                acc.push(updatedData)
                return acc
            }, [])


            const payload = {
                survey_id: selectedSurvey._id,
                submissions
            }

            sendSurveySubmissionMutation.mutate(payload)
        }
    }

    if (isLoading) return <SurveySkeleton />

    return (
        <>
            {
                selectedSurvey ?
                    <div className='survey__form__container h-screen border'>
                        <div className={`flex justify-center md:items-center h-full`}>
                            <div className={`border bg-gray-50 h-[92.5%] w-full sm:w-[100%] md:w-[75%] lg:w-[50%] flex flex-col transition-all duration-500 ease-in`}
                            >
                                <div className='justify-between flex p-3 border-b gap-4 md:gap-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <div className={`flex-bold font-extrabold text-xl`}>{selectedSurvey.survey_title}</div>
                                        <span className="text-sm text-muted-foreground line-clamp-2"
                                            title={selectedSurvey.survey_description}
                                        >
                                            {selectedSurvey.survey_description}
                                        </span>
                                    </div>
                                </div>
                                <div className='p-2 flex-1 overflow-y-scroll'>
                                    <Form
                                        name={selectedSurvey.survey_title}
                                        form={surveyform}
                                        onFieldsChange={(changedFields) => {
                                            const errors = changedFields?.[0].errors
                                            if (!errors?.length) {
                                                const fieldType = changedFields?.[0]?.name?.[0]
                                                setSurveyValues((prev) => ({
                                                    ...prev,
                                                    [fieldType]: changedFields?.[0]?.value
                                                }))
                                            }
                                        }}
                                        layout="vertical"
                                        autoComplete="off"
                                    >
                                        {
                                            selectedSurvey?.survey_form?.map((survey: any) => <div className='flex gap-2 w-full justify-between border-b last:border-b-0 py-3' key={survey._id}>
                                                <Form.Item
                                                    key={survey._id}
                                                    className='w-full'
                                                    label={<h5 className='font-semibold'>{survey.label}</h5>}
                                                    name={survey._id}
                                                    rules={[{
                                                        required: survey?.is_required ?? false,
                                                        message: "Required"
                                                    }]}
                                                >
                                                    {getDefaultComponents(survey)}
                                                </Form.Item>
                                            </div>)
                                        }
                                    </Form>
                                </div>
                                <div className='flex justify-end border py-2'>
                                    <Form.Item>
                                        <Button className='bg-black' type='primary' htmlType='submit'
                                            id="survey-submit-btn"
                                            loading={sendSurveySubmissionMutation.isPending}
                                            onClick={() => handleFormSubmission()}
                                        >Submit</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                    : failureReason ? <div className='flex justify-center h-[90vh] md:h-screen items-center flex-col gap-3'>
                        <div className='text-red-500'>
                            {(failureReason as any)?.response?.data?.message ?? "Failed To Load this Survey"}
                        </div>
                        <div>
                            <Button onClick={() => {
                                navigateTo("/surveys")
                            }}>Go to Surveys</Button>
                        </div>
                    </div>
                        : null
            }
        </>
    )
}

const SurveySkeleton = () => {
    return <div className="survey__form__container h-screen border">
        <div className="flex justify-center items-center h-full">
            <div className="border bg-gray-50 h-[85%] w-full sm:w-[100%] md:w-[50%] flex flex-col animate-shimmer">
                {/* Header Skeleton */}
                <div className="justify-between flex p-3 border-b gap-4 md:gap-2 sticky top-0">
                    <div className="flex gap-2 flex-col w-full">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>

                {/* Form Body Skeleton */}
                <div className="p-2 flex-1 overflow-y-scroll">
                    <div className="space-y-4">
                        {/* Example of multiple form fields */}
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button Skeleton */}
                <div className="flex justify-end border p-2">
                    <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    </div>

}

export default Survey