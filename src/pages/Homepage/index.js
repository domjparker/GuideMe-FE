//HOMEPAGE  this is the first page you arrive at
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
import Btn from '../../components/Btn'
import Wrapper from '../../components/Wrapper'
import API from '../../util/API'

function Homepage() {
    //tells the url what you searched for
    let history = useHistory()
    //serach input state
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([])
    //submit button click
    useEffect(() => {
        API.getTags().then(res => setTags(res.data)).catch(err => console.log(err))
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault()
        // history.push(`/adventures/${searchTerm.toLowerCase()}`)
        history.push({pathname:'/adventures', state:{tag:searchTerm.toLowerCase()}})
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
                            <div className="container searchBox">

                                <select onChange={(e) => { setSearchTerm(e.target.value) }} className="findAdventure">
                                    <option>Adventure awaits</option>
                                    {tags ? tags.map(tag => <option key={tag._id} value={tag.tagName}>{tag.tagName}</option>) : null}
                                </select>
                                <Btn onClick={handleSubmit} classes={'button searchAdventure'} text={"Search"} />
                            </div>
                            <Btn onClick={handleHostAdventureClick} classes={"button hostAdventure"} text={ "Host Adventure"}/>
                        </div>
                    </div>
                </div>
                {/* TODO: short intro */}

                <article >
                    <div className="howToUse">
                        <span className="firstChar">W</span><br></br><h1 className="introLine"><strong>elcome to GuideMe!</strong></h1>

                        <p className="introduction"><strong>
                            An easy way to choose your own adventure.
                           
                       <br /> If you’re the kind of traveler that loves finding those off the beaten path excursions:
                      <div className="instructions">
                        <ul>
                            <li> On the homepage select the kind of activity you’re looking for from the ‘Adventure awaits’ drop down menu.
                           </li>
                           <br/>
                            <li>
                                    You'll need an account to book an adventure or host an adventure.
                            </li>
                            <br/>
                            <li> Creating an account is easy, just click  the hiker icon at the bottom and fill out the required fields
                            </li>
                           </ul>
                           <h2 className="guideTitle"><strong>Guides,</strong></h2>
                           <ul>
                           <li>
                                    Host an adventure! After logging in you will be redirected to your profile page. 
                           </li>
                           <br/>
                           <li>
                           As guide, from your profile page you can 'Create an Adventure'.
                           </li>
                           <br />
                           <li>Fill out the adventure form, and don't forget to add a tag, that's how other users can find your activity.  
                           </li>
                
                           <br />
                           <h3> <strong>If you need to get back to the homepage from anywhere on the site, just click the logo on the top left.</strong></h3>
                            </ul>
                        </div>
            
                        </strong>
                        </p>
                    </div>
                </article>

            </Wrapper>

        </>
    )
}
export default Homepage;

