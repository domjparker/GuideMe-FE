//generic delete btn component X
import React from "react";
import "./style.css";


function Availability(props) {

    
  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default Availability;
