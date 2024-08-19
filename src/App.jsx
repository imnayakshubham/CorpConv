import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import "./App.css";
import React, { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { socketEndPoint } from "../constants/index.ts";
import { socketSave } from "../store/action/common.js";
import { logoutRequest } from '../store/action/login.js';
import { StickyNote, MessageCircle, LogOut, Home, CircleUser, Users as UsersIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.tsx';

const Jobs = React.lazy(() => import('./components/Jobs/Jobs.jsx'))
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile.jsx'))
const PageWrapper = React.lazy(() => import('./components/PageWrapper/PageWrapper.jsx'))
const UpdateProfile = React.lazy(() => import('./components/UpdateProfile/UpdateProfile.jsx'))
const ChatWrapper = React.lazy(() => import('./components/ChatContainer/ChatWrapper.jsx'))
const Users = React.lazy(() => import('./components/Users/Users.jsx'))
const Posts = React.lazy(() => import('./components/Posts/Posts.jsx'))
const LandingPage = React.lazy(() => import('./components/LandingPage/LandingPage.jsx'))
const Post = React.lazy(() => import('./components/Posts/Post/Post.jsx'))
const AnswerLinkHome = React.lazy(() => import('./components/AnswerLink/AnswerLinkHome.tsx'))
const AnswerLinkQuestion = React.lazy(() => import('./components/AnswerLink/AnswerLinkQuestion/AnswerLinkQuestion.jsx'));
const AnswerLinkQuestions = React.lazy(() => import('./components/AnswerLink/AnswerLinkQuestions.tsx'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound/PageNotFound.tsx'));

import { Helmet } from 'react-helmet';

function App() {
  const loginResponse = useSelector((state) => state.login.loginResponse)
  const socket = useSelector((state) => state.common.socketInstance)

  const dispatch = useDispatch()

  const navigateTo = useNavigate()

  useEffect(() => {
    if (loginResponse && (!loginResponse.user_current_company_name || !loginResponse.user_job_experience || !loginResponse.user_job_role)) {
      navigateTo("/update-profile")
    }
  }, [loginResponse, navigateTo])

  useEffect(() => {
    const socketInstance = io(socketEndPoint, {
      transports: ['websocket']
    })
    if (!socket) {
      dispatch(socketSave(socketInstance))
    }
  }, [dispatch, socket])


  useEffect(() => {
    if (!socket) return
    socket.emit("setup", loginResponse);
    socket.on("connected", () => console.log("connected..."));
    // socket.on("follow_request_send_notication", (payload) => {
    //   console.log(payload)
    // })
  }, [socket, loginResponse]);

  return (
    <>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={<div>Loading...</div>}>
            <PageWrapper>
              <LandingPage />
            </PageWrapper>
          </Suspense>
        } />

        <Route path='/posts' element={
          <Suspense fallback={<div>Loading...</div>}>
            <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12 "}>
              <Posts />
            </PageWrapper>
          </Suspense>
        } />
        <Route>
          <Route path='/jobs' element={
            <Suspense fallback={<div>Loading...</div>}>
              <PageWrapper>
                <Jobs from={"jobs"} />
              </PageWrapper>
            </Suspense>
          } />

          <Route>
            <Route path='/users' element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageWrapper>
                  <Users />
                </PageWrapper>
              </Suspense>
            } />
          </Route>

          <Route>
            <Route path='/user/:id' element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserProfile />
              </Suspense>
            } />
          </Route>

          <Route>
            <Route path='/post/:id' element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                  <Post />
                </PageWrapper>
              </Suspense>
            } />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/update-profile' element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageWrapper bodyClass='w-full md:w-3/4 border border-slate-800'>
                  <UpdateProfile />
                </PageWrapper>
              </Suspense>
            } />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/answerlink' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Helmet>
                  <title>AnswerLink - Your Go-To Q&A Platform for Expert Answers</title>
                  <meta name="description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                  <meta name="keywords" content="Q&A platform, expert answers, real-time interaction, community knowledge, Ask Anything, AnswerLink, expert community" />
                  <meta property="og:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                  <meta property="og:description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                  <meta property="og:type" content="website" />
                  <meta name="twitter:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                  <meta name="twitter:description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                </Helmet>
                <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                  <AnswerLinkHome />
                </PageWrapper>
              </Suspense>
            } />
          </Route>
          <Route path='/answerlink/question/:id' element={
            <Suspense fallback={<div>Loading...</div>}>
              <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                <AnswerLinkQuestion />
              </PageWrapper>
            </Suspense>

          }
          />
          <Route path='/answerlink/questions' element={
            <Suspense fallback={<div>Loading...</div>}>
              <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                <Helmet>
                  <title>AnswerLink - Your Go-To Q&A Platform for Expert Answers</title>
                  <meta name="description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                  <meta name="keywords" content="Q&A platform, expert answers, real-time interaction, community knowledge, Ask Anything, AnswerLink, expert community" />
                  <meta property="og:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                  <meta property="og:description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                  <meta property="og:type" content="website" />
                  <meta name="twitter:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                  <meta name="twitter:description" content="Welcome to AnswerLink, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                </Helmet>
                <AnswerLinkQuestions />
              </PageWrapper>
            </Suspense>
          }
          />
          <Route path='*' element={
            <Suspense fallback={<div>Loading...</div>}>
              <PageNotFound />
            </Suspense>
          } />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/chats' element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChatWrapper />
            </Suspense>
          } />
        </Route>
      </Routes>
      <BottomNavigation />
    </>

  );
}

export default App;



export const BottomNavigation = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.login.loginResponse)


  const navLinks = useMemo(() => {
    const links = [
      {
        title: <div>Home</div>,
        icon: <Home />,
        to: `/`,
      },
      {
        title: <div>Chat</div>,
        icon: <MessageCircle />,
        to: `chats`,
      },
      {
        title: <div>Posts</div>,
        to: `posts`,
        icon: <StickyNote />,
      },
      {
        title: <div>Community</div>,
        to: `users`,
        icon: <CircleUser />,
      },
    ]

    if (userInfo) {
      links.push(...[
        {
          title: <div className="nav-logo">Profile</div>,
          to: `/user/${userInfo?._id}`,
          icon: <UsersIcon />
        },
        {
          title: "Logout",
          id: "logout",
          icon: <LogOut className='text-red-500' />,
          onClick: () => {
            dispatch(logoutRequest())
          }
        },
      ])
    }
    return links
  }, [dispatch, userInfo])

  return <div className='fixed z-50 bottom-0 p-4 sm:hidden flex gap-2 w-screen justify-between bg-[#fff]'>
    {
      navLinks.map((link, i) => {
        return <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger>
              <Link to={link.to} onClick={link.onClick} className="flex flex-col items-center justify-center gap-1">
                {link.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      })
    }
  </div>
}
