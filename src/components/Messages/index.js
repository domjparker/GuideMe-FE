import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import API from '../../util/API'
// import PopupChat from '../PopupChat'


function Messages(props) {

    const id = props.id
    const [messages,setMessages ] = useState([]);

    useEffect(() => {
        blah()

    }, [])
    const blah = async () => {
        const {data} = await API.getSentMessage(id)
        setMessages(data)
        console.log(data)
    }
    {/* socket.on('chat-message', data =>{
                    
        }) */}
    return (
       
        <div>
            <ul>
                {
                (messages.length > 0 )?  messages.map(item =><li>{item.senderId.firstName}: {item.messageText}</li>)
                :null }
            </ul>
        </div>
    )
    
}

export default Messages;