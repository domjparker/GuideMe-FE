import React, {useState, useEffect, Lazy, Suspense} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import adventureList from '../../fakedb/adventures.json'
import FlipCard from '../../components/FlipCard'


function Adventures(props){
    const [adventures, setadventures] = useState([])
    const {handlePageChange}=props
    handlePageChange("Adventures")
    useEffect(() => {
        loadAdventures()

    }, [])

    

    const loadAdventures = () => {
        setadventures(adventureList)
    }

    return (
        <>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'grid-margin-x'}>
                        {adventures.map(adventure => 
                        <Cell key={adventure.hostId} size={'medium-6 large-4'}>
                            <FlipCard key={adventure.id} location={adventure.location} difficulty={adventure.difficulty} duration={adventure.duration} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={adventure.imageId} title={adventure.adventureName} host={adventure.hostId} description={adventure.description}/>
                        </Cell>
                            )}
                    </Gridx>
                </div>
            </Wrapper>
        </>
    )
}

export default Adventures;