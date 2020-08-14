import React from 'react'
import './style.css'

function Btn (props) {

    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )

}

export default Btn