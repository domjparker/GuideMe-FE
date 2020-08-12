import React, {useState} from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'


function FlipCard(props){
  const [classToggle, setClassToggle] = useState('');

  const handleClassToggle = () => {
      if (classToggle === 'card--flipped') {
          setClassToggle('')
      } else {
          setClassToggle('card--flipped')
      }
  }

return (
    <>
     <div className={"flipcard " + classToggle } onClick={handleClassToggle}>
                <div className="card__inner">
                    <div className="card__back">
                        <div className=" grid-container">
                            <Gridx>
                                <Cell size={"text-center details-heading"}>
                                    <h5>{props.title}</h5>
                                </Cell>
                                <Cell size={"small-12"}>
                                    <h6><strong>{props.host}</strong></h6>
                                    <p>{props.description}</p>
                                    <p>{props.itinerary}</p>
                                </Cell>
                            </Gridx>
                            <Gridx>
                                <Cell size={"small-7"}>
                                    <h6><strong>Smth goes here</strong></h6>
                                    <p>i am not sure yet what</p>
                                </Cell>
                                <Cell size={"small-5 p-1"}>
                                    <h6>Details</h6>
                                    <ul>
                                        <li>Group size: {props.minGroupSize}-{props.maxGroupSize} </li>
                                        <li>Duration: {props.duration.number} {props.duration.unit} </li>
                                        <li>Difficulty: {props.difficulty} </li>
                                    </ul>
                                </Cell>
                            </Gridx>
                            <Gridx>
                                <Cell size={"small-12"}>
                                    <hr />
                                    <h6><strong>Location</strong></h6>
                                    <p> {props.location} </p>
                                </Cell>
                            </Gridx>
                        </div>
                    </div>
                    <div className="card__front">
                        <Gridx>
                            <Cell size={"small-12"}>
                                <div className="card-section">
                                <img src={props.img} alt={props.title}/>
                                </div>
                                <div className="card-section">
                                  <h4>{props.title}</h4>
                                  <h5>{props.host}</h5>
                                    <p>{props.description}</p>
                                  </div>
                            </Cell>
                        </Gridx>
                    </div>
                </div>
            </div>
    </>
)}

export default FlipCard;