import { ChatSidebar } from "../Chat/ChatSidebar/ChatSidebar"
import "./ChatWrapper.css"
import { ChatContainer } from '../Chat/Chat/ChatContainer'
import { useSelector } from "react-redux"

const ChatWrapper = () => {
    const selectedChat = useSelector(state => state.chatData.selectedChat) ?? true
    console.log({ selectedChat })

    return (
        <section className='chat__wrapper__container'>
            <section className={`${selectedChat ? "chat__sidebar__selected__chat" : "chat__sidebar"} chat__sidebar`} >
                <ChatSidebar />
            </section>

            <section className={`${!selectedChat ? "chat__container__no__selected_chat" : "chat__container__selected__chat"} chat__container`}>
                <ChatContainer />
            </section>
        </section>
    )
}

export default ChatWrapper
