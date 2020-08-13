import React, { useEffect, useState } from "react";
import API from "../util/API";
import DeleteBtn from "../DeleteBtn";
import { Input, TextArea, FormBtn } from "../Form";


function Adventure() {
    // Setting our component's initial state
    const [adventures, setAdventures] = useState([])
  
    // update the initial state to provide values for
    // the controls in the form (use empty strings)
  
    const [formObject, setFormObject] = useState({ adventure: '', location: '', price: '', info: ''})
  
    // Load all adventure and store them with setAdventures
    useEffect(() => {
      loadAdventures()
    }, [])
  
    // Loads all adventures and sets them to adventures
    function loadAdventure() {
      API.getAdventures()
        .then(res =>
          setAdventures(res.data)
        )
        .catch(err => console.log(err));
    };
  
    function handleInputChange(event) {
      // add code to control the components here
      setFormObject({ ...formObject, [event.target.name]: event.target.value })
    }
  
    function handleFormSubmit(event) {
      // add code here to post a new adventure to the api
      event.preventDefault();
       API.saveAdventure(formObject)
        .then(data => {
          loadAdventures();
        })
  
  
    }
    // function handleFormSubmit(event) {
    //   add code here to post by location to the api?????????????
    //   event.preventDefault();
    //    API.saveAdventure(formObject) //need location API
    //     .then(data => {
    //       loadAdventures();
    //     })
  
  
    // }
  
    function deleteAdventure(id) {
      // add code here to remove a adventures using API
     API.deleteAdventure(id)
      .then(data => {
        loadAdventures();
        setFormObject({adventure: '', location: '', price: '', info: ''})
      })
    }
    // function deleteLocation(id) {
    //   add code here to remove by locations using API ??????????  NEED LOCATION API
    //  API.deleteAdventure(id)
    //   .then(data => {
    //     loadAdventures();
    //     setFormObject({adventure: '', location: '', price: ''})
    //   })
    // }
  
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            {/* <Jumbotron>
              <h1>Adventure Info</h1>
            </Jumbotron> */}
            <form>
              {/* inputs should be updated to be controlled inputs */}
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
          </Col>
          <Col size="md-6 sm-12">
            {/* <Jumbotron>
              <h1>My Adventures</h1>
            </Jumbotron> */}
            {adventure.length ? (
              <List>
                {adventures.map(adventure => {
                  return (
                    <ListItem key={adventure._id}>
                      <a href={"../../adventure" + adventure._id}>
                        <strong>
                          {adventure.adventure} by {adventure.location}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => deleteAdventure(adventure._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
  
  
  export default Adventure;