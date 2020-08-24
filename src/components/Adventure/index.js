//New adventure create form
import React, { useState, useEffect } from "react";
import API from "../../util/API";
import axios from 'axios';
import { Input, TextArea, FormBtn, Dropdown, NumberInput } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import './style.css'
import TagRow from '../TagRow'
import { stateLocation } from '../StateLocations'
import Loader from 'react-loader-spinner'


function Adventure(props) {
  // this state dictates whether form is visible, the values are passed in from parent element
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  // state to control
  const [image, setImage] = useState('');
  const onSubmit = e => {
    setImage(e.target.files[0]);
  };
  //progress loader state
  const [loaderVisible, setLoaderVisible] = useState(false)

  // state to control input values
  const [formObject, setFormObject] = useState({
    adventureName: 'New Adventure', 
    hostId: '', 
    description: 'Very interesting adventure',
    location: 'Unknown',
    stateLocation: 'Washington',
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
    if (name !== 'tags') {

      setFormObject({ ...formObject, [name]: value })
    } else if (tagArr.indexOf(event.target.value) < 0) {
      //if this tag is not already in the tags array, then put it there
      setDropdownValue(event.target.value)
      setTagArr([...tagArr, event.target.value])
    }
  }
  //tag handling
  const handleFilterTags = (e) => {
    let deletedTag = e.target.getAttribute('value')
    setTagArr(tagArr.filter(tag => tag !== deletedTag))
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
    setLoaderVisible(true)
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


      //get user id from session data to add hostID to the new adventure
      const { data } = await API.getSessionData()
      postObj.hostId = data.id
      //set duration info in a format that is needed for database
      postObj.duration = { time: formObject.time, unit: formObject.unit }
      //logic check for group sizing
      if (postObj.maxGroupSize < postObj.minGroupSize) postObj.maxGroupSize = postObj.minGroupSize
      //handle tags
      postObj.tags = allTags.filter(tag => tagArr.indexOf(tag.tagName) > -1).map(tag => tag._id)
      console.log('postObj.adventureImageUrl = ' + postObj.adventureImageUrl)

      //add the edited object to database
      API.postNewAdventure(postObj)
        .then(data => {
          setFormObject({
            adventureName: '',
            hostId: '',
            description: '',
            location: '',
            stateLocation: 'Washington',
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
    setLoaderVisible(false)
  }

  return (
    <div className={'overlay ' + showHideModal}>
      <div className={'revealBody'} id="adventureModal1">
        <h1>Create an Adventure</h1>
        <p className="lead">Publish an adventure for the masses to enjoy. All fields are required</p>
        <div className="grid-container fluid">
          <Gridx>
            <Cell size="">
              <form>
                <Gridx>
                  <Cell size={'small-12'}>
                <label for="adventureName" >Adventure Name:</label>
                <Input
                  onChange={handleInputChange}
                  name="adventureName"
                  placeholder="Adventure:"
                  value={formObject.adventureName}
                />
                  </Cell>
                  <Cell size={'small-12'}>

                <label for="description" >Description:</label>
                <TextArea
                  onChange={handleInputChange}
                  name="description"
                  placeholder="Description:"
                  value={formObject.description}
                />
                  </Cell>
                </Gridx>
                <Gridx>
                  <Cell size={'small-12 medium-6'}>
                <label for="location" >Location:</label>
                <Input
                  onChange={handleInputChange}
                  name="location"
                  placeholder="Location:"
                  value={formObject.location}
                />
                  </Cell>
                  <Cell size={'small-12 medium-6'}>
                    <br/>
                <Dropdown
                  intro={'Washington'}
                  onChange={handleInputChange}
                  name="stateLocation"
                  value={formObject.stateLocation}
                  options={stateLocation}
                />
                  </Cell>
                  <Cell size={'small-12'}>
                <label for="itinerary" >Itinerary:</label>
                <TextArea
                  onChange={handleInputChange}
                  name="itinerary"
                  placeholder="Itinerary:"
                  value={formObject.itinerary}
                />
                  </Cell>
                </Gridx>
                <Gridx classes={'grid-margin-x'}>
                <Cell size={'small-12'}>
                <label for="difficulty" >Difficulty Level:</label>
                <Dropdown
                  onChange={handleInputChange}
                  name="difficulty"
                  value={formObject.difficulty}
                  options={["Easy", "Intermediate", "Hard", "Extreme", "Death wish"]}
                />
                </Cell>
                <Cell size={'small-12'}>
                <label for="gearList" >Gear Needed:</label>
                <Input
                  onChange={handleInputChange}
                  name="gearList"
                  placeholder="Gear Need:"
                  value={formObject.gearList}
                />
                </Cell>
                  <Cell size={'small-6'}>
                <label for="time" >Duration Info:</label>
                <NumberInput
                  decrement={handleGroupDec}
                  increment={handleGroupInc}
                  name="time"
                  value={formObject.time}
                />
                  </Cell>
                  <Cell size={'small-6'}>
                    <br/>
                <Dropdown
                  onChange={handleInputChange}
                  name="unit"
                  value={formObject.unit}
                  options={["hours", "days", "weeks", "months", "eternity"]}
                />
                  </Cell>
                </Gridx>
                <Gridx classes={'grid-margin-x'}>
                  <Cell size={'small-6'}> 
                <label for="minGroupSize" >Min group size:</label>
                <NumberInput
                  decrement={handleGroupDec}
                  increment={handleGroupInc}
                  name="minGroupSize"
                  placeholder="Min. Group Size:"
                  value={formObject.minGroupSize}
                />
                  </Cell>
                  <Cell size={'small-6'}>
                <label for="maxGroupSize" >Max group size:</label>
                <NumberInput
                  decrement={handleGroupDec}
                  increment={handleGroupInc}
                  name="maxGroupSize"
                  value={Math.max(formObject.maxGroupSize, formObject.minGroupSize)}
                />
                  </Cell>
                </Gridx>
                <label for="price" >Price in $:</label>
                <NumberInput
                  decrement={handlePriceDec}
                  increment={handlePriceInc}
                  name="price"
                  value={formObject.price}
                />
                
                <label for="tags" >Tags:</label>
                <TagRow edit={true} tags={tagArr} filterTags={handleFilterTags} />
                <Dropdown
                  intro={'Select tags for your adventure'}
                  onChange={handleInputChange}
                  name="tags"
                  options={dropdownArr}
                  value={dropdownValue}
                />
                <label for="image" >Adventure Image:</label>
                <Input
                  onChange={onSubmit}
                  classes={"button adventure-image-upload"}
                  name="image"
                  type="file"
                  text="Upload Image"
                />
                <Gridx>
                  <Cell size={'small-6'}>

                <Loader type="TailSpin" color="#CFA242" height={50} width={50} visible={loaderVisible} />
                  </Cell>
                  <Cell size={'small-6'}>
                <FormBtn
                  disabled={!(formObject.adventureName && formObject.description && formObject.location && formObject.itinerary && image)}
                  onClick={handleFormSubmit}>
                  Publish Adventure
                </FormBtn>
                  </Cell>
                </Gridx>
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


export default Adventure