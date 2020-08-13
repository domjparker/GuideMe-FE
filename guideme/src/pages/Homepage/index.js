import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import './style.css'

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
                            {/* <input className="findAdventure" type="search" placeholder="ie:Hiking" /> */}
                            <div className="container">
                                <form className="findAdventure">
                                    <input
                                        onChange={props.handleInputChange}
                                        value={props.value}
                                        name="search"
                                        type="text"
                                        className="form-control"
                                        placeholder="ie:Hiking"
                                        id="search"
                                    />
                                </form>
                            </div>
                            <button className="button searchAdventure" href="#"> Search</button>
                            {/* <>
                            <button className="button hostAdventure" href="#"> Host Adventure</button>
                           </> */}
                        </div>
                    </div>
                </div>
                <div><p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero??</p></div>

            </Wrapper>

        </>
    )
}
export default Homepage;

