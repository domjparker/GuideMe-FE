import React, {useState}from 'react'
import './style.css'
import Messages from "../Messages"
import API from "../../util/API"


function PopupChat(props) {

    const [chatBox, setChatBox] = useState(false)

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
    const sendMessages = (e)=>{
        e.preventDefault()
        const messageObj = {
            recieverId: props.id,
            messageText: "This is a test"
        }
        console.log(messageObj)
        API.sendMessage(messageObj)
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
                    <textarea placeholder="Type message.." name="msg" required></textarea>
                    <button type="submit" className="btn">Send</button>
                    <button type="button" className="btn cancel" onClick={handleCloseChat}>Close </button>
                </form>
            </div>
        </>
    )

}

export default PopupChat;