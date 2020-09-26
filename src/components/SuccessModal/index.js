import React from 'react';
import './style.css';
import { FormBtn } from "../Form";
import Cell from '../Cell'
import Gridx from '../Gridx'
import Btn from '../Btn'




function SuccessModal(props) {

    let showHideModal = props.show ? 'modal d-block' : 'modal d-none'
    const handleModalClose = () => {
        props.handleModalClose()
    }

    return (

        <div className={"overlay " + showHideModal}>
            <div className={"modalBody"}>
               
                <div className="grid-container fluid"></div>
                <Gridx>
                    <Cell size="">
                    <h1 className="text-center"> Success! </h1>
                    <p className="text-center">{props.text}</p>
                        <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
                    </Cell>
                </Gridx>
            </div>



        </div>
    );


}

export default SuccessModal;