import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import type { FormProps } from 'antd';
import { Form, Input, Button } from 'antd';
import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type FieldType = {
    survey_title?: string;
    survey_description?: string;
};

export const CreateSurveyForm = ({ survey, showCreateSurveyModal, setShowCreateSurveyModal }: any) => {
    const queryClient = useQueryClient();
    const loginResponse = useSelector((state: any) => state.login.loginResponse)

    const handleModalUpdate = (open: boolean, survey: any) => {
        if (open) {
            setShowCreateSurveyModal({
                isModalVisible: open,
                data: survey ?? null,
                mode: survey ? "edit" : "create"
            })
        } else {
            setShowCreateSurveyModal({
                isModalVisible: false,
                data: null,
                mode: "create"
            })
        }
    }


    const createSurvey = async (newSurvey: any) => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}survey/create-survey`, newSurvey, config);
        return response.data;
    };

    const createSurveyMutation = useMutation({
        mutationFn: createSurvey,
        onSuccess: () => {
            setShowCreateSurveyModal({
                isModalVisible: false,
                data: survey ?? null,
                mode: "create"
            })
            queryClient.invalidateQueries(['surveys'] as any);
        },
        onError: (error) => {
            console.log({ error })
        }
    });

    const editSurvey = async (updatedSurvey: any) => {
        const config = {
            headers: {
                token: `${loginResponse.token}`,
            },
        };
        const surveyId = showCreateSurveyModal.data._id
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}survey/edit/${surveyId}`, updatedSurvey, config);
        return response.data;
    };


    const editSurveyMutation = useMutation({
        mutationFn: editSurvey,
        onSuccess: () => {
            setShowCreateSurveyModal({
                isModalVisible: false,
                data: null,
                mode: "create"
            })
            const surveyId = showCreateSurveyModal.data._id

            queryClient.invalidateQueries([`edit_survey_${surveyId}`] as any);
        },
        onError: (error) => {
            console.log({ error })
        }
    });

    const onFinish: FormProps<FieldType>['onFinish'] = (surveyPayload) => {
        if (showCreateSurveyModal.mode === "create") {
            createSurveyMutation.mutate({ ...surveyPayload });

        } else {
            const payload = {
                ...surveyPayload,
                _id: showCreateSurveyModal.data._id
            }
            editSurveyMutation.mutate(payload)
        }
    };

    return (
        <Dialog open={showCreateSurveyModal.isModalVisible} onOpenChange={(open) => handleModalUpdate(open, survey)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{showCreateSurveyModal.mode === "create" ? "Create" : "Edit"} Survey</DialogTitle>
                    <DialogDescription>
                        {showCreateSurveyModal.mode === "create" ? "Create a new Survey to start collecting responses" : "Edit a Survey to start collecting responses"}</DialogDescription>
                </DialogHeader>
                {

                }
                <Form
                    initialValues={{
                        survey_title: showCreateSurveyModal?.data?.survey_title ?? null,
                        survey_description: showCreateSurveyModal?.data?.survey_description ?? null
                    }}
                    name="survey"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Survey Title"
                        name="survey_title"
                        rules={[{ required: true, message: 'Please input your Survey Title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Survey Description"
                        name="survey_description"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <div className="flex justify-end">
                        <Form.Item>
                            <Button
                                loading={createSurveyMutation.isPending || editSurveyMutation.isPending}
                                htmlType="submit" className="right-0 mt-4">
                                {showCreateSurveyModal.mode === "create" ? "Submit" : "Edit"}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
