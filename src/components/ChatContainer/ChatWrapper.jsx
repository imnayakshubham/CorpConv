import { ChatSidebar } from "../Chat/ChatSidebar/ChatSidebar"
import "./ChatWrapper.css"
import { ChatContainer } from '../Chat/Chat/ChatContainer'
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"

const ChatWrapper = () => {
    const selectedChat = useSelector(state => state.chatData.selectedChat)

    return (
        <section className='chat__wrapper__container'>
            <Helmet>
                <title>Hushwork - Anonymous Networking & Privacy Focused</title>
                <meta name="description" content="Hushwork offers a secure platform for people to connect, share ideas, and exchange messages anonymously. Prioritize your privacy and experience a new way of interacting with your network." />
                <meta name="keywords" content="anonymously connect, network, privacy, secure messaging, anonymous communication, interaction, confidential networking, Hushwork, anonymous ideas sharing, messaging platform" />
                <meta property="og:title" content="Hushwork - Anonymous Networking & Privacy Focused" />
                <meta property="og:description" content="Hushwork provides a secure and anonymous platform for people to connect, share ideas, and exchange messages, prioritizing your privacy and confidentiality." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Hushwork - Anonymous Corporate Networking & Privacy Focused" />
                <meta name="twitter:description" content="Connect and interact with your network anonymously using Hushwork. Prioritize privacy while exchanging messages and ideas securely." />
            </Helmet>
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
