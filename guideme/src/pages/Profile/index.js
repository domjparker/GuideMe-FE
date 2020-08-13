import React from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'



function Profile () {

    return(
        <>
        <TopBar title={'User profile'}/>
        <Wrapper>
            <p>Here be profile page</p>
        </Wrapper>
        <Footer/>
        </>
    )    
}

export default Profile