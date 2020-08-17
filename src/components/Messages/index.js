import React, {useState} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import API from '../../util/API'
// import PopupChat from '../PopupChat'


function Messages(props) {

    const id = "5f3832b3f5c5042d3f855798"
    const [messages,setMessages ] = useState([]);

    const onClick = async (e) => {
        e.stopPropagation()
        const {data} = await API.getSentMessage(id)
        setMessages(data)
    }

    return (
       
        <div>

            <button onClick={onClick}><strong>Book this adventure</strong></button>
            
            {/* <ul>
                {
                (messages.length > 0 )?  messages.map(item =><li>{item.messageText}</li>)
               
                :null }

            </ul> */}
        </div>
    )
    
}

export default Messages;