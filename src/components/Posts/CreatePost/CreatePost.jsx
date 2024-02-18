import { useEffect, useState } from "react"
import "./CreatePost.css"
import { Form, Modal, Tabs } from "antd"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { addPostClear, addPostRequest, editPostClear, editPostRequest } from "../../../../store/action/posts";
import { AsyncStates, categoriesList } from "../../../../constants";
import { Button } from "@/components/ui/button"


export const CreatePost = ({ setPostModalData, postModalData }) => {
    const [postForm] = Form.useForm()
    const dispatch = useDispatch()
    const addPostStatus = useSelector((state) => state.posts.addPostStatus)
    const editPostStatus = useSelector((state) => state.posts.editPostStatus)

    const [currentTab, setCurrentTab] = useState(postModalData?.data?.category ?? "company_review")

    const handleCreatePost = () => {
        setPostModalData({
            showModel: true,
            data: null,
            mode: "create"
        })
    }

    useEffect(() => {
        if (postModalData.data && postModalData.mode === "edit") {
            postForm.setFieldsValue({
                category: postModalData.data.category,
                content: postModalData.data.content,
            })
            setCurrentTab(postModalData.data.category)
        }
    }, [postModalData.data, postForm, postModalData.mode])

    useEffect(() => {
        if (editPostStatus === AsyncStates.SUCCESS || addPostStatus === AsyncStates.SUCCESS) {
            setPostModalData({
                showModel: false,
                data: null,
                mode: "create"
            })
            postForm.resetFields()
            setCurrentTab("company_review")
            if (editPostStatus === AsyncStates.SUCCESS) {
                dispatch(editPostClear())
            } else if (addPostStatus === AsyncStates.SUCCESS) {
                dispatch(addPostClear())
            }
        }
    }, [editPostStatus, setPostModalData, addPostStatus, postForm, dispatch])

    const handlePost = (values) => {
        if (postModalData.mode === "edit") {
            dispatch(editPostRequest({ _id: postModalData.data._id, ...values }))
        } else {
            dispatch(addPostRequest(values))
        }
    }

    return (
        <div>
            <div className="create__post__container">
                <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => {
                        handleCreatePost()
                    }}
                >Add Post</Button>
            </div>
            <Modal
                title={`${postModalData.mode === "create" ? "Add" : "Update"} Post`}
                style={{ bottom: 0 }}
                open={postModalData.showModel}
                footer={null}
                maskClosable={false}
                centered
                onCancel={() => {
                    setPostModalData({
                        showModel: false,
                        data: null,
                        mode: "create"
                    })
                    postForm.resetFields()
                    setCurrentTab("company_review")
                }}
            >
                <Form layout='vertical' onFinish={handlePost}
                    form={postForm}
                    initialValues={{
                        category: "company_review",
                        content: null
                    }}>
                    <Form.Item
                        label=""
                        name={"category"}
                    >
                        <Tabs
                            destroyInactiveTabPane={true}
                            activeKey={currentTab}
                            onChange={(activeKey) => {
                                postForm.setFieldsValue({ category: activeKey, content: null })
                                setCurrentTab(activeKey)
                            }}
                            items={Object.keys(categoriesList).map((categoryKey) => {
                                return {
                                    key: categoryKey,
                                    value: categoryKey,
                                    label: categoriesList[categoryKey],
                                    children: <Form.Item
                                        label=""
                                        name={"content"}
                                        rules={[{ required: true, message: 'Please input Content!', min: 5 }]}
                                    >
                                        <ReactQuill theme="snow"
                                            onChange={(value) => {
                                                if (value === "<p><br></p>") {
                                                    postForm.setFieldValue("content", null)
                                                }
                                            }}
                                            value={postForm.getFieldValue("content")}
                                        />
                                    </Form.Item>
                                };
                            })}
                        />
                    </Form.Item>
                    <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            size={"sm"} variant={"outline"}
                        >{postModalData.mode === "create" ? "Add" : "Update"} Post</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
