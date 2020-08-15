import React, { useState } from "react";
import "./style.css";
import { Input, FormBtn } from "../Form"
import API from '../../util/API'
function SignUp() {

  const [signupObj, setSignupObj] = useState({firstName:'', lastName:'', email:'', password:''})


  const handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    setSignupObj({...signupObj, [name]:value})
  };

  const handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!signupObj.firstName || !signupObj.lastName) {
      alert("Fill out your first and last name please!");
    } else if (signupObj.password.length < 6) {
      alert(
        `Choose a longer password!`
      );
    } else {
      alert(`Hello ${signupObj.firstName} ${signupObj.lastName}`);
      API.postNewUser(signupObj).then(res=> console.log(res)).catch(err=> console.log(err))
    }

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