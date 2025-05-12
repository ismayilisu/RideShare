import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Protected from './components/Protected';
import Explore from './components/Explore';
import DriverDashboard from './components/DriverDashboard';
import About from './components/About';
import Rides from './components/Rides';
import Main from './components/Main';
import Driver from './components/Driver';
import Ridedet from './components/Ridedet';
import E from './components/E'
function App() {
  return (
    <Router>
      <Routes>
      <Route path='/e' element={<E/>}/>
      <Route path='getdet' element={<Protected><Ridedet/></Protected>}/>
      <Route path='/dl' element={<Protected><Driver/></Protected>}/>
<Route path='/main' element={<Main/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/booking' element={<Rides/>}></Route>
        <Route path='/LoginPage' element={<LoginPage/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/Dashboard' element={<Protected><Dashboard/></Protected>}/>
     
        <Route path='/about' element={<About/>}></Route>
        <Route path='/rides' element={<Rides/>}></Route>
       
        
        
        
        
      </Routes>
    </Router>
   
  
   
  );
}

export default App;
