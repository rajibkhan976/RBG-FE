import React, { useEffect, useState } from "react";
import Lottie from 'react-lottie-player';

import "../../assets/css/memberCheckInPortal.css";
import frame from "./images/Frame.svg";
import load from "./images/load.svg";
import timeicon from "./images/time.svg";
import lottieJson from "./lottie.json";
import crossIcon from "./images/cross.svg";
import { useDispatch } from "react-redux";
import MemberServices from "../../services/member-portal/memberServices"
import * as actionTypes from "../../actions/types";
import moment from "moment";
import momentTZ from "moment-timezone";
//import userPhoto from "./images/userPhoto.svg";
 
const MemberCheckInPortal = (props) => {
  document.title = "Red Belt Gym - Member Check In";
  const dispatch = useDispatch();
  const [accessVerify, setAccessVerify] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [accessInput, setAccessInput] = useState("");
  const [orgName, setOrgName] = useState("");
  const [time, setTime] = useState("");

  const [loginVerify, setLoginVerify] = useState(false);
  const [loginHasValue, setLoginHasValue] = useState(false);
  const [verifyLoginLoading, setVerifyLoginLoading] = useState(false);
  const [suggessionSelected, setSuggessionSelected] = useState(false);
  const [beforeLogin, setBeforeLogin] = useState(true);

  const [loginInput, setLoginInput] = useState("");
  const [selectedMember, setSelectedMember] = useState(false);
  const [checkedInMember, setCheckedInMember] = useState(false);
  const [enableCheckIn, setEnableCheckIn] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [countDwonSecond, setCountDwonSecond] = useState(5);
  const [checkedInDuration, setCheckedInDuration] = useState(null);
  const [autoSuggessionList, setAutoSuggessionList] = useState([]);
  const [tz, setTz] = useState(localStorage.getItem("orgTimezone") || "");


  useEffect(() => {
    let accessCodeInLS = localStorage.getItem("accessCode");
    if (accessCodeInLS) {
      setAccessVerify(true);
      setOrgName(localStorage.getItem("orgName"));
    } else {
      setAccessVerify(false);
    }
  })

  const accessInputHandler = (e) => {
    const re = /^[0-9]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAccessInput(e.target.value);
    }
  }
  const accessCodeVerify = async () => {
    try {
      setVerifyLoading(true);
      let virification = await MemberServices.accessCodeVerification({
        accessCode: accessInput
      })
      localStorage.setItem("orgId", virification._id);
      localStorage.setItem("orgName", virification.name);
      localStorage.setItem("orgCode", virification.code);
      localStorage.setItem("accessCode", accessInput);
      localStorage.setItem("orgTimezone", virification.timezone);
      setTz(virification.timezone)
      setOrgName(virification.name);
      setAccessVerify(true);

    } catch (e) {
      console.log("Error in access code verification", e.message);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setVerifyLoading(false);
    }
  }

  const loginInputFieldhandler = (e) => {
    setLoginInput(e.target.value);
    setLoginHasValue(true);
    memberSearch(e.target.value);
  }

  const memberSearch = async (search) => {
    if (search && search.length > 2) {
      try {
        setVerifyLoginLoading(true);
        let result = await MemberServices.memberSearch({search: search});
        setAutoSuggessionList(result.members)
      } catch (e) {
        console.log("Error in member search", e.message)
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
        if (e ?. status == 401) {
          logout();
        }
      } finally {
        setVerifyLoginLoading(false);
      }
    } else {
      setAutoSuggessionList([])
    }
  
  }

  const displayCurrentTime = () => {
    let cTime = momentTZ.tz(tz).format("hh:mm A")
    setTime(cTime);

  };
  setInterval(() => {
    displayCurrentTime();
  }, 1000);

  const submitBtnHandler = async () => {

    if (selectedMember && selectedMember._id) {
      try {
        setVerifyLoginLoading(true);
        let chekInResult = await MemberServices.checkIn({contactId: selectedMember._id})
        setCheckedInMember(chekInResult.data);
        setBeforeLogin(false);
        setLoginVerify(true);
      } catch (e) {
        setBeforeLogin(true);
        setLoginVerify(false);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
        if (e ?. status == 401) {
          logout();
        }
      } finally {
        setVerifyLoginLoading(false);
      }
    }
  }
  const clearAllSuggession = () => {
    setLoginHasValue(false);
    setLoginInput("");
    setSuggessionSelected(false)

    setEnableCheckIn(true);
    setIsCheckedIn(false);
    setLoginVerify(false);
    setAutoSuggessionList([]);
  }
  useEffect(() => {
    if (loginVerify) {
      var seconds = countDwonSecond - 1;
      var countDown = setInterval(function(){
        setCountDwonSecond(seconds)
        if(seconds <= 0){
          clearInterval(countDown);
          clearAllSuggession();
          setCountDwonSecond(5)
        }        
        seconds -= 1;
      }, 1000);
    }
  }, [loginVerify])

  const selectAutoSuggession = async (elem) => {
    setSelectedMember(elem);
    setSuggessionSelected(true);
    setLoginHasValue(false)
    setVerifyLoginLoading(true);
    try {
      let checkInStatus = await MemberServices.checkInStatus(elem._id);
      setEnableCheckIn(checkInStatus.isAlreadyCheckedIn);
      if (checkInStatus.isAlreadyCheckedIn) {
        setIsCheckedIn(checkInStatus);
      
        let end = moment(moment().utc().format("YYYY-MM-DD HH:mm:ss"));
        let starttime = moment(checkInStatus.data.checkedInAt);
        let diff =  moment.duration(end.diff(starttime));
        let hoursDiff = diff._data.hours;
        let minsDiff = diff._data.minutes;
        let minsDiffStr = minsDiff + (minsDiff > 1 ?  " mins" : " min");
        let hoursDiffStr = hoursDiff + (hoursDiff > 1 ?  " hrs" : " hr");
        let duration = hoursDiff ? hoursDiffStr + " " + minsDiffStr : minsDiffStr
        setCheckedInDuration(duration);
      }
      
    } catch(e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
      if (e ?. status == 401) {
        logout();
      }
    } finally {
      setVerifyLoginLoading(false);
    }
  }
  const emailMasking = (email) => {
    if (email) {
      let emailBreak = email.split("@");
      let emailSubPart = emailBreak[0].substring((emailBreak[0].length - 3), emailBreak[0].length );
      email = "***" + emailSubPart + "@" + emailBreak[1];
      return email;
    }
  }
  const phoneMasking = (phone) => {
    if (phone && phone.full_number) {
      let phoneSubPart = phone.full_number.substring((phone.full_number.length - 4), phone.full_number.length );
      phone  = phone.dailCode + "******" + phoneSubPart;
      return phone;
    }
  }
  const nameAbb = (firstName, lastName) => {
    firstName = firstName.trim();
    lastName = lastName.trim();
    let firstChar = firstName[0] ? firstName[0].toUpperCase() : "" ;
    let secondChar = lastName[0] ? lastName[0].toUpperCase()
                                : firstName[1] ? firstName[1].toUpperCase() : "";
    return firstChar+secondChar;
  }

  const logout = async () => {
    localStorage.removeItem("accessCode");
    setAccessVerify(false);
    setAccessInput("");
    clearAllSuggession();
  }
  
  return (
    <React.Fragment>
      <div className="containerWraper">
        <div className="sectionWrapers">
          {/* Null check is just to hide at the begining and stop jurk while state change to true */ }
          {!accessVerify && accessVerify !== null &&
            <div className="memberLoginWraper gymOwnerWraper">
              <div className="gymLogos">
                <img src={frame} alt="" />
              </div>
              <div className="gymOwnerDescriptionWraper">
                <div className="lottieJsonPlayer">
                  <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 320 }}
                  />
                </div>

                {/* <lottie-player autoplay loop mode="normal" src="https://assets1.lottiefiles.com/packages/lf20_31dlbi9b.json" style="width: 320px;margin: 32px auto 52px;"></lottie-player> */}
                <form id="gymOwnerLoginForm">
                  <input type="password" id="otpInput"
                    onChange={accessInputHandler}
                    value={accessInput} placeholder="Enter Access Code"
                    className={"inputNameWraper otpInput"} />
                  <button id="submitOtpBtns"
                    disabled={accessInput !== "" ? "" : "disabled"}
                    className="checkInBtn otpSubmit"
                    type="button"
                    onClick={accessCodeVerify}>
                    <span className={verifyLoading ? "verifyBtn " : "verifyBtn show"}>Verify</span>
                    <span className={verifyLoading ? "loads show" : "loads"}><img className="loadImgs" src={load} alt="" /></span>
                  </button>
                </form>
                {/* <button className="otpExplain">How to generate the OTP ?</button> */}
              </div>
            </div>
          }
          {accessVerify &&
            <div id="memberLoginSection" className="memberLoginWraper">
              <div className="gymInfo">
                <h3>{orgName}</h3>
                <p id="gymInfoP" className="show">Search and select your name below</p>
              </div>
              <h2 className="currentTime" id="displayTime">{time}</h2>
              {!loginVerify &&

                <div className="formWraper show" id="formSection">
                  <form id="loginForm">
                    <div className="inputNameWraper" id="inputNameWraperId">
                      {!suggessionSelected && <input type="text"
                        placeholder="Enter your name"
                        className="nameInput show"
                        onChange={loginInputFieldhandler}
                        value={loginInput}
                      />}
                      {(suggessionSelected) &&
                        <div className={verifyLoginLoading ? "displayTheResult checking" : "displayTheResult"}>
                          <span className="imgMembers">
                              {selectedMember && selectedMember.image ?
                                <span className="memImg">
                                  <img src={selectedMember.image} alt="" />
                                </span>
                                :
                                <>
                                  <span className="memNameIntitial"> 
                                    {nameAbb(selectedMember.firstName, selectedMember.lastName)}
                                   </span>
                                </>
                              }
                          </span>
                          <span className="memberInfos">
                              <span className="memberNames">{selectedMember.firstName + " " + selectedMember.lastName}</span> 
                              <span className="memberEmail">{emailMasking(selectedMember.email)}</span>
                              <span className="memberPhone">{phoneMasking(selectedMember.phone)}</span>
                          </span>
                        </div>}

                      {(loginHasValue || suggessionSelected) &&
                        <button onClick={clearAllSuggession} className="crossTheSelectection">
                          <img src={crossIcon} id="crossed" alt="" />
                        </button>
                      }
                    </div>
                    {loginHasValue &&
                      <div className="autoSuggest" id="suggestNames">
                        <ul className="autoSuggestListing">
                          {autoSuggessionList.map((member, key) => {
                            return (
                              <li className="autosuggetLi" key={key} onClick={(e) => { selectAutoSuggession(member); }}>
                                
                                  {member.image ?
                                    <span className="memImg">
                                      <img src={member.image} alt="" />
                                    </span>
                                    :
                                    <>
                                      <span className="memNameIntitial">
                                      {nameAbb(member.firstName, member.lastName)}
                                      </span>
                                    </>
                                  }
                                <span className="memberInfos">
                                  <span className="memberNames">{member.firstName + " " + member.lastName}</span> 
                                  <span className="memberEmail">{emailMasking(member.email)}</span>
                                  <span className="memberPhone">{phoneMasking(member.phone)}</span>
                                </span>
                              </li>
                            )
                          }
                          )}

                        </ul>
                      </div>
                    }
                    {!isCheckedIn &&
                      <button id="submitBtns"
                      disabled={(suggessionSelected && !enableCheckIn) ? "" : "disabled"}
                        className="checkInBtn" type="button"
                        onClick={submitBtnHandler}>
                        <span id="btnLeft" className={verifyLoginLoading ? "leftSec " : "leftSec show"}>
                            Check-In
                        </span>
                        <span id="btnRight" className={verifyLoginLoading ? "rightSec " : "rightSec show"}><img src={timeicon} alt="" /> <span id="displayTime2">{time}</span></span>
                        <span id="loadingBtn" className={verifyLoginLoading ? "loads show" : "loads"}><img className="loadImgs" src={load} alt="" /></span>
                      </button>
                    }

                    {isCheckedIn &&
                      <button id="submitBtns" className="checkInBtn alreadyChecked" type="button">
                        <span id="btnLeft" className="leftSec show">Checked In</span>
                        <span id="btnRight" className="rightSec show"><span className="dot"></span><img src={timeicon} alt="" />{checkedInDuration} <span></span></span>
                      </button>
                    }

                  </form>
                </div>

              }
              {loginVerify &&
                <>
                  <div className="successInfoWraper" id="successInfo">
                    <ul className="successUl">
                      <li className="successInfoLi">
                        {selectedMember && selectedMember.image ?
                          <span className="memImg">
                            <img src={selectedMember.image} alt="" />
                          </span>
                          :
                          <>
                            <span className="memNameIntitial">
                              {nameAbb(selectedMember.firstName, selectedMember.lastName)}
                            </span>
                          </>
                        }
                      </li>
                      <li className="successInfoLi">
                        <p className="memberNames">{selectedMember.firstName +" "+ selectedMember.lastName}</p>
                        <span className="memberEmail">{emailMasking(selectedMember.email)}</span>
                        <span className="memberPhone">{phoneMasking(selectedMember.phone)}</span>
                      </li>
                    </ul>
                    <p className="succesMessage">Checked In Successfully!</p>
                    <button id="backToCheckBtns" className="backCheckInBtn"
                      type="button" onClick={clearAllSuggession}>Back to Check In <img src="images/arrows.svg" className="backCheckinImg" alt="" /></button>
                    <p className="redirectTimer">Back to the main menu in...  <b><span id="timerCountDown">{countDwonSecond}</span> s</b></p>
                  </div>
                </>
              }
            </div>

          }

        </div>
        <footer className="footerWraper">
            <p className="masterCompany">RedBeltGym</p>
            <p className="footerText">&copy; 2022 Red Belt Gym, Inc. All rights reserved</p>
         </footer>
      </div>
      </React.Fragment>
  )
};
export default MemberCheckInPortal;