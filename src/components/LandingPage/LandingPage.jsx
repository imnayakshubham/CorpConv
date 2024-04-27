import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";

export const LandingPage = () => {
    const navigateTo = useNavigate()
    const { loginResponse: userInfo } = useSelector(state => state.login)

    return (
        <div className="" >
            <div className="mx-auto max-w-7xl px-3 lg:px-8 flex justify-center items-center flex-col" style={{ height: "calc(100vh - 60px)" }}>
                <div className="relative mx-auto max-w-4xl text-center">
                    <h1 className="bg-gradient-to-br from-zinc-400 to-black bg-clip-text text-4xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]"
                        style={{
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
                                    <LoginWithGoogle />
                                    : <button
                                        onClick={() => {
                                            navigateTo(`/user/${userInfo?._id}`)
                                        }}
                                        className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow" type="button" aria-expanded="false" aria-controls="radix-:Rjljaqla:" data-state="closed"><span className="absolute inset-0 overflow-hidden rounded-full">
                                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500"></span>
                                        </span>
                                        <div className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                            My Profile
                                        </div><span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] transition-opacity duration-500"></span>
                                    </button>
                            }
                        </div>
                    </div >
                </div >
            </div >
            {/* <StickyScroll data={data} /> */}
        </div >
    )
}
