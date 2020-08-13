import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import Gridx from '../Gridx'
import Cell from '../Cell'


const Stickyfooter = (props) => (

    <>
    <div className="grid-container full" id="stickyFooter">
        <Gridx>
            <Cell size={'small-3'}id="logofooter">
                <Link to="/"><h4 className="text-left">LOGO</h4></Link>
            </Cell>
            <Cell size={'small-3'} >
              <Link to="/adventures"><i className="fas fa-search search"></i></Link>  
            </Cell>
            <Cell size={'small-3'} id="messages">
            <Link to={'#'} ><i className="far fa-envelope"></i></Link>
            </Cell>
            <Cell size={'small-3 text-right' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                <Link to={'/profile'} ><i className="fas fa-hiking hiking"></i></Link>
            </Cell>
        </Gridx>
    </div>
    </>
)


export default Stickyfooter;