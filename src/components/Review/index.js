import React, { useState } from "react";
import API from '../../util/API'
import { Input, TextArea, FormBtn } from "../Form";
// import StarRating from '../../components/StarRating'

function Review() {
    
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
        API.createReview(reviewObj).then(res => console.log(res)).catch(err => console.log(err))
        //reset form to empty
        setReviewObj({ title: '' })
    };
    return (
        <div>
            {/* <StarRating></StarRating> */}

            <form className="star" onSubmit={handleFormSubmit}>
                <Input
                    value={reviewObj.title}
                    name="firstName"
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
                <FormBtn children={'Submit Review'} />
            </form>
        </div>
    );
}

export default Review
