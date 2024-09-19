
import { useState } from 'react'
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
// import { Edit } from 'lucide-react';

const Survey = () => {
    const { id: surveyId } = useParams()
    const loginResponse = useSelector((state: any) => state.login.loginResponse)


    const [surveyValues, setSurveyValues] = useState<{ [key: string]: any }>({
    })

    const getSurvey = async () => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}survey/${surveyId}`, config);
        return response.data;
    };

    const { data = {}, error, isLoading, isError } = useQuery({
        queryKey: [`survey_${surveyId}`], // Unique key for caching
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


    const sendSurveySubmissionMutation = useMutation({
        mutationFn: submitSurveySubmission,
        onSuccess: (data) => {
            notification.success({
                message: data.message
            })
            surveyform.resetFields()
        },
        onError: (error) => {
            notification.success({
                message: JSON.stringify(error)
            })
        }
    });

    const handleFormSubmission = () => {
        const submissions = selectedSurvey?.survey_form.reduce((acc: any[], curr: any) => {
            const updatedData = {
                ...curr,
                value: surveyValues?.[curr?.input_type] ?? null
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

    if (isLoading) return <>Loading...</>
    if (isError) return <>{error}</>

    return (
        <div>
            <div>
                {
                    selectedSurvey &&
                    <div className='survey__form__container h-screen border'>
                        <div className={`flex justify-center items-center h-full`}>
                            <div className={`border bg-gray-50 h-[85%]  w-full sm:w-[100%] md:w-[50%] flex flex-col`}>
                                <div className='justify-between flex p-3 border-b gap-4 md:gap-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <div className={`flex-bold text-xl`}>{selectedSurvey.survey_title}</div>
                                        <span className="text-sm text-muted-foreground line-clamp-2"
                                            title={selectedSurvey.survey_description}
                                        >
                                            {selectedSurvey.survey_description}
                                        </span>
                                    </div>
                                    {/* <div className='flex gap-2 justify-end items-center w-full h-20 sm:w-auto'>
                                        <Edit className='cursor-pointer'
                                            onClick={() => {
                                                setShowCreateSurveyModal({
                                                    isModalVisible: true,
                                                    data: {
                                                        ...selectedSurvey
                                                    },
                                                    mode: "edit"
                                                })

                                            }} />
                                    </div> */}
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
                                            selectedSurvey?.survey_form?.map((survey: any) => <div className='flex gap-2 w-full justify-between' key={survey.input_type}>
                                                <Form.Item
                                                    className='w-full'
                                                    label={survey.label}
                                                    name={survey.input_type}
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
                                            loading={sendSurveySubmissionMutation.isPending}
                                            onClick={() => handleFormSubmission()}
                                        >Submit</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Survey