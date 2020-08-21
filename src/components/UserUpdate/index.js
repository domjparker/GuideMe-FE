//component to update user info -- member of the Profile page
import React, { useEffect, useState } from "react";
import API from "../../util/API";
import './style.css'
import { Input, TextArea, FormBtn, Dropdown } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import TagRow from '../TagRow'

function UserUpdate(props) {
  //handles bodal visibility state as input from parent element
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  //handles form object data
  const [formObject, setFormObject] = useState({  firstName: '', 
  lastName: '', 
  email: '', 
  bio: '',  
  location: '', 
  tags: [] })
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
  API.getTags().then(result=>{
    let newArr = result.data
    setAllTags(newArr)
    newArr=newArr.map(item=>item=item.tagName)
    setDropdownArr(newArr)
  }).catch(err=>console.log(err))
}, [])

//populate update form with existing data of that adventure
async function loadInitialData () {
  let {data} = await API.getUserbyId()
    setFormObject({
      firstName:data.firstName,
      lastName: data.lastName,
      email: data.email,
      bio:data.bio? data.bio:'',
      location:data.location? data.location:'',
      tags:data.tags? data.tags.map(tag=>tag.tagName) :[]
    })
}
//control input field changes
  function handleInputChange(event) {
    // add code to control the components here
    let name = event.target.name
    let value=event.target.value
    if (name !== 'tags') {
      setFormObject({ ...formObject, [name]: value })
    } else if (tagArr.indexOf(event.target.value)<0) {
      //if this tag is not already in the tags array, then put it there
      setTagArr([...tagArr, event.target.value])
    }
  }

  //tag handling
  const handleFilterTags = (e) => {
    let deletedTag= e.target.getAttribute('value')
    setTagArr(tagArr.filter(tag=> tag !== deletedTag))
  }
//make put request to update user info
  async function handleFormSubmit(event) {
    // add code here to post a new adventure to the api
    event.preventDefault();
    let postObj = {...formObject}
    postObj.tags = allTags.filter(tag => tagArr.indexOf(tag.tagName)>-1 ).map(tag=>tag._id)
    console.log(postObj)
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
            <TagRow edit={true} tags={tagArr} filterTags={handleFilterTags}/>
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
                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/>
          </form>
        </Cell>
      </Gridx>
    </div>
    </div>
  );
}


export default UserUpdate;