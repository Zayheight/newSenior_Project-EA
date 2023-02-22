import React from "react";
import "../style-component/form-login.css"
import Axios from "axios";
import { useState } from "react";
import Popup from "./popup";
import {useNavigate } from "react-router-dom"

function Formlogin({ setToken }){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [popup,setPopup]=useState(false);
    const navigate = useNavigate();
    
    const signin =async e=>{
        e.preventDefault();
        Axios.post("http://localhost:3001/signin",{
            email:email,
            password:password,
        }).then((response)=>{
            if(response.data.error){
                setPopup(true);
            }else{
                setToken(response.data[0].user_name);
                console.log(response);
                if(response.data[0].user_name=="admin"){
                    navigate("/dashbord");
                }
                else{
                    navigate("/UserHome");
                }
            }
        });
    }
    return(
      <div >
            <form onSubmit={signin}>
                <div class="sing-in-form ">
                <h2 class="title">Sign in</h2>
                    <div class="input-field">
                        <input type="text" placeholder="Email" 
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        /> 
                    </div>
                    <div class="input-field">
                        <input type="password" placeholder="password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        />
                    </div>

                    <button class="btn-submit"> submit</button>
                    <Popup trigger={popup} setTrigger={setPopup}/>
                </div>
            </form>
        </div>
    );
}

export default Formlogin;