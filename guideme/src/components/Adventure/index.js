import React, { useState } from "react";
import API from "../../util/API";
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'


function Adventure(props) {
  // Setting our component's initial state
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  // update the initial state to provide values for
  // the controls in the form (use empty strings)
  const handleModalClose = () => {
    showHideModal = 'reveal d-none'
  }

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
    tags: '' })



  function handleInputChange(event) {
    // add code to control the components here
    let name = event.target.name
    let value
    if (name==="minGroupSize" || name==="maxGroupSize" || name==="price" ){
      value = parseInt(event.target.value)
    } else {
      value=event.target.value
    }
    setFormObject({ ...formObject, [name]: value })
  }

  async function handleFormSubmit(event) {
    // add code here to post a new adventure to the api
    event.preventDefault();
    let postObj = {...formObject}
    if (postObj.tags.lenght) {postObj.tags=postObj.tags.split(', ')}
    postObj.tags=[]
    const {data} = await API.getSessionData()
    postObj.hostId = data.id
    console.log(postObj)
    postObj.duration= {time: 3, unit: 'hours'}
    console.log(postObj)
    API.postNewAdventure(postObj)
      .then(data => {
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
          tags: '' })
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
            <FormBtn
              disabled={!(formObject.adventureName && formObject.description && formObject.location && formObject.itinerary)}
              onClick={handleFormSubmit}>
                Publish Adventure
                </FormBtn>
                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/>
          </form>
        </Cell>
      </Gridx>
    </div>
    </div>
  );
}


export default Adventure;