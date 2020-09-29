import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import API from '../../util/API'

function Messages(props) {

    const id = props.id
    const messagesEnfRef = useRef(null)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadMessages()
        
    }, [props.socketMessages])

    //grab the converstaion from the database
    const loadMessages = async () => {
            const { data } = await API.getSentMessage(id)
            setMessages(data)
            scrollToBottom()
    }

    const scrollToBottom = () =>{
        messagesEnfRef.current.scrollIntoView({behavior:'smooth'})
    }

    return (
        <div className="messageBox">
            <div>
                {(messages.length > 0) ? messages.map(item =>
                    <div key={item._id}>
                        <img className="sender-thumbnail" src={item.senderId.profilePictureUrl} alt={item.senderId.firstName}></img>  {item.messageText}
                    </div>)
                    : null}
                <div ref={messagesEnfRef}/>
            </div>
        </div>
    )

}

export default Messages;