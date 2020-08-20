//component to display tags
import React, {useEffect, useState} from "react";
import './style.css'
import Cell from '../Cell'
import Gridx from '../Gridx'
import TagBox from '../TagBox'

//TODO: add a delete button to those if in update mode
//takes in an array of tags
function TagRow(props) {
       const [tags, setTags] = useState(props.tags)
       const [flipper, setFlipper] = useState(false)
       
       const filterTags = (e) => {
           let id = e.target.getAttribute('data-id')
          let tagArr = [...tags]
           tagArr=  tagArr.filter(tag=>tag._id !== id)
           setTags(tagArr)
           setFlipper(!flipper)
       }
       
       useEffect(()=>{
           console.log('useeffect fired ', flipper)
            setTags(props.tags)
       }, [props.tags])
    return (
        <>
        <Cell size={"tagRow"}>
            <Gridx classes={"grid-padding-x align-center"}>
            {tags && tags.map(tag => (<TagBox dataId={tag._id} edit={props.edit} key={props.tags.indexOf(tag)} text={tag.tagName} handledeletetag={filterTags}/>))}
            </Gridx>
        </Cell>
        </>        
    )
}

export default TagRow;
