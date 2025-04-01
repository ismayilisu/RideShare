import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Protected from './components/Protected';
import Explore from './components/Explore';
import DriverDashboard from './components/DriverDashboard';
import About from './components/About';
function App() {
  return (
    <Router>
      <Routes>

        <Route path='/home' element={<Home/>}/>
        <Route path='/LoginPage' element={<LoginPage/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/Dashboard' element={<Protected><Dashboard/></Protected>}/>
        <Route path='/DDashboard' element={<DriverDashboard/>}/>
        <Route path='/about' element={<About/>}></Route>
       
        
        
        
        
      </Routes>
    </Router>
   
  
   
  );
}

export default App;
