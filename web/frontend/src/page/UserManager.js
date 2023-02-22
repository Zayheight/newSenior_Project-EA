import "../css/home.css";
import "../css/dashbord.css";
import Navbar from "../component/navbar";
import { Fragment } from "react";
import Sidebar from "../component/admin/sidebar";
import Formlogin from "../component/com-singin/formlogin";
import useToken from "./useToken";
import { useState } from "react";
import Axios from "axios";
import PopupSuccess from "../component/popup/popup";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function UserManager() {
  const { token, setToken } = useToken();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("");

  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const form = useRef();

  const submit = async (e) => {
    e.preventDefault();
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      setPassword(randomPassword);

    Axios.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: randomPassword,
      port: port,
    }).then((response) => {
      //console.log(response.data.msg);
      if (response.data.msg == "register unsuccess") {
        setMsg("unsuccessreg");
        setPopup(true);
      } else {
        setMsg("successreg");
        setPopup(true);
      }
    });

        var parms={
            user_name:username,
            user_email:email,
            message:randomPassword

        };
    emailjs
      .send(
        "service_sj6d3dg",
        "template_nw67rcu",
        parms,
        "F0sqlbUWHHa7eDrUX"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    console.log(randomPassword);
  };
  const test = async (e) => {
    e.preventDefault();
    //console.log("test");
    Axios.get("http://localhost:3001/getData").then((response) => {
      // console.log(response);
    });
  };
  if (!token) {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Formlogin setToken={setToken} />
      </Fragment>
    );
  }
  return (
    <div>
      <Navbar></Navbar>
      <div class="landingpage">
        <div class="container1">
          <Sidebar></Sidebar>
          <form ref={form}  onSubmit={submit}>
            <div class="sing-in-form ">
              <h2 class="title">เพิ่มข้อมูลผู้ใช้</h2>
              <div class="input-field">
                <input
                  type="text"
                  name="user_email"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div class="input-field">
                <input
                  name="user_name" 
                  type="username"
                  placeholder="Username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div class="input-field">
                <input
                  type="text"
                  placeholder="Port Number"
                  onChange={(event) => {
                    setPort(event.target.value);
                  }}
                />
              </div>
              
              <button class="btn-submit"    > submit</button>
              <PopupSuccess trigger={popup} setTrigger={setPopup} msg={msg} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserManager;
