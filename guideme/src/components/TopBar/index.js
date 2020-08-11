import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'

function TopBar(props){

return (
    <>
    <div className="grid-container full">
        <Gridx>
            <Cell size={'small-3'}>
                <h1 className="text-left">LOGO</h1>
            </Cell>
            <Cell size={'small-6'}>
                <h1 className="text-center">{props.title}</h1>
            </Cell>
            <Cell size={'small-3'}>
                <h1 className="text-right">Icon</h1>
            </Cell>
        </Gridx>
    </div>
    </>
)

}

export default TopBar;