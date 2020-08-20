import React from 'react'
import './style.css'
import Btn from '../Btn'

function TagBox(props){

    return (
        <div className="tagBox" >
            <p>{props.text}</p>
            {props.edit && <Btn  classes={"x-button"} handleClick={props.handledeletedag} type={"button"} text={<span data-id={props.dataId} aria-hidden="true">&times;</span>}/>}
        </div>
    )

}

export default TagBox