//component to update user info -- member of the Profile page
import React, { useEffect, useState } from "react";
import API from "../../util/API";
import './style.css'
import { Input, TextArea, FormBtn, Dropdown } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import TagRow from '../TagRow'
import { stateLocation } from '../StateLocations'

function UserUpdate(props) {
  //handles bodal visibility state as input from parent element
  let showHideModal = props.show ? 'modal d-block' : 'modal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  //handles form object data
  const [formObject, setFormObject] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    location: '',
    stateLocation: '',
    tags: []
  })
  //checks for data when modal visibility setting changes
  useEffect(() => {
    loadInitialData();
  }, [props.show])

  //state to facilitate tags adding
  const [dropdownArr, setDropdownArr] = useState([])
  const [dropdownValue, setDropdownValue] = useState('')
  const [tagArr, setTagArr] = useState([])
  const [allTags, setAllTags] = useState([])
  useEffect(() => {
    //get all tags for tags dropDown and grab just the names of the tags
    API.getTags().then(result => {
      let newArr = result.data
      setAllTags(newArr)
      newArr = newArr.map(item => item = item.tagName)
      setDropdownArr(newArr)
    }).catch(err => console.log(err))
  }, [])

  //populate update form with existing data of that adventure
  async function loadInitialData() {
    let { data } = await API.getUserbyId()
    setFormObject({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      bio: data.bio ? data.bio : '',
      location: data.location ? data.location : '',
      tags: data.tags ? data.tags.map(tag => tag.tagName) : [],
      stateLocation: data.stateLocation ? data.stateLocation : '',
      adventureImageUrl: data.adventureImageUrl
    })
     //pre-load tags if some have already been chosen
     if (data.tags) {
      const x = data.tags.map(tag => tag.tagName)
      setTagArr(x)
    }
  }
  //control input field changes
  function handleInputChange(event) {
    // add code to control the components here
    let name = event.target.name
    let value = event.target.value
    if (name !== 'tags') {
      setFormObject({ ...formObject, [name]: value })
    } else if (tagArr.indexOf(event.target.value) < 0) {
      //if this tag is not already in the tags array, then put it there
      setTagArr([...tagArr, event.target.value])
      setDropdownValue(event.target.value)
    }
  }

  //tag handling
  const handleFilterTags = (e) => {
    let deletedTag = e.target.getAttribute('value')
    setTagArr(tagArr.filter(tag => tag !== deletedTag))
  }
  //make put request to update user info
  async function handleFormSubmit(event) {
    // add code here to post a new adventure to the api
    event.preventDefault();
    let postObj = { ...formObject }
    postObj.tags = allTags.filter(tag => tagArr.indexOf(tag.tagName) > -1).map(tag => tag._id)

    API.updateUser(postObj)
      .then(data => {
        setFormObject({
          firstName: '',
          lastName: '',
          email: '',
          bio: '',
          location: '',
          stateLocation: '',
          tags: []
        })
        props.openModal();
        handleModalClose();
      }).catch(err => console.log(err))
  }

  return (
    <div className={"overlay " + showHideModal}>
      <div className={"modalBody"} id="exampleModal1">
        <h1>Update profile</h1>
        <div className="grid-container fluid">
          <Gridx>
            <Cell size="">
              <form>
                <Gridx>
                 
                  <Cell size={'medium-6'}>
                    <label for="firstName" >First Name:</label>
                    <Input
                      onChange={handleInputChange}
                      name="firstName"
                      placeholder="first name here"
                      value={formObject.firstName}
                    />
                  </Cell>
                  <Cell size={'medium-6'}>
                    <label for="lastName" >Last Name:</label>
                    <Input
                      onChange={handleInputChange}
                      name="lastName"
                      placeholder="last name here"
                      value={formObject.lastName}
                    />
                  </Cell>
                  <Cell size={'small-12'}>
                  <label for="email" >Email Address:</label>
                <Input
                  onChange={handleInputChange}
                  name="email"
                  placeholder="email"
                  value={formObject.email}
                />
                  </Cell>
                </Gridx>
                <Gridx>
                  <Cell size={'medium-6'}>
                    <label for="location" >Your Location:</label>
                    <Input
                      onChange={handleInputChange}
                      name="location"
                      placeholder="City"
                      value={formObject.location}
                    />
                  </Cell>
                  <Cell size={'medium-6'}>
                  <label for="stateLocation" >Your State:</label>
                    <Dropdown
                      intro={'State'}
                      onChange={handleInputChange}
                      name="stateLocation"
                      options={stateLocation}
                      value={formObject.stateLocation}
                    />
                  </Cell>
                </Gridx>
                
                <label for="bio" >Bio:</label>
                <TextArea
                  onChange={handleInputChange}
                  name="bio"
                  placeholder="Bio"
                  value={formObject.bio}
                />
                <label for="tags" >Tags:</label>
                <TagRow edit={true} tags={tagArr} filterTags={handleFilterTags} />
                <Dropdown
                  intro={'Select your skills'}
                  onChange={handleInputChange}
                  name="tags"
                  options={dropdownArr}
                  value={dropdownValue}
                />
                <FormBtn
                  onClick={handleFormSubmit}>
                  Save changes
                </FormBtn>
                {/* close modal button */}
                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
              </form>
            </Cell>
          </Gridx>
        </div>
      </div>
    </div>
  );
}


export default UserUpdate;