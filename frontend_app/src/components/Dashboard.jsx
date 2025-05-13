import React, { useEffect, useState,useRef, use } from 'react'
import { motion } from 'framer-motion';
import { redirect, useNavigate } from 'react-router-dom';
import home from './images/home.png'
import compass from './images/compass.png'
import aboutus from './images/about-us.png'
import profile from './images/profile.png'
import Loading from './Loading';
import axios from 'axios';
import dayjs from 'dayjs';
import  {io} from 'socket.io-client'
import ChatComponent from './ChatComponent'


function Dashboard(){
    const[rowid,setrowid]=useState(null)
const [rideid,setrideid]=useState('')
    const socket = useRef(null);
    useEffect(() => {
        
        socket.current = io('http://localhost:5000');
        console.log('connvected socket')
        
      
        return () => {
          socket.current.disconnect();
        };
      }, []);

 
    useEffect(() => {
        if(!rowid) return;
        console.log("recievign message")
        console.log("Socket current:", socket.current);  
    
        if (!socket.current) return;  
        console.log(rowid)
        socket.current.emit('join_room', rowid);
        console.log("Connected to room:", rowid);

        setprevmess([]);
    
        
        const handleReceiveMessage = (data) => {
            console.log(data)
            console.log("Message received:", data);
            setprevmess(prev => [...prev, data]);  
        };
    
        console.log('Listening message ')
        socket.current.on('recieve_message', handleReceiveMessage);
    
    
        return () => {
            console.log("Disconnected from room:", rowid);
            socket.current.emit('leave_room', rowid);  // Leave the room on cleanup
            socket.current.off('recieve_message', handleReceiveMessage);  // Remove event listener
        };
    
    }, [rowid]);  // Trigger effect when `rowid` or `socket.current` changes
    
    
    
    

    
    let[c,setc]=useState(false)
    let[changes,setchange]=useState(false)
   const [data,setdata]=useState('')
   const [load,setload]=useState(true)
   const [bdet,setbdet]=useState([])
   const [list,setlist]=useState([])
    
   useEffect(()=>{
    const call=async ()=>{

    await axios.get(`http://www.localhost:5000/getinfo?d=${localStorage.getItem('token')}`).then(async(res)=>{
     
        setload(false)
        
        const data=res.data.data
        setdata(data)
      
       const result= await axios.get(`http://www.localhost:5000/userrides?d=${localStorage.getItem('id')}`)
      
       setload(false)
       setbdet(result.data.result)
       setlist(result.data.list)
    

    })

   
    
       


    }
    call()

    


   },[])

   const [del,setdel]=useState({})
   console.log(localStorage.getItem('id'))
const [id,setid]=useState(localStorage.getItem('id'))

const activebook=bdet.filter(value=>value.isexpired==0)
const deadbook=bdet.filter(value=>value.isexpired==1)
console.log("Page rendered")
    const navigate=useNavigate()
    const logout=()=>{
        setpage('logout')
        localStorage.removeItem('token')
        navigate('/home')
       }
       
       const delet=async()=>  {
       
        
        const token=localStorage.getItem('token')
       
       
       await axios.delete('http://www.localhost:5000/delete',{
        headers:{
            'authorization':token
        }
       }).then(
        (res)=>{
            if (res.data.status==='success'){
                localStorage.removeItem("token")
                navigate('/home')
            }
            else{
                alert("Account deletion failed")
            }
        }
        
       )
    
        
       
        

        
        
       }


  const [page,setpage]=useState("book")
  const getdetails =async ()=>{

  }
  const [popup,showPopup]=useState(false)
  const [popuppr,showPopuppr]=useState(false)


  const [getmess,setgetmess]=useState(false)
  
  const [chat,showchat]=useState(false)
 
  const [premess,setprevmess]=useState([])
  
  const [mess,setmess]=useState('')

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [premess]); // Auto-scroll whenever new messages are added

  const sendmess=()=>{
   
    if (mess.trim()=='') return;
  const cred=  {
        row_id:rowid,//ride entr
        msg:mess,
        date:new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        user_id:id,//user_id
        
    }
    setprevmess(value=>[...value,cred])
    socket.current.emit('send_message',cred);
    setmess('')
   

  }

 
 
return(


<main className='h-screen w-screen flex flex-col font-mono'>

            <nav className='h-30 w-full bg-black rounded-b-4xl flex flex-row items-center justify-around'>
            <div></div>
            <div className='text-white text-2xl'>RIDESHARE</div>
            <div></div>

            </nav>
            <div className='h-full w-full bg-gray-200 rounded-3xl flex'> 
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

           {!popup ? (
             <div className='w-full h-full flex p-5 gap-5 '>

<div className='w-fit  flex flex-col   gap-3 [&>*]:rounded-3xl mt-3  [&>*]:cursor-pointer [$>*]:hover:shadow-2xl  [$>*]:hover:shadow-gray-400 font-mono font-bold'>
<motion.button 

className=' w-full text-center bg-gray-300 p-5 ' onClick={()=>{
    setpage("Listed")
     
}}>Listings</motion.button>
<motion.button className='p-5 w-full text-center bg-gray-300 ' onClick={()=>{
    setpage("book")
   
}}>BOOKINGS</motion.button>
<motion.button className='p-5 w-full text-center bg-gray-300 ' onClick={()=>{
      setpage("history")
}}>HISTORY</motion.button>
<motion.button className='p-5 w-full text-center bg-gray-500 ' onClick={()=>{
       
}}>HELP</motion.button>
<motion.button className='p-5 w-full text-center bg-gray-300 ' onClick={()=>{
    setpage("profile")
     
}}>PROFILE</motion.button>



</div>
<div className='  relative h-full w-full p-2 flex justify-center rounded-xl '>
{chat ? (<div className='fixed inset-0 z-10 '>
    <div className='w-full h-full absolute z-20 backdrop-blur-sm flex justify-center items-center p-20'>
        <div className=' w-full h-full  flex flex-col rounded-2xl shadow-2xl gap-1'>
            <div className='h-10 p-2 w-full flex justify-end'>
                <div className=' w-10 h-10 rounded-full bg-black'><button onClick={()=>{showchat(false)
                socket.current.emit('leave_room',rowid)
                
              
                }} className='w-full h-full text-white font-bold text-2xl hover:cursor-pointer'>X</button></div>
            </div>
            <div  className='p-2 flex flex-col  font-mono w-full h-full gap-2'>
                <div className='border rounded-lg p-2'>{`Listed By User : ${rideid}`}</div>
                <div className=' rounded-lg flex-1 p-1 bg-gray-200'>
                {getmess?
                (
                    <div className='overflow-hidden h-95   flex flex-col gap-2 '>
                    {premess.length>0?(

                        <div className='w-full h-full flex flex-col gap-1 p-2 overflow-y-auto'
                        ref={scrollRef}>
                    {
                        premess.map((value,index)=>{ 
                            return <ChatComponent msg={value.msg} date={value.date} time={value.time} key={index}  curr={id} user_id={value.user_id}/>})}
                </div>)
                :
                (<div className='flex items-center justify-center font-mono'> <h1>No Messages found.</h1></div>)}</div>):(<Loading/>)}</div>
                <div className=' h-10 flex flex-row gap-2'><input className='w-full h-full bg-gray-300 rounded-sm p-1' placeholder='Type Your Message here' onKeyDown={(e)=>{
                    if((e.key)=='Enter') {sendmess();e.target.value=''}

                
                }} onChange={(e)=>{setmess(e.target.value)
                


                }}/><button className='p-2 rounded-lg text-white bg-black' onClick={sendmess}> SEND</button></div>
            </div>
        </div>
    </div>
</div>):(<>{ page=="book" &&   (
    <div className='w-full p-5'>
        {load ? (<Loading/>):(
            <>
                {activebook.length>0? (<div className='flex flex-row gap-1 items-center'><table className="w-full h-fit table-auto border-collapse p-2 items-center">
<thead>
<tr className='underline '>
<th>Date</th>
<th>Time</th>
<th>Pickup Location</th>
<th>Drop Location</th>

</tr>
</thead>
<tbody>
{activebook.map((value, index) => (


<tr key={index} className=''>
<td className="border h-fit w-fit p-1">{dayjs(value.date).format('YYYY-MM-DD')}</td>
<td className="border h-fit w-fit p-1 ">{value.time}</td>
<td className="border h-fit w-fit p-1">{value.pickup}</td>
<td className="border h-fit w-fit p-1">{value.destination}</td>
<td className=" h-fit w-fit p-1">
<button 
className='flex-1 text-center bg-black text-white p-2 rounded-2xl hover:cursor-pointer' 
onClick={() => {
    
    console.log(value)
    setdel(value)
showPopup(true);

}}
>
Cancel
</button>
</td>
<td className=" h-fit w-fit ">
<button 
className='flex-1 text-center bg-green-600 text-white p-2 rounded-2xl hover:cursor-pointer' 
onClick={async() => {
    setrowid(value.id)
    setrideid(value.assigned)
    console.log(value)
    await axios.get(`http://localhost:5000/getmess?row=${value.id}`).then(res=>{
       console.log(res.data)
        setprevmess(res.data)
        setgetmess(true)
    })
  
    showchat(true)

  
    
//    


}}
>Chat 
</button>
</td>
</tr>


))}
</tbody>
</table></div>
                     
                ):(
                    <div className='font-bold'>No Booking Found.</div>
                )}
            </>

            


        )}
        </div>
   
    






)}
{ page=="Listed" &&   (
    <div className='w-full p-5'>
        {load ? (<Loading/>):(
            <>
                {list.length>0? (<table className="w-full h-fit table-auto border-collapse p-2">
<thead>
<tr className='underline p-2'>
<th>Date</th>
<th>Time</th>
<th>Pickup Location</th>
<th>Drop Location</th>
<th>Expired</th>

</tr>
</thead>
<tbody>
{list.map((value, index) => (
<tr key={index} className={value.isexpired ? 'bg-gray-400 font-mono':'font-mono'}>
<td className="border h-fit w-fir p-1">{dayjs(value.date).format('YYYY-MM-DD')}</td>
<td className="border h-fit w-fit p-1 ">{value.time}</td>
<td className="border h-fit w-fit p-1">{value.pickup}</td>
<td className="border h-fit w-fit p-1">{value.destination}</td>
<td className="border h-fit w-fit p-1">{value.isexpired==true ? 'YES':'NO'}</td>
</tr>
))}
</tbody>
</table>
                    
                ):(
                    <div className='font-bold'>No Listing Found.</div>
                )}
            </>

            


        )}
        </div>
   
    






)}</>)}

{ page=="history" &&   (
    <div className='w-full p-5'>
        {load ? (<Loading/>):(
            <>
                {deadbook.length>0? (<table className="w-full h-fit table-auto border-collapse p-2">
<thead>
<tr className='underline p-2'>
<th>Date</th>
<th>Time</th>
<th>Pickup Location</th>
<th>Drop Location</th>

</tr>
</thead>
<tbody>
{deadbook.map((value, index) => (
<tr key={index}>
<td className="border h-fit w-fit p-1">{dayjs(value.date).format('YYYY-MM-DD')}</td>
<td className="border h-fit w-fit p-1 ">{value.time}</td>
<td className="border h-fit w-fit p-1">{value.pickup}</td>
<td className="border h-fit w-fit p-1">{value.destination}</td>
</tr>
))}
</tbody>
</table>
                    
                ):(
                    <div className='font-bold'>No Booking Found.</div>
                )}
            </>

            


        )}
        </div>
   
    






)}

    {page=="profile" && (
        <div className=' h-fit w-full  rounded-3xl shadow-2xl flex flex-col gap-4 p-3'>
    <div className='flex justify-center items-center h-50'>
        <img className='rounded-full h-30 w-30' src={profile}></img>
    </div>
    <div className='[&>*]: flex gap-2 flex-col [&>*]:h-10 [&>*]:p-2.5'>
        <div className='flex flex-row gap-2 items-center'>
            <h3>Name : </h3>
            <input id='fname' className=' rounded-2xl p-2 bg-gray-300' defaultValue={data.username} onChange={ (e)=>{
        setchange(true)}}> 
        </input>
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <h3>E-Mail : </h3>
            <input id='lname' className=' rounded-2xl p-2 bg-gray-300' defaultValue={data.email}  onChange={ ()=>{setchange(true)}}></input>

            
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <h3>NITC-MAIL  : </h3>
            <input disabled defaultValue={data.phone || 'Unavailable'} className='bg-gray-300 rounded-2xl hover:cursor-not-allowed p-2'></input>


            
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <h3>CONTACT-NO : </h3>
            <input disabled defaultValue={data.phone || 'Unavailable'} className='bg-gray-200 rounded-2xl hover:cursor-not-allowed p-2 bg-gray-300'></input>


            
        </div>
       
        
    </div>
    <div className='flex justify-around [&>*]:h-15 [&>*]:rounded-2xl [&>*]:p-3 '>
        <button className='bg-black text-white hover:cursor-pointer' onClick={()=>{ setpage('delete')}}>DELETE ACCOUNT</button>
        <button  className='bg-gray-200 text-black hover:cursor-pointer' onClick={()=>{ setpage('logout')}}>LOGOUT</button>
    </div>
    {changes==true?(<button>SAVE CHANGES</button>):(<div></div>)}



    </div>)
    
    
    
    
    }

    {c==true? (<> contact</>):(<></>)}






    
</div>

</div>):(
        <div className='w-full h-full fixed inset-0 z-10    '>
            <div className='w-full h-full z-20 absolute backdrop-blur-lg backdrop-brightness-50 flex items-center justify-center'>
            <div className='w-150 h-100 bg-white rounded flex flex-col p-10 items-center' >
                <h2 className='text-2xl font-bold'>Are you sure you want to cancel this ride booking?</h2>
                <p className=' py-10'>This action cannot be undone. If you proceed, your seat will be released for other users, and you may not be able to rebook it later.</p>
                <div className='flex flex-row justify-around items-center w-full'>
                    <motion.button className='w-fit h-fit p-2 rounded-xl hover:cursor-pointer bg-transparent'
                    whileHover={{
    backgroundColor: "#000000",
    color: "#ffffff" 
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}

  onClick={()=>{showPopup(false)}}
                    >Cancel</motion.button>

                    <motion.button className=' w-fit h-fit p-2  bg-transparent text-black rounded-xl hover:cursor-pointer
                    '
                    whileHover={{
    backgroundColor: "#000000",
    color: "#ffffff" 
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}
  onClick={async()=>{
    await axios.post(`http://www.localhost:5000/delentry`,{detail:del,id:id}).then((res)=>{console.log(res)}).then(res=>{console.log(res)
    window.location.reload()})
    
  }}
                    >Confirm</motion.button>
                </div>

                
            </div>
                
            </div>
        </div>)}


        {page=='delete' && <div className='fixed inset-0  z-10'>
        <div className='inset-0 absolute backdrop-blur-sm flex justify-center items-center z-20 backdrop-brightness-50 '>
         <div className=' w-150 h-100 flex flex-col gap-5 p-10 text-black bg-white rounded-sm '>
            <h2 className='w-full text-2xl font-bold'>
            Are you absolutely sure you want to delete your account?  
This action is permanent and all your data will be lost.
</h2>
            <p className='flex-1'>* You will no longer be able to recover your profile, messages, bookings, or any associated content.
</p>
            <div className='flex flex-row w-full h-fit justify-around '><motion.button className='hover:cursor-pointer p-2 rounded-lg'
              whileHover={{
    backgroundColor: "#000000",
    color: "#ffffff" 
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}
            
            onClick={()=>{setpage('profile')}}>Cancel</motion.button> <motion.button 
            className='hover:cursor-pointer p-2 rounded-lg'
              whileHover={{
    backgroundColor: "#000000",
    color: "#ffffff" 
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}
  onClick={()=>{delet()}}
            >Confirm</motion.button></div>
         </div>



        </div></div>}

        {page=='logout' && <div className='fixed inset-0  z-10'>
        <div className='inset-0 absolute backdrop-blur-sm flex justify-center items-center z-20 backdrop-brightness-50 '>
         <div className=' w-150 h-100 flex flex-col gap-5 p-10 text-black bg-white rounded-sm '>
            <h2 className='w-full text-2xl font-bold'>
           Are you sure you want to log out?  
</h2>
            <p className='flex-1'>* You will need to log in again to access your account.
</p>
            <div className='flex flex-row w-full h-fit justify-around '><motion.button className='hover:cursor-pointer p-2 rounded-lg'
              whileHover={{
    backgroundColor: "#000000",
    color: "#ffffff" 
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}
            
            onClick={()=>{setpage('profile')}}>Cancel</motion.button> <motion.button 
            className='hover:cursor-pointer p-2 rounded-lg'
              whileHover={{
    backgroundColor: "#000000",
    color: "#ffffff" 
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut"
  }}
  onClick={()=>{logout()}}
            >Confirm</motion.button></div>
         </div>



        </div></div>}
            </div>
    
    
    
</main>



)
;
}
export default Dashboard
