import React from 'react';

import {Navigate} from "react-router-dom"
const Protected=({children})=>{
    const token = localStorage.getItem("token")
    console.log(token)
    return token ? children:<Navigate to="/LoginPage"/>
}
export default Protected

//same procedure for the user and driver login check or not