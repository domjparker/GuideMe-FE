import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import Gridx from '../../components/Gridx'
import moment from 'moment'
import Post from '../../components/Post'
import Cell from '../Cell'
import './style.css'



function ViewReview(props) {
    const [review, setReview] = useState([])

    
    useEffect(() => {
        loadReview()
    },[props])

    // //make API call for review table
    let counter = 0
    let newArr = []
    const loadReview =  async () => {
        
        let element=  props.idArr[counter]
        let data = await getReviewElements(element)
        console.log(data)
        if (data[0]) newArr.push(convertReviewData(data[0]))
           
        if (counter < props.idArr.length-1 ) {
            counter++
            return loadReview()
        } else {
           return setReview(newArr )    
        }
        
    }

    async function getReviewElements (element) {
        const { data } = await API.getReview(element)
        return data
    }

    const convertReviewData = (viewReviewObj) => {

        let newObj = {
            date: viewReviewObj.rating + '/5',
            profilePictureUrl: viewReviewObj.adventureId.adventureImageUrl,
            userId: viewReviewObj.adventureId.hostId,
            id: viewReviewObj._id,
            userName: viewReviewObj.title,
            text: ': '+ viewReviewObj.body,
            
        }
        if (viewReviewObj.adventureId.stateLocation) {
            newObj.location = `${viewReviewObj.adventureId.location}, ${viewReviewObj.adventureId.stateLocation}` 
            } else {
            newObj.location = '';  
            }
        return newObj
    }


    return (
        <>
            <Gridx classes={'reviewContainer grid-margin-y'}>
                <Cell size={'small-12'}>
                <h3 className="reviewTitle">{'Reviews about ' + props.targetUser}</h3>
                </Cell>
    {review ? review.map(item=> <Post key={item.id} userId={item.userId} userName={item.userName} date={item.date} text={item.text} profilePictureUrl={item.profilePictureUrl} location={item.location} postImageUrl={item.postImageUrl}/>): <h2>No reviews to display</h2>}
            </Gridx>
        </>
    )
}

export default ViewReview