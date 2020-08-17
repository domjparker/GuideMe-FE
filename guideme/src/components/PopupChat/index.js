import React, {useState}from 'react'
import './style.css'


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

    let showHide = chatBox ? "visible" : "invisible";

    return (
        <>
            <button className="open-button" onClick={handleOpenChat}>Chat</button>
            <div className={"chat-popup " + showHide } id="myForm">
                <form action="/action_page.php" className="form-container">
                    <h1>Chat</h1>

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