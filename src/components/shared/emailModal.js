import React, {useEffect, useRef, useState} from "react";
import lineUser from "../../assets/images/lineUser.svg";
import whiteCross from "../../assets/images/cross_white.svg";
import icon_browse_keywords from "../../assets/images/icon_browse_keywords.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import cross from "../../assets/images/cross.svg";
import updown from "../../assets/images/updown.png";
import {utils} from "../../helpers";
import {SMSServices} from "../../services/template/SMSServices";
import {DependentServices} from "../../services/contact/DependentServices";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../actions/types";
import Loader from "./Loader";
import EditorComponent from "../setup/templates/email/editor/Editor";
import {EmailServices} from "../../services/setup/EmailServices";
import { useSelector } from "react-redux";
import { EmailTemplateAction } from "../../actions/EmailTemplateAction";
import { EmailSubjectAction } from "../../actions/EmailSubjectAction";
import MergeTag from "./MergeTag";

const initialDependentState = {
    name: "", 
    contactId: "",
};


const EmailModal = (props) => {
    const dispatch = useDispatch();

    const contactSelect = useRef(null)
    const newEmailTemplateSubject = useRef(null)
    const keywordRef = useRef(null);

    const [isLoader, setIsLoader] = useState(false)
    const [imgLoader, setImgLoader] = useState(false)
    const [keywordSuggesion, setKeywordSuggesion] = useState(false);
    const [warningMsg, setWarningMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [emailTempData, setEmailTempData] = useState("");
    const [emailTempTitle, setEmailTempTitle] = useState("");
    const [contactOptions, setContactOptions] = useState(false);

    const [emailData, setEmailData] = useState({
        "_id": "",
        "email": "",
        "subject": "",
        "template": ""
    });
    const [validateMsg, setValidateMsg] = useState({
        "email": "",
        "subject": "",
        "template": ""
    });
    const [emailTags, setEmailTags] = useState([]);
    const [searchTagString, setSearchTagString] = useState("");
    const [toggleContactList, setToggleContactList] = useState({
        status: false,
        contacts: [],
        isCross: false,
    });
    const [processing, setProcessing] = useState(false);
    const [dependant, setDependant] = useState({
        ...initialDependentState,
    });
    const [isDisabled, setIsDisabled] = useState(false);
    const [emailBody, setEmailBody] = useState("");
    const [templateToogle, setTemplateToogle] = useState(false);
    const [emailDatasubject, setEmailDatasubject] = useState("");
    const [tempSelected, setTempSelected] = useState(false);


    const [emailSend, setEmailSend] = useState(false);
    const [changedTemplate, setChangedTemplate] = useState("");
    const [emailSetupData, setEmailSetupData] = useState(false);
    const [errorForTemplate, setErrorForTemplate] = useState(false);
    const [errorForTemplateSelected, setErrorForTemplateSelected] = useState(false);
    

    const emailGlobalSend = async (payload) => {
        try {
            setIsLoader(true);
            let result = await EmailServices.emailGlobalSend(payload);
            //setSuccessMsg(result.message);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: result.message,
                typeMessage: 'success'
            });
        } catch (e) {
            //setErrorMsg(e.message);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message + ". Please check your email configuration.",
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
            props.emailModalOff()

        }
    };
    const getQueryParams = async () => {
        return new URLSearchParams();
    };
    const emailTemplateList = useSelector((state)=> state.emailTemplate?.data);
    useEffect(()=>{
        if(emailTemplateList){   
            console.log("Email template list", emailTemplateList);
            setEmailTempData(emailTemplateList);
        }

    },[emailTemplateList]);
    useEffect(()=>{
        dispatch(EmailSubjectAction());
    },[dispatch]);
    
    // const fetchTemplateList = async () => {
    //     const pageId = "all";
    //     const queryParams = await getQueryParams();
    //     try {
    //         setIsLoader(true);
    //         const result = await EmailServices.fetchEmailTemplateList(pageId, queryParams);
    //         if (result) {
    //             setEmailTempData(result);
    //         }
    //     } catch (e) {
    //         setIsLoader(false);
    //         console.log("Error in template listing", e);
    //         setErrorMsg(e.message);
    //     } finally {
    //         setIsLoader(false);
    //     }
    // };

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
    const fetchEmail = async () => {
        try {
            await EmailServices.fetchSetupEmail();
            setEmailSetupData(true);
        } catch (e) {
            setEmailSetupData(false);
        }
    };
    useEffect(() => {
        // fetchTemplateList();
        // fetchEmailTags();
        fetchEmail();
    }, []);


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
                    vall ;

                subjectInput.focus();
                subjectInput.setSelectionRange(
                    startToText.length + 1,
                    startToText.length + 1
                );
            }
          

             // console.log(subjectInput, cursorStart, cursorEnd, textValue);
            } else {
                subjectInput.value = subjectInput.value + vall ;

                // setNewMail({
                //   ...newMail,
                //   subject: subjectInput.value
                // })
                setEmailData({
                    ...emailData,
                    subject: subjectInput.value
                })
                subjectInput.focus();
            }
        } catch (err) {
            console.log();
        }
    }
    // add keyword for new email template subject
    const emailSendHandler = (e) => {
        //const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const name = e.target.name;
        const value = e.target.value;

        setEmailData({
            ...emailData,
            [name]: value,
        });
        if (name === "subject" && value.length === 0) {
            setValidateMsg({...validateMsg, subject: "Please enter a valid subject"});
        } else if (name === "template" && value.length === 0) {
            setValidateMsg({...validateMsg, template: "Please enter a valid Template"});

        } else if (name === "email" && !emailRegex.test(value)) {
            setValidateMsg({...validateMsg, email: "Please enter a valid Email"});
        } else {
            setValidateMsg({
                "email": "",
                "subject": "",
                "template": ""
            });
        }
    }
    const createdEmailTemplate = (template) => {
        setEmailData({
            ...emailData,
            // template: emailBody !== "" ? emailBody : (template !== "" && template )
            template: template !== "" && template
        })
        // console.log("emailBody", emailBody);
    }
// const selectEmailTemplate = (e, elem) =>{
//   setEmailTempTitle(e.target.value);
//  console.log(e);
// }

    const sendingTemplateDetails = (e, elem) => {
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
    }

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
    
    const sendGlobalEmail = (e) => {
        console.log("Edited email body: ", emailData.template);
        e.preventDefault();
        const subject = emailData.subject;
        // console.log("Changed", changedTemplate);
        let template = changedTemplate;

        let payload = {
            "email": emailData.email,
            "subject": emailData.subject,
            "template": utils.encodeHTML(template)
            //"template": emailData.template
        };
        console.log(payload);
        if (emailData.email === "" && emailData.subject === "" && utils.encodeHTML(template) === "") {

            setValidateMsg({
                ...validateMsg,
                subject: "Please enter a valid subject",
                email: "Please enter a valid Email",
                template: "Please enter a valid template"
            });
        } else if (emailData.email === "") {
            setValidateMsg({
                ...validateMsg,
                email: "Please enter a valid email",
            });
        } else if (emailData.subject === "") {
            setValidateMsg({
                ...validateMsg,
                subject: "Please enter a valid subject",
            });
        } else if (payload.template === "") {
            setValidateMsg({
                ...validateMsg,
                template: "Please enter a valid template",
            });
        } else {
            emailGlobalSend(payload);
            setEmailData({
                "_id": "",
                "email": "",
                "subject": "",
                "template": ""
            });
            setValidateMsg({
                ...validateMsg,
                subject: "",
                email: "",
                template: ""
            });
            setTempSelected(false);
            setEmailDatasubject("");
            setEmailSend(true);

        }
        //console.log(payload)

        // setTimeout(() => {
        // }, 2000);

    }

    const handleContactName = async (e) => {
        e.preventDefault();

        //Set dependant name
        setDependant({...dependant, name: e.target.value});

        //Name character limit
        if (e.target.value.length >= 30) {
            //Length 30 char limit
            console.log("char checking");
            setIsDisabled(true);
        }
        //Name special character checking
        let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (isSpecialCharacterformat.test(e.target.value)) {
            console.log("Special checkig");

            setIsDisabled(true);
        }
        if (
            e.target.value.length >= 3 &&
            e.target.value.length <= 30 &&
            !isSpecialCharacterformat.test(e.target.value)
        ) {
            try {
                setProcessing(true);
                let operationMethod = "searchContacts";
                let payload = {
                    guardianId: 0,
                    keyword: e.target.value,
                };
                await DependentServices[operationMethod](payload).then((result) => {
                    setToggleContactList({
                        ...toggleContactList,
                        contacts: result.contacts,
                        status: true,
                    });
                    // if (result && result.contacts.length) {
                    // }
                });
            } catch (e) {
                console.log("Error in contact search: ", e);
            } finally {
                setProcessing(false);
                setIsDisabled(false);
            }
        }

        if (e.target.value.trim() == "") {
            setToggleContactList({
                status: false,
                contacts: [],
                isCross: false,
            });
        }
    }

    const resetContactName = (e) => {
        e.preventDefault();

        setDependant({name: "", contactId: ""});

        setToggleContactList({
            ...toggleContactList,
            status: false,
            contacts: [],
            isCross: false,
        });

    };
    const handleContactSelect = (e, contact) => {
        console.log(contact.email);


        setDependant({
            name: contact.firstName + " " + (contact.lastName ? contact.lastName : ""),
            contactId: contact._id,
        });

        setToggleContactList({
            ...toggleContactList,
            status: false,
            contacts: [],
            isCross: true,
        });

        setContactOptions(false)
        setEmailData({
            ...emailData,
            "email": contact.email
        })
        setValidateMsg({
            ...validateMsg,
            email: "",
        });
        // setErrorObj({
        //   ...errorObj,
        //   to: ""
        // })

    };

    useEffect(() => {
        // console.log("template",utils.decodeHTML(emailData.template));
        setChangedTemplate(utils.decodeHTML(emailData.template));
    }, [emailData.template])


// const editorRef = useRef(null);
//   const [dirty, setDirty] = useState(false);
//   useEffect(() => setDirty(false), [emailData.template]);
//   const save = () => {

//   };

let zIndexEmail = useSelector((state) => state.modal.zIndexEmail);
 // console.log("Initial State in header",zIndexEmail);
  //console.log("sssssssssssssssssssssssssssss",emailSetupData.user);



//   function useOutsideAlerter(ref) {
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
  
    
 // useOutsideAlerter(keywordRef);

//   useEffect(() => {
//     if(changedTemplate !== ""){
//         setErrorForTemplate(true);
//     }
//   }, [changedTemplate !==""]);

//   useEffect(() => {
//     if(tempSelected){
//         setErrorForTemplateSelected(true);
//     }
//   }, [tempSelected]);

//   console.log("errorForTemplate", errorForTemplate,"changedTemplate", changedTemplate, "tempSelected" , tempSelected)
useEffect(()=>{
    setErrorForTemplate(true);
},[changedTemplate]);
useEffect(() => {

    if(changedTemplate == "" && errorForTemplate){
        setValidateMsg({
            ...validateMsg,
            template: "Please enter a valid template",
        });
    }else{
        setValidateMsg({
            ...validateMsg,
            template: "",
        });
    }
}, [changedTemplate])
  


    return (
        <div className="sideMenuOuter" style={{zIndex: zIndexEmail}}>
            <div className="dialogBg" onClick={props.emailModalOff}></div>
            {isLoader ? <Loader/> : ""}
            {/* {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
      {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}
      {warningMsg && <WarningAlert message={warningMsg} />} */}

            <div className="sideMenuInner smsGlobal">
                <div className="modal_call_header">
                    <button className="btn btn_empty" onClick={props.emailModalOff}>
                        <img src={whiteCross} alt=""/>
                    </button>
                    <h3>Send Email</h3>
                    <p>Enter email id</p>
                    {/* <div className="showSetupMsg">{!emailSetupData ? "You can't send mail as the email setup is not done" :""}</div> */}
                    <div className={validateMsg.email ? "numberForCall error" : "numberForCall"}>
                        <input type="email"
                               placeholder="Eg. richardnile@rbg.com" className="emailInput"
                               onChange={emailSendHandler}
                               name="email"
                               value={emailData.email}
                        />
                    </div>
                    <div className="errorMsg specific_position">{validateMsg.email}</div>

                </div>
                <div className="modalMakeSmsBody">
                    <p className="numberFromContact text-right">
                        <button
                            className="btn linkType"
                            onClick={(e) => setContactOptions(!contactOptions)}
                        >
                            <img src={lineUser}
                                 alt=""/> {contactOptions ? "Close Contact Search" : "Choose from Contacts"}
                        </button>
                    </p>
                    {contactOptions && (
                        <div className="getContactsforMsg" ref={contactSelect}>
                            <div
                                className={
                                    toggleContactList.status
                                        ? `cmnFormField listActive`
                                        : `cmnFormField`
                                }
                            >
                                <input
                                    className={processing ? "cmnFieldStyle loading" : "cmnFieldStyle"}
                                    type="text"
                                    style={{
                                        backgroundImage: toggleContactList.status
                                            ? `url(${updown})`
                                            : "",
                                    }}
                                    placeholder="Eg. Name"
                                    onChange={(e) => handleContactName(e)}
                                    value={dependant.name ? dependant.name : ""}
                                    disabled={toggleContactList.isCross}
                                />
                                {toggleContactList.isCross ? (
                                    <button
                                        className="btn crossContact"
                                        onClick={(e) => resetContactName(e)}
                                    >
                                        <img src={cross} alt="cross"/>
                                    </button>
                                ) : (
                                    ""
                                )}
                                {toggleContactList.status && (
                                    <>
                                        {/* .filter(contactItem => contactItem.phone && contactItem.phone.number.trim() != "") */}
                                        {toggleContactList.contacts.filter(contactItem => contactItem.email && contactItem.email.trim() != "").length > 0 ? (
                                            <div className="contactListItems">
                                                <ul>
                                                    {toggleContactList.contacts.filter(contactItem => contactItem.email && contactItem.email.trim() != "").map((contact) => (
                                                        <li
                                                            key={contact._id}
                                                            data-id={contact._id}
                                                            onClick={(e) => {
                                                                handleContactSelect(e, contact);
                                                            }}
                                                            className="appContact"
                                                        >
                                                            <figure
                                                                style={{
                                                                    backgroundColor: `rgb(${Math.floor(
                                                                        Math.random() * 256
                                                                    )},${Math.floor(
                                                                        Math.random() * 256
                                                                    )},${Math.floor(Math.random() * 256)})`,
                                                                }}
                                                            >
                                                                {contact.firstName ? contact.firstName[0] : ""}
                                                                {contact.lastName ? contact.lastName[0] : ""}
                                                            </figure>
                                                            <p>
                               <span>
                                 {(contact.firstName ? contact.firstName : "") +
                                     " " +
                                     (contact.lastName ? contact.lastName : "")}
                               </span>
                                                                {contact.email ? (
                                                                    <small>{contact.email}</small>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="noContactFound">No Contact Found</div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="makeSmsForm">
                        <div className="slice">
                            <label>Email template</label>
                            <div className="cmnFormField">

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
                                                        onClick={(e) => sendingTemplateDetails(e, elem)}>{elem.title}</li>
                                                )
                                            ) :
                                            <li className="listCentered">No Email template Found</li>
                                        }
                                    </ul>}
                            </div>
                        </div>
                        <div className="slice">
                            <label className="bold">Subject</label>
                            <div
                                className={validateMsg.subject ? "cmnFormField globalSms email error" : "cmnFormField globalSms"}>
                                <input type="text" className="email cmnFieldStyle"
                                       onChange={emailSendHandler}
                                       name="subject"
                                       id="newEmailTemplateSubject"
                                       ref={newEmailTemplateSubject}
                                       value={emailData.subject}
                                       maxLength={250}
                                />
    
                            </div>
                            <div className="errorMsg">{validateMsg.subject}</div>
                            <div>
                                <MergeTag addfeild={(e,field)=> addKeywordEmail(e,field)}/>
                            </div>
                        </div>
                        <div className="slice">
                            <label className="bold">Email Body</label>
                            <div
                                className={validateMsg.template  ? "cmnFormField globalSms error" : "cmnFormField globalSms"}>
                                <EditorComponent
                                    globalTemplateValue={(template) => setChangedTemplate(template)}
                                    initialData={emailData ? emailData : emailData.template}
                                    setTempSelected={true}
                                    setEmailSend={emailSend}
                                />
                              <div className="errorMsg">{validateMsg.template}</div>
                                {/* <div className="errorMsg">{(errorForTemplate && changedTemplate === "" ) ? "Please enter a template here" :
                                         (errorForTemplate && changedTemplate === "" && errorForTemplateSelected && !tempSelected) ? "":
                                           validateMsg.template ? validateMsg.template : 
                                           ""}</div> */}
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div class="call_modal_footer">
                    <button type="button" class="cancel"
                        onClick={props.emailModalOff}
                      >
                        Cancel 
                      </button>
                    <button class="cmnBtn" onClick={sendGlobalEmail}>Send Email <img src={arrow_forward} alt=""/></button>
                </div>
            </div>
        </div>
    );
};


export default EmailModal;