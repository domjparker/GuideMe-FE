//404 not found page
import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'


function NotFound (props) {
     //tells the TopBar what page to display at top
    const {handlePageChange}=props
    handlePageChange("Lost in the woods")
    
    return(
        <>
        <Wrapper>
            <p>404 not found</p>
        </Wrapper>
        </>
    )    
}

export default NotFound