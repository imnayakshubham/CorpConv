import { ChatSidebar } from "../Chat/ChatSidebar/ChatSidebar"
import "./ChatWrapper.css"
import { ChatContainer } from '../Chat/Chat/ChatContainer'

export const ChatWrapper = () => {

    return (
        <section className='container'>
            <section className='sidebar'>
                <ChatSidebar />
            </section>
            <section className='content'>
                <ChatContainer />
            </section>
        </section>
    )
}
