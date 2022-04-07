import React from "react";
import download_icon from "../../../../src/assets/images/download_icon.svg";
import uparrow_icon_grey from "../../../../src/assets/images/uparrow_icon_grey.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import monthIcon from "../../../assets/images/month.svg";
import filter from "../../../assets/images/filter.svg";


const RevenueHead = (props) => {
  return (
    <div className="contactHead">
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Reports</li>
            <li>Attendence</li>
          </ul>
          <h2 className="inDashboardHeader">Revenue</h2>
          <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
        </div>
        <div className="listFeatures">
          
          
           <button className="saveNnewBtn appExport expContactBtn">
            <img src={uparrow_icon_grey} alt="" /> Export
          </button>
          
          {/* <button className="saveNnewBtn appFilter expContactBtn" onClick={() => props.openImportAppointment()}>
            Filter <img src={filter} alt="" /> 
          </button> */}
        </div>
      </div>
     
    </div>
  );
};

export default RevenueHead;
