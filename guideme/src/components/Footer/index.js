//generic footer component, will be at the bottom of every page and include info about the site in general
import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'


function Footer(props){
//TODO:needs building out a bit
return (
    <>
    <div className="grid-container copyright full">
        <Gridx>
            <Cell size={''}>
                <h2 className="text-center">{"copyright 2020"}</h2>
            </Cell>
        </Gridx>
    </div>
    </>
)

}

export default Footer;