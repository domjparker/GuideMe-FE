//PROFILE page where user info is displayed, edited, deleted depending on host status
import React, { useState, useEffect } from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'
import FlipCard from '../../components/FlipCard'
import API from '../../util/API'
import { useLocation } from 'react-router-dom'
import ViewReview from '../../components/ViewReview'
import Booking from '../../components/Booking'




function PublicProfile(props) {
    
    let location = useLocation()
    let userId = location.state.userId
    //state holds user data pulled from database
    const [userData, setUserData] = useState({})
    //state holds user's hosted adventures as pulled from database
    const [adventureData, setAdventureData] = useState([])
    // handling showing of tags
    const [tagArr, setTagArr] = useState([])
    //state to check for changes in data to call useEffect and reload data
    //set up page with data
    useEffect(() => {
        //user info
        loadUserData()
        //pull up hosted adventures
        loadUserAdventures(userId)
    }, [])

    //get the user data from database
    const loadUserData = async () => {
        const { data } = await API.getUserProfilebyId(userId);
        setUserData(data);
        setTagArr(data.tags.map(tag=>tag.tagName))
    }

    //get the adventures data from database
    const loadUserAdventures = async (id) => {
        const { data } = await API.getAdventurebyHost(id);
        if (data.length > 0) {
            setAdventureData(data)
        }
    }
    //review block conditional rendering
    const renderViewReview = (info) => {
        if (info)  {    
                return <ViewReview idArr={info.map(item=>item._id)} targetUser={`${userData.firstName} ${userData.lastName}`}/> 
        }
    }

    //BOOKING MODAL
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

    return (
        <>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'hero-section'} >
                        <Cell size="small-12 bannerdiv">
                            {/* When user clicks on their profile banner picture, a modal is activated to that they can update it */}
                            <img className="bannerimage" src={userData.profileBannerUrl} alt={userData.firstName + " " + userData.lastName + "'s profile banner pic"}></img>
                        </Cell>
                    </Gridx>
                    <Gridx classes={'bannerName'}>
                        {/* User data section */}
                        <Cell size={"small-12 medium-6"}>
                            <img style={{height: '15vh',width: '15vh', borderRadius: '50%'}} src={userData.profilePictureUrl} alt={userData.firstName + " " + userData.lastName + "'s profile pic"} type="profilePic" />
                            <div className="detailsDiv">
                            <h2 className="userName"><strong>{userData.firstName} {userData.lastName}</strong></h2>
                            <p className="locationProfile">{userData.location}</p>
                            <p>{userData.bio}</p>
                            </div>
                        </Cell>
                    </Gridx>

                    {(userData.host === false) ? null
                        : (
                            <>
                                <Gridx classes="grid-margin-x">
                                    <TagRow tags={tagArr} />
                                </Gridx>
                                <Gridx classes="Matthew-Stuff grid-margin-x grid-margin-y">
                                <Cell size={'small-12'}>
                                    <h3 className="reviewTitle">{userData.firstName + " " + userData.lastName + "'s posted adventures"}</h3>
                                </Cell>
                                    {(adventureData) ? adventureData.map(adventure => (
                                        <Cell key={adventure._id} size={'medium-6 large-4'}>
                                            <FlipCard key={adventure._id} id={adventure._id} stateLocation={adventure.stateLocation} delete={false} edit={false} location={adventure.location} number={adventure.duration.time} unit={adventure.duration.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={adventure.adventureImageUrl ? adventure.adventureImageUrl : "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description} bookingModalOpen = {handleModalBookingOpen} adventureId = {adventure._id}hostId={adventure.hostId._id }/>
                                        </Cell>
                                    )) : null}
                                </Gridx>

                            </>
                        )}
                         <br></br>
                            <Gridx>
                                   {(adventureData.length>0) ? renderViewReview(adventureData):console.log('nodata')}
                            </Gridx>
                    {/* END Display tags and adventures related to user, if the user is a host */}
                    <Booking show ={modalBooking} handleModalClose = {handleModalBookingClose} hostId = {bookingHostId} adventureId = {bookingAdventuretId}/>
                </div>
            </Wrapper>
        </>
    )
}

export default PublicProfile;