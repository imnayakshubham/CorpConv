
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Col, Drawer, Form, Input, InputNumber, Radio, Row, Select, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import { CreateSurveyForm } from '../CreateSurvey/CreateSurveyForm';

const SurveyBuilder = () => {
    const queryClient = useQueryClient();

    const { id: surveyId } = useParams()
    const [formDrawer, setFormDrawer] = useState<any>({
        isDrawerOpen: false,
        component: null,
        mode: null
    });

    const loginResponse = useSelector((state: any) => state.login.loginResponse)

    const getSurvey = async () => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}survey/${surveyId}`, config);
        return response.data;
    };

    const { data = {}, isLoading, failureReason } = useQuery({
        queryKey: [`survey_${surveyId}`], // Unique key for caching
        queryFn: getSurvey,
    });
    const { data: selectedSurvey } = data

    const [showCreateSurveyModal, setShowCreateSurveyModal] = useState({
        isModalVisible: false,
        data: null,
        mode: "edit"
    })


    const navigateTo = useNavigate()

    const [inputform] = Form.useForm();
    const [surveyform] = Form.useForm();

    const [isPreviewMode, setIsPreviewMode] = useState(false)

    const [surveyItems, setSurveyItems] = useState<{ [key: string]: any }>({
        _id: selectedSurvey?._id,
        survey_form: [],
        is_editing: false
    })

    const [showSubmitButton, setShowSubmitButton] = useState(false)

    useEffect(() => {
        setShowSubmitButton(isPreviewMode)
    }, [isPreviewMode])

    useEffect(() => {
        if (selectedSurvey) {
            setSurveyItems((prev) => ({
                ...prev,
                ...selectedSurvey
            }))
        }
    }, [selectedSurvey])

    const components = useMemo(() => [
        {
            label: "Input",
            value: "input"
        },
        {
            label: "Select",
            value: "select"
        },
        {
            label: "Radio",
            value: "radio"
        },
        {
            label: "Checkbox",
            value: "checkbox"
        }
    ], [])

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

    const onClose = () => {
        setFormDrawer({
            isDrawerOpen: false,
            component: null,
            mode: null
        });
        inputform.resetFields()
    };

    const inputTypeSelectionOptions = useMemo(() => {
        return [{
            label: "Text Area",
            value: "textarea"

        },
        {
            label: "Text",
            value: "input"
        },
        {
            label: "Number",
            value: "number"

        }]
    }, [])

    const handleInputFinish = (formvalues: any) => {
        const values = { ...formvalues }
        if (values?.user_select_options?.length) {
            values.user_select_options = values?.user_select_options.map((option: any, index: number) => {
                return {
                    label: option,
                    value: `option_${index + 1}`,
                    key: `option_${index + 1}`
                }
            })

        }
        setSurveyItems((prev) => {
            const newState = JSON.parse(JSON.stringify(prev))
            newState.survey_form = [...newState.survey_form, values]
            newState.is_editing = true
            return newState
        })
        onClose()
    }

    const selectOptions = useMemo(() => [
        { label: 'Single Select', value: 'single_select' },
        { label: 'Multiple Select', value: 'multi_select' },
    ], [])

    const getSettingComponents = useCallback((component: any) => {
        const componentType = component.value
        switch (componentType) {
            case "input":
                return <div>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"label"} required label="Label">
                        <Input type='text' placeholder='Your Question' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Placeholder!' }]}
                        name={"placeholder"} required label="Placeholder">
                        <Input type='text' placeholder='Your Placeholder' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Input Type!' }]}
                        name={"input_type"} required label="Input Type">
                        <Radio.Group options={inputTypeSelectionOptions} />
                    </Form.Item>
                </div>
            case "select":
                return <div>
                    <Form.Item
                        className='hidden'
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"input_type"}>
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"label"} label="Label">
                        <Input type='text' placeholder='Your Question' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Placeholder!' }]}
                        name={"placeholder"} label="Placeholder">
                        <Input type='text' placeholder='Your Placeholder' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please Select your Option Type!' }]}
                        name={"select_option_type"} label="Select Option Type">
                        <Radio.Group options={selectOptions} />
                    </Form.Item>

                    <Form.Item
                        name={"user_select_options"} label="Add Options"
                        rules={[
                            {
                                message: 'Atleast 2 Option is Required',
                                validator: (_, value) => {
                                    if (value.length >= 2) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('Some message here');
                                    }
                                }
                            }
                        ]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                        // onChange={handleChange}
                        />
                    </Form.Item>
                </div>
            case "radio":
                return <div>
                    <Form.Item
                        className='hidden'
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"input_type"}>
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"label"} label="Label">
                        <Input type='text' placeholder='Your Question' />
                    </Form.Item>

                    <Form.Item
                        name={"user_select_options"} label="Add Radio Options"
                        rules={[
                            {
                                message: 'Atleast 2 Option is Required',
                                validator: (_, value) => {
                                    if (value.length >= 2) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('Some message here');
                                    }
                                }
                            }
                        ]}
                    >

                        < Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Enter your Unique Option Here"
                        />
                    </Form.Item>
                </div>

            case "checkbox":
                return <div>
                    <Form.Item
                        className='hidden'
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"input_type"}>
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your Label!' }]}
                        name={"label"} label="Label">
                        <Input type='text' placeholder='Your Question' />
                    </Form.Item>

                    <Form.Item
                        name={"user_select_options"} label="Add Checkbox Options"
                        rules={[
                            {
                                message: 'Atleast 2 Option is Required',
                                validator: (_, value) => {
                                    if (value.length >= 2) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('Some message here');
                                    }
                                }
                            }
                        ]}
                    >
                        < Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Enter your Unique Option Here"
                        />
                    </Form.Item>
                </div>

            default:
                return <>Select  a valid Option</>
        }


    }, [inputTypeSelectionOptions, selectOptions])

    const editSurvey = async (updatedSurvey: any) => {
        const config = {
            headers: {
                token: `${loginResponse.token} `,
            },
        };
        const surveyId = selectedSurvey._id
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL} survey / edit / ${surveyId} `, updatedSurvey, config);
        return response.data;
    };


    const editSurveyMutation = useMutation({
        mutationFn: editSurvey,  // Define your mutation function here
        onSuccess: () => {
            const surveyId = selectedSurvey._id

            queryClient.invalidateQueries([`edit_survey_${surveyId}`] as any);
            navigateTo(`/ survey / ${surveyId} `)
        },
        onError: (error) => {
            console.log({ error })
        }
    });

    const handlePublish = (_: any) => {
        setIsPreviewMode(true)
        const payload = {
            _id: surveyItems._id,
            survey_form: surveyItems.survey_form,
            status: "published"
        }
        editSurveyMutation.mutate(payload)
    }

    const handleFormSubmission = () => {
        // notification.success({
        //     message: "Your Survey is Submitted"
        // })
        // navigateTo("/")
    }

    if (isLoading) return <SurveyBuilderSkeleton />

    return (
        <div>
            <div>
                {
                    selectedSurvey ?
                        <div className='survey__form__container h-screen border'>
                            <div className={`flex ${!isPreviewMode ? 'justify-start md:justify-between' : "justify-center"} flex-col-reverse md:flex-row h-full`}>
                                <div className={`border bg-gray-50 h-[85%] md:h-[100%] ${isPreviewMode ? 'w-full sm:w-[100%] md:w-[50%]' : "w-full md:w-[70%]"} `}>
                                    <div className='justify-between flex p-3 border-b gap-4 md:gap-2'>
                                        <div className='flex gap-2 flex-col'>
                                            <div className={`flex-bold text-xl`}>{selectedSurvey.survey_title}</div>
                                            <span className="text-sm text-muted-foreground line-clamp-2"
                                                title={selectedSurvey.survey_description}
                                            >
                                                {selectedSurvey.survey_description}
                                            </span>
                                        </div>
                                        {
                                            !showSubmitButton &&
                                            <div className='flex gap-2 justify-end items-center w-full h-20 sm:w-auto'>
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
                                                <Button disabled={!surveyItems.survey_form.length || !surveyItems.is_editing} onClick={() => handlePublish(selectedSurvey)}>Publish</Button>
                                                <Switch className='bg-black' disabled={!surveyItems.survey_form.length} checkedChildren="Edit" unCheckedChildren="Preview Mode" checked={isPreviewMode}
                                                    onChange={() => {
                                                        setIsPreviewMode(prev => !prev)
                                                    }} />
                                            </div>
                                        }
                                        {
                                            showSubmitButton &&
                                            <Switch className='bg-black' disabled={!surveyItems.survey_form.length} checkedChildren="Edit" unCheckedChildren="Preview Mode" checked={isPreviewMode} onChange={() => {
                                                setIsPreviewMode(prev => !prev)
                                            }} />
                                        }
                                    </div>
                                    <div className='p-2'>
                                        <Form
                                            name={selectedSurvey.survey_title}
                                            form={surveyform}
                                            layout="vertical"
                                            onFinish={handleFormSubmission}
                                            autoComplete="off"
                                        >
                                            {
                                                surveyItems.survey_form.map((survey: any) => <div className='flex gap-2 w-full justify-between' key={survey.input_type}>
                                                    <Form.Item
                                                        className='w-full'
                                                        label={survey.label}
                                                        name={survey.input_type}
                                                    >
                                                        {getDefaultComponents(survey)}
                                                    </Form.Item>
                                                </div>)
                                            }
                                            {
                                                showSubmitButton &&
                                                <div className='flex justify-end'>
                                                    <Form.Item>
                                                        <Button className='bg-black' type='primary' htmlType='submit'>Submit</Button>
                                                    </Form.Item>
                                                </div>
                                            }
                                        </Form>
                                    </div>
                                </div>

                                {
                                    !isPreviewMode &&

                                    <div className="border bg-gray-100 h-fit md:h-[100%] w-full  md:w-[30%] p-2 overflow-y-scroll ">
                                        <div>
                                            Form Elements
                                        </div>
                                        <div className='border w-full my-2 grid grid-cols-2'>
                                            {
                                                components.map((component) => <div className='p-2 border cursor-pointer' key={component.value}>
                                                    <div onClick={() => {
                                                        setFormDrawer({
                                                            isDrawerOpen: true,
                                                            component: component,
                                                            mode: "create"
                                                        })


                                                        if (component.value === "select") {
                                                            inputform.setFieldsValue({
                                                                select_option_type: "single_select",
                                                                input_type: component.value
                                                            })
                                                        }

                                                        inputform.setFieldValue(
                                                            "input_type", component.value
                                                        )
                                                    }}>{component.label}</div>
                                                </div>
                                                )}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        : <div className='flex justify-center h-[90%] md:h-screen items-center flex-col gap-3'>
                            {(failureReason as any)?.response?.data?.message}
                            <div>
                                <Button onClick={() => {
                                    navigateTo("/surveys")
                                }}>Go to Surveys</Button>
                            </div>
                        </div>
                }
            </div>
            {
                formDrawer.component &&
                <Drawer title={`Setting for ${formDrawer.component.label}`}
                    height={"50%"}

                    placement='bottom'
                    onClose={onClose} open={formDrawer.isDrawerOpen}>
                    <div className='setting__container' >
                        <Form
                            name='setting_input_form'
                            form={inputform}

                            layout='vertical'
                            onFinish={handleInputFinish}
                        >
                            <div className='options__setting'>{getSettingComponents(formDrawer.component)}</div>
                            <div className="option__actions">
                                <Form.Item>
                                    <Button type='primary' htmlType='submit' className='bg-black'>Add to Form</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Drawer>
            }
            <CreateSurveyForm showCreateSurveyModal={showCreateSurveyModal} setShowCreateSurveyModal={setShowCreateSurveyModal} survey={selectedSurvey} />
        </div>
    )
}

const SurveyBuilderSkeleton = () => {
    return <div className="survey__form__container h-screen border">
        <div className={`flex flex-col-reverse md:flex-row h-full animate-shimmer`}>
            {/* Form Section Skeleton */}
            <div className="border bg-gray-50 h-[85%] md:h-[100%] w-full md:w-[70%]">
                <div className="flex justify-between p-3 border-b gap-4 md:gap-2">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex gap-2 items-center w-full h-20 sm:w-auto">
                        <div className="h-8 bg-gray-200 rounded w-8"></div>
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>

                {/* Form Fields Skeleton */}
                <div className="p-2">
                    <div className="space-y-2">
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>

            {/* Sidebar Section Skeleton */}
            <div className="border bg-gray-100 h-fit md:h-[100%] w-full md:w-[30%] p-2 overflow-y-scroll">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="border w-full grid grid-cols-2 gap-2">
                    <div className="p-2 border bg-gray-200 rounded h-10"></div>
                    <div className="p-2 border bg-gray-200 rounded h-10"></div>
                    <div className="p-2 border bg-gray-200 rounded h-10"></div>
                    <div className="p-2 border bg-gray-200 rounded h-10"></div>
                </div>
            </div>
        </div>
    </div>

}

export default SurveyBuilder