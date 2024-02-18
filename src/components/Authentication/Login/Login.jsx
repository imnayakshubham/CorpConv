import { Button } from "antd"
import { signInWithGooglePopup } from "../../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { GoogleOutlined } from "@ant-design/icons"
import { loginRequest, logoutRequest } from "../../../../store/action/login"
import { useCallback, useState } from "react";
import axios from "axios";

export const Login = ({ profileColor, setProfileColor }) => {
    const { loginResponse: userInfo } = useSelector(state => state.login)
    // const params = useParams()

    const dispatch = useDispatch()

    const fetchHomies = useCallback(async () => {
        const apiResponse = await axios.get(`https://randomuser.me/api`)
        if (apiResponse.status === 200) {
            return apiResponse.data.results?.[0]
        }
    }, [])

    const handleLogin = async () => {
        try {
            const data = await signInWithGooglePopup()
            const payload = {
                actual_user_name: data.user.displayName,
                is_email_verified: data.user.emailVerified,
                user_email_id: data.user.email,
                is_anonymous: true,
                user_phone_number: data.user.phoneNumber,
                actual_profile_pic: data.user.photoURL,
                providerId: data.user.providerId,
                meta_data: data.user.metadata,
                provider: data.providerId
            }
            dispatch(loginRequest(payload))
        } catch (error) {
            console.log({ error })
        }
    }


    return (
        <div className="auth p-2">
            {userInfo?.token ? <div className="flex gap-4 flex-wrap">
                <Link to="/chats" className="nav-logo js-anchor-link hover:text-blue-400">Chats</Link>
                <div to="/chats" className="nav-logo js-anchor-link hover:text-red-500 cursor-pointer" onClick={() => dispatch(logoutRequest())}>Logout</div>
                {/* {params?.id === userInfo?._id && <input type="color" id="favcolor" name="favcolor" value={profileColor} onChange={(e) => setProfileColor(e.target.value)} onBlur={(e) => console.log(profileColor)} />} */}
            </div>
                : <Button onClick={() => {
                    handleLogin()
                }} icon={<GoogleOutlined />}>Login With Google</Button>}
        </div>
    )
}
