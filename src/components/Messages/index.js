import React, {useState, useEffect} from 'react'
import './style.css'

import API from '../../util/API'
// import PopupChat from '../PopupChat'


function Messages(props) {

    const id = props.id
    const [messages,setMessages ] = useState([]);

    useEffect(() => {
        loadMessages()

    }, [])
    const loadMessages = async () => {
        const {data} = await API.getSentMessage(id)
        setMessages(data)
    }
    {/* socket.on('chat-message', data =>{
                    
        }) */}
    return (
       
        <div className="messageBox">
            <ul>
                {
                (messages.length > 0 )?  messages.map(item =><li>{item.senderId.firstName}: {item.messageText}</li>)
                :null }
            </ul>
        </div>
    )
    
}

export default Messages;