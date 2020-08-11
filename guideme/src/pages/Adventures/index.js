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
                            <Card img={''} title={"Adventures 1"} host={"Andrew B."} description={'This is a super cool first ever best ever adventure that takes you far and wide to Neverland'}/>
                        </Cell>
                        <Cell size={'medium-6 large-4'}>
                            <Card img={''} title={"Adventures 2"} host={"Andrew B."} description={'This is a super cool first ever best ever adventure that takes you far and wide to Neverland'}/>
                        </Cell>
                        <Cell size={'medium-6 large-4'}>
                            <Card img={''} title={"Adventures 3"} host={"Andrew B."} description={'This is a super cool first ever best ever adventure that takes you far and wide to Neverland'}/>
                        </Cell>
                        <Cell size={'medium-6 large-4'}>
                            <Card img={''} title={"Adventures 4"} host={"Andrew B."} description={'This is a super cool first ever best ever adventure that takes you far and wide to Neverland'}/>
                        </Cell>
                    </Gridx>
                </div>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default Adventures;