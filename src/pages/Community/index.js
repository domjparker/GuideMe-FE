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
        // const feedArr= await API.getFeed()
        const feedObj = {
            targetId: [{
                "_id" : "5f40b62fc2e880aacc0fee58",
                "verified" : true,
                "host" : true,
                "hostedAdventures" : [],
                "completedAdventures" : [],
                "tags" : [],
                "firstName" : "maria",
                "lastName" : "maria",
                "email" : "maria@maria.com",
                "password" : "$2b$10$RB2dVKaXDr479Ag8d/rI2O7fVX2hkL3PuwXy5/oDJzXMC3QS.KvRy",
                "mailbox" : [],
                "availability" : [],
                "__v" : 0,
                "bio" : "Coolestest cool person just so cool, there is no one cooler ever on Earth. Yeah!",
                "location" : "Woods",
                "stateLocation" : "Washington",
                "profilePictureUrl" : "https://res.cloudinary.com/yestoskydiving/image/upload/v1598126251/GuideMeProfilePic/df4lzacpzyornjoyl4lj.jpg"
            }],
            action:'newUser',
            adventureId:'',
            postImageUrl:'',
            postText:''
        }
        convertFeedData(feedObj)
    }

    const convertFeedData = (feedObj) =>{
        console.log(feedObj)
        switch (feedObj.action){
            case 'newUser':
                setFeed([...feed, {profilePictureUrl:feedObj.targetId.profilePictureUrl, location:`${feedObj.targetId.location}, ${feedObj.targetId.stateLocation}`, text:``}])
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