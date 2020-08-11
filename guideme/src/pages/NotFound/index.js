import React from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'

function NotFound () {

    return(
        <>
        <TopBar title={'Oooops'}/>
        <Wrapper>
            <p>404 not found</p>
        </Wrapper>
        <Footer/>
        </>
    )    
}

export default NotFound