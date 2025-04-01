import React from 'react'
import './dd.css'
import { useNavigate } from 'react-router-dom'

const DriverDashboard=()=>{
    const navigate=useNavigate()
    return (
        <main>
            <div className='navbar'>
          

            </div>
            <div className='main'></div>
            <div className='side'>
                <ul>
                    <button><img src={require('./images/home.png')}/></button>
                    <button><img src={require('./images/test-drive.png')}/></button>
                    <button><img src={require('./images/about-us.png')}/></button>
                </ul>
            </div>



        </main>

        
    )



}

export default DriverDashboard
