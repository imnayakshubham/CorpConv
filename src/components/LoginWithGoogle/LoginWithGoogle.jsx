import { useDispatch, useSelector } from "react-redux"
import { loginRequest } from '../../../store/action/login';
import { signInWithGooglePopup } from "../../../firebase/firebase"
import { GoogleOutlined } from "@ant-design/icons"
import { Button } from "../ui/button";
import { AsyncStates } from '../../../constants'



export const LoginWithGoogle = () => {
    const dispatch = useDispatch()
    const loginStatus = useSelector((state) => state.login.loginStatus)

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
            if (payload) {
                dispatch(loginRequest(payload))
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    handleLogin()
                }}
                loading={loginStatus === AsyncStates.LOADING}
                loadingContent={"Signing up..."}
            >
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-transparent px-3 py-1 text-md font-medium backdrop-blur-sm gap-1">
                    <GoogleOutlined /> Login With Google
                </span>
            </Button>
        </>

    )
}

