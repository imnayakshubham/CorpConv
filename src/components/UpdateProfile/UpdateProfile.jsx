import { Avatar, Button, Divider, Form, Input, InputNumber, Tooltip } from 'antd'
import "./UpdateProfile.css"
import { useDispatch, useSelector } from 'react-redux'
import { InfoCircleFilled } from '@ant-design/icons'
import { updateProfileRequest } from '../../../store/action/login'
import { AsyncStates } from '../../../constants'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const { loginResponse, updateProfileStatus } = useSelector(state => state.login)

    const onFinish = (values) => {
        const bio = values.user_bio?.trim()
        const payload = {
            _id: loginResponse._id,
            user_bio: bio?.length ? bio : null,
            user_job_experience: values.user_job_experience,
            user_job_role: values.user_job_role?.trim(),
            user_current_company_name: values.user_current_company_name?.trim()
        }
        dispatch(updateProfileRequest(payload))
    };

    return (
        <div className='update__profile__container'>
            <div><h3>Update Profile</h3></div>
            <Divider className='common__divider' />
            <div className='update__profile__card'>
                <div className='user__info__container'>
                    <Avatar>
                        {loginResponse.user_current_company_name?.[0] ?? "A"}
                    </Avatar>
                    <div className="user__info">
                        {loginResponse.user_email_id}
                        <Tooltip defaultOpen={true} title={"Email is only Visible To you"}>
                            <InfoCircleFilled />
                        </Tooltip>
                    </div>
                </div>
                <Divider className='common__divider' />
                <Form
                    name="update_profile"
                    initialValues={{
                        ...loginResponse
                    }}
                    layout='vertical'
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div className='flex-wrap md:w-full md:flex-nowrap update__profile__form__items'>
                        <Form.Item
                            className='form__item'
                            label="Company Name"
                            name="user_current_company_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Current Company Name!',
                                    validator: (_, value) => {
                                        const trimmedValue = value && value.trim();
                                        if (trimmedValue && trimmedValue.length > 0) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Please input a valid Current Company Name!'));
                                    },
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='form__item'
                            label="Current Job Role"
                            name="user_job_role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Current Job Role!',
                                    validator: (_, value) => {
                                        const trimmedValue = value && value.trim();
                                        if (trimmedValue && trimmedValue.length > 0) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Please input a valid Current Job Role!'));
                                    },
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className='form__item'
                            label="Total Experience"
                            name="user_job_experience"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your total experience!',
                                },
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 80,
                                    message: 'Total experience must be between 0 and 80',
                                },
                            ]}
                        >
                            <InputNumber type='number' step={0.1} style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <Form.Item
                        className='form__item'
                        label="Bio"
                        name="user_bio"
                    >
                        <Input.TextArea autoSize={true} />
                    </Form.Item>
                    <Form.Item className='form__item__submit'>
                        <Button htmlType="submit" loading={updateProfileStatus === AsyncStates.LOADING}>
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>

            </div >

        </div >
    )
}

export default UpdateProfile

