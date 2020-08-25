//Signup form --- member of the Login page component
import React, { useState } from "react";
import "./style.css";
import { Input, FormBtn } from "../Form"
import API from '../../util/API'

function SignUp(props) {
  //signup iobject, holds values of the input fields
  const [signupObj, setSignupObj] = useState({ firstName: '', lastName: '', email: '', password: '' })

  //control input field values
  const handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    if (name === 'email') value = value.toLowerCase()
    setSignupObj({ ...signupObj, [name]: value })
  };

  // makes a POST request to database for new user
  const handleFormSubmit = event => {
    event.preventDefault();
    API.postNewUser(signupObj).then(res => {
      console.log(res)
      props.changeAccordion()
    }).catch(err => console.log(err))
    //reset form to empty
    setSignupObj({ firstName: '', lastName: '', email: '', password: '' })
  };

  return (
    <div>
      <form className="signup" onSubmit={handleFormSubmit}>
        <Input
          value={signupObj.firstName}
          name="firstName"
          onChange={handleInputChange}
          type="text"
          placeholder="First Name"
          required
        />
        <Input
          value={signupObj.lastName}
          name="lastName"
          onChange={handleInputChange}
          type="text"
          placeholder="Last Name"
          required
        />
        <Input
          value={signupObj.email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          required
        />
        <Input
          value={signupObj.password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          minlength="6"
        />
        <FormBtn children={'Sign Up'} />

      </form>
    </div>
  );
}

export default SignUp;