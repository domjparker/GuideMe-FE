import React from 'react'
import './style.css'
import Cell from '../Cell'
import Gridx from '../Gridx'


function Post(props){
    return (
        <>
            <Cell size={''}>
                <Gridx classes={''}>
                    <Cell size={'small-4 postImage'}>
                        <img className="sender-thumbnail" src={props.profilePictureUrl} alt={props.firstName}/>
                    </Cell>
                    <Cell size={'small-8 postContent'}>
                        <p>{props.text}</p>
                    </Cell>
                </Gridx>
            </Cell>
        </>
    )
}


export default Post