import React from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'

import HomepageImg from '../../images/homepage.jpg'

function Homepage(){
    return (
        <>
        
            <TopBar title={'Adventures'}/>
            <Wrapper>
                <p>Here be Da Homepage</p>
                <img className="homebackgrnd"src={HomepageImg} alt="homepagepic"/>
            </Wrapper>
            <Footer />
        </>
    )
}
export default Homepage;