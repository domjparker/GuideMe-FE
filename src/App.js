import React, {useState} from 'react';
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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  
  const [page, setpage] = useState('Homepage')
  //use context for this
  const [user, setuser] = useState({
    //TODO:for some reason sometimes these states get reset to false half way through a session, must fix that. Maybe the host state shouldn't live here....
    loggedIn:false, 
    host: false
  })

  const setLoginState = () => setuser({loggedIn: !user.loggedIn})
  

//TODO: switch to context
  const handlePageChange = (pageName) => {
      setpage(pageName);
  }
  

  return (
    <Router>
    <>
    {/* useLocation to display page name */}
    <TopBar title={page} loggedIn={user.loggedIn}/>
    <Switch>
      <Route exact path='/'>
          <Homepage handlePageChange={handlePageChange}/>
      </Route>
      {/* keep an eye out for edge case. Might need to delete 'exact' */}
      <Route exact path='/adventures/:tag'>    
        <Adventures handlePageChange={handlePageChange}/>

      </Route>
      <Route exact path='/adventures/'>    
        <Adventures handlePageChange={handlePageChange}/>
      </Route>
      <Route exact path='/profile'>
        <h1>Log in here</h1>
        {/* {user.loggedIn ? 
        <Profile handlePageChange={handlePageChange} loggedIn={user.loggedIn} setLoginState={setLoginState}/>
        : <Login handlePageChange={handlePageChange} loginSuccess={setLoginState}/>  } */}
      </Route>
      <Route path='*'>
        <NotFound handlePageChange={handlePageChange}/>
      </Route>
    </Switch>
    <Footer/>
    <Stickyfooter />
    </>
    </Router>
  );
}

export default App;
