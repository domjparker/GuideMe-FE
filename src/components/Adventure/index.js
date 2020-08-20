// * New adventure create form
import React, { useState } from "react";
import API from "../../util/API";
import axios from 'axios';
import { Input, TextArea, FormBtn, Dropdown, NumberInput } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import './style.css'

function Adventure(props) {
  // this state dictates whether form is visible, the values are passed in from parent element
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  // *
  const [image, setImage] = useState('');
  const onSubmit = e => {
    setImage(e.target.files[0]);
  };

  //state to control input values
  const [formObject, setFormObject] = useState({
    adventureName: 'New Adventure',
    hostId: '',
    description: 'Very interesting adventure',
    location: 'Unknown',
    itinerary: 'Itinerary here',
    time: 1,
    unit: 'hours',
    difficulty: 'Easy',
    minGroupSize: 1,
    maxGroupSize: 1,
    price: 50,
    gearList: 'No specialty gear needed',
    tags: [],
    adventureImageUrl: ''
  })

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

  //===========handle incrementing for number input components=================
  const handleGroupDec = (e) => {
    let name = e.target.name
    let num = formObject[name]
    if (num > 1) num--
    setFormObject({ ...formObject, [name]: num })
  }

  const handleGroupInc = (e) => {
    let name = e.target.name
    let num = formObject[name]
    if (num < 30) num++
    setFormObject({ ...formObject, [name]: num })
  }

  const handlePriceDec = (e) => {
    let name = e.target.name
    let num = formObject[name]
    if (num > 9) num -= 10
    setFormObject({ ...formObject, [name]: num })
  }

  const handlePriceInc = (e) => {
    let name = e.target.name
    let num = formObject[name]
    num += 10
    setFormObject({ ...formObject, [name]: num })
  }
  //===========END handle incrementing for number input components=================

  //handle form submit function
  async function handleFormSubmit(event) {
    event.preventDefault();
    // base url for Cloudinary query and preset needed to upload images
    const url = 'https://api.cloudinary.com/v1_1/yestoskydiving/image/upload';
    const preset = 'guidemeadventurepic';
    // create new FormData to hold image data
    const formData = new FormData();
    console.log("new FormData initiated")
    // the intended image and the preset are appended to the FormData object
    formData.append('file', image);
    formData.append('upload_preset', preset);
    try {
      // axios call is made to cloudinary url in order to load the FormData object, and awaited response is assigned to variable 'res'
      const res = await axios.post(url, formData);
      console.log("axios calls has been made to cloudinary")
      // from the response received back, the secure url for the image is assigned to variable imageUrl
      const imageUrl = res.data.secure_url;
      console.log("result from cloudinary = " + imageUrl)
      setFormObject({ ...formObject, adventureImageUrl: imageUrl })
      //make a copy of the state object for manipulation and add the imageUrl
      let postObj = { ...formObject, adventureImageUrl: imageUrl }

      //if tags were entered then turn them into array
      //TODO: Tags: you can only pick from a pre-defined list of tags!!! And here we just include the ids of the chosen ones
      // if (postObj.tags.length) {postObj.tags=postObj.tags.split(', ')}
      //get user id from session data to add hostID to the new adventure

      const { data } = await API.getSessionData()
      postObj.hostId = data.id
      //TODO:change the input field to increment and drop-down and then incorporate here to the post object in the proper format
      postObj.duration = { time: formObject.time, unit: formObject.unit }
      if (postObj.maxGroupSize < postObj.minGroupSize) postObj.maxGroupSize = postObj.minGroupSize
      console.log('postObj.adventureImageUrl = ' + postObj.adventureImageUrl)
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
            time: 1,
            unit: 'hours',
            difficulty: 'Easy',
            minGroupSize: 1,
            maxGroupSize: 2,
            price: 50,
            gearList: '',
            tags: [],
            adventureImageUrl: ''
          })
          handleModalClose();
        }).catch(err => console.log(err))
    } catch (err) {
      console.error(err);
    }
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
              <label for="time" >Duration info</label>
              <NumberInput
                decrement={handleGroupDec}
                increment={handleGroupInc}
                name="time"
                value={formObject.time}
              />
              <Dropdown
                onChange={handleInputChange}
                name="unit"
                value={formObject.unit}
                options={["hours", "days", "weeks", "months", "eternity"]}
              />
              <label for="difficulty" >Difficulty</label>
              <Dropdown
                onChange={handleInputChange}
                name="difficulty"
                value={formObject.difficulty}
                options={["Easy", "Intermediate", "Hard", "Extreme", "Death wish"]}
              />
              <label for="minGroupSize" >Min Group Size</label>
              <NumberInput
                decrement={handleGroupDec}
                increment={handleGroupInc}
                name="minGroupSize"
                placeholder="Min. Group Size:"
                value={formObject.minGroupSize}
              />
              <label for="maxGroupSize" >Max Group Size</label>
              <NumberInput
                decrement={handleGroupDec}
                increment={handleGroupInc}
                name="maxGroupSize"
                value={Math.max(formObject.maxGroupSize, formObject.minGroupSize)}
              />
              <label for="price" >Price in $</label>
              <NumberInput
                decrement={handlePriceDec}
                increment={handlePriceInc}
                name="price"
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
              <Input
                onChange={onSubmit}
                classes={"button adventure-image-upload"}
                name={"image"}
                type={"file"}
                text={"Upload Image"}
              />
              <FormBtn
                disabled={!(formObject.adventureName && formObject.description && formObject.location && formObject.itinerary && image)}
                onClick={handleFormSubmit}>
                Publish Adventure
                </FormBtn>
              {/* close modal button */}
              <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
            </form>
          </Cell>
        </Gridx>
      </div>
    </div>
  );
}


export default Adventure