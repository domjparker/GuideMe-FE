import React, {useState} from 'react'
import Wrapper from '../../components/Wrapper'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'

function Login (props) {
    const {handlePageChange}=props
    handlePageChange("Login")

    return (
        <>
        <Wrapper>
            <SignUp/>
            <SignIn logMeIn={props.loginSuccess}/>
        </Wrapper>
        </>
    )
}

export default Login