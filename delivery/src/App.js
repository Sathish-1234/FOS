import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import { BottomNavigation } from '@mui/material';
import BottomNavbar from './Components/Navbar/BottomNavbar';
import { Route, Routes } from 'react-router-dom';
import Deliveries from './Components/Deliveries/Deliveries';
import MyEarnings from './Components/MyEarnings/MyEarnings';
import Profile from './Components/Profile/Profile';
import LoginRegisterCheck from './Components/Login/Login';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';

function App() {
  const dpId = localStorage.getItem("dpId");
return (
    <div>

      {/* Navbar */}

      <Navbar/>
      {
        (dpId)

        ?

        <div className="d-md-none px-4">
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/login' Component={Login}></Route>
            <Route path='/register' Component={Register}></Route>
            <Route path='/deliveries' Component={Deliveries}></Route>
            <Route path='/my-earnings' Component={MyEarnings}></Route>
            <Route path='/my-earnings' Component={MyEarnings}></Route>
            <Route path='/my-profile' Component={Profile}></Route> 
          </Routes>

        </div>

        :

        <div className="d-md-none px-4">
          <Routes>
            <Route path='/' Component={Login}></Route>
            <Route path='/register' Component={Register}></Route>
          </Routes>

        </div>


      }

      {/* Sections - Mobile Screen*/} 


      {/* Laptop Screen */}
      
      <div className=" d-none d-md-block w-100 fs-2 text-center mb-5">
        <div style={{height:'70vh'}} className='d-flex flex-column justify-content-center align-items-center'>
          <div>This delivery application is only applicable for </div>
          <b>mobile or tablet* devices</b>
        </div>
      </div>


      {/* Footer */}

      <Footer/>


      <div className='d-md-none' style={{position:'sticky',bottom:0,width:'100%'}}>
        <BottomNavbar/>
      </div>

    </div>
  );
}
export default App;
