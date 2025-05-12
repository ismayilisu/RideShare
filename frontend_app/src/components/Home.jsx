import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Typewriter} from 'react-simple-typewriter'
import dd1 from '../assets/verified.png'
import dd2 from '../assets/automation.png'

import dd3 from '../assets/funding.png'

import dd4 from '../assets/trust.png'


import { FaSpinner } from 'react-icons/fa'

import pic1 from '../assets/pic1.jpg'
import profile from './images/profile.png'

import back from '../assets/1280007-3840x2160-desktop-4k-taxi-wallpaper.jpg'
import {motion} from "framer-motion"
const  Home=()=>{
 
  const [second,setsecond]=useState(false)
 
    const navigate=useNavigate()
    const handleclick=()=>{
        navigate('/LoginPage')
    }
    const [login, setlogin]=useState(false)
    useEffect(()=>{

        if(localStorage.getItem("token")){
            setlogin(true)
        }
    },[])
    return(
   <div className=' w-screen h-screen  overflow-auto scroll-smooth '>
    

   <div className=' relative h-full bg w-full overflow-hidden'>
<img src={back} className=' absolute cover  h-full w-full bg-center'/>
<div className='absolute z-10 inset-0    backdrop-blur-sm backdrop-brightness-50'/>


<div className="absolute inset-0 z-20 flex flex-col items-center space-y-4 font-mono  ">
<motion.div className='h-30 w-full  backdrop-blur-sm  rounded-b-2xl flex flex-row items-center justify-around items-center' 
initial={{ opacity:0,y:-100 }}
animate={{ opacity:1, y:0 }}
transition={{ delay:.5 }}>
<div></div>
<div className='text-3xl'>RIDESHARE</div>
<div className='flex justify-end'>
<div className='flex flex-row gap-1 justify-end'>
    {login==false &&(<button className='text-white border-1 border-white rounded-sm p-2 hover:cursor-pointer h-full' 
    onClick={()=>{navigate('/LoginPage')}}>Login</button>)}
   {login &&(
    <div className="flex flex-row items-center gap-2 h-12">
  <button className="text-white border border-white rounded-sm p-1 hover:cursor-pointer h-full" onClick={()=>{
    navigate('/Dashboard')
  }}>
    Profile
  </button>
  
</div>
   )}
</div>
</div>

</motion.div>
<div className='w-full h-full flex items-center justify-center '>
<motion.h2
    className="text-white text-6xl text-center p-30"
    initial={{ opacity: 0, scale: 1 }}
    animate={{ opacity: 1, scale: 1.5}}
    transition={{ duration: 1 }}
  >
    RIDE-SHARE
  </motion.h2>

  <motion.h2
    className="text-black text-2xl "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.25, duration: 1 }}
    
  >
    A NITCIAN INITIATIVE
  </motion.h2>
</div>
</div>



   </div>
   <div className='h-full w-full relative overflow-hidden font-mono'>
    <img src={pic1} className='absolute inset-0 h-full w-full object-cover'/>
    <div className='absolute z-10 inset-0 backdrop-blur-sm backdrop-brightness-50'></div>
    <div className='absolute z-20 inset-0  p-2 flex flex-col   gap-2 font-mono '>
      <div className='w-full h-100  rounded-xl flex flex-row gap-2 p-10'>
     <div className='text-white font-mono text-5xl p-2 w-300 flex flex-col '>
     {/* <Typewriter 
        words={["Welcome to Keralas' First Campus Carpool System"]}
        
        cursor
        
        typeSpeed={60}
        deleteSpeed={50}
        delaySpeed={1000}
        
        onLoopDone={()=>{setsecond(true)}}
      />
     {second && (
     <div className='text-2xl w-full h-full p-2'>
     <Typewriter 
        words={["Our rideshare platform is built exclusively for the student community, aiming to make travel to and from the campus safer, more affordable, and more convenient. By enabling students to share rides—especially to major transit points—we help reduce travel costs, support sustainable transportation, and ensure a trustworthy travel experience through verified student and drivers"]}
        
        

        
        cursor
        cursorStyle=":)"
        typeSpeed={20}
        deleteSpeed={20}
        delaySpeed={1000}
        loop={true}
      />
     </div>)} */}
     <Typewriter 
  words={[" Kerala's First Campus Carpool System"]}
  cursor
  typeSpeed={60}
  deleteSpeed={50}
  delaySpeed={1000}
  loop={true}
  
/>

{second==true && (
  <motion.div className='text-2xl w-full h-full p-4'
  initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Typewriter 
      words={[
        "Our rideshare platform is built exclusively for the student community.",
        "It makes travel to and from the campus safer and more affordable.",
        "By sharing rides, students cut costs and reduce carbon footprints.",
        "All rides are by verified students and trusted drivers."
      ]}
      cursor
      cursorStyle="🚗"
      typeSpeed={30}
      deleteSpeed={20}
      delaySpeed={1500}
      loop={true}
    />
  </motion.div>
)}

      
    
     </div>
     <div className='flex flex-col gap-2 w-fit h-full  text-white flex-1 justify-around'>
        <motion.div initial={{ x:+500 }} animate={{ x:0 }} transition={{ delay:1.5,duration:0.5 }}   className='border-1 border-white flex flex-col items-center rounded-lg p-1  hover:shadow-2xl hover:shadow-white'><img src={dd1} className='rounded-sm flex flex-row gap-1'/><h2>Secure</h2></motion.div>
        <motion.div initial={{ x:+500 }} animate={{ x:0 }} transition={{ delay:1.5,duration:0.75}}  className='border-1 border-white flex flex-col items-center rounded-lg p-1 hover:shadow-2xl hover:shadow-white'><img src={dd4} className='rounded-sm flex flex-row gap-1'/><h2>Affordable</h2></motion.div>
        <motion.div initial={{ x:+500 }} animate={{ x:0 }} transition={{ delay:1.5,duration:1 }}  className='border-1 border-white flex flex-col items-center rounded-lg p-1 hover:shadow-2xl hover:shadow-white'><img src={dd2} className='rounded-sm flex flex-row gap-1'/><h2>Automated</h2></motion.div>
        <motion.div initial={{ x:+500 }} animate={{ x:0 }} transition={{ delay:1.5,duration:1.25}}  className='border-1 border-white flex flex-col items-center rounded-lg p-1 hover:shadow-2xl hover:shadow-white'><img src={dd3} className='rounded-sm flex flex-row gap-1'/><h2>Trustworthy</h2></motion.div>

      </div>
    
      </div>
      <div className='flex-1 flex justify-center items-center justify-evenly'>
        <div className='flex flex-row items-center justify-evenly w-full text-2xl text-white'>
        <button className='hover:border-white cursor-pointer rounded-lg p-5 border-2 border-black backdrop-blur-lg hover:text-black' onClick={()=>{
         
        }}>Contact</button>
        <button className='hover:border-white cursor-pointer rounded-lg p-5 border-2 border-black backdrop-blur-lg hover:text-black' onClick={()=>{
          navigate('/e')
        }}>Explore</button>
        <button className='hover:border-white cursor-pointer rounded-lg p-5 border-2 border-black backdrop-blur-lg hover:text-black' onClick={()=>{
          navigate('/about')
        }}>About</button>

        </div>
      </div>
    





      
    
    </div>
   </div>
  
   
   </div>
   
   
    )
}
export default Home