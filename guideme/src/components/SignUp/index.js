import React, { Component } from "react";
import "./style.css";
import { Input, TextArea, FormBtn } from "../Form"

function SignUp() {
  // Setting the component's initial state
  state = {
    firstName: "",
    lastName: "",
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
    if (!this.state.firstName || !this.state.lastName) {
      alert("Fill out your first and last name please!");
    } else if (this.state.password.length < 6) {
      alert(
        `Choose a more secure password ${this.state.firstName} ${this.state
          .lastName}`
      );
    } else {
      alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    }

    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  };

  render(); {
    return (
      <div>
        <p>
          Hello {this.state.firstName} {this.state.lastName}
        </p>
        <form className="signup">
          <Input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First Name"
          />
          <Input
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last Name"
          />
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

export default SignUp;