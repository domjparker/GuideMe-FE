import React, { useState, useEffect } from 'react'
import './style.css'
import Messages from "../Messages"
import API from "../../util/API"
import io from "socket.io-client";

function PopupChat(props) {

    const [chatBox, setChatBox] = useState(true)
    const [messageText, setMessageText] = useState("")
    const [socket, setSocket] = useState()
    const [socketAppend, setSocketAppend] = useState([])


    useEffect(() => {
        setSocket(io.connect("http://localhost:3001"))
    }, []);
    useEffect(() => {

        if (socket) {
            // const messageHolder = []
            API.getSessionData().then(res => {
                socket.emit('login', res.data.id)
                socket.on('text', (obj) => {
                    let arr = [...socketAppend]
                    arr.push(obj)
                    setSocketAppend(arr)
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

        } else {

            API.nodemailerMailBox(messageObj)

            updateMail()
        }
        await API.sendMessage(messageObj)
        socket.emit('sendText', messageObj)
        let arr = [...socketAppend]
        arr.push(messageObj)
        setSocketAppend(arr)
        setMessageText("")
    }
    let showHide = chatBox ? "visible" : "invisible";

    return (
        <>
            <div onClick={(e) => e.stopPropagation()} className={"chat-popup " + showHide} id="myForm">
                <form className="form-container" onSubmit={sendMessages}>
                    <h5 className="chatTitle">{props.name}</h5>
                    <Messages id={props.id} socketMessages={socketAppend}/>
                    <textarea placeholder="Type message.." name="msg" value={messageText} onChange={handleInputChange} required></textarea>
                    <button type="submit" className="button chatButton">Send</button>
                    <button type="button" className="close-button" onClick={handleCloseChat}>X </button>
                </form>
            </div>
        </>
    )

}

export default PopupChat;