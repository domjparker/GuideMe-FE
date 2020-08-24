import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import Gridx from '../../components/Gridx'
import moment from 'moment'
import Post from '../../components/Post'



function ViewReview(props) {
    const [review, setReview] = useState([])

    useEffect(() => {
        loadReview()
        console.log('first props', props.idArr)
    },[])

    // //make API call for review table

    const loadReview =  () => {
        console.log(props)
        console.log(props.idArr)
          props.idArr.forEach((element) => {
             getReviewElements (element)
        });
        
    }
    async function getReviewElements (element) {
        console.log("we got here")
        const { data } = await API.getReview(element)
            console.log(data)

    }

    // const convertReviewData = (viewReviewObj) => {

    //     let newObj = {
    //         date: moment(viewReviewObj.createdAt).format('LLL'),
    //         // profilePictureUrl: viewReviewObj.userId.profilePictureUrl,
    //         userId: viewReviewObj._Id,
    //         id: viewReviewObj.adventure_id,
    //         // title: adventure.adventureName,
    //         body: '',
    //         rating: '',
    //     }
    //     return newObj
    // }


    return (
        <>
            <Gridx classes={'reviewContainer grid-margin-y'}>
                <p>hello</p>
            </Gridx>
        </>
    )
}

export default ViewReview