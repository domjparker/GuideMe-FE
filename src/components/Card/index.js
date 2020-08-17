//generic card component
//TODO: check if unused adn delete!!!!
import React from 'react'
import './style.css'


function Card(props){

return (
    <>
     <div className="card">
        <img src={props.img} alt={props.title}/>
        <div className="card-section">
        <h4>{props.title}</h4>
        <h5>{props.host}</h5>
          <p>{props.description}</p>
        </div>
      </div>
    </>
)}

export default Card;