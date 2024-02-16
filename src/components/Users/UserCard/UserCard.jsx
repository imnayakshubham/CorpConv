import { Avatar, Badge, Button, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { Check, X } from 'lucide-react'
import { acceptInvitationRequest, followUserRequest } from '../../../../store/action/users'
import { useNavigate } from 'react-router-dom'
import { CheckOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import './UserCard.css'

export const UserCard = ({ user, tab, from }) => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch()

    const loginResponse = useSelector(state => state.login.loginResponse)

    const userName = user?.public_user_name ?? `${user.user_job_role ?? `Someone`} @ ${user.user_current_company_name}`

    const viewUserDetail = (e) => {
        e.stopPropagation()
        if (from === "users") {
            navigateTo(`/user/${user._id}`, { state: user })
        }
    }

    return (
        <>
            <Badge.Ribbon text={
                user?.is_email_verified ? <><CheckOutlined /> Verified User</> : null} color={'green'} key={user._id}>
                <div className='user__card' onClick={(e) => viewUserDetail(e)}>
                    <Meta
                        avatar={<Avatar style={{ background: '#f56a00' }}>{user.user_current_company_name[0]}</Avatar>}
                        title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: 0 }}>
                            <div>{userName}</div>
                            {tab !== "followers" &&
                                <div className='action'>
                                    {tab === "pending_followings" ?
                                        <div className='pending_followings__actions'>
                                            <Button onClick={() => dispatch(acceptInvitationRequest({ userId: loginResponse._id, requesterId: user._id }))}>
                                                <Check />
                                            </Button>
                                            <Button danger><X /></Button>
                                        </div> :
                                        (loginResponse?.followings?.includes(user._id)) ?
                                            <Tooltip title={"Withdraw Follow Request"}>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation()
                                                    dispatch(followUserRequest({ senderId: loginResponse._id, receiverId: user._id, tab }))
                                                }}>
                                                    <UserDeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                            :
                                            <Tooltip title={"Send Follow Request"}>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation()
                                                    // socket.emit("send_follow_request", { senderId: loginResponse._id, receiverId: user._id, tab })
                                                    dispatch(followUserRequest({ senderId: loginResponse._id, receiverId: user._id, tab }))
                                                }}>
                                                    <UserAddOutlined />
                                                </Button>
                                            </Tooltip>
                                    }
                                </div>
                            }
                        </div>}
                        description={
                            <div>
                                {user.user_job_role && user.user_job_experience !== null ? <p id="secondary__text">{`${user.user_job_role} with ${user.user_job_experience > 1 ? `${user.user_job_experience} years` : `${user.user_job_experience} year`} of Experience`}</p> : null}
                                <div id="stats__container">
                                    <p className="stats-text">
                                        <svg viewBox="0 0 24 24" className='icons'>
                                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                        </svg>
                                        <span>{user?.followers?.length ?? 0}</span>followers
                                    </p>
                                    {!!user?.posts?.length &&
                                        <p className="stats-text">
                                            <svg viewBox="0 0 24 24" className='icons'>
                                                <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                                            </svg>
                                            <span>{user?.posts?.length}</span>posts
                                        </p>
                                    }
                                </div>
                                {user.user_bio && <p className='text-overflow-ellipses'>{user.user_bio}</p>}
                            </div>
                        }
                    />
                </div>
            </Badge.Ribbon >
        </>
    )
}
