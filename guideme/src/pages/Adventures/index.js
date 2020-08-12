import React, {useState, useEffect} from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import Card from '../../components/Card'
import adventureList from '../../fakedb/adventures.json'


function Adventures(){
    const [adventures, setadventures] = useState([])

    useEffect(() => {
        loadAdventures()
    }, [])

    const loadAdventures = () => {
        setadventures(adventureList)
    }

    return (
        <>
            <TopBar title={'Adventures'}/>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'grid-margin-x'}>
                        {adventures.map(adventure => 
                        <Cell size={'medium-6 large-4'}>
                            <Card key={adventure.id} img={''} title={adventure.adventureName} host={adventure.hostId} description={adventure.description}/>
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