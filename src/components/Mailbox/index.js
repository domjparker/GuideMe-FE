// *Check if you're logged in, prompts log in if not already logged in.
// If logged in, get request based on session ID
// Make array in users called mailbox
import React, { useState } from 'react'
import Messages from '../../components/Messages'
import PopupChat from '../../components/PopupChat'
// import './style.css'
// import Wrapper from '../../components/Wrapper'
import API from '../../util/API'

function Mailbox(props) {
    const [mailbox, setMailbox] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [intendedUser, setIntendedUser] = useState({})

    const handleMailboxOpen = async (e) => {
        const { data } = await API.getMailbox();
        setMailbox(data.mailbox)
    }

    
return (
    <>
        <button className="messageBtn" onClick={handleMailboxOpen}><i className="far fa-envelope"></i></button>
        {(showMessage === false) ?
            <ul>
                {
                    (mailbox.length > 0) ? mailbox.map(item => <li><PopupChat name={item.converser.firstName} id={item.converser._id} /></li>)

                        : null
                }

            </ul>
            : null}
    </>
)



}

export default Mailbox;