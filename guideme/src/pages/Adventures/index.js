import React, {useState, useEffect, Lazy, Suspense} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'

import FlipCard from '../../components/FlipCard'
import API from '../../util/API'


function Adventures(props){
    const [adventures, setAdventures] = useState([])
    const {handlePageChange}=props
    handlePageChange("Adventures")

    useEffect(() => {
        loadAdventures()
    }, [])

    const loadAdventures = async () => {
        const result = await API.getAllAdventures()
        setAdventures(result.data)
    }
    
    

    return (
        <>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'grid-margin-x'}>
                        {adventures.map(adventure => 
                        <Cell key={adventure.hostId + " " + adventure._id} size={'medium-6 large-4'}>
                            <FlipCard key={adventure._id} location={adventure.location} number={adventure.number} unit={adventure.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={"https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description}/>
                        </Cell>
                            )}
                    </Gridx>
                </div>
            </Wrapper>
        </>
    )
}

export default Adventures;