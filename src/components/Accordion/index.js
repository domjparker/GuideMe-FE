import React from 'react'
import Btn from '../Btn'


function Accordion(props) {
    const [accordion, setAccordion] = useState('');

    const handleAccordion = () => {

    }


    return (
        <>

            <div className="accordionDiv" style="width:50%">

                <Btn onClick={handleAccordion} className='' text="Accordion" />
                
            </div>
        </>
    )
}

export default Accordion;