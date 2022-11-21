import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";

const Delay = (props) => {
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
            <div className='automationModalBg' onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal delaySettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Delay Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="emailDetails delayDetails">
                                <div className="inputField">
                                    <label htmlFor="delayTm">Set Delay</label>
                                    <div className="inFormField d-flex">
                                        <input className={`formField ${props.delayDataError}`} type="number"
                                               name="delayTm" id="delayTm" value={props.delayTime} onChange={props.handleDelayChange} />
                                        <select className="formField" value={props.delayType} onChange={props.handleDelayTypeChange}>
                                            <option value="day">Days</option>
                                            <option value="hours">Hours</option>
                                            <option value="minutes">Minutes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={props.saveDelay}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Delay;