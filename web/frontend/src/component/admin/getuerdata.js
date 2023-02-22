import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function GetUserdata() {
  const [userlist, setuserlist] = useState([]);
  const location = useLocation();
  const [userid, setuserid] = useState(location.state.id); //sent from dashbord
  const [port, setport] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/transaction").then((res) => {
      setuserlist(res.data);
    });
  });

  //console.log(userlist);

  const user = userlist.filter((obj) => {
    return obj.user_id === userid;
  });
  const profile = user.find((obj) => {
    return obj.user_id === userid;
  });
  //console.log(profile);

  const newport = userlist.filter((obj) => {
    return obj.port_number === port;
  }); //setport
  //console.log(newport);
  //console.log(Object.values(user));

  const handleChange = (event) => {
    setport(event.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="landingpage">
        <div className="container1">
          <Sidebar></Sidebar>
          <main>
            <div className="recent-orders">
              <div className="profile">
                {profile && (
                  <div>
                    <h1> id:     {profile.user_id} </h1>
                    <h1> name:     {profile.user_name}</h1><br></br>
                    <h1>email:    {profile.email} </h1>

                  </div>
                )}
              </div>
              <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                <InputLabel id="demo-select-small">port number</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={port}
                  label="port number"
                  onChange={handleChange}
                >
                  {user.map((val) => {
                    return (
                      <MenuItem value={val.port_number}>
                        {val.port_number}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <table >
                <thead>
                  <tr>
                    <th>time </th>
                    <th>balance</th>
                    <th>profit</th>
                  </tr>
                </thead>
                <tbody>
                  {newport.map((val) => {
                    return (
                      <tr>
                        <td>{val.time}</td>
                        <td>{val.balance}</td>
                        <td>{val.profit} </td>
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

export default GetUserdata;
