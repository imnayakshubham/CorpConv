import React, { useEffect, useRef } from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../config/ChatLogics'
import { Avatar, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { UserNameAvatar } from '../../UserNameAvatar/UserNameAvatar'
import { Check, CheckCheck } from 'lucide-react'
import "./ChatMessageContainer.css"
import { UserAvatar } from '@/components/UserAvatar/UserAvatar'

export const ChatMessageContainer = ({ messages }) => {
    const { loginResponse: userInfo } = useSelector(state => state.login)

    return (
        <>
            {!!messages?.length ? <div className='chat__message__container'>
                {messages.map((message, i) => {
                    return <div style={{ display: "flex" }} key={message._id}>
                        {(isSameSender(messages, message, i, userInfo._id) ||
                            isLastMessage(messages, i, userInfo._id)) && (
                                <Tooltip label={message.sender.public_user_name} placement="bottom-start" hasArrow>
                                    <UserAvatar avatarImage={message.sender?.user_public_profile_pic} title={<h3 className="post_by__header">{message.sender?.posted_by.public_user_name}</h3>}></UserAvatar>
                                </Tooltip>
                            )}
                        <p
                            // className='message'
                            style={{
                                backgroundColor: `${message.sender._id === userInfo._id ? "#00a884" : "#53bdeb"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, message, i, userInfo._id),
                                marginTop: isSameUser(messages, message, i, userInfo._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                // display: "flex"
                            }}
                        >
                            <span style={{ color: message.chat?.users?.length === message.readBy?.length ? "#53bdeb" : "hsla(0,0%,100%,0.5)", display: "flex", gap: "0.25rem", alignItems: "center" }}><p style={{ color: "#fff" }}>{message.content}</p> {message.chat?.users?.length === message.readBy?.length ? <CheckCheck className='msg__deliver_status__icon' /> : <Check className='msg__deliver_status__icon' />}</span>
                        </p>
                    </div>
                })}
            </div> : <>Say Hiii</>
            }
        </>
    )
}
