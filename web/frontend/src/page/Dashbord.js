import "../css/home.css";
import "../css/dashbord.css";
import Popupconfirm from "../component/popup/Popconfirmdelete";
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/navbar";
import Formlogin from "../component/com-singin/formlogin";
import useToken from "./useToken";

import { AutoComplete, Select, Input } from "antd";
import { message, Popconfirm } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Fragment, useEffect } from "react";
import Axios from "axios";
import { useState, useRef } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Dashbord() {
  const { token, setToken } = useToken();
  const [userlist, setuserlist] = useState([""]);
  const [user, setuser] = useState([""]);
  const [emailsearch, setemailsearch] = useState("");

  const [userid, setuserid] = useState();
  const [port, setport] = useState();
  const [porttabel, setudataporttabel] = useState([""]);  //  ดึงข้อมูล,เซ็ต

  const [issearch, setbtnsearch] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/user").then((res) => {
      setuserlist(res.data);
      setdatatabel();
    });
    Axios.get("http://localhost:3001/port").then((res) => {
      setudataporttabel(res.data);
    });
  });

  if (!token) {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Formlogin setToken={setToken} />
      </Fragment>
    );
  }

  const filtersearch = userlist.filter((obj) => {
    if (obj.email === emailsearch) {
      return obj.email === emailsearch;
    } else {
      return obj.email === false;
    }
  });
  function setdatatabel() {
    if (emailsearch === "" || issearch === false) {
      setuser(userlist);
    } else setuser(filtersearch);
  }
  
  //findport for delete
  const filteruserport = porttabel.filter(obj => {
    return obj.user_id === userid;
  });
  //console.log(filteruserport);

  const deletetran = (portnum) => {
    //console.log(portnum);

    Axios.delete(`http://localhost:3001/deletetran/${portnum}`).then((response) => {
      console.log(response);
    });
  };
  const deleteport = (portnum) => {
    Axios.delete(`http://localhost:3001/deleteport/${portnum}`).then((response) => {
      console.log(response);
    });
  };
  const deleteuser = (userid) => {
    Axios.delete(`http://localhost:3001/deleteuser/${userid}`).then((response) => {
      console.log(response);
    });
  };
  
  

  //Search
  const onChange = (e) => {
    setbtnsearch(true);
    setemailsearch(e);
    console.log(`onChange ${e}`);
  };
  const onSearch = (e) => {
    console.log("onsearch:", e);
    setbtnsearch(false);
  };

  //popupdelete
  const confirm = (e) => {
    //console.log(e);
    filteruserport.map((val) => {
      deletetran(val.port_number);
     })
    filteruserport.map((val) => {
      deleteport(val.port_number);
     })
     
    deleteuser(userid);

    message.success("Click on Yes");
  };
  const cancel = (e) => {
    //console.log(e);
    message.error("Click on No");
  };

  const setdeleteuser_id =(e)=>{
    setuserid(e);
  }



  return (
    <div>
      <Navbar></Navbar>
      <div class="landingpage">
        <div class="container1">
          <Sidebar></Sidebar>
          <main>
            <h1>สมาชิกทั้งหมด</h1>
            <button class="">
              <Link to="/UserManager"> เพิ่มผู้ใช้ </Link>
            </button>
            <div class="recent-orders">
              <h2> </h2>

              <AutoComplete
                onChange={onChange}
                onSearch={onSearch}
                style={{
                  width: 300,
                }}
                options={userlist.map((val, index) => {
                  return {
                    label: val.email,
                    value: val.email,
                    key: index,
                  };
                })}
                placeholder="Search email"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />

              <table className="">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>PORT</th>
                    <th>ACTION</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((val) => {
                    return (
                      <tr >
                        <td>{val.user_id}</td>
                        <td>{val.user_name}</td>
                        <td>{val.email}</td>
                        <td>{val.password} </td>
                        <td>{val.sum_port} </td>
                        <td>
                          <Popconfirm
                            title="Delete?"
                            style={{}}
                            description="Are you sure to delete this user?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button onClick={() => {setdeleteuser_id(val.user_id)}} type="link" danger>
                              Delete 
                            </Button>
                          </Popconfirm>
                        </td>
                        
                        <td>
                          <Link
                            to="/Dashbord/Userport"
                            class="warning"
                            state={{ id: val.user_id }}
                          >
                            Show all
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div></div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
