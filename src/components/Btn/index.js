//generic button component
import React from 'react'
import './style.css'

function Btn (props) {

    return (
    <button  className={props.classes} onClick={props.handleClick} {...props}>{props.icon}  {props.text}</button>
    )

}

export default Btn