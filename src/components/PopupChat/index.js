import React, { useState, useEffect } from 'react'
import './style.css'
import Messages from "../Messages"
import API from "../../util/API"
import io from "socket.io-client";

function PopupChat(props) {

    const [chatBox, setChatBox] = useState(true)
    const [messageText, setMessageText] = useState("")
    const [socket, setSocket] = useState()
    const [socketAppend, setSocketAppend] = useState("")

    // if(socket){
    //     console.log(2)

    // }

    // }
    useEffect(() => {
        setSocket(io.connect("http://localhost:3001"))
    }, []);
    useEffect(() => {

        if (socket) {
            // const messageHolder = []
            API.getSessionData().then(res => {
                console.log("THIS HAPPENED")
                socket.emit('login', res.data.id)
                socket.on('text', (obj) => {
                    console.log(obj)
                    console.log(obj.messageText)
                    // messageHolder.push(obj.messageText)
                    setSocketAppend(socketAppend + "\n" + obj.messageText)
                })

            })
        }

    }, [socket]);



    // close chat window
    const handleCloseChat = (e) => {
        e.stopPropagation();
        socket.emit('close')
        setChatBox(false)
        props.hide()
    }
    const handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        setMessageText(value)
    };
    const updateMail = async () => {
        const converserObj = {
            converser: props.id
        }
        await API.updateMailbox(converserObj)
        props.handleOpen()
    }
    const sendMessages = async (e) => {
        e.preventDefault()
        const messageObj = {
            name: props.name,
            recieverId: props.id,
            email:props.email,
            messageText: messageText
        }
        if (props.mailbox.map(function (e) { return e.converser._id; }).indexOf(props.id) !== -1) {
            console.log("They are in the mailbox")
        } else {

            console.log("They are not in the mailbox")
            API.nodemailerMailBox(messageObj)

            updateMail()
        }
        API.sendMessage(messageObj)
        socket.emit('sendText', messageObj)
        setMessageText("")
    }
    let showHide = chatBox ? "visible" : "invisible";

    return (
        <>
            <div onClick={(e) => e.stopPropagation()} className={"chat-popup " + showHide} id="myForm">
                <form action="/action_page.php" className="form-container" onSubmit={sendMessages}>
                    <h1>{props.name}</h1>
                    <Messages id={props.id} />
                    <div>{socketAppend}</div>

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