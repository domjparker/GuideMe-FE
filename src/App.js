import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Adventures from './pages/Adventures'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import Stickyfooter from './components/Stickyfooter'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import API from './util/API'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicProfile from './pages/PublicProfile'
// import io from "socket.io-client";

import { loginContext } from './components/LoginContext'

function App() {

  
  
  let page = 'Find your way'
  //use context for this
  const [user, setuser] = useState({
    loggedIn:false
  })

  //this state is just used to make the App wait 
  const [haveData, setHaveData]=useState(false)

  const setLoginState = (value) => setuser({loggedIn: value})
  //making an object to send in as value to context by context.provider
  const loginState = {loggedIn: user.loggedIn, changeLoginState:setLoginState}

useEffect(()=>{
  //check if user is signed in
  API.getSessionData().then((res)=>{
    if(res.data.id){
      setLoginState(true)

    } else {
      setLoginState(false)
    }
    //we use this just to make sure nothing is rendered on the profile page before we have checked session status
    setHaveData(true)
  }).catch(err=>console.log(err))
}, [])

//this function checks for session data and returns the component to render dependent of whether the user is logged in or not
const renderLogIn = () => {
  if (haveData && user.loggedIn) {
    return <Profile/>
  } else if (haveData) {
   return <Login/>
  }
}
  return (
    <Router>
      <>
        {/* useLocation to display page name */}
        <TopBar title={page} />
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          {/* keep an eye out for edge case. Might need to delete 'exact' */}
          <Route exact path='/adventures/:tag'>
            <Adventures />

          </Route>
          <Route exact path='/adventures/'>
            <Adventures />
          </Route>
          <Route exact path='/profile'>
            <loginContext.Provider value={loginState}>
              {renderLogIn()}
            </loginContext.Provider>
          </Route>
          {/* <Route exact path='/publicprofile' >
            <PublicProfile userId={"5f370812e15e5cd004305fa6"}/>
          </Route> */}
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
        <loginContext.Provider value={loginState}>
          <Stickyfooter />
        </loginContext.Provider>

      </>

    </Router>
  );
}


export default App;
