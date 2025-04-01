
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage=()=>{
  
//logic used here is data is taken and send it to backend where i have stored user data in a json file.
//if found authentication successfull ?if not Authentication failed


const navigate=useNavigate()

const submit= async(event)=> {
   event.preventDefault();
  const values={username:document.getElementById('f').value,
   
    e:document.getElementById('e').value,
    p:document.getElementById('p').value
  }
  console.log(values);
  console.log(localStorage.getItem('token'))

await axios.post('http://www.localhost:5000/register',values).then(res=>{console.log(res.data.token_v)
  localStorage.setItem("token",res.data.token_v);
  navigate('/Dashboard')}).catch(err=>{alert(err)});


  
// }
}
const [curr,setcurr]=useState(true)
const login_register=()=>{
 if (curr==true){
  setcurr(false)
 }
 if (curr==false){
  setcurr(true)
 }
}
const login= async(event)=>{
  event.preventDefault();
  const cred={u:document.getElementById('u').value,
    pp:document.getElementById('pp').value
  }
  await axios.post("http://www.localhost:5000/checkdata",cred)
  .then((res)=>{if (res.data.status==="true")
    {
     localStorage.setItem('token',res.data.token)
     navigate('/Dashboard')
    } 
    else{
     alert("Invalid Credentials")
    }}).catch(err=>{console.log(err)})
  
  
}



return (
  
<div  className='h-screen w-full bg-gray-500 overflow-auto flex justify-center items-center'>
<div className='w-300 h-200 bg-gray-800  rounded-4xl p-3 flex justify-evenly '>
  <div className='border-1 h-full w-150 rounded-4xl'>


  </div>
  {curr === true ? (
    <div className='h-full  rounded-4xl '>

    <div className='text-[white] p-5 m-10   h-full flex flex-col justify-evenly'>
     <div className=''> <h1 className='text-left text-5xl mt-3 '>Create an Account</h1>
     <span className=' text-left mt-5 '> Already Have an Account <a  className='underline cursor-pointer' onClick={login_register}>Log in</a></span></div>
      <form    className='flex flex-col justify-between gap-3' onSubmit={submit}>
        <div className=' flex justify-between gap-3'>
        <input id='f' className=' focus:border-black focus:p-1' type='text' placeholder='Username'></input>
        </div>
        <input id='e' type='email' placeholder='Email' className='block mt-3 w-full  focus:p-1'></input>
        <input id='p' type='password' placeholder='Enter your Password' className='mt-3 block w-full  focus:p-1'></input>
        <div>
        <div><input id='d' type='checkbox' />
        <span className='mt-4 ml-3 '>Register as Cab driver</span></div>
        <input type='radio' id='tc' />
        <span className='mt-4 ml-3'>I agree to the <a>Terms & Conditions</a></span>
        </div>
        <button  className='block bg-black w-full h-10 rounded-4xl mt-10'onClick={submit}>Create Account</button>
      </form>
      <span className='text-center'>---Or Register With---</span>
      <div className='flex justify-evenly'>
        <button> Google</button>
        <button> Apple</button>
      </div>
    </div>

  </div>
  ):( <div className='h-full  rounded-4xl '>

<div className='text-[white] p-5 m-10   h-full flex flex-col justify-evenly'>
 <div className=''> <h1 className='text-left text-5xl mt-3 '> Login To Account</h1>
 <span className=' text-left mt-5 '> New Here ? <a  className='underline cursor-pointer' onClick={login_register}>Register</a></span></div>
  <form    className='flex flex-col justify-between gap-3' onSubmit={login}>
    <div className=' flex justify-between gap-3'>
    <input id='u' className=' focus:border-black focus:p-1' type='text' placeholder='Username'></input>
    
    </div>
   
    <input id='pp' type='password' placeholder='Enter your Password' className='mt-3 block w-full  focus:p-1'></input>
    <div>
   
    
    
    </div>
    <button  className='block bg-black w-full h-10 rounded-4xl mt-10' onClick={login}>Login</button>
  </form>
  <span> <a> Forgot Password</a></span>
  
</div>

</div>)}

</div>
 
 </div>
);
}

export default LoginPage