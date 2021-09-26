import React, { useState } from "react";

import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import plue_icon_white_thik from "../../../../assets/images/plue_icon_white_thik.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";


const CallConfiguration = (props) => {



    return(
        <div className="sideMenuOuter">
            <div className="sideMenuInner callConfigModal">
                <button class="btn btn-closeSideMenu" onClick={props.closeModal}>
                    <span></span>
                    <span></span>
                </button>
                <div class="sideMenuHeader">
                    <h3>Create a Call Configuration</h3>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="sideMenuBody">
                    <form className="formBody">
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">Config Name</div>
                                <div class="cmnFormField">
                                    <input type="text" className="cmnFieldStyle" />
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">Call Response</div>
                                <div class="cmnFormField">
                                    <select className="cmnFieldStyle selectBox" >
                                        <option value="receive_calls">Receive Calls</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="scheduleList">
                            <div className="cmnFormRow">
                                <h4 class="formSecHeading">Schedule</h4>
                            </div>
                            <div className="cmnFormRow scheduleRow">
                                <div className="cmnFormCol">
                                    <div className="cmnFieldName">Select Day (s)</div>
                                    <div class="cmnFormField">
                                        <ul className="weekDateList">
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>S</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>M</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>T</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>W</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>T</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>F</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>S</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cmnFormCol">
                                    <div className="cmnFieldName">Set Time Slot</div>
                                    <div className="cmnFormRow">
                                        <div className="cmnFormCol">
                                            <div class="cmnFormField">
                                                <label className="cmnFieldName">From</label>
                                                <input type="Time" className="cmnFieldStyle timeInput" />
                                            </div>
                                        </div>
                                        <div className="cmnFormCol">
                                            <div class="cmnFormField">
                                                <label className="cmnFieldName">To</label>
                                                <input type="Time" className="cmnFieldStyle timeInput" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cmnFormRow scheduleRow">
                                <div className="cmnFormCol">
                                    <div className="cmnFieldName">Select Day (s)</div>
                                    <div class="cmnFormField">
                                        <ul className="weekDateList">
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>S</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>M</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>T</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>W</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>T</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>F</span>
                                            </li>
                                            <li className="weekDate">
                                                <input type="checkbox" />
                                                <span>S</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cmnFormCol">
                                    <div className="cmnFieldName">Set Time Slot</div>
                                    <div className="cmnFormRow">
                                        <div className="cmnFormCol">
                                            <div class="cmnFormField">
                                                <label className="cmnFieldName">From</label>
                                                <input type="Time" className="cmnFieldStyle timeInput" />
                                            </div>
                                        </div>
                                        <div className="cmnFormCol">
                                            <div class="cmnFormField">
                                                <label className="cmnFieldName">To</label>
                                                <input type="Time" className="cmnFieldStyle timeInput" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="and">
                                    <img src={orange_add_icon} alt="" />
                                    <span>And</span>
                                </div>
                            </div>
                            <div className="cmnFormRow">
                                <button className="saveNnewBtn addAnotherBtn">
                                    <img src={plue_icon_white_thik} alt="" /> Schedule Another Time
                                </button>
                                <button className="btn-link timeOverlapBtn">Validate Time Overlap</button>
                            </div>
                            <div className="slotNotAbailable">
                                <p>
                                    Scheduled slot(s) is not valid as it conflicts with one or more configuration. Do you want to remove the same time from other configuration?
                                </p>
                                <div className="btnGroup">
                                    <button className="cmnBtn">Yes</button>
                                    <button className="cmnBtn btn-red">No</button>
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow setupForms">
                            <h4 class="formSecHeading">Setup</h4>
                            <div className="setupFormLists">
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Introduction Audio</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Call forwarding</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Call Whisper</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Voicemail message</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Voicemail Message Enable/Disable</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Missed Call Message</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Voice Mail SMS Notification</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                                <div className="setupFormRow">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Voice Mail Email Notification</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody"></div>
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="btnGroup centered">
                                <button className="cmnBtn"><span>Save</span><img src={arrow_forward} alt="" /></button>
                                <button className="cmnBtn"><span>Save & New</span><img src={arrow_forward} alt="" /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}


export default CallConfiguration;