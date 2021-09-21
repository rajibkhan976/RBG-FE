import React from "react";
import { NavLink } from "react-router-dom";

import SetupIcon1 from "../../../assets/images/setupicon1.svg";
import SetupIcon2 from "../../../assets/images/setupicon2.svg";
import SetupIcon3 from "../../../assets/images/setupicon3.svg";
import SetupIcon4 from "../../../assets/images/setupicon4.svg";
import SetupIcon5 from "../../../assets/images/setupicon5.svg";
import SetupIcon6 from "../../../assets/images/setupicon6.svg";
import SetupIcon7 from "../../../assets/images/setupicon7.svg";


const Setup = (props) => {
    return(
        <div className="">
            <div className="setUpPopUp">
                <p className="headding1">Set Up </p>
                <ul>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon1} alt="" /></i>
                    <div>
                        <h3>Personal Details</h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon2} alt="" /></i>
                    <div>
                        <h3>Gym Details</h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon3} alt="" /></i>
                    <div>
                        <h3>Communication Setup</h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                    <ul className="secondListing">
                    <li>
                        <NavLink to="/email-setup">
                            Email
                        </NavLink>
                    </li> 
                    <li>
                        <NavLink to="/sms-setup">
                            SMS
                        </NavLink>
                    </li> 
                    <li>
                        <NavLink to="/call-setup">
                            Call
                        </NavLink>
                    </li> 
                    </ul>
                </li>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon4} alt="" /></i>
                    <div>
                        <h3>Data Administration</h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                    <ul className="secondListing">
                    <li><a href="#">Import History</a></li> 
                    <li><a href="#">Export History</a></li>
                    <li><a href="#">Activity Log</a></li> 
                    </ul>
                </li>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon5} alt="" /></i>
                    <div>
                        <h3>
                            <NavLink to="/Products">
                                Products
                            </NavLink>
                        </h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon6} alt="" /></i>
                    <div>
                        <h3>Customizations</h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="listHead">
                    <i><img src={SetupIcon7} alt="" /></i>
                    <div>
                        <h3>Templates</h3>
                        <p>Lorem ipsum dolor sit</p>
                    </div>
                    </div>
                    <ul className="secondListing">
                    <li><a href="#">Email</a></li> 
                    <li><a href="#">SMS</a></li>
                    <li>
                        <NavLink to="/audio-template">
                            Audio
                        </NavLink>
                    </li>
                    <li><a href="#">RVM</a></li> 
                    <li><a href="#">Sales Bridge</a></li>
                    </ul>
                </li>
                </ul>
            </div>
        </div>
    );
}

export default Setup;