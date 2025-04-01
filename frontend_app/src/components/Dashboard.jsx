import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
function Dashboard(){
   
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'))
        navigate('/LoginPage')
        
       }

    let [selected,setselect]=useState("profile")
    let [logged,setlogged]=useState("Logged")
   
    const pclicked=()=>{
        if (setselect==="profile"){
           
            console.log("profile is displayed");

           
        }
        else{
            setselect=~setselect

        }
       
        
    }
    const bclicked=()=>{
        if (setselect==="bookings"){
           
            console.log("profile is displayed");

           
        }
        else{
            setselect=~setselect

        }
       
        
    }
return(


<main className='h-screen w-full overflow-x-hidden flex flex-col justify-evenly'>

            <nav className='h-30 w-full bg-black rounded-b-4xl '>


            </nav>
    <div className='mt-1 h-full   flex flex-row bg-gray-400 rounded-t-4xl p-r-2'>
            
                      <div className='h-full w-20 bg-white rounded-r-4xl flex flex-col justify-evenly items-center transform translate-x-[-80%] transition-transform duration 300 hover:translate-x-0'>
                                                  <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/home')}} ><img  src={home}/></button>
                                                  <button className='h-5 w-10 rounded-2xl  cursor-pointer ' onClick={()=>{navigate('/explore')}} > <img  className='stroke-amber-50' src={compass}/></button>
                                                  <button className='h-5 w-10 rounded-2xl  cursor-pointer' > <img src={aboutus}/></button>
                                                  {localStorage.getItem('token')!==''? (<button className='h-5 w-10 rounded-2xl  cursor-pointer' onClick={()=>{navigate('/Dashboard')}}> <img src={profile}/></button>):(<></>)}
                      
                          </div>
            
            
            <div   className='flex flex-row justify-evenly'>
                <div className=' mx-3  flex flex-col gap-1.5 justify-around' >
                    <div className=' h-full w-70 flex flex-col justify-start gap-3 mt-3'>

                        <button  className='bg-white rounded-2xl h-15 cursor-pointer '>profile</button>
                        <button   className='bg-white rounded-2xl h-15 cursor-pointer '>Bookings</button>
                        <button   className='bg-white rounded-2xl h-15 cursor-pointer '>Transaction History</button>
                        
                        {/* <button  className='bg-white rounded-2xl h-15 cursor-pointer ' onClick={logout}>Logout</button> */}
                    </div>

                </div>
                    <div className=' h-full flex justify-center i'>
                        <div className='m-20 rounded-4xl'>
                            
                        <div className=' h-70 flex justify-center items-center'>
                            <div className='rounded-full w-30 h-30'> <img/> </div>
                        </div>
                        <div className=' w-full  flex flex-col'>
                            <div>
                            <input></input>
                            <input></input>
                            </div>
                            <input></input>
                            <input></input>
                            <input></input>
                            
                        </div>
                        <div>


                        </div>
                        <button className='cursor-pointer 'onClick={logout}> Logout</button>
                    

                        </div>

                    </div>
                
            </div>
    </div>
    
    
</main>



)
;
}
export default Dashboard
