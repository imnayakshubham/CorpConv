import { Routes, Route, useNavigate } from 'react-router-dom'
import { Jobs } from './components/Jobs/Jobs.js';

import "./App.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { socketEndPoint } from "../constants/index.ts";
import { socketSave } from "../store/action/common.js";
import { UserProfile } from './components/UserProfile/UserProfile.tsx';
import { PrivateRoutes } from './components/PrivateRoutes/PrivateRoutes.tsx';
import { PageWrapper } from './components/PageWrapper/PageWrapper.tsx';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile.tsx';
import { ChatWrapper } from './components/ChatContainer/ChatWrapper.tsx';
import { Users } from './components/Users/Users.tsx';
import { Posts } from './components/Posts/Posts.tsx';
import { LandingPage } from './components/LandingPage/LandingPage.tsx';


function App() {
  const loginResponse = useSelector((state) => state.login.loginResponse)
  const socket = useSelector((state) => state.common.socketInstance)

  const dispatch = useDispatch()

  const navigateTo = useNavigate()

  useEffect(() => {
    if (!loginResponse) {
      navigateTo("/")
    } else if ((!loginResponse.user_current_company_name || !loginResponse.user_job_experience || !loginResponse.user_job_role)) {
      navigateTo("/update-profile")
    }
  }, [loginResponse, navigateTo])

  useEffect(() => {
    const socketInstance = io(socketEndPoint)
    if (!socket) {
      dispatch(socketSave(socketInstance))
    }
  }, [dispatch, socket])


  useEffect(() => {
    if (!socket) return
    socket.emit("setup", loginResponse);
    socket.on("connected", () => console.log("connected..."));
    socket.on("follow_request_send_notication", (payload) => {
      console.log(payload)
    })
  }, [socket]);

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

          <Route element={<PrivateRoutes />}>
            <Route path='/update-profile' element={
              <PageWrapper bodyClass='w-3/4 border border-slate-800'>
                <UpdateProfile />
              </PageWrapper>} />
          </Route>
          <Route path='*' element={<>404 Page</>} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/chats' element={<ChatWrapper />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
