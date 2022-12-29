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

const NotificationModal = (props) => {
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    const [optionShow, setOptionShow] = useState(false);
    const [max, setMax] = useState(false);
    const [editorMax, setEditorMax] = useState(false);
    const [keywordTextSuggesion, setKeywordTextSuggesion] = useState(false);
    const [editorKeywordTextSuggesion, setEditorKeywordTextSuggesion] = useState(false);
    const [subjectTag, setSubjectTag] = useState(false);
    const ref = useRef(null);
    const [cross, setCross] = useState(false);
    const [noOption, setNoOption] = useState(false);
    const [searchGroup, searchGroupHandelar] = useState("");
    const [filteredGroup, setFilteredGroup] = useState([]);
    const [filteredUserName, setFilteredUserName] = useState([]);
    const [formError, setFromError] = useState({
        email: ""
    })
    const [userListOption, setUserListOption] = useState([]);
    const [groupListOption, setGroupListOption] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [introAudioFileChosed, setIntroAudioFileChosed] = useState(false);
    const [introAudioinputFileName, setIntroAudioinputFileName] = useState("No file chosen");
    const [introChosedFileError, setIntroChosedFileError] = useState(false);

    const smsTag = [
        {name: "Tag 01", value: "tag01"},
        {name: "Tag 02", value: "tag02"},
        {name: "Tag 03", value: "tag03"},
    ]

    const handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }


    const selectTagHandeler = (value) => {
        console.log(value);
        setKeywordTextSuggesion(false);
    }
    const subjectTagHandeler = () => {
        setSubjectTag(false);
    }


    const searchHandeler = (e) => {
        searchGroupHandelar(e.target.value);
        console.log(searchGroup);
        if (searchGroup.length >= 2) {
            console.log(searchGroup);
            fetchNotificationGroupList(e.target.value);
            setOptionShow(true);
            setNoOption(false);
            if (e.target.value.includes('@')) {
                const emailPattern = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                console.log("this one is email id");
                if (e.target.value.length) {
                    setFromError({
                        ...formError,
                        email: !emailPattern ? "Invalid Email address" : ""
                    });
                } else {
                    setFromError({
                        ...formError,
                        email: ""
                    });
                }
            } else {
                setNoOption(false);
            }
        }
    }


    // user List API call
    const fetchNotificationGroupList = async (searchGroup) => {
        try {
            setIsLoader(true);
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
            setIsLoader(false);
        }

    };

    useEffect(async () => {
        console.log(props)
        await fetchNotificationGroupList(searchGroup);
    }, []);

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

        // console.log(filteredGroup, filteredUserName);
    }, [searchGroup, groupListOption, userListOption]);


    const closeSearchHandeler = (e) => {
        console.log(e);
        setOptionShow(false);
        searchGroupHandelar("");
    }
    useEffect(() => {
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOptionShow(false);
                setNoOption(false);
                searchGroupHandelar("");
                setFromError({email: ""});
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);

    // group select value

    const groupSelectHandelar = (e) => {
        // console.log(e);
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
            console.log(searchGroup);
        }
    };


    // file uploaded

    const handleAudioUpload = () => {
    }
    const resetForm = () => {
        setIntroAudioFileChosed(false);
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
                        {isLoader ? <Loader/> : ''}
                        <div className="formBodyContainer">
                            <p className="title">Events</p>
                            <label>Search groups and users to add</label>
                            <div className="notificationSearch">
                                <div className="notificationInput">
                                    <input type="search"
                                           className="notiGroupSelect"
                                           ref={ref}
                                           value={searchGroup}
                                           placeholder="Search Here"
                                           onKeyDown={handleKeyDown}
                                           onChange={(e) => {
                                               searchHandeler(e)
                                           }}
                                           />
                                    <img src={searchIcon} className="positionSet"/>
                                    {cross && <button className="positionSet" onClick={() => closeSearchHandeler()}><img
                                        src={crossIcon}/></button>}
                                </div>
                                {formError.email ? (<div className='errorMessage'>{formError.email}</div>) : ""}
                                {optionShow &&
                                    <div className="notificationSelectOption">
                                        <h5>Notification Groups</h5>
                                        <ul className="groupOption">
                                            {
                                                filteredGroup && filteredGroup.map((item) => {
                                                    return (
                                                        <li item key={item._id} onClick={() => groupSelectHandelar(item)}>
                                                            <div className="thum">
                                                                <img src={groupIcon}/>
                                                            </div>
                                                            <p>{item.name} <span>{item?.users.length}</span></p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
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
                                    </div>
                                }
                                {
                                    noOption &&
                                    <div className="noResult">
                                        <h4>No User Found</h4>
                                        <p>If you want to add this user manually press Enter.</p>
                                    </div>
                                }

                            </div>
                            <div className="searchResult">
                                <ul className="cz_tagList">
                                    {
                                        searchResult && searchResult.map((item, index) => {
                                            return (
                                                <li key={index}
                                                    className="cz_tag">{item?.firstName} {item?.lastName} {item?.name}
                                                    <button type="button" onClick={() => deleteSearchResult(index)}><img
                                                        src={cressIcon} alt=""/></button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="notificationEmail">
                            <div className="sendEmail">
                                <label className="indselects">
                                    <span className="customCheckbox allContacts"><input type="checkbox" checked
                                                                                        name=""/><span></span></span>
                                    Send Email
                                </label>
                            </div>
                            <div className='emailTemplateForm'>
                                <div className='cmnFormCol'>
                                    <div className="cmnFieldName">Email template <span>(Optional)</span></div>
                                    <div className="cmnFormField">
                                        <select name="status" className="cmnFieldStyle btnSelect">
                                            <option value="">Select a Status</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="cmnFormCol subject">
                                    <div className="cmnFieldName">Subject</div>
                                    <div className="cmnFormField">
                                        <input className='cmnFieldStyle' type="text" placeholder='Enter email subject'/>
                                        <button className="tagBtn" onClick={(e) => {
                                            setSubjectTag(!subjectTag)
                                        }}><img src={tagIcon}/></button>
                                    </div>
                                    {subjectTag ? (<>
                                        <div className="tags">
                                            <ul>
                                                {/*{Object.keys(props.messageData).length ? (
                                                    Object.keys(props.messageData).filter(el => el !== 'status' && el !== 'phase' && el !== 'tags' && el !== 'dadPhone' && el !== 'momPhone').filter(el => el.indexOf(searchTagString) >= 0).map((value, key) => (
                                                        <li key={"keyField" + key}>
                                                            <button
                                                                onClick={(e) =>
                                                                    addKeywordEdit(e, value)
                                                                }
                                                            >
                                                                {value}
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : ""}*/}
                                            </ul>
                                        </div>
                                    </>) : ""}
                                </div>
                                <div className="cmnFormCol editor">
                                    <div className="cmnFieldName">Email Body</div>
                                    <div className={editorMax ? "bigTextbox" : "smallTextBox"}>
                                        <Editor
                                            // initialValue="<p>This is the initial content of the editor</p>"
                                            init={{
                                                plugins: 'link image code',
                                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                            }}
                                            onChange={handleEditorChange}
                                        />
                                        <button className='bigIcon' onClick={(e) => {
                                            e.preventDefault()
                                            setEditorMax(!editorMax)
                                        }}>
                                            {editorMax ?
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

                                        <button className='tagIcon' onClick={(e) => {
                                            setEditorKeywordTextSuggesion(!editorKeywordTextSuggesion)
                                        }}><img src={tagIcon}/></button>
                                    </div>
                                    {editorKeywordTextSuggesion ? (<>
                                        <div className="tags">
                                            <ul>
                                                {smsTag && smsTag.map((item) => {
                                                    return (<li onClick={() => {
                                                        selectTagHandeler(item.value)
                                                    }}>{item.name}</li>)
                                                })}
                                            </ul>
                                        </div>
                                    </>) : ""}
                                </div>
                            </div>
                        </div>
                        <div className="notificationEmail notificationSms">
                            <div className="sendEmail">
                                <label className="indselects">
                                    <span className="customCheckbox allContacts"><input type="checkbox" checked
                                                                                    name=""/><span></span></span>
                                    Send SMS
                                </label>
                            </div>
                            <div className='emailTemplateForm'>
                                <div className='createInfo'>
                                    <h6>Create a Message</h6>
                                    <p>153/0 SMS - One message contains 153 chatracters max (SMS count can be changed if
                                        you are using keyword variable e.g. [fname])</p>
                                </div>
                                <div className='cmnFormCol'>
                                    <div className="cmnFieldName">SMS Tempales <span>(Optional)</span></div>
                                    <div className="cmnFormField">
                                        <select name="status" className="cmnFieldStyle btnSelect">
                                            <option value="">Sms template 01</option>
                                            <option value="">Sms template 02</option>
                                            <option value="">Sms template 03</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='cmnFormCol'>
                                    <div className='cmnFormField'>
                                        <div className={max ? "bigTextbox" : "smallTextBox"}>
                                            <textarea className='cmnFieldStyle' placeholder='Send message'></textarea>
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

                                            <button className='tagIcon' onClick={(e) => {
                                                setKeywordTextSuggesion(!keywordTextSuggesion)
                                            }}><img src={tagIcon}/></button>
                                        </div>
                                        {keywordTextSuggesion ? (<>
                                            <div className="tags">
                                                <ul>
                                                    {smsTag && smsTag.map((item) => {
                                                        return (<li onClick={() => {
                                                            selectTagHandeler(item.value)
                                                        }}>{item.name}</li>)
                                                    })}
                                                </ul>
                                            </div>
                                        </>) : ""}

                                    </div>
                                </div>
                                <div className="cmnFormCol editor">
                                    <div className="cmnFieldName">Upload file to send this message as MMS</div>
                                    <div className="cmnFormField">
                                        <div className="cmnInputFile">
                                            <input type="file" onChange={handleAudioUpload} accept="audio/mpeg"/>
                                            <div className="choseFile">Choose File</div>
                                            <span
                                                className={introAudioFileChosed ? "fileName fileChosed" : "fileName"}>{introAudioinputFileName}</span>
                                        </div>
                                        {introChosedFileError &&
                                            <span className="errorMsg">Please chose .mp3 file</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btnGroup centered">
                            <button className="cmnBtn">Save <img src={arrow_forward} alt=""/></button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default NotificationModal;
