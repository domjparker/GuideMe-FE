import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'
import FlipCard from '../../components/FlipCard'

import usersInfo from '../../fakedb/users.json'

function Profile (props) {
    const [userData, setUserData] = useState({})

    const {handlePageChange}=props
    handlePageChange("Profile")
       
    const loadUserData = () => {
        setUserData(usersInfo[1])
    }
    useEffect(() => {
        loadUserData()
    
    }, [])


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
                        <img id="profilePic" src={userData.profilePicture} alt={userData.firstName + " " + userData.lastName} />
                    </Cell>
                    <Cell size={"small-6 medium-8"}>
                        <p>{userData.bio}</p>
                    </Cell>
                    <Cell size={""}>
                        <p>{userData.location}</p>
                    </Cell>
                </Gridx>
                
                {(userData.host=== false) ? null 
                :(
                    <>
                <Gridx classes="grid-margin-x">
                    <TagRow tags={userData.tags}/>
                </Gridx>
                <Gridx classes="grid-margin-x">
                    {(userData.hopstedAdventures)? userData.hostedAdventures.map(adventure => (
                        <Cell key={adventure.id} size={'medium-6 large-4'}>
                            <FlipCard key={adventure.id} location={adventure.location} difficulty={adventure.difficulty} duration={adventure.duration} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={adventure.imageId} title={adventure.adventureName} host={adventure.hostId} description={adventure.description}/>
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