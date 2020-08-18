//the bottom nav bar on the bottom of your page
import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import Gridx from '../Gridx'
import Cell from '../Cell'
import Messages from '../Messages'
import Mailbox from '../Mailbox'
// import PopupChat from '../PopupChat'



const Stickyfooter = (props) => (
    
    <>
    <div className="grid-container full" id="stickyFooter">
        <Gridx>
            <Cell size={'small-3'} >
              <Link to="/adventures"><i className="fas fa-search search"></i></Link>  
            </Cell>
            <Cell size={'small-3' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                <Link to={'/profile'} ><i className="fas fa-hiking hiking"></i></Link>
            </Cell>
            <Cell size={'small-3'} id="messages">
                <Mailbox/>
            </Cell>
            <Cell size={'small-3'} id="signout">
                <Link to={'/'} ><i className="fas fa-sign-out-alt signout"></i></Link>
            </Cell>
        </Gridx>
    </div>
    </>
)

export default Stickyfooter;