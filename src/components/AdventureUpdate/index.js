//update existing adventure details
import React, {useEffect, useState } from "react";
import API from "../../util/API";
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import './style.css'


function AdventureUpdate(props) {
// modal show hide controls as passed in from parent
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  //set initial state of the form Obje.
  const [formObject, setFormObject] = useState({})
  //checks for data when modal visibility setting changes
  useEffect(() => {
    loadInitialData();
  }, [props.show])

  //populate update form with existing data of that adventure
    async function loadInitialData () {
      let {data} = await API.getAdventurebyId(props.id)
        setFormObject({
          adventureName:data.adventureName,
          description: data.description,
          location: data.location,
          itinerary:data.itinerary,
          difficulty:data.difficulty,
          minGroupSize:data.minGroupSize,
          maxGroupSize:data.maxGroupSize,
          price:data.price,
          gearList:data.gearList,
          tags:data.tags? data.tags.map(tag=>tag.tagName).join(", "):[]
        })
    }

    //input field value controls
    function handleInputChange(event) {

    let name = event.target.name
    let value
    //some db fields need to be numbers
    if (name==="minGroupSize" || name==="maxGroupSize" || name==="price" ){
      value = parseInt(event.target.value)
    } else {
      value=event.target.value
    }
    setFormObject({ ...formObject, [name]: value })
  }

  async function handleFormSubmit(event) {

    event.preventDefault();
    //make copy of state object to edit before post request
    let postObj = {...formObject}
    //TODO:update tags somehow better, so you can delete individual ones and add others etc
    //TODO: Tags: you can only pick froma pre-defined list of tags!!! And here we just include the ids of the chosen ones
    // if (postObj.tags.lenght) {postObj.tags=postObj.tags.split(', ')}
    postObj.tags=[]
    //TODO:need to set up duration updating in a way similar to create adventure, where we have the incrementing and the drop-down
    API.updateAdventure(postObj, props.id)
      .then(data => {
        //TODO: make this something other than an alert
        alert('Adventure updated!')
        setFormObject({ 
          adventureName: '', 
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
      <h1>Update your Adventure</h1>
      <p className="lead">You can update features here</p>
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
            {/* TODO:make this field more precise with incrementing and dropdown fields
            <Input
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
            <FormBtn
              onClick={handleFormSubmit}>
                Update Adventure
                </FormBtn>
                {/* close modal */}
                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/>
          </form>
        </Cell>
      </Gridx>
    </div>
    </div>
  );
}


export default AdventureUpdate;