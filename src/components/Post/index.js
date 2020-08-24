import React from 'react'
import './style.css'
import Cell from '../Cell'
import Gridx from '../Gridx'
import { Link } from 'react-router-dom'


function Post(props) {
    if (!props.postImageUrl) {
        return (
            <>
                <Cell size={'postBox'}>
                    <Gridx classes={'align-center'}>
                        <Cell size={'small-3 postImage text-center'}>
                            <img className="poster-thumbnail" src={props.profilePictureUrl} alt={props.firstName} />
                            <p className='text-center dateInfo'>{props.date}</p>
                        </Cell>
                        <Cell size={'small-9 postContent'}>
                          

                            <p className=''><Link to={{ pathname: '/public', state: { userId: props.userId } }}>{props.userName}</Link>{props.text}</p>
                               
                            <p className='text-right locationInfo'>{props.location}</p>
                            
                        </Cell>
                    </Gridx>
                </Cell>
            </>
        )
    } else {
        return (
            <>
                <Cell size={'postBox'}>
                    <Gridx classes={'align-center'}>
                        <Cell size={'small-3 postImage text-center'}>
                            <img className="poster-thumbnail" src={props.profilePictureUrl} alt={props.firstName} />
                            <p className='text-center'>{props.date}</p>
                        </Cell>
                        <Cell size={'small-9 postContent'}>
                            <p className=''><Link to={{ pathname: '/public', state: { userId: props.userId } }}>{props.userName}</Link>{props.text}</p>
                            <img className="adventureImage" src={props.postImageUrl} alt="new adventure image" />
                            <p className='text-right align-self-bottom locationInfo'>{props.location}</p>
                        </Cell>
                    </Gridx>
                </Cell>
            </>
        )
    }


}


export default Post