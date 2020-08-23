//HOMEPAGE  this is the first page you arrive at
import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './style.css'
import Btn from '../../components/Btn'
import Wrapper from '../../components/Wrapper'
import API from '../../util/API'
import { Dropdown } from '../../components/Form'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import {stateLocation} from '../../components/StateLocations'

function Homepage() {
    //tells the url what you searched for
    let history = useHistory()
    //search input state
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermState, setSearchTermState] = useState('');
    const [tags, setTags] = useState([])
    //submit button click
    useEffect(() => {
        API.getTags().then(res => setTags(res.data)).catch(err => console.log(err))
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault()
        // send the state of searchTerm and searchTermState to the adventures page
        history.push({pathname:'/adventures', state:{tag:searchTerm.toLowerCase(), stateName:searchTermState}})
    }

    const handleHostAdventureClick = () => {
        history.push('/profile')
    }
    //TODO:change this up to use components: Btn
    return (
        <>
            <Wrapper>

                <div className="hero-section homepage">
                    <h1 className="hpTitle"><strong>GuideMe </strong></h1>
                    <div className="hero-section-text hpHeader">
                        <div className="callout">
                            {/* The search or host adventure form on home page */}
                            <div className="grid-container searchBox">
                                <Gridx>
                                    <Cell size={'small-6 large-4'}>
                                <select onChange={(e) => { setSearchTerm(e.target.value) }} className="findAdventure">
                                    <option>Activity</option>
                                    {tags ? tags.map(tag => <option key={tag._id} value={tag.tagName}>{tag.tagName}</option>) : null}
                                </select>
                                    </Cell>
                                    <Cell size={'small-6 large-4'}>
                                <select onChange={(e) => { setSearchTermState(e.target.value)}} value={searchTermState} className="findAdventure">
                                    <option>Location</option>
                                    {stateLocation ? stateLocation.map(state=> <option key={stateLocation.indexOf(state)} value={state}>{state}</option>) : null}
                                </select>
                                    </Cell>
                                    <Cell size={'small-12 large-4'}>
                                <Btn onClick={handleSubmit} classes={'button searchAdventure'} text={"Search"} />

                                    </Cell>
                                <Cell size={'hostAdventureDiv'}>
                                    <Link to={'/profile'} classes={"hostAdventure"}>Host an adventure</Link>
                                </Cell>
                                </Gridx>
                            </div>
                        </div>
                    </div>
                </div>

                <article >
                    <div className="howToUse grid-container">
                        <Gridx>
                            <Cell size={'small-12'}>
                            <h1 className="introLine text-center"><strong>Welcome to GuideMe!</strong></h1>
                            <p className="introduction"><strong>If you’re the kind of traveler that loves finding those off the beaten path adventures, here is where you meet like minded people to share unforgetable travels together.</strong></p>
                            </Cell>
                            <Cell size={'small-12 medium-6 instructions'}>
                            <h2 className={"text-center"} style={{color:'#FF6700'}}><strong><span style={{color:'#FF6700'}} class="material-icons">public</span></strong></h2>
                            <h2 className="guideTitle text-center"><strong>Explorers</strong></h2>
                            <ul>
                            <li> On the homepage select the kind of activity you’re looking for from the ‘Adventure awaits’ drop down menu.
                           </li>
                           
                            <li>
                              You'll need an account to book an adventure or host an adventure.
                            </li>
                            
                            <li> Creating an account is easy, just click  the hiker icon at the bottom and fill out the required fields
                            </li>
                           </ul>
                            </Cell>
                            <Cell size={'small-12 medium-6 instructions'}>
                            <h2 className={"text-center"} style={{color:'#FF6700'}}><strong><span style={{color:'#FF6700'}} class="material-icons">explore</span></strong></h2>
                           <h2 className="guideTitle text-center"><strong>Guides</strong></h2>
                           <ul>
                           <li>
                                    Host an adventure! After logging in you will be redirected to your profile page. 
                           </li>
                           
                           <li>
                           As guide, from your profile page you can 'Create an Adventure'.
                           </li>
                           
                           <li>Fill out the adventure form, and don't forget to add a tag, that's how other users can find your activity.  
                           </li>
                            </ul>
                            </Cell>
                        </Gridx>
                    </div>
                </article>

            </Wrapper>

        </>
    )
}
export default Homepage;

