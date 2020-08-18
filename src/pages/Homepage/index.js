//HOMEPAGE  this is the first page you arrive at
import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import { useHistory } from 'react-router-dom'



function Homepage(props) {
    //tells the TopBar what page to display at top
    const  {handlePageChange}  = props
    handlePageChange("GuideMe")
    //tells the url what you searched for
    let history = useHistory()
    //serach input state
    const [searchTerm, setSearchTerm] = React.useState('');
    //submit button click
    const handleSubmit = (event) =>{
        event.preventDefault()
        history.push(`/adventures/${searchTerm.toLowerCase()}`)
    }
    //TODO:change this up to use components: Input, Btn
    return (
        
        <>
            <Wrapper>

                <div className="hero-section homepage">
                    <h1 className="hpTitle"><strong>GuideMe </strong></h1>
                    <div className="hero-section-text hpHeader">
                        <div className="callout">
                          {/* The search or host adventure form on home page */}
                            <div className="container searchBox">
                            
                                <select onSubmit={handleSubmit} className="findAdventure">
                                
                                    <input
                                        onChange={(e)=>{setSearchTerm(e.target.value)}}
                                        value={searchTerm}
                                        name={searchTerm}
                                        id="search"
                                    />
                                        <option>Adventure awaits</option>
                                        <option value="hiking">Hiking</option>
                                        <option value="mountain biking">Mountain Biking</option>
                                        <option value="rock climbing">Rock climbing</option>
                                        <option value="backpacking">Backpacking</option>
                                </select>
                                <button onClick={handleSubmit} className="button searchAdventure" > Search</button>
                            </div>
                           
                            
                            <button className="button hostAdventure"> Host Adventure</button>
                           
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

