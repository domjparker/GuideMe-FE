import React from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import HomepageImg from '../../images/homepage.jpg'

function Homepage(props){
    const {handlePageChange}=props
    handlePageChange("GuideMe")
    return (
        <>
            <Wrapper>
                <img className="homebackgrnd"src={HomepageImg} alt="homepagepic"/>
                <p>Here be Da Homepage  Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur distinctio delectus corporis necessitatibus exercitationem veniam reprehenderit laudantium quos. Rerum vel consequuntur ab voluptas. Unde maxime atque perferendis officia omnis in! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam deserunt cum sint nam qui, dicta doloremque dolore non consectetur vel voluptatibus ullam perferendis dolores sapiente, aut aspernatur quae tempore quam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi temporibus velit quam, ipsam ut reprehenderit id pariatur rem. Eum, debitis nobis eaque architecto voluptates quia commodi facere expedita voluptatibus ratione. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, laudantium sed numquam voluptatem placeat expedita fugit corrupti et neque vel. Enim illum dolore necessitatibus aspernatur saepe itaque pariatur autem voluptatum! </p>
            </Wrapper>

        </>
    )
}
export default Homepage;