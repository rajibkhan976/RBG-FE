import React, { useEffect, useState } from "react";
//import { utils } from "../../../helpers";
import Loader from "../../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
import arrowRightWhite from "../../../../assets/images/arrowRightWhite.svg";
import crossTop from "../../../../assets/images/cross.svg";
import refreshTime from "../../../../assets/images/refreshTime.svg";
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../../actions/types';

import {AttendanceServices} from "../../../../services/attendance/attendanceServices";
import { utils } from "../../../../helpers";

const AddCommentModal = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();

  const [stuffCheckIn, setStuffCheckIn] = useState({
    "contactId": props.contactId,
    "note": "",
    // "checkedInAt": ""
  });
  const timezoneOffset = useSelector((state)=> (state?.user?.data?.organizationTimezoneInfo.utc_offset) ? state?.user?.data?.organizationTimezoneInfo.utc_offset:null);
  useEffect(()=>{
    console.log("add comment timezone", timezoneOffset);
  })
  //fetchStuffAttendance
  const checkIn = async () => {
    const dd = String(new Date().getDate()).padStart(2, "0");
    const mm = String(new Date().getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = new Date().getFullYear();
    const time = new Date().toString().split(" ")[4];
    console.log("date and time formate", yyyy+"-"+mm+"-"+dd + " " + time);
    const convertTimezoneToUtc = utils.convertTimezoneToUTC(yyyy+"-"+mm+"-"+dd + " " + time, timezoneOffset).trim();
    console.log("After conversion time zone", convertTimezoneToUtc);

    // stuffCheckIn['checkedInAt'] = convertTimezoneToUtc;
    try {
      props.closeAddHolidayModal();
      const stuffCheckInData = await AttendanceServices.checkInByStaff(stuffCheckIn);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: stuffCheckInData.message,
        typeMessage: 'success'
      });
      props.checkInStatus(true)
      props.fetchAttendances();
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    }
  };

  const noteChangeHandler = (e) =>{ 
    setStuffCheckIn( {
      ...stuffCheckIn,
      "note": e.target.value
    });
    
  }

  return (
    <>     
      <div className="modalBackdrop ">  
        <div className="modalBackdropBg" onClick={props.closeAddHolidayModal}></div>
        <div className="slickModalBody">

          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddHolidayModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={refreshTime} alt="" /></div>
            <p>&nbsp;</p>
            <h3>Check In</h3>
            <p className="gap1">Give a note why you check in behalf of member</p>
          </div>
          <div className="modalForm auto">
            <form >    
             <p>{props.holidayValue}</p>    
              <div className="formControl">
                <label>Note </label>
                <textarea value={stuffCheckIn.note} onChange={noteChangeHandler} ></textarea>
                {/* {modalPopMsgerror1 && <div className="errorMsg">Please fill up the Note field</div>} */}
              </div>
              <div className="modalbtnHolder">
                  <button type="button" onClick={checkIn}
                    className="saveNnewBtn"><span>Save</span><img src={arrowRightWhite} alt="" 
                  /></button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCommentModal;
