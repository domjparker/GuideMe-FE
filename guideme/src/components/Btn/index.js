import React from 'react'
import './style.css'

function Btn (props) {

    return (
        <button className={props.classes} onClick={props.handleClick}>{props.text}</button>
    )

}

export default Btn