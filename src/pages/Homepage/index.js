//HOMEPAGE  this is the first page you arrive at
import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import { useHistory } from 'react-router-dom'
import API from '../../util/API'

function Homepage() {
    //tells the url what you searched for
    let history = useHistory()
    //serach input state
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([])
    //submit button click
    useEffect(()=>{
        API.getTags().then(res=>setTags(res.data)).catch(err=>console.log(err))
    }, [])
    const handleSubmit = (event) =>{
        event.preventDefault()
        history.push(`/adventures/${searchTerm.toLowerCase()}`)
    }

    const handleHostAdventureClick = () =>{
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
                            
                                <select onChange={(e)=>{setSearchTerm(e.target.value)}} className="findAdventure">
                                    <option>Adventure awaits</option>
                                    {tags ? tags.map(tag=> <option key={tag._id} value={tag.tagName}>{tag.tagName}</option>):null}
                                </select>
                                <button onClick={handleSubmit} className="button searchAdventure" > Search</button>
                            </div>
                            <button onClick={handleHostAdventureClick} className="button hostAdventure"> Host Adventure</button>
                        </div>
                    </div>
                </div>
                {/* TODO: short intro */}
                <div><p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero??</p></div>

            </Wrapper>

        </>
    )
}
export default Homepage;

