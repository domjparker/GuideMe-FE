//LOGOUT 100% redirect route, you cannot navigate here yourself, this is displayed if needed
import React from 'react'
import Wrapper from '../../components/Wrapper'
import SignOut from '../../components/SignOut'

function LogOut (props) {

    return (
        <>
        <Wrapper>
            {/* see components for more info  */}
            <SignOut logMeOut={props.logoutSuccess}/>
        </Wrapper>
        </>
    )

}

export default LogOut;