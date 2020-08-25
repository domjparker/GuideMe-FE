//signin form -- member of the Login page component
import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom'
import "./style.css";
import { Input, FormBtn } from "../Form"
import API from '../../util/API'
import {loginContext} from '../LoginContext'




function SignIn(props) {
  let history = useHistory();
  //grab the value passed by context provider
  const loginState = useContext(loginContext)
  //set state of input field values  
  const [loginObj, setloginObj] = useState({email:'', password:''})
  //control form input field values
    const handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      let value = event.target.value;
      const name = event.target.name;
      if (name === 'email') value=value.toLowerCase()
      // Updating the input's state
      setloginObj({...loginObj,
        [name]: value
      });
    };
  //make login post request to db to verify user info
    const handleFormSubmit = event => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
      if (!loginObj.email) {
        //TODO:use something other than alert here please
       
        return;
      } else if (loginObj.password.length < 1) {
        //TODO:use something other than alert here please
        alert(
          `Fill out password!`
        );
      return;
      }
      API.loginUser(loginObj).then(res=>{

        loginState.changeLoginState(true)
        //upon successful login, send me to profile page

        history.push("/profile")
      }
      ).catch(err=>console.log(err))
    };
  
      return (
        <div className='fillPage'>
          <form className="signin" onSubmit={handleFormSubmit}>
            <Input
              value={loginObj.email}
              name="email"
              onChange={handleInputChange}
              type="text"
              placeholder="Email"
              required             
            />
            <Input
              value={loginObj.password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              required
            />
            
            <FormBtn  children={'Sign in'}/>
          </form>
        </div>
      );
      
    }
export default SignIn;