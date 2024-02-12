import { useCallback, useEffect, useMemo, useState } from 'react'
import { Empty, Segmented } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../../../store/action/users';

import "./Users.css"
import { UserCard } from './UserCard/UserCard';
import { AsyncStates } from '../../../constants';
import { SkeletonUserCardLoading } from '../SkeletonUserCardLoading/SkeletonUserCardLoading';

export const Users = () => {
    const dispatch = useDispatch()
    const { usersList, fetchUsersStatus } = useSelector(state => state.users)
    const loginResponse = useSelector(state => state.login.loginResponse)
    const [tab, setTab] = useState('all_users');

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
                        usersListData.map((user) => <UserCard user={user} tab={tab} from="users" key={user._id} />)
                    ) : (
                        <Empty />
                    )
                )}
            </div>

        </>

    )
}
