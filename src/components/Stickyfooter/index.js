//the bottom nav bar on the bottom of your page
import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import Gridx from '../Gridx'
import Cell from '../Cell'
import Messages from '../Messages'
// import PopupChat from '../PopupChat'



const Stickyfooter = (props) => (
    <>
    <div className="grid-container full" id="stickyFooter">
        <Gridx>
            <Cell size={'small-4 text-left'} >
              <Link to="/adventures"><i className="fas fa-search search"></i></Link>  
            </Cell>
            <Cell size={'small-4 text-center'} id="messages">
                <button className="messageBtn">
                <i className="far fa-envelope"></i></button>
            </Cell>
            <Cell size={'small-4 text-right' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                <Link to={'/profile'} ><i className="fas fa-hiking hiking"></i></Link>
            </Cell>
        </Gridx>
    </div>
    </>
)


export default Stickyfooter;