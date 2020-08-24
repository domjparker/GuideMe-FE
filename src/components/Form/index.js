//generic form building blocks live here
import React from 'react';
import './style.css'


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
      <textarea className="form-control" rows="3" {...props} />
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
  
export function Dropdown(props) {
  return (
    <select onChange={props.onChange} name={props.name} className="select">
      {props.intro? <option>{props.intro}</option>:null}
      {props.options.map(opt => <option value={opt}>{opt}</option>)}
    </select>
  )
}

export function NumberInput(props) {
  return(
    <div className="input-group">
      <div className="input-group-button">
        <input onClick={props.decrement} name={props.name} type="button" className="button" value="-" />
      </div>
      <input name={props.name} className="input-group-field" type="number" min="0" value={props.value}  />
      <div className="input-group-button">
        <input onClick={props.increment} name={props.name} type="button" className="button" value="+" />
      </div>
    </div>
  )
}


  

