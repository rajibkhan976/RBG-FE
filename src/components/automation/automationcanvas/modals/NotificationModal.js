import React, {useEffect, useState, useRef} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import Select, {components} from "react-select";
import user02 from "../../../../assets/images/user02.png";
import groupIcon from "../../../../assets/images/group_icon.svg";
import {Editor} from '@tinymce/tinymce-react';
import tagIcon from "../../../../assets/images/tag_icon.svg";
import expendIcon from "../../../../assets/images/expend_icon.svg";
import searchIcon from "../../../../assets/images/search_icon.svg";
import crossIcon from "../../../../assets/images/cross.svg";
import {regExpLiteral} from '../../../../../node_modules/@babel/types';
import cressIcon from "../../../../assets/images/white_cross_roundedCorner.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import {NotificationGroupServices} from '../../../../services/notification/NotificationGroupServices';
import Loader from "../../../shared/Loader";
import defaultImage from "../../../../assets/images/owner_img_1.png";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import {SMSServices} from "../../../../services/template/SMSServices";
import {EmailServices} from "../../../../services/setup/EmailServices";
import {utils} from "../../../../helpers";
import EditorComponent from "../../../setup/templates/email/editor/Editor";
import icon_browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import MergeTag from "../../../shared/MergeTag";

const NotificationModal = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    const [optionShow, setOptionShow] = useState(false);
    const [max, setMax] = useState(false);
    const ref = useRef(null);
    const [cross, setCross] = useState(false);
    const [searchGroup, searchGroupHandelar] = useState("");
    const [filteredGroup, setFilteredGroup] = useState([]);
    const [filteredUserName, setFilteredUserName] = useState([]);
    const [userListOption, setUserListOption] = useState([]);
    const [groupListOption, setGroupListOption] = useState([]);
    const [searchResult, setSearchResult] = useState(props.elem.data.recipents);
    const [tags, setTags] = useState([]);
    const [emailOption, setEmailOptions] = useState([]);
    const [smsOptions, setSMSOptions] = useState([]);
    const [selectedEmailTemplate, setSelectedEmailTemplate] = useState({value: "", label: "Select an Email Template", data: {}});
    const [searchTagString, setSearchTagString] = useState("");
    const [subjectKeywordSuggesion, setSubjectKeywordSuggesion] = useState(false);
    const [searchTagStringSMS, setSearchTagStringSMS] = useState("");
    const [subjectKeywordSuggesionSMS, setSubjectKeywordSuggesionSMS] = useState(false);
    const [emailData, setEmailData] = useState({
        "_id": "",
        "email": "",
        "subject": props.elem.data.emailBody,
        "template": utils.encodeHTML(props.elem.data.emailBody)
    });
    const [changedTemplate, setChangedTemplate] = useState(props.elem.data.emailBody);
    const newEmailTemplateSubject = useRef(null);
    const smsRef = useRef(null);
    const [smsData, setSMSData] = useState(props.elem.data.smsBody)
    const [selectedSMSTemplate, setSelectedSMSTemplate] = useState({value: "", label: "Select an SMS Template", data: {}});
    const [isSendSMS, setIsSendSMS] = useState(props.elem.data.isSendSMS);
    const [isSendEmail, setIsSendEmail] = useState(props.elem.data.isSendEmail);
    const [processing, setProcessing] = useState(false);

    const searchHandeler = async (e) => {
        searchGroupHandelar(e.target.value);
        await fetchNotificationGroupList(e.target.value);
        setOptionShow(true);
    }
    // user List API call
    const fetchNotificationGroupList = async (searchGroup) => {
        try {
            setProcessing(true);
            let searchData = {"keyword": searchGroup}
            const response = await NotificationGroupServices.fetchNotificationGroupListSearch(searchData);
            setUserListOption(response.data.users);
            setGroupListOption(response.data.notificationGroup);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setProcessing(false);
        }

    };
    const addKeywordEditEmailSubject = (e) => {
        e.preventDefault();
        let textBox = newEmailTemplateSubject.current;
        let cursorStart = textBox.selectionStart;
        let cursorEnd = textBox.selectionEnd;
        let textValue = textBox.value;
        let startPosition = 0;
        if (cursorStart || cursorStart === "0") {
            textValue = textValue.substring(0, cursorStart) + " [" + e.target.textContent + "] " + textValue.substring(cursorEnd, textValue.length);
            startPosition = textValue.substring(0, cursorStart) + " [" + e.target.textContent + "] ";
        } else {
            textValue = textValue + " [" + e.target.textContent + "] ";
            startPosition = textValue + " [" + e.target.textContent + "] ";
        }
        setEmailData({
            ...emailData,
            subject: textValue
        });
        setTimeout(() => {
            textBox.setSelectionRange(startPosition.length, startPosition.length);
        }, 100)
    };
    const addKeywordEdit = (e) => {
        e.preventDefault();
        let textBox = smsRef.current;
        let cursorStart = textBox.selectionStart;
        let cursorEnd = textBox.selectionEnd;
        let textValue = textBox.value;
        let startPosition = 0;
        if (cursorStart || cursorStart === "0") {
            textValue = textValue.substring(0, cursorStart) + " [" + e.target.textContent + "] " + textValue.substring(cursorEnd, textValue.length);
            startPosition = textValue.substring(0, cursorStart) + " [" + e.target.textContent + "] ";
        } else {
            textValue = textValue + " [" + e.target.textContent + "] ";
            startPosition = textValue + " [" + e.target.textContent + "] ";
        }
        setSMSData(textValue)
        setTimeout(() => {
            textBox.setSelectionRange(startPosition.length, startPosition.length);
        }, 100)
    };
    useEffect(async () => {
        await fetchNotificationGroupList(searchGroup);
        await fetchEmailTags();
        await fetchTemplateList();
        await fetchSMSTemplates();
    }, []);

    const fetchEmailTags = async () => {
        try {
            const result = await SMSServices.fetchSMSTags()
            if (result) {
                setTags(result)
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
        const queryParams = await getQueryParams();
        try {
            const result = await EmailServices.fetchEmailTemplateList(pageId, queryParams);
            if (result) {
                let op = [{value: "", label: "Select an Email Template", data: {"_id": "",
                        "email": "",
                        "subject": "",
                        "template": ""}}]
                result.templates.map(el => {
                    op.push({value: el._id, label: el.title, data: el})
                });
                setEmailOptions(op);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message + ". Please check your email configuration.",
                typeMessage: 'error'
            });
        }
    };

    const fetchSMSTemplates = async () => {
        let pageId = 'all';
        let queryParams = await getQueryParams();
        try {
            const result = await SMSServices.fetchSms(pageId, queryParams);
            if (result) {
                let op = [{value: "", label: "Select a SMS Template", data: {}}]
                result.templates.map(el => {
                    op.push({value: el._id, label: el.title, data: el})
                });
                setSMSOptions(op);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    };


    const getQueryParams = async () => {
        return new URLSearchParams();
    };
    // filer in serach group
    useEffect(() => {
        if (searchGroup) {
            setCross(true);
        } else {
            setCross(false);
        }
        if (groupListOption.length) {
            setFilteredGroup(
                groupListOption && groupListOption?.filter((groupName) =>
                    groupName?.name.toLowerCase().includes(searchGroup.toLowerCase())
                )
            );
        }
        setFilteredUserName(
            userListOption && userListOption.filter((user) => {
                    let fullName = user.firstName + ' ' + user.lastName;
                    if (fullName || user?.email || user?.phone) {
                        return fullName?.toLowerCase().includes(searchGroup?.toLowerCase()) || user?.email.toLowerCase().includes(searchGroup?.toLocaleLowerCase()) || user?.username.toLowerCase().includes(searchGroup?.toLocaleLowerCase())
                    }
                }
            )
        );
    }, [searchGroup, groupListOption, userListOption]);


    const closeSearchHandeler = (e) => {
        setOptionShow(false);
        searchGroupHandelar("");
    }
    useEffect(() => {
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOptionShow(false);
                searchGroupHandelar("");
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);

    // group select value

    const groupSelectHandelar = (e) => {
        setSearchResult([...searchResult, e]);
    }
    const userSelectHandelar = (e) => {
        // console.log(e);
        setSearchResult([...searchResult, e]);
    }
    const deleteSearchResult = (index) => {
        console.log(index);
        searchResult.splice(index, 1);
        console.log(searchResult);
        setSearchResult([...searchResult]);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            let value = event.target.value;
            if (value.includes("@")) {
                const emailPattern = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if (emailPattern) {
                    setSearchResult([...searchResult, value]);
                    searchGroupHandelar("");
                }
            } else {
                value = value.replaceAll("+", "");
                value = value.replaceAll("-", "");
                value = value.replaceAll(" ", "");
                if (!isNaN(value)) {
                    setSearchResult([...searchResult, value]);
                    searchGroupHandelar("");
                }
            }
        }
    };
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
       setChangedTemplate(utils.decodeHTML(e.data.template));
       setSelectedEmailTemplate(e);
    }
    const emailBodyHandler = (email) => {
        console.log(email)
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
            } else {
                subjectInput.value = subjectInput.value + " [" + e.target.textContent + "] ";
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
    const addKeywordSMS = (e) => {
        e.preventDefault()
        let subjectInput = smsRef.current;
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
                setSMSData(subjectInput.value)
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
            } else {
                subjectInput.value = subjectInput.value + " [" + e.target.textContent + "] ";
                setSMSData(subjectInput.value)
                subjectInput.focus();
            }
        } catch (err) {
            console.log();
        }
    }
    const smsTemplateChangeHandler = (e) => {
        setSelectedSMSTemplate(e);
        if (e && e.data && e.data.message) {
            setSMSData(e.data.message);
        } else {
            setSMSData("");
        }
    }
    const handlerSMSBody = (e) => {
        setSMSData(e.target.value);
    }
    const sendMessageHandler = (e) => {
      setIsSendSMS(e.target.checked);
    }
    const sendEmailHandler = (e) => {
      setIsSendEmail(e.target.checked)
    }
    const saveNotificationGroup = () => {
        if (!searchResult.length) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please provide a group or user or email or phone number.',
                typeMessage: 'error'
            });
            return false;
        }
        if (!isSendSMS && !isSendEmail) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please provide select send email /  send SMS.',
                typeMessage: 'error'
            });
            return false;
        }
        if (isSendEmail && !emailData.subject && !changedTemplate) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please provide email subject and body.',
                typeMessage: 'error'
            });
            return false;
        }
        if (isSendSMS && !smsData) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please provide message body.',
                typeMessage: 'error'
            });
            return false;
        }
        props.saveNotification(props.elem.id, searchResult, isSendEmail, isSendSMS, emailData, changedTemplate, smsData);
    }
    return (
        <React.Fragment>
            <div className="automationModal">
                <div className="nodeSettingModal notificationGroupTags">
                    <div className="formHead">
                        <div className="heading">
                            <p>Notification Group Action Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal"/>
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <p className="title">Events</p>
                            <label>Search groups and users to add</label>
                            <div className="notificationSearch">
                                <div className="notificationInput">
                                    <input type="search"
                                           className={processing ? "notiGroupSelect loading" : "notiGroupSelect"}
                                            // style={{
                                            //     backgroundImage: toggleContactList.status
                                            //         ? `url(${updown})`
                                            //         : "",
                                            // }}
                                           ref={ref}
                                           value={searchGroup}
                                           placeholder="Search Here"
                                           onKeyDown={handleKeyDown}
                                           onChange={(e) => {
                                               searchHandeler(e)
                                           }}
                                           onClick={searchHandeler}
                                           />
                                    <img src={searchIcon} className="positionSet"/>
                                    {cross && <button className="positionSet" onClick={() => closeSearchHandeler()}><img
                                        src={crossIcon}/></button>}
                                </div>
                                {(optionShow && (filteredGroup.length || filteredUserName.length)) ?
                                    <div className="notificationSelectOption">
                                        {filteredGroup && filteredGroup.length ?
                                                <>
                                                    <h5>Notification Groups</h5>
                                                    <ul className="groupOption">
                                                        {
                                                            filteredGroup && filteredGroup.map((item) => {
                                                                return (
                                                                    <li key={item._id} onClick={() => groupSelectHandelar(item)}>
                                                                        <div className="thum">
                                                                            <img src={groupIcon}/>
                                                                        </div>
                                                                        <p>{item.name} <span>{item?.users.length}</span></p>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </> : "" }
                                        { filteredUserName && filteredUserName.length ?
                                            <>
                                                <h5>Users</h5>
                                                <ul className="userOption">
                                                    {
                                                        filteredUserName && filteredUserName.map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => userSelectHandelar(item)}>
                                                                        <div className="profile">
                                                                            <div className="thum">
                                                                                <img
                                                                                    src={item?.image ? process.env.REACT_APP_BUCKET + item?.image : defaultImage}/>
                                                                            </div>
                                                                            <p>{item?.firstName} {item?.lastName}</p>
                                                                        </div>
                                                                        <div className="email"><a>{item?.email}</a></div>
                                                                        <div className="phone"><a>{item?.prefix} - {item?.phone}</a>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </ul>
                                            </> : "" }
                                    </div> : ""
                                }
                            </div>
                            <div className="searchResult">
                                <ul className="cz_tagList">
                                    {
                                        searchResult && searchResult.map((item, index) => {
                                            return (
                                                <li key={index}
                                                    className="cz_tag">
                                                    { item.firstName == undefined && item.lastName == undefined && item.name == undefined ?  item :
                                                        ( item.firstName ? item.firstName + " " + item.lastName : item.name) }
                                                    <button type="button" onClick={() => deleteSearchResult(index)}><img
                                                        src={cressIcon} alt=""/></button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='notificationHolder'>
                            <div className="notificationEmail">
                                <div className="sendEmail">
                                    <label className="indselects">
                                        <span className="customCheckbox allContacts"><input type="checkbox" defaultChecked={isSendEmail} onClick={sendEmailHandler}
                                                                                            name=""/><span></span></span>
                                        Send Email
                                    </label>
                                </div>
                                <div className={isSendEmail ?'emailTemplateForm' : 'emailTemplateForm disabled'}>
                                    <div className='cmnFormCol'>
                                        <div className="cmnFieldName">Email Templates <span>(Optional)</span></div>
                                        <div className="cmnFormField">
                                            <Select name="template" value={selectedEmailTemplate} styles={selectStyles}
                                                    onChange={(e) => emailTemplateChangeHandler(e)} options={emailOption} placeholder="Choose a email template" />
                                        </div>
                                    </div>
                                    <div className="cmnFormCol subject">
                                        <div className="cmnFieldName">Subject</div>
                                        <div className="cmnFormField">
                                            <input className='cmnFieldStyle' type="text" ref={newEmailTemplateSubject}
                                                placeholder='Enter email subject' value={emailData.subject} onChange={handleEmailSubject}/>
                                            <MergeTag addfeild={(e,field)=> addKeywordEditEmailSubject(e,field)}/>
                                        </div>
                                    </div>
                                    <div className="cmnFormCol editor">
                                        <div className="cmnFieldName">Email Body</div>
                                        <div className="cmnFormField">
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
                            </div>
                            <div className="notificationEmail notificationSms">
                                <div className="sendEmail">
                                    <label className="indselects">
                                        <span className="customCheckbox allContacts">
                                            <input type="checkbox" value="sendMessage"
                                                defaultChecked={isSendSMS} onClick={sendMessageHandler} /><span></span></span>
                                        Send SMS
                                    </label>
                                </div>
                                <div className={isSendSMS ?'emailTemplateForm' : 'emailTemplateForm disabled'}>
                                    <div className='createInfo'>
                                        <h6>Create a Message</h6>
                                        <p>{smsData.length}/{parseInt(((parseInt(smsData.length ) / 153) + 1))} SMS - One message contains 153 characters max (SMS count can be changed if
                                            you are using keyword variable e.g. [fname])</p>
                                    </div>
                                    <div className='cmnFormCol'>
                                        <div className="cmnFieldName">SMS Templates <span>(Optional)</span></div>
                                        <div className="cmnFormField">
                                            <Select name="template" value={selectedSMSTemplate} styles={selectStyles}
                                                    onChange={(e) => smsTemplateChangeHandler(e)} options={smsOptions} placeholder="Choose a SMS template" />
                                        </div>
                                    </div>
                                    <div className='cmnFormCol'>
                                        <div className="cmnFieldName">SMS Body <span>(Optional)</span></div>
                                        <div className='cmnFormField'>
                                            <div className={max ? "bigTextbox" : "smallTextBox"}>
                                                <textarea className='cmnFieldStyle' placeholder='Send message' value={smsData} ref={smsRef} onChange={handlerSMSBody}></textarea>
                                                <div className='actions'>
                                                    <button className='bigIcon' onClick={(e) => {
                                                        e.preventDefault()
                                                        setMax(!max)
                                                    }}>
                                                        {max ?
                                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M13.3047 11.949L3.35469 1.99902H6.80469V0.499023H0.804688V6.49902H2.30469V3.04902L12.2547 12.999H8.80469V14.499H14.8047V8.49902H13.3047V11.949Z"
                                                                    fill="#305671"/>
                                                            </svg> :
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M16.5 15.45L2.55 1.5H6V0H0V6H1.5V2.55L15.45 16.5H12V18H18V12H16.5V15.45ZM12 0V1.5H15.525L10.8 6.225L11.85 7.275L16.5 2.625V6H18V0H12ZM6.225 10.725L1.5 15.45V12H0V18H6V16.5H2.625L7.35 11.775L6.225 10.725Z"
                                                                    fill="#305671"/>
                                                            </svg>
                                                        }
                                                    </button>
                                                </div>
                                                <MergeTag addfeild={(e,smsRef)=> addKeywordEdit(e,smsRef)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btnGroup centered">
                            <button className="cmnBtn" onClick={saveNotificationGroup}>Save <img src={arrow_forward} alt=""/></button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default NotificationModal;
