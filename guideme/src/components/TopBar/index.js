import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'

function TopBar(props){

return (
    <>
    <div className="grid-container">
        <Gridx full={true}>
            <Cell size={'small-3'}>
                <h1>LOGO</h1>
            </Cell>
            <Cell size={'small-6'}>
                <h1>{props.title}</h1>
            </Cell>
            <Cell size={'small-3'}>
                <h1>Icon</h1>
            </Cell>
        </Gridx>
    </div>
    </>
)

}

export default TopBar;