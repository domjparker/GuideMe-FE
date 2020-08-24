//the bottom nav bar on the bottom of your page
import React, { useState, useContext, useEffect } from 'react'
import './style.css'
import { Link, useLocation } from 'react-router-dom'
import Gridx from '../Gridx'
import Cell from '../Cell'
import Mailbox from '../Mailbox'

function Stickyfooter(props) {
    const location=useLocation()
    const [currentTab, setCurrentTab] = useState({})
    useEffect(() => {
        
        switch(location.pathname) {
        
            case '/adventures':
            setCurrentTab({adventures:true})
            break;
            // case '/profile':
            //     setCurrentTab({profile:true})
            // break;
            // case '/community':
            //     setCurrentTab({community:true})
            // break;
            // case '/public':
            
            // break;
            default:
            console.log('whaaat?')
        }    
    }, [location.pathname])
    

    const [showMailbox, setShowMailbox] = useState(false)

    const handleMailboxOpen = () => {
        setShowMailbox(true)
    }
    const handleMailboxClose = () => {
        setShowMailbox(false)
    }

    return (<>

        <div className="grid-container full" id="stickyFooter">
            <Gridx>
                {(showMailbox === false) ? null : <Mailbox close={handleMailboxClose} />}
                <Cell size={'small-3 text-left' + (currentTab.adventures ? ' currentTab' : '')} >
                    <Link to="/adventures"><i className="fas fa-search search"></i></Link>
                </Cell>
                <Cell size={'small-3 text-right' + (props.loggedIn ? ' loggedIn' : '')} id="profileIcon">
                    <Link to={'/profile'} ><i className="fas fa-hiking hiking"></i></Link>
                </Cell>
                <Cell size={'small-3'}>
                    <Link to={'/community'} ><i className="fas fa-users community"  ></i></Link>
                </Cell>
                <Cell size={'small-3'} id="messages">
                    <button className="messageBtn" onClick={handleMailboxOpen}><i className="far fa-envelope"></i></button>
                </Cell>
            </Gridx>
        </div>
    </>)
}

export default Stickyfooter;