//ADVENTURES this page diplays all adventures subject to search filters

import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import FlipCard from '../../components/FlipCard'
import API from '../../util/API'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


function Adventures(){
    //tags that show what was searched
    let {tag} =  useParams()
    
    //list of relevant adventures
    const [adventures, setAdventures] = useState([])
    const [searchTerm, setSearchTerm] = useState(tag);
    const [tags, setTags] = useState([])
    
    
    //load adventures on page load
    useEffect(() => {
        loadAdventures(searchTerm)
    }, [searchTerm])
    
    //API call to adventures db
    //Filter adventures based on tags matching search criteria
    const loadAdventures = async (criteria) => {
        const {data} = await API.getAllAdventures()
        let adventureArr = [...data]
        if (criteria) {
            adventureArr=adventureArr.filter(adventure=> adventure.tags.map(tag=>tag=tag.tagName).indexOf(criteria)>=0)
        }
        setAdventures(adventureArr)
    }

    //submit button click
    useEffect(() => {
        API.getTags().then(res => setTags(res.data)).catch(err => console.log(err))
    }, [])



    return (
        <>
            <Wrapper>
            <div className="calloutAdventures">
                            {/* The search or host adventure form on home page */}
                            <div className="container searchBoxAdventures">
                                <select onChange={(e) => { setSearchTerm(e.target.value)}} value={searchTerm} className="findAdventureAdventure">
                                    <option>Adventure awaits</option>
                                    {tags ? tags.map(tag => <option key={tag._id} value={tag.tagName}>{tag.tagName}</option>) : null}
                                </select>
                                <select onChange={(e) => { setSearchTerm(e.target.value)}} value={searchTerm} className="findAdventureAdventure">
                                    <option>Adventure awaits</option>
                                    {tags ? tags.map(tag => <option key={tag._id} value={tag.tagName}>{tag.tagName}</option>) : null}
                                </select>
                            </div>
                        </div>

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



