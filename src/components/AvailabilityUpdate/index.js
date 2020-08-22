//component to update user info -- member of the Profile page
import React, { useEffect, useState } from "react";
import API from "../../util/API";
import './style.css'
import { Input, TextArea, FormBtn, Dropdown } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import TagRow from '../TagRow'

function AvailabilityUpdate(props) {
  //handles bodal visibility state as input from parent element
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  //handles form object data
  const [formObject, setFormObject] = useState({
    availability: []
  })
  //checks for data when modal visibility setting changes
  useEffect(() => {
    loadInitialData();
  }, [props.show])

  //populate update form with existing data of that adventure
  async function loadInitialData() {
    let { data } = await API.getAvailability()
    setFormObject({
      availability: data.availability? data.availability.map(entry=>entry.startTime).join(", "):'',
    })
  }
  // //control input field changes
  // function handleInputChange(event) {
  //   // add code to control the components here
  //   let name = event.target.name
  //   let value = event.target.value
  //   if (name !== 'tags') {
  //     setFormObject({ ...formObject, [name]: value })
  //   } else if (tagArr.indexOf(event.target.value) < 0) {
  //     //if this tag is not already in the tags array, then put it there
  //     setTagArr([...tagArr, event.target.value])
  //   }
  // }

  // //tag handling
  // const handleFilterTags = (e) => {
  //   let deletedTag = e.target.getAttribute('value')
  //   setTagArr(tagArr.filter(tag => tag !== deletedTag))
  // }
  // //make put request to update user info
  // async function handleFormSubmit(event) {
  //   // add code here to post a new adventure to the api
  //   event.preventDefault();
  //   let postObj = { ...formObject }
  //   postObj.availability = availability.filter(slot => tagArr.indexOf(slot.startDate) > -1).map(tag => tag._id)
  //   console.log(postObj)
  //   API.updateUser(postObj)
  //     .then(data => {
  //       setFormObject({
  //         availability:[]
  //       })
  //       handleModalClose();
  //     }).catch(err => console.log(err))
  // }

  return (
    <div className={showHideModal} id="exampleModal1">
      <h1>Update your Availability</h1>
      <p className="lead">Change Time Here</p>
      <div className="grid-container fluid">
        <Gridx>
          <Cell size="">
            <form>
              <TagRow edit={true} tags={tagArr} filterTags={handleFilterTags} />
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
              <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
            </form>
          </Cell>
        </Gridx>
      </div>
    </div>
  );
}


export default AvailabilityUpdate;