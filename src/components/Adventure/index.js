//New adventure create form
import React, { useState } from "react";
import API from "../../util/API";
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import './style.css'
import ImageForm from '../ImageForm'


function Adventure(props) {
  // this state dictates whether form is visible, the values are passed in fromn parent element
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  //state to control input values
  const [formObject, setFormObject] = useState({
    adventureName: '',
    hostId: '',
    description: '',
    location: '',
    adventureImageUrl: '',
    itinerary: '',
    difficulty: '',
    minGroupSize: '',
    maxGroupSize: '',
    price: '',
    gearList: '',
    tags: [],
    adventureImageUrl: ''
  })

  // state to facilitate adventure image upload
  const [modalAdventureImage, setModalAdventureImage] = useState(false)
  const [typeOfUploadImage, setTypeOfUploadImage] = useState("")
  const [modalTitle, setModalTitle] = useState('')

  //control form input values
  function handleInputChange(event) {
    let name = event.target.name
    let value
    //some fields must be numbers for db, so change that here
    if (name === "minGroupSize" || name === "maxGroupSize" || name === "price") {
      value = parseInt(event.target.value)
    } else {
      value = event.target.value
    }
    //set new state with input
    setFormObject({ ...formObject, [name]: value })
  }
const handleModalImageClose = ()=>{
setModalAdventureImage(false)

}
const handleUrlUpdate= data =>{
  setFormObject({...formObject,adventureImageUrl:data})
}
  // when Add Adventure Image is clicked
  const handleAdventurePicClick = (e) => {
    e.preventDefault()
    console.log("adventure pick click was clicked")
    setModalAdventureImage(true)
    setTypeOfUploadImage("adventurePic")
    setModalTitle("Adventure Image") 
  }


  //handle form submit function
  async function handleFormSubmit(event) {

    event.preventDefault();
    //make a copy of the state object for manipulation
    let postObj = { ...formObject }
    //if tags were entered then turn them into array
    //TODO: Tags: you can only pick from a pre-defined list of tags!!! And here we just include the ids of the chosen ones
    // if (postObj.tags.length) {postObj.tags=postObj.tags.split(', ')}
    //get user id from session data to add hostID to the new adventure
    const { data } = await API.getSessionData()
    postObj.hostId = data.id

    //TODO:change the input field to increment adn drop-down and then incorporate here to the post object in the proper format
    postObj.duration = { time: 3, unit: 'hours' }
    console.log(postObj)
    //add the edited object to database
    API.postNewAdventure(postObj)
      .then(data => {
        //TODO: change this from alert to smth else
        alert('Adventure created!')
        setFormObject({
          adventureName: '',
          hostId: '',
          description: '',
          location: '',
          itinerary: '',
          difficulty: '',
          minGroupSize: '',
          maxGroupSize: '',
          price: '',
          gearList: '',
          tags: [],
          adventureImageUrl: ''
        })
        handleModalClose();
      }).catch(err => console.log(err))
  }

  return (
    <div className={showHideModal} id="adventureModal1">
      <h1>Create an Adventure</h1>
      <p className="lead">publish an adventure for the masses to enjoy</p>
      <div className="grid-container fluid">
        <Gridx>
          <Cell size="">
            <form>
              <Input
                onChange={handleInputChange}
                name="adventureName"
                placeholder="Adventure:"
                value={formObject.adventureName}
              />
              <TextArea
                onChange={handleInputChange}
                name="description"
                placeholder="Description:"
                value={formObject.description}
              />
              <Input
                onChange={handleInputChange}
                name="location"
                placeholder="Location:"
                value={formObject.location}
              />
              <TextArea
                onChange={handleInputChange}
                name="itinerary"
                placeholder="Itinerary:"
                value={formObject.itinerary}
              />
              {/* TODO: make this an increment and drop-down combo to only get the right data */}
              {/* <Input
              onChange={handleInputChange}
              name="duration"
              placeholder="Duration:"
              value={formObject.duration}
            /> */}
              <Input
                onChange={handleInputChange}
                name="difficulty"
                placeholder="Difficulty:"
                value={formObject.difficulty}
              />
              <Input
                onChange={handleInputChange}
                name="minGroupSize"
                placeholder="Min. Group Size:"
                value={formObject.minGroupSize}
              />
              <Input
                onChange={handleInputChange}
                name="maxGroupSize"
                placeholder="Max. Group Size:"
                value={formObject.maxGroupSize}
              />
              <Input
                onChange={handleInputChange}
                name="price"
                placeholder="Price:"
                value={formObject.price}
              />
              <Input
                onChange={handleInputChange}
                name="gearList"
                placeholder="Gear Need:"
                value={formObject.gearList}
              />
              <Input
                onChange={handleInputChange}
                name="tags"
                placeholder="Tags:"
                value={formObject.tags}
              />
              <Btn
                className={"button small add-adventure-image"}
                onClick={handleAdventurePicClick}
                name="Upload Adventure Image"
                type={"adventureImagePic"}
                text={"Add Adventure Image"}
              />
              <FormBtn
                disabled={!(formObject.adventureName && formObject.description && formObject.location && formObject.itinerary)}
                onClick={handleFormSubmit}>
                Publish Adventure
                </FormBtn>
              {/* close modal button */}
              <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
            </form>
          </Cell>
        </Gridx>
      </div>

      {/* Upload Adventure Image Modal lives here */}
      <ImageForm show={modalAdventureImage} handleModalClose={handleModalImageClose} urlUpdate={handleUrlUpdate} type={typeOfUploadImage} modalTitle={modalTitle} />

    </div>
  );
}


export default Adventure;