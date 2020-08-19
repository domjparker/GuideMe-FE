//LOGIN 100% redirect route, you cannot navigate here yourself, this is displayed if needed
import React from 'react'
import Wrapper from '../../components/Wrapper'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'

function Login (props) {

    return (
        <>
        <Wrapper>
            {/* see components for more info  */}
            <SignUp/>
            <SignIn logMeIn={props.loginSuccess}/>
        </Wrapper>
        </>
    )

}

export default Login;