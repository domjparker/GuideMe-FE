//LOGIN 100% redirect route, you cannot navigate here yourself, this is displayed if needed
import React, {useState} from 'react'
import Wrapper from '../../components/Wrapper'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'
import SuccessModal from '../../components/SuccessModal'
import './style.css'

function Login (props) {
const [modalSuccess, setModalSuccess] = useState(false)
const [signin, setSignin] = useState(true)
const [signup, setSignup] = useState(false)
    const accordionClick = () =>{
        setSignin(!signin)
        setSignup(!signup)
    }
    const handleSuccessModalClose = ()=>setModalSuccess(false)

    return (
        <>
        
        <div className ='loginBackground'>
            <div className='loginForm'>
            {/* see components for more info  */}
            <button className={'accordion ' + signin} onClick={accordionClick}>Sign In</button>
            <div className='panel' style={signin?{display:'block'}:{display:'none'}}>
            <SignIn logMeIn={props.loginSuccess}/>
            </div>
            <button className={'accordion ' + signup} onClick={accordionClick}>Sign Up</button>
            <div className='panel' style={signup?{display:'block'}:{display:'none'}}>
            <SignUp changeAccordion={accordionClick} openModal={()=>setModalSuccess(true)}/>
            </div>
        </div>
        </div>
        <SuccessModal show={modalSuccess} handleModalClose={handleSuccessModalClose} text={"Sign Up Success, please log in."}/>

        </>
    )

}

export default Login;