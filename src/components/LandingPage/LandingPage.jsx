import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import BlurFade from "../BlurFadeContainer/blur-fade";
import Intro from "./Intro";
import { cn } from "@/utils/utils";
import { DotPattern } from "../magicui/DotPattern";

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
        <main>
            <BlurFade delay={0.2}>
                <section className="mx-auto max-w-7xl px-3 lg:px-8 flex justify-center items-center flex-col" style={{ height: "calc(100vh - 60px)" }}>
                    <div className="fixed flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden">
                        <DotPattern
                            className={cn(
                                "[mask-image:radial-gradient(400px_circle_at_center,green,transparent)]",
                            )}
                        />
                    </div>
                    <div className="relative mx-auto max-w-7xl text-center">
                        <h1 className="font-bold tracking-tight text-4xl/[1.07] lg:text-7xl xl:text-8xl md:text-balance selection:bg-black selection:text-white">
                            Anonymously Connect with Your Corporate Network
                        </h1>
                        <p className="mt-6 text-md font-medium text-zinc-500 md:text-xl md:text-balance">
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
                </section >
            </BlurFade>

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

