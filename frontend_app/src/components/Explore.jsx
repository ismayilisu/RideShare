import { GoogleMap, LoadScript } from '@react-google-maps/api'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {APIProvider,Map,ControlPosition,AdvancedMarker,Pin,MapControl} from '@vis.gl/react-google-maps'
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
const Explore=()=>{
    const [key,setkey]=useState("")
    const navigate=useNavigate()
    //  const apikey=async ()=>{
    //     const res=await axios.get("http://localhost:5000/explore" )
    //     console.log(res.data.apikey)
    //     setkey(res.data.apikey)
     
       
    //  }
    //  apikey()
     const containerStyle = {
        width: "100%",
        height: "400px",
      };
      
    
    return (
        
       <div className='h-screen w-full flex flex-col justify-around'>

            <div className='h-30 w-full bg-black rounded-b-4xl'></div>
        
            <APIProvider apiKey='AIzaSyDO73QwI6MANZk0zcnPf11OhV4r3sV9ajA' > 
            <Map   defaultCenter={{  lat: 10.8505,
        lng: 76.2711,  }} containerStyle={containerStyle} defaultZoom={15} gestureHandling="greedy" disableDefaultUI={false} mapId={"714fc5d02740860b"}>
        
                {/* <AdvancedMarker>
                    <Pin background={"grey"} borderColor={"green"}></Pin>
                </AdvancedMarker> */}
                <MapControl position={ControlPosition.LEFT}>
                
            <div className=' rounded-r-4xl  w-20 h-200 mt-4 bg-white absolute top-0 left-0 left-0 flex flex-col justify-evenly items-center transform translate-x-[-80%] transition-transform duration 300 hover:translate-x-0'>
                                                              <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home} className='h-full'/></button>
                                                              <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/explore')}} > <img  src={compass} className='h-full'/></button>
                                                              <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}}> <img src={aboutus} className='h-full'/></button>
                                                              {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile} className='h-full'/></button>):(<></>)}
                                  
            </div>
                
                
       
      </MapControl>
               
            </Map>
           
        </APIProvider>
      
       </div>
    )

}
export default Explore