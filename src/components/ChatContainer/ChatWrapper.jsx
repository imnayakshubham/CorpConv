import { ChatSidebar } from "../Chat/ChatSidebar/ChatSidebar"
import "./ChatWrapper.css"
import { ChatContainer } from '../Chat/Chat/ChatContainer'
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"

const ChatWrapper = () => {
    const selectedChat = useSelector(state => state.chatData.selectedChat) ?? true

    return (
        <section className='chat__wrapper__container'>
            <Helmet>
                <title>CorpConv - Anonymous Corporate Networking & Privacy Focused</title>
                <meta name="description" content="CorpConv offers a secure platform for corporate employees to connect, share ideas, and exchange messages anonymously. Prioritize your privacy and experience a new way of interacting with your corporate network." />
                <meta name="keywords" content="anonymously connect, corporate network, privacy, secure messaging, anonymous communication, corporate interaction, confidential networking, CorpConv, anonymous ideas sharing, corporate messaging platform" />
                <meta property="og:title" content="CorpConv - Anonymous Corporate Networking & Privacy Focused" />
                <meta property="og:description" content="CorpConv provides a secure and anonymous platform for corporate employees to connect, share ideas, and exchange messages, prioritizing your privacy and confidentiality." />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="CorpConv - Anonymous Corporate Networking & Privacy Focused" />
                <meta name="twitter:description" content="Connect and interact with your corporate network anonymously using CorpConv. Prioritize privacy while exchanging messages and ideas securely." />
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
