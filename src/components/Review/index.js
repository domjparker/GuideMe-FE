import React, { useState, useEffect } from "react";
import API from '../../util/API'
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'


function Review(props) {

    let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
    const handleModalClose = () => {
        props.handleModalClose()
    }

    

    // state to control input values
    const [reviewObj, setReviewObj] = useState({
        title: 'New Review',
        body: '',
        rating: 3,
       
    })
    useEffect(()=>{
    setReviewObj({...reviewObj, adventureId:props.id})
    },[props.show])



    const handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        setReviewObj({ ...reviewObj, [name]: value })
    };
    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(props.id)
        console.log (reviewObj)

        //add the edited object to database
        API.createReview(reviewObj)
            .then(data => {
                handleModalClose();
            }).catch(err => console.log(err))


    };
    return (
        <div className={showHideModal} id="reviewModal1">
            <h1>Leave a review</h1>
            <p className="lead">Publish a review for the masses to enjoy. All fields are required</p>
            <div className="grid-container fluid">
                <Gridx>
                    <Cell size="">
                        <form className="star" onSubmit={handleFormSubmit}>
                            <Input
                                value={reviewObj.title}
                                name="title"
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Review"
                                required
                            />
                            <Input
                                value={reviewObj.rating}
                                name="rating"
                                onChange={handleInputChange}
                                type="number"
                                placeholder="Rating"
                                required
                            />

                            <TextArea
                                onChange={handleInputChange}
                                value={reviewObj.TextArea}
                                name="body"
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
}
export default Review
