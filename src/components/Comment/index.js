import React, { useState } from "react";
import API from '../../util/API'
import { Input, TextArea, FormBtn } from "../Form";

function Comment() {
    
    const [starObj, setStarObj] = useState({ firstName: '', lastName: '' })

    const handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        if (name === 'name') value = value.toLowerCase()
        setStarObj({ ...starObj, [name]: value })
    };
    const handleFormSubmit = event => {
        event.preventDefault();
        API.postNewUser(starObj).then(res => console.log(res)).catch(err => console.log(err))
        //reset form to empty
        setStarObj({ firstName: '', lastName: '' })
    };
    return (
        <div>
            <form className="star" onSubmit={handleFormSubmit}>
                <Input
                    value={starObj.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="First Name"
                    required
                />
                <Input
                    value={starObj.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Last Name"
                    required
                />
                <TextArea
                    onChange={handleInputChange}
                    value={starObj.TextArea}
                    name="comment"
                    placeholder="Comment (Optional)"
                />
                <FormBtn children={'Submit'} />
            </form>
        </div>
    );
}

export default Comment
