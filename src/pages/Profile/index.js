//PROFILE page where user info is displayed, edited, deleted depending on host status
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
import { loginContext } from '../../components/LoginContext'
import API from '../../util/API'
import ImageForm from '../../components/ImageForm'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import AvailabilityUpdate from '../../components/AvailabilityUpdate'
import ViewReview from '../../components/ViewReview'


// import Messages from '../../components/Messages'
// import Mailbox from '../../components/Mailbox' // COMMENTED OUT ON 8/20 @ 12:40AM

function Profile(props) {
    let history = useHistory()
    const loginState = useContext(loginContext)
    //state holds user data pulled from database
    const [userData, setUserData] = useState({})
    //state holds user's hosted adventures as pulled from database
    const [adventureData, setAdventureData] = useState([])
    // handling showing of tags
    const [tagArr, setTagArr] = useState([])
    //state to check for changes in data to call useEffect and reload data
    const [change, setChange] = useState(false)
    //all the below states are boolean states to control modals opening and closong, when true, modal is visible, when false modal is hidden
    const [modalAdventure, setModalAdventure] = useState(false)
    const [modalAdventureUpdate, setModalAdventureUpdate] = useState({ visible: false, id: '' })
    const [modalUser, setModalUser] = useState(false)
    const [modalAvailable, setModalAvailable] = useState(false)
    const [modalImage, setModalImage] = useState(false)
    const [picOrBanner, setPicOrBanner] = useState("")
    const [modalTitle, setModalTitle] = useState('')


    //modal states end ================================================

    //set up page with data
    useEffect(() => {
        //user info
        loadUserData()
        //get user id from session data to pull up hosted adventures
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
        setTagArr(data.tags.map(tag => tag.tagName))
    }

    //get the adventures data from database
    const loadUserAdventures = async (id) => {
        const { data } = await API.getAdventurebyHost(id);
        if (data.length > 0) {
            setAdventureData(data)

            // else statement removes last adventure card
        } else {
            setAdventureData([])
        }
    }

    //delete this user account
    const handleDeleteUser = () => {
        confirmAlert({
            title: 'Do you want to delete your account?',
            message: 'This action permanently deletes your account and all related data.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        API.deleteUser().then(() => {
                            API.logOutUser()
                            loginState.changeLoginState(false)
                            setChange(!change)
                            history.push('/')
                        }).catch(err => console.log(err))
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }


    //delete the adventure -- this method is passed into the FlipCard component because the delete button lives on the FlipCard
    const handleDeleteAdventure = (e) => {
        e.stopPropagation()
        let id = e.target.getAttribute('data-id')
        API.deleteAdventure(id)
            .then(() => {
                setChange(!change)
                // setModalAdventure(false)

            })
            .catch(err => console.log(err))
    }

    //become host button just currently updates status on database,this is what happens here
    const handleBecomeHost = () => {
        let hostObj = { host: true, verified: true }
        let newGuideObj = { targetId: userData.id, action: "newGuide", adventureId: null, postImageUrl: null }
        API.updateUser(hostObj).then(() => setChange(!change)).catch(err => console.log(err))
        API.postFeed(newGuideObj).then((res) => console.log(res)).catch(err => console.log(err))
    }

    //start of modals section ============================================================
    //methods to open all the various modals
    const handleCreateAdventureClick = () => {
        //create adventure modal open
        setModalAdventure(true);
    }
    const handleUpdateAdventureClick = (e) => {
        e.stopPropagation()
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
        setModalTitle("Upload Banner Picture")
    }
    const handleUpdateProfilePicClick = () => {
        setModalImage(true);
        setPicOrBanner("profilePic")
        setModalTitle("Upload Profile Picture")
    }
    const handleUpdateAvailClick = () => {
        //update user info modal open
        setModalAvailable(true);
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
    const handleModalAvailClose = () => {
        //update user modal close
        setModalAvailable(false)
        setChange(!change)
    }
    //review block conditional rendering
    const renderViewReview = (info) => {
        if (info) {
            return <ViewReview idArr={info.map(item => item._id)} targetUser={'you'} />
        }
    }
    //end of modals section =============================================================

    return (
        <>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'hero-section'} >
                        <Cell size="small-12 bannerdiv">
                            {/* When user clicks on their profile banner picture, a modal is activated to that they can update it */}
                            <img className="bannerimage" onClick={handleUpdateBannerPicClick} src={userData.profileBannerUrl } alt={userData.firstName + " " + userData.lastName + "'s profile banner pic"}></img>
                        </Cell>
                    </Gridx>
                    <Gridx classes={'bannerName'}>
                        {/* User data section */}
                        <Cell size={"small-12 medium-6"}>
                            <img style={{ height: '20vh', width: '20vh', borderRadius: '50%' }} onClick={handleUpdateProfilePicClick} src={userData.profilePictureUrl } alt={userData.firstName + " " + userData.lastName + "'s profile pic"} type="profilePic" />
                            <div className="detailsDiv">

                                <h2 className="userName"><strong>{userData.firstName} {userData.lastName}</strong></h2>
                                <p className="locationProfile">{userData.location}, {userData.stateLocation} </p>

                                <p>{userData.bio}</p>
                            </div>
                        </Cell>
                        {/* CRUD buttons for user and adventure, all except delete btn, open a modal */}
                        <Cell size={"small-12 medium-6 "} >
                            <div className='createBtnColumn'>
                                {userData.host ?
                                    <>
                                        <Cell size={'medium-4'} >
                                            <Btn className="profileIcons" icon={<i className="fas plusSign fa-plus"></i>} classes={'button expanded'} handleClick={handleCreateAdventureClick} text={'Adventure'} />
                                        </Cell>
                                        <Cell size={'medium-4'}>
                                            <Btn className="profileIcons" icon={<i className="fas fa-pencil-alt"></i>} classes={'button expanded'} handleClick={handleUpdateAvailClick} text={'Availability'} />
                                        </Cell>
                                    </>
                                    :
                                    <Cell size={'medium-4'}>
                                        <Btn className="profileIcons" icon={<i className="fas fa-map-marked-alt"></i>} classes={'button expanded'} handleClick={handleBecomeHost} text={'Become a guide'} />
                                    </Cell>
                                }
                                <Cell size={'medium-4'}>
                                    <Btn className="profileIcons" icon={<i className="fas fa-pencil-alt"></i>} classes={'button expanded'} handleClick={handleUpdateUserClick} text={'Account'} />
                                </Cell>
                                <Cell size={'medium-4'}>
                                    <Btn className="profileIcons" icon={<i className="far fa-trash-alt"></i>} classes={'alert button expanded'} handleClick={handleDeleteUser} text={' Account'} />
                                </Cell>
                            </div>
                        </Cell >

                        <div>
                            <Gridx classes="grid-margin-x grid-margin-y">
                                <TagRow tags={tagArr} />
                            </Gridx>
                        </div>



                        {/* END CRUD buttons for user and adventure */}
                    </Gridx>

                    {(userData.host === false) ? null
                        : (
                            <>

                            <Gridx classes="Matthew-Stuff grid-margin-x grid-margin-y">
                                <Cell size={'small-12'}>
                                    <h3 className="reviewTitle">Your posted adventures</h3>
                                </Cell>
                                {(adventureData) ? adventureData.map(adventure => (
                                    <Cell key={adventure._id} size={'medium-6 large-4'}>
                                        <FlipCard key={adventure._id} id={adventure._id} delete={true} deleteClick={handleDeleteAdventure} edit={true} editClick={handleUpdateAdventureClick} location={adventure.location} stateLocation={adventure.stateLocation} number={adventure.number} unit={adventure.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={adventure.adventureImageUrl } title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description} />
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

                    {/* Modals live here */}
                    <ImageForm show={modalImage} className="imageModals" handleModalClose={handleModalImageClose} type={picOrBanner} modalTitle={modalTitle} />
                    <Adventure show={modalAdventure} handleModalClose={handleModalAdventureClose} />
                    <UserUpdate show={modalUser} handleModalClose={handleModalUserClose} />
                    <AdventureUpdate show={modalAdventureUpdate.visible} handleModalClose={handleModalAdventureUpdateClose} id={modalAdventureUpdate.id} />
                    <AvailabilityUpdate show={modalAvailable} handleModalClose={handleModalAvailClose} />
                    {/* END Modals live here */}

                </div>
                {/* </> */}
            </Wrapper>
        </>
    )
}

export default Profile;



