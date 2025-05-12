import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Main =()=>{
    const navigate=useNavigate()
    const[state,setstate]=useState("")
    return(
        <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="h-60 w-100 bg-white rounded-3xl  shadow-white flex flex-row justify-around items-center [&>*]:hover:cursor-pointer backdrop-blur-md">
            <button className="w-40 rounded-full bg-black h-20 text-amber-50 text-2xl font-mono" onClick={()=>{
                navigate('/LoginPage')
            }}>USER</button>
            <button className="w-40 rounded-full bg-black h-20 text-amber-50 text-2xl font-mono" >DRIVER</button>
        </div>
         
            
        </div>
    )
}

export default Main