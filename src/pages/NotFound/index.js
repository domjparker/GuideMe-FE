//404 not found page
import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import { Link } from 'react-router-dom'


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
                <div className="link-container">
                    <Link  to="/" target="blank" className="more-link" >Back to the homepage</Link>
                </div>

            </Wrapper>
        </>
    )
}

export default NotFound