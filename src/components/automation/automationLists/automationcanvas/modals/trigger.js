import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../../assets/images/chevron_right_white_24dp.svg";

const Trigger = () => {
    const [automationModal, setAutomationModal] = useState(null);
    const closeFilterModal = () => {
        setAutomationModal(null);
    };
    return (
        <React.Fragment>
            <div className="automationModal filterModal triggerSetting">
                <div className="nodeSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Trigger Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal"/>
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="formFieldsArea">
                                <div className="inputField">
                                    <label htmlFor="">Chose webhook URL</label>
                                    <select name="" id="">
                                        <option value="">Chose webhook URL</option>
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="">Custom webhook URL</label>
                                    <input type="text" name="" id=""/>
                                </div>
                                <div className="inputField">
                                    <button className="refreshFieldsBtn">Refresh Fields</button>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button>Save <img src={chevron_right_white_24dp} alt=""/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Trigger;