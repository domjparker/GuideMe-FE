import React, {useState, useEffect} from 'react'
import './style.css'
import Wrapper from '../../components/Wrapper'
import Gridx from '../../components/Gridx'
import Cell from '../../components/Cell'
import TagRow from '../../components/TagRow'

import usersInfo from '../../fakedb/users.json'

function Profile (props) {
    const [userData, setUserData] = useState({})

    const {handlePageChange}=props
    handlePageChange("Profile")
       
    const loadUserData = () => {
        setUserData(usersInfo[0])
    }
    useEffect(() => {
        loadUserData()
    
    }, [])

    return(
        <>
        <Wrapper>
            <div className="grid-container full">
                <Gridx>
                    <Cell size={''}>
                        <h2>{userData.firstName} {userData.lastName}</h2>
                    </Cell>
                </Gridx>
                <Gridx>
                    <Cell size={"small-6 medium-4"}>
                        <img id="profilePic" src={userData.profilePicture} alt={userData.firstName + " " + userData.lastName} />
                    </Cell>
                    <Cell size={"small-6 medium-8"}>
                        <p>{userData.bio}</p>
                    </Cell>
                    <Cell size={""}>
                        <p>{userData.location}</p>
                    </Cell>
                </Gridx>
                
                {(userData.host=== false) ? 'Not a host' 
                :(
                <Gridx classes="grid-margin-x">
                    {/* <TagRow tags={userData.tags}/> */}
                </Gridx>
                )}
            </div>
        </Wrapper>
        </>
    )    
}

export default Profile