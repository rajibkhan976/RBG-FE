import React, {memo, useEffect, useRef, useState} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import Select from "react-select";
import icon_browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import EditorComponent from "../../../setup/templates/email/editor/Editor";
import {EmailServices} from "../../../../services/setup/EmailServices";
import Loader from "../../../shared/Loader";
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import {SMSServices} from "../../../../services/template/SMSServices";
import {utils} from "../../../../helpers";
import MergeTag from "../../../shared/MergeTag";


const Email = (props) => {
    const dispatch = useDispatch();
    const newEmailTemplateSubject = useRef(null)
    const [isLoader, setIsLoader] = useState(false);
    const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(props.selectedTemplate);
    const [subjectKeywordSuggesion, setSubjectKeywordSuggesion] = useState(false);
    const [emailTags, setEmailTags] = useState([]);
    const [changedTemplate, setChangedTemplate] = useState(props.body);
    const [searchTagString, setSearchTagString] = useState("");
    const [emailData, setEmailData] = useState({
        "_id": "",
        "email": "",
        "subject": props.subject,
        "template": utils.encodeHTML(props.body)
    });
    const [options, setOptions] = useState([]);
    useEffect(async () => {
        await fetchEmailTags();
        // await fetchTemplateList();
    }, []);
    const getQueryParams = async () => {
        return new URLSearchParams();
    };
    const fetchTemplateList = async () => {
        const pageId = "all";
        const queryParams = await getQueryParams();
        try {
            setIsLoader(true);
            const result = await EmailServices.fetchEmailTemplateList(pageId, queryParams);
            if (result) {
                let op = [{value: "", label: "Select an Email Template", data: {"_id": "",
                        "email": "",
                        "subject": "",
                        "template": ""}}];
                result.templates.map(el => {op.push({value: el._id, label: el.title, data: el})});
                console.log("op", op);
                setOptions(op);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message + ". Please check your email configuration.",
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
        }
    };
    const emailTemplateData = useSelector((state)=> state?.emailTemplate?.data);
    useEffect(()=>{
        let op = [{value: "", label: "Select an Email Template", data: {"_id": "",
                        "email": "",
                        "subject": "",
                        "template": ""}}];
        emailTemplateData?.templates.map((el)=> {op.push({value: el._id, label: el.title, data: el})});
        setOptions(op);
    },[emailTemplateData]);
    const fetchEmailTags = async () => {
        try {
            const result = await SMSServices.fetchSMSTags()
            if (result) {
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
    const selectStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#305671" : "white",
            color: state.isSelected ? "white" : "#305671",
            fontSize: "13px"
        }),
    };

    const emailTemplateChangeHandler = (e) => {
        e.data._id = "";
        setEmailData(e.data);
        setChangedTemplate(utils.decodeHTML(e.data?.template || ""));
        setSelectedEmailTemplate(e);
    }
    const emailBodyHandler = (email) => {
        console.log(email)
    }
    const saveEmailSettingHandler = () => {
        if (changedTemplate && emailData.subject) {
            props.saveEmail(changedTemplate, emailData.subject, selectedEmailTemplate)
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "Please fill up email body and subject field.",
                typeMessage: 'error'
            });
        }
    }
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
            console.log();
        }
    }
    const createdEmailTemplate = (template) =>{
        setEmailData({
            ...emailData,
            template: template
        })
    }
    const handleEmailSubject = (e) => {
        setEmailData({
            ...emailData,
            subject: e.target.value
        })
    }
    return (
        <React.Fragment>
            <div className="automationModal">
            <div className='automationModalBg' onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal nodeEmailModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Email Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoader ? <Loader /> : ''}
                        <div className="formBodyContainer">
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label>Email template</label>
                                    <Select name="template" value={selectedEmailTemplate} styles={selectStyles}
                                            onChange={(e) => emailTemplateChangeHandler(e)} options={options} placeholder="Choose a email template" />
                                </div>
                                <div className="inputField subjectInputField">
                                    <label>Subject</label>
                                    <div className="cmnFormField globalSms">
                                        <input className="subject" type="text" placeholder="Enter email subject" id="newEmailTemplateSubject" onChange={handleEmailSubject} value={emailData.subject}
                                               ref={newEmailTemplateSubject} />
                                         <MergeTag addfeild={(e,field)=> addKeywordEmail(e,field)}/>

                                    </div>
                                </div>
                                <div className="inputField emailBodyInputField">
                                    <label>Email Body</label>
                                    <div className="cmnFormField globalSms">
                                        <EditorComponent
                                            setTempSelected={true}
                                            initialData={emailData ? emailData : emailData.template}
                                            editorToPreview={(newData)=>emailBodyHandler(newData)}
                                            globalTemplateValue={(template) => setChangedTemplate(template)}
                                            createdEmailTemplate ={(template) => createdEmailTemplate(template)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveEmailSettingHandler}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Email;