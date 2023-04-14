import React, {useEffect, useRef, useState} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import {SMSServices} from "../../../../services/template/SMSServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import MergeTag from "../../../shared/MergeTag";
import Select from "react-select";

const Message = (props) => {
    const messageTextbox = useRef(null);
    const [body, setBody] = useState(props.body ? props.body : "" );
    const [selectedSMSTemplate, setSelectedSMSTemplate] = useState({value: "", label: "Select an SMS Template", data: {}});
    const [smsOptions, setSMSOptions] = useState([]);
    const dispatch = useDispatch();
    const selectStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#305671" : "white",
            color: state.isSelected ? "white" : "#305671",
            fontSize: "13px"
        }),
    };
    const smsTemplateChangeHandler = (e) => {
        setSelectedSMSTemplate(e);
        if (e && e.data && e.data.message) {
            setBody(e.data.message);
        } else {
            setBody("");
        }
    }
    const getQueryParams = async () => {
        return new URLSearchParams();
    };
    const fetchSMSTemplates = async () => {
        let pageId = 'all';
        try {
            const result = await SMSServices.fetchSms(pageId);
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
        fetchSMSTemplates();
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
                                    <div className="cmnFieldName">SMS Templates <span>(Optional)</span></div>
                                    <Select name="template" value={selectedSMSTemplate} styles={selectStyles}
                                            onChange={(e) => smsTemplateChangeHandler(e)} options={smsOptions} placeholder="Choose a SMS template" />
                                </div>
                                <div className="inputField">
                                    <label htmlFor="">Body</label>
                                    <div className="inFormField">
                                            <textarea name="messageBody"
                                                      onChange={handleBodyChange}
                                                      value={body} ref={messageTextbox}>{body}</textarea>
                                        <MergeTag addfeild={(e,field)=> addKeywordEdit(e,field)}/>

                                    </div>
                                </div>
                                <div className="inputField">
                                    <p className="notes">{body.length}/{parseInt(((parseInt(body.length) / 153) + 1))} SMS - One message contains 153 characters max (SMS count can be changed if
                                        you are using keyword variable e.g. [fname])</p>
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
