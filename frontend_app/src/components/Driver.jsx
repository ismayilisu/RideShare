import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arr from '../assets/Project_01.svg'
import axios from "axios";
import Loading from "./Loading";
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
import RideComponent from "./RIdeComponent";
import { motion } from "framer-motion";
const Driver=()=>{

    const [p,setp]=useState(null)
    const [d,setd]=useState(null)
    const [t,sett]=useState('')
    const [date,setdate]=useState('')
    const [actsess,setactsess]=useState('active')
    const [from,setfrom]=useState('')
    const [id,setid]=useState(localStorage.getItem('id'))
    const [to,setto]=useState('')
    const [res,setres]=useState([])
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/LoginPage')
        }
        
        
    },[])

useEffect(()=>{
    if(p && d){
        setstat('loading')
        handleplace(p,d)
        

    }

},[p,d])
const [mul,setmul]=useState(false)

const handleplace=async(id1,id2)=>{
    await axios.get(`http://www.localhost:5000/getdir?fs=${id1.place_id}&fd=${id2.place_id}`).then(res=>{
        //  console.log(res.data)
        if(res.data.status==="success")
        {
             setres(res.data.routes)
             setroute(res.data.routes[0])
             setstat('route')
            if (res.data.routes.length>1){
                setmul(true)
            }
            
  
        }
        else{
            setstat('No-route')
        //   findroute(false)
  
        }
        })

}

    const handlesubmit=()=>{

    }
    const fchange=async (event)=>{
        event.preventDefault()
        // document.getElementById('u1').style.display='block';
        await axios.get(`http://www.localhost:5000/auto?place=${event.target.value}`).then((res)=>{
         
           console.log(res.data.predictions)
             setfrom(res.data.predictions)
            
            
         }).catch(err=>console.log(err))
       

    }
  
    const dchange=async (event)=>{
        event.preventDefault()

        await axios.get(`http://www.localhost:5000/auto?place=${event.target.value}`).then((res)=>{
         
           console.log(res.data.predictions)
             setto(res.data.predictions)
            
            
         }).catch(err=>console.log(err))
       

    }
    const [route,setroute]=useState([])
    const [stat,setstat]=useState('No-route')
    const [pool,setpool]=useState(0)
    const [fare,setfare]=useState(0)
const navigate = useNavigate()

    return (
        <main className='h-screen w-screen flex flex-col bg-white '>

            <motion.nav className='h-30 w-full bg-black rounded-b-4xl flex flex-row items-center justify-around  font-mono'
            initial={{ y:-500 }}
            animate={{ y:0 }}
            transition={{ duration:0.5}}>
            <div></div>
            <div className='text-white text-3xl font-mono'> RIDESHARE</div>
            <div></div>

            </motion.nav>
            <div className='h-full w-full  rounded-3xl flex flex-row '> 
            
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
            <div className='w-fit h-full  flex items-center justify-center'>
            <div className='rounded-r-full rounded-t-full rounded-b-full w-7 h-7 bg-black'></div> 
            </div>
           </motion.div>
            <div className='w-full h-full flex flex-1  gap-5 justify-center items-center p-10  '>
        
  
    
  <div className="bg-white h-full w-full rounded  font-mono flex flex-col gap-2 shadow-black shadow-2xl p-2">
      <div className=" h-40 w-full flex flex-row justify-around items-center border-1 rounded-2xl">
          <div className="flex justify-center items-center gap-3 ">
              <h4 className="text-2xl"> FROM:</h4>
             <div className="w-fit h-fit">
             <input id='u1'className="bg-gray-300 rounded-xl h-10 p-2" defaultValue={ p? p.description:''} onChange={fchange}/>
             {from.length>0 && (
              <ul id="u2" className="h-fit w-full absolute z-20 bg-white ">
                  {from.map((value,index)=>{

                     return <li id={index} key={index} className="h-fit w-fit  p-2 hover:cursor-pointer" onClick={async()=>{
                      setp(value)
                      // console.log("click")
                      console.log(value)
                       document.getElementById('u1').value=value.description
                      document.getElementById('u2').style.display='none'
                      setfrom([])
                    
                      

                     }}>{value.description}</li>
                  })}
              </ul>
             )}
            
             </div>
            
              
          </div>
         <img src={arr} className="h-20"/>
         <div className="flex justify-center items-center gap-3 h-10">
              <h4 className="text-2xl"> TO:</h4>
              
              <div className="w-fit h-fit">
             <input id='u3' className="bg-gray-300 rounded-xl h-10 p-2" defaultValue={ d? d.description:''} onChange={dchange}/>
             {to.length>0 && (
              <ul id="u4" className="h-fit w-fit absolute z-20 bg-white [&>*]: hover:bg-gray-500 [&>*]:hover:cursor-pointer">
                  {to.map((value,index)=>{

                     return <li id={index} key={index} className="h-full w-full bg-white p-2" onClick={async()=>{
                      setd(value)
                      // console.log(value)
                      document.getElementById('u3').value=value.description
                      document.getElementById('u4').style.display='none'
                      setto([])
                      

                     }}>{value.description}</li>
                  })}
              </ul>
             )}
            
             </div>
              
          </div>

          <div>
         </div>
      </div>  {stat==='No-route' && (
      <div className="h-full w-full border-1 p-2 flex items-center justify-center rounded-2xl">
      <h2 className="text-2xl">No Routes Found.</h2>
      </div>
  )}
  {stat==='loading' && (
      <div className="h-full w-full border-1 p-2 flex items-center justify-center rounded-2xl">
      <Loading/>
      </div>

  )}
  {stat==='route' && (
      <div className="h-full w-full border-2 p-5 flex flex-col items-center justify-around rounded-2xl">
      {mul==true? (<div className="flex flex-col items-center ">
              <h1 className="text-red-600 animate-pulse">*Multiple routes Found</h1>
              <div className="flex flex-row">
              <h3>Via - </h3>
              <select className="bg-gray-100 p-1 rounded-xl hover:cursor-pointer" onChange={(e)=>{
                  console.log(res[e.target.selectedIndex])
                  setroute(res[e.target.selectedIndex])
              }}>
                 {res.map((value,index)=>{
                 return <option id={index} key={index} className="hover:cursor-pointer break-words bg-gray-200 ">{` ${value.summary}`}</option>
                 })}
              </select>
              
              </div>
          </div>):(<></>)}

          <form onSubmit={handlesubmit} className="flex flex-col w-full h-full items-center justify-center ">
            <div className="p-2 flex flex-col gap-4">
            <div className="flex flex-row items-center">
            <h2>START_TIME : </h2>
            <input type="time" defaultValue={t} onChange={(e)=>{
              
              sett(e.target.value)
              console.log(e.target.value)
              
            }}/>
            </div>
            <div className="flex flex-row items-center"> 
             <h2>START_DATE : </h2>
            <input type="date" defaultValue={date} onChange={(e)=>{
              setdate(e.target.value)
              console.log(e.target.value)
              
            }}/>
            </div>
            <input id='pool' type="number"  className="p-1" placeholder="Maximum pooling " onChange={(e)=>{
              setpool(e.target.value)
            }}/>
            <input id='f' type='number' className="p-1" placeholder="Total Fare" onChange={(e)=>{
              setfare(e.target.value)
            }}/>
            <button className="bg-black text-white rounded-xl p-2 hover:cursor-pointer" onClick={(e)=>{
              e.preventDefault()
              console.log(route)

              if(p===d){
                  alert("Pickup and Drop Locations cannot be same")
              }
              else if(date===''){
                  alert("Please enter Pickup Date")
              }
              else if(t===''){
                  alert("Please enter Pickup Time")
                  
              }
              else if(document.getElementById('pool').value===0){
                  alert("Please enter Maximum Pooling Possible")
              }
              else if(document.getElementById('f').value===0){
                  alert("Please enter the total Fare")
              }
              else{
                  
              const cred={
                  driver:id,
                  from:p,
                  to:d,
                  route:route,
                  time:t,
                  date:date,
                  pool:pool,
                  fare:fare,
                  
              }
              
             
              console.log(cred)
             console.log("success")
             axios.post(`http://www.localhost:5000/listride`,cred).then( (res)=>{
              if (res.data.status==="success"){
                  setp(null);
setd(null);
sett('');
setdate('');
setpool(0);
setfare(0);
setroute([]);
setstat('No-route');
alert("Ride listed successfully!");
                navigate('/e')
              }
              else{
                  alert("Error please try again later!!")
              }
             }).catch(err=>{
              alert(err)
             })
              }


            }} >List</button>

            </div>
           
           
          </form>
          <div className="w-full h-full flex flex-row justify-around items-center">
          <h2>TOTAL-DISTANCE : {route.legs[0].distance.text}</h2>
          <h2>TOTAL-DURATION : {route.legs[0].duration.text}</h2>
            
          </div>
        

      </div>
  )}
     

 
 
 
 </div>
 

            
           

            </div>
            </div>
    
    
    
</main>
   



    )
}

export default Driver

