import React, { useState, useEffect } from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import API from '../../util/API'
// import PopupChat from '../PopupChat'


function Messages(props) {

    const id = props.id
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadMessages()

    }, [])
    const loadMessages = async () => {
        const { data } = await API.getSentMessage(id)
        setMessages(data)
    }
    {/* socket.on('chat-message', data =>{
                    
        }) */}
    return (

        <div className="messageBox">
            <div>
                {
                    (messages.length > 0) ? messages.map(item =>
                        <div>
                            <img className="sender-thumbnail" src={item.senderId.profilePictureUrl} alt={item.senderId.firstName}></img>  {item.messageText}
                        </div>)
                        : null}
            </div>
        </div>
    )

}

export default Messages;