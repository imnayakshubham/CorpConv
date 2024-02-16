import { useEffect } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { createJobClear, createJobRequest, editJobClear, editJobRequest } from '../../../../store/action/jobs';
import { AsyncStates } from '../../../../constants';


export const AddJobLink = ({ openAddJobModal, setOpenAddJobModal }) => {
    const [jobForm] = Form.useForm()
    const dispatch = useDispatch()

    const editJobStatus = useSelector((state) => state.jobs.editJobStatus)
    const createJobStatus = useSelector((state) => state.jobs.createJobStatus)

    useEffect(() => {
        if (editJobStatus === AsyncStates.SUCCESS || createJobStatus === AsyncStates.SUCCESS) {
            setOpenAddJobModal({
                isModalOpen: false,
                selectedJob: null,
                mode: "create"
            })
        }
    }, [editJobStatus, createJobStatus, setOpenAddJobModal])


    useEffect(() => {
        dispatch(editJobClear())
        dispatch(createJobClear())
        jobForm.resetFields()
    }, [dispatch, jobForm])

    const handleJob = (values) => {
        const job_post_link = values.job_post_link.trim()
        if (openAddJobModal.mode === "create") {
            const job = {
                job_post_link
            }
            dispatch(createJobRequest(job))
        } else {
            const job = {
                job_id: openAddJobModal.selectedJob._id,
                job_post_link
            }
            dispatch(editJobRequest(job))
        }
    }

    useEffect(() => {
        if (openAddJobModal.selectedJob) {
            jobForm.setFieldsValue({
                job_post_link: openAddJobModal.selectedJob.job_data.job_post_link
            })
        }
    }, [openAddJobModal.selectedJob, jobForm])


    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpenAddJobModal({
                isModalOpen: true,
                selectedJob: null,
                mode: "create"
            })}>
                Add Job
            </Button>

            <Modal
                title="Add Job"
                style={{ bottom: 0 }}
                open={openAddJobModal.isModalOpen}
                footer={null}
                onCancel={() => setOpenAddJobModal({
                    isModalOpen: false,
                    selectedJob: null,
                    mode: "create"
                })}
            >
                <Form layout='vertical' onFinish={handleJob} form={jobForm}>
                    <Form.Item
                        label="Job Link"
                        rules={[{ required: true, message: 'Please input valid Job Link!', type: 'url', min: 6 }]}
                        name={"job_post_link"}
                    >
                        <Input type='text' placeholder='Job Link' />
                    </Form.Item>


                    <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button htmlType="submit">{openAddJobModal.mode === "create" ? "Add" : "Edit"} Job</Button>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}
