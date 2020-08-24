//FlipCard, used for adventures in both search results and profile page
import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
import Gridx from '../Gridx'
import Cell from '../Cell'
import Btn from '../Btn'
import PopupChat from '../../components/PopupChat'
import API from '../../util/API'
import TagRow from '../TagRow'
import { loginContext } from '../LoginContext'
import Booking from '../Booking'


//this component takes ina  ton of adventure information
function FlipCard(props) {
    let history = useHistory()
    const loginState = useContext(loginContext)
    //flip effect is done in CSS with classes, this toggle between those classes
    const [mailbox, setMailbox] = useState([]);
    const [classToggle, setClassToggle] = useState('');
    const [converser, setConverser] = useState({
        firstName: "",
        id: ""
    })
    const [showMessage, setShowMessage] = useState(false);

    const handleClassToggle = () => {
        if (classToggle === 'card--flipped') {
            setClassToggle('')
        } else {
            setClassToggle('card--flipped')
        }
    }

    const handleOpenChat = async (id, name) => {
        await setConverser({
            firstName: name,
            id: id
        })
        handleMailboxOpen()
        setShowMessage(true)
    }
    const hideMessage = () => {
        setShowMessage(false)
    }
    const handleMailboxOpen = async (e) => {
        const { data } = await API.getMailbox();
        setMailbox(data.mailbox)
    }
    const goToLogin = () => {
        history.push('/profile')
    }
    

    const handleHostNameClick = (e) => {
        e.stopPropagation()
        history.push({pathname:'/public', state:{userId:props.hostId}})
    }
    return (
        <>
            {/* TODO: needs a little better thought through layout */}
            <div className={"flipcard " + classToggle} onClick={handleClassToggle}>
                <div className="card__inner">
                    <div className="card__back">
                        <div className=" grid-container">
                            <Gridx classes={''}>
                                <Cell size={"small-12 text-center details-heading"}>
                                    <h5>{props.title}</h5>
                                </Cell>
                                <Cell size={"small-12"}>
                                    <h6 style={{display:'inline-block'}}><strong>{props.host}</strong></h6>
                                    {!props.edit && <Btn className="publicProfileIcons" icon={<i className="far fa-user"></i>} classes={'button expanded'} handleClick={handleHostNameClick}/>}
                                    <p>{props.description}</p>
                                </Cell>
                            </Gridx>
                            <Gridx classes={''}>
                                <Cell size={"small-12 medium-12"}>
                                    <h6><strong>Details</strong></h6>
                                    <ul>
                                        <li>Location: {props.location} {', ' + props.stateLocation}</li>
                                        <li>Group size: {props.minGroupSize}-{props.maxGroupSize} </li>
                                        <li>Duration: {props.number} {props.unit} </li>
                                        <li>Difficulty: {props.difficulty} </li>
                                    </ul>
                                </Cell>

                                <Cell size={"small-12 medium-12"}>
                                    <h6><strong>Itinerary</strong></h6>
                                    <p>{props.itinerary}</p>
                                </Cell>

                            </Gridx>
                            <Gridx classes={''}>
                                <Cell size={'small-12'}>
                                    {/* Message Button */}
                                    {(loginState.loggedIn)?
                                    props.edit ? null : <Btn classes="button expanded" handleClick={(e) => { e.stopPropagation(); handleOpenChat(props.hostId, props.host) }} text={'Contact host'} />
                                    :<Btn classes="button expanded" text={'Log In or Sign Up to Contact Host'}handleClick={(e) => { e.stopPropagation(); goToLogin()}}></Btn>}
                                     
                                     
                                    {/* Update Button */}
                                    {props.edit ? <Btn data-id={props.id} className="editFlipcard"icon={<i className="fas fa-pencil-alt"></i>} classes={'button expanded'} handleClick={props.editClick} text={'update'} /> : null}
                                    {/* Delete Button */}
                                    
                                    {props.delete ? <Btn  data-id={props.id} className="editFlipcard"icon={<i className="far fa-trash-alt"></i>} classes={'alert button expanded'}  handleClick= { props.deleteClick} text={'delete me'} /> : null}
                                    
                                </Cell>

                            </Gridx>
                        </div>
                    </div>
                    <div className="card__front">
                        <Gridx classes={""}>
                            <Cell size={"small-12"}>
                                <div className="card-section">
                                    <img src={props.img} alt={props.title} />
                                </div>
                                <div className="card-section">
                                    <h4>{props.title}</h4>
                                    {!props.edit ? <h5 className='clickableHost' onClick={handleHostNameClick}>{props.host}</h5> :<h5 >{props.host}</h5> }
                                    
                                    <p>{props.description}</p>
                                </div>
                            </Cell>
                            {!props.edit && <TagRow tags={props.tags} />}
                        </Gridx>
                    </div>
                </div>
            </div>
            {(showMessage === false) ? null : <PopupChat name={converser.firstName} id={converser.id} hide={hideMessage} mailbox={mailbox} handleOpen={handleMailboxOpen} />}
        </>
    )
}

export default FlipCard;