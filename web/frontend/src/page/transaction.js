import "../css/home.css";
import "../css/dashbord.css";
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/navbar";
import Formlogin from "../component/com-singin/formlogin";
import GetUserdata from "../component/admin/getuerdata";
import useToken from "./useToken";
import { Fragment,useEffect,useState} from "react";
import Axios from "axios";
import {  useLocation } from "react-router-dom";


function Transaction() {
  const { token, setToken } = useToken();
  

  
  if (!token) {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Formlogin setToken={setToken} />
      </Fragment>
    );
  }

  //console.log('test')


  return (
    <div>
      <GetUserdata></GetUserdata>
      
    </div>
  );
}

export default Transaction;
