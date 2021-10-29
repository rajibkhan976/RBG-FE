import React, {useEffect, useState} from "react";

import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import plue_icon_white_thik from "../../../../assets/images/plue_icon_white_thik.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import speaker_icon from "../../../../assets/images/speaker_icon.svg";
import play_icon from "../../../../assets/images/play_icon.svg";
import InputFile from "../../../shared/InputFile";


const CallConfiguration = (props) => {
    const [name, setName] = useState("");
    const [callResponse, setCallResponse] = useState("receive_calls");
    const [schedule, setSchedule] = useState([]);
    const handleCheck = (val, list) => {
        let exists = false;
        list.some((el) => {
            if (el.day.includes(val))
                exists = true;
        });
        return exists;
    }
    const addAnotherTime = (e) => {
        e.preventDefault();
        let conf = [{
            day: [],
            startTime: "00:00",
            endTime: "23:00"
        }];
        setSchedule([...schedule, ...conf])
    }
    const handleDayBox = (key, day, e) => {
        let updateList = schedule;
        let dayList = schedule[key].day;
        if (e.target.checked) {
            updateList[key].day = dayList.concat(day);
        } else {
            updateList[key].day = dayList.filter(item => item !== day);
        }
        setSchedule(updateList);
    }
    const handleStartTime = (key, e) => {
        let updateList = schedule;
        updateList[key].startTime = e.target.value;
        setSchedule(updateList);
    }
    const handleEndTime = (key, e) => {
        let updateList = schedule;
        updateList[key].endTime = e.target.value;
        setSchedule(updateList);
    }
    useEffect(() => {
        let conf = [{
            day: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            startTime: "00:00",
            endTime: "23:00"
        }];
        if (props.conf.length === 0) {
            setSchedule(conf);
        } else {
            setSchedule(props.conf);
        }
    }, []);
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
                                <h4 className="formSecHeading">Schedule</h4>
                            </div>
                                {
                                    schedule.map((list, key) => {
                                        return (
                                            <div className="cmnFormRow scheduleRow">
                                                <div className="cmnFormCol" key={key}>
                                                    <div className="cmnFieldName">Select Day (s)</div>
                                                    <div className="cmnFormField">
                                                        <ul className="weekDateList">
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="sun" defaultChecked={list.day.includes('sun') } onChange={(e) => handleDayBox(key, 'sun',e)}/>
                                                                <span>S</span>
                                                            </li>
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="mon" defaultChecked={list.day.includes('mon') } onChange={(e) => handleDayBox(key, 'mon', e)}/>
                                                                <span>M</span>
                                                            </li>
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="tue" defaultChecked={list.day.includes('tue') } onChange={(e) => handleDayBox(key, 'tue', e)}/>
                                                                <span>T</span>
                                                            </li>
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="wed" defaultChecked={list.day.includes('wed') } onChange={(e) => handleDayBox(key, 'wed', e)}/>
                                                                <span>W</span>
                                                            </li>
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="wed" defaultChecked={list.day.includes('thu') } onChange={(e) => handleDayBox(key, 'thu', e)}/>
                                                                <span>T</span>
                                                            </li>
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="wed" defaultChecked={list.day.includes('fri') } onChange={(e) => handleDayBox(key, 'fri', e)}/>
                                                                <span>F</span>
                                                            </li>
                                                            <li className="weekDate">
                                                                <input type="checkbox" value="wed" defaultChecked={list.day.includes('sat') } onChange={(e) => handleDayBox(key, 'sat', e)}/>
                                                                <span>S</span>
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
                                                                <select className="cmnFieldStyle timeInput"  defaultValue={list.startTime}  onChange={(e) => handleStartTime(key, e)}>
                                                                    <option value="00:00">00:00</option>
                                                                    <option value="01:00">01:00</option>
                                                                    <option value="02:00">02:00</option>
                                                                    <option value="03:00">03:00</option>
                                                                    <option value="04:00">04:00</option>
                                                                    <option value="05:00">05:00</option>
                                                                    <option value="06:00">06:00</option>
                                                                    <option value="07:00">07:00</option>
                                                                    <option value="08:00">08:00</option>
                                                                    <option value="09:00">09:00</option>
                                                                    <option value="10:00">10:00</option>
                                                                    <option value="11:00">11:00</option>
                                                                    <option value="12:00">12:00</option>
                                                                    <option value="13:00">13:00</option>
                                                                    <option value="14:00">14:00</option>
                                                                    <option value="15:00">15:00</option>
                                                                    <option value="16:00">16:00</option>
                                                                    <option value="17:00">17:00</option>
                                                                    <option value="18:00">18:00</option>
                                                                    <option value="19:00">19:00</option>
                                                                    <option value="20:00">20:00</option>
                                                                    <option value="21:00">21:00</option>
                                                                    <option value="22:00">22:00</option>
                                                                    <option value="23:00">23:00</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="cmnFormCol">
                                                            <div className="cmnFormField">
                                                                <label className="cmnFieldName">To</label>
                                                                <select className="cmnFieldStyle timeInput" defaultValue={list.endTime}  onChange={(e) => handleEndTime(key, e)}>
                                                                    <option value="00:00">00:00</option>
                                                                    <option value="01:00">01:00</option>
                                                                    <option value="02:00">02:00</option>
                                                                    <option value="03:00">03:00</option>
                                                                    <option value="04:00">04:00</option>
                                                                    <option value="05:00">05:00</option>
                                                                    <option value="06:00">06:00</option>
                                                                    <option value="07:00">07:00</option>
                                                                    <option value="08:00">08:00</option>
                                                                    <option value="09:00">09:00</option>
                                                                    <option value="10:00">10:00</option>
                                                                    <option value="11:00">11:00</option>
                                                                    <option value="12:00">12:00</option>
                                                                    <option value="13:00">13:00</option>
                                                                    <option value="14:00">14:00</option>
                                                                    <option value="15:00">15:00</option>
                                                                    <option value="16:00">16:00</option>
                                                                    <option value="17:00">17:00</option>
                                                                    <option value="18:00">18:00</option>
                                                                    <option value="19:00">19:00</option>
                                                                    <option value="20:00">20:00</option>
                                                                    <option value="21:00">21:00</option>
                                                                    <option value="22:00">22:00</option>
                                                                    <option value="23:00">23:00</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                {key > 0 ? (
                                                    <div className="and">
                                                        <img src={orange_add_icon} alt="" />
                                                        <span>And</span>
                                                    </div>
                                                ) : ""}
                                            </div>
                                        )
                                    })
                                }
                            <div className="cmnFormRow">
                                <button className="saveNnewBtn addAnotherBtn" onClick={(event) => addAnotherTime(event)}>
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