//404 not found page
import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'


function NotFound() {

    return (
        <>
            <br></br>
            <br></br>
            <Wrapper>
                
                <p className="zoom-area"> </p>
                 <section className="error-container errorpage">
                    <span>4</span>
                    <span><span claclassNamess="screen-reader-text">0</span></span>
                    <span>4</span>
                </section>
                <div class="link-container">
                    <a target="blank" href="/" className="more-link">Back to the homepage</a>
                </div>

            </Wrapper>
        </>
    )
}

export default NotFound