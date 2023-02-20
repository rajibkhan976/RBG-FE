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
import EditorComponent from "../../../../setup/templates/email/editor/Editor";
import Player from "../../../Player";
import "../../../../../assets/css/communicationLog.css";
import {utils} from "../../../../../helpers";
import moment from "moment";
import {useDispatch} from "react-redux";
import {SMSServices} from "../../../../../services/template/SMSServices";
import {EmailServices} from "../../../../../services/setup/EmailServices";
import * as actionTypes from "../../../../../actions/types";
import MergeTag from "../../../MergeTag";


const Email = (props) => {
  const dispatch = useDispatch();
  const newEmailTemplateSubject = useRef(null)
 

  const [contactID, setContactID] = useState("");
  
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  
  const [isLoader, setIsLoader] = useState(false)
  const [emailTempData, setEmailTempData] = useState("");
  const [templateToogle, setTemplateToogle] = useState(false);
  const [emailDatasubject, setEmailDatasubject] = useState("");
  const [searchTagString, setSearchTagString] = useState("");
  const [changedTemplate, setChangedTemplate] = useState("");
  const [tempSelected, setTempSelected] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [emailBody, setEmailBody] = useState("");
  const [contactGenData, setContactgendata] = useState(props.contactGenData);
  const [errorForTemplate, setErrorForTemplate] = useState(false);

  

  const [emailData, setEmailData] = useState({
    "_id": "",
    "email": "",
    "subject": "",
    "template": ""
  });
  const [validateEmailMsg, setValidateEmailMsg] = useState({
      "subject": "",
      "template": "",
      "errEmail": ""
  });
  const [emailTags, setEmailTags] = useState([]);

  const fetchEmailTags = async () => {
    try {
        const result = await SMSServices.fetchSMSTags()
        if (result) {
            // console.log("result", result);
            setEmailTags(result)
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: error.message,
            typeMessage: 'error'
        });
    }
}
const fetchTemplateList = async () => {
  const pageId = "all";
  //const queryParams = await getQueryParams();
  try {
      setIsLoader(true);
      const result = await EmailServices.fetchEmailTemplateList(pageId);
      if (result) {
          setEmailTempData(result);
      }
  } catch (e) {
      setIsLoader(false);
      console.log("Error in template listing", e);
  } finally {
      setIsLoader(false);
  }
};

const emailGlobalSend = async (payload) => {
    return new Promise(async (resolve,reject)=>{
        try {
            setIsLoader(true);
            let result = await EmailServices.emailGlobalSend(payload);
            //setSuccessMsg(result.message);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: result.message,
                typeMessage: 'success'
            });
            resolve(true)
        } catch (e) {
            //setErrorMsg(e.message);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message + ". Please check your email configuration.",
                typeMessage: 'error'
            });
            // setBackError(true);
            if(e.message !== ""){
                resolve(false)
                }else{
                resolve(true)
            }
        } finally {
            setIsLoader(false);
            props.closePanel(false)
        }
    })
};

useEffect(() => {
  fetchTemplateList();
  fetchEmailTags()

}, []);


  const emailSendHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEmailData({
        ...emailData,
        [name]: value,
    });
    if (name === "subject" && value.length === 0) {
        setValidateEmailMsg({...validateEmailMsg, subject: "Please enter a valid subject"});
    } else if (name === "template" && value.length === 0) {
        setValidateEmailMsg({...validateEmailMsg, template: "Please enter a valid Template"});

    } else {
        setValidateEmailMsg({
            "subject": "",
            "template": "",
            "errEmail": ""
        });
    }
}
const addKeywordEmail = (e,field) => {
  e.preventDefault()
  let subjectInput = newEmailTemplateSubject.current;
  let cursorStart = subjectInput.selectionStart;
  let cursorEnd = subjectInput.selectionEnd;
  let textValue = subjectInput.value;
  let vall = field ;

  try {
      if (cursorStart || cursorStart == "0"
      ) {
          var startToText = "";
          if(emailData.subject.length < 250){
                    subjectInput.value =
                    subjectInput.value.substring(0, cursorStart) +
                    vall +
                    subjectInput.value.substring(cursorEnd, textValue.length);

                // setNewMail({
                //   ...newMail,
                //   subject: subjectInput.value
                // })
                setEmailData({
                    ...emailData,
                    subject: subjectInput.value
                })
                startToText =
                    subjectInput.value.substring(0, cursorStart) +
                    vall;

                subjectInput.focus();
                subjectInput.setSelectionRange(
                    startToText.length + 1,
                    startToText.length + 1
                );
            }
            setValidateEmailMsg({
                ...validateEmailMsg,
                subject: "",
            });

          // console.log(subjectInput, cursorStart, cursorEnd, textValue);
      } else {
          subjectInput.value = subjectInput.value + vall;

          // setNewMail({
          //   ...newMail,
          //   subject: subjectInput.value
          // })
          setEmailData({
              ...emailData,
              subject: subjectInput.value
          })
          setValidateEmailMsg({
            ...validateEmailMsg,
            subject: "",
          });
          subjectInput.focus();
      }
  } catch (err) {
      console.log();
  }
}
  const sendingEmailTemplateDetails = (e, elem) => {
     console.log("eleme", elem);
     setEmailData({
         ...emailData,
         "subject": elem.subject,
         "template": elem.template,
     });
     // createdEmailTemplate(elem.template)
     setEmailBody(Buffer.from(elem.template, 'base64').toString());
     // Buffer.from(elem.template, 'base64').toString()
     // console.log("emailbody",emailBody);
        setEmailDatasubject(elem.title);
        setTemplateToogle(false);   
        setTempSelected(true);
        console.log(tempSelected);
        setValidateEmailMsg({
            ...validateEmailMsg,
            subject: "",
          });
}
useEffect(() => {
  // console.log("template",utils.decodeHTML(emailData.template));
  setChangedTemplate(utils.decodeHTML(emailData.template));
}, [emailData.template])

const sendGlobalEmail = async (e) => {
  console.log("Edited email body: ", emailData.template);
  e.preventDefault();
  const subject = emailData.subject;
  // console.log("Changed", changedTemplate);
  let template = changedTemplate;
  //console.log("Global Template",subject);

  let payload = {
      "email": contactGenData?.email,
      "subject": emailData?.subject,
      "template": utils.encodeHTML(template)
      //"template": emailData.template
  };
  console.log(payload);
  if (emailData.subject === "" && utils.encodeHTML(template) === "") {

    setValidateEmailMsg({
          ...validateEmailMsg,
          subject: "Please enter a valid subject",
          template: "Please enter a valid template"
      });
  }else if (emailData.subject === "") {
      setValidateEmailMsg({
          ...validateEmailMsg,
          subject: "Please enter a valid subject",
      });
  } else if (payload.template === "") {
      setValidateEmailMsg({
          ...validateEmailMsg,
          template: "Please enter a valid template",
      });
      
    }else if( contactGenData?.email === ""){
        setValidateEmailMsg({
            ...validateEmailMsg, 
            errEmail: "Please save a email address first",
        });
  } else {
      
    let result = await emailGlobalSend(payload);
      setEmailData({
          "_id": "",
          "email": "", 
          "subject": "",
          "template": ""
      });
      setValidateEmailMsg({
          ...validateEmailMsg,
          subject: "",
          email: "",
          template: ""
      });
      setTempSelected(false);
      setEmailDatasubject("");
      //setEmailSend(true);
      console.log("resultttttttttttttttttttt", result);

      if(result === true){ 
        props.emailplaceholdingData(payload)
      }
  } 
  
}

// function useOutsideAlerter(ref) {
//     useEffect(() => {
//       /**
//        * Alert if clicked on outside of element
//        */
//       function handleClickOutside(event) {
//         if (ref.current && !ref.current.contains(event.target)) {
//           setKeywordSuggesion(false)
//         }
//       }
//       // Bind the event listener
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         // Unbind the event listener on clean up
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [ref]);
//   }
  
  
 // const keywordRef = useRef(null);
    
  //useOutsideAlerter(keywordRef);

  const deselectingTemplate = (e) =>{
    setEmailData({
        ...emailData,
        "subject": "",
        "template": "",
    });
    setTempSelected(false); 
    setEmailDatasubject("");  
    setTemplateToogle(false);
    setChangedTemplate("");
    setErrorForTemplate(false);
}
useEffect(()=>{
    setErrorForTemplate(true);
},[changedTemplate]);
useEffect(() => {

    if(changedTemplate == "" && errorForTemplate){
        setValidateEmailMsg({
            ...validateEmailMsg,
            template: "Please enter a valid template",
        });
    }else{
        setValidateEmailMsg({
            ...validateEmailMsg,
            template: "",
        });
    }
}, [changedTemplate])



  return (
   
              <>
                {isLoader ? <Loader/> : ""}
                <div className="formBody">
                  <div className="formSlice top">
                    <div className="label">Email template</div>
                            <div className="textAreaHolder fitin">

                                <div className="cmnFieldStyle btnSelect"
                                     onClick={(e) => setTemplateToogle(!templateToogle)}>
                                    <span>{emailDatasubject ? emailDatasubject : "Select Template"}</span>
                                </div>
                                {templateToogle &&
                                    <ul className="showTemplateName">
                                         {emailTempData.templates &&
                                            emailTempData.templates.length > 0 && 
                                            <li 
                                                 onClick={(e) => deselectingTemplate()}
                                            >
                                              Select template
                                             </li> 
                                        }
                                        {
                                            (emailTempData.templates &&
                                            emailTempData.templates.length > 0 ) ?
                                            emailTempData.templates.map((elem, i) => (
                                                    <li key={i}
                                                        onClick={(e) => sendingEmailTemplateDetails(e, elem)}>{elem.title}</li>
                                                )
                                            ) :
                                            <li className="listCentered">No Email template Found</li>

                                        }
                                    </ul>}
                            </div>
                  </div>
                  <div className="formSlice"> 
                    <div className="label">Subject</div>
                    <div className="textAreaHolder fitin">
                      <input type="text" className={validateEmailMsg.subject ? "cmnFieldStyle fitIn error" : "cmnFieldStyle fitIn"} placeholder="Enter email subject"
                         onChange={emailSendHandler}
                         name="subject"
                         id="newEmailTemplateSubject"
                         ref={newEmailTemplateSubject}
                         value={emailData.subject}
                         maxLength={250}
                      />
                     <div className="errorMsg">{validateEmailMsg.subject}</div>
                    </div>
                    <div className="label">&nbsp;</div>
                    <div className="textAreaHolder fitin">
                        <MergeTag addfeild={(e,field)=> addKeywordEmail(e,field)}/>
                    </div>
                    

                  </div>
                  <div className="formSlice top">
                    <div className="label">Email Body</div>
                    <div
                            className={validateEmailMsg.template  ? "cmnFormField email globalSms error" : "cmnFormField globalSms email"}>
                                <EditorComponent
                                    globalTemplateValue={(template) => setChangedTemplate(template)}
                                    initialData={emailData ? emailData : emailData.template}
                                    setTempSelected={tempSelected}
                                    //setEmailSend={emailSend}
                                />
                                {/* {console.log("emailData", emailData, tempSelected ,"emailData.template",emailData.template, "emailSend", emailSend)} */}

                                <div className="errorMsg">{validateEmailMsg.template}</div>

                            </div>
                  </div>
                  
                </div>
                <div className="formSlice fixinRight">
                      <button type="button" class="cancel"
                        onClick={()=>props.closePanel()}
                      >
                        Cancel 
                      </button>
                      <button type="button" class="saveNnewBtn"  
                      disabled={ contactGenData?.email === "" ? "disabled" :""}
                      onClick={sendGlobalEmail}>
                        <span>Send</span><img src={arrowRightWhite} alt=""/>
                      </button>
                      { contactGenData?.email === "" ? <div className="errorMsg space">Sending EMAIL is disabled now, to enable it save a email first</div> :""}
                      {/* <div className="errorMsg space">{validateEmailMsg.errEmail}</div> */}
                  </div>
              </>
           
  );
};

export default Email;
