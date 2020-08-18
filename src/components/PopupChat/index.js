import React, {useState}from 'react'
import './style.css'
import Messages from "../Messages"
import API from "../../util/API"


function PopupChat(props) {

    const [chatBox, setChatBox] = useState(true)
    const [messageText, setMessageText] = useState("")


    // close chat window
    const handleCloseChat = (e) =>{
        e.stopPropagation();
        setChatBox(false)
        props.hide()
    }
    const handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        setMessageText(value)
      };
    const updateMail = async ()=> {
        const converserObj = {
            converser: props.id
        }
        await API.updateMailbox(converserObj)
        props.handleOpen()
    }
    const sendMessages = (e)=>{
        e.preventDefault()
        const messageObj = {
            name: props.name,
            recieverId: props.id,
            messageText: messageText
        }
        debugger
        if(props.mailbox.map(function(e) { return e.converser._id; }).indexOf(props.id) !== -1){
            console.log("They are in the mailbox")
        }else{
            console.log("They are not in the mailbox")
            updateMail()
        }
        API.sendMessage(messageObj)
        setMessageText("")
        // Socket.emit('send-chat-message', messageObj)
    }
    let showHide = chatBox ? "visible" : "invisible";

    return (
        <>
            <div onClick= {(e)=>e.stopPropagation()}className={"chat-popup " + showHide } id="myForm">
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