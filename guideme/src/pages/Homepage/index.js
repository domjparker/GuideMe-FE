import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Images from '../../images/homepage.jpg'
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
                            <h1 className="hpTitle"><strong>GuideME </strong></h1>
                        </div>
                    </div>
                </div>
            </Wrapper>

        </>
    )
}
export default Homepage;

