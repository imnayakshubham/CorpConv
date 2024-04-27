import { useDispatch } from "react-redux"
import { loginRequest } from '../../../store/action/login';
import { signInWithGooglePopup } from "../../../firebase/firebase"
import { GoogleOutlined } from "@ant-design/icons"


export const LoginWithGoogle = () => {
    const dispatch = useDispatch()

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
                user_email_id: data.user.email,
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

    return (
        <>
            <button
                onClick={() => {
                    handleLogin()
                }}
                className="relative inline-flex h-10 overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-1">
                    <GoogleOutlined /> Login With Google
                </span>
            </button>
        </>

    )
}

