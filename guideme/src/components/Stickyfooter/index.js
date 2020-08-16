// sticky footer will show on every page/screen change. You will be able to navigate to your profile, messages, search adventures, and return from to the home page from the sticky footer.

import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import Gridx from '../Gridx'
import Cell from '../Cell'
import LOGO from '../../images/logo.jpg'
import Messages from '../Messages'
// import PopupChat from '../PopupChat'



const Stickyfooter = (props) => (

    <>
    <div className="grid-container full" id="stickyFooter">
        <Gridx>
            <Cell size={'small-3'}id="logofooter">
                <Link to="/"><h4 className="text-left"><img src = {LOGO} alt="logo"></img></h4></Link>
            </Cell>
            <Cell size={'small-3'} >
              <Link to="/adventures"><i className="fas fa-search search"></i></Link>  
            </Cell>
            <Cell size={'small-3'} id="messages">
                <button className="messageBtn">
                <i className="far fa-envelope"></i></button>
            </Cell>
            <Cell size={'small-3 text-right' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                <Link to={'/profile'} ><i className="fas fa-hiking hiking"></i></Link>
            </Cell>
        </Gridx>
    </div>
    </>
)


export default Stickyfooter;