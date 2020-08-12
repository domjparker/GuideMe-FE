import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'

function TopBar(props){

return (
    <>
    <div className="grid-container full" id="topBar">
        <Gridx>
            <Cell size={'small-3'}id="logo">
                <h1 className="text-left">LOGO</h1>
            </Cell>
            <Cell size={'small-6'} id="pageTitle">
                <h1 className="text-center">{props.title}</h1>
            </Cell>
            <Cell size={'small-3 text-right' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                <Link to={'/profile'} ><i className="fas fa-hiking"></i></Link>
            </Cell>
        </Gridx>
    </div>
    </>
)

}

export default TopBar;