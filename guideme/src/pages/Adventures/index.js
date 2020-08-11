import React from 'react'
import './style.css'
import TopBar from '../../components/TopBar'
import Wrapper from '../../components/Wrapper'
import Footer from '../../components/Footer'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import Card from '../../components/Card'

function Adventures(){
    return (
        <>
            <TopBar title={'Adventures'}/>
            <Wrapper>
                <div className="grid-container full">
                    <Gridx classes={'grid-margin-x'}>
                        <Cell size={'medium-6 large-4'}>
                            <Card img={''} title={"Adventures 1"} host={"Andrew B."} description={"No ide what weill be going on here...."}/>
                        </Cell>
                    </Gridx>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default Adventures;