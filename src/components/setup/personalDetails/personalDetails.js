import React, { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import profileAvatar from "../../../assets/images/camera.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import listIcon from "../../../assets/images/list_icon.svg";
import dot3gray from "../../../assets/images/dot3gray.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import gymLogo from "../../../assets/images/gymLogo.svg";
// import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";


const PersonalDetails = (props) => {
  
  return (
    <>
    <div className="dashInnerUI">
        <div class="userListHead">
          <div class="listInfo">
            <ul class="listPath">
              <li>Settings </li>
              <li> Personal Details</li>
            </ul>
            <h2 class="inDashboardHeader">
              Personal Details
            </h2>
            <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
          </div>
        </div>
    </div>
    </>
  );
};

export default PersonalDetails;
