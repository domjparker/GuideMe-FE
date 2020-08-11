import React from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'

function Adventures(){
    return (
        <>
            <TopBar title={'Adventures'}/>
            <Wrapper>
                <p>Here be ADventures</p>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default Adventures;