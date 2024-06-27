import { ChatSidebar } from "../Chat/ChatSidebar/ChatSidebar"
import "./ChatWrapper.css"
import { ChatContainer } from '../Chat/Chat/ChatContainer'
import { useSelector } from "react-redux"

export const ChatWrapper = () => {
    const selectedChat = useSelector(state => state.chatData.selectedChat)

    console.log({ selectedChat })
    return (
        <section className='chat__wrapper__container'>
            <section className='w-full md:sidebar'>
                <ChatSidebar />
            </section>
            <section className={`${!selectedChat ? "hidden" : ""} content`}>
                <ChatContainer />
            </section>
        </section>
    )
}
