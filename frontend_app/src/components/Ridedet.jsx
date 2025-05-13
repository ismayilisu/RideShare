import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
const Ridedet=()=>{
    useEffect(()=>{
        if(!localStorage.getItem('id')){
            navigate('/LoginPage')
        }
        
    },[])
    const navigate= useNavigate()
    const location = useLocation()
    const details=location.state?.ride
    const [price,setprice]=useState(( (details.tot_fare-  (details.paid*
        (details.tot_fare/(details.av_seat+details.paid))
        )
        )/details.av_seat ))
    console.log(price)
    console.log(details)
   const [seats,setseats]=useState(1)
    console.log(localStorage.getItem('id'))
    const  transaction= async()=>{
        const t=localStorage.getItem("id")
        console.log(details)
        
        const cred={
            ride_id:details.id,
            assigned:details.assigned,
            date:details.date,
            time:details.time,//listed user
            seats_req:seats,
            token:t//current user
        }
        
        await axios.post('http://www.localhost:5000/bookride',cred).then((res)=>{
            console.log(res)
           if(res.data.status==="Success"){
// Redirect after successful booking
window.location.replace("/Dashboard");

            alert("Booking Successfull")
           
            
           }
           else{
            alert("Booking UnSuccessfull")
            navigate(-1)

           }
        })

        
    }

    return (
        <div className="w-screen h-screen bg-gray-400 flex flex-row items-center gap-5 p-5 font-mono">
        <div className="h-full w-250 bg-white rounded-2xl shadow-2xl shadow-black flex flex-col gap-2     ">
        <div className="w-full h-fit text-center text-2xl h-20 underline p-2">Ride Details</div>

            <div className="w-full h-full flex flex-col p-2 text-xl pt-20 gap-2 px-5 ">
            <h2>Pickup Location :{details.pickup}</h2>
            <h2>Drop Location : {details.destination}</h2>
            <h2>Pickup Date : {dayjs(details.date).format('YYYY-MM-DD')}</h2>
            <h2>Pickup Time : {details.time}</h2>
            <h2>Driver Assigned : {details.assigned}</h2>
            <div className="flex flex-row">
            <h2>Seats Selected:</h2>
            <select onChange={(e)=>{
                setseats(e.target.value)//error in price showing
            
//                 setprice(
//   ((details.tot_fare - (details.paid * (details.tot_fare / (details.av_seat + details.paid))))
//     / details.av_seat)* (e.target.value))
                    setprice( ( (details.tot_fare-  (details.paid*
                    (details.tot_fare/(details.av_seat+details.paid))
                    )
                    )/details.av_seat )*e.target.value )


            }}>
                {Array.from({ length: details.av_seat }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                    {i + 1}
                </option>
    ))}
            </select>
            
           
            
        </div>
        <div className="flex flex-row"> 
        <h2>Custom Requirments : </h2>
        <textarea className="bg-gray-200 w-fit text-sm p-1 rounded-xl" ></textarea>
        </div>
        <div className=" flex ">
           <h3>Total Amount to be Paid : </h3> <input disabled value={price.toFixed(2)} className="bg-gray-200 h-fit w-fit p-1 rounded-xl"/>
        </div>
        <div className="flex-1 justify-center items-center flex  ">
        <button className="bg-black p-2 text-white rounded-xl hover:cursor-pointer" onClick={(e)=>{
            e.preventDefault()
            transaction()
        }}> BOOK NOW</button>

        </div>


            </div>
            
        </div>
        <div className="flex-1 bg-white h-full rounded-2xl shadow-2xl shadow-black p-2">
        <div className="border-black border-1 h-full w-full rounded-xl"></div>


        </div>


        </div>
    )
}
export default Ridedet