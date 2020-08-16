//component to display tags
import React from "react";
import './style.css'
import Cell from '../Cell'
import Gridx from '../Gridx'

//TODO: add a delete button to those if in update mode
//takes in an array of tags
function TagRow(props) {
       const {tags} = props
       
    return (
        <>
        <Cell size={""}>
            <Gridx classes={"grid-padding-x align-center"}>
                {tags? tags.map(tag => (<Cell  size="small-3 medium-2 tagDiv" key={props.tags.indexOf(tag)}>{tag.tagName}</Cell>)):null}
            </Gridx>
        </Cell>
        </>        
    )
}

export default TagRow;
