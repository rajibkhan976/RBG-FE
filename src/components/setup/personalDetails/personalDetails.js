import React, { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import profileAvatar from "../../../assets/images/camera.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import listIcon from "../../../assets/images/list_icon.svg";
import dot3gray from "../../../assets/images/dot3gray.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import profile_img from "../../../assets/images/profile.svg";
import profile_png from "../../../assets/images/profile.png";
import gymLogo from "../../../assets/images/gymLogo.svg";
// import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";


const PersonalDetails = (props) => {
  
  return (
    <>
    <div className="dashInnerUI">
        <div className="userListHead detailsPage">
          <div className="listInfo">
            <ul className="listPath">
              <li>Settings </li>
              <li> Personal Details</li>
            </ul>
            <h2 className="inDashboardHeader">
              Personal Details
            </h2>
            <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
          </div>
        </div>






        <div className="gymDetails personalPage">
          <div className="gymdetails_left">
            <h3 className="leftSectionHeader">Account Details</h3>
              <div className="showing_gym_data">
                <div className="gymName">
                  <div className="profilePicture">
                    <span className="profileImgSection">
                      <img src={profile_png} className="profileImage" alt="" />
                      <span>Change</span>
                    </span>
                      
                    <span className="profileName">Jonathan Doe</span>
                  </div>
                 
                  <button><img src={edit_gym} alt=""/></button>
                </div>
                <div className="gymInfo full">
                  <p className="textType1">Email <span>:</span></p>
                    <p className="textType4">kallol.banerjee@tier5.in</p>
                </div>
                <div className="gymInfo full d-flex">
                  <div className="gymInfo half d-flex">
                    <p className="textType1">Plan <span>:</span></p>
                    <p className="textType3">Platinum</p>
                  </div>
                  <div className="gymInfo half textRight">
                  <button className="common_blue_button">Upgrade <img alt="" src={arrowRightWhite} /></button>
                  </div>
                </div>
              </div>  
          </div>


          <div className="gymdetails_right">
              <div className="holidayListHeader">
                <h3>Basic Settings</h3>                  
              </div>
              <div className="detailsForm">
                <form>
                  <div className="formControl">
                    <label>Timezone</label>
                    {/* <input type="text" placeholder="Eg. Republic Day" name="" /> */}
                    <select
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }}>
                        <option value="">IST - Asia/Kolkata (GMT+5:30)</option>
                        <option value="">GST - Europe/England (GMT+0:00)</option>                        
                    </select>
                  </div>
                  <div className="formControl">
                    <label>Country</label>
                    {/* <input type="text" placeholder="Eg. Republic Day" name="" /> */}
                    <select
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }}>
                        <option value="">India</option>
                        <option value="">USA</option>                        
                    </select>
                  </div>
                  <div className="formControl">
                    <label>Default Number</label>
                    {/* <input type="text" placeholder="Eg. Republic Day" name="" /> */}
                    <select
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }}>
                        <option value="">+1-2162386318 [ (216) 238-6318 ]</option>
                        <option value="">+1-2162386318 [ (216) 238-6318 ]</option>                        
                    </select>
                  </div>
                </form>
              </div>

              <div className="holidayListHeader passwordSection">
                <h3>Change Password</h3>                  
              </div>
              <div className="detailsForm">
                <form>
                  <div className="formControl">
                    <label>Current Password</label>
                   <input type="text" name="" />
                  </div>
                  <div className="formControl">
                    <label>New Password</label>
                    <input type="text" name="" />
                  </div>
                  <div className="formControl">
                    <label>Confirm New Password</label>
                    <input type="text" name="" />
                  </div>
                  <div className="formControl">
                  <button type="submit" className="saveNnewBtn"><span>Save</span><img src={arrowRightWhite} alt="" /></button>
                  </div>
                </form>
              </div>
          </div>
        </div>







    </div>
    </>
  );
};

export default PersonalDetails;
