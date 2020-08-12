import React, {useState, useEffect, Lazy, Suspense} from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import adventureList from '../../fakedb/adventures.json'
import FlipCard from '../../components/FlipCard'


function Adventures(){
    const [adventures, setadventures] = useState([])

    useEffect(() => {
        loadAdventures()
    }, [])

    const loadAdventures = () => {
        setadventures(adventureList)
    }
    const toggleClass = (e) => {

    }

    return (
        <>
            <TopBar title={'Adventures'}/>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'grid-margin-x'}>
                        {adventures.map(adventure => 
                        <Cell key={adventure.hostId} size={'medium-6 large-4'}>
                            <FlipCard key={adventure.id} toggleClass={toggleClass} location={adventure.location} difficulty={adventure.difficulty} duration={adventure.duration} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} itinerary={adventure.itinerary} img={adventure.imageId} title={adventure.adventureName} host={adventure.hostId} description={adventure.description}/>
                        </Cell>
                            )}
                    </Gridx>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default Adventures;