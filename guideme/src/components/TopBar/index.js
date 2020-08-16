import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'
import LOGO from '../../images/logo.jpg'


function TopBar(props) {

    return (
        <>
            <div className="grid-container full" id="topBar">
                <Gridx>
                    <Cell size={'small-3'} id="logo">
                        <Link to="/"><h4 className="text-left"><img src={LOGO} alt="logo"></img></h4></Link>
                    </Cell>
                    <Cell size={'small-6'} id="pageTitle">
                        <h1 className="text-center">{props.title}</h1>
                    </Cell>
                </Gridx>
            </div>
        </>
    )

}

export default TopBar;