import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { LoginWithGoogle } from "@/components/LoginWithGoogle/LoginWithGoogle";
import { motion } from "framer-motion"

import Intro from "./Intro";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { SurveyIcon, AnswerLinkIcon, NetworkIcon, CommunityIcon, PrivacyIcon, StayConnectedIcon } from "@/components/ui/icons";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

const features = [
    {
        Icon: SurveyIcon,
        name: "Survey Builder: Craft and Analyze Surveys Anonymously",
        description: "Design, distribute, and analyze surveys with ease, ensuring participant anonymity and obtaining valuable insights.",
        href: "/surveys",
        cta: "Create Survey",
        ariaLabel: "Explore Survey Builder",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: AnswerLinkIcon,
        name: "AnswerLink: Engage in Anonymous Q&A",
        description: "Participate in a dynamic community Q&A platform where you can ask questions and receive expert answers while maintaining anonymity.",
        href: "/answerlink",
        cta: "Join Q&A",
        ariaLabel: "Discover AnswerLink",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: NetworkIcon,
        name: "Anonymous Chats: Connect Privately with Your Network",
        description: "Engage in private, one-on-one conversations with your network, ensuring your identity remains confidential.",
        href: "/chats",
        cta: "Start Chat",
        ariaLabel: "Connect Anonymously via Chats",
        className: "col-span-3 lg:col-span-1",
    },
    {
        Icon: CommunityIcon,
        name: "Community Posts: Share and Discuss Anonymously",
        description: "Share thoughts, ideas, and discussions with the community while keeping your identity private.",
        href: "/posts",
        cta: "View Posts",
        ariaLabel: "Explore Anonymous Community Posts",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: PrivacyIcon,
        name: "Prioritize Privacy: Your Profile, Your Choice",
        description: "At Hushwork, we prioritize your privacy by giving you complete control over your profile and communications.",
        href: "/privacy",
        cta: "Learn More",
        ariaLabel: "Understand Our Privacy Commitment",
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: StayConnectedIcon,
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
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
            <Navbar />
            <main className="pt-16 pb-20 sm:pb-4">
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
                            <span role="img" aria-label="Celebration">
                                🎉
                            </span>{" "}
                            Introducing <span className="font-semibold">Hushwork</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl mb-6"
                        >
                            Connect, Communicate, Create Anonymously with Hushwork
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="mx-auto max-w-[42rem] leading-normal text-muted-foreground text-lg sm:text-xl sm:leading-8 mb-8"
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
                                    : <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => {
                                            navigateTo(`/user/${userInfo?._id}`)
                                        }}
                                        className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                                    >
                                        My Profile
                                    </Button>
                            }
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                                onClick={() => {
                                    const element = document.getElementById('features');
                                    element?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                            >
                                Learn More
                            </Button>
                        </motion.div>
                    </div>
                </section>

                <motion.div
                    key={"features"}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <section id="features" className="py-24 relative">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Anonymous. Powerful.</h2>
                                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                    Discover how Hushwork transforms the way people collaborate while maintaining complete privacy.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-md"
                                    >
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                            <feature.Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                                        <Link
                                            href={feature.href}
                                            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                            aria-label={feature.ariaLabel}
                                        >
                                            {feature.cta} <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </motion.div>

                <Intro />
            </main>
        </div>
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


