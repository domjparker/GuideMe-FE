//the top bar, displaying logo and page name
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'
import LOGO from '../../images/logot.png'
import {loginContext} from '../LoginContext'
import API from '../../util/API'

function TopBar(props) {
    const loginState = useContext(loginContext)

    const renderSignInLogIn = () =>{
        if (loginState.loggedIn) {
            return <Link to={'/profile'} ><i className="fas fa-sign-out-alt signout" onClick ={signOut} ></i></Link>
        } else {
            return <Link to={"/profile"}><i className="fas fa-sign-in-alt signout" ></i></Link>
        }
    }

    const signOut = ()=> {
        API.logOutUser()
        loginState.changeLoginState(false)
    }

    return (
        <>
            <div className="grid-container full" id="topBar">
                <Gridx>
                    <Cell size={'small-3'} id="logo">
                        <Link to="/"><h6 className="text-left"><img className="fixingHeight" src={LOGO} alt="logo"></img></h6></Link>
                    </Cell>
                    <Cell size={'small-6'} id="pageTitle">
                        <h1 className="text-center ">{props.title}</h1>
                    </Cell>
                    <Cell size={'small-2 text-right'}>
                        <h6>
                        {renderSignInLogIn()}
                        </h6>
                    </Cell>
                
                </Gridx>
            </div>
        </>
    )

}

export default TopBar;