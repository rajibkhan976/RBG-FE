import React, { useState, useEffect } from 'react';
import download_icon from "../../../../src/assets/images/download_icon.svg";
import uparrow_icon_grey from "../../../../src/assets/images/uparrow_icon_grey.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import monthIcon from "../../../assets/images/month.svg";
import filter from "../../../assets/images/filter.svg";

const AttendenceHead = (props) => {
  
  return (
    <div className="contactHead attendenceListingPage">
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Reports</li>
            <li>Attendence</li>
          </ul>
          <h2 className="inDashboardHeader">Attendence</h2>
          <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar appointments formControl">
           <img className="monthIcons" src={monthIcon} alt="" /> 
            <select
              style={{
                  backgroundImage: "url(" + arrowDown + ")",
              }}
              value={props.displayState} 
              onChange={(e)=>{
                const selectDisplayState = e.target.value;
                props.setDisplayState(selectDisplayState);

              }}
              >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          
           <button className="saveNnewBtn appExport expContactBtn">
            <img src={uparrow_icon_grey} alt="" /> Export
          </button>
          {/* {props.displayState} */}
          
          {/* <button className="saveNnewBtn appFilter expContactBtn" onClick={() => props.openImportAppointment()}>
            Filter <img src={filter} alt="" /> 
          </button> */}
        </div>
      </div>
      <div className="head_ctrlRow">
        {/* <div className="head_ctrlRow_left">
                    <button className="saveNnewBtn massUpdateBtn">Mass Update</button>
                </div> */}
        <div className="head_ctrlRow_right">
        
         
          
        </div>
      </div>
    </div>
  );
};

export default AttendenceHead;
