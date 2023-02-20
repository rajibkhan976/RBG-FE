import React, {memo, useEffect, useRef, useState} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import {SMSServices} from "../../../../services/template/SMSServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import MergeTag from "../../../shared/MergeTag";

const Message = (props) => {
    console.log("props", props)
    const messageTextbox = useRef(null)
    const [keywordSuggesion, setKeywordSuggesion] = useState(false);
    const [searchTagString, setSearchTagString] = useState("");
    const [smsTags, setSmsTags] = useState([]);
    const [body, setBody] = useState(props.body ? props.body : "" );
    const dispatch = useDispatch();
    const addKeywordEdit = (e) => {
        e.preventDefault();
        let textBox = messageTextbox.current;
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
        setBody(textValue)
        setTimeout(() => {
            textBox.setSelectionRange(startPosition.length, startPosition.length);
        }, 100)
    };
    const handleBodyChange = (event) => {
      setBody(event.target.value);
    }
    const fetchTags = async () => {
        try {
            const result = await SMSServices.fetchSMSTags()
            if (result) {
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
    const saveMessage = () => {
        if (body) {
            props.saveMessage(body, props.triggerNodeId)
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please fill up message body.',
                typeMessage: 'error'
            });
        }
    }
    useEffect(() => {
        fetchTags()
    }, [])
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
            <div className='automationModalBg' onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Message Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label htmlFor="">Body</label>
                                    <div className="inFormField">
                                        <textarea className={`${props.bodyError}`} name="messageBody"
                                                  onChange={props.handleBodyChange}
                                                  value={props.body} ref={messageTextbox}>{props.body}</textarea>
                                        {/* <button
                                            className="btn browseKeywords browseKeywordsSMS"
                                            style={{
                                                marginRight: "0",
                                                padding: "0",
                                                bottom: "3"
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setKeywordSuggesion(true);
                                            }}
                                        > 
                                            <img src={browse_keywords} alt="keywords" />
                                        </button>*/}
                                        {/* {keywordSuggesion && (
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
                                                            )
                                                            .map((tagItem, i) => (
                                                                <li key={"keyField" + i}>
                                                                    <button
                                                                        onClick={(e) =>
                                                                            addKeywordEdit(e, tagItem.id)
                                                                        }
                                                                    >
                                                                        {tagItem.id}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )} */}
                                         <MergeTag addfeild={(e,field)=> addKeywordEdit(e,field)}/>

                                    </div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveMessage}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Message;
