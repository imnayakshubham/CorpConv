import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { motion } from "framer-motion"

import BlurFade from "../BlurFadeContainer/blur-fade";
import Intro from "./Intro";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";

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
        <>
            <div className="min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
                <Navbar />
                <main className="pt-24">
                    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
                        </div>

                        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex gap-1 items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium mb-6"
                            >
                                🎉 Introducing <h1>Hushwork</h1>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-5xl mb-6"
                            >
                                Connect, Communicate, Create Anonymously <br />  with
                                <strong className="pl-2">Hushwork</strong>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8"
                            >
                                Speak Freely, Stay Private: Create Anonymous Surveys, Join Private Q&A, Chat and Connect Anonymously - Your Privacy Matters
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                            >
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
                            </motion.div>




                        </div>
                    </section>

                    <BlurFade delay={0.4}>
                        <section id="features" className="py-20 relative">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Anonymous. Powerful.</h2>
                                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                        Discover how Hushwork transforms the way people collaborate while maintaining complete privacy.
                                    </p>
                                </div>

                                <Intro />

                            </div>
                        </section>
                    </BlurFade>

                </main>
            </div>
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


export const MouseMoveEffect = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
            }}
        />
    )
}


