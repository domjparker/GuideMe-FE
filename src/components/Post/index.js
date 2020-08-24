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
                        <Cell size={'small-6 postContent'}>
                            <p className='lead'><Link to={{ pathname: '/public', state: { userId: props.userId } }}>{props.userName}</Link>{props.text}</p>
                            <p className='text-right locationInfo'>{props.location}</p>
                        </Cell>
                        <Cell size={'small-3 adventureImage text-center'}>
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
                        <Cell size={'small-6 postContent'}>
                            <p className='lead'><Link to={{ pathname: '/public', state: { userId: props.userId } }}>{props.userName}</Link>{props.text}</p>
                            <p className='text-right locationInfo'>{props.location}</p>
                        </Cell>
                        <Cell size={'small-3 adventureImage text-center'}>
                            <img className="adventureImage" src={props.postImageUrl} alt="new adventure image" />
                        </Cell>
                    </Gridx>
                </Cell>
            </>
        )
    }


}


export default Post