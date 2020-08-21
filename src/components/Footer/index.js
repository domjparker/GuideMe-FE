//generic footer component, will be at the bottom of every page and include info about the site in general
import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'



function Footer(props) {

    return (
        <>
            <div className="grid-container copyright full" id="Footer">
                <Gridx>
                    <Cell size={'medium-6'}>
                        <h6 className="text-center">{"Built By:"}
                        <ul>
                            <a href="https://github.com/domjparker" target="_blank" rel="noopener noreferrer" >Dominic Parker</a>
                            <br></br>
                            <a href="https://github.com/maria-helbling" target="_blank"rel="noopener noreferrer" >Maria Helbling</a>
                            <br></br>
                            <a href="https://github.com/MegaGrega" target="_blank" rel="noopener noreferrer">Matthew Grega</a>
                            <br></br>
                            <a href="https://github.com/indyminhas" target="_blank" rel="noopener noreferrer">Indy Minhas</a>
                            <br></br>
                            <a href="https://github.com/AndrewBergstrom" target="_blank" rel="noopener noreferrer">Andrew Bergstrom</a>
                        </ul>   
                        </h6>
                    </Cell>

                    <Cell size={'medium-6'}>
                        <h6 className="text-center">{"Built With:"}
                        <ul>
                            <a href="https://socket.io/" target="_blank" rel="noopener noreferrer">Socket.io</a>
                            <br></br>
                            <a href="https://github.com/domjparker/GuideMe-FE" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                        </ul>
                        </h6>
                    </Cell>
                    <Cell size={'medium-12'}>
                        <h6 className="text-center">{"© 2020 GuideMe"}</h6>
                    </Cell>
                </Gridx>
            </div>
        </>
    )
}

export default Footer;