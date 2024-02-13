import { useDispatch, useSelector } from "react-redux"

import { loginRequest } from '../../../store/action/login';
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../../../firebase/firebase"

export const LandingPage = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
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
        <div className="" >
            <div className="mx-auto max-w-7xl px-3 lg:px-8">
                <div className="relative mx-auto max-w-3xl text-center">
                    <h1 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-4xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]" style={{
                        opacity: 1, transform: "none"
                    }}>
                        <span className="text-black	opacity-50 duration-300 hover:opacity-100 ease-in">Anonymously</span> Connect with Your Corporate Network
                    </h1>
                    <p className="mt-6 text-lg font-medium text-zinc-400 md:text-xl" style={{ opacity: 1, transform: "none" }}>
                        Stay connected with <span className="text-black	opacity-50 duration-300 hover:opacity-100 ease-in">CorpConv</span> and experience a new way of interacting with your corporate network. Exchange messages, thoughts, and ideas freely, knowing that your anonymity is our priority.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-y-8">
                        <div style={{
                            opacity: 1, transform: "none"
                        }}>
                            {
                                !userInfo ?

                                    <button
                                        onClick={() => {
                                            handleLogin()
                                        }}
                                        className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow" type="button" aria-expanded="false" aria-controls="radix-:Rjljaqla:" data-state="closed"><span className="absolute inset-0 overflow-hidden rounded-full">
                                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                        </span>
                                        <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
                                            Login With Google
                                        </div><span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                                    </button>
                                    : <button
                                        onClick={() => {
                                            navigateTo(`/user/${userInfo?._id}`)
                                        }}
                                        className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow" type="button" aria-expanded="false" aria-controls="radix-:Rjljaqla:" data-state="closed"><span className="absolute inset-0 overflow-hidden rounded-full">
                                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                        </span>
                                        <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
                                            My Profile
                                        </div><span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                                    </button>
                            }
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}
