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
import { SMSServices } from "../../../../../services/template/SMSServices";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../../actions/types";


const Sms = (props) => {
  const dispatch = useDispatch();
  const messageTextbox = useRef(null)

  const [contactID, setContactID] = useState("");
  const [contactGenData, setContactgendata] = useState(props.contactGenData);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [smsTags, setSmsTags] = useState([])
  const [smsTemplates, setSMSTemplates] = useState(false)
  const [isLoader, setIsLoader] = useState(false)
  //const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templateToogle, setTemplateToogle] = useState(false);
  const [smsDatasubject, setSmsDatasubject] = useState("");
  const [searchTagString, setSearchTagString] = useState("");

  const [smsData, setSmsData] = useState( {
    body : "",
    mediaUrl : "",
    to: ""
  });
  const [smsDataErr, setSmsDataErr] = useState({
    err : "",
    errNumber : "",
  });
 
  const fetchSMSTags = async () => {
    try {
      const result = await SMSServices.fetchSMSTags()
      if(result) {
        // console.log("result", result);
        setSmsTags(result)
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: error.message,
        typeMessage: 'error'
      });
    }
  }
  const fetchSMS = async () => {
    let page = "all";
    try {
      setIsLoader(true);
      const result = await SMSServices.fetchSms(page);
      if (result) {
        setSMSTemplates(result.templates);
      }
    } catch (e) {
      setIsLoader(false);
      console.log("Error in SMS template listing", e);
    } finally {
      setIsLoader(false);
    }
  };

  const smsSend = async (payload) => {
    try {
        setIsLoader(true);
        let result = await SMSServices.sendSMS(payload);
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "SMS sent successfully",
            typeMessage: 'success'
        });
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: e.message ,
            typeMessage: 'error'
        });
    } finally {
        setIsLoader(false);
        props.closePanel(false)
    }
  };


  const addKeywordSms = (e) => {
    e.preventDefault()
    let subjectInput = messageTextbox.current;
    let cursorStart = subjectInput.selectionStart;
    let cursorEnd = subjectInput.selectionEnd;
    let textValue = subjectInput.value;
  
    try {
        if (cursorStart || cursorStart == "0"
        ) {
            var startToText = "";
            subjectInput.value =
                subjectInput.value.substring(0, cursorStart) +
                " [" +
                e.target.textContent +
                "] " +
                subjectInput.value.substring(cursorEnd, textValue.length);
  

            setSmsData({
                ...smsData,
                body: subjectInput.value
            })
            startToText =
                subjectInput.value.substring(0, cursorStart) +
                "[" +
                e.target.textContent +
                "]";
  
            subjectInput.focus();
            subjectInput.setSelectionRange(
                startToText.length + 1,
                startToText.length + 1
            );
  
            // console.log(subjectInput, cursorStart, cursorEnd, textValue);
        } else {
            subjectInput.value = subjectInput.value + " [" + e.target.textContent + "] ";
  
            setSmsData({
              ...smsData,
              body: subjectInput.value
            })
            subjectInput.focus();
        }
    } catch (err) {
        console.log();
    }
  }

  const msgHandler = (e) =>{
    setSmsData({
      ...smsData,
       body : e.target.value,
    });
    if(e.target.value === ""){    
      setSmsDataErr({...smsDataErr,err : "Write a msg here"})
    }else{
      setSmsDataErr({err : "",errNumber:""})

    }

  }

  const sendingSmsTemplateDetails = (e, elem) => {
    console.log("eleme", elem);
    setSmsData({
      ...smsData,
       body : elem.message,
    });
       setSmsDatasubject(elem.title);
       setTemplateToogle(false);   
       //setTempSelected(true);
       //console.log(tempSelected);
}




useEffect(() => {
  fetchSMS("all")
  fetchSMSTags()
}, []);

const submitMessage = (e) =>{
  e.preventDefault();
  var phNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  let payload = {
    body : smsData.body,
    mediaUrl : "",
    to: (contactGenData?.phone?.full_number ? contactGenData?.phone?.full_number :"")
  }
 // console.log("payload.to",);
  if(smsData.body === ""){
    setSmsDataErr({...smsDataErr,err : "Write a msg here"})
  }else if(payload.to === "" ){
    setSmsDataErr({...smsDataErr,errNumber : "To send SMS you must save a mobile or phone number first"})
  }else if(!phNumber.test(payload.to)){
   setSmsDataErr({...smsDataErr,errNumber : "It is not a valid number"})
 }else{
    smsSend(payload);
    props.smsPlaceholdingData(payload)
    setSmsDataErr({...smsDataErr,err : ""})
  }

} 








  return (
    <>
       {isLoader ? <Loader/> : ""}
       <div className="formBody">
        <form>
                  <div className="formSlice top">
                      <div className="label">Template</div>
                      {/* <select className="cmnFieldStyle" placeholder="Choose a SMS template">
                        <option>Choose a SMS template</option>
                      </select> */}
                       <div className="textAreaHolder fitin">

                          <div className="cmnFieldStyle btnSelect"
                              onClick={(e) => setTemplateToogle(!templateToogle)}>
                              <span>{smsDatasubject ? smsDatasubject : "Select Template"}</span>
                          </div>
                          {templateToogle &&
                              <ul className="showTemplateName">
                                  {
                                      (smsTemplates &&
                                      smsTemplates.length > 0 ) ?
                                      smsTemplates.map((elem, i) => (
                                              <li key={i}
                                                 onClick={(e) => sendingSmsTemplateDetails(e, elem)}
                                                 >{elem.title}
                                              </li>
                                          )
                                      ) :
                                      <li className="listCentered">No Email template Found</li>

                                  }
                              </ul>}
                        </div>
                  </div>
                  <div className="formSlice top">
                      <div className="label">Message</div>
                      <div className="textAreaHolder">
                        <div className={smsDataErr.err ? "holder error" : "holder"}>
                          <textarea className="cmnFieldStyle" placeholder="Type your message"
                            value={smsData.body}
                            onChange={msgHandler}
                            ref={messageTextbox}
                          >

                          </textarea>
                          <button className="noBg"
                          onClick={(e) => 
                            {setKeywordSuggesion(true)
                            e.preventDefault()}
                          }><img src={browsTextarea}/></button>
                      
                           {keywordSuggesion && (
                                    <div className="keywordBox">
                                        <div className="searchKeyword">
                                            <div className="searchKeyBox">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setSearchTagString(e.target.value)}
                                                    onKeyPress={e => {
                                                        if (e.key === 'Enter') e.preventDefault();
                                                    }}
                                                />
                                            </div>
                                            <div className="cancelKeySearch">
                                                <button
                                                    onClick={() => {setKeywordSuggesion(false)
                                                            setSearchTagString("")}}
                                                ></button>
                                            </div>
                                        </div>
                                        <div className="keywordList">
                                            <ul> 
                                                {smsTags
                                                    .filter(
                                                        (smsTag) =>
                                                            smsTag.id.indexOf(searchTagString) >= 0 
                                                            && smsTag.id !== "tags"
                                                            && smsTag.id !== "phone" 
                                                            && smsTag.id !== "mobile" 
                                                            && smsTag.id !== "momCellPhone" 
                                                            && smsTag.id !== "dadCellPhone"
                                                            && smsTag.id !== "createdBy"
                                                            && smsTag.id !== "createdAt"
                                                            && smsTag.id !== "statusName"
                                                            && smsTag.id !== "phaseName"
                                                            && smsTag.id !== "contactType"
                                                            && smsTag.id !== "ageGroup"
                                                            && smsTag.id !== "sourceDetail"
                                                            && smsTag.id !== "onTrial"
                                                    )
                                                    .map((tagItem, i) => (
                                                        <li key={"keyField" + i}>
                                                            <button
                                                                onClick={(e) =>
                                                                  addKeywordSms(e, tagItem.id)
                                                                }
                                                            >
                                                                {tagItem.id}
                                                            </button>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                        </div>
                       
                         <div className="errorMsg">{smsDataErr.err}</div>  
                        <div className="msginfoTxt">
                          <span>{smsData?.body?.length > 0 ? smsData?.body?.length : 0}/160 -One message contains 160 chatracters max (SMS count can be changed if you are using keyword variable e.g. [fname])</span>
                          
                        </div>
                      </div>
                  </div>
                  <div className="formSlice">
                      <div className="label">&nbsp;</div>
                      
                      <button type="button" class="saveNnewBtn"
                          disabled={contactGenData?.phone?.full_number ? "" : "disabled"}
                          onClick={submitMessage}
                      ><span>Send</span><img src={arrowRightWhite} alt=""/></button>
                      {contactGenData?.phone?.full_number ? "" : <div className="errorMsg space">Sending SMS is disabled now, to enable it save a phone number first</div>}
                        

                         {/* <div className="errorMsg space">{smsDataErr.errNumber}</div>   */}

                  </div>

               </form>
            </div>
  
     </>
  );
};

export default Sms;
