//generic form building blocks live here
import React from 'react';


//TODO: need dropdown, number increment etc components too!
export function Input(props) {
    return (
      <div className="form-group">
        <input className="form-control" {...props} />
      </div>
    );
  }
  
  export function TextArea(props) {
    return (
      <div className="form-group">
        <textarea className="form-control" rows="5" {...props} />
      </div>
    );
  }
  
  export function FormBtn(props) {
    return (
      <button {...props} style={{ float: "right", marginBottom: 10 }} className="button success">
        {props.children}
      </button>
    );
  }
  



  

