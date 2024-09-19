import { useCallback, useEffect, useMemo, useState } from 'react';
import "./Chat.css";
import { getSenderInfo } from '../../../config/ChatLogics';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import axios from 'axios';
import { ChatMessageContainer } from '../ChatMessageContainer/ChatMessageContainer';
import { updateChatList, fetchChatListRequest, selectedChatRequest } from '../../../../store/action/chats';
import { getUrl } from '../../../utils/sendApiRequest';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import { ArrowLeft } from 'lucide-react';

export const ChatContainer = () => {
    const dispatch = useDispatch()

    const [inputMessage, setInputMessage] = useState("")
    const [messages, setMessages] = useState([]);

    const loginResponse = useSelector(state => state.login.loginResponse)
    const selectedChat = useSelector(state => state.chatData.selectedChat)

    const senderInfo = useMemo(() => getSenderInfo(loginResponse, selectedChat?.users), [loginResponse, selectedChat?.users])

    const socket = useSelector((state) => state.common.socketInstance)


    const fetchMessages = useCallback(async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    token: `${loginResponse.token}`,
                },
            };


            const { data: { result } } = await axios.get(getUrl(`message/${selectedChat._id}`), config);
            if (result?.chatData) {
                dispatch(updateChatList(result?.chatData))
            }
            setMessages(result?.messages ?? []);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            notification.error({
                message: "Error Occured!",
                description: "Failed to Load the Messages",
            });
        }
    }, [loginResponse.token, selectedChat, socket, dispatch])

    useEffect(() => {
        if (!!selectedChat?._id) {
            fetchMessages();
        }
    }, [fetchMessages, selectedChat?._id]);

    // useEffect(() => {
    //     socket.on("typing", () => setIsTyping(true));
    //     socket.on("stop typing", () => setIsTyping(false));
    // }, [loginResponse, socket]);

    const sendMessage = async (event) => {
        if ((event.key === "Enter" || event.type === "click") && !!inputMessage.length) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        token: `${loginResponse.token}`,
                    },
                };
                const { data } = await axios.post(getUrl("message"),
                    {
                        content: inputMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                setInputMessage("");

                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                console.log(error)
                notification.error({
                    message: "Error Occured!",
                    description: "Failed to send the Message",
                });
            }
        }
    }

    useEffect(() => {
        if (!socket) return;
        socket.on("message recieved", (newMessage) => {
            if (selectedChat?._id !== newMessage?.chat?._id) {
                console.log("for other user", newMessage)
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
            dispatch(fetchChatListRequest({ background: true }))
        })
    }, [dispatch, selectedChat, selectedChat?._id, socket])

    // useEffect(() => {
    //     if (typing) {
    //         socket.emit("typing", selectedChat._id);
    //     }
    // }, [socket, selectedChat])




    return (
        <>
            {senderInfo ?
                <div className='chat__room'>
                    <>
                        <div className='header flex items-center gap-2'>
                            <div className='back__button__chat__room'>
                                <ArrowLeft className='icon cursor-pointer' onClick={() => dispatch(selectedChatRequest(null))} />
                            </div>
                            <div>
                                <UserAvatar avatarImage={senderInfo?.posted_by?.user_public_profile_pic} title={<h3 className="post_by__header">{senderInfo?.posted_by.public_user_name}</h3>}></UserAvatar>
                            </div>
                        </div>
                        <div className='chat__content'>
                            <ChatMessageContainer messages={messages} />
                        </div>
                        <div className='footer'>
                            <div className='chat__input__contaniner'>
                                <input
                                    type="text"
                                    className='chat__input'
                                    value={inputMessage}
                                    // onFocus={() => {
                                    //     setTyping(true)
                                    // }}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={sendMessage}
                                />
                                <button className='chat__send__btn' onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </>
                </div >
                : <div className='no_chat_selected'>
                    <div>Anonymously Connect with Your Corporate Network</div>
                    <p>At CorpConv, we prioritize your privacy and provide a secure space for corporate employees to exchange messages and thoughts anonymously. Whether you have ideas to share, questions to ask, or simply want to connect with your colleagues in a confidential manner, this is the platform for you.</p>
                    <p>Stay connected with CorpConv and experience a new way of interacting with your corporate network. Exchange messages, thoughts, and ideas freely, knowing that your anonymity is our priority.</p>
                    <p><em>CorpConv - Where Your Voice Matters Anonymously</em></p>
                </div>
            }
        </>
    );
};
