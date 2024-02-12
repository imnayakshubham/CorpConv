import { Link } from "react-router-dom"
import { Dropdown, Avatar, Button } from "antd"
import { GoogleOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest, logoutRequest } from '../../../store/action/login';
import { signInWithGooglePopup } from "../../../firebase/firebase";
import "./Navbar.css"

// const apiPayload = {
//     "actual_user_name": "Shubham Nayak",
//     "is_email_verified": true,
//     "email_id": "shane.henry@example.com",
//     "is_anonymous": true,
//     "user_phone_number": null,
//     "actual_profile_pic": "https://lh3.googleusercontent.com/a/ACg8ocLo_puA6u6DrxZ-9ryLs59wzTPt1uTxPIIiFhxpZUEm=s96-c",
//     "providerId": "firebase",
//     "meta_data": {
//         "createdAt": "1703058890617",
//         "lastLoginAt": "1703059959133"
//     },
//     "provider": "google.com"
// }

export const Navbar = () => {
    const dispatch = useDispatch()
    const { loginResponse: userInfo } = useSelector(state => state.login)

    // const fetchHomies = useCallback(async () => {
    //     const apiResponse = await axios.get(`https://randomuser.me/api`)
    //     if (apiResponse.status === 200) {
    //         return apiResponse.data.results?.[0]
    //     }
    // }, [])

    const handleLogin = async () => {
        try {
            const data = await signInWithGooglePopup()
            const payload = {
                actual_user_name: data.user.displayName,
                is_email_verified: data.user.emailVerified,
                email_id: data.user.email,
                is_anonymous: true,
                user_phone_number: data.user.phoneNumber,
                actual_profile_pic: data.user.photoURL,
                providerId: data.user.providerId,
                meta_data: data.user.metadata,
                provider: data.providerId
            }
            // const apiPayload = await fetchHomies()
            if (payload) {
                // const data = {
                //     actual_user_name: `${apiPayload.name.first} ${apiPayload.name.last}`,
                //     user_email_id: apiPayload.email,
                //     user_phone_number: apiPayload?.phone || apiPayload?.cell || apiPayload.user.phoneNumber,
                //     actual_profile_pic: apiPayload?.picture.large || apiPayload?.picture?.thumbnail || apiPayload.user.photoURL,
                //     providerId: "dummy.com",
                //     provider: "randomuser.me",
                //     meta_data: {
                //         ...(apiPayload?.location || {}),
                //         ...(apiPayload?.login || {}),
                //         gender: apiPayload?.gender || null,
                //         date_of_birth: apiPayload?.dob,
                //         actual_profile_pictures: (apiPayload?.picture ?? null)
                //     }
                // }
                dispatch(loginRequest(payload))
            }
        } catch (error) {
            console.log({ error })
        }
    }
    const items = [
        {
            label: <Link to={`/user/${userInfo?._id}`} className="nav-logo">Profile</Link>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: '3',
            onClick: () => {
                dispatch(logoutRequest())
            }
        },
    ];
    return (
        <header className="header" id="navigation-menu">
            <nav className="navbar">
                <div className="navbar__left">
                    <Link to="/" className="nav-logo">CorpConvo</Link>
                </div>
                <div className="navbar__right">
                    {userInfo?.token ? <>
                        <Link to="/chats" className="nav-logo js-anchor-link">Chats</Link>
                        <Dropdown menu={{ items }} trigger={['click']}
                            placement="bottomLeft"
                        >
                            <div onClick={e => e.preventDefault()}>
                                <Avatar size="large" icon={<>Icon</>} />
                            </div>
                        </Dropdown>
                    </>
                        : <Button onClick={() => {
                            handleLogin()
                        }} icon={<GoogleOutlined />}>Login With Google</Button>}
                </div>
            </nav>
        </header>
    )
}