import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from '../Investment data-amico.png';


function ContenBox1() {
  return (
    <div class="box">
      
      <div class="infobox">
        <p class="infobox-slimtext">Expert Advisor </p>
        <p class="infobox-boldtext">สุดยอด EA Forex </p> <br></br>
        <p class="infobox-boldtext">ที่เปิดให้ใช้โดยไม่ต้องซื้อ!! </p>
        <p class="infobox-slimtext">
          ทำกำไรเฉลี่ยเดือนละ 20-30% การันตีด้วยผล Back Test ทำกำไรจาก 10,000$
          ไป 35,377$ ภายใน 1 ปี และมี Drawdown อยู่เพียงแค่ 00.00%
        </p>
        <div class="infobox-btnwrapper">
          <div class="btn " >
            <link 
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <a href="/" style={{textDecoration: "none" }} >
              Take a look at what we do{" "}
              <span id="arrow" class="material-symbols-outlined" >
                arrow_right_alt
              </span>
            </a>
          </div>
          
        </div>
        
        

        {/* <div class="infobox-btnwrapper">
        <button class="infobox-explorebtn ">ดูเพิ่มเติม</button>
        </div> */}
      </div>
      <div class="infobox">
        <img className="contenimg1" src={img1}></img>
      </div>
      
    </div>
    

    
  );
}

export default ContenBox1;
