import React from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

import SetupIcon2 from "../../../assets/images/setupicon2.svg";
import SetupIcon3 from "../../../assets/images/setupicon3.svg";
import SetupIcon5 from "../../../assets/images/setupicon5.svg";
import SetupIcon6 from "../../../assets/images/setupicon6.svg";
import SetupIcon8 from "../../../assets/images/courses.svg";
import PaymentSetup from "../../../assets/images/PaymentSetup.svg";
import SetupIcon9 from "../../../assets/images/nn.svg"
import zapierIcon from "../../../assets/images/zapier.svg"

const Setup = (props) => {
  const loggedInUser = useSelector((state) => state.user.data);
  return (
    <>
      <div className="setUpPopUp">
        <Scrollbars
          renderThumbVertical={(props) => <div className="thumb-vertical" />}
        >
          <p className="headding1">Set Up </p>
          <ul>
            {/* <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon1} alt="" />
                </i>
                <div>
                  <h3>
                    <NavLink
                      to="/personal-details"onClick={(e) => props.clickedLink(e)}> Personal Details
                    </NavLink></h3>
                  <p>Manage your personal details</p>
                </div>
              </div>
            </li> */}
            <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon2} alt="" />
                </i>
                <div>
                  <h3>
                  <NavLink
                      to="/gym-details"onClick={(e) => props.clickedLink(e)}> Gym Details
                    </NavLink>
                   </h3>
                  <p>Manage your Gym details</p>
                </div>
              </div>
            </li>
            <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon3} alt="" />
                </i>
                <div>
                  <h3>Communication Setup</h3>
                  <p>Set all kind of communications</p>
                </div>
              </div>
              <ul className="secondListing">
                {/* <li>
                  <NavLink
                    to="/email-setup"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Email
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/sms-setup"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    SMS
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/call-setup"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Call
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon4} alt="" />
                </i>
                <div>
                  <h3>Data Administration</h3>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>
              <ul className="secondListing">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Import History
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Export History
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Activity Log
                  </a>
                </li>
              </ul>
            </li> */}
            <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon5} alt="" />
                </i>
                <div>
                  <h3>
                    <NavLink
                      to="/products"
                      onClick={(e) => props.clickedLink(e)}
                    >
                      Products
                    </NavLink>
                  </h3>
                  <p>Manage your POS products</p>
                </div>
              </div>
            </li>
            <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon6} alt="" />
                </i>
                <div>
                  <h3>
                    <NavLink
                     to="/customizations"
                     onClick={(e) => props.clickedLink(e)}
                    >Customizations
                    </NavLink>
                  </h3>
                  <p>Add Custom fields</p>
                </div>
              </div>
            </li>
            {/* <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon7} alt="" />
                </i>
                <div>
                  <h3>Templates</h3>
                  <p>Set communication templates</p>
                </div>
              </div>
              <ul className="secondListing">
                <li>
                  <NavLink
                    to="/email-template"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Email
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sms-template"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    SMS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/audio-template"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Audio
                  </NavLink>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    RVM
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => props.clickedLink(e)}
                  >
                    Sales Bridge
                  </a>
                </li>
              </ul>
            </li> */}
            <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon9} alt="" />
                </i>
                <div>
                  <h3>
                    <NavLink
                      to="/number-list"
                      onClick={(e) => props.clickedLink(e)}
                    >
                      Number List
                    </NavLink>
                  </h3>
                  <p>Assign number to organization</p>
                </div>
              </div>
            </li>
            <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon8} alt="" />
                </i>
                <div>
                  <h3>
                    <NavLink
                      to="/courses"
                      onClick={(e) => props.clickedLink(e)}
                    >
                      Programs
                    </NavLink>
                  </h3>
                  <p>Manage your programs</p>
                </div>
              </div>
            </li>
            {/* <li>
              <div className="listHead">
                <i>
                  <img src={SetupIcon4} alt="" />
                </i>
                <div> */}
                  {/* <div className="prototypeBatch">Prototype</div> */}
                  {/* <h3> */}
                    {/* <Link to={{ pathname: "https://xd.adobe.com/view/2825ba92-a435-4be1-8c5d-4f0bc82450c3-7d76/?fullscreen" }}
                      target="_blank"></Link> */}
                      {/* <a href="javascript:void(0)">Setup</a>
                  </h3>
                  <p>Setup details</p>
                </div>
              </div>
            </li> */}
            <li>
              <div className="listHead">
                <i>
                  <img src={zapierIcon} alt="" />
                </i>
                <div>
                  <h3>
                    <NavLink
                        to="/zapier"
                        onClick={(e) => props.clickedLink(e)}
                    >
                      Zapier
                    </NavLink>
                  </h3>
                  <p>Setup zapier app</p>
                </div>
              </div>
            </li>
            {(loggedInUser?.isOrganizationOwner) ? (
             <li>
               <div className="listHead">
                 <i>
                   <img src={PaymentSetup} alt="" />
                 </i>
                 <div>
                   <h3>
                     <NavLink
                       to="/payment-setup"
                       onClick={(e) => props.clickedLink(e)}
                     >
                       Payment Setup
                     </NavLink>
                   </h3>
                   <p>Set up your payment modes</p>
                 </div>
               </div>
             </li>
            ): "" }
          </ul>
        </Scrollbars>
      </div>
    </>
  );
};

export default Setup;
