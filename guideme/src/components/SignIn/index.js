import React, { useState } from "react";
import {Redirect} from 'react-router-dom'
import "./style.css";
import {Input, FormBtn} from "../Form"
import API from '../../util/API'

function SignIn(props) {
    const [loginObj, setloginObj] = useState({email:'', password:''})
  
    const handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      let value = event.target.value;
      const name = event.target.name;
      // Updating the input's state
      setloginObj({...loginObj,
        [name]: value
      });
    };
  
    const handleFormSubmit = event => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
      if (!loginObj.email) {
        alert("Fill out email!");
        return;
      } else if (loginObj.password.length < 1) {
        alert(
          `Fill out password!`
        );
      return;
      }
      API.loginUser(loginObj).then(res=>{
        console.log(res)
        props.logMeIn()
        // setloginObj({
        //   email: "",
        //   password: ""
        // });
        return <Redirect to='/profile' />
      }
      ).catch(err=>console.log(err))
    };
  
    
      // Notice how each input has a `value`, `name`, and `onChange` prop
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