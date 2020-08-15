import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'
import FlipCard from '../../components/FlipCard'
import API from '../../util/API'
import ImageForm from '../../components/ImageForm'

function Profile (props) {
    const [userData, setUserData] = useState({})

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
        console.log(data)
        setUserData(data);
    }

    const loadUserAdventures = async (id)=>{
        const {data} = await API.getAdventurebyHost(id);
        if (data.length>0){
            console.log('why are we here, this user does not have hosted adventures?')
            console.log(data)
            // setUserData({...userData, adventures: data})
        }
    }
    
    return(
        <>
        <Wrapper>
            <div className="grid-container full">
                <Gridx>
                    <Cell size={''}>
                        <h2>{userData.firstName} {userData.lastName}</h2>
                    </Cell>
                </Gridx>
                <Gridx>
                    <Cell size={"small-6 medium-4"}>
                        <img id="profilePic" src="https://images.pexels.com/photos/732632/pexels-photo-732632.jpeg?cs=srgb&dl=pexels-lalu-fatoni-732632.jpg&fm=jpg" alt={userData.firstName + " " + userData.lastName} />
                    </Cell>
                    <Cell size={"small-6 medium-8"}>
                        <p>{userData.bio}</p>
                    </Cell>
                    <Cell size={""}>
                        <p>{userData.location}</p>
                    </Cell>
                </Gridx>
                <ImageForm></ImageForm>
                {(userData.host=== false) ? null 
                :(
                    <>
                <Gridx classes="grid-margin-x">
                    <TagRow tags={userData.tags}/>
                </Gridx>
                <Gridx classes="grid-margin-x">
                    {(userData.hopstedAdventures)? userData.hostedAdventures.map(adventure => (
                        <Cell key={adventure._id} size={'medium-6 large-4'}>
                            <FlipCard key={adventure._id} location={adventure.location} number={adventure.number} unit={adventure.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={"https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description}/>
                        </Cell>
                    )) : null}
                </Gridx>
                </>
                )}
            </div>
        </Wrapper>
        </>
    )    
}

export default Profile