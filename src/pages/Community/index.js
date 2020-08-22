import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import './style.css'
import Post from '../../components/Post'
import API from '../../util/API'
import { TextArea } from '../../components/Form'
import Btn from '../../components/Btn'

function Community() {
    const [feed, setFeed] = useState([])
    const [post, setPost] = useState('')
    const [change, setChange] = useState(false)
    useEffect(() => {
        loadFeed()
    }, [change])

    //make API call for feed table
    const loadFeed = async () => {
        const feedArr= await API.getFeed()
        console.log(feedArr)
        const feedObj = {
            _id: "asdfasdfasdf",
            targetId: {
                "_id": "5f40b62fc2e880aacc0fee58",
                "verified": true,
                "host": true,
                "hostedAdventures": [],
                "completedAdventures": [],
                "tags": [],
                "firstName": "maria",
                "lastName": "maria",
                "email": "maria@maria.com",
                "password": "$2b$10$RB2dVKaXDr479Ag8d/rI2O7fVX2hkL3PuwXy5/oDJzXMC3QS.KvRy",
                "mailbox": [],
                "availability": [],
                "__v": 0,
                "bio": "Coolestest cool person just so cool, there is no one cooler ever on Earth. Yeah!",
                "location": "Woods",
                "stateLocation": "Washington",
                "profilePictureUrl": "https://res.cloudinary.com/yestoskydiving/image/upload/v1598126251/GuideMeProfilePic/df4lzacpzyornjoyl4lj.jpg"
            },
            action: 'newPost',
            adventureId: {
                "_id": "5f40b822c2e880aacc0fee5c",
                "tags": [
                    "5f358b1dde3d0897c09a3986"
                ],
                "adventureName": "New Adventure",
                "hostId": "5f40b62fc2e880aacc0fee58",
                "description": "Very interesting adventure",
                "location": "Unknown",
                "stateLocation": "Alaska",
                "itinerary": "Itinerary here",
                "difficulty": "Easy",
                "minGroupSize": 1,
                "maxGroupSize": 1,
                "price": 50,
                "gearList": "No specialty gear needed",
                "adventureImageUrl": "https://res.cloudinary.com/yestoskydiving/image/upload/v1598076961/GuideMeAdventurePic/mvnahkvtimijnmkkj89i.jpg",
                "duration": {
                    "time": 1,
                    "unit": "hours"
                },
                "__v": 0
            },
            postImageUrl: '',
            postText: 'I am so excited about all these new adventures popping up on the West coast. Cannot wait!',
            createdAt: '8/22/2020'
        }
        convertFeedData(feedObj)

    }

    const convertFeedData = (feedObj) => {
        console.log(feedObj.createdAt)
        switch (feedObj.action) {
            case 'newUser':
                setFeed([...feed, {
                    id: feedObj._id,
                    userId: feedObj.targetId._id,
                    profilePictureUrl: feedObj.targetId.profilePictureUrl,
                    location: `${feedObj.targetId.location}, ${feedObj.targetId.stateLocation}`,
                    userName: `${feedObj.targetId.firstName} ${feedObj.targetId.lastName}`,
                    text: ` joined GuideMe! Welcome, ${feedObj.targetId.firstName}, we wish you many story worthy adventures with us!`,
                    date: feedObj.createdAt
                }])
                break;
            case 'newGuide':
                setFeed([...feed, {
                    id: feedObj._id,
                    userId: feedObj.targetId._id,
                    profilePictureUrl: feedObj.targetId.profilePictureUrl,
                    location: `${feedObj.targetId.location}, ${feedObj.targetId.stateLocation}`,
                    userName: `${feedObj.targetId.firstName} ${feedObj.targetId.lastName}`,
                    text: ` became a verified guide! Congrats, ${feedObj.targetId.firstName}, we look forward to going places with you!`,
                    date: feedObj.createdAt
                }])
                break;
            case 'newAdventure':
                setFeed([...feed, {
                    id: feedObj._id,
                    userId: feedObj.targetId._id,
                    profilePictureUrl: feedObj.targetId.profilePictureUrl,
                    location: `${feedObj.targetId.location}, ${feedObj.targetId.stateLocation}`,
                    userName: `${feedObj.targetId.firstName} ${feedObj.targetId.lastName}`,
                    text: ` published a new adventure! ${feedObj.adventureId.adventureName} sure sounds exciting!`,
                    date: feedObj.createdAt
                }])
                break;
            case 'newReview':
                console.log('newReview')
                break;
            default:
                setFeed([...feed, {
                    id: feedObj._id,
                    userId: feedObj.targetId._id,
                    profilePictureUrl: feedObj.targetId.profilePictureUrl,
                    location: `${feedObj.targetId.location}, ${feedObj.targetId.stateLocation}`,
                    userName: `${feedObj.targetId.firstName} ${feedObj.targetId.lastName}`,
                    text: `: ${feedObj.postText}`,
                    date: feedObj.createdAt
                }])
        }
    }

    const handleSubmit = async () => {
        const {data}=await API.getSessionData()
        let postObj = {
            //think of a way how to add the current user's id, maybe just from session data on the server side?
            targetId:data.id,
            action:'newPost',
            adventureId:null,
            postImageUrl:null,
            postText:post
        }
        console.log(postObj)
        API.postFeed(postObj).then(res=>console.log(res)).catch(err=>console.log(err))
        setChange(!change)
    }

    return (
        <>
            <Wrapper>
                <div className="postTextArea grid-container fluid">
                    {/* The search or host adventure form on home page */}
                    {/* <form className="grid-container fluid"> */}
                        <Gridx classes={"grid-margin-x"}>
                            <Cell size='small-8'>

                                <TextArea value={post} onChange={(e) => setPost(e.target.value)} placeholder={'Write something:'}></TextArea>
                            </Cell>
                            <Cell size='small-4'>
                                <Btn onClick={handleSubmit} classes={'button searchAdventure'} text={"Post"} />
                            </Cell>
                        </Gridx>
                    {/* </form> */}
                </div>
                <Gridx classes={'feedContainer grid-margin-y'}>

                    {feed && feed.map(item => <Post key={item.id} userId={item.userId} userName={item.userName} date={item.date} text={item.text} profilePictureUrl={item.profilePictureUrl} location={item.location} />)}
                </Gridx>
            </Wrapper>
        </>
    )
}

export default Community