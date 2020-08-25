//component to display tags
import React, {useEffect, useState} from "react";
import './style.css'
import Cell from '../Cell'
import Gridx from '../Gridx'
import TagBox from '../TagBox'
import moment from 'moment'

//TODO: add a delete button to those if in update mode
//takes in an array of tags
function TagRow(props) {
       const [tags, setTags] = useState(props.tags)
       
       useEffect(()=>{
            setTags(props.tags)
       }, [props.tags])
    return (
        <>
        <Cell size={"tagRow"}>
            <Gridx classes={"grid-padding-x align-center"}>
            {tags && tags.map(tag => (props.dateInfo?<TagBox edit={props.edit} key={props.tags.indexOf(tag)} text={moment(tag).format("MM/DD/YYYY")} handledeletetag={props.filterTags}/>:<TagBox edit={props.edit} key={props.tags.indexOf(tag)} text={tag} handledeletetag={props.filterTags}/>))}
            </Gridx>
        </Cell>
        </>        
    )
}

export default TagRow;
