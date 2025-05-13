import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { redirect, useNavigate } from 'react-router-dom';
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
import passenger from '../assets/passenger.jpg'
import driver from '../assets/driver.jpg'
import Loading from './Loading';
import axios from 'axios';

const  E=()=>{
    
const navigate=useNavigate()
return(


<main className='h-screen w-screen flex flex-col bg-white '>

            <motion.nav className='h-30 w-full bg-black rounded-b-4xl flex flex-row items-center justify-around  font-mono'
            initial={{ y:-500 }}
            animate={{ y:0 }}
            transition={{ duration:0.5}}>
            <div></div>
            <div className='text-white text-3xl font-mono'> RIDESHARE</div>
            <div></div>

            </motion.nav>
            <div className='h-full w-full  rounded-3xl flex '> 
           <motion.div className='w-fit h-full flex flex-row gap-1'
           initial={{ x:-70 }}
           whileHover={{ x:0 }}>
           <div className=' h-full w-20 bg-gray-200 rounded-r-4xl flex flex-col justify-evenly items-center '
            
            >

                                           <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                                           <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/e')}} > <img  className='stroke-amber-50' src={compass}/></button>
                                           <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}} > <img src={aboutus}/></button>
                                           {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}
            </div>
            <div className='w-fit h-full  flex items-center justify-center'><div className='rounded-r-full rounded-t-full rounded-b-full w-7 h-7 bg-black'></div> </div>
           </motion.div>
            <div className='w-full h-full flex flex-1  gap-5 justify-center items-center p-10  '>

            
            <div className=' h-fit w-full p-2 flex justify-center rounded-xl items-center  gap-3  '>
            <div className='w-full h-80 relative'>
            <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.25}}
            whileHover={{ y:-10 }}
            whileTap={{ scale:0.95 ,boxShadow: "0px 10px 20px rgba(255,255,255,0.3)" }}
            onClick={()=>{
                    navigate('/explore')
                }}
            
            
            
             className='w-full h-full   border-2 border-black text-gray-800 rounded-lg flex flex-col font-mono hover:cursor-pointer relative'  >

             <img className='object-cover w-full h-full absolute inset-0 z-10 ' src={passenger}></img>
             <div className='absolute inset-0 w-full h-full  backdrop-brightness-50 z-20'>
                
             </div>
             
             <div className='absolute w-full h-full inset-0 z-40 flex flex-col font-mono text-white '>
             <h2 className='text-4xl p-2 text-center'>Book Rides</h2>
              <p className='p-2 text-xl'>
            "Booking your ride is quick and easy. Just choose your destination, confirm your slot, and leave the rest to us. Reliable drivers, transparent timings, and a stress-free experience await!”
            </p>
             </div>
             
            </motion.div>
            </div>
          <div className='w-full h-80 relative'>
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.1 }}
            whileHover={{ y:-10 }}
            whileTap={{ scale:0.95 }}
            onClick={()=>{
                navigate('/dl')
            }}

            
                
             className='w-full h-full    rounded-sm border-2 text-gray-800  flex flex-col font-mono hover:cursor-pointer hover:shadow-white hover:shadow-2xl'  >
             
             <img className='object-cover w-full rounded-sm h-full absolute inset-0 z-10 ' src={driver}></img>
             <div className='absolute inset-0 w-full h-full  backdrop-brightness-50 z-20'>
                
             </div>
             
             <div className='absolute w-full h-full inset-0 z-30 flex flex-col font-mono text-white rounded-sm '>
             <h2 className='text-4xl p-2 text-center'>List a Ride</h2>
              <p className='p-2 text-xl'>
              “Help others reach their destination while saving on your own ride. Listing a ride takes less than a minute and connects you with fellow students heading the same way.”   
            </p>
             </div>
             
             
            </motion.div>
          </div>
            
  

               
 
          
            
            

                
            </div>

            </div>
            </div>
    
    
    
</main>



)
;
}
export default E