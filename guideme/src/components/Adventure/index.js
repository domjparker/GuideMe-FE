import React, { useEffect, useState } from "react";
import API from "../../util/API";
import { Input, TextArea, FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'


function Adventure() {
    // Setting our component's initial state
  
    // update the initial state to provide values for
    // the controls in the form (use empty strings)
  
    const [formObject, setFormObject] = useState({ adventure: '', location: '', price: '', info: ''})
  
  
  
    function handleInputChange(event) {
      // add code to control the components here
      setFormObject({ ...formObject, [event.target.name]: event.target.value })
    }
  
    function handleFormSubmit(event) {
      // add code here to post a new adventure to the api
      event.preventDefault();
       API.postNewAdventure(formObject)
        .then(data => {
          // getAllAdventures();
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
                name="adventure"
                placeholder="Keyword (required)"
                value={formObject.adventure}
              />
              <Input
                onChange={handleInputChange}
                name="location"
                placeholder="Location (required)"
                value={formObject.location}
              />
              <Input
                onChange={handleInputChange}
                name="price"
                placeholder="Price:"
                value={formObject.price}
              />
              <TextArea name="info" placeholder="Additional Information (Optional)" />
  
              
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