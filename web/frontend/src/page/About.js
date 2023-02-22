import Navbar from '../component/navbar';
import About1 from '../component/com-about/aboutus1';
import Footers from '../component/com-home/footer';
import '../css/about.css';
function About() {

  
  return (
    <div>
      <Navbar></Navbar>
      <body class="About">
        <div class="landingpage">
          <section>
            <About1></About1>
          </section>
          
        </div>

        <section>
          <Footers></Footers>
        </section>
        
      </body>
    </div>
    
  );
}

export default About;
