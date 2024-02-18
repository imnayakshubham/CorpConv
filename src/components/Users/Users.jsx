import { useCallback, useEffect, useMemo, useState } from 'react'
import { Empty, Segmented } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../../../store/action/users';
import { AnimatePresence, motion } from "framer-motion";

import "./Users.css"
import { UserCard } from './UserCard/UserCard';
import { AsyncStates } from '../../../constants';
import { SkeletonUserCardLoading } from '../SkeletonUserCardLoading/SkeletonUserCardLoading';

export const Users = () => {
    const dispatch = useDispatch()
    const { usersList, fetchUsersStatus } = useSelector(state => state.users)
    const loginResponse = useSelector(state => state.login.loginResponse)
    const [tab, setTab] = useState('all_users');

    const [hoveredIndex, setHoveredIndex] = useState(null);


    const fetchUsers = useCallback(async () => {
        dispatch(fetchUsersRequest({ type: tab, loggedIn: loginResponse?.token ? true : undefined, _id: loginResponse?._id }))
    }, [dispatch, tab, loginResponse?.token, loginResponse?._id])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const options = [{
        value: "all_users",
        label: "All Users",
        title: "All Users",
        key: "all_users",

    },
    {
        value: "followers",
        label: "followers",
        title: "followers",
        key: "followers",

    },
    {
        value: "pending_followings",
        label: "Pending Invitation",
        title: "Pending Invitation",
        key: "pending_followings",
    },
    {
        value: "followings",
        label: "Followings",
        title: "Followings",
        key: "followings",
    }]

    const usersListData = useMemo(() => usersList?.[tab] ?? [], [tab, usersList])


    const listlenArray = new Array(15).fill(null)

    return (
        <>
            <Segmented options={options} value={tab} onChange={(value) => setTab(value)} style={{ background: "transparent" }} />
            <div className='user__list__container'>
                {fetchUsersStatus[tab] === AsyncStates.LOADING ? (
                    listlenArray.map((array, index) => <SkeletonUserCardLoading key={index} />)
                ) : (
                    usersListData.length ? (
                        usersListData.map((user) => <div key={user._id}
                            className="relative group  block p-2 h-full w-full"
                            onMouseEnter={() => setHoveredIndex(user._id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <AnimatePresence>
                                {hoveredIndex === user._id && (
                                    <motion.span
                                        className="absolute inset-0 h-full w-full bg-neutral-100 dark:bg-slate-800/[0.8] block  rounded-xl"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.15 },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.15, delay: 0.2 },
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                            <UserCard user={user} tab={tab} from="users" key={user._id} />
                        </div>)
                    ) : (
                        <Empty />
                    )
                )}
            </div>

        </>

    )
}
