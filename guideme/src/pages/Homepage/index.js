import React from 'react'
import './style.css'
// import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'

function Homepage(){
    return (
        <>
         <img data-interchange="[assets/img/interchange/small.jpg, small], [assets/img/interchange/medium.jpg, medium], [assets/img/interchange/large.jpg, large]" alt="test"></img>
            {/* <TopBar title={'Adventures'}/> */}
            <Wrapper>
                <p>Here be Da Homepage</p>
               
            </Wrapper>
        </>
    )
}
export default Homepage;