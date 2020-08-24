//component to update user info -- member of the Profile page
import React, { useEffect, useState } from "react";
import API from "../../util/API";
import './style.css'
import { Input, TextArea, FormBtn, Dropdown } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'
import TagRow from '../TagRow'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AvailabilityUpdate(props) {
  //handles bodal visibility state as input from parent element
  let showHideModal = props.show ? 'modal d-block' : 'modal d-none'
  const [newDate, setNewDate] = useState(new Date())
  const [dateArr, setDateArr] = useState([])
  const [dateStringArr, setDateStringArr] = useState([])
  const [bookedDateArr, setBookedDateArr] = useState([])
  //handles form object data

  //checks for data when modal visibility setting changes
  useEffect(() => {
    loadInitialData();
  }, [props.show])

  const handleModalClose = () => {
    setDateArr([])
    setDateStringArr([])
    props.handleModalClose()
  }
  //populate update form with existing data of that adventure
  async function loadInitialData() {
    let { data } = await API.getAvailability()
    var filteredAvailableArray = data.availability.filter(notBookedDates)
    var filteredBookedAray = data.availability.filter(bookedDates)
    console.log(filteredBookedAray)
    console.log(filteredAvailableArray)
    var tempArray = filteredAvailableArray.map(objectTranslate)
    setDateArr(tempArray)
    setBookedDateArr(filteredBookedAray)
    var stringyTempArray = tempArray.map(item => item = item.toString())
    setDateStringArr(stringyTempArray)

  }
  
  function bookedDates(entry) {
    if (("adventureId" in entry) === true) {
        return true
    }
    else {
        return false
    }
}

// Filters Out Dates that are not booked
function notBookedDates(entry) {
    console.log("adventureId" in entry)
    if (("adventureId" in entry) === false) {
        return true
    }
    else {
        return false
    }
}
  function objectTranslate (entry){
    var dataStartDate = entry.startDate
    return new Date(dataStartDate)
  }
 function calendarOnChange(event){
    setNewDate(event)
  }
  function addDate (event){
    console.log(dateArr)
    console.log(newDate)
    if(dateStringArr.includes(newDate.toString())){
      alert("That date is already added")
    }else{
      console.log("we got here")
      setDateArr([...dateArr, newDate])
      setDateStringArr([...dateStringArr, newDate.toString()])
    }

  }
  function handleFilterDates(e){
    var deletedDate = e.target.getAttribute('value')
    deletedDate = deletedDate.toString()
    setDateArr(dateArr.filter(date => date.toString() !== deletedDate))
    setDateStringArr(dateStringArr.filter(date => date !== deletedDate))
  }
  function createAvailObj(date){
    var availObj = {startDate:new Date(date)}
    return availObj
  }
  async function handleFormSubmit(event) {
    event.preventDefault();
    const selectedDateArr = dateArr.map(createAvailObj)
    var postArr = selectedDateArr.concat(bookedDateArr)
    console.log(postArr)
    await API.updateAvailability({availability: postArr})
    handleModalClose()
 
  }

  return (
    <div className={'overlay ' + showHideModal}>
    <div className={'modalBody'} id="adventureModal1">
      <h1>Update your Availability</h1>
      <p className="lead">Current Available Days</p>
      <div className="grid-container fluid">
        <Gridx>
          <Cell size="">
          <TagRow edit={true} tags={dateStringArr} filterTags={handleFilterDates}></TagRow>
          
            <form>
            {/* The function for titleClassName determines which date to display as green */}
            <Calendar calendarType = "ISO 8601" onChange = {calendarOnChange} value={newDate} tileClassName = {({ date, view }) =>  (dateArr.map(index => new Date(index).getDate() + " " + new Date(index).getMonth()).includes(date.getDate() + " " + date.getMonth())? 'selectedAvailable' : null) || (bookedDateArr.map(index => new Date(index.startDate).getDate() + " " + new Date(index.startDate).getMonth()).includes(date.getDate() + " " + date.getMonth())? 'bookedAvailable' : null) }  tileDisabled = {({date, view }) => (new Date(date)< new Date())||bookedDateArr.map(index => new Date(index.startDate).getDate() + " " + new Date(index.startDate).getMonth()).includes(date.getDate() + " " + date.getMonth())}/>
              <FormBtn
                onClick={handleFormSubmit}>
                Submit Availability Changes
                </FormBtn>
              {/* close modal button */}
              <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
            </form>
            <Btn classes="button expanded" onClick = {addDate} text = "Add Date"></Btn>
          </Cell>
        </Gridx>
      </div>
    </div>
    </div>
  );
}


export default AvailabilityUpdate;