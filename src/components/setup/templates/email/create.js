import React, { useEffect, useRef, useState } from "react";

import Loader from "../../../shared/Loader";
import cross from "../../../../assets/images/cross.svg";
import email_template from "../../../../assets/images/email_template.svg";
import Scrollbars from "react-custom-scrollbars-2";
import browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import EditorComponent from "./editor/Editor";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import { utils } from "../../../../helpers";

import {useDispatch} from "react-redux";
import {EmailServices} from "../../../../services/setup/EmailServices";
import * as actionTypes from "../../../../actions/types";

const CreateTemplate = (props) => {
    const dispatch = useDispatch();
    const newEmailTemplateSubject = useRef(null)

    const [isLoader, setIsLoader] = useState(false);
    const [keywordSuggesion, setKeywordSuggesion] = useState(false);
    const [smsTags, setSmsTags] = useState([]);
    const [searchTagString, setSearchTagString] = useState("");
    const [emailData, setEmailData] = useState({
        "title": "",
        "subject": "",
        "template": ""
    });
    const [validateMsg, setValidateMsg] = useState({    
        "title": "",
        "subject": "",
        "template": "" 
    });
    const [dataChange, setDataChange] = useState(false);

    const createNewTemplate= async (payload) =>{  
        try {
          setIsLoader(true);
            let result = await EmailServices.emailTemplateCreate(payload);  
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: "Email template created successfully",
              typeMessage: 'success'
            });   
        } catch (e) {
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: e.message,
            typeMessage: 'error'
          });
        } finally {
          setIsLoader(false);
        }
    };
    const addKeywordEmail = (e) => {
        e.preventDefault()
        let subjectInput = newEmailTemplateSubject.current;
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
                  "[" +
                  e.target.textContent +
                  "]";
    
                subjectInput.focus();
                subjectInput.setSelectionRange(
                  startToText.length + 1,
                  startToText.length + 1
                );
    
                // console.log(subjectInput, cursorStart, cursorEnd, textValue);
            }
            else {
              subjectInput.value = subjectInput.value + " [" + e.target.textContent + "] ";
    
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
        } catch(err) {
         console.log();
        }
    }

    const createdEmailTemplate =(template) =>{
        setEmailData({
          ...emailData,
          template: template 
        })
      }
    // Save new email template
/*    const saveEmailTemplate = (e) => {
        e.preventDefault();

        if(newMail.title !== "" && newMail.subject !== "" && newMail.message !== "") {
            try {
                setIsLoader(true)
                const payload ={
                    "title": newMail.title,
                    "subject": newMail.subject,
                    "template":  Buffer.from(newMail.message).toString('base64')
                };
                emailCreateTemplate(payload);
                let copyTemplates = emailTempData.templates;
                copyTemplates = [...copyTemplates, newMail];
                setEmailTempData(copyTemplates)
                setTimeout(() => {
                    setSuccessMsg("")
                }, 5000);
                console.log(e.target.getAttribute("id"), "newMail", newMail);

            } catch (error) {
                console.log(error);
            } finally {
                if(e.target.getAttribute("id") === "saveNewEmailTemplate") {
                    setEmailModal(false)
                }else {
                    createModalRef.current.reset()
                }

                setNewMail({
                    title: "",
                    subject: "",
                    message: ""
                })
                setHasError(false) 
                setErrorState({
                    title: "",
                    subject: "",
                    message: ""
                });
                fetchTemplateList();
                setIsLoader(false)
            }
        }
        else {
            // console.log("newMail", newMail);
            setHasError(true)

            setErrorState({
                ...errorState,
                title: newMail.title.trim() === "" && "Please enter some Title!",
                subject: newMail.subject.trim() === "" && "Please add some Header!",
                message: newMail.message.trim() === "" && "Please Email content!"
            })
        }
    }*/
    // Save new email template
    useEffect(() => {
        setSmsTags(props.mergeFields);
    }, [props.mergeFields])

    const emailSendHandler = (e) => {
          const name = e.target.name;
          const value = e.target.value;
          
          setEmailData({...emailData, 
            [name]:  value,
            });
          if (name === "subject" && value.length === 0) {
            setValidateMsg({ ...validateMsg, subject: "Please enter a valid subject" });           
          } else if (name === "title" && value.length === 0) {
            setValidateMsg({ ...validateMsg, title: "Please enter a valid Title" });
          } else {
            setValidateMsg({
              "title": "",
              "subject": "",
              "template": ""
            });
           }
    }

    const saveEmailTemplate = (e) =>{
        e.preventDefault();
        let payload = {
            "title": emailData.title,
            "subject": emailData.subject,
            "template": utils.encodeHTML(emailData.template)
        }
        if(emailData.title === "" && emailData.subject === "" &&  utils.encodeHTML(emailData.template) === ""){
            setValidateMsg({ ...validateMsg, 
                subject: "Please enter a subject", 
                title: "Please enter a title" ,
                template : "Please enter a template" 
              });
        }else if(emailData.title === ""){
            setValidateMsg({ ...validateMsg, 
                title: "Please enter a title" ,
              });
        }else if(emailData.subject === ""){
            setValidateMsg({ ...validateMsg, 
                subject: "Please enter a subject" ,
              });
        }else if(emailData.template === ""){
            setValidateMsg({ ...validateMsg, 
                template: "Please enter a template" ,
              });
        }else{
             createNewTemplate(payload);
            props.closeModal(false);
            props.updateList(true);
        }
        
    }
    

    const saveToNewEmailTemplate = async (e) =>{
        e.preventDefault();
        let payload = {
            "title": emailData.title,
            "subject": emailData.subject,
            "template": utils.encodeHTML(emailData.template)
        }
        await createNewTemplate(payload);
        //props.updateList(true);
        setValidateMsg({
            ...validateMsg,
            "title": "",
            "subject": "",
            "template": ""
          });
        setEmailData({
            ...emailData,
            "title": "",
            "subject": "",
            "template": ""
          });

        props.closeModal(false);
        props.openModal(true)  
    }











    return (
        <div className="modalAddEmail modalBackdrop">
            {isLoader ? <Loader /> : ""}
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal(false)}>
                        <img src={cross} alt="" />
                    </button>
                    <div className="circleForIcon">
                        <img src={email_template} alt="" />
                    </div>
                    <h3>Add an Email Template</h3>
                    <p>Fill out below details to create a new Email Template</p>
                </div>
                <div className="modalForm">
                    <Scrollbars
                        renderThumbVertical={(props) => (
                            <div className="thumb-vertical" />
                        )}
                    >
                        <form method="post">
                            <div className="cmnFormRow">
                                <label className="cmnFieldName d-flex f-justify-between">
                                    Title
                                </label>
                                <div className={validateMsg.title ? "cmnFormField error" : "cmnFormField"}>
                                    <input
                                        className="cmnFieldStyle"
                                        placeholder="Title..."
                                        id="newEmailTemplateTitle"
                                        onChange={emailSendHandler}
                                        name="title"
                                        value={emailData.title}
                                    />
                                </div>
                                <div className="errorMsg">{validateMsg.title}</div>
                            </div>
                            <div className="cmnFormRow" >
                                <label className="cmnFieldName d-flex f-justify-between">
                                    Subject
                                </label>
                                <div className={validateMsg.subject ? "cmnFormField error" : "cmnFormField"}>
                                    <input
                                        className="cmnFieldStyle btnPadding"
                                        placeholder="Header..."
                                        id="newEmailTemplateSubject"
                                        onChange={emailSendHandler}
                                        ref={newEmailTemplateSubject}  
                                        name="subject"
                                        value={emailData.subject}
                                    />
                                    <button
                                        className="btn browseKeywords"
                                        style={{
                                            marginRight: "0",
                                            padding: "0",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setKeywordSuggesion(true);
                                        }}
                                    >
                                        <img src={browse_keywords} alt="keywords" />
                                    </button>
                                    {keywordSuggesion ? 
                                     //keyWordList() 
                                        <div className="keywordBox">
                                            <div className="searchKeyword">
                                                <div className="searchKeyBox">
                                                    <input
                                                        type="text"
                                                        onChange={(e) => setSearchTagString(e.target.value)}
                                                    />
                                                </div>
                                                <div className="cancelKeySearch">
                                                    <button
                                                        onClick={() => setKeywordSuggesion(false)}
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
                                                        )
                                                        .map((tagItem, i) => (
                                                            <li key={"keyField" + i}>
                                                                <button
                                                                    onClick={(e) =>
                                                                        addKeywordEmail(e, tagItem.id)
                                                                    }
                                                                >
                                                                    {tagItem.id}
                                                                </button>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>
                                    : ""}
                                </div>
                                <div className="errorMsg">{validateMsg.subject}</div>
                            </div>
                            <div className="cmnFormRow">
                                <label className="cmnFieldName d-flex f-justify-between">
                                    Message
                                </label>
                                <div className={validateMsg.template ? "cmnFormField createNewEmailField error" : "cmnFormField createNewEmailField"}>
                                    <EditorComponent
                                        createNew={true}
                                        createdEmailTemplate = {(createValue)=>createdEmailTemplate(createValue)}
                                        initialData= {""}
                                    />
                                </div>
                                <div className="errorMsg">{validateMsg.template}</div>
                            </div>

                            <div className="modalbtnHolder w-100">
                                <button
                                    className=" saveNnewBtn"
                                    id="saveNewEmailTemplate"
                                    onClick={(e) => saveEmailTemplate(e)}
                                >
                                    Save <img src={arrow_forward} alt="" />
                                </button>
                                <button
                                    className=" saveNnewBtn"
                                    onClick={(e) => saveToNewEmailTemplate(e)}
                                    id="saveandCloseEmailTemplate"
                                >
                                    Save &amp; New <img src={arrow_forward} alt="" />
                                </button>
                            </div>
                        </form>
                    </Scrollbars>
                </div>
            </div>
        </div>
    )
}

export default CreateTemplate;