import './App.css';
import Transaction from './page/transaction';
import Home from './page/home';
import Eaproduct from './page/EaProduct';
import About from './page/About';
import Signin from './page/Signin';
import UserHome from './page/UserHome';
import UserManager from './page/UserManager';
import Summary from './page/Summary';
import Dashbord from './page/Dashbord';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className=''>
      <Routes>
        <Route path="/"element={<Home/>} ></Route>
        <Route path="/About" element={ <About/>} ></Route>
        <Route path="/Eaproduct" element={<Eaproduct/>} ></Route>
        <Route path="/Signin" element={<Signin/>} ></Route>
        <Route path="/UserHome" element={<UserHome/>} ></Route>
        <Route path="/UserManager" element={<UserManager/>} ></Route>
        <Route path="/Summary" element={<Summary/>} ></Route>
        <Route path="/Dashbord" element={<Dashbord/>} ></Route>
        <Route path="/Transaction"element={<Transaction/>} ></Route>


      </Routes> 
    </div>


  );
}

export default App;
