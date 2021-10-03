import React, { useState } from "react";

import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import plue_icon_white_thik from "../../../../assets/images/plue_icon_white_thik.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import speaker_icon from "../../../../assets/images/speaker_icon.svg";
import play_icon from "../../../../assets/images/play_icon.svg";
import InputFile from "../../../shared/InputFile";


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
                                    <div className="setupFormRowBody">
                                        <div class="cmnFormRow">
                                            <div class="cmnFormField radioGroup">
                                                <label class="cmnFormRadioLable">
                                                <div class="circleRadio">
                                                    <input type="radio" name="type" />
                                                    <span></span>
                                                </div>
                                                Upload Audio
                                                </label>
                                                <label class="cmnFormRadioLable">
                                                <div class="circleRadio">
                                                    <input type="radio" name="type" />
                                                    <span></span>
                                                </div>
                                                Record Audio
                                                </label>
                                            </div>
                                            <p className="uploadInfo">* Please upload/record audio file for maximum <strong>55 second</strong> duration.</p>
                                        </div>
                                        <div class="cmnFormRow">
                                            <div className="cmnFormField">
                                                <InputFile fileType="mp3" />
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
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
                                    <div className="setupFormRowBody">
                                        <div class="cmnFormRow">
                                            <div class="cmnFormField">
                                                <label className="cmnFieldName">Instant Call Forward</label>
                                                <div class="toggleBtn active">
                                                    <input type="checkbox" />
                                                    <span class="toggler"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cmnFormRow addNumForm">
                                            <div className="addNumFormLeft">
                                                <label className="cmnFieldName">Add number</label>
                                            </div>
                                            <div className="addNumFormRight">
                                                <div class="cmnFormRow">
                                                    <div class="cmnFormField countryCodeField">
                                                        <div className="countryCode cmnFieldStyle">
                                                            <div className="countryName">US</div>
                                                            <div class="daileCode">+1</div>
                                                            <select className="selectCountry">
                                                                <option value="">US (+1)</option>
                                                            </select>
                                                        </div>
                                                        <input type="text" className="cmnFieldStyle" placeholder="Eg. (555) 555-1234" />
                                                    </div>
                                                    <button className="cmnBtn">
                                                        <span>Abb</span><img src={arrow_forward} alt="" />
                                                    </button>
                                                </div>
                                                <div class="cmnFormRow">
                                                    <div className="numberListHead">Numbers Added</div>
                                                    <ul className="numberLisr">
                                                        <li>
                                                            <span>+91-9874056105</span>
                                                            <div className="numberListAction">
                                                                <div className="info_3dot_icon">
                                                                    <button className="btn">
                                                                        <img src={info_3dot_icon} alt="More" />
                                                                    </button>
                                                                </div>
                                                                <div className="dropdownOptions listHide">
                                                                    <button className="btn btnDelete">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553" class="deleteIcon"><g transform="translate(0.75 0.75)"><path class="a" transform="translate(-3 -3.589)"></path><path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line class="a" y2="3" transform="translate(4.397 6.113)"></line><line class="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                        </span>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>+91-9874056105</span>
                                                            <div className="numberListAction">
                                                                <div className="info_3dot_icon">
                                                                    <button className="btn">
                                                                        <img src={info_3dot_icon} alt="More" />
                                                                    </button>
                                                                </div>
                                                                <div className="dropdownOptions">
                                                                    <button className="btn btnDelete">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553" class="deleteIcon"><g transform="translate(0.75 0.75)"><path class="a" transform="translate(-3 -3.589)"></path><path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line class="a" y2="3" transform="translate(4.397 6.113)"></line><line class="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                        </span>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    <div className="setupFormRowBody">
                                        <div className="cmnFormRow">
                                            <div className="cmnFormField">
                                                <label className="cmnFieldName">Old audio file</label>
                                                <div className="audio-player player">
                                                    <div className="volume">
                                                        <button className="volumeButton">
                                                            <img src={speaker_icon} alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="playerBody">
                                                        <div className="progress">
                                                            <p className="trackName">Track_name</p>
                                                            <div className="progress-bar">
                                                                <div className="now"></div>
                                                            </div>
                                                            <div className="audioDuration">
                                                                <span className="start">0</span>
                                                                <span className="end">0</span>
                                                            </div>
                                                        </div>
                                                        <div className="playerControl">
                                                            <button className="playerBtn">
                                                                <img src={play_icon} alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cmnFormRow">
                                            <div class="cmnFormField radioGroup">
                                                <span className="cmnFieldName whisperType">Whisper Input type</span>
                                                <label class="cmnFormRadioLable">
                                                    <div class="circleRadio">
                                                        <input type="radio" name="whisperType" />
                                                        <span></span>
                                                    </div>
                                                    Audio
                                                </label>
                                                <label class="cmnFormRadioLable">
                                                    <div class="circleRadio">
                                                        <input type="radio" name="whisperType" />
                                                        <span></span>
                                                    </div>
                                                    Text
                                                </label>
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <div class="cmnFormField radioGroup">
                                                <label class="cmnFormRadioLable">
                                                <div class="circleRadio">
                                                    <input type="radio" name="type" />
                                                    <span></span>
                                                </div>
                                                Upload Audio
                                                </label>
                                                <label class="cmnFormRadioLable">
                                                <div class="circleRadio">
                                                    <input type="radio" name="type" />
                                                    <span></span>
                                                </div>
                                                Record Audio
                                                </label>
                                            </div>
                                            <p className="uploadInfo">* Please upload/record audio file for maximum <strong>55 second</strong> duration.</p>
                                        </div>
                                        <div class="cmnFormRow">
                                            <div className="cmnFormField">
                                                <InputFile />
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <div className="cmnFormField">
                                                <textarea className="cmnFieldStyle" placeholder="Message to send after voicemail"></textarea>
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
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
                                    <div className="setupFormRowBody">
                                        <div className="cmnFormRow">
                                            <div className="cmnFormField">
                                                <div className="audio-player player">
                                                    <div className="volume">
                                                        <button className="volumeButton">
                                                            <img src={speaker_icon} alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="playerBody">
                                                        <div className="progress">
                                                            <p className="trackName">Track_name</p>
                                                            <div className="progress-bar">
                                                                <div className="now"></div>
                                                            </div>
                                                            <div className="audioDuration">
                                                                <span className="start">0</span>
                                                                <span className="end">0</span>
                                                            </div>
                                                        </div>
                                                        <div className="playerControl">
                                                            <button className="playerBtn">
                                                                <img src={play_icon} alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <div class="cmnFormField radioGroup">
                                                <label class="cmnFormRadioLable">
                                                    <div class="circleRadio">
                                                        <input type="radio" name="type" />
                                                        <span></span>
                                                    </div>
                                                    Upload Audio
                                                </label>
                                                <label class="cmnFormRadioLable">
                                                    <div class="circleRadio">
                                                        <input type="radio" name="type" />
                                                        <span></span>
                                                    </div>
                                                    Record Audio
                                                </label>
                                            </div>
                                            <p className="uploadInfo">* Please upload/record audio file for maximum <strong>55 second</strong> duration.</p>
                                        </div>
                                        <div class="cmnFormRow">
                                            <div className="cmnFormField">
                                                <InputFile />
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
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
                                    <div className="setupFormRowBody">
                                        <div class="cmnFormRow">
                                            <label className="cmnFieldName">Create Message</label>
                                            <p className="uploadInfo uploadInfoVM">
                                            153/0 SMS - One message contains 153 chatracters max<br />
                                            (SMS count can be changed if you are using keyword variable e.g. [fname])
                                            </p>
                                            <div className="cmnFormField">
                                                <textarea className="cmnFieldStyle" placeholder="Message to send after voicemail"></textarea>
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
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
                                    <div className="setupFormRowBody">
                                        <div class="cmnFormRow">
                                            <label className="cmnFieldName">Create Message</label>
                                            <p className="uploadInfo uploadInfoVM">
                                            153/0 SMS - One message contains 153 chatracters max<br />
                                            (SMS count can be changed if you are using keyword variable e.g. [fname])
                                            </p>
                                            <div className="cmnFormField">
                                                <textarea className="cmnFieldStyle" placeholder="Message to send after voicemail"></textarea>
                                            </div>
                                        </div>
                                        <div class="cmnFormRow">
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
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
                                    <div className="setupFormRowBody">
                                        <div class="cmnFormRow smsNotificationVM">
                                            <div class="cmnFormField countryCodeField">
                                                <div className="countryCode cmnFieldStyle">
                                                    <div className="countryName">US</div>
                                                    <div class="daileCode">+1</div>
                                                    <select className="selectCountry">
                                                        <option value="">US (+1)</option>
                                                    </select>
                                                </div>
                                                <input type="text" className="cmnFieldStyle" placeholder="Eg. (555) 555-1234" />
                                            </div>
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="setupFormRow eNotiVM">
                                    <div className="setupFormRowHead">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span className="fomrListHeadName">Voice Mail Email Notification</span>
                                        </label>
                                    </div>
                                    <div className="setupFormRowBody">
                                        <div className="cmnFormRow emailNotificationVM">
                                            <input type="text" className="cmnFieldStyle" placeholder="Set Notification Email" />
                                            <button className="cmnBtn">
                                                <span>Save</span><img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                        
                                    </div>
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