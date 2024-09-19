import { useEffect, useState } from 'react'
import "./ChatSidebar.css"
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Input, Tooltip } from 'antd'
import { MessageCirclePlus, LogOut, ListCollapse, Search, ArrowLeft } from 'lucide-react';
import NewChatDrawer from '../NewChatDrawer/NewChatDrawer'
import { fetchChatListRequest, selectedChatRequest } from '../../../../store/action/chats'
import { getSender } from '../../../config/ChatLogics'
import { AsyncStates } from '../../../../constants'
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';


export const ChatSidebar = () => {
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const { loginResponse } = useSelector(state => state.login)
    const socket = useSelector((state) => state.common.socketInstance)
    const { fetchChatListStatus, chatList, selectedChat } = useSelector(state => state.chatData)

    useEffect(() => {
        dispatch(fetchChatListRequest())
    }, [dispatch])

    const selectChat = (chat) => {
        dispatch(selectedChatRequest(chat))
        socket.emit("read message", chat)
    }

    useEffect(() => {
        if (!socket) return;
        if (selectedChat) {
            socket.emit("current_chat", selectedChat._id)
        }
    }, [selectedChat, socket])

    return (
        <>
            <div className='side__bar__header'>
                <div className='side__bar__header__user__info'>
                    <ArrowLeft className='icon' onClick={() => window.history.back()} />
                    <UserAvatar avatarImage={loginResponse.user_public_profile_pic} title={<h3 className="font-semibold md:text-sm">{loginResponse?.public_user_name}</h3>}></UserAvatar>
                </div>
                <div className='side__bar__header__actions'>
                    {/* <Badge count={5}>
                        <BellRing className='icon' />
                    </Badge> */}
                    <Tooltip title={"Show Side bar"}>
                        <ListCollapse className='icon show__side__bar' />
                    </Tooltip>
                    <Tooltip title={"New Chat"}>
                        <MessageCirclePlus className='icon' onClick={() => setIsOpen(true)} />
                    </Tooltip>
                    <Tooltip title={"Logout"}>
                        <LogOut className='icon logout' />
                    </Tooltip>

                </div>
            </div>
            <div className='side__bar__search__user'>
                <Input className='side__bar__search__user__input' placeholder='Search Here...' allowClear />
                <Search />
            </div>
            <div className='side__bar__user_chat_list'>
                {fetchChatListStatus === AsyncStates.LOADING ? <>Loading....</> : chatList.map((chat) => <div key={chat._id} className={`user_chat ${selectedChat?._id === chat._id ? "selected_chat" : ""}`} onClick={() => selectChat(chat)}>
                    <div className='chat__name__container'>
                        <UserAvatar avatarImage={loginResponse?.user_public_profile_pic} title={<h3 className="post_by__header">{!chat.isGroupChat ? getSender(loginResponse, chat.users) : chat?.chatName} </h3>}></UserAvatar>
                        <Badge
                            className="site-badge-count-109"
                            count={chat?.unreadMessage?.length}
                            style={{ backgroundColor: '#52c41a' }}
                        />
                        <Badge>{ }</Badge>
                    </div>
                    {chat.latestMessage && (
                        <h4 >
                            <b>{chat.latestMessage.sender.public_user_name} : </b>
                            {chat.latestMessage.content.length > 50 ? chat.latestMessage.content.substring(0, 51) + "..." : chat.latestMessage.content}
                        </h4>
                    )}
                </div>
                )}
            </div >
            <NewChatDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>

    )
}
