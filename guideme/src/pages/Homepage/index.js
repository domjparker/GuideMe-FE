import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'


import HomepageImg from '../../images/homepage.jpg'

function Homepage(props){
    const {handlePageChange}=props
    handlePageChange("GuideMe")

    
    return (
        <>
            <Wrapper>
                <p>Here be Da Homepage</p>
                <img className="homebackgrnd"src={HomepageImg} alt="homepagepic"/>
            </Wrapper>

        </>
    )
}
export default Homepage;