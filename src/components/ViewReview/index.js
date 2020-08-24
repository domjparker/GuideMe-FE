import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import Gridx from '../../components/Gridx'
import moment from 'moment'
import Post from '../../components/Post'



function ViewReview(props) {
    const [review, setReview] = useState([])

    useEffect(() => {
        console.log(props.idArr)
        loadReview()
    })

    //make API call for review table
    const loadReview = async () => {
         let arr = []
         props.idArr.forEach(async (element) => {
            const { data } = await API.getReview(element)
            console.log(data)
            let newObj = convertReviewData(data)
            arr.push(newObj)
        });
        setReview(arr)
        
    }

    const convertReviewData = (viewReviewObj) => {

        let newObj = {
            date: moment(viewReviewObj.createdAt).format('LLL'),
            userId: viewReviewObj.userId,
            id: viewReviewObj.adventure_id
        }
        
        return newObj
    }


    return (
        <>
            <Gridx classes={'reviewContainer grid-margin-y'}>
                {review && review.map(item => <Post key={item.id} userId={item.userId} userName={item.userName} date={item.date}/>)}
            </Gridx>
        </>
    )
}

export default ViewReview