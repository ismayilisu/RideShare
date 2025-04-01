import React, { useEffect, useState } from 'react'
import axios from 'axios'

const  Result=()=>{
    const [d,setData]=useState(null)
    useEffect(()=>{
        axios.get('http://localhost:5000/result')
        .then((res)=>{setData(res.data)
            
        })
        .catch((err)=>{console.log(err)})
    },[])

    return(
        <div>
        <h1>You are at Result Page</h1>
        <p> {`${d.message}`}</p>
        

        </div>
    )
}
export default Result