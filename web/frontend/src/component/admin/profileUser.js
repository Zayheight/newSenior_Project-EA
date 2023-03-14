import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";
import Chartcomponent from "./chart";
import { useLocation } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { Button } from "antd";
import { message, Popconfirm } from "antd";

function Profileuser() {
  const [userlist, setuserlist] = useState([]);
  const location = useLocation();
  const [userport, setuserport] = useState([]);
  const [userid, setuserid] = useState(location.state.id); //sent from dashbord

  useEffect(() => {
    Axios.get("http://localhost:3001/user").then((res) => {
      setuserlist(res.data);
    });
    Axios.get("http://localhost:3001/port").then((res) => {
      setuserport(res.data);
    });
  });

  const user = userlist.filter((obj) => {
    return obj.user_id === userid;
  });
  const profile = user.find((obj) => {
    return obj.user_id === userid;
  });
  //console.log(profile);

  return (
    <div>
      <div className="profile">
        {profile && (
          <div>
            <h1> id: {profile.user_id} </h1>
            <h1> name: {profile.user_name}</h1>
            <br></br>
            <h1>email: {profile.email} </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profileuser;
