import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import infoIcon from "../../../../assets/images/infos.svg";


const WebhookTrigger = (props) => {

    return (
        <React.Fragment>
            <div className="automationModal filterModal triggerSetting">
            <div className="automationModalBg" onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Trigger Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal"/>
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="formFieldsArea">
                                <div className="inputField">
                                    <label htmlFor="">
                                        Webhook URL
                                        <span className="infoSpan">
                                            <img src={infoIcon} />
                                            <span className="tooltiptextInfo">
                                            After a successful integration using this Webhook URL, it will automatically create a new contact in your system.
                                            </span>
                                        </span>
                                    </label>
                                    <div className="inFormField d-flex testDataInput">
                                        <input type="text" name="webhook-url" id="webhook-url" value={props.automationUrl} readOnly={true}/>
                                        <button className="copyFieldsBtn" onClick={() => props.onClickCopy(props.automationUrl)}></button>
                                    </div>
                                </div>
                                {/* <div className="inputField">
                            <button className="refreshFieldsBtn" onClick={() => refreshWebhook(automationUrlId, triggerNodeId)}>Refresh Fields</button>
                          </div> */}
                                {Object.keys(props.webhookData).length ?
                                    <div className="webhookDataFields">
                                        <h5>
                                            <figure>
                                                <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/></svg>
                                            </figure>
                                            Request</h5>
                                        <div className="listpayloads">
                                            <ul>
                                                {Object.keys(props.webhookData).length ? (
                                                    Object.keys(props.webhookData).map((value, key) => (
                                                        <li>
                                                            <p><span>{value}:</span><span>{props.webhookData[value]}</span>{key === 0 ? "" : " "}</p>
                                                        </li>
                                                    ))
                                                ) : ""
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    : ""}
                            </div>
                            <button type="button" className="testDataBtn" onClick={() => props.refreshWebhook(props.automationUrlId, props.triggerNodeId)}>
                                <span className="buttonText">Test Your Request</span> 
                                <span className="infoSpan">
                                    <img src={infoIcon} />
                                    <span className="tooltiptextInfo">
                                        <h3>How it works?</h3>
                                        <ul>
                                            <li>Copy the URL</li>
                                            <li>Send a Test Request</li>
                                            <li>Observe the Response</li>
                                            <li>Once your integration is working as expected, click "Test Data" to view the data</li>
                                        </ul>
                                        <p>
                                            Remember, successful testing ensures that your webhook is correctly configured and ready to automate tasks seamlessly.
                                        </p>
                                    </span>
                                </span>
                            </button>
                            <div className="saveButton">
                                <button onClick={props.closeFilterModal}>Save <img src={chevron_right_white_24dp} alt=""/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default WebhookTrigger;