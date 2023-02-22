import  '../style-component/scolltotop.css';
import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';

function Scolltotop(){
    const [scrollPosition, setScrollPosition] = useState(false);  //ตัวแรกเอาไว้ใช้ในแอพ ตัวสองเอาไว้เซ็ตข้อมูลใหม่

    //const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setScrollPosition(true)
        } 
        else if (scrolled <= 300){
            setScrollPosition(false)
        }
      };
      
      const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
          
        });
      };
      
      window.addEventListener('scroll', toggleVisible);


    return (
        <button class="button-scolltop">  
            <FaArrowCircleUp onClick={scrollToTop} 
            style={{display: scrollPosition ? 'inline' : 'none'}} />
        </button>
    );
}

export default Scolltotop;


