import React from 'react'
import './style.css'
import Btn from '../Btn'
import Adventure from '../Adventure'


function Modal(props) {
    
    let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
    
    const handleModalClose = () => {
        showHideModal = 'reveal d-none'
    }

    return (
        <div className={showHideModal} id="exampleModal1">
            <Adventure/>
        </div>
        )
        {/* <h1>{props.title}</h1>
        <p className="lead">{props.intro}</p> */}
        {/* <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/> */}
    {/* </div> */}
}

export default Modal