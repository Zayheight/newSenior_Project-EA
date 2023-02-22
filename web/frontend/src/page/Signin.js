
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Navbar from "../component/navbar";
import Formlogin from '../component/com-singin/formlogin';
import { Fragment } from 'react';
import useToken from './useToken';

function Signin() {
  const { token, setToken } = useToken();
  if(!token) {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Formlogin setToken={setToken} />
      </Fragment>
    );
  }
}

export default Signin;
