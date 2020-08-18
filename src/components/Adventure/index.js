//New adventure create form
import React, { useState } from "react";
import API from "../../util/API";
import { Input, TextArea, FormBtn, Dropdown, NumberInput } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import './style.css'


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
    itinerary: '',  
    difficulty: '', 
    minGroupSize: '', 
    maxGroupSize: '', 
    price: '', 
    gearList: '', 
    tags: [] })


    //control form input values
  function handleInputChange(event) {
    let name = event.target.name
    let value
    //some fields must be numbers for db, so change that here
    if (name==="minGroupSize" || name==="maxGroupSize" || name==="price" ){
      value = parseInt(event.target.value)
    } else {
      value=event.target.value
    }
    //set new state with input
    setFormObject({ ...formObject, [name]: value })
  }

  //handle form submit function
  async function handleFormSubmit(event) {

    event.preventDefault();
    //make a copy of the state object for manipulation
    let postObj = {...formObject}
    //if tags were entered then turn them into array
    //TODO: Tags: you can only pick froma pre-defined list of tags!!! And here we just include the ids of the chosen ones
    // if (postObj.tags.lenght) {postObj.tags=postObj.tags.split(', ')}
    //get user id from session data to add hostID to the new adventure
    const {data} = await API.getSessionData()
    postObj.hostId = data.id

    //TODO:change the input field to increment adn drop-down and then incorporate here to the post object in the proper format
    postObj.duration= {time: 3, unit: 'hours'}
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
          tags: [] })
          handleModalClose();
      }).catch(err=> console.log(err))
  }

  return (
    <div className={showHideModal} id="adventureModal1">
      <h1>Create an Adventure</h1>
      <p className="lead">publish an adventrue for the masses to enjoy</p>
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
            <Dropdown
              onChange={handleInputChange}
              name="difficulty"
              value={formObject.difficulty}
              options={["Easy", "Intermediate", "Hard", "Extreme", "Death wish"]}
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
            <FormBtn
              disabled={!(formObject.adventureName && formObject.description && formObject.location && formObject.itinerary)}
              onClick={handleFormSubmit}>
                Publish Adventure
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


export default Adventure;