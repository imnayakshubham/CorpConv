import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import ReactGA from 'react-ga4';

import "./App.css";
import React, { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { socketEndPoint, BLUR_FADE_DELAY } from "../constants/index.ts";
import { socketSave } from "../store/action/common.js";
import { logoutRequest } from '../store/action/login.js';
import { StickyNote, MessageCircle, Home, CircleUser } from 'lucide-react';

import { Helmet } from 'react-helmet';
import { useLocation } from "react-router-dom";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.tsx';
import { MainLoader } from './components/Loader/MainLoader.tsx';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from './components/ui/navigation-menu.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar.tsx';
import { cn } from './utils/utils.ts';
import LandingPage, { MouseMoveEffect } from './components/LandingPage/LandingPage.jsx';
import PageWrapper from './components/PageWrapper/PageWrapper.jsx';
import { Navbar } from './components/Navbar/Navbar.jsx';
import BlurFade from './components/BlurFadeContainer/blur-fade.tsx';
import BuilderPage from './components/FormBuilderV2/FormBuilderV2.tsx';

const Jobs = React.lazy(() => import('./components/Jobs/Jobs.jsx'))
const UserProfile = React.lazy(() => import('./components/UserProfile/UserProfile.jsx'))
const UpdateProfile = React.lazy(() => import('./components/UpdateProfile/UpdateProfile.jsx'))
const ChatWrapper = React.lazy(() => import('./components/ChatContainer/ChatWrapper.jsx'))
const Users = React.lazy(() => import('./components/Users/Users.jsx'))
const Posts = React.lazy(() => import('./components/Posts/Posts.jsx'))
const Post = React.lazy(() => import('./components/Posts/Post/Post.jsx'))
const AnswerLinkHome = React.lazy(() => import('./components/AnswerLink/AnswerLinkHome.tsx'))
const AnswerLinkQuestion = React.lazy(() => import('./components/AnswerLink/AnswerLinkQuestion/AnswerLinkQuestion.jsx'));
const AnswerLinkQuestions = React.lazy(() => import('./components/AnswerLink/AnswerLinkQuestions.tsx'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound/PageNotFound.tsx'));
const SurveyList = React.lazy(() => import('./components/Surveys/SurveyList/SurveyList.tsx'));
const SurveyBuilder = React.lazy(() => import('./components/Surveys/SurveyBuilder/SurveyBuilder.tsx'));
const SurveySubmissions = React.lazy(() => import('./components/Surveys/SurveySubmissions/SurveySubmissions.tsx'));
const Survey = React.lazy(() => import('./components/Surveys/Survey/Survey.tsx'));

const hiddenNavbarRoutes = ["/chats", "/user/", "/survey/builder", "/survey/", "/builder"];

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
  }, [socket, loginResponse]);

  const googleAnalyticsTrackingId = import.meta.env.VITE_APP_ENV === "production" ? import.meta.env.VITE_APP_GOOGLE_ANALYTICS_ID : null

  if (googleAnalyticsTrackingId) {
    ReactGA.initialize(googleAnalyticsTrackingId);
  }

  const location = useLocation();
  const shouldHideNavbar = hiddenNavbarRoutes.some((route) => {
    if (location.pathname === "/") return true
    if (location.pathname.startsWith("/survey/submissions/")) return false
    return location.pathname.startsWith(route)
  }
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={
          <div className="min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden mb-20 md:mb-8">
            <div className="pointer-events-none fixed inset-0">
              <div className="inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
              <div className="right-0 top-0 h-[250px] w-[250px] bg-blue-500/10 blur-[100px]" />
              <div className="bottom-0 left-0 h-[250px] w-[250px] bg-purple-500/10 blur-[100px]" />
            </div>
            <MouseMoveEffect />
            <LandingPage />
          </div>
        } />

        <Route path='/posts' element={
          <Suspense fallback={<MainLoader />}>
            <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12 "}>
              <Posts />
            </PageWrapper>
          </Suspense>
        } />
        <Route>
          <Route path='/jobs' element={
            <Suspense fallback={<MainLoader />}>
              <PageWrapper>
                <Jobs from={"jobs"} />
              </PageWrapper>
            </Suspense>
          } />

          <Route>
            <Route path='/users' element={
              <Suspense fallback={<MainLoader />}>
                <PageWrapper>
                  <Users />
                </PageWrapper>
              </Suspense>
            } />
          </Route>

          <Route>
            <Route path='/user/:id' element={
              <Suspense fallback={<MainLoader />}>
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <UserProfile />
                </BlurFade>
              </Suspense>
            } />
          </Route>

          <Route>
            <Route path='/post/:id' element={
              <Suspense fallback={<MainLoader />}>
                <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                  <Post />
                </PageWrapper>
              </Suspense>
            } />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/update-profile' element={
              <Suspense fallback={<MainLoader />}>
                <PageWrapper bodyClass='w-full md:w-3/4 border border-slate-400'>
                  <UpdateProfile />
                </PageWrapper>
              </Suspense>
            } />
          </Route>
          <Route path='/answerlink' element={
            <Suspense fallback={<MainLoader />}>
              <Helmet>
                <title>AnswerLink - Your Go-To Q&A Platform to ask anonymous, real-time questionss</title>
                <meta name="description" content="Welcome to AnswerLink, your go-to Q&A platform for asking questions and getting answers from a community of enthusiasts/professionals. Engage in real-time discussions and connect with knowledgeable community members." />
                <meta name="keywords" content="Q&A platform, answers, real-time interaction, community knowledge, Ask Anything, AnswerLink, anonymous community,  , employee" />
                <meta property="og:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                <meta property="og:description" content="Welcome to AnswerLink, your go-to Q&A platform for asking questions and getting answers from a community of enthusiasts/professionals. Engage in real-time discussions and connect with knowledgeable community members." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="AnswerLink - Your Go-To Q&A Platform for Expert Answers" />
                <meta name="twitter:description" content="Welcome to AnswerLink, your go-to Q&A platform for asking questions and getting answers from a community of enthusiasts/professionals. Engage in real-time discussions and connect with knowledgeable community members." />
              </Helmet>
              <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                <AnswerLinkHome />
              </PageWrapper>
            </Suspense>
          } />
        </Route>

        <Route path='/answerlink/question/:id' element={
          <Suspense fallback={<MainLoader />}>
            <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
              <AnswerLinkQuestion />
            </PageWrapper>
          </Suspense>
        }
        />

        <Route path='/builder' element={
          <Suspense fallback={<MainLoader />}>
            <BuilderPage />
          </Suspense>
        }
        />

        <Route element={<PrivateRoutes />}>
          <Route path='/surveys' element={
            <Suspense fallback={<MainLoader />}>
              <PageWrapper bodyClass='w-full md:w-10/12 border border-slate-400'>
                <SurveyList />
              </PageWrapper>
            </Suspense>
          } />
        </Route>

        <Route path='/answerlink/questions' element={
          <Suspense fallback={<MainLoader />}>
            <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
              <Helmet>
                <title>AnswerLink - Your Go-To Q&A Platform to ask anonymous, real-time questions</title>
                <meta name="description" content="Welcome to AnswerLink by Hushwork, your go-to Q&A platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                <meta name="keywords" content="Q&A platform, anonymous questions, real-time interaction, community knowledge, Ask Anything, AnswerLink,anonymous community, Hushwork" />
                <meta property="og:title" content="AnswerLink by Hushwork - Your Go-To Q&A Platform for Expert Answers" />
                <meta property="og:description" content="Welcome to AnswerLink by Hushwork, your go-to Q&A platform for asking questions anonymously and getting answers from a community enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="AnswerLink by Hushwork - Your Go-To Q&A Platform for Expert Answers" />
                <meta name="twitter:description" content="Welcome to AnswerLink by Hushwork, your go-to platform for asking questions and getting answers from a community of experts and enthusiasts. Engage in real-time discussions and connect with knowledgeable community members." />
              </Helmet>
              <AnswerLinkQuestions />
            </PageWrapper>
          </Suspense>
        }
        />

        <Route element={<PrivateRoutes />}>
          <Route path='/surveys' element={
            <Suspense fallback={<MainLoader />}>
              <PageWrapper bodyClass='w-full md:w-10/12 border border-slate-400'>
                <SurveyList />
              </PageWrapper>
            </Suspense>
          } />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/survey/builder/:id' element={
            <Suspense fallback={<MainLoader />}>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <SurveyBuilder />
              </BlurFade>
            </Suspense>
          } />
        </Route>


        <Route element={<PrivateRoutes />}>
          <Route path='/survey/submissions/:id' element={
            <Suspense fallback={<MainLoader />}>
              <PageWrapper bodyClass='w-full md:w-3/4 border border-slate-400'>
                <SurveySubmissions />
              </PageWrapper>
            </Suspense>
          } />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/chats' element={
            <Suspense fallback={<MainLoader />}>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <ChatWrapper />
              </BlurFade>
            </Suspense>
          } />
        </Route>

        <Route>
          <Route path='/survey/:id' element={
            <Suspense fallback={<MainLoader />}>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Survey />
              </BlurFade>
            </Suspense>
          } />
        </Route>

        <Route path='*' element={
          <Suspense fallback={<MainLoader />}>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <PageNotFound />
            </BlurFade>
          </Suspense>
        } />
      </Routes>
      <BottomNavigation />
    </>

  );
}

export default App;



export const BottomNavigation = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.login.loginResponse)

  const components = [
    {
      title: <div className="nav-logo">Answer Link</div>,
      to: `answerlink`,
      key: "answerlink"
    },
    {
      title: <div className="nav-logo">Surveys</div>,
      to: `surveys`,
      key: "surveys"
    },
    {
      title: <div className="nav-logo">Profile</div>,
      to: `/user/${userInfo?._id}`,
      key: "user-info"
    },
    {
      title: "Update Profile",
      key: "update-profile",
      to: "/update-profile",
    },
    {
      title: "Logout",
      key: "logout",
      onClick: () => {
        dispatch(logoutRequest())
      }
    },
  ]


  const navLinks = useMemo(() => {
    const links = [
      {
        title: <div>Home</div>,
        label: "Home",
        icon: <Home aria-label='Home' />,
        to: `/`,
      },
      {
        title: <div>Chat</div>,
        label: "Chat",
        icon: <MessageCircle aria-label='Chat' />,
        to: `chats`,
      },
      {
        title: <div>Posts</div>,
        label: "Posts",
        to: `posts`,
        icon: <StickyNote aria-label='Posts' />,
      },
      {
        title: <div>Community</div>,
        label: "Community",
        to: `users`,
        icon: <CircleUser aria-label='Community' />,
      },
    ]
    return links
  }, [])


  return <div className='fixed z-50 bottom-0 p-2 px-4 h-16 sm:hidden flex w-screen justify-between bg-[#fff] border sm:bg-red-500'>
    {
      navLinks.map((link, i) => {
        return <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger>
              <Link to={link.to} onClick={link.onClick} aria-label={link.label}
                className="flex flex-col items-center justify-center gap-1 p-3 min-w-[48px] min-h-[48px] rounded-md hover:bg-accent focus:bg-accent">
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
    {userInfo?._id &&
      <NavigationMenu className='list-none p-0 w-[48px] h-[48px]'>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='p-0 w-[48px] h-[48px]'>
            <div onClick={e => e.preventDefault()} className="cursor-pointer">
              <Avatar className='w-[30px] h-[30px]'>
                <AvatarImage src={userInfo?.user_public_profile_pic} alt='User Profile Pic' loading='lazy' />
                <AvatarFallback>{userInfo?.public_user_name}</AvatarFallback>
              </Avatar>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-full flex-start flex-col fixed right-0 z-50 bottom-20 shadow-sm bg-[#fff]	border rounded-sm list-none	">
              {components.map((component) => (
                <ListItem
                  key={component.key}
                  title={component.title}
                  to={component.to}
                  id={component.key}
                  {...component}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    }
  </div>
}


const ListItem = React.forwardRef(({ className, title, children, id, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${id === "logout" ? "text-red-500 hover:bg-red-500 hover:text-white font-extrabold" : ""}`,
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem"
