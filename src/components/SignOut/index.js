import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import API from '../../util/API'



function SignOut(props) {
    let history = useHistory();
    const [logoutObj, setlogoutObj] = useState({})
    const handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        setlogoutObj({
            ...logoutObj,
            [name]: value
        });
    };
    const handleFormSubmit = event => {
        API.logoutUser(logoutObj).then(res => {
            console.log(res)
            props.logMeOut(true)
            //upon successful logout, send me to  homepage
            history.push("/homepage")
        }
        ).catch(err => console.log(err))
    };
}
export default SignOut;