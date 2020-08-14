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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [page, setpage] = useState('Homepage')
  const [user, setuser] = useState({
    loggedIn:false,
    host:false
  })

  useEffect(() => {
    
  }, [user.loggedIn])
  const setLoginState = () => setuser({...user, loggedIn: !user.loggedIn})
  const setHostState = () => setuser({...user, host:!user.host})


  const handlePageChange = (pageName) => {
      setpage(pageName);
  }
  return (
    <Router>
    <>
    <TopBar title={page} loggedIn={user.loggedIn} host={user.host}/>
    <Switch>
      <Route exact path='/'>
          <Homepage handlePageChange={handlePageChange}/>
      </Route>
      <Route exact path='/adventures'>    
        <Adventures handlePageChange={handlePageChange}/>
      </Route>
      <Route exact path='/profile'>
        {user.loggedIn ? 
        <Profile handlePageChange={handlePageChange} loggedIn={user.loggedIn} host={user.host} setLoginState={setLoginState} setHostState={setHostState}/>
        : <Login handlePageChange={handlePageChange} loginSuccess={setLoginState}/>  }
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
