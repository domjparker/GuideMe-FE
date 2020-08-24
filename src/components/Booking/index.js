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

function Booking(props) {
    let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
    const [newDate, setNewDate] = useState(new Date())
    const [dateArr, setDateArr] = useState([])

    useEffect(() => {
        loadInitialData();
    }, [props.show])

    // Loads Availability 
    async function loadInitialData() {
        // TODO: CHANGE THIS TO grab availability of host
        let { data } = await API.getAvailability()
        var tempArray = data.availability.filter(pastDateCancel).map(objectTranslate)
        setDateArr(tempArray)
    }
    // Checks if the Date has already passed
    function pastDateCancel(entry){
        if(Date(entry.startDate) > new Date()){
            return new Date(entry.startDate)
        }
    }
    // Returns API data as Date Form
    function objectTranslate(entry) {
        return new Date(entry.startDate)
   
    }

    // Clears Date Arr and closes Modal
    const handleModalClose = () => {
        setDateArr([])
        props.handleModalClose()
    }

    // Handles Calendar State
    function calendarOnChange(event) {
        setNewDate(event)
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const postArr = dateArr.filter(newDate)
        console.log(postArr)
        // await API.updateAvailability({availability: postArr})
        handleModalClose()
     
      }

    return (
        <>
            <div className={showHideModal} id="exampleModal1">
                <h1>Book Your Adventure</h1>
                <p className="lead">Availabile Bookings Listed in Green</p>
                <div className="grid-container fluid">
                    <Gridx>
                        <Cell size="">

                            <form>
                                {/* The function for titleClassName determines which date to display as green */}
                                <Calendar calendarType="ISO 8601" onChange={calendarOnChange} value={newDate} tileClassName={({ date }) => dateArr.map(index => new Date(index).getDate()).includes(date.getDate()) && dateArr.map(index => new Date(index).getMonth()).includes(date.getMonth()) ? 'selectedAvailable' : null} tileDisabled={({ date, view }) => new Date(date) < new Date()} />
                                <FormBtn
                                    onClick={handleFormSubmit}>
                                    Book Adventure
                                </FormBtn>
                                {/* close modal button */}
                                <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
                            </form>
                        </Cell>
                    </Gridx>
                </div>
            </div>
        </>
    )
}

export default Booking;