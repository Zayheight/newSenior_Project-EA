import '../css/home.css' ;
import { Fragment } from 'react';
import Footers from '../component/com-home/footer';
import Formlogin from '../component/com-singin/formlogin';
import useToken from './useToken';
import Navbar from "../component/navbar";
function UserHome() {
    const { token, setToken } = useToken();
    if(!token) {
        window.location.replace("http://localhost:3000/Signin");
    }
    return (
        <div>
            <Fragment>
                <Navbar></Navbar>
            </Fragment>
        </div>
        
    );
  }
  
  export default UserHome;
  