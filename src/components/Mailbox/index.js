// *Check if you're logged in, prompts log in if not already logged in.
// If logged in, get request based on session ID
// Make array in users called mailbox
import React, { useState } from 'react'
import Messages from '../../components/Messages'
// import './style.css'
// import Wrapper from '../../components/Wrapper'
import API from '../../util/API'

function Mailbox(props) {
    const [mailbox, setMailbox] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [intendedUser, setIntendedUser] = useState('')

    const handleMailboxOpen = async (e) => {

        const { data } = await API.getMailbox();
        setMailbox(data.mailbox)
    }
    const messageOpen = function (id) {
       
        setIntendedUser(id);
        
    }


return (
    <>
        <button onClick={handleMailboxOpen}>MailBox</button>

        {(showMessage === false) ?
            <ul>
                {
                    (mailbox.length > 0) ? mailbox.map(item => <button onClick={messageOpen(item.converser._id)}>{item.converser.firstName}</button>)

                        : null
                }

            </ul>
            : <Messages id={intendedUser} />}
    </>
)



}

export default Mailbox;