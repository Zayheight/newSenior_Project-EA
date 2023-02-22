import React from "react";
import { Link } from 'react-router-dom';

import '../style-component/footer.css';

function Footers(){
    return(
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
            <footer>
            <div class="container">
                <div class="footerlogo">
                    <h3>company name
                    or logo</h3>
                </div>

                <div class="row">
                    <div class="contacts">
                        <h3 >ติดต่อและรับข้อมูลข่าวสารได้ที่</h3>
                        <Link to="https://www.facebook.com/profile.php?id=100057122843991"
                            ><i class="fab fa-facebook" alt="" id="bb"></i></Link>
                        <Link to="#"> <i class="fa fa-envelope" aria-hidden="true" alt="" id="bb"></i>
                        </Link>
                        <Link to="#"> <i class="fab fa-youtube" id="bb"></i>
                        </Link>
                        <Link to="#"> <i class="fab fa-line" id="bb"></i>
                        </Link>
                    </div>

                </div>
            </div>
            </footer>
        </div>
    );
}


export default Footers;