import React, {useEffect, useState} from 'react'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import './style.css'
import Post from '../../components/Post'
import API from '../../util/API'

function Community () {
    const [feed, setFeed] = useState([])
    //make API call for feed table
    //loop through results to adjust the mappable object based on action
    useEffect(()=>{
        loadFeed()
    }, [])

    const loadFeed = async () =>{
        const feedArr= await API.getFeed()
        
    }

    const convertFeedData = (feedObj) =>{
        console.log(feedObj)
        switch (feedObj.action){
            case 'newUser':
                console.log('newUser')
                break;
            case 'newGuide':
                console.log('newGuide')
                break;
            case 'newAdventure':
                console.log('newAdventure')
                break;
            case 'newReview':
                console.log('newReview')
                break;
            default:
                console.log('newPost')
        }
    }

    return(
        <>
        <Wrapper>
            <Gridx classes={'feedContainer grid-margin-y'}>
                <Post text={'Welcome to GuideMe AndreaBerg! Enjoy your adventures.'} profilePictureUrl={"https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?cs=srgb&dl=pexels-jake-colvin-1761282.jpg&fm=jpg"}/>
            </Gridx>
        </Wrapper>
        </>
    )
}

export default Community