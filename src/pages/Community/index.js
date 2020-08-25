import React, { useEffect, useState } from 'react'
import moment from 'moment'
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

        const {data}= await API.getFeed()
        console.log(data)
        let feedArr=[...data]
        let arr=[]
        
        feedArr.forEach(item=>{
            let newObj = convertFeedData(item)
            console.log("Last object", newObj)
            arr.push(newObj)
            console.log('feed so far', arr)
        })

        setFeed(arr)
    }

    const convertFeedData = (feedObj) => {
        
        let newObj={
            userName: `${feedObj.targetId.firstName} ${feedObj.targetId.lastName}`,
            date: moment(feedObj.createdAt).format('LLL'),
            profilePictureUrl: feedObj.targetId.profilePictureUrl,
            userId: feedObj.targetId._id,
            id: feedObj._id
            // postText: feedObj.postText
        }
        if (feedObj.targetId.stateLocation) {
        newObj.location = `${feedObj.targetId.location}, ${feedObj.targetId.stateLocation}` 
        } else {
        newObj.location = '';  
        }
        if (feedObj.postImageUrl) {
            newObj.postImageUrl = `${feedObj.postImageUrl}`
        } 
        switch (feedObj.action) {
            case 'newUser':
                    newObj.text= ` joined GuideMe! Welcome, ${feedObj.targetId.firstName}, we wish you many story-worthy adventures with us!`
                break;
            case 'newGuide':
                newObj.text= ` became a verified guide! Congrats, ${feedObj.targetId.firstName}, we look forward to going places with you!`
                break;
            case 'newAdventure':
                    newObj.text= ` published a new adventure! ${feedObj.adventureId.adventureName} sure sounds exciting!` 
                break;
            case 'newReview':
                 newObj.text= ` just left a review about ${feedObj.adventureId.adventureName}! -- "${feedObj.postText}."` 
                break;
            default:
                    newObj.text= `: ${feedObj.postText}`
                
        }
        return newObj
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
        setPost('')
        API.postFeed(postObj).then(res=>{
            console.log(res)
            setChange(!change)
        }).catch(err=>console.log(err))
        
    }

    return (
        <>
            <Wrapper>
                <div className="postTextArea grid-container fluid">
                    {/* The search or host adventure form on home page */}
                    
                        <Gridx classes={"grid-margin-x"}>
                            <Cell size='small-12 medium-8'>

                                <TextArea value={post} onChange={(e) => setPost(e.target.value)} placeholder={'Write something:'}></TextArea>
                            </Cell>
                            <Cell size='small-12 medium-4'>
                                <Btn onClick={handleSubmit} classes={'button searchAdventure'} text={"Post"} />
                            </Cell>
                        </Gridx>
                    
                </div>
                <Gridx classes={'feedContainer grid-margin-y'}>

                    {feed && feed.map(item => <Post key={item.id} userId={item.userId} userName={item.userName} date={item.date} text={item.text} profilePictureUrl={item.profilePictureUrl} location={item.location} postImageUrl={item.postImageUrl}/>)}
                </Gridx>
            </Wrapper>
        </>
    )
}

export default Community