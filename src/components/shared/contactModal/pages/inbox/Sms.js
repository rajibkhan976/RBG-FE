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
import MergeTag from "../../../MergeTag";


const Sms = (props) => {
  const dispatch = useDispatch();
  const messageTextbox = useRef(null)

  const [contactID, setContactID] = useState("");
  const [contactGenData, setContactgendata] = useState(props.contactGenData);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [smsTemplates, setSMSTemplates] = useState(false)
  const [isLoader, setIsLoader] = useState(false)
  //const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templateToogle, setTemplateToogle] = useState(false);
  const [smsDatasubject, setSmsDatasubject] = useState("");
  const [backError, setBackError] = useState(false);

  const [smsData, setSmsData] = useState( {
    body : "",
    mediaUrl : "",
    to: ""
  });
  const [smsDataErr, setSmsDataErr] = useState({
    err : "",
    errNumber : "",
  });
 
 
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
    return new Promise(async (resolve,reject)=>{
      try {
        setIsLoader(true);
        let result = await SMSServices.sendSMS(payload);
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "SMS sent successfully",
            typeMessage: 'success'
        });
        resolve(true)
        //setBackError(false);
        //console.log(backError);
    } catch (e) {
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: e.message ,
            typeMessage: 'error'
        });
       // setBackError(true);
       if(e.message !== ""){
       // alert("")
        resolve(false)
        //setBackError(true)
       }else{
        resolve(true)
       // setBackError(false);
       }
    } finally {
        setIsLoader(false);
        props.closePanel(false)
    }
    })
    
  };


  const addKeywordSms = (e,field) => {
    //e.preventDefault();
    let subjectInput = messageTextbox.current;
    let cursorStart = subjectInput.selectionStart;
    let cursorEnd = subjectInput.selectionEnd;
    let textValue = subjectInput.value;
    let vall = field ;

     
    try {
        if (cursorStart || cursorStart == "0"
        ) {
          //vall = val("green");

            var startToText = "";
            subjectInput.value =
                subjectInput.value.substring(0, cursorStart) +
                vall +
                subjectInput.value.substring(cursorEnd, textValue.length);


            setSmsData({
                ...smsData,
                body: subjectInput.value
            });
            
            startToText =
                subjectInput.value.substring(0, cursorStart) +
                vall;
  
            subjectInput.focus();
            subjectInput.setSelectionRange(
                startToText.length + 1,
                startToText.length + 1
            );
  
            // console.log(subjectInput, cursorStart, cursorEnd, textValue);
        } else {
            subjectInput.value = subjectInput.value + vall;
  
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
}, []);

const submitMessage = async (e) =>{
  e.preventDefault();
  var phNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  console.log("phNumber.test((contactGenData?.phone?.full_number", phNumber.test(contactGenData?.phone?.full_number))
  let payload = {
    body : smsData.body,
    mediaUrl : "",
    to: (contactGenData?.phone?.full_number ? contactGenData?.phone?.full_number :"")
  }
 // console.log("payload.to",);
  if(smsData.body === ""){
    setSmsDataErr({...smsDataErr,err : "Write a msg here"})
  }else if((contactGenData?.phone?.full_number || "")   === "" ){
    setSmsDataErr({...smsDataErr,errNumber : "To send SMS you must save a mobile or phone number first"})
  }else if(!phNumber.test((contactGenData?.phone?.full_number || ""))){
    
    setSmsDataErr({...smsDataErr,errNumber : "It is not a valid number"})
  }else{
    let result = await smsSend (payload);
    //console.log("resultttttttttttttttttttt", result);
      if(result === true){
        props.smsPlaceholdingData(payload)
      }
    
    setSmsDataErr({...smsDataErr,err : ""})
  }

} 


function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setKeywordSuggesion(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


const keywordRef = useRef(null);
  
useOutsideAlerter(keywordRef);



  return (
    <>

       {isLoader ? <Loader/> : ""}
       <div className="formBody" >
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
                                      <li className="listCentered">No SMS template Found</li>

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
                          {/* <button className="noBg"
                          onClick={(e) => 
                            {setKeywordSuggesion(true)
                            e.preventDefault()}
                          }><img src={browsTextarea}/></button> */}
                      
                          
                        </div>
                       
                         <div className="errorMsg">{smsDataErr.err}</div>  
                        <div className="msginfoTxt">
                          <span>{smsData?.body?.length > 0 ? smsData?.body?.length : 0}/160 -One message contains 160 chatracters max (SMS count can be changed if you are using keyword variable e.g. [fname])</span>
                          
                        </div>
                      
                        <MergeTag addfeild={(e,field)=> addKeywordSms(e,field)}/>
                       
                      </div>
                  </div>
                  

               </form>
            </div>
            <div className="formSlice fixinRight">
                      <div className="label">&nbsp;</div>
                      {contactGenData?.phone?.full_number ? "" : <div className="errorMsg space">Sending SMS is disabled now, to enable it save a phone number first</div>}
                        

                        <div className="errorMsg space">{smsDataErr.errNumber}</div> 
                      <button type="button" class="cancel"
                        onClick={()=>props.closePanel()}
                      >
                        Cancel
                      </button>
                      <button type="button" class="saveNnewBtn"
                          disabled={contactGenData?.phone?.full_number || !smsDataErr.errNumber? "" : "disabled"}
                          onClick={submitMessage}
                      ><span>Send</span><img src={arrowRightWhite} alt=""/></button>
                      

                  </div>
     </>
  );
};

export default Sms;
