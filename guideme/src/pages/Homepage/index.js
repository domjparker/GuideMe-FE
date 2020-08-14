import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'

function Homepage(props) {
    const { handlePageChange } = props
    handlePageChange("GuideMe")

    
    return (
        <>
            <Wrapper>

                <div className="hero-section homepage">
                    <h1 className="hpTitle"><strong>GuideMe </strong></h1>
                    <div className="hero-section-text hpHeader">
                        <div className="callout">
                          
                            <div className="container searchBox">
                                <form className="findAdventure">
                                    <input
                                        onChange={props.handleInputChange}
                                        value={props.value}
                                        name="search"
                                        type="text"
                                        className="form-control searchBarShadow "
                                        placeholder="ie:Hiking"
                                        id="search"
                                    />
                                </form>
                                <button className="button searchAdventure" href="#"> Search</button>
                            </div>
                           
                            
                            <button className="button hostAdventure" href="#"> Host Adventure</button>
                           
                        </div>
                    </div>
                </div>
                <div><p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero??</p></div>

            </Wrapper>

        </>
    )
}
export default Homepage;

