import React from "react";
import {FaSpinner } from 'react-icons/fa'

const Loading=()=>{

    return (
        <div className="inset-0 z-30 backdrop-blur-md bg-opacity-10 flex items-center justify-center h-full h-full ">
       <div className=" flex flex-row items-center gap-1">
       <h2>Fetching Details </h2>
       <FaSpinner className="text-black text-5xl  animate-spin"></FaSpinner>
       </div>
            
        </div>
    )


}
export default Loading