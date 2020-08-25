//ADVENTURES this page diplays all adventures subject to search filters

import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import FlipCard from '../../components/FlipCard'
import API from '../../util/API'
import { useLocation } from 'react-router-dom'
import { stateLocation } from '../../components/StateLocations'
import Booking from '../../components/Booking'
import Btn from '../../components/Btn'
import Review from '../../components/Review'
import { loginContext } from '../../components/LoginContext'



function Adventures() {
    var location = useLocation();
    var tag;
    var stateName;
    const loginState = useContext(loginContext)

    //tags that show what was searched
    if (location.state) {

        tag = location.state.tag
        stateName = location.state.stateName
    } else {
        tag = null
        stateName = null
    }

    // const [change, setChange] = useState(false)
    const [modalBooking, setModalBooking] = useState(false)
    const [bookingHostId, setBookingHostId] = useState()
    const [bookingAdventuretId, setBookingAdventureId] = useState()

    const handleModalBookingClose = () => {
        //update user modal close
        setModalBooking(false)
        // setChange(!change)
    }
    const handleModalBookingOpen = (id, adventureId) => {

        //update user modal close
        setBookingHostId(id)
        setBookingAdventureId(adventureId)
        setModalBooking(true)
        // setChange(!change)
    }

    //list of relevant adventures
    const [adventures, setAdventures] = useState([])
    const [searchTerm, setSearchTerm] = useState(tag);
    const [searchTermState, setSearchTermState] = useState(stateName);
    const [tags, setTags] = useState([])
    const [modalCreateReview, setModalReview] = useState({ visible: false, id: '' })
    //state to check for changes in data to call useEffect and reload data
    const [change, setChange] = useState(false)




    //load adventures on page load
    useEffect(() => {
        loadAdventures(searchTerm, searchTermState)
    }, [searchTerm, searchTermState])

    //get all tags for dropdown
    useEffect(() => {
        API.getTags().then(res => setTags(res.data)).catch(err => console.log(err))
    }, [])

    //API call to adventures db
    //Filter adventures based on tags and/or states matching search criteria
    const loadAdventures = async (activity, state) => {
        const { data } = await API.getAllAdventures()
        let adventureArr = [...data]
        if (activity && activity !== 'Activity') {
            adventureArr=adventureArr.filter(adventure=> adventure.tags.map(tag=>tag=tag.tagName).indexOf(activity)>=0)
        }
        if (state && state !== 'Location') {
            adventureArr=adventureArr.filter(adventure=> adventure.stateLocation.indexOf(state)>=0)
        }
        setAdventures(adventureArr)
    }

    // modal for create review
    const createReviewClick = (id) => {
        setModalReview({visible:true, id:id});
        setChange(!change)
    }
    // close modal for create review
    const handleModalCreateReviewClose = () => {
        //create adventure modal close
        setModalReview({...modalCreateReview, visible:false});
        setChange(!change)
    }


    return (
        <>
            <Wrapper>
                <div className="calloutAdventures">
                    {/* The search or host adventure form on home page */}
                    <div className="container searchBoxAdventures">
                    <Gridx>
                        <Cell size={"small-12"}>

                    <h3>Filter adventures by:</h3>
                        </Cell>
                                    <Cell size={'small-6'}>
                        <select onChange={(e) => { setSearchTerm(e.target.value) }} value={searchTerm} className="findAdventureAdventure">
                            <option>Activity</option>
                            {tags ? tags.map(tag => <option key={tag._id} value={tag.tagName}>{tag.tagName}</option>) : ''}
                        </select>
                        </Cell>
                        <Cell size={'small-6'}>
                        <select onChange={(e) => { setSearchTermState(e.target.value) }} value={searchTermState} className="findAdventureAdventure">
                            <option>Location</option>
                            {stateLocation ? stateLocation.map(state => <option key={stateLocation.indexOf(state)} value={state}>{state}</option>) : null}
                        </select>
                        </Cell>
                        </Gridx>
                    </div>
                </div>

                <div className="grid-container full">

                    <Gridx classes={'grid-margin-x grid-margin-y noAdventures'}>
                        {/* This puts the adventures on the page, see FlipCard for more info */}
                        {(adventures.length) ? adventures.map(adventure =>
                            <Cell key={adventure.hostId + " " + adventure._id} size={'medium-6 large-4'}>
                                <FlipCard key={adventure._id} location={adventure.location} stateLocation={adventure.stateLocation} number={adventure.duration.time} unit={adventure.duration.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} tags={adventure.tags.map(item => item.tagName)} itinerary={adventure.itinerary} img={adventure.adventureImageUrl ? adventure.adventureImageUrl : "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description} hostId={adventure.hostId._id }bookingModalOpen = {handleModalBookingOpen} adventureId = {adventure._id}/>
                                {loginState.loggedIn &&  <Btn className="reviewBtn" icon={<i className="fas fa-comments"></i>} classes={'button expanded'} handleClick={(e) => {e.stopPropagation(); createReviewClick(adventure._id)}} text={'Review this adventure'} />}
                            </Cell>
                         ) : <h3 className="noAdventures" style={{marginTop:"2vh"}}>I can't find any adventures meeting those search terms, please try again</h3>}
                    </Gridx>

                    {/* Modal lives here */}
                    <Review show={modalCreateReview.visible} handleModalClose={handleModalCreateReviewClose} id={modalCreateReview.id} />
                    <Booking show ={modalBooking} handleModalClose = {handleModalBookingClose} hostId = {bookingHostId} adventureId = {bookingAdventuretId}/>
                    {/* END Modals live here */}

                </div>

                
            </Wrapper>
        </>
    )
}

export default Adventures;



