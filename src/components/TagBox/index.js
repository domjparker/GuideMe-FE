import React from 'react'
import './style.css'
import API from '../../util/API'

function TagBox(props){

    return (
        <div>
            <p>tag</p>
            {props.delete && <Btn classes={"close-button"} handleClick={handleDeleteTag} type={"button"} text={<span aria-hidden="true">&times;</span>}/>}
        </div>
    )

}

export default TagBox