import React from "react";
import './style.css'
import Cell from '../Cell'

function TagRow(props) {
       const {tags} = props
    return (
        <>
        <Cell size={""}>
            {/* {tags.map(tag => (<div className="tagDiv" key={props.tags.indexOf(tag)}>{tag}</div>))} */}
        </Cell>
        </>        
    )
}

export default TagRow;
