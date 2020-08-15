import React, { useState } from "react";
import API from "../../util/API";
import './style.css'
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'

function UserUpdate(props) {
  // Setting our component's initial state
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  // update the initial state to provide values for
  // the controls in the form (use empty strings)
  const handleModalClose = () => {
    props.handleModalClose()
  }

  const [formObject, setFormObject] = useState({tags:[]})



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

     API.updateUser(postObj)
      .then(data => {
        alert('UserUpdate created!')
        setFormObject({ 
          firstName: '', 
          lastName: '', 
          email: '', 
          bio: '',  
          location: '', 
          tags: []  })
         handleModalClose();
      }).catch(err=> console.log(err))
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
    <div className={showHideModal} id="exampleModal1">
      <h1>Update your profile</h1>
      <p className="lead">Add new info here</p>
    <div className="grid-container fluid">
      <Gridx>
        <Cell size="">
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
            <TextArea
              onChange={handleInputChange}
              name="bio"
              placeholder="Bio:"
              value={formObject.difficulty}
            />
            <Input
              onChange={handleInputChange}
              name="tags"
              placeholder="Tags:"
              value={formObject.tags}
            />
            <FormBtn
              onClick={handleFormSubmit}>
                Save changes
                </FormBtn>
                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/>
          </form>
        </Cell>
      </Gridx>
    </div>
    </div>
  );
}


export default UserUpdate;