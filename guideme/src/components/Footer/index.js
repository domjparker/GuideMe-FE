import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'


function Footer(props){

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