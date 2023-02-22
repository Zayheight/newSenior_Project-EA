import "../css/home.css";
import ContenBox2 from "../component/com-home/ContentBox2";
import Navbar from "../component/navbar";
import { Fragment } from "react";
import ContenBox1 from "../component/com-home/ContentBox1";
import Scolltotop from "../component/com-home/ScollToTop";
import Footers from "../component/com-home/footer";
import logo2  from '../component/ccf6f47d-0b25-4776-91e7-1abf03d7b5b7.png';

function home() {
  //console.log("test");
  return (
    <div>
      <Navbar></Navbar>
      <body class= "home">
        <div class="landingpage">
          <ContenBox1></ContenBox1>


          <section class="vdo">
            <section class="content1-home">
              <div class="container">
                <div class="row">
                  <div class="col-sm">
                    <iframe
                      id="Vdo1"
                      width="530"
                      height="310"
                      src="https://www.youtube.com/embed/UVzVUDXoi0Y"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-sm">
                    <span class="infobox-boldtext">ตัวอย่างการทำงานของ EA  </span>
                    <p class="infobox-slimtext">
                     - ตัวอย่างการทำงานของระบบเทรด <br></br> - ผลการ Back Test (เทสกับกราฟย้อนหลัง)
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section class="">
            <ContenBox2></ContenBox2>
          </section>

          <Scolltotop></Scolltotop>
        </div>

        <section>
          <Footers></Footers>
        </section>
      </body>
    </div>
  );
}

export default home;
