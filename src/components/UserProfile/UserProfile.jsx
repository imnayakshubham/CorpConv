import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoClear, getUserInfoRequest } from '../../../store/action/users.js';
import "./UserProfile.css"
import { Jobs } from '../Jobs/Jobs.jsx';
import { Badge, Button, Tooltip } from 'antd';
import { followUserRequest } from '../../../store/action/users.js'
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { SkeletonUserCardLoading } from '../SkeletonUserCardLoading/SkeletonUserCardLoading.tsx';
import { AsyncStates } from '../../../constants';
import { CheckOutlined } from '@ant-design/icons'
import { UserAvatar } from '../UserAvatar/UserAvatar.tsx';
import { Login } from '../Authentication/Login/Login.jsx';
import { Posts } from '../Posts/Posts.jsx';



export const UserProfile = () => {
    const location = useLocation();
    const params = useParams()
    const dispatch = useDispatch()
    const naviagateTo = useNavigate()
    const [profileColor, setProfileColor] = useState("#fff")

    const { loginResponse: loggedInUser } = useSelector(state => state.login)
    const { userInfo, getUserInfoStatus } = useSelector(state => state.users)
    const jobsList = useSelector((state) => state.jobs)
    const postsList = useSelector((state) => state.posts.postsList)



    const [userProfileDetails, setuserProfileDetails] = useState(null)

    const fetchUserDetails = useCallback((userId) => {
        dispatch(getUserInfoRequest({ _id: userId }))

    }, [dispatch])

    function getContrastColor(hexColor) {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return isNaN(luminance) ? '#000000' : luminance > 0.5 ? '#000000' : '#ffffff';
    }



    useEffect(() => {
        if (location.state?.id) {
            setuserProfileDetails(location.state)
        } else {
            if (params?.id?.length) {
                if (loggedInUser?._id !== params.id) {
                    console.log("fetching user details")
                    fetchUserDetails(params?.id)
                } else {
                    setuserProfileDetails(loggedInUser)
                }
            } else {
                naviagateTo("/users")
            }
        }
    }, [fetchUserDetails, location.state, loggedInUser, naviagateTo, params])

    useEffect(() => {
        if (getUserInfoStatus === AsyncStates.SUCCESS) {
            setuserProfileDetails(userInfo)
        }
    }, [getUserInfoStatus, dispatch, userInfo, params?.id])

    useEffect(() => {

        return () => {
            dispatch(getUserInfoClear())
        }
    }, [dispatch])

    if (getUserInfoStatus === AsyncStates.LOADING) return <SkeletonUserCardLoading />
    if (!userProfileDetails) return null


    return (
        userProfileDetails && <div className='user__profile__container' style={{ backgroundColor: profileColor, color: getContrastColor(profileColor) }}>
            <div className="user__details__container">
                <div className='user__profile__avatar'>
                    <UserAvatar isUserVerified={userProfileDetails?.is_email_verified} title={userProfileDetails.public_user_name} titleClassName="font-medium text-base leading-5" />
                    {loggedInUser && loggedInUser?._id !== userProfileDetails?._id &&
                        <div className='follow__button' >
                            {loggedInUser?.followings?.includes(userProfileDetails?._id) ?
                                <Tooltip title={"Withdraw Follow Request"}>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            dispatch(followUserRequest({ senderId: loggedInUser._id, receiverId: userProfileDetails._id }))
                                        }}>
                                        <UserDeleteOutlined /> {"Withdraw Follow Request"}
                                    </Button>
                                </Tooltip>
                                :
                                <Tooltip title={"Send Follow Request"}>
                                    <Button

                                        onClick={(e) => {
                                            e.stopPropagation()
                                            // socket.emit("send_follow_request", { senderId: loggedInUser._id, receiverId: user._id, tab })
                                            dispatch(followUserRequest({ senderId: loggedInUser._id, receiverId: userProfileDetails._id }))
                                        }}>
                                        <UserAddOutlined /> {"Follow"}
                                    </Button>
                                </Tooltip>
                            }
                        </div>
                    }
                </div>
                <div className='user__profile__details'>
                    <div className='follows'>
                        <div id="stats__container">
                            <p className="stats-text">
                                <svg viewBox="0 0 24 24" className='icons'>
                                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                </svg>
                                <span>{userProfileDetails?.followers?.length ?? 0}</span>followers
                            </p>
                            <p className="stats-text">
                                <svg viewBox="0 0 24 24" className='icons'>
                                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                </svg>
                                <span>{userProfileDetails?.followings?.length ?? 0}</span>followings
                            </p>
                            {!!userProfileDetails?.posts?.length &&
                                <p className="stats-text">
                                    <svg viewBox="0 0 24 24" className='icons'>
                                        <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                                    </svg>
                                    <span>{userProfileDetails?.posts?.length}</span>posts
                                </p>
                            }
                        </div>
                    </div>
                    <h3>Experience: {userProfileDetails?.user_job_experience}</h3>
                    <h3>Working @ <span className='font-semibold'>{userProfileDetails?.user_current_company_name}</span></h3>
                    {userProfileDetails.user_bio && <p>{userProfileDetails.user_bio}</p>}

                </div>
            </div>
            <div className='user__activity__container'>
                <div className='flex gap-2 flex-col'>
                    <div>
                        <Jobs from={"user_profile"} user_id={userProfileDetails?._id} />
                    </div>
                    <div>
                        <Posts from={"user_profile"} user_id={userProfileDetails?._id} />
                    </div>
                </div>
            </div>
            <div className='auth__wrapper fixed bottom-4 z-50 backdrop-blur'>
                <Login profileColor={profileColor} setProfileColor={setProfileColor} />
            </div>
        </div>
    )
}
