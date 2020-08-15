import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import API from '../../util/API'


function Messages(props) {

    API.getSentMessage(id)

    
    
}



export default Messages;
    //     const MessageList =({value, onClick})=>(
    //         <li onClick={onClick}>{value}</li>
    //     );
    //     const List =({ messages, onMessageClick }) =>(
    //       <ul>
    //           {
    //               messages.map((item, i) => <MessageList key={i} value={item} onClick={onMessageClick} />)
    //           }
    //     </ul>
    //   )