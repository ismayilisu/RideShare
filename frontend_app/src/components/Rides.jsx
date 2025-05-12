/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState,useRef} from "react"
import { useSearchParams,useLocation} from "react-router-dom"
import { useNavigate} from "react-router-dom"
import { motion } from "framer-motion"
import * as turf from '@turf/turf'
import Loading from "./Loading"
import axios from "axios"
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
import RideComponent from "./RIdeComponent"
const Rides=()=>{
const [results,setresults]=useState([])
const [load,setload]=useState(true)
const navigate =useNavigate()
// const [searchParams]=useSearchParams()

// const searchParam = new URLSearchParams(window.location.search);
// const source = useRef(JSON.parse(decodeURIComponent(searchParam.get('cred')))).current.source;
// const destination= useRef(JSON.parse(decodeURIComponent(searchParam.get('cred')))).current.destination;
// const cred= useRef(JSON.parse(decodeURIComponent(searchParam.get('cred')))).current.cred;
const location=useLocation();
const ride=location.state.ride
const source=location.state.ride.source
const destination=location.state.ride.destination
const cred=ride.cred

const req={
  date:location.state.ride.date,
  time:location.state.ride.time,
}

const compareRoutes = (route1, route2) => {
  const convert = (route) => route.map(pt => [pt.lat, pt.lng]);
  //  const r1 = turf.lineString(route1);
  // const r2 = turf.lineString(route2);
  const r1 = turf.lineString(convert(route1));
  const r2 = turf.lineString(convert(route2));
  console.log(r1)
  console.log(r2)
  const d1 = turf.length(r1, { units: "kilometers" });
  const d2 = turf.length(r2, { units: "kilometers" });

  return Math.abs(d1 - d2) < 10; 
};

  function haversine(lat1, lon1, lat2, lon2,thresh) {
    const R = 6371; 
    const toRad = angle => angle * Math.PI / 180;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    if (R*c <= thresh){
      return true
    }// distance in kilometers
    return false
  }
  




useEffect(()=>{

const functio = async () => {
    try {
      const res = await axios.get(`http://www.localhost:5000/getrides?source=${encodeURIComponent(JSON.stringify(source))}&destination=${encodeURIComponent(JSON.stringify(destination))}&req=${encodeURIComponent(JSON.stringify(req))}`);
      const data = res.data;
      console.log(data)
      const temp=[
        [cred.legs[0].start_location.lat,
        cred.legs[0].start_location.lng],
        [cred.legs[0].end_location.lat,
        cred.legs[0].end_location.lng], 

      ]
      console.log(data)
     
      
      const result = await Promise.all(
        data.map(async (element) => {
          const p1 = JSON.parse(element.src);
          const p2 = JSON.parse(element.dest);
          const op = element.op;
      
          let d = decodee(op.replace(/^"|"$/g, ''));
          let cmp = decodee(cred.overview_polyline.points.replace(/^"|"$/g, ''));
      
          let check1 = false;
          let check2 = false;
      
          try {
            let d1 = haversine(p1.lat, p1.lng, temp[0][0], temp[0][1], 5);//5km 
            let d2 = haversine(p2.lat, p2.lng, temp[1][0], temp[1][1], 5);
      
            if (d1 && d2) {
              check1 = true;
            }
      
            if (check1) {
              check2 = compareRoutes(cmp, d); 
              console.log(check2);
            }
      
            if (check1 && check2) {
           
              return element;
            }
          } catch (err) {
            console.error("Error fetching directions:", err);
          }
      
          return null; // If no match or error, return null
        })
      );
      setresults(result)
      const filteredResults = result.filter((el) => el !== null);
  setresults(filteredResults);
  
    
    } catch (err) {
       console.error("Error fetching rides:", err);
    } 
    finally{
      setload(false)
    }
  };

  
   

  functio()
},[])

const [box,togglebox]=useState(false)


function decodee(polylineStr) {
    /**
     * Decode a Google Maps encoded polyline string into an array of {lat, lng} coordinates.
     * 
     * @param {string} polylineStr - Encoded polyline string
     * @returns {Array<{lat: number, lng: number}>} Array of coordinate objects
     */
    if (!polylineStr) return [];

    const coordinates = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < polylineStr.length) {
        // Decode latitude
        let shift = 0;
        let result = 0;
        let byte;
        do {
            byte = polylineStr.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        lat += (result & 1) ? ~(result >> 1) : (result >> 1);

        // Decode longitude
        shift = 0;
        result = 0;
        do {
            byte = polylineStr.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20 && index < polylineStr.length);

        lng += (result & 1) ? ~(result >> 1) : (result >> 1);

        // Convert to actual coordinates (divide by 1e5)
        coordinates.push({
            lat: lat / 1e5,
            lng: lng / 1e5
        });
    }

    return coordinates;
}

return (

<div className=' h-screen w-full  flex flex-col font-mono'>

    <motion.div className='h-30 bg-black w-full rounded-b-4xl flex flex-row justify-around items-center font-mono'
    initial={{ y:-100 }}
    animate={{ y:0 }}
    transition={{ duration:0.5, type:"spring" }}
       
      >
      <div></div>
      <div className="text-3xl text-white">RIDESHARE</div>
     <div className="flex flex-row items-center justify-around">
      <button/>
     </div>
    </motion.div>
    <div className='bg-gray-700 h-full w-full mt-1 rounded-t-4xl flex  '>
    {/* <div className='h-full w-20 bg-white rounded-r-4xl flex flex-col justify-evenly items-center transform translate-x-[-80%] transition-transform duration 200 hover:translate-x-0'>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/explore')}} > <img  className='stroke-amber-50' src={compass}/></button>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}} > <img src={aboutus}/></button>
                            {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}

    </div> */}
    <motion.div className='w-fit h-full flex flex-row gap-1'
               initial={{ x:-70 }}
               whileHover={{ x:0 }}
               transition={{ type:'tween' }}>
               <div className=' h-full w-20 bg-gray-400 rounded-r-4xl flex flex-col justify-evenly items-center '
                
                >
    
                                               <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                                               <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/e')}} > <img  className='stroke-amber-50' src={compass}/></button>
                                               <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}} > <img src={aboutus}/></button>
                                               {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}
                </div>
                <div className='w-fit h-full  flex items-center justify-center'><div className='rounded-r-full rounded-t-full rounded-b-full w-7 h-7 bg-black'></div> </div>
               </motion.div>
    <div className=" m-10 bg-white w-full rounded-3xl shadow-2xl p-5 flex items-center justify-center ">
      {load==true? (<Loading/>):(//change to true
        
                results.length>0?(
                <div className="w-full h-full flex flex-col items-start  p-5 gap-3 [&>*]:hover:shadow-2xl  overflow-y-auto">
{
    results.map((value,index)=>{
       return <div key={index} className="w-full h-auto" onClick={()=>{
       

       }}> <RideComponent key={index} prop={value}/></div>
    })
}

                </div>
                )
                :
                (
                    <div className="flex justify-center items-center flex-col gap-3">
                    <h1 className="text-center font-mono text-3xl">No Rides Found!!</h1>
                    <h2><a href="/e" className="underline">List a Ride</a></h2>
                    {/* <button className="text-center hover:cursor-pointer h-10 bg-black rounded-2xl p-2 text-white" onClick={()=>{
                        togglebox(true)

                    }}>List a Ride</button> */}
                    {/* {box==true && (
                        <div className="fixed inset-0 opacity-30 flex items-center justify-center z-50 bg-black/30 backdrop-blur-lg">
                        <div className="h-100 bg-yellow-300 opacity-100 ">
                            <h1>List a new ride</h1>
                        </div>
                    </div>)} */}
                    </div>
                )
        
        
      )}

    </div>


    </div>


    </div>
    )
}







export default Rides