import React, { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { EmailServices } from "../../../services/setup/EmailServices";
import { SMSServices } from "../../../services/template/SMSServices";
import Loader from "../../shared/Loader";
import EditorComponent from "../../setup/templates/email/editor/Editor";
import icon_browse_keywords from "../../../assets/images/icon_browse_keywords.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import { ContactService } from "../../../services/contact/ContactServices";
import { utils } from "../../../helpers";
import MergeTag from "../../shared/MergeTag";



const BulkEmail = (props) => {
    const dispatch = useDispatch();
    const tagRef = useRef(null);
    const newEmailTemplateSubject = useRef(null)
    const [emailTempData, setEmailTempData] = useState("");
    const [emailTemplateToggle, setEmailemailTemplateToggle] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [searchTagString, setSearchTagString] = useState("");
    const [emailTags, setEmailTags] = useState([]);
    const [templateToggle, setTemplateToogle] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [emailDatasubject, setEmailDatasubject] = useState("");
    const [keywordSuggesion, setKeywordSuggesion] = useState(false);
    const [changedTemplate, setChangedTemplate] = useState("");
    const [firstTimeErrorMsg, setFirstTimeErrorMsg] = useState(false);
    const [tempSelected, setTempSelected] = useState(false);
    const [emailSend, setEmailSend] = useState(false);
    const [emailBody, setEmailBody] = useState("");
    const [errorShow, setErrorShow] = useState(false);
    const [emailData, setEmailData] = useState({
        "_id": "",
        "email": "",
        "subject": "",
        "template": ""
    });
    const [emailValidation, setEmailValidation] = useState({
        "email": "",
        "subject": "",
        "template": ""
    });
    // const [emailSetupData, setEmailSetupData] = useState({
    //     "host": "",
    //     "port": "",
    //     "user": "",
    //     "pass": "",
    // });






    const closeModal = () => {
        props.hideModal();
    }

    // email template
    const getQueryParams = async () => {
        return new URLSearchParams();
    };
    const fetchEmailTemplateList = async () => {
        const pageId = "all";
        const queryParams = await getQueryParams();
        try {
            setIsLoader(true);
            const result = await EmailServices.fetchEmailTemplateList(pageId, queryParams);
            if (result) {
                // console.log("email template", result.templates);
                setEmailTempData(result);
            }
        } catch (e) {
            setIsLoader(false);
            // console.log("Error in template listing", e);
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    };
    const sendingTemplateDetails = (e, elem) => {
        // console.log("eleme", elem);
        setEmailData({
            ...emailData,
            "subject": elem.subject,
            "template": elem.template,
        });
        setEmailDatasubject(elem.title);
        setEmailemailTemplateToggle(false);
        // setEmailBody(Buffer.from(elem.template, 'base64').toString());
        setEmailDatasubject(elem.title);
        setTemplateToogle(false);
        setTempSelected(true);

        // console.log(emailData.template !== "", elem.subject, elem.title, emailData.template);
        if (!emailData.title !== "" && elem.subject !== "" && elem.template !== "") {
            setEmailValidation({
                "email": "",
                "subject": "",
                "template": ""
            })
        }
        // console.log(emailData);
    }

    // Subject
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
            setEmailValidation({ ...emailValidation, subject: "Please enter an email subject" });
        } else if (name === "template" && value.length === 0) {
            setEmailValidation({ ...emailValidation, template: "Please enter an email body" });

        } else if (name === "email" && !emailRegex.test(value)) {
            setEmailValidation({ ...emailValidation, email: "Please enter a valid Email" });
        } else {
            setEmailValidation({
                "email": "",
                "subject": "",
                "template": ""
            });
        }
    }
    // deleselected email template
    const deselectingTemplate = () => {
        // console.log(emailData);
        setEmailData({
            ...emailData,
            "subject": "",
            "template": "",
        });
        setTempSelected(false);
        setEmailDatasubject("");
        setTemplateToogle(false);
        setChangedTemplate("");
        setFirstTimeErrorMsg(false);
    }
    const addKeywordEmail = (e) => {
        // // console.log();
        setEmailValidation({
            ...emailValidation,
            subject: "",
            email: ""
        })
        e.preventDefault()
        let subjectInput = newEmailTemplateSubject.current;
        let cursorStart = subjectInput.selectionStart;
        let cursorEnd = subjectInput.selectionEnd;
        let textValue = subjectInput.value;

        try {
            if (cursorStart || cursorStart == "0"
            ) {
                var startToText = "";
                if (emailData.subject.length < 250) {
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
                }


                // // console.log(subjectInput, cursorStart, cursorEnd, textValue);
            } else {
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
        } catch (err) {
            // console.log();
        }
    }
    const fetchEmailTags = async () => {
        try {
            const result = await SMSServices.fetchSMSTags()
            if (result) {
                // // console.log("result", result);
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
    useEffect(() => {
        // // console.log("template",utils.decodeHTML(emailData.template));
        setChangedTemplate(utils.decodeHTML(emailData.template));
    }, [emailData.template]);





    const sendBulkEmailHandler = async (e) => {
        // console.log("Edited email body: ", emailData);
        e.preventDefault();
        // console.log("Email templete data", changedTemplate);
        // const subject = emailData.subject;
        // // console.log("Changed", changedTemplate);
        // let template = changedTemplate;
        let payload = {
            type: "email",
            selected: props.selectedContacts,
            all: props.selectAllCheckbox.toString(),
            "subject": emailData.subject,
            "template": utils.encodeHTML(changedTemplate)
        };
        // console.log(payload);
        if (emailData.subject === "") {
            setEmailValidation( 
                {
                    ...emailValidation,
                    subject: "Please enter an email subject",
                }
            )
        }
        else if (utils.encodeHTML(changedTemplate) === "" && emailData.email === "") {
            setEmailValidation(
                {
                    ...emailValidation,
                    template: "Please enter an email body",
                }
            )
        }
        else if (payload.template === "") {
            setEmailValidation({
                ...emailValidation,
                template: "Please enter an email body"
            })
            // console.log("I am in else if")
        }
        else {
            setIsLoader(true);
            try {
                let result = await ContactService.fetchBulkEmail(payload);
                if (result) {
                    // console.log(result);
                    setIsLoader(false);
                    // setEmailData({});
                    emailData.subject = "";
                    emailData.template = "";
                    props.hideModal();
                    props.unCheckAll();
                    if (!props.numberOfContact) {
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: "Bulk email send successfully",
                            typeMessage: 'success'
                        });
                        payload= {
                            all : false,
                        }
                        console.log(payload);
                    }
                    else if (props.numberOfContact) {
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: "Email send successfully",
                            typeMessage: 'success'
                        });
                    }
                }

            } catch (error) {
                // console.log(error);
                setIsLoader(false);
            } finally {
                setIsLoader(false);
            }
        }
    }
    // const fetchEmail = async () => {
    //     try {
    //         setIsLoader(true);
    //         const result = await EmailServices.fetchSetupEmail();
    //         if (result) {
    //             // console.log(result);
    //             setEmailSetupData(result);
    //         }
    //     } catch (e) {
    //         setIsLoader(false);
    //         dispatch({
    //             type: actionTypes.SHOW_MESSAGE,
    //             message: e.message,
    //             typeMessage: 'error'
    //         });
    //     } finally {
    //         setIsLoader(false);
    //     }
    // };
    useEffect(() => {
        fetchEmailTemplateList();
        fetchEmailTags();
        // fetchEmail();
    }, []);
    // out side click of thr email
    const handleClickOutside = (event) => {
        if (tagRef.current && !tagRef.current.contains(event.target)) {
            // console.log(event);
            setKeywordSuggesion(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [tagRef]);
    // const onChangeEditor = (e) => {
    //     // console.log(e);
    //     if(!e){
    //         setFirstTimeLoadEditor(false)
    //     }
    // }


    useEffect(() => {
        setFirstTimeErrorMsg(true);
    }, [changedTemplate]);
    useEffect(() => {
        // console.log("change template", changedTemplate);
        if (changedTemplate == "" && firstTimeErrorMsg) {
            setEmailValidation({
                ...emailValidation,
                template: "Please enter an email body"
            });
        } else {
            setEmailValidation({
                ...emailValidation,
                template: ""
            });
        }
    }, [changedTemplate])

    useEffect(() => {
        console.log("props bulk email", props.numberOfContact)
    }, [props.numberOfContact])

    return (
        <>
            
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={() => closeModal()}></div>
                <div className="sideMenuInner bulkSmsModel bulkEmailModel">
                    {isLoader ? <Loader /> : ""}
                    <div className="sideMenuHeader">
                        {props.numberOfContact && <h3>Send Email</h3>}
                        {!props.numberOfContact && <h3>Send Bulk Email</h3>}

                        {/* <p>Select an Email template to send Email.</p> */}
                        <button className="btn btn-closeSideMenu" onClick={() => closeModal()}><span></span><span></span></button>
                    </div>
                    {/* {
                        emailSetupData.user === undefined ? (<p className="showSetupMsg">You can't send mail as the email setup is not done</p>) : */}
                    <div className="bulkModalBody">
                        <div className="slice">
                            <label>Email template</label>
                            <div className="cmnFormField">

                                <div className="cmnFieldStyle btnSelect"
                                    onClick={(e) => setTemplateToogle(!templateToggle)}>
                                    <span>{emailDatasubject ? emailDatasubject : "Choose an email template"}</span>
                                </div>
                                {templateToggle &&
                                    <ul className="showTemplateName">
                                        {emailTempData.templates.length !== 0 &&
                                            <li onClick={(e) => deselectingTemplate()}>Select Template</li>

                                        }
                                        {
                                            (emailTempData.templates &&
                                                emailTempData.templates.length > 0) ?
                                                emailTempData.templates.map((elem, i) => (
                                                    <li key={i}
                                                        onClick={(e) => sendingTemplateDetails(e, elem)}>{elem.title}</li>
                                                )
                                                ) :
                                                <li className="listCentered">No Email template Found</li>
                                        }
                                    </ul>}
                            </div>
                            <div className="errorMsg">{emailValidation.email}</div>
                        </div>
                        <div className="slice">
                            <label className="bold">Subject</label>
                            <div
                                className={emailValidation.subject ? "cmnFormField email error" : "cmnFormField"}>
                                <input type="text" className="email cmnFieldStyle"
                                    onChange={emailSendHandler}
                                    name="subject"
                                    id="newEmailTemplateSubject"
                                    ref={newEmailTemplateSubject}
                                    value={emailData.subject}
                                    maxLength={250}
                                    placeholder="Enter an email subject"
                                />
                                <MergeTag addfeild={(e,field)=> addKeywordEmail(e,field)}/>
                            </div>
                            <div className="errorMsg">{emailValidation.subject}</div>
                        </div>
                        <div className="slice">
                            <label className="bold">Email Body</label>
                            <div
                                className={emailValidation.template || errorShow ? "cmnFormField globalSms error" : "cmnFormField globalSms"}>
                                <EditorComponent
                                    globalTemplateValue={(template) => setChangedTemplate(template)}
                                    initialData={emailData ? emailData : emailData.template}
                                    setTempSelected={true}
                                    setEmailSend={emailSend}
                                />
                                <div className="errorMsg">{emailValidation.template}</div>
                                {/* <div className="errorMsg">{changedTemplate === "" && firstTimeErrorMsg  ? "Write some message" : ""}</div> */}
                            </div>
                        </div>
                                
                        <div className="slice call_modal_footer">
                            <button type="button" class="cancel"
                                onClick={() => closeModal()}>
                                Cancel 
                            </button>
                            <button className="cmnBtn"  onClick={sendBulkEmailHandler}>
                                Send Email <img src={arrow_forward} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulkEmail