import React from 'react'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'



function Footer(props) {

    return (
        <>
            <div className="grid-container copyright ">
                <Gridx>
                    <Cell size={''}>
                        <h6 className="text-left">{"Built With:"}
                        <li><a href="https://socket.io/">Socket.io</a></li>
                        <li><a href="https://createjs.com/">Create.js</a></li>
                        <li><a href="https://github.com/indyminhas/project2">GitHub</a></li>
                        </h6>
                    </Cell>
                    <Cell size={''}>
                        <h6 className="text-right">{"Built By:"}
                        <li><a href="https://github.com/domjparker" >Dominic Parker</a></li>
                        <li><a href="https://github.com/maria-helbling" >Maria Helbling</a></li>
                        <li><a href="https://github.com/MegaGrega" >Matthew Grega</a></li>
                        <li><a href="https://github.com/indyminhas" >Indy Minhas</a></li>
                        <li><a href="https://github.com/AndrewBergstrom" >Andrew Bergstrom</a></li>
                        </h6>
                    </Cell>
                    <Cell size={''}>
                        <h6 className="text-center">{"© 2020 GuideMe"}</h6>
                    </Cell>
                </Gridx>
            </div>
        </>
    )

}

export default Footer;