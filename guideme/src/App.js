import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Adventures from './pages/Adventures'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import Stickyfooter from './components/Stickyfooter'
import NotFound from './pages/NotFound'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <>
    <Switch>
      <Route exact path='/'>

          <Homepage/>
      </Route>
      <Route exact path='/adventures'>
        <Adventures/>
      </Route>
      <Route exact path='/profile'>
        <Profile/>
      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
    </Switch>
    <Stickyfooter />
    </>
    </Router>
  );
}

export default App;
