import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import BlurFade from "../BlurFadeContainer/blur-fade";
import Intro from "./Intro";

const features = [
    {
        Icon: "SurveyIcon",
        name: "Survey Builder: Craft and Analyze Surveys Anonymously",
        description: "Design, distribute, and analyze surveys with ease, ensuring participant anonymity and obtaining valuable insights.",
        href: "/surveys",
        cta: "Create Survey",
        ariaLabel: "Explore Survey Builder",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: "AnswerLinkIcon",
        name: "AnswerLink: Engage in Anonymous Q&A",
        description: "Participate in a dynamic community Q&A platform where you can ask questions and receive expert answers while maintaining anonymity.",
        href: "/answerlink",
        cta: "Join Q&A",
        ariaLabel: "Discover AnswerLink",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: "NetworkIcon",
        name: "Anonymous Chats: Connect Privately with Your Network",
        description: "Engage in private, one-on-one conversations with your network, ensuring your identity remains confidential.",
        href: "/chats",
        cta: "Start Chat",
        ariaLabel: "Connect Anonymously via Chats",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: "CommunityIcon",
        name: "Community Posts: Share and Discuss Anonymously",
        description: "Share thoughts, ideas, and discussions with the community while keeping your identity private.",
        href: "/posts",
        cta: "View Posts",
        ariaLabel: "Explore Anonymous Community Posts",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: "PrivacyIcon",
        name: "Prioritize Privacy: Your Data, Your Control",
        description: "At Hushwork, we prioritize your privacy by giving you full control over your data and communications.",
        href: "/privacy",
        cta: "Learn More",
        ariaLabel: "Understand Our Privacy Commitment",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: "StayConnectedIcon",
        name: "Stay Connected: Engage with Your Network Anonymously",
        description: "Maintain and strengthen connections within your network through anonymous interactions.",
        href: "/stay-connected",
        cta: "Discover How",
        ariaLabel: "Learn How to Stay Connected Anonymously",
        className: "col-span-3 lg:col-span-1",
    }
];

const LandingPage = () => {
    const navigateTo = useNavigate()
    const { loginResponse: userInfo } = useSelector(state => state.login)

    return (
        <main>
            <section className="mx-auto max-w-7xl px-3 lg:px-8 flex justify-center items-center flex-col" style={{ height: "calc(100vh - 60px)" }}>
                <div className="relative mx-auto max-w-7xl text-center">
                    <h1 className="font-bold tracking-tight text-4xl/[1.07] lg:text-7xl xl:text-8xl md:text-balance selection:bg-black selection:text-white">
                        Stay Connected with Your Network Anonymously
                    </h1>
                    <p className="mt-6 text-md font-medium text-zinc-500 md:text-xl md:text-balance">
                        Stay connected with <strong>Hushwork</strong> and experience a new way of interacting with your   network. Exchange messages, thoughts, and ideas freely, knowing that your anonymity is our priority.
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
            </section >

            <BlurFade delay={0.4}>
                <Intro />
            </BlurFade>
        </main>
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

