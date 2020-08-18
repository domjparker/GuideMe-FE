import React, {useState, useEffect} from 'react';
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
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  let page='Find your way'
  //use context for this
  const [user, setuser] = useState({
    //TODO:for some reason sometimes these states get reset to false half way through a session, must fix that. Maybe the host state shouldn't live here....
    loggedIn:false
  })

  const setLoginState = (value) => setuser({loggedIn: value})

useEffect(()=>{
  API.getSessionData().then((res)=>{
    if(res.id){
      setLoginState(true)
    } else {
      setLoginState(false)
    }
  }).catch(err=>console.log(err))
}, [])

  return (
    <Router>
    <>
    {/* useLocation to display page name */}
    <TopBar title={page}/>
    <Switch>
      <Route exact path='/'>
          <Homepage/>
      </Route>
      {/* keep an eye out for edge case. Might need to delete 'exact' */}
      <Route exact path='/adventures/:tag'>    
        <Adventures/>

      </Route>
      <Route exact path='/adventures/'>    
        <Adventures/>
      </Route>
      <Route exact path='/profile'>
        <h1>Log in here</h1>
        {user.loggedIn ? 
        <Profile  loggedIn={user.loggedIn} setLoginState={setLoginState}/>
        : <Login loginSuccess={setLoginState}/>  }
      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
    </Switch>
    <Footer/>
    <Stickyfooter />
    </>
    </Router>
  );
}

export default App;
