
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const LoginPage=()=>{
  
//logic used here is data is taken and send it to backend where i have stored user data in a json file.
//if found authentication successfull ?if not Authentication failed


const navigate=useNavigate()
const [page,setpage]=useState("login")

const submit= async(event)=> {
   event.preventDefault();
  const values={
    username:document.getElementById('f').value,
    e:document.getElementById('e').value,
    pp:document.getElementById('p').value
  }


await axios.post('http://www.localhost:5000/register',values).then(
  res=>{
  localStorage.setItem("token",res.data.token_v);
  localStorage.setItem("id",res.data.id)
  navigate('/home')}).catch(err=>{alert(err)});


  
// }
}


const login= async(event)=>{
  event.preventDefault();
  const cred={
    username:document.getElementById('u').value,
    pp:document.getElementById('pp').value
  }
  await axios.post("http://www.localhost:5000/checkdata",cred)
  .then((res)=>{if (res.data.status==="true")
    {
      console.log(res.data)
     localStorage.setItem('token',res.data.token)
     localStorage.setItem('id',res.data.id)
     console.log(localStorage.getItem('id'))
     navigate('/home')
    } 
    else{
     alert("Invalid Credentials")
    }}).catch(err=>{console.log(err)})
  
  
}



return (
  
<div  className='h-screen w-screen bg-black overflow-hidden flex justify-center items-center'>
<div className='h-fit border-white w-fit border-2 rounded-2xl flex flex-col p-5'>
  <div className='w-full h-10 p-5 flex flex-row justify-around items-center [&>*]:text-white [&>*]:font-mono  [&>*]:text-2xl  [&>*]:hover:cursor-pointer'>
    <button className='p-2' onClick={()=>{setpage("login")}}> LOGIN</button>
    <button onClick={()=>{setpage("register")}}> NEW USER</button>
  </div>
  <div className='h-full w-full bg-gray-400 p-2 rounded-2xl'>
  {page==="login"? (
    <div className='flex flex-row justify-center items-center p-10 '>
    <form    className='flex flex-col justify-between gap-3 ' onSubmit={login}>
    <div className=' flex justify-between gap-3 items-center'>
    <h2>Username : </h2>
    <input id='u' className=' focus:border-black p-1 rounded-xl ' type='text' placeholder='Enter your Username'></input>
    
    </div>
 <div className=' flex justify-between gap-3 items-center'>
 <h2>Password : </h2>
 <input id='pp' type='password' placeholder='Enter your Password' className='mt-3   p-1 rounded-xl'></input>
 </div>
 <span> <a href='www.google.com' className='underline'> Forgot Password</a></span>
    <button  className='block bg-black w-full h-10 rounded-4xl mt-10 text-white font-mono' onClick={login}>Login</button>
   
  </form>
  
    </div>
  ):(
    <div className='p-10 flex flex-row items-center justify-center'>
    <form    className='flex flex-col justify-between gap-3' onSubmit={submit}>
        <div className=' flex justify-between gap-3 items-center'>
        <h2>Username :</h2>
        <input id='f' className=' rounded-xl p-1 ' type='text' placeholder='Enter Username'></input>
        </div>
        <div className=' flex justify-between gap-3 items-center'>
        <h2>Email : </h2>
        <input id='e' type='email' placeholder='Enter Email' className=' rounded-xl  p-1'></input>

        </div>
        <div className=' flex justify-between gap-3 items-center'>
          <h2>Password</h2>
          <input id='p' type='password' placeholder='Enter your Password' className='  '></input>

        </div>
        <div>
        
        <input type='checkbox' id='tc' className='' />
        <span className='mt-4 ml-3'>I agree to the <a className='underline'>Terms & Conditions</a></span>
        </div>
        <button  className=' bg-black w-full rounded-4xl mt-10 text-white font-mono h-10'onClick={submit}>Create Account</button>
      </form>
  </div>)}

  </div>
</div>

 
 </div>
);
}

export default LoginPage