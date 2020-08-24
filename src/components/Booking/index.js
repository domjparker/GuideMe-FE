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
    let showHideModal = props.show ? 'modal d-block' : 'modal d-none'
    const [newDate, setNewDate] = useState()
    const [dateArr, setDateArr] = useState([])
    const [bookedDateArr, setBookedDateArr] = useState([])

    useEffect(() => {
        loadInitialData();
    }, [props.show])

    // Loads Availability 
    async function loadInitialData() {
        // TODO: CHANGE THIS TO grab availability of host
        let { data } = await API.getAvailabilityById(props.hostId)
        console.log(data)
        var filteredAvailableArray = data.availability.filter(notBookedDates)
        var filteredBookedAray = data.availability.filter(bookedDates)
        var mappedArray = filteredAvailableArray.map(objectTranslate)
        setBookedDateArr(filteredBookedAray)
        setDateArr(mappedArray)
    }
    //Filters the Dates that are already booked
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
        // console.log(event)
        setNewDate(event)
    }
    function selectedDate(index) {

        if (index.toString() === newDate.toString()) {
            return true
        }
        return false
    }
    function notSelectedDate(index) {

        if (index.toString() !== newDate.toString()) {
            return true
        }
        return false
    }
    function makeBookObj(index) {
        var tempObj = {
            startDate: index,
            adventureId: props.adventureId
        }
        return tempObj
    }
    function makeNotBookObj(index) {
        var tempObj = {
            startDate: index,
        }
        return tempObj
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        if(!newDate){
            alert("Please Select a Date")
        }
        else if (dateArr.length > 0) {
            const postArr = dateArr.filter(item => selectedDate(item))
            const notPostArr = dateArr.filter(item => notSelectedDate(item))
            const bookedArr = postArr.map(item => makeBookObj(item))
            const notBookedArr = notPostArr.map(item => makeNotBookObj(item))
            notBookedArr.push(bookedArr[0])
            notBookedArr.push()
            const FinalAvailArray = notBookedArr.concat(bookedDateArr)
            console.log(FinalAvailArray)
            await API.updateAvailabilityBooking({
                availability: FinalAvailArray,
                id: props.hostId
            })
            await API.createBooking({
                id:props.adventureId,
                startTime: bookedArr[0].startDate
            })
            handleModalClose()
        }


    }

    return (
        <>
            <div className={'overlay ' + showHideModal}>
                <div className={'modalBody'} id="adventureModal1">
                    <h1>Book Your Adventure</h1>
                    <p className="lead">Availabile Bookings Listed in Green</p>
                    <div className="grid-container fluid">
                        <Gridx>
                            <Cell size="">

                                <form>
                                    {/* The function for titleClassName determines which date to display as green */}
                                    <Calendar calendarType="ISO 8601" onClickDay={calendarOnChange} value={newDate} tileClassName={({ date }) => dateArr.map(index => new Date(index).getDate()).includes(date.getDate()) && dateArr.map(index => new Date(index).getMonth()).includes(date.getMonth()) ? 'selectedAvailable' : null} tileDisabled={({ date }) => !dateArr.map(index => new Date(index).getDate() + " " + new Date(index).getMonth()).includes(date.getDate() + " " + date.getMonth())} />
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
            </div>
        </>
    )
}

export default Booking;