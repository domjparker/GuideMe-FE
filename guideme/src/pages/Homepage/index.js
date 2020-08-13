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
                <div>
                    <div className="hero-section homepage">
                        <div className="hero-section-text hpHeader">
                            <h1 className="hpTitle"><strong>GuideMe </strong></h1>
                            <button className="button   findAdventure" href="#">Find an Adventure</button>
                            <button className="button hostAdventure" href="#"> Host an Adventure</button>
                        </div>
                    </div>
                    <div><p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, necessitatibus reiciendis laudantium dolore, aperiam aliquid obcaecati optio rerum illum eaque aliquam fugit mollitia nemo quasi magnam accusantium animi sunt libero??</p></div>
                </div>
            </Wrapper>

        </>
    )
}
export default Homepage;

