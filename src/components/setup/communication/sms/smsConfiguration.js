import React, {useEffect, useState, useRef} from "react";
import plue_icon_white_thik from "../../../../assets/images/plue_icon_white_thik.svg";


const CallConfiguration = (props) => {
    
  const addAnotherTime = (e) => {
    e.preventDefault();
    let conf = [{
        day: [],
        startTime: "00:00",
        endTime: "24:00"
    }];
    
}
    

    return (
      <div className="sideMenuOuter">
        <div className="sideMenuInner callConfigModal">
          {/* {isLoader ? <Loader /> : ""} */}
          <button className="btn btn-closeSideMenu" onClick={props.closeModal}>
            <span></span>
            <span></span>
          </button>
          <div className="sideMenuHeader">
            <h3>Create a SMS Configuration</h3>
            <p>Setup call related all configurations</p>
          </div>
          <div className="sideMenuBody">
            <form className="formBody">
              <div className="cmnFormRow">
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Config Name</div>
                  <div className="cmnFormField">
                    <input
                      type="text"
                      className="cmnFieldStyle"
                      value="My Sample SMS config One"
                    />
                  </div>
                </div>
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Response Type</div>
                  <div className="cmnFormField">
                    <select
                      className="cmnFieldStyle selectBox"
                      defaultValue="Auto Response"  
                    >
                      <option value="receive_calls">Receive Calls</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="scheduleList">
                <div className="cmnFormRow">
                    <h4 className="formSecHeading">Schedule</h4>
                </div>
                <div className="cmnFormRow scheduleRow">
                    <div className="cmnFormCol">
                        <div className="cmnFieldName">Select Day (s)</div>
                        <div className="cmnFormField">
                            <ul className="weekDateList">
                                <li className="weekDate">
                                    <input type="checkbox" value="sun" checked=""/><span>S</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="mon" checked=""/><span>M</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="tue" checked=""/><span>T</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>W</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>T</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>F</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>S</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="cmnFormCol">
                        <div className="cmnFieldName">Set Time Slot</div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFormField">
                                    <label className="cmnFieldName">From</label>
                                    <select className="cmnFieldStyle timeInput"><option value="00:00">00:00</option></select>
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFormField">
                                    <label className="cmnFieldName">To</label>
                                    <select className="cmnFieldStyle timeInput"><option value="00:00">00:00</option><option value="01:00">01:00</option><option value="02:00">02:00</option><option value="03:00">03:00</option></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>     
              </div>

              
            </form>
          </div>
        </div>
      </div>
    );
}


export default CallConfiguration;