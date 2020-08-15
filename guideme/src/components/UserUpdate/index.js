import React, { useState } from "react";
import API from "../../util/API";
import { Input, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'


function UserUpdate() {
  // Setting our component's initial state

  // update the initial state to provide values for
  // the controls in the form (use empty strings)

  const [formObject, setFormObject] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    bio: '',  
    location: '', 
    tags: [] 
    })



  function handleInputChange(event) {
    // add code to control the components here
    let name = event.target.name
    let value=event.target.value
    setFormObject({ ...formObject, [name]: value })
  }

  async function handleFormSubmit(event) {
    // add code here to post a new adventure to the api
    event.preventDefault();
    let postObj = {...formObject}
    if (postObj.tags.lenght) {postObj.tags=postObj.tags.split(', ')}
    console.log(postObj)

    //TODO: change to update user
    //  API.postNewAdventure(postObj)
    //   .then(data => {
    //     alert('UserUpdate created!')
    //     setFormObject({ 
    //       firstName: '', 
    //       lastName: '', 
    //       email: '', 
    //       bio: '',  
    //       location: '', 
    //       tags: []  })
    //   }).catch(err=> console.log(err))
  }

  // function deleteAdventure(id) {
  // add code here to remove a adventures using API
  //  API.deleteAdventure(id)
  //   .then(data => {
  //     loadAdventures();
  //     setFormObject({adventureName: '', hostId: '', usersOnAdventure: '[]', description: '', location: '', itinerary: '', duration: '', difficulty: '', minGroupSize: '', maxGroupSize: '', price: '', gearList: '', tags: ''})
  //   })
  // }

  return (
    <div className="grid-container fluid">
      <Gridx>
        <Cell size="medium-6">
          <form>
            <Input
              onChange={handleInputChange}
              name="firstName"
              placeholder="first name here"
              value={formObject.adventureName}
            />
            <Input
              onChange={handleInputChange}
              name="lastName"
              placeholder="last name here"
              value={formObject.description}
            />
            <Input
              onChange={handleInputChange}
              name="location"
              placeholder="Location:"
              value={formObject.location}
            />
            <Input
              onChange={handleInputChange}
              name="email"
              placeholder="email"
              value={formObject.itinerary}
            />
            {/* <Input
              onChange={handleInputChange}
              name="duration"
              placeholder="Duration:"
              value={formObject.duration}
            /> */}
            <Input
              onChange={handleInputChange}
              name="bio"
              placeholder="Difficulty:"
              value={formObject.difficulty}
            />
            <Input
              onChange={handleInputChange}
              name="tags"
              placeholder="Tags:"
              value={formObject.tags}
            />
            <FormBtn
              disabled={!(formObject.adventureName && formObject.description && formObject.location && formObject.itinerary)}
              onClick={handleFormSubmit}>
                Save changes
                </FormBtn>
          </form>
        </Cell>
      </Gridx>
    </div>
  );
}


export default UserUpdate;