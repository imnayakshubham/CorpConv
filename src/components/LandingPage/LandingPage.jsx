import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

const features = [
    {
        Icon: "NetworkIcon",
        name: "Anonymously Connect",
        description: "Anonymously connect with your corporate network. Exchange messages, thoughts, and ideas freely, with privacy as our priority.",
        href: "/chats",
        cta: "View",
        ariaLabel: "Discover How to Connect Anonymously",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: "PrivacyIcon",
        name: "Prioritize Privacy",
        description: "At CorpConv, we emphasize privacy by offering a secure platform for anonymous communication among corporate employees.",
        href: "/posts",
        cta: "View",
        ariaLabel: "Learn How We Prioritize Privacy",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: "JobIcon",
        name: "Post Job Opportunities",
        description: "Share job openings and engage in private, one-on-one conversations while ensuring user anonymity.",
        href: "/jobs",
        cta: "View",
        ariaLabel: "Explore Job Posting Options",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: "CalendarIcon",
        name: "Stay Connected",
        description: "Maintain connections with CorpConv and discover new ways to interact with your corporate network.",
        href: "/",
        cta: "View",
        ariaLabel: "Find Out How to Stay Connected",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: "CalendarIcon",
        name: "AnswerLink: Your Ultimate Q&A Destination",
        description: "Welcome to AnswerLink, where you can ask questions and get expert answers from a dynamic community. Quick solutions and in-depth insights await you.",
        href: "/answerlink",
        cta: "View",
        ariaLabel: "Explore AnswerLink for Q&A",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: "CalendarIcon",
        name: "Survey: Your Ultimate Survey Builder",
        description: "Introducing Survey, your go-to tool for creating, distributing, and analyzing surveys. Gather feedback and insights with ease.",
        href: "/surveys",
        cta: "View",
        ariaLabel: "Explore Survey Builder",
        className: "col-span-3 lg:col-span-2",
        disabled: false,
    }
];

const LandingPage = () => {
    const navigateTo = useNavigate()
    const { loginResponse: userInfo } = useSelector(state => state.login)

    return (
        <>
            <div className="mx-auto max-w-7xl px-3 lg:px-8 flex justify-center items-center flex-col" style={{ height: "calc(100vh - 60px)" }}>
                <div className="relative mx-auto max-w-7xl text-center">
                    <h1 className="bg-clip-text font-bold tracking-tight text-4xl/[1.07] lg:text-7xl xl:text-8xl md:text-balance selection:bg-black selection:text-white">
                        Anonymously Connect with Your Corporate Network
                    </h1>
                    <p className="mt-6 text-lg font-medium text-zinc-500 md:text-xl md:text-balance">
                        Stay connected with <strong>CorpConv</strong> and experience a new way of interacting with your corporate network. Exchange messages, thoughts, and ideas freely, knowing that your anonymity is our priority.
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
                                        className="group relative rounded-full p-px text-sm/6 text-zinc-500 duration-300 hover:text-zinc-100 hover:shadow-glow" type="button" aria-expanded="false" aria-controls="radix-:Rjljaqla:" data-state="closed"><span className="absolute inset-0 overflow-hidden rounded-full">
                                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500"></span>
                                        </span>
                                        <div className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50">
                                            My Profile
                                        </div><span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] transition-opacity duration-500"></span>
                                    </button>
                            }
                        </div>
                    </div >
                </div >
            </div >
            <section className="mx-auto max-w-7xl px-3 lg:px-8 flex justify-center items-center flex-col">
                <BentoDemo />
            </section>

            <section className="py-16">
                <div className="flex justify-center items-center align-middle flex-col h-full">
                    <h2
                        className="w-full h-full flex justify-center items-center tracking-tighter text-center text-5xl sm:text-7xl lg:text-9xl opacity-10 hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-pointer customfont">
                        CorpConv
                    </h2>
                </div>
            </section>

            <section className="max-w-7xl px-3 lg:px-8 flex justify-center items-center flex-col gap-4">
                <div className="w-full">
                    <div className="py-3">
                        <div className="border-b border-gray-800"></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="w-auto">
                            <strong className="my-auto text-sm text-gray-600 font-rem2">Developed by Nayak Shubham</strong>
                        </div>
                        <section className="flex justify-center items-center gap-2">
                            <a
                                target="_blank" rel="noreferrer" href="https://github.com/imnayakshubham"
                                className="group flex justify-center p-2 rounded-md drop-shadow-xlfont-semibold transition-all duration-500 border"
                            >
                                <svg
                                    className="w-5"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                                >
                                    GitHub
                                </span>
                            </a>

                            <a
                                target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/imnayakshubham/"
                                className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 font-semibold transition-all duration-500 border"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1.1em"
                                    viewBox="0 0 512 512"
                                    strokeWidth="0"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"
                                    ></path>
                                </svg>
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                                >
                                    Linkedin
                                </span>
                            </a>
                            <a
                                target="_blank" rel="noreferrer" href="https://www.x.com/imnayakshubham"
                                className="group flex justify-center p-2 rounded-md drop-shadow-xlfont-semibold transition-all duration-500 border"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth="0"
                                    fill="currentColor"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z"
                                    ></path>
                                </svg>
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                                >
                                    X (Twitter)
                                </span>
                            </a>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage

export function BentoDemo() {
    return (
        <BentoGrid>
            {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
    );
}

