import { GoogleMap, LoadScript,Polyline,Marker} from '@react-google-maps/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
import { motion } from 'framer-motion'

import { Types } from 'mysql'
const Explore=()=>{
  axios.get('http://localhost:5000/explore')
  const [route,findroute]=useState(false)
    const [source,setsource]=useState([])
    const [dest,setdest]=useState([])
    let [fs,setfs]=useState(null)
    let [fd,setfd]=useState(null)
    const navigate=useNavigate()
    let [pl,setpl]=useState(null)
   
      const [lines,setlines]=useState([])
     
    const sourcechange=async (event)=>{
        event.preventDefault()
        // document.getElementById('u1').style.display='block';
        await axios.get(`http://www.localhost:5000/auto?place=${event.target.value}`).then((res)=>{
         
           console.log(res.data.predictions)
             setsource(res.data.predictions)
            
            
         }).catch(err=>console.log(err))
       

    }
    const destchange=async (event)=>{
        event.preventDefault()
        
        await axios.get(`http://www.localhost:5000/auto?place=${event.target.value}`).then((res)=>{
            setdest(res.data.predictions)
           
            
            
         }).catch(err=>console.log(err))
       

    }
    const [sdetails,setsdetails]=useState(null)
    const [ddetails,setddetails]=useState(null)
       
    useEffect(() => {
      if (sdetails && ddetails) {
        handleBothPlaceIds(sdetails, ddetails);
      
      }
  
    }, [sdetails, ddetails]); 
    const decodee=async (polylineStr)=>{
 
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
          coordinates.push([
              lat / 1e5,
              lng / 1e5
      ]);
      }
  
      return coordinates;
  }
      


 
    const [mul,setmul]=useState(false)
    const [routes,setroutes]=useState([])
    const [fr,setfr]=useState([])
    const handleBothPlaceIds = async (id1, id2) => {
      console.log("handlebothplaces")
    
     
      await axios.get(`http://www.localhost:5000/getdir?fs=${id1.place_id}&fd=${id2.place_id}`).then(async(res)=>{
       
      if(res.data.status==="success")
      {
        console.log(res.data)
        console.log('success')
          const result=res.data.routes
        setroutes(result)
        findroute(true)
        setfr(result[0])
        setloaded(true)
        
        let k=await decodee(res.data.routes[0].overview_polyline.points.replace(/^"|"$/g, ''))
        const lines = k.map(([lat, lng]) => ({ lat, lng }));
        
        setlines(lines)
        
        
        }
        if (res.data.routes.length>1){
          setmul(true)
          
          
        }
          
      
                    
      
      
      })
    

      
     
    };
    

    function getLocalityOrNeighborhood(addressComponents) {
      let locality = null;
     
    
      for (const component of addressComponents) {
        if (component.types.includes('locality')) {
          locality = component.long_name;
        }
      }
    
      
      return  locality;
    }
    
   
    const containerStyle = {
      
      width: '100%',
      height: '100%',
      
    };
    
    const center = {
      lat: 11.2558,
      lng: 75.8550
    };
    
    const now=new Date()
    const d=now.toISOString().split('T')[0]
    const t=now.toTimeString().split(' ')[0]
   const [date,setdate]=useState(d)
   const [time,settime]=useState(t)
             const [loaded,setloaded]=useState(false)
             const [load,setload]=useState(false)
            
          const getrides=()=>{   
       
        const tdetails={  
            source:sdetails.formatted_address,
            destination:ddetails.formatted_address,
            date:date,
            time:time,
            cred:fr

        }
        console.log(date)
        if(route==true){
        console.log(tdetails)
        navigate('/rides', { state: { ride: tdetails } });}
        else{
          alert("Route Fetching Error ")
        }

         

          }
          const [distance,setdis]=useState('')
          const [duration,setdur]=useState('')
          const start=[fr.start]
          const end=[fr.end]
    return (
    
        
       <div className='h-screen w-screen flex flex-col  font-mono'>

            <motion.div 
            initial={{ y:-100 }}
            animate={{ y:0 }}
            transition={{ duration:0.5 }}
            
            className='h-30 w-full bg-black rounded-b-4xl font-mono flex flex-row justify-around items-center'>
              <div></div>
              <div className='text-white text-3xl'>RIDESHARE</div>
              <div></div>
            </motion.div>

      <div className='w-full h-full flex  rounded-4xl'>
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
                  <div className=' h-full w-20 bg-gray-200 rounded-r-4xl flex flex-col justify-evenly items-center '
                   
                   >
       
                                                  <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                                                  <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/e')}} > <img  className='stroke-amber-50' src={compass}/></button>
                                                  <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}} > <img src={aboutus}/></button>
                                                  {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}
                   </div>
                   <div className='w-fit h-full  flex items-center justify-center'><div className='rounded-r-full rounded-t-full rounded-b-full w-7 h-7 bg-black'></div> </div>
                  </motion.div>
       <div className='w-full h-full bg-gray-300 rounded-4xl p-5 flex justify-around items-center gap-5 '>
    <div className='flex p-2 flex-col gap-2'>
    <div className='h-fit w-fit shadow-2xl rounded-4xl flex flex-col pl-30 pr-30 justify-around bg-gray-500 '>
        <div className='flex flex-col justify-evenly gap-4  p-2'>
          
        <div className='w-full '>
          <input id='i' placeholder='Enter Your Source' className='block  w-full h-15 rounded-2xl shadow-2xl bg-white p-3 focus:outline-0' onChange={sourcechange} ></input>
            {source.length > 0 ? (
                 <ul id= 'u1' className='w-fit h-fit absolute z-20 bg-white gap-0.5 rounded-2xl'>
          {source.map((item,index) => (
            
            <li key={index} id={index} className='p-3 rounded-2xl cursor-pointer hover:bg-gray-50'  onClick={ async ()=>{
                
                await axios.get(`http://www.localhost:5000/getcor?id=${item.place_id}`).then(
              async (res)=>{
              setsdetails(res.data.result)
              document.getElementById('u1').style.display='none'
              document.getElementById('i').value=item.description;
             });  
                
              

            }}>{item.description}</li> 
          ))}
        </ul>) :(<></>) }
          </div>
          
          <div>
          <div className='w-full '>
          <input id='i2' placeholder='Enter Your Destination' className='block  w-full h-15 rounded-2xl shadow-2xl bg-white p-3 focus:outline-0' onChange={destchange} ></input>
            {dest.length > 0 ? (
                 <ul id='u2' className='w-fit h-fit absolute z-20 bg-white gap-0.5 rounded-2xl '>
          {dest.map((item,index) => (
            <li key={index} id={index} className='p-3 rounded-2xl cursor-pointer hover:bg-gray-50'  onClick={ async ()=>{
                
              await axios.get(`http://www.localhost:5000/getcor?id=${item.place_id}`).then(
               async(res)=>{
                console.log(res.data.result)
          await  setddetails(res.data.result)
              document.getElementById('u2').style.display='none'
              document.getElementById('i2').value=item.description;
            
             });
                
              
              
                 
 
             }}>{item.description}</li> 
          ))}
        </ul>) :(<></>) }
          </div>
          </div>

        </div>
        <div className='w-full h-full bg-gray-100 p-2 flex flex-row rounded-xl shadow-2xl justify-around items-center'>
        <input type='date' onChange={
        (e)=>{setdate(e.target.value)}
        }/>
        <input type='time' onChange={
            (e)=>{settime(e.target.value)}
        }/>

        </div>
       
        <div className='flex gap-3 [&>*]:bg-black [&>*]:w-40 [&>*]:rounded-3xl [&>*]:shadow-2xl p-2'>
       {route==true?( <button className='h-15 text-[white] text-center cursor-pointer' onClick={getrides}  >FIND RIDES</button>):( <button className='h-15 text-[white] text-center cursor-pointer bg-gray-300' onClick={getrides}  >FIND RIDES</button>)}
        <button className='h-15 text-[white] text-center cursor-pointer'>REPORT AN ERROR</button>
        </div>
        
       </div>
       {mul &&(
        <div className='w-full h-fit flex flex-row flex flex-col'>
        <h3>Via:</h3>
        <select className='bg-white rounded-xl' onChange={
          async(e)=>{
            const select=routes[e.target.selectedIndex]
          setfr(select)
          
          let k=await decodee(select.overview_polyline.points.replace(/^"|"$/g, ''))
          const lines = k.map(([lat, lng]) => ({ lat, lng }));
          console.log(lines)
          setlines(lines)
        }}>
          {routes.map((value,index)=>{
            return <option id={index} key={index}  className='h-full w-5 truncate p-2' >{value.summary}</option>
          })}
        </select>


        </div>)}
       
       </div> 
      
       
       <div className='h-full w-full  flex flex-col justify-evenly gap-5'>
     <div className='h-full w-full '>
     
        <LoadScript googleMapsApiKey="AIzaSyDO73QwI6MANZk0zcnPf11OhV4r3sV9ajA">
      <GoogleMap 
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        // onBoundsChanged={}
      >
        <Marker position={routes.start} />
        <Marker position={routes.end} />
        

        <Polyline
          path={lines}
          options={{
            strokeColor: '#000000',
            strokeOpacity: 2,
            strokeWeight: 4,
          }}
        />
      </GoogleMap>
    </LoadScript>

        
     </div>
   {loaded && (  <div className='h-50 w-full  shadow-2xl bg-white rounded-3xl p-5 flex flex-col justify-around items-center [&>*]:font-bold' >
   {mul && (<h3 className='animate-pulse text-red-500'>*Multiple routes Available</h3>)}
   <div className='flex flex-row justify-around  items-center w-full '>
   <div>
    <h1 >ESTIMATED-TIME:</h1>
    <h2 >{fr.legs[0].duration.text}</h2>
    </div>
    <div>
    <h1>TRAVEL-DISTANCE:</h1>
    <h2 >{fr.legs[0].distance.text}</h2>
    </div>
   </div>
        
       </div>)}
       </div>
       


       </div>
      </div>
       </div>
    )

}
export default Explore