import React, { Component } from "react";
import "./style.css";
import {Input, TextArea, FormBtn} from "../Form"

class SignIn extends Component {
    // Setting the component's initial state
    state = {
      email: "",
      password: ""
    };
  
    handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      let value = event.target.value;
      const name = event.target.name;
  
      if (name === "password") {
        value = value.substring(0, 15);
      }
      // Updating the input's state
      this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
      if (!this.state.email) {
        alert("Fill out email!");
      } else if (this.state.password.length < 6) {
        alert(
          `Fill out password ${this.state.email}`
        );
      } 
  
      this.setState({
        email: "",
        password: ""
      });
    };
  
    render() {
      // Notice how each input has a `value`, `name`, and `onChange` prop
      return (
        <div>
          <p>
            Welcome Back!
          </p>
          <form className="signin">
            <Input
              value={this.state.email}
              name="email"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Email"
            />
            <Input
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password"
            />
            <FormBtn onClick={this.handleFormSubmit}>Submit</FormBtn>
          </form>
        </div>
      );
    }
  }
  
  export default SignIn;