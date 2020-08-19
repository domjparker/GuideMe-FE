//PROFILE page where user info is displayed, edited, deleted depending on host status
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'
import Btn from '../../components/Btn'
import FlipCard from '../../components/FlipCard'
import Adventure from '../../components/Adventure'
import AdventureUpdate from '../../components/AdventureUpdate'
import UserUpdate from '../../components/UserUpdate'
import API from '../../util/API'
import ImageForm from '../../components/ImageForm'
import Messages from '../../components/Messages'
import Mailbox from '../../components/Mailbox'



function Profile(props) {
    //state holds user data pulled from database
    const [userData, setUserData] = useState({})
    //state holds user's hosted adventures as pulled from database
    const [adventureData, setAdventureData] = useState([])
    //state to check for changes in data to call useEffect and reload data
    const [change, setChange] = useState(false)
    //all the below states are boolean states to control modals opening and closong, when true, modal is visible, when false modal is hidden
    const [modalAdventure, setModalAdventure] = useState(false)
    const [modalAdventureUpdate, setModalAdventureUpdate] = useState({ visible: false, id: '' })
    const [modalUser, setModalUser] = useState(false)
    const [modalImage, setModalImage] = useState(false)
    const [picOrBanner, setPicOrBanner] = useState("")
    const [modalTitle, setModalTitle] = useState('')

    //modal states end ================================================

    //set up page with data
    useEffect(() => {
        //user info
        loadUserData()
        //get user id from session data to pull up hosted adventures
        //TODO:check if host first and then pull up adventures? useEffect for that?
        API.getSessionData().then(res => {
            let id = res.data.id
            //pull up hosted adventures
            loadUserAdventures(id)
        }).catch(err => console.log(err))
    }, [change])

    //get the user data from database
    const loadUserData = async () => {
        const { data } = await API.getUserbyId();
        setUserData(data);
    }

    //get the adventures data from database
    const loadUserAdventures = async (id) => {
        const { data } = await API.getAdventurebyHost(id);
        if (data.length > 0) {
            setAdventureData(data)
        }
    }

    //delete this user account
    const handleDeleteUser = () => {
        API.deleteUser().then(() => {
            props.setLoginState()
            setChange(!change)
            return <Redirect to='/' />
        }).catch(err => console.log(err))
    }

    //delete the adventure -- this method is passed into the FlipCard component because the delete button lives on the FlipCard
    const handleDeleteAdventure = (e) => {
        e.stopPropagation()
        let id = e.target.getAttribute('data-id')
        API.deleteAdventure(id)
            .then(() => {
                setModalAdventure(false)
                setChange(!change)
            })
            .catch(err => console.log(err))
    }

    //become host button just currently updates status on database,this is what happens here
    const handleBecomeHost = () => {
        let hostObj = { host: true, verified: true }
        API.updateUser(hostObj).then(() => setChange(!change)).catch(err => console.log(err))
    }

    //start of modals section ============================================================
    //methods to open all the various modals
    const handleCreateAdventureClick = () => {
        //create adventure modal open
        setModalAdventure(true);
    }
    const handleUpdateAdventureClick = (e) => {
        //update adventure modal open -- this method is passed into the FlipCard since the update adventure btn lives there
        let id = e.target.getAttribute('data-id')
        //this state includes the adventure id of the adventure whose FLipCard was clicked to know which adventure we are updating
        setModalAdventureUpdate({ visible: true, id: id });
    }
    const handleUpdateUserClick = () => {
        //update user info modal open
        setModalUser(true);
    }
    // 
    const handleUpdateBannerPicClick = () => {
        setModalImage(true);
        setPicOrBanner("bannerPic")
        setModalTitle("Banner Picture")
    }
    const handleUpdateProfilePicClick = () => {
        setModalImage(true);
        setPicOrBanner("profilePic")
        setModalTitle("Profile Picture")
    }
    //methods to close the various modals
    const handleModalAdventureClose = () => {
        //create adventure modal close
        setModalAdventure(false)
        setChange(!change)
    }
    const handleModalAdventureUpdateClose = () => {
        //update adventure modal close
        setModalAdventureUpdate({ ...modalAdventureUpdate, visible: false })
        setChange(!change)
    }
    const handleModalUserClose = () => {
        //update user modal close
        setModalUser(false)
        setChange(!change)
    }
    const handleModalImageClose = () => {
        //update image modal close
        setModalImage(false)
        setChange(!change)
    }
    //end of modals section =============================================================


    return (
        <>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'hero-section'} >
                        <Cell size="small-12 bannerdiv">
                            <img className="bannerimage" onClick={handleUpdateBannerPicClick} src={userData.profileBannerUrl ? userData.profileBannerUrl : "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?cs=srgb&dl=pexels-veeterzy-38136.jpg&fm=jpg"} alt={userData.firstName + " " + userData.lastName + "'s profile banner pic"} type="bannerPic"></img>
                        </Cell>
                    </Gridx>
                    <Gridx classes={'bannerName'}>
                        {/* User data section */}
                        <Cell size={"small-12 medium-6"}>
                            <img id="profilePic" onClick={handleUpdateProfilePicClick} src={userData.profilePictureUrl ? userData.profilePictureUrl : "https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?cs=srgb&dl=pexels-jake-colvin-1761282.jpg&fm=jpg"} alt={userData.firstName + " " + userData.lastName + "'s profile pic"} type="profilePic" />
                            <h2>{userData.firstName} {userData.lastName}</h2>
                            <p>{userData.location}</p>
                            <p>{userData.bio}</p>
                        </Cell>
                        {/* CRUD buttons for user and adventure, all except delete btn, open a modal */}
                        <Cell size={"small-12 medium-6"}>
                            {userData.host ?
                                <Cell size={'medium-4'} >
                                    <Btn classes={'button expanded'} handleClick={handleCreateAdventureClick} text={'Create an adventure'} />
                                </Cell>
                                :
                                <Cell size={'medium-4'}>
                                    <Btn classes={'button expanded'} handleClick={handleBecomeHost} text={'Become a guide'} />
                                </Cell>
                            }
                            <Cell size={'medium-4'}>
                                <Btn classes={'button expanded'} handleClick={handleUpdateUserClick} text={'Update my data'} />
                            </Cell>
                            <Cell size={'medium-4'}>
                                {/* TODO:create a modal that asks "are you sure?" for the delete account button */}
                                <Btn classes={'alert button expanded'} handleClick={handleDeleteUser} text={'Delete my account'} />
                            </Cell>
                        </Cell >
                        


                        {/* END CRUD buttons for user and adventure */}
                    </Gridx>

                    {(userData.host === false) ? null
                        : (
                            <>
                                <Gridx classes="grid-margin-x">
                                    <TagRow tags={userData.tags} />
                                </Gridx>
                                <Gridx classes="Matthew-Stuff">
                                    {(adventureData) ? adventureData.map(adventure => (
                                        <Cell key={adventure._id} size={'medium-6 large-4'}>
                                            <FlipCard key={adventure._id} id={adventure._id} delete={true} deleteClick={handleDeleteAdventure} edit={true} editClick={handleUpdateAdventureClick} location={adventure.location} number={adventure.number} unit={adventure.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={adventure.adventureImageUrl ? adventure.adventureImageUrl : "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description} />

                                        </Cell>
                                    )) : null}
                                </Gridx>
                            </>
                        )}
                    {/* END Display tags and adventures related to user, if the user is a host */}



                    {/* Modals live here */}
                    <ImageForm show={modalImage} handleModalClose={handleModalImageClose} type={picOrBanner} modalTitle={modalTitle} />
                    <Adventure show={modalAdventure} handleModalClose={handleModalAdventureClose} />
                    <UserUpdate show={modalUser} handleModalClose={handleModalUserClose} />
                    <AdventureUpdate show={modalAdventureUpdate.visible} handleModalClose={handleModalAdventureUpdateClose} id={modalAdventureUpdate.id} />
                    {/* END Modals live here */}

                </div>
            </Wrapper>
        </>
    )
}

export default Profile