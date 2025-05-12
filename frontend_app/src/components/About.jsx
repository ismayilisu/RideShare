import React from 'react'
import { useNavigate } from 'react-router-dom'
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
import ashwin from './images/ashwin.jpg'
import ismail from './images/ismayil.jpg'
const  About=()=>{
    const navigate=useNavigate()
    const handleclick=()=>{
        navigate('/LoginPage')
    }
    return(
    <div className=' h-screen w-screen  flex flex-col [&>*]:font-mono '>

    <div className='h-30 bg-black w-full rounded-b-4xl'></div>
    <div className='bg-gray-700 h-full w-full  rounded-t-4xl flex '>
    <div className=' absoulte left-0 h-full w-20 bg-white rounded-r-4xl fixed flex flex-col justify-evenly items-center transform translate-x-[-80%] transition-transform duration 200 hover:translate-x-0'>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/explore')}} > <img  className='stroke-amber-50' src={compass}/></button>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}} > <img src={aboutus}/></button>
                            {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}

    </div>
    <div className=' bg-gray-600 h-full w-f rounded-3xl shadow-2xl flex flex-col justify-around overflow-scroll '>
    <div className='h-100 w-auto rounded-3xl flex shadow-2xl rounded-3xl items-center align-baseline justify-around p-10' >
    <img src={ismail} alt='img' className='h-full w-auto rounded-3xl'/>
        
        <p className='font-bold text-center p-10 text-3xl text-white text-center'>As the creator of Kerala’s first campus carpooling platform, built to make travel easier and more affordable for students. The idea is simple — connect students heading in the same direction, even if the drop point is somewhere along the way.

I built the platform using React, Node.js, MySQL, and Google Maps, with a focus on safety, convenience, and smart route matching. It’s a step toward eco-friendly and connected campus travel.</p>
    </div>
    <div className='h-150 w-auto rounded-3xl flex shadow-2xl rounded-3xl items-center align-baseline justify-around p-10' >
   
        <p className='font-bold text-center p-10 text-3xl text-white text-center'>As the creator of Kerala’s first campus carpooling platform, built to make travel easier and more affordable for students. The idea is simple — connect students heading in the same direction, even if the drop point is somewhere along the way.

I built the platform using React, Node.js, MySQL, and Google Maps, with a focus on safety, convenience, and smart route matching. It’s a step toward eco-friendly and connected campus travel.</p>
<img src={ashwin} alt='img' className='h-100 w-auto rounded-3xl'/>
        
    </div>

    </div>
  


    </div>


    </div>
    )
}
export default About