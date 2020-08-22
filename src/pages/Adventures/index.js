//ADVENTURES this page diplays all adventures subject to search filters

import React, {useState, useEffect, Lazy, Suspense} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import FlipCard from '../../components/FlipCard'
import API from '../../util/API'
import { useParams } from 'react-router-dom'
import StarRating from '../../components/StarRating'

function Adventures(){
    //tags that show what was searched
    let {tag} =  useParams()
    
    //list of relevant adventures
    const [adventures, setAdventures] = useState([])
    //load adventures on page load

    useEffect(() => {
        loadAdventures(tag)
    }, [])
    //API call to adventures db
    //TODO:here we need to implement the actual search functionality so not all adventures are alwasy shown
    const loadAdventures = async (criteria) => {

        const {data} = await API.getAllAdventures()
        let adventureArr = [...data]
        if (criteria) {
            adventureArr=adventureArr.filter(adventure=> adventure.tags.map(tag=>tag=tag.tagName).indexOf(criteria)>=0)
        }
        setAdventures(adventureArr)
    }

    return (
        <>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'grid-margin-x grid-margin-y'}>
                        {/* This puts the adventures on the page, see FlipCard for more info */}
                        {(adventures.length)? adventures.map(adventure => 
                        <Cell key={adventure.hostId + " " + adventure._id} size={'medium-6 large-4'}>
                            <FlipCard key={adventure._id} location={adventure.location} number={adventure.duration.time} unit={adventure.duration.unit} difficulty={adventure.difficulty} maxGroupSize={adventure.maxGroupSize} minGroupSize={adventure.minGroupSize} tags={adventure.tags.map(item=>item.tagName)} itinerary={adventure.itinerary} img={adventure.adventureImageUrl? adventure.adventureImageUrl : "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg"} title={adventure.adventureName} host={adventure.hostId.firstName + " " + adventure.hostId.lastName} description={adventure.description} hostId = {adventure.hostId._id}/>
                        </Cell>
                            ) : null}
                    </Gridx>
                </div>
            </Wrapper>
        </>
    )
}

export default Adventures;



