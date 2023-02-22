import "../css/home.css";
import "../css/dashbord.css";
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/navbar";
import Formlogin from "../component/com-singin/formlogin";
import useToken from "./useToken";

import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from '@mui/material';

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Fragment, useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Dashbord() {

  const { token, setToken } = useToken();
  const [userlist, setuserlist] = useState([""]);
  const [user, setuser] = useState([""]);
  const [emailsearch, setemailsearch] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/user").then((res) => {
      setuserlist(res.data);
      test();
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

  //console.log(newsearch);
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = true;
      setemailsearch(event.target.value);
      //console.log(emailsearch);
    }
  };

  const newsearch = userlist.filter((obj) => {
    if (obj.email === emailsearch) {
      return obj.email === emailsearch;
    }
  });

  function test() {
    if (emailsearch === "") {
      setuser(userlist);
    } else setuser(newsearch);
  }
  //console.log(newsearch);

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

              <Stack spacing={1} sx={{ width: 300 }}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  size="small"
                  disableClearable
                  onKeyDown={handleEnter}
                  options={userlist.map((option) => option.email)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search email"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                    
                  )}
                />
              </Stack>
              <Button variant="contained" endIcon={<PersonSearchIcon />  }>ค้นหา</Button>

              <table className="scroll">
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
                      <tr>
                        <td>{val.user_id}</td>
                        <td>{val.user_name}</td>
                        <td>{val.email}</td>
                        <td>{val.password} </td>
                        <td>{val.sum_port} </td>
                        <td>
                          <Link class="danger" to="/">
                            EDIT /
                          </Link>
                          <Link class="danger" to="/">
                            {" "}
                            DEL
                          </Link>
                        </td>
                        <td>
                          <Link
                            to="/Transaction"
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
