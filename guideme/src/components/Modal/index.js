import React from 'react'


function Modal(props) {
    const showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'

    return (
        <div className={showHideModal} id="exampleModal1" data-reveal>
            <h1>Awesome. I Have It.</h1>
            <p className="lead">Your couch. It is mine.</p>
            <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
            <button className="close-button" data-close aria-label="Close modal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Modal