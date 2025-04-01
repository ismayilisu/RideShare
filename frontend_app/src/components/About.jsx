import React from 'react'
import { useNavigate } from 'react-router-dom'
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
const  About=()=>{
    const navigate=useNavigate()
    const handleclick=()=>{
        navigate('/LoginPage')
    }
    return(
    <div className=' h-screen w-full  flex flex-col'>

    <div className='h-30 bg-black w-full rounded-b-4xl'>
    </div>
    <div className='bg-gray-700 h-full w-full mt-1 rounded-t-4xl flex flex-col justify-evenly'>
    <div className='h-full w-20 bg-white rounded-r-4xl flex flex-col justify-evenly items-center transform translate-x-[-80%] transition-transform duration 200 hover:translate-x-0'>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/explore')}} > <img  className='stroke-amber-50' src={compass}/></button>
                            <button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/about')}} > <img src={aboutus}/></button>
                            {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}

    </div>
    <div>

    </div>


    </div>


    </div>
    )
}
export default About