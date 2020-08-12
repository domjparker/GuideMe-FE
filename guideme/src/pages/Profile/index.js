import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'


function Profile (props) {
    const {handlePageChange}=props
    handlePageChange("Profile")
    return(
        <>
        <Wrapper>
            <p>Here be profile page</p>
        </Wrapper>
        </>
    )    
}

export default Profile