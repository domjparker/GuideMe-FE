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
import io from "socket.io-client";

import { loginContext } from './components/LoginContext'

function App() {

  
  
  let page = 'Find your way'
  //use context for this
  const [user, setuser] = useState({
    //TODO:for some reason sometimes these states get reset to false half way through a session, must fix that. Maybe the host state shouldn't live here....

  })
  const [haveData, setHaveData] = useState(false)
  

  const setLoginState = (value) => setuser({ loggedIn: value })
  const loginState = { loggedIn: user.loggedIn, changeLoginState: setLoginState }

  useEffect(() => {
    API.getSessionData().then((res) => {
      if (res.data.id) {
        setLoginState(true)
        console.log("we got here")
        // loginState.socket.emit('login', res.data.id)
      } else {
        setLoginState(false)
      }
      setHaveData(true)
    }).catch(err => console.log(err))
  }, [])

  const renderLogIn = () => {
    if (haveData && user.loggedIn) {
      return <Profile />
    } else if (haveData) {
      return <Login />
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
