//signin form -- member of the Login page component
import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import "./style.css";
import { Input, FormBtn } from "../Form"
import API from '../../util/API'

function SignIn(props) {
  //set state of input field values  
  const [loginObj, setloginObj] = useState({email:'', password:''})
  //control form input field values
    const handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      let value = event.target.value;
      const name = event.target.name;
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
        alert("Fill out email!");
        return;
      } else if (loginObj.password.length < 1) {
        //TODO:use something other than alert here please
        alert(
          `Fill out password!`
        );
      return;
      }
      API.loginUser(loginObj).then(res=>{
        console.log(res)
        props.logMeIn()
        //upon successfule login, send me to profile page
        //TODO:make it so that it sends you back to where you came from
        return <Redirect to='/profile' />
      }
      ).catch(err=>console.log(err))
    };
  
      return (
        <div>
          <p>
            Welcome Back!
          </p>
          <form className="signin">
            <Input
              value={loginObj.email}
              name="email"
              onChange={handleInputChange}
              type="text"
              placeholder="Email"
            />
            <Input
              value={loginObj.password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
            />
            <FormBtn onClick={handleFormSubmit} children={'Sign in'}/>
          </form>
        </div>
      );
      
    }
export default SignIn;