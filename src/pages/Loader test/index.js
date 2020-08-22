import React from 'react'
import Loader from 'react-loader-spinner'
import Wrapper from '../../components/Wrapper'
function LoaderElement(){
    return (
<Wrapper>

<Loader type="TailSpin" color="#CFA242" height={100} width={100} visible={true} />
</Wrapper>
    )
}

export default LoaderElement