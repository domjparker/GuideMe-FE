import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'


function Footer(props){

return (
    <>
    <div className="grid-container">
        <Gridx full={true}>
            <Cell size={''}>
                <h2>{"copyright 2020"}</h2>
            </Cell>
        </Gridx>
    </div>
    </>
)

}

export default Footer;