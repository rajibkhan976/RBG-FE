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
import statusPhase from "../../../assets/images/statusPhase.svg"

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
                <NavLink
                      to="/gym-details"onClick={(e) => props.clickedLink(e)}> 
                  <img src={SetupIcon2} alt="" />
                  </NavLink>
                </i>
                <div>
                  <h3>
                  <NavLink
                      to="/gym-details"onClick={(e) => props.clickedLink(e)}> Gym Details
                    </NavLink>
                   </h3>
                  <p><NavLink
                      to="/gym-details"onClick={(e) => props.clickedLink(e)}> Manage your Gym details
                      </NavLink></p>
                </div>
              </div>
            </li>
            <li>
              <div className="listHead">
                <i><NavLink
                    to="/call-setup"
                    onClick={(e) => props.clickedLink(e)}
                  >
                  <img src={SetupIcon3} alt="" />
                  </NavLink>
                </i>
                <div>
                  <h3><NavLink
                    to="/call-setup"
                    onClick={(e) => props.clickedLink(e)}
                  >Communication Setup</NavLink></h3>
                  <p><NavLink
                    to="/call-setup"
                    onClick={(e) => props.clickedLink(e)}
                  >Set all kind of communications</NavLink></p>
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
                </li>  */}
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
                <i><NavLink
                      to="/products"
                      onClick={(e) => props.clickedLink(e)}
                    >
                  <img src={SetupIcon5} alt="" />
                  </NavLink>
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
                  <p><NavLink
                      to="/products"
                      onClick={(e) => props.clickedLink(e)}
                    >Manage your POS products</NavLink></p>
                </div>
              </div>
            </li>
            <li>
              <div className="listHead">
                <i><NavLink
                     to="/customizations"
                     onClick={(e) => props.clickedLink(e)}
                    >
                  <img src={SetupIcon6} alt="" />
                  </NavLink>
                </i>
                <div>
                  <h3>
                    <NavLink
                     to="/customizations"
                     onClick={(e) => props.clickedLink(e)}
                    >Customizations
                    </NavLink>
                  </h3>
                  <p><NavLink
                     to="/customizations"
                     onClick={(e) => props.clickedLink(e)}
                    >Add Custom fields</NavLink></p>
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
                <i> <NavLink
                      to="/number-list"
                      onClick={(e) => props.clickedLink(e)}
                    >
                  <img src={SetupIcon9} alt="" />
                  </NavLink>
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
                  <p> <NavLink
                      to="/number-list"
                      onClick={(e) => props.clickedLink(e)}
                    >Assign number to organization</NavLink></p>
                </div>
              </div>
            </li>
            <li>
              <div className="listHead">
                <i><NavLink
                      to="/courses"
                      onClick={(e) => props.clickedLink(e)}
                    >
                  <img src={SetupIcon8} alt="" />
                  </NavLink>
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
                  <p><NavLink
                      to="/courses"
                      onClick={(e) => props.clickedLink(e)}
                    >Manage your programs</NavLink></p>
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
                <i><NavLink
                        to="/zapier"
                        onClick={(e) => props.clickedLink(e)}
                    >
                  <img src={zapierIcon} alt="" />
                  </NavLink>
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
                  <p><NavLink
                        to="/zapier"
                        onClick={(e) => props.clickedLink(e)}
                    >Setup zapier app
                    </NavLink></p>
                </div>
              </div>
            </li>
            {(loggedInUser && (loggedInUser?.isOrganizationOwner === true || loggedInUser.organizationCode === 'rbg')) ? (
             <li>
               <div className="listHead">
                 <i><NavLink
                       to="/payment-setup"
                       onClick={(e) => props.clickedLink(e)}
                     >
                   <img src={PaymentSetup} alt="" />
                   </NavLink>
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
                   <p><NavLink
                       to="/payment-setup"
                       onClick={(e) => props.clickedLink(e)}
                     >Set up your payment modes</NavLink></p>
                 </div>
               </div>
             </li>
            ): "" }
            <li>
              <div className="listHead">
                <i> <NavLink
                        to="/phases-status"
                        onClick={(e) => props.clickedLink(e)}
                    >
                  <img src={statusPhase} alt="" />
                  </NavLink>
                </i>
                <div>
                  <h3>
                    <NavLink
                        to="/phases-status"
                        onClick={(e) => props.clickedLink(e)}
                    >
                      Status and Phase 
                    </NavLink>
                  </h3>
                  <p> <NavLink
                        to="/phases-status"
                        onClick={(e) => props.clickedLink(e)}
                    >Manage your contact's status and phase</NavLink></p>
                </div>
              </div>
            </li>
          </ul>
        </Scrollbars>
      </div>
    </>
  );
};

export default Setup;
