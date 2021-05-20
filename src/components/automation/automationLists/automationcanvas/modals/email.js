import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../../assets/images/chevron_right_white_24dp.svg";

const Email = () => {
    const [automationModal, setAutomationModal] = useState(null);
    const closeFilterModal = () => {
        setAutomationModal(null);
    };
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className="nodeSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Email Settings</p>
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
                                    <select name="" id="">
                                        <option value="">Create a new email</option>

                                    </select>
                                </div>
                                <div className="inputField">
                                    <select name="" id="">
                                        <option value="">Choose an email template</option>

                                    </select>
                                </div>
                                <div className="inputField">
                                    <select name="" id="">
                                        <option value="">Welcome email template</option>

                                    </select>
                                </div>
                            </div>
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label htmlFor="">Subject</label>
                                    <div className="inputSubject icon">
                                        <p>Welcome <span>First Name</span> <span>Last Name</span> to Tier5 Partnership Program</p>
                                    </div>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="">To</label>
                                    <input className="icon" type="text" name="" id=""/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="">CC</label>
                                    <input className="icon" type="text" name="" id=""/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="">BCC</label>
                                    <input className="icon" type="text" name="" id=""/>
                                </div>
                                <div className="inputField">
                                    <label htmlFor="">Body</label>
                                    <textarea name="" id="" placeholder="jhfgj"></textarea>
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
export default Email;