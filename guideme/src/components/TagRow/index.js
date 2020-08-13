import React from "react";
import './style.css'
import Cell from '../Cell'
import Gridx from '../Gridx'

function TagRow(props) {
       const {tags} = props
       
    return (
        <>
        <Cell size={""}>
            <Gridx classes={"grid-padding-x align-center"}>
                {tags? tags.map(tag => (<Cell  size="small-3 medium-2 tagDiv" key={props.tags.indexOf(tag)}>{tag}</Cell>)):null}
            </Gridx>
        </Cell>
        </>        
    )
}

export default TagRow;
