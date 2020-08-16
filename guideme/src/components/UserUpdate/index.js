//component to update user info -- member of the Profile page
import React, { useEffect, useState } from "react";
import API from "../../util/API";
import './style.css'
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'

function UserUpdate(props) {
  //handles bodal visibility state as input from parent element
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  //handles form object data
  const [formObject, setFormObject] = useState({})
//checks for data when modal visibility setting changes
useEffect(() => {
  loadInitialData();
}, [props.show])

//populate update form with existing data of that adventure
async function loadInitialData () {
  let {data} = await API.getUserbyId()
  console.log(data)
    setFormObject({
      firstName:data.firstName,
      lastName: data.lastName,
      email: data.email,
      bio:data.bio,
      location:data.location,
      tags:data.tags? data.tags.join(", "):null
    })
}
//control input field changes
  function handleInputChange(event) {
    // add code to control the components here
    let name = event.target.name
    let value=event.target.value
    setFormObject({ ...formObject, [name]: value })
  }
//make put request to update user info
  async function handleFormSubmit(event) {
    // add code here to post a new adventure to the api
    event.preventDefault();
    let postObj = {...formObject}
    postObj.tags.lenght? postObj.tags=postObj.tags.split(', ') : postObj.tags=[]

     API.updateUser(postObj)
      .then(data => {
        //TODO:use something other than an alert here
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
              value={formObject.firstName}
            />
            <Input
              onChange={handleInputChange}
              name="lastName"
              placeholder="last name here"
              value={formObject.lastName}
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
              value={formObject.email}
            />
            <TextArea
              onChange={handleInputChange}
              name="bio"
              placeholder="Bio:"
              value={formObject.bio}
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
                {/* close modal button */}
                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/>
          </form>
        </Cell>
      </Gridx>
    </div>
    </div>
  );
}


export default UserUpdate;