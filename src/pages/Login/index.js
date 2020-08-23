//LOGIN 100% redirect route, you cannot navigate here yourself, this is displayed if needed
import React, {useState} from 'react'
import Wrapper from '../../components/Wrapper'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'

function Login (props) {
const [signin, setSignin] = useState(true)
const [signup, setSignup] = useState(false)
    const accordionClick = () =>{
        setSignin(!signin)
        setSignup(!signup)
    }

    return (
        <>
        <Wrapper>
            {/* see components for more info  */}
            <button className={'accordion'} onClick={accordionClick}>Sign In</button>
            <div className='panel' style={signin?{display:'block'}:{display:'none'}}>
            <SignIn logMeIn={props.loginSuccess}/>
            </div>
            <button className={'accordion'} onClick={accordionClick}>Sign Up</button>
            <div className='panel' style={signup?{display:'block'}:{display:'none'}}>
            <SignUp changeAccordion={accordionClick}/>
            </div>
        </Wrapper>
        </>
    )

}

export default Login;