import React, { useEffect, useRef, useState } from "react";

import Loader from "../../../Loader";
import iconSmsOut from "../../../../../assets/images/iconSmsOut.svg";
import iconSmsIn from "../../../../../assets/images/iconSmsIn.svg";
import iconCallOut from "../../../../../assets/images/iconCallOut.svg";
import iconCallIn from "../../../../../assets/images/iconCallIn.svg";
import iconEmailOut from "../../../../../assets/images/iconEmailOut.svg";
import smallPh from "../../../../../assets/images/smallPh.svg";
import smalCalendar from "../../../../../assets/images/smalCalendar.svg";
import arrowDown from "../../../../../assets/images/arrowDown.svg";
import browsTextarea from "../../../../../assets/images/browsTextarea.svg";
import arrowRightWhite from "../../../../../assets/images/arrowRightWhite.svg";
import Player from "../../../Player";
import "../../../../../assets/css/communicationLog.css";
import OpenPanel from "./OpenPanel.js";
import {utils} from "../../../../../helpers";
import moment from "moment";

const Call = (props) => {

  const [contactID, setContactID] = useState("");
  const [contactGenData, setContactgendata] = useState(props.contact);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [callBrowser, setCallBrowser] = useState(false);
  const [callType, setCallType] = useState("");

  const selectCallType = (e) =>{
    setCallType(e.target.value);
    console.log("callType", e.target.value)
    if(e.target.value === "browserCall"){
      setCallBrowser(true);
    }else{
      setCallBrowser(false);
    }
  }
  // useEffect(() => {
  //   console.log("device", device);
  // }, [device])


  return (
    <>
      <div className="formBody">
                    <div className="formSlice">
                      <div className="label">Select Type</div>
                      <div className="radioBtnHolder">
                        <div class="cmnFormField radioGroup">
                          <label class="cmnFormRadioLable"><div class="circleRadio"><input type="radio" name="callType" onChange={selectCallType} value="browserCall"/><span></span></div>Browser Call</label>
                          <label class="cmnFormRadioLable"><div class="circleRadio"><input type="radio" name="callType" onChange={selectCallType} value="ivr"/><span></span></div>Select IVR</label>
                          <label class="cmnFormRadioLable"><div class="circleRadio"><input type="radio" name="callType" onChange={selectCallType} value="rvm"/><span></span></div>Drop RVM</label>
                          <label class="cmnFormRadioLable"><div class="circleRadio"><input type="radio" name="callType" onChange={selectCallType} value="bridge"/><span></span></div>Sales Bridge</label>
                        </div>
                      </div>
                    </div>  
                    <div className="formSlice">
                        <div className="label">&nbsp;</div>
                        <div className="callOptions">
                          {callBrowser &&
                            <button className="callBtn">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.1303 4.04239H10.5924" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.8613 0.773438V7.31135" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.1729 13.2305V15.5415C16.1738 15.7561 16.1298 15.9686 16.0438 16.1652C15.9578 16.3618 15.8317 16.5383 15.6736 16.6834C15.5154 16.8285 15.3287 16.9389 15.1254 17.0076C14.9221 17.0764 14.7066 17.1019 14.4929 17.0825C12.1221 16.825 9.84478 16.015 7.84389 14.7175C5.98222 13.5346 4.40385 11.9562 3.22089 10.0945C1.91829 8.0833 1.10805 5.7934 0.855891 3.41051C0.836594 3.19744 0.861873 2.98269 0.930121 2.77993C0.998368 2.57716 1.10809 2.39083 1.2523 2.2328C1.3965 2.07476 1.57204 1.94849 1.76772 1.86201C1.9634 1.77553 2.17495 1.73075 2.38889 1.73051H4.70089C5.0741 1.7278 5.4356 1.86061 5.71828 2.1043C6.00095 2.34799 6.18559 2.68598 6.23789 3.05551C6.33664 3.79535 6.5188 4.52164 6.78089 5.22051C6.88507 5.49598 6.90814 5.79554 6.84735 6.08371C6.78656 6.37188 6.64447 6.63659 6.43789 6.84651L5.45989 7.82451C6.5567 9.75352 8.15388 11.3507 10.0829 12.4475L11.0609 11.4695C11.2704 11.2623 11.5349 11.1194 11.8231 11.0579C12.1113 10.9964 12.4111 11.0188 12.6869 11.1225C13.3859 11.3832 14.1122 11.5641 14.8519 11.6615C15.2263 11.7154 15.5677 11.905 15.8113 12.1943C16.0549 12.4836 16.1836 12.8524 16.1729 13.2305Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              Call
                            </button>
                          }                 
                        </div>
                      </div>
                  </div>
  
     </>
  );
};

export default Call;
