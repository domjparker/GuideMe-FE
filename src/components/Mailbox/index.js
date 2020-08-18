// *Check if you're logged in, prompts log in if not already logged in.
// If logged in, get request based on session ID
// Make array in users called mailbox
import React, { useState, useEffect } from 'react'
import PopupChat from '../../components/PopupChat'
import './style.css'
// import Wrapper from '../../components/Wrapper'
import API from '../../util/API'

function Mailbox(props) {
    const [mailbox, setMailbox] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [converser, setConverser] = useState({
        firstName: "",
        id: ""
    })
    useEffect(() => {
        handleMailboxOpen()
      }, [])
    

    const handleMailboxOpen = async (e) => {
        const { data } = await API.getMailbox();
        setMailbox(data.mailbox)
    }
    const handleOpenChat = async (id, name)=> {
        await setConverser({
            firstName: name,
            id: id
        })
        setShowMessage(true)
    }
    const hideMessage = ()=>{
        setShowMessage(false)
    }
    // <PopupChat name={item.converser.firstName} id={item.converser._id} />
return (
    <>
        {(showMessage === false) ?
            <ul className="fixer">
                <button className="open-button" onClick={props.close}>Close</button>
                {
                    (mailbox.length > 0) ? mailbox.map(item => <li><button className="open-button" onClick={()=>handleOpenChat(item.converser._id, item.converser.firstName)}>{item.converser.firstName}</button></li>): null
                }

            </ul>
            : <PopupChat name={converser.firstName} id={converser.id} hide={hideMessage} mailbox = {mailbox} handleOpen={handleMailboxOpen} />}
    </>
)



}

export default Mailbox;