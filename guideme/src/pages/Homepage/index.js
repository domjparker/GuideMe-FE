import React, {useState} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import { Redirect, useHistory } from 'react-router-dom'



function Homepage(props) {
    let history = useHistory()
    const  {handlePageChange}  = props
    handlePageChange("GuideMe")

    const [searchTerm, setSearchTerm] = React.useState('');


    const handleSubmit = (event) =>{
        event.preventDefault()
        history.push(`/adventures/${searchTerm.toLowerCase()}`)
    }
    
    return (
        <>
            <Wrapper>

                <div className="hero-section homepage">
                    <h1 className="hpTitle"><strong>GuideMe </strong></h1>
                    <div className="hero-section-text hpHeader">
                        <div className="callout">
                          
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
                <div><p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero??</p></div>

            </Wrapper>

        </>
    )
}
export default Homepage;

