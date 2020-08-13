import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'
import FlipCard from '../../components/FlipCard'
import API from '../../util/API'

function Profile (props) {
    const [userData, setUserData] = useState({})

    const {handlePageChange}=props
    handlePageChange("Profile")
    
    useEffect(() => {
        loadUserData("5f358340de3d0897c09a397a")
    })

    const loadUserData = async (id) => {
        const {data} = await API.getUserbyId(id);
        setUserData(data);
        const tagsArr = await loadTagsArr(data.tags)
        setUserData({...userData, tags: tagsArr})
    }


    const loadTagsArr = async (idArr) => {
        let tagsArr = []
        let word
        for (let tag in idArr) {
            word = await API.getTagbyId(tag)
            tagsArr.push(word)
        }
        return tagsArr
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