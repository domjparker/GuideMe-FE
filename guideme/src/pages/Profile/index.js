import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'
import Btn from '../../components/Btn'
import FlipCard from '../../components/FlipCard'
import Adventure from '../../components/Adventure'
import UserUpdate from '../../components/UserUpdate'
import API from '../../util/API'
import ImageForm from '../../components/ImageForm'

function Profile (props) {
    const [userData, setUserData] = useState({})
    const [adventureData, setAdventureData] = useState([])
    const [modalAdventure, setModalAdventure]= useState(false)
    const [modalUser, setModalUser]= useState(false)
    const [modalImage, setModalImage]= useState(false)

    const {handlePageChange}=props
    handlePageChange("Profile")
    
    useEffect(() => {
        loadUserData()
        API.getSessionData().then(res => {
            let id = res.data.id
            loadUserAdventures(id)
        }).catch(err => console.log(err))
    }, [])

    const loadUserData = async () => {
        const {data} = await API.getUserbyId();
        if (data.host) {props.setHostState()} 
        setUserData(data);
    }

    const loadUserAdventures = async (id)=>{
        const {data} = await API.getAdventurebyHost(id);
        if (data.length>0){
            
            console.log(data)
            setAdventureData(data)
        }
    }

    const handleDeleteUser = () => {
        API.deleteUser().then(()=>{
            props.setLoginState()
            return <Redirect to='/'/>
        }).catch(err => console.log(err))
    }
    
    const handleCreateAdventureClick = () => {
        
        setModalAdventure(true);

    }
    const handleUpdateUserClick = () => {
        
        setModalUser(true);

    }
    const handleUpdateImageClick = () => {
        
        setModalImage(true);

    }
    
    const  handleModalAdventureClose = () => {
    setModalAdventure(false)
    }
    
    const  handleModalUserClose = () => {
    setModalUser(false)
    }
    const  handleModalImageClose = () => {
    setModalImage(false)
    }
    

    return(
        <>
        <Wrapper>
            <div className="grid-container full">
                <Gridx classes={'hero-section'} >
                    <Cell size={'hero-section-text'}>
                        <h2 className="text-center">{userData.firstName} {userData.lastName}</h2>
                    </Cell>
                </Gridx>
                <Gridx>
                    <Cell size={"small-6 medium-4"}>
                        <img id="profilePic" onClick={handleUpdateImageClick} src={userData.profilePictureUrl} alt={userData.firstName + " " + userData.lastName} />
                    </Cell>
                    <Cell size={"small-6 medium-8"}>
                        <p>{userData.bio}</p>
                    </Cell>
                    <Cell size={""}>
                        <p>{userData.location}</p>
                    </Cell>
                </Gridx>
                <ImageForm show={modalImage}  handleModalClose={handleModalImageClose}/>
                {(userData.host=== false) ? null 
                :(
                    <>
                <Gridx classes="grid-margin-x">
                    <TagRow tags={userData.tags}/>
                </Gridx>
                <Gridx classes="grid-margin-x">
                    {(adventureData)? adventureData.map(adventure => (
                        <Cell key={adventure._id} size={'medium-6 large-4'}>
                            <FlipCard key={adventure._id} location={adventure.location} number={adventure.number} unit={adventure.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={"https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description}/>
                        </Cell>
                    )) : null}
                </Gridx>
                </>
                )}
                <Gridx classes={''}>
                    {props.host ? 
                    <Cell size={'medium-4'}>
                        <Btn classes={'button'} handleClick={handleCreateAdventureClick} text={'Create an adventure'}/>
                    </Cell>
                    :
                    <Cell size={'medium-4'}>
                        <Btn classes={'button'} handleClick={props.setHostState} text={'Become a guide'}/>
                    </Cell>
                    }
                    <Cell size={'medium-4'}>
                        <Btn classes={'button'} handleClick={handleUpdateUserClick} text={'Update my data'}/>
                    </Cell>
                    <Cell size={'medium-4'}>
                        <Btn classes={'alert button'} handleClick={handleDeleteUser} text={'Delete my account'}/>
                    </Cell>
                </Gridx>
                <Adventure show={modalAdventure} handleModalClose={handleModalAdventureClose}/>
                <UserUpdate show={modalUser} handleModalClose={handleModalUserClose}/>
            </div>
        </Wrapper>
        </>
    )    
}

export default Profile