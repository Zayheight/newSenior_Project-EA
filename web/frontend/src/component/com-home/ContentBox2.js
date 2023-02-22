import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import trading from '../../img/trading.png';
function ContenBox2() {
  return (
    <div class="box2">
      <div class="infobox">
        <p class="infobox-boldtext">ระบบเทรดอัตโนมัติ Buffet EA ที่จะช่วยให้คุณมีอิสระทางการเงินมากขึ้น!! </p> 
        
        <p class="infobox-slimtext">
        Buffet EA เป็นผู้พัฒนาระบบเทรด Forex อัตโนมัติ 
        โดยมีประสบการณ์การเทรดจริงในตลาดมาแล้วมากกว่า 5 ปี เราต้องการสร้าง EA ที่สามารถนำไปทดลองปรับเปลี่ยน Parameter 
        และลอง Demo ได้ทุก features โดยที่ไม่ต้องซื้อ ซึ่ง ช่วยให้ผู้เทรดไม่พลาดโอกาสที่ดีในการเทรดและทำกำไรอย่างมีประสิทธิภาพ
        </p>
        
        <div class="infobox2">
          <div class="infobox2-items">
          <div class="itemwrapper">
            <div class="infobox2-items-item">
              <img src={trading} width="36" height="36"></img>
            </div>
            <p>เหมาะกับคนที่ไม่มีเวลาในการเทรด</p>

          </div>
          <div class="itemwrapper">
            <div class="infobox2-items-item">
              <img src={trading} width="36" height="36"></img>
            </div>
            <p>เหมาะกับคนที่ไม่มีเวลาในการเทรด</p>

          </div>
          <div class="itemwrapper">
            <div class="infobox2-items-item">
              <img src={trading} width="36" height="36"></img>
            </div>
            <p>เหมาะกับคนที่ไม่มีเวลาในการเทรด</p>

          </div>
          <div class="itemwrapper">
            <div class="infobox2-items-item">
              <img src={trading} width="36" height="36"></img>
            </div>
            <p>เหมาะกับคนที่ไม่มีเวลาในการเทรด</p>

          </div>
          
          </div>
        </div>

      </div>
    </div>

    
  );
}

export default ContenBox2;
