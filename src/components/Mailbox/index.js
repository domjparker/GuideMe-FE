import React, { useState, useEffect } from 'react'
import PopupChat from '../../components/PopupChat'
import './style.css'
import API from '../../util/API'
import Btn from '../Btn'

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
        const filteredMailbox = data.mailbox.filter(undefinedMail)
        setMailbox(filteredMailbox)
    }
    function undefinedMail (user){
        console.log(user)
        if(user.converser === null){
            return false
        }else{
            return true
        }
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
                <Btn className="open-button" onClick={props.close} text="Close"/>
                {
                    (mailbox.length > 0) ? mailbox.map(item => <li><button className="open-button" onClick={()=>handleOpenChat(item.converser._id, item.converser.firstName)}>{item.converser.firstName}</button></li>): null
                }

            </ul>
            : <PopupChat name={converser.firstName} id={converser.id} hide={hideMessage} mailbox = {mailbox} handleOpen={handleMailboxOpen} />}
    </>
)



}

export default Mailbox;