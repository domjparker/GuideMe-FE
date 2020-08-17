//Signup form --- member of the Login page component
import React, { useState } from "react";
import "./style.css";
import { Input, FormBtn } from "../Form"
import API from '../../util/API'

function SignUp() {
  //signup iobject, holds values of the input fields
  const [signupObj, setSignupObj] = useState({firstName:'', lastName:'', email:'', password:''})

//control input field values
  const handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    setSignupObj({...signupObj, [name]:value})
  };

  // makes a POST request to database for new user
  const handleFormSubmit = event => {
    event.preventDefault();

    if (!signupObj.firstName || !signupObj.lastName) {
      //TODO: use smth other than an alert here
      alert("Fill out your first and last name please!");
    } else if (signupObj.password.length < 6) {
      //TODO: use smth other than an alert here
      alert(
        `Choose a longer password!`
      );
    } else {
      //TODO: use smth other than an alert here
      alert(`Hello ${signupObj.firstName} ${signupObj.lastName}`);
      API.postNewUser(signupObj).then(res=> console.log(res)).catch(err=> console.log(err))
    }
    //reset form to empty
    setSignupObj({firstName:'', lastName:'', email:'', password:''})
  };

    return (
      <div>
        <p>
          Hello {signupObj.firstName} {signupObj.lastName}
        </p>
        <form className="signup">
          <Input
            value={signupObj.firstName}
            name="firstName"
            onChange={handleInputChange}
            type="text"
            placeholder="First Name"
          />
          <Input
            value={signupObj.lastName}
            name="lastName"
            onChange={handleInputChange}
            type="text"
            placeholder="Last Name"
          />
          <Input
            value={signupObj.email}
            name="email"
            onChange={handleInputChange}
            type="text"
            placeholder="Email"
          />
          <Input
            value={signupObj.password}
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
          />
          <FormBtn onClick={handleFormSubmit} children={'Sign Up'}/>

        </form>
      </div>
    );
}

export default SignUp;