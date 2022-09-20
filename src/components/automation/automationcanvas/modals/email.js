import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";

const Email = (props) => {
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className="nodeSettingModal">
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
                        <div className="formBodyContainer">
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label htmlFor="subject">Subject</label>
                                    <div className="inFormField subjectField">
                                        <input className={`icon ${props.subjectError}`} type="text" name="subject"
                                               id="subject" value={props.subject} onChange={props.handleSubjectChange} onClick={props.handleSubjectChange} />
                                        <button className="toggleTags" onClick={(e) => props.toggletoMail(e)}></button>
                                    </div>
                                    <div className="emailTagSubject">
                                        <h6>Select Option(s)</h6>
                                        {Object.keys(props.emailData).length ? (
                                            Object.keys(props.emailData).map((value, key) => (
                                                <button onClick={() => props.copyTag(value, 'subject')}>{value}</button>
                                            ))
                                        ) : ""
                                        }
                                    </div>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="toEmail">To</label>
                                    <div className="inFormField">
                                        <input className={`icon ${props.toEmailError}`} type="text" name="toEmail"
                                               id="toEmail" value={props.toEmail} onChange={props.handleToEmailChange} onClick={props.handleToEmailChange} />
                                        <button className="toggleTags" onClick={(e) => props.toggletoMail(e)}></button>
                                    </div>
                                    <div className="emailTagToEmail">
                                        <h6>Select Option(s)</h6>
                                        {Object.keys(props.emailData).length ? (
                                            Object.keys(props.emailData).map((value, key) => (
                                                <button onClick={() => props.copyTag(value, 'toEmail')}>{value}</button>
                                            ))
                                        ) : ""
                                        }
                                    </div>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="bodyEmail">Body</label>
                                    <div className="inFormField">
                              <textarea className={`icon ${props.bodyEmailError}`} name="bodyEmail" id="bodyEmail" onChange={props.handleBodyEmailChange}
                                        onClick={props.handleBodyEmailChange} value={props.bodyEmail}>{props.bodyEmail}</textarea>
                                    </div>
                                    <div className="emailTagEmailBody">
                                        {Object.keys(props.emailData).length ? (
                                            Object.keys(props.emailData).map((value, key) => (
                                                <button onClick={() => props.copyTag(value, 'bodyEmail')}>{value}</button>
                                            ))
                                        ) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={props.saveEmail}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Email;