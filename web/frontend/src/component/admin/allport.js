import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";
import Addport from "./ModalAdd_port";
import Profileuser from "./profileUser";
import { useLocation } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { PlusCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Select, Input } from "antd";
import { Button } from "antd";
import { message, Popconfirm } from "antd";



function Allport() {
  const [userlist, setuserlist] = useState([]);
  const location = useLocation();
  const [userport, setuserport] = useState([]);
  const [userid, setuserid] = useState(location.state.id); //sent from dashbord
  const [fromport, setfromport] = useState("");
  const [open, setOpen] = useState(false);
  


  useEffect(() => {
    Axios.get("http://localhost:3001/transaction").then((res) => {
      setuserlist(res.data);
    });
    Axios.get("http://localhost:3001/port").then((res) => {
      setuserport(res.data);
    });
  });


  const user = userlist.filter((obj) => {
    return obj.user_id === userid;
  });


  const Findportuser = userport.filter((obj) => {
    return obj.user_id === userid;
  });


  const confirm = (e) => {
    //console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    //console.log(e);
    message.error("Click on No");
  };

  const setdelete_portnum = (e) => {};

  const onCreate = (values) => {
    setfromport(values.portnumber);
    console.log('Received values of form: ', fromport);
    setOpen(false);
    Axios.post("http://localhost:3001/addport", {
      Userid: userid,
      portnumber: values.portnumber,
      
    }).then((response) => {
      if (response.data.msg == "add port number success") {
        message.success("Add port number success");
      } else {
        message.error("This port number already exists.");
      }
    });
  };


  return (
    <div>
      <Navbar></Navbar>
      <div className="landingpage">
        <div className="container1">
          <Sidebar></Sidebar>
          <main>
            <div className="recent-orders">
              <Profileuser></Profileuser>
              

              <Button
                icon={<PlusCircleOutlined />}
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add port number
              </Button>
              <Addport
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            

              <table>
                <thead>
                  <tr>
                    <th>PORT NUMBER </th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {Findportuser.map((val) => {
                    return (
                      <tr>
                        <td>{val.port_number}</td>
                        <td>
                          <Popconfirm
                            title="Delete port number?"
                            style={{}}
                            description="Are you sure to delete this port number?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              onClick={() => {
                                setdelete_portnum(val.port_number);
                              }}
                              type="link"
                              danger
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        </td>
                        <td>
                          <Link
                            to="/Dashbord/Transaction"
                            class="warning"
                            state={{ id: val.port_number }}
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default Allport;
