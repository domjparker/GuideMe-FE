//the bottom nav bar on the bottom of your page
import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Gridx from '../Gridx'
import Cell from '../Cell'
import Messages from '../Messages'
import Mailbox from '../Mailbox'
// import PopupChat from '../PopupChat'


function Stickyfooter(props) {
    const [showMailbox, setShowMailbox] = useState(false)

    const handleMailboxOpen = () => {
        setShowMailbox(true)
    }
    const handleMailboxClose = () => {
        setShowMailbox(false)
    }
    return (<>

        <div className="grid-container full" id="stickyFooter">
            <Gridx>
                {(showMailbox === false) ? null : <Mailbox close={handleMailboxClose} />}
                <Cell size={'small-3 text-left'} >
                    <Link to="/adventures"><i className="fas fa-search search"></i></Link>
                </Cell>
                <Cell size={'small-3 text-right' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                    <Link to={'/profile'} ><i className="fas fa-hiking hiking"></i></Link>
                </Cell>
                <Cell size={'small-3'} id="messages">
                    <button className="messageBtn" onClick={handleMailboxOpen}><i className="far fa-envelope"></i></button>
                </Cell>
                <Cell size={'small-3'+ (props.loggedOut ? ' loggedOut' : '')} id="signout">
                    <Link to={'/'} ><i className="fas fa-sign-out-alt signout"></i></Link>
                </Cell>
            </Gridx>
        </div>
    </>)
}

export default Stickyfooter;