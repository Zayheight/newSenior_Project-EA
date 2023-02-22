import "../css/home.css";
import "../css/dashbord.css";
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/navbar";
import Formlogin from "../component/com-singin/formlogin";
import useToken from "./useToken";
import { Fragment } from "react";
import Axios from "axios";
import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Summary() {
  const { token, setToken } = useToken();
  const [userlist, setuserlist] = useState([]);

  if (!token) {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Formlogin setToken={setToken} />
      </Fragment>
    );
  }

  const getuser = () => {
    Axios.get("http://localhost:3001/user").then((response) => {
      setuserlist(response.data);
      console.log(response);
    });
  };
  getuser();

  return (
    <div>
      <Navbar></Navbar>
      <div class="landingpage">
        <div class="container1">
          <Sidebar></Sidebar>

          <main>
            <h1>สมาชิกทั้งหมด</h1>
            <button class=""><Link to='/UserManager'> เพิ่มผู้ใช้ </Link> </button>
            
                <div class="recent-orders">
                  <h2></h2>
                  <table>
                    <thead>
                      <tr>
                        <th>user id</th>
                        <th>name </th>
                        <th>email</th>
                        <th>password</th>
                        <th>port</th>
                        <th>action</th>

                      </tr>
                    </thead>
                    <tbody>
                    {userlist.map((val) => {
              return (
                      <tr >
                        <td>{val.user_id}</td>
                        <td>{val.user_name}</td>
                        <td>{val.email}</td>
                        <td>{val.password} </td>
                        <td>{val.sum_port} </td>
                        <td >
                        <Link class="danger" to="/"> EDIT /</Link>
                        <Link class="danger" to="/"> DEL</Link> 
                        </td>
                        <td  ><Link class="warning" to="/Transaction"> Show All</Link>  </td>
                      </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              
          </main>
        </div>
      </div>
    </div>
  );
}

export default Summary;
