//the top bar, displaying logo and page name
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'
import LOGO from '../../images/logot.png'
import {loginContext} from '../LoginContext'
import API from '../../util/API'
import {useLocation, useHistory} from 'react-router-dom'

function TopBar(props) {
    let history = useHistory()
    //sret the title to location
    const location=useLocation()
    let title;
    switch(location.pathname) {
        case '/' :
        title= ''
        break;
        case '/adventures':
        title=''
        break;
        case '/profile':
        title= ''
        break;
        case '/community':
        title=''
        break;
        case '/public':
        title=''
        break;
        default:
        title='Lost in the Woods'


    }


    const loginState = useContext(loginContext)
    const renderSignInLogIn = () =>{
        if (loginState.loggedIn) {
            return <div className='text-center signoutDiv' ><i className="fas fa-sign-out-alt signout" onClick ={signOut} > </i></div>
        } else {
            return <div className='text-center signoutDiv' ><i className="fas fa-sign-in-alt signout"onClick ={reDirect} ></i></div>
        }
    }

    const signOut = ()=> {
        API.logOutUser()
        loginState.changeLoginState(false)
        history.push('/')
    }
    const reDirect = () => {
        history.push('/profile')
    }

    return (
        <>
            <div className="grid-container full" id="topBar">
                <Gridx classes={'grid-padding-x'}>
                    <Cell size={'small-3 medium-2'} id="logo">
                        <Link to="/"><h6 className="text-center"><img className="fixingHeight" src={LOGO} alt="logo"></img></h6></Link>
                    </Cell>
                    <Cell size={'small-6 medium-8'} id="pageTitle">
                        <h1 className="text-center navText">{title}</h1>
                    </Cell>
                    <Cell size={'small-3 medium-2 loginCell'}>
                        {renderSignInLogIn()}
                    </Cell>
                
                </Gridx>
            </div>
        </>
    )

}

export default TopBar;