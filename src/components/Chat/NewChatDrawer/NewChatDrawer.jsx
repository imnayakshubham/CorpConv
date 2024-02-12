import { Drawer, Input, notification } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import UserListItem from './UserListItem';
import { useDebounce } from '../../../utils/useDebounce';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import "./NewChatDrawer.css"
import { addToChatListRequest, selectedChatRequest } from '../../../../store/action/chats';


const NewChatDrawer = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { chatList } = useSelector(state => state.chatData)

    const { loginResponse } = useSelector(state => state.login)

    const debounceString = useDebounce(search)

    const onClose = () => {
        setIsOpen(false)
    }

    const handleSearch = useCallback(async () => {
        try {
            setLoading(true);

            const config = {
                headers: {
                    token: `${loginResponse.token}`,
                },
            };
            const { data: { result } } = await axios.get(`${import.meta.env.VITE_APP_API_URL}followers?search=${debounceString}`, config);
            setLoading(false);
            setSearchResult(result);
        } catch (error) {
            setLoading(false);
            notification.error({
                message: "Error Occured!",
                description: "Failed to Load the Search Results",
                duration: 5000,
            });
        }
    }, [debounceString, loginResponse.token])


    useEffect(() => {
        handleSearch()
    }, [debounceString, handleSearch])


    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    token: `${loginResponse.token}`,
                },
            };
            const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}chat`, { userId }, config);

            if (!chatList.find((c) => c._id === data._id)) dispatch(addToChatListRequest(data))
            dispatch(selectedChatRequest(data))
            setLoadingChat(false);
            onClose();
        } catch (error) {
            setLoadingChat(false);
            notification.error({
                message: "Error fetching the chat",
                description: error.message,
            });
        }
    };


    return (
        <div>
            <Drawer title="New Chat" onClose={onClose} open={isOpen} placement='left' maskClosable={false} closeIcon={<ArrowLeft className='icon' />}>
                <div className='new__chat__container'>
                    <div>
                        <Input
                            placeholder="Search by Role or Company"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {loading ? (
                        <>Loading...</>
                    ) : (
                        <div className='user__list__container'>
                            {searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))}
                        </div>
                    )}
                    {loadingChat && <div>Loading...</div>}
                </div>
            </Drawer>
        </div>
    )
}

export default NewChatDrawer