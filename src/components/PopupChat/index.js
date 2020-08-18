import React, {useState}from 'react'
import './style.css'
import Messages from "../Messages"
import API from "../../util/API"


function PopupChat(props) {

    const [chatBox, setChatBox] = useState(false)
    const [messageText, setMessageText] = useState("")

    // open chat window
    const handleOpenChat = (e) => {
        e.stopPropagation();
        setChatBox(true);
        
    }

    // close chat window
    const handleCloseChat = (e) =>{
        e.stopPropagation();
        setChatBox(false)
    }
    const handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        setMessageText(value)
      };
    const sendMessages = (e)=>{
        e.preventDefault()
        const messageObj = {
            name: props.name,
            recieverId: props.id,
            messageText: messageText
        }
        console.log(messageObj)
        API.sendMessage(messageObj)
        setMessageText("")
        // Socket.emit('send-chat-message', messageObj)
    }
    let showHide = chatBox ? "visible" : "invisible";

    return (
        <>
            <button className="open-button" onClick={handleOpenChat}>{props.name}</button>
            <div className={"chat-popup " + showHide } id="myForm">
                <form action="/action_page.php" className="form-container" onSubmit={sendMessages}>
                    <h1>{props.name}</h1>
                    <Messages id={props.id}/>
                    <label for="msg"><b>Message</b></label>
                    <textarea placeholder="Type message.." name="msg" value={messageText} onChange={handleInputChange} required></textarea>
                    <button type="submit" className="btn">Send</button>
                    <button type="button" className="btn cancel" onClick={handleCloseChat}>Close </button>
                </form>
            </div>
        </>
    )

}

export default PopupChat;