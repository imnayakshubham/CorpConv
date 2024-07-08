import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { Jobs } from './components/Jobs/Jobs.jsx';

import "./App.css";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { socketEndPoint } from "../constants/index.ts";
import { socketSave } from "../store/action/common.js";
import { UserProfile } from './components/UserProfile/UserProfile.jsx';
import { PrivateRoutes } from './components/PrivateRoutes/PrivateRoutes.tsx';
import { PageWrapper } from './components/PageWrapper/PageWrapper.jsx';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile.jsx';
import { ChatWrapper } from './components/ChatContainer/ChatWrapper.jsx';
import { Users } from './components/Users/Users.jsx';
import { Posts } from './components/Posts/Posts.jsx';
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import { Post } from './components/Posts/Post/Post.jsx';
import { logoutRequest } from '../store/action/login.js';
import { StickyNote, MessageCircle, LogOut, Home, CircleUser, Users as UsersIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AnswerLinkHome } from './components/AnswerLink/AnswerLinkHome.tsx';
import { AnswerLinkQuestion } from './components/AnswerLink/AnswerLinkQuestion/AnswerLinkQuestion.jsx';
import { AnswerLinkQuestions } from './components/AnswerLink/AnswerLinkQuestions.tsx';
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
          <PageWrapper>
            <LandingPage />
          </PageWrapper>
        } />

        <Route path='/posts' element={
          <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12 "}>
            <Posts />
          </PageWrapper>
        } />
        <Route>
          <Route path='/jobs' element={
            <PageWrapper>
              <Jobs from={"jobs"} />
            </PageWrapper>
          } />

          <Route>
            <Route path='/users' element={
              <PageWrapper>
                <Users />
              </PageWrapper>
            } />
          </Route>

          <Route>
            <Route path='/user/:id' element={
              <UserProfile />
            } />
          </Route>

          <Route>
            <Route path='/post/:id' element={
              <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                <Post />
              </PageWrapper>
            } />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/update-profile' element={
              <PageWrapper bodyClass='w-full md:w-3/4 border border-slate-800'>
                <UpdateProfile />
              </PageWrapper>} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/answerlink' element={
              <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
                <AnswerLinkHome />
              </PageWrapper>} />
          </Route>
          <Route path='/answerlink/question/:id' element={
            <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
              <AnswerLinkQuestion />
            </PageWrapper>}
          />
          <Route path='/answerlink/questions' element={
            <PageWrapper bodyClass={"lg:w-8/12 md:w-9/12"}>
              <AnswerLinkQuestions />
            </PageWrapper>}
          />
          <Route path='*' element={
            <PageWrapper>
              <div className="flex items-center h-[88vh] justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold mb-4">404</h1>
                  <p className="text-lg">Oops! Page not found.</p>
                  <Link to="/" className="text-blue-500 hover:underline">
                    Go back to home
                  </Link>
                </div>
              </div>
            </PageWrapper>
          } />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/chats' element={<ChatWrapper />} />
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
