import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

function Table_dash() {
  const [userlist, setuserlist] = useState([]);
  const location = useLocation();
  const [userid, setuserid] = useState(location.state.id); //sent from dashbord

  const [user,setuser]=useState([""]);
  const [emailsearch,setemailsearch] =useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/user").then((res) => {
      setuserlist(res.data);
    });
  });
  

  const handleEnter = (event) => {
    if ((event.key === 'Enter') ) {
    setuserlist([""]);

    // Prevent's default 'Enter' behavior.
    event.defaultMuiPrevented = true;
    console.log(userlist);
    setemailsearch(event.target.value);
    setuserlist(newsearch);
    setuser(newsearch);
    //console.log(newsearch);    

    }
  };
  const newsearch = userlist.filter((obj) => {
    if(obj.email === emailsearch) {
      return obj.email ===emailsearch;
    }else if (obj.email === ''){
      return obj.email===emailsearch;
    }
  });
  

  
  

  return (
    <div>
              
            <Stack spacing={1} sx={{ width: 300 }} >
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  size="small"
                  disableClearable
                  onKeyDown={handleEnter}
                  options={userlist.map((option) => option.email ) }
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
          
    </div>
  );
}

export default Table_dash;
