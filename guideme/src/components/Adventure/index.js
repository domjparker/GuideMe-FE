import React, { useEffect, useState } from "react";
import API from "../../util/API";
import { Input, TextArea, FormBtn } from "../Form";
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'



function Adventure() {
    // Setting our component's initial state
  
    // update the initial state to provide values for
    // the controls in the form (use empty strings)
  
    const [formObject, setFormObject] = useState({ adventureName: '', hostId: '', usersOnAdventure: '[]', description: '',  location: '', itinerary: '', duration: '', difficulty: '', minGroupSize: '', maxGroupSize: '', price: '', gearList: '', tags: ''})
  
  
  
    function handleInputChange(event) {
      // add code to control the components here
      setFormObject({ ...formObject, [event.target.name]: event.target.value })
    }
  
    function handleFormSubmit(event) {
      // add code here to post a new adventure to the api
      event.preventDefault();
       API.postNewAdventure(formObject)
        .then(data => {
          Adventure();
        })
    }
    
    // function deleteAdventure(id) {
      // add code here to remove a adventures using API
    //  API.deleteAdventure(id)
    //   .then(data => {
    //     loadAdventures();
    //     setFormObject({adventure: '', location: '', price: '', info: ''})
    //   })
    // }
    
    return (
      <div className="grid-container fluid">
        <Gridx>
          <Cell size="medium-6">
            
            <form>
            <Input
                onChange={handleInputChange}
                name="adventureName"
                placeholder="Adventure:"
                value={formObject.adventureName}
              />
              <Input
                onChange={handleInputChange}
                name="hostId"
                placeholder="Host"
                value={formObject.hostId}
              />
              <Input
                onChange={handleInputChange}
                name="usersOnAdventure"
                placeholder="Users"
                value={formObject.usersOnAdventure}
              />
              <Input
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
              <Input
                onChange={handleInputChange}
                name="itinerary"
                placeholder="Itinerary:"
                value={formObject.itinerary}
              />
              <Input
                onChange={handleInputChange}
                name="duration"
                placeholder="Duration:"
                value={formObject.duration}
              />
              <Input
                onChange={handleInputChange}
                name="difficulty"
                placeholder= "Difficulty:"
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
                placeholder="Gear Needed:"
                value={formObject.gearList}
              />
              <Input
                onChange={handleInputChange}
                name="tags"
                placeholder="Tags:"
                value={formObject.tags}
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Search Adventure
                </FormBtn>
            </form>
          </Cell>
        </Gridx>
      </div>
    );
  }
  
  
  export default Adventure;