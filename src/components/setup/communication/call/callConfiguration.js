import React, {useEffect, useState, useRef} from "react";

import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import plue_icon_white_thik from "../../../../assets/images/plue_icon_white_thik.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import speaker_icon from "../../../../assets/images/speaker_icon.svg";
import play_icon from "../../../../assets/images/play_icon.svg";
import InputFile from "../../../shared/InputFile";
import {CallSetupService} from "../../../../services/setup/callSetupServices";
import Loader from "../../../shared/Loader";
import { ContactService } from "../../../../services/contact/ContactServices";
import { MESSAGE_DELAY } from "../../../../configuration/env";
import Recoder from "../../../shared/Recoder";
import Player from "../../../shared/Player";
import { utils } from "../../../../helpers";
import config from "../../../../configuration/config";

const CallConfiguration = (props) => {
    const [name, setName] = useState("");
    const [callResponse, setCallResponse] = useState("receive_calls");
    const [schedule, setSchedule] = useState([]);
    const [nameError, setNameError ]= useState("");
    const [isLoader, setIsLoader] = useState(false);
    const [introAudio, setIntroAudio] = useState(false);
    const [callForward, setCallForward] = useState(false);
    const [callWhisper, setCallWhisper] = useState(false);
    const [voicemailMsg, setVoicemailMsg] = useState(false);
    const [voicemailSms, setVoicemailSms] = useState(false);
    const [voicemailSmsNotif, setVoicemailSmsNotif] = useState(false);
    const [voicemailEmailNotif, setVoicemailEmailNotif] = useState(false);
    const [missedCallMsg, setMissedCallMsg] = useState(false);
    const [isOverlapped, setIsOverlapped] = useState(false);
    const [overlappValidated, setOverlappValidated] = useState("");
    const [instCallForward, setInstCallForward] = useState(false);
    const [newCallForwardPrefix, setNewCallForwardPrefix] = useState("US_1");
    const [newCallForwardNumber, setNewCallForwardNumber] = useState("");
    const [phoneCountryCode, setPhoneCountryCode] = useState([]);
    const [callForwardNumbers, setCallForwardNumbers] = useState([])
    const [callForwardErr, setCallForwardErr] = useState(false);
    const [callForwardOption, setCallForwardOption] = useState(false);
    const [scheduleErr, setScheduleErr] = useState(false);
    const [id, setId] = useState(false);
    const [type, setType] = useState("upload");
    const [introFile, setIntroFile] = useState("");
    const [introFileTitle, setIntroFileTitle] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [introAudioFileChosed, setIntroAudioFileChosed] = useState(false);
    const [introAudioinputFileName, setIntroAudioinputFileName] = useState("No file chosen");
    const [introChosedFileError, setIntroChosedFileError] = useState(false);
    const [oldIntroAudio, setOldIntroAudio] = useState(null);
    const [oldIntroAudioKey, setOldIntroAudioKey] = useState(null);
    const [newIntroAudio, setNewIntroAudio] = useState(null);
    const [tmpIntroAudioFile, setTmpIntroAudioFile] = useState(null);
  
    const handleCheckboxChange = (event, constName) => {
        eval("set" + constName + "(event.target.checked)");
    }
    const handleInputChange = (event, constName) => {
      console.log(event.target.value)
      eval("set" + constName + "(event.target.value)");
    }

    const handleCallForwardNumChange = (e) => {
      const re = /^[0-9\b]+$/;
        
      if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length < 16) {
        setNewCallForwardNumber(e.target.value)
      }
    }

    const handleCallForwardOption = (e, index) => {
      e.preventDefault();

      if (index === callForwardOption ){
        setCallForwardOption(false)
      } else {
        setCallForwardOption(index)
      }
      
    }

    const addCallForwardNumber = (e) => {
      e.preventDefault();

      if (!newCallForwardNumber) {
        setCallForwardErr("Please provide a number");
      } else if (newCallForwardNumber.length < 4) {
        setCallForwardErr("Number must be greater than 3 digits");
      } else {
        setCallForwardErr("");
        callForwardNumbers.push({
          country: newCallForwardPrefix.split("_")[0],
          prefix: newCallForwardPrefix.split("_")[1],
          number: newCallForwardNumber
        })
        setCallForwardNumbers([...callForwardNumbers]);
        setNewCallForwardNumber("");
      }
    }

    const removeCallForwardNumber = (e, index) => {
      e.preventDefault();
      callForwardNumbers.splice(index, 1);
      setCallForwardNumbers([...callForwardNumbers]);
      setCallForwardOption(false);
    }

    const fetchCountry = async () => {
      let conntryResponse = await ContactService.fetchCountry();
      setPhoneCountryCode(conntryResponse);
    };

    useEffect(() => {
      // Set states for edit
      if (props.editConfig) {
        setId(props.editConfig._id);
        setName(props.editConfig.name);
        setCallResponse(props.editConfig.responseType);
        setSchedule(props.editConfig.schedules);
        setCallForward(props.editConfig.callForward);
        setInstCallForward(props.editConfig.instantCallForward);
        setCallForwardNumbers(props.editConfig.callForwardNumbers || []);
        
        if (props.editConfig.introAudioKey) {
          setIntroAudio(props.editConfig.introAudio);
          let oldIntro = new Audio(config.bucketUrl + props.editConfig.introAudioKey);
          setOldIntroAudio(oldIntro);
          setOldIntroAudioKey(props.editConfig.introAudioKey)
        }
        
        console.log("props.editConfig.schedules", props.editConfig)
      } else {
        let conf = [{
          day: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
          startTime: "00:00",
          endTime: "24:00"
        }];
        setSchedule(conf);
      }      
      fetchCountry();
    },[])

    // Check outside click for callforward menue, close if clicked outside
    useEffect(() => {
      // const checkClickOutsideMenu = (e) => {
      //     if(callForwardOption && props.ref && !props.ref.contains(e.target)) {
      //         setCallForwardOption(false);
      //     } else {
      //       console.log("outclick", callForwardOption)
      //     }
      // }

      // document.addEventListener("click", checkClickOutsideMenu);
      // return () => {
      //     document.removeEventListener("click", checkClickOutsideMenu);
      // };
  },[]);

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
            endTime: "24:00"
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
        schedule[key].startTime = e.target.value;       
        setSchedule([...schedule]);
    }
    const handleEndTime = (key, e) => {
        schedule[key].endTime = e.target.value;
        setSchedule([...schedule]);
    }
    const handleCallChange = (event) => {
      setName(event.target.value);
    }
    const handleCallResponseChange = (event) => {
      setCallResponse(event.target.value);
    }
    const convertTimeToNumber = (time)  => {
        const hours = Number(time.split(':')[0]);
        const minutes = Number(time.split(':')[1]) / 60;
        return hours + minutes;
    }

    // Add time number
    const scheduleOverite = async () => {
      for (let i = 0; i < schedule.length; i++) {
        schedule[i].startTimeNumber = convertTimeToNumber(schedule[i].startTime);
        schedule[i].endTimeNumber = convertTimeToNumber(schedule[i].endTime);        
      }
      setSchedule([...schedule]);
    }
    const saveData = async (closeModal) => {
      try {
        setIsLoader(true);
        await scheduleOverite();

        let payload = {
          name: name,
          responseType: callResponse,
          schedules: schedule,
          twilioNumberId: props.numberId,
          callForward: callForward,
          instantCallForward: instCallForward,
          callForwardNumbers: callForwardNumbers,
          introAudio: introAudio,
          oldIntroAudio: oldIntroAudio === false ? false : true,
          oldIntroAudioKey: oldIntroAudioKey
        };

        if (introAudio && introFile) {
          payload.introAudioFile = introFile;
        }


        // Create
        if (!id) {
          await CallSetupService.saveCallConfig(payload)
          props.setSuccessMsg("Configuration has been created successfully")
        } else {
          // Update
          payload.id = id;
          await CallSetupService.updateCallConfig(payload);
          props.setSuccessMsg("Configuration has been updated successfully")
        }
        
        setIsLoader(false);
        resetForm();
        if (closeModal) {
            props.closeModal();
        }        
      } catch (e) {
        setIsLoader(false);
        props.setErrorMsg(e.message)
      }
    }
    const save = async (e) => {
        e.preventDefault();

        if (await validateForm()) {
            let overlapCheck = await checkOverlap();
            console.log("overlapCheck", overlapCheck);
            setIsOverlapped(overlapCheck.isOverlapped);
            
            if (!overlapCheck.isOverlapped) {
            await saveData(true);
            } 
            setIsLoader(false);
        }
        
    }

    const checkOverlap = async (removeOverlap = false) => {
        setIsLoader(true);
        let payload = {
          schedules: schedule,
          twilioNumberId: props.numberId,
          removeOverlap: removeOverlap
        }
        if (id) payload.id = id;
        let overlapResp = await CallSetupService.checkCallConfigOverlap(payload)
        if (removeOverlap) {
            setSchedule(overlapResp.newScheduled);
        }
        setIsOverlapped(overlapResp.isOverlapped);
        setIsLoader(false);
        return overlapResp;
    }

    const validateOverlap = async (e, removeOverlap = false) => {
        e.preventDefault();
        
        if (await validateForm()) {
            let overlapCheck = await checkOverlap(removeOverlap);
            setIsOverlapped(overlapCheck.isOverlapped);

            if (!overlapCheck.isOverlapped) {
              setOverlappValidated(true)
            }
        }
    }

    useEffect(()=>{
      if (overlappValidated) {
        setTimeout(()=> {
          setOverlappValidated(false)
        },MESSAGE_DELAY)
      }
    });
    const removeOverlap = async (e) => {
        e.preventDefault();
        validateOverlap(e, true);
    }

    const validateForm = async () => {
        let isOkay = true;
        setNameError("");
        if (name === "") {
            setNameError("Please provide name.");
            isOkay = false;
        }

        // If any other config having error
        Object.keys(formErrors).forEach((k) => {
          if (formErrors[k]) {
            isOkay = false;
          } 
        })
        
        for (var si = 0; si < schedule.length; si++) {
            let stTime = convertTimeToNumber(schedule[si].startTime);
            let endTime = convertTimeToNumber(schedule[si].endTime);
            if (!schedule[si].day.length || stTime >= endTime) {
                isOkay = false;
                schedule[si].error = "Please select at least a day and time 'To' must be greater than 'From'"
            } else {
                schedule[si].error = "";
            }
        }

        if (!schedule.length) {
          isOkay = false;
          setScheduleErr("Configuration must have at least one schedule");
        } else {
          setScheduleErr(false);
        }
        
        setSchedule([...schedule]);

        return isOkay;
    }

    const resetForm = async (e) => {
      console.log("reseting form");
      setName("");
      setNameError("");
      setIsOverlapped(false);
      setCallResponse('receive_calls');
      setIntroAudio(false);
      setCallForward(false);
      
      setSchedule([{
          day: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
          startTime: "00:00",
          endTime: "24:00"
      }]);      
      setCallForwardNumbers([]);
      setCallForwardErr(false);
      setCallForwardOption(false);
      setCallForwardOption(false);
      setScheduleErr(false);
      setType("upload");
      setIntroFile("");
      setIntroFileTitle("");
      setFormErrors("");
      setIntroAudioFileChosed(false);
      setIntroAudioinputFileName("No file chosen");
      setIntroChosedFileError(false);
      setOldIntroAudio(null);
      setOldIntroAudioKey(null);
      setNewIntroAudio(null);
      setTmpIntroAudioFile(null);     
    }
    const saveNew = async (e) => {
        e.preventDefault();

        if (await validateForm()) {
            let overlapCheck = await checkOverlap();
            setIsOverlapped(overlapCheck.isOverlapped);
            
            if (!overlapCheck.isOverlapped) {
                await saveData(false);
            } 
        }
    }

    const removeSchedule = async (key) => {
        schedule.splice(key, 1)
        setSchedule([...schedule]);
    }

    /** Intro audio type change */
    const handleIntroTypeChange = async (t) => {
      setType(t);
      setIntroAudioinputFileName("No file chosen");
      setIntroFile(null);
      setIntroAudioFileChosed(false);
      setFormErrors((prevState) => {
        return {
          ...prevState,
          introFile: ""
        }
      });
    }
    /**
     * Handle upload audio
     * @param {*} e 
     */
    const handleAudioUpload = (event) => {
      console.log("File change...")
      let files = event.target.files;
     
      if (files && files.length) {
        setIntroChosedFileError(false);   
        setIntroAudioFileChosed(false);  
        setIntroAudioinputFileName("");
  
        if(files[0].type === "audio/mpeg") {
          setIntroAudioFileChosed(true);
          setIntroAudioinputFileName(files[0].name);
          console.log("file okay")
          let reader = new FileReader();
          reader.onload = (r) => {
              console.log('Reader', r);
              let audio = new Audio(r.target.result);
              setTmpIntroAudioFile(audio);
              setIntroFile(r.target.result);
          };
          reader.readAsDataURL(files[0]);
              
        } else {
          setTmpIntroAudioFile(false);
          setIntroChosedFileError(true);     
        }       
      }
    };

    /**
     * Get data set
     * @param {*} dataFromChild
     */
    const getDataFn = (dataFromChild) => {
      console.log('data from child in modal', dataFromChild, typeof dataFromChild);
      //Getting blob as data from recorder
      if (typeof dataFromChild === "object") {
          console.log("object block>")
          let reader = new FileReader();
          reader.onload = (r) => {
            // let audio = new Audio(r.target.result);
            setIntroFile(r.target.result);
          };
          reader.readAsDataURL(dataFromChild);
      } else if (dataFromChild) {
        // Deleted
        console.log("record deleted")
        setNewIntroAudio(false);
      }
    }

    const handleSetIntroAudio = async (e) => {
      e.preventDefault();

      setIntroAudioFileChosed(false);      
      setIntroFileTitle(introAudioinputFileName);

      let audio = new Audio(introFile);
      let fileErr = "";

      if (tmpIntroAudioFile.duration > 55) {     
        fileErr = "Invalid audio, audio duration should be maximum 55 seconds";       
        setNewIntroAudio(false);  
        setIntroFile(null);
      } else {
        setIntroAudioinputFileName("No file chosen");
        setNewIntroAudio(audio);        
      }

      setFormErrors((prevState) => {
        return {
          ...prevState,
          introFile: fileErr
        }
      });

    }

    const deleteOldIntroAudio = () => {
      setOldIntroAudio(false);
    }
    const deleteNewIntroAudio = () => {
      setNewIntroAudio(false)
    }

    return (
      <div className="sideMenuOuter">
        <div className="sideMenuInner callConfigModal">
          {isLoader ? <Loader /> : ""}
          <button className="btn btn-closeSideMenu" onClick={props.closeModal}>
            <span></span>
            <span></span>
          </button>
          <div className="sideMenuHeader">
            <h3>{props.editConfig ? "Update" : "Create"} a Call Configuration</h3>
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
                      value={name}
                      onChange={(e) => handleCallChange(e)}
                    />
                    {nameError !== "" && (
                      <span className="errorMsg">{nameError}</span>
                    )}
                  </div>
                </div>
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Call Response</div>
                  <div className="cmnFormField">
                    <select
                      className="cmnFieldStyle selectBox"
                      defaultValue={callResponse}
                      onChange={(e) => handleCallResponseChange(e)}
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
                {schedule.map((list, key) => {
                  return (
                    <div className="cmnFormRow scheduleRow" key={key}>
                      {key !== 0 && (
                        <div className="scheduleRow">
                          <button
                            className="btn"
                            onClick={() => removeSchedule(key)}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12.347"
                                height="13.553"
                                viewBox="0 0 12.347 13.553"
                                className="deleteIcon"
                              >
                                <g transform="translate(0.75 0.75)">
                                  <path
                                    className="a"
                                    transform="translate(-3 -3.589)"
                                  />
                                  <path
                                    className="a"
                                    d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                    transform="translate(-3.795 -2)"
                                  />
                                  <line
                                    className="a"
                                    y2="3"
                                    transform="translate(4.397 6.113)"
                                  />
                                  <line
                                    className="a"
                                    y2="3"
                                    transform="translate(6.397 6.113)"
                                  />
                                </g>
                              </svg>
                            </span>
                          </button>
                        </div>
                      )}

                      <div className="cmnFormCol">
                        <div className="cmnFieldName">Select Day (s)</div>
                        <div className="cmnFormField">
                          <ul className="weekDateList">
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="sun"
                                defaultChecked={list.day.includes("sun")}
                                onChange={(e) => handleDayBox(key, "sun", e)}
                              />
                              <span>S</span>
                            </li>
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="mon"
                                defaultChecked={list.day.includes("mon")}
                                onChange={(e) => handleDayBox(key, "mon", e)}
                              />
                              <span>M</span>
                            </li>
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="tue"
                                defaultChecked={list.day.includes("tue")}
                                onChange={(e) => handleDayBox(key, "tue", e)}
                              />
                              <span>T</span>
                            </li>
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="wed"
                                defaultChecked={list.day.includes("wed")}
                                onChange={(e) => handleDayBox(key, "wed", e)}
                              />
                              <span>W</span>
                            </li>
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="wed"
                                defaultChecked={list.day.includes("thu")}
                                onChange={(e) => handleDayBox(key, "thu", e)}
                              />
                              <span>T</span>
                            </li>
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="wed"
                                defaultChecked={list.day.includes("fri")}
                                onChange={(e) => handleDayBox(key, "fri", e)}
                              />
                              <span>F</span>
                            </li>
                            <li className="weekDate">
                              <input
                                key={Math.random()}
                                type="checkbox"
                                value="wed"
                                defaultChecked={list.day.includes("sat")}
                                onChange={(e) => handleDayBox(key, "sat", e)}
                              />
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
                              <select
                                className="cmnFieldStyle timeInput"
                                value={list.startTime}
                                onChange={(e) => handleStartTime(key, e)}
                              >
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
                                <option value="24:00">24:00</option>
                              </select>
                            </div>
                          </div>
                          <div className="cmnFormCol">
                            <div className="cmnFormField">
                              <label className="cmnFieldName">To</label>
                              <select
                                className="cmnFieldStyle timeInput"
                                value={list.endTime}
                                onChange={(e) => handleEndTime(key, e)}
                              >
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
                                <option value="24:00">24:00</option>
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
                      ) : (
                        ""
                      )}
                      {schedule[key].error && (
                        <div className="cmnFormRow">
                          <span className="errorMsg">
                            {schedule[key].error}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="cmnFormRow">
                  <button
                    className="saveNnewBtn addAnotherBtn"
                    onClick={(event) => addAnotherTime(event)}
                  >
                    <img src={plue_icon_white_thik} alt="" /> Schedule Another
                    Time
                  </button>
                  <button
                    className="btn-link timeOverlapBtn"
                    onClick={validateOverlap}
                  >
                    Validate Time Overlap
                  </button>
                </div>
                {isOverlapped && (
                  <div className="slotNotAbailable">
                    <p>
                      Scheduled slot(s) is not valid as it conflicts with one or
                      more configuration. Do you want to remove the same time
                      from this and other configurations?
                    </p>
                    <div className="btnGroup">
                      <button className="cmnBtn" onClick={removeOverlap}>
                        Yes
                      </button>
                      <button className="cmnBtn btn-red" onClick={() => setIsOverlapped(false)}>No</button>
                    </div>
                  </div>
                )}
                {overlappValidated && 
                  <div className="text-center">
                    <span className="formMsg success">Schedule slot(s) is validated</span>
                  </div>
                }

                {scheduleErr && 
                  <div className="errorMsg">
                    <p>{scheduleErr}</p>
                  </div>
                }
              </div>
              <div className="cmnFormRow setupForms">
                <h4 className="formSecHeading">Setup</h4>
                <div className="setupFormLists">
                  
                <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            key={Math.random()}
                            type="checkbox"
                            defaultChecked={introAudio}
                            onChange={(e) => {
                              handleCheckboxChange(e, "IntroAudio");
                              handleIntroTypeChange(type)
                            }}
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Introduction Audio
                        </span>
                      </label>
                    </div>
                    {introAudio && (
                      <div className="setupFormRowBody">
                        {oldIntroAudio ? 
                          <div className="cmnFormRow">
                              <div className="cmnFieldName">Existing Audio</div>
                              <Player 
                                audioElement={oldIntroAudio} 
                                preview={false} 
                                getData={deleteOldIntroAudio}/>
                          </div>
                          :
                            <React.Fragment>
                                <div className="cmnFormRow">
                                    <div className="cmnFormField radioGroup">
                                        <label className="cmnFormRadioLable">
                                            <div className="circleRadio" onClick={() => { handleIntroTypeChange("upload") }}>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="upload"
                                                    defaultChecked={type === "upload"}
                                                />
                                                <span></span>
                                            </div>
                                            Upload Audio
                                        </label>
                                        <label className="cmnFormRadioLable">
                                            <div className="circleRadio" onClick={() => { handleIntroTypeChange("record") }}>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="record"
                                                    defaultChecked={type === "record"}
                                                />
                                                <span></span>
                                            </div>
                                            Record Audio
                                        </label>
                                        <p className="uploadInfo">
                                          * Please upload/record audio file for maximum{" "}
                                          <strong>55 second</strong> duration.
                                        </p>
                                    </div>
                                </div>   
                                                
                              <div className="cmnFormRow">
                                  {
                                      type === 'upload' ?
                                          <React.Fragment>
                                            { newIntroAudio ? 
                                            
                                              <Player 
                                              audioElement={newIntroAudio} 
                                              preview={false} 
                                              trackName={introFileTitle}
                                              getData={deleteNewIntroAudio}/>                                              
                                              :                                              
                                              <div className="cmnFormField">
                                                <div className={introChosedFileError ? "cmnInputFile error" : "cmnInputFile"}>
                                                  <input type="file" onChange={handleAudioUpload} accept="audio/mpeg" />                                       
                                                  <div className="choseFile">Choose File</div>
                                                  <span className={introAudioFileChosed ? "fileName fileChosed" : "fileName"}>{introAudioinputFileName}</span>
                                                </div>
                                                {introChosedFileError && 
                                                  <span className="errorMsg">Please chose .mp3 file</span>
                                                }
                                              </div>
                                            }
                                          </React.Fragment>
                                          :
                                          <React.Fragment>
                                              <div className="cmnFieldName">Record an Audio</div>
                                              <Recoder 
                                              maxRecordingSec={55}
                                              getData={getDataFn} />
                                          </React.Fragment>
                                  }
                                  {formErrors.introFile ? <span className="errorMsg">{formErrors.introFile}</span> : ''}
                              </div>
                              {type == "upload" && tmpIntroAudioFile && 
                                <div className="hide">
                                  {/* Tmp player to calculate duration of uploaded audio file */}
                                  <Player 
                                    audioElement={tmpIntroAudioFile} 
                                    preview={false} />  
                                </div> 
                              }
                              {type == "upload" && !newIntroAudio && 
                                <div className="cmnFormRow">
                                  <button className="cmnBtn" onClick={handleSetIntroAudio}>
                                    <span>Save</span>
                                    <img src={arrow_forward} alt="" />
                                  </button>
                                </div>
                              }
                            </React.Fragment>
                          }
                        </div>
                    )}
                  </div>
                  
                  <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            key={Math.random()}
                            type="checkbox"
                            defaultChecked={callForward}
                            onChange={(e) =>
                              handleCheckboxChange(e, "CallForward")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Call forwarding
                        </span>
                      </label>
                    </div>
                    {callForward && (
                      <div className="setupFormRowBody">
                        <div className="cmnFormRow">
                          {/* Instant call forward is disabled for now */}
                          <div className="cmnFormField hide"> 
                            <label className="cmnFieldName">
                              Instant Call Forward
                            </label>
                            <div className={"toggleBtn " + (instCallForward ? "active" : "")}>
                              <input type="checkbox" defaultChecked={instCallForward} onChange={(e) => handleCheckboxChange(e, "InstCallForward")} />
                              <span className="toggler"></span>
                            </div>
                          </div>
                        </div>
                        <div className="cmnFormRow addNumForm">
                          <div className="addNumFormLeft">
                            <label className="cmnFieldName">Add number</label>
                          </div>
                          <div className="addNumFormRight">
                            <div className="cmnFormRow">
                              <div className="cmnFormField countryCodeField">
                                <div className="countryCode cmnFieldStyle">
                                  <div className="countryName">{newCallForwardPrefix.split("_")[0]}</div>
                                  <div className="daileCode">+{newCallForwardPrefix.split("_")[1]}</div>
                                  <select className="selectCountry"
                                    onChange={(e) => handleInputChange(e, "NewCallForwardPrefix")}>
                                    {phoneCountryCode.length > 0 && phoneCountryCode.map((country, cIndex) => (
                                      <option 
                                        value={country.code + "_" + (country.prefix.replace("+",""))}
                                        key={"cnt-"+cIndex}>
                                          {country.code} ({country.prefix})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <input
                                  type="text"
                                  className="cmnFieldStyle"
                                  placeholder="Eg. 5143654785"
                                  value={newCallForwardNumber}
                                  onChange={handleCallForwardNumChange}
                                />
                              </div>
                              <button className="cmnBtn" onClick={addCallForwardNumber}>
                                <span>Add</span>
                                <img src={arrow_forward} alt="" />
                              </button>
                            </div>

                            {callForwardErr && 
                              <span className="errorMsg">{callForwardErr}</span>
                            }

                            {callForwardNumbers.length > 0  && 
                              <div className="cmnFormRow">
                                <div className="numberListHead">
                                  Numbers Added
                                </div>
                                <ul className="numberLisr">
                                  {callForwardNumbers.map((phone, pIndex) => (
                                    <li key={"phn-" + pIndex}>
                                      <span>+{phone.prefix}-{phone.number}</span>
                                      <div className="numberListAction">
                                        <div className="info_3dot_icon">
                                          <button className="btn" onClick={(e) => handleCallForwardOption(e, pIndex)}>
                                            <img src={info_3dot_icon} alt="More" />
                                          </button>
                                        </div>
                                        <div 
                                          className={
                                            ( callForwardOption === pIndex ? " listShow " : " listHide " ) 
                                            + " dropdownOptions"
                                          }>
                                          <button className="btn btnDelete" onClick={(e) => removeCallForwardNumber(e, pIndex)}>
                                            <span>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12.347"
                                                height="13.553"
                                                viewBox="0 0 12.347 13.553"
                                                className="deleteIcon"
                                              >
                                                <g transform="translate(0.75 0.75)">
                                                  <path
                                                    className="a"
                                                    transform="translate(-3 -3.589)"
                                                  ></path>
                                                  <path
                                                    className="a"
                                                    d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                    transform="translate(-3.795 -2)"
                                                  ></path>
                                                  <line
                                                    className="a"
                                                    y2="3"
                                                    transform="translate(4.397 6.113)"
                                                  ></line>
                                                  <line
                                                    className="a"
                                                    y2="3"
                                                    transform="translate(6.397 6.113)"
                                                  ></line>
                                                </g>
                                              </svg>
                                            </span>
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            disabled
                            onChange={(e) =>
                              handleCheckboxChange(e, "CallWhisper")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">Call Whisper</span>
                      </label>
                    </div>
                    {callWhisper && (
                      <div className="setupFormRowBody">
                        <div className="cmnFormRow">
                          <div className="cmnFormField">
                            <label className="cmnFieldName">
                              Old audio file
                            </label>
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
                          <div className="cmnFormField radioGroup">
                            <span className="cmnFieldName whisperType">
                              Whisper Input type
                            </span>
                            <label className="cmnFormRadioLable">
                              <div className="circleRadio">
                                <input type="radio" name="whisperType" />
                                <span></span>
                              </div>
                              Audio
                            </label>
                            <label className="cmnFormRadioLable">
                              <div className="circleRadio">
                                <input type="radio" name="whisperType" />
                                <span></span>
                              </div>
                              Text
                            </label>
                          </div>
                        </div>
                        <div className="cmnFormRow">
                          <div className="cmnFormField radioGroup">
                            <label className="cmnFormRadioLable">
                              <div className="circleRadio">
                                <input type="radio" name="type" />
                                <span></span>
                              </div>
                              Upload Audio
                            </label>
                            <label className="cmnFormRadioLable">
                              <div className="circleRadio">
                                <input type="radio" name="type" />
                                <span></span>
                              </div>
                              Record Audio
                            </label>
                          </div>
                          <p className="uploadInfo">
                            * Please upload/record audio file for maximum{" "}
                            <strong>55 second</strong> duration.
                          </p>
                        </div>
                        <div className="cmnFormRow">
                          <div className="cmnFormField">
                            <InputFile />
                          </div>
                        </div>
                        <div className="cmnFormRow">
                          <div className="cmnFormField">
                            <textarea
                              className="cmnFieldStyle"
                              placeholder="Message to send after voicemail"
                            ></textarea>
                          </div>
                        </div>
                        <div className="cmnFormRow">
                          <button className="cmnBtn">
                            <span>Save</span>
                            <img src={arrow_forward} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div> */}
                  {/* <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            disabled
                            onChange={(e) =>
                              handleCheckboxChange(e, "VoicemailMsg")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Voicemail message
                        </span>
                      </label>
                    </div>
                    {voicemailMsg && (
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
                        <div className="cmnFormRow">
                          <div className="cmnFormField radioGroup">
                            <label className="cmnFormRadioLable">
                              <div className="circleRadio">
                                <input type="radio" name="type" />
                                <span></span>
                              </div>
                              Upload Audio
                            </label>
                            <label className="cmnFormRadioLable">
                              <div className="circleRadio">
                                <input type="radio" name="type" />
                                <span></span>
                              </div>
                              Record Audio
                            </label>
                          </div>
                          <p className="uploadInfo">
                            * Please upload/record audio file for maximum{" "}
                            <strong>55 second</strong> duration.
                          </p>
                        </div>
                        <div className="cmnFormRow">
                          <div className="cmnFormField">
                            <InputFile />
                          </div>
                        </div>
                        <div className="cmnFormRow">
                          <button className="cmnBtn">
                            <span>Save</span>
                            <img src={arrow_forward} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            disabled
                            onChange={(e) =>
                              handleCheckboxChange(e, "VoicemailSms")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Voicemail Message Enable/Disable
                        </span>
                      </label>
                    </div>
                    {voicemailSms && (
                      <div className="setupFormRowBody">
                        <div className="cmnFormRow">
                          <label className="cmnFieldName">Create Message</label>
                          <p className="uploadInfo uploadInfoVM">
                            153/0 SMS - One message contains 153 chatracters max
                            <br />
                            (SMS count can be changed if you are using keyword
                            variable e.g. [fname])
                          </p>
                          <div className="cmnFormField">
                            <textarea
                              className="cmnFieldStyle"
                              placeholder="Message to send after voicemail"
                            ></textarea>
                          </div>
                        </div>
                        <div className="cmnFormRow">
                          <button className="cmnBtn">
                            <span>Save</span>
                            <img src={arrow_forward} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            disabled
                            onChange={(e) =>
                              handleCheckboxChange(e, "MissedCallMsg")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Missed Call Message
                        </span>
                      </label>
                    </div>
                    {missedCallMsg && (
                      <div className="setupFormRowBody">
                        <div className="cmnFormRow">
                          <label className="cmnFieldName">Create Message</label>
                          <p className="uploadInfo uploadInfoVM">
                            153/0 SMS - One message contains 153 chatracters max
                            <br />
                            (SMS count can be changed if you are using keyword
                            variable e.g. [fname])
                          </p>
                          <div className="cmnFormField">
                            <textarea
                              className="cmnFieldStyle"
                              placeholder="Message to send after voicemail"
                            ></textarea>
                          </div>
                        </div>
                        <div className="cmnFormRow">
                          <button className="cmnBtn">
                            <span>Save</span>
                            <img src={arrow_forward} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="setupFormRow">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            disabled
                            onChange={(e) =>
                              handleCheckboxChange(e, "VoicemailSmsNotif")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Voice Mail SMS Notification
                        </span>
                      </label>
                    </div>
                    {voicemailSmsNotif && (
                      <div className="setupFormRowBody">
                        <div className="cmnFormRow smsNotificationVM">
                          <div className="cmnFormField countryCodeField">
                            <div className="countryCode cmnFieldStyle">
                              <div className="countryName">US</div>
                              <div className="daileCode">+1</div>
                              <select className="selectCountry">
                                <option value="">US (+1)</option>
                              </select>
                            </div>
                            <input
                              type="text"
                              className="cmnFieldStyle"
                              placeholder="Eg. (555) 555-1234"
                            />
                          </div>
                          <button className="cmnBtn">
                            <span>Save</span>
                            <img src={arrow_forward} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="setupFormRow eNotiVM">
                    <div className="setupFormRowHead">
                      <label>
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            disabled
                            onChange={(e) =>
                              handleCheckboxChange(e, "VoicemailEmailNotif")
                            }
                          />
                          <span></span>
                        </div>
                        <span className="fomrListHeadName">
                          Voice Mail Email Notification
                        </span>
                      </label>
                    </div>
                    {voicemailEmailNotif && (
                      <div className="setupFormRowBody">
                        <div className="cmnFormRow emailNotificationVM">
                          <input
                            type="text"
                            className="cmnFieldStyle"
                            placeholder="Set Notification Email"
                          />
                          <button className="cmnBtn">
                            <span>Save</span>
                            <img src={arrow_forward} alt="" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="cmnFormRow">
                <div className="btnGroup centered">
                  <button className="cmnBtn" onClick={(e) => save(e)}>
                    <span>{id ? "Update" : "Save"}</span>
                    <img src={arrow_forward} alt="" />
                  </button>
                  {!id && 
                    <button className="cmnBtn" onClick={(e) => saveNew(e)}>
                      <span>Save & New</span>
                      <img src={arrow_forward} alt="" />
                    </button>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}


export default CallConfiguration;