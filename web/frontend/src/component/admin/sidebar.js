import React from "react";
import Axios from "axios";
import useToken from "../../page/useToken";
import Navbar from '../navbar';
import { useState } from "react";
import Formlogin from '../../component/com-singin/formlogin';

import { Fragment } from 'react';

import { Link,useMatch, useResolvedPath } from "react-router-dom"

function Sidebar() {
    const { token, setToken } = useToken();

    if(!token) {
        return (
            <Fragment>
                <Navbar></Navbar>
                <Formlogin setToken={setToken} />
            </Fragment>
        );
    }

    return(
      <div >
            <div className="">
                <aside>
                    {/* <div className="sidebar">
                    <Link to='/dashbord' >
                        <h3>Dashbord</h3>
                    </Link>
                    <Link to='/UserManager' >
                        <h3>User Manager</h3>
                    </Link>
                    <Link to='/Summary' >
                        <h3>User</h3>
                    </Link>
                    
                    </div> */}
                </aside>
                
            </div>
        </div>
    );
}

export default Sidebar;