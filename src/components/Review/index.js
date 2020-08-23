import React, { useState } from "react";
import API from '../../util/API'
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'

// import StarRating from '../../components/StarRating'

function Review(props) {

    let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
    const handleModalClose = () => {
        props.handleModalClose()
    }

    //progress loader state
    const [loaderVisible, setLoaderVisible] = useState(false)

    // state to control input values
    const [formObject, setFormObject] = useState({
        title: 'New Review',
        comment: ''
    })

    const [reviewObj, setReviewObj] = useState({ title: '' })

    const handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        if (name === 'name') value = value.toLowerCase()
        setReviewObj({ ...reviewObj, [name]: value })
    };
    const handleFormSubmit = event => {
        event.preventDefault();
        setLoaderVisible(true)

        API.createReview(reviewObj).then(res => console.log(res)).catch(err => console.log(err))
        //reset form to empty
        setReviewObj({ title: '' })

        //add the edited object to database
        API.createReview(reviewObj)
            .then(data => {
                setFormObject({
                    title: '',
                    comment: '',
                })
                handleModalClose();
            }).catch(err => console.log(err))
        setLoaderVisible(false)

        return (
            <div className={showHideModal} id="reviewModal1">
                <h1>Leave a review</h1>
                <p className="lead">Publish a review for the masses to enjoy. All fields are required</p>
                <div className="grid-container fluid">
                    <Gridx>
                        <Cell size="">
                            {/* <StarRating></StarRating> */}
                            <form className="star" onSubmit={handleFormSubmit}>
                                <Input
                                    value={reviewObj.title}
                                    name="title"
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Review"
                                    required
                                />
                                <TextArea
                                    onChange={handleInputChange}
                                    value={reviewObj.TextArea}
                                    name="comment"
                                    placeholder="Comment (Optional)"
                                />
                                <FormBtn
                                    onClick={handleFormSubmit}>
                                    Publish Review
                               </FormBtn>
                                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
                            </form>
                        </Cell>
                    </Gridx>
                </div>
            </div>
        );
    };    
}

export default Review
