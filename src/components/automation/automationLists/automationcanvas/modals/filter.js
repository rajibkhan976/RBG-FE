import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../../assets/images/close_white_24dp.svg";
import edit_grey from "../../../../../assets/images/edit_grey.svg";
import trashIcon from "../../../../../assets/images/iconfinder_trash-2_2561228.svg";
import whiteAddIcon from "../../../../../assets/images/add_white_24dp.svg";
import whiteSlash from "../../../../../assets/images/remove_white_24dp.svg";
import chevron_right_white_24dp from "../../../../../assets/images/chevron_right_white_24dp.svg";

function Filter() {
    const [automationModal, setAutomationModal] = useState(null);
    const closeFilterModal = () => {
        setAutomationModal(null);
    };
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className="nodeSettingModal filterSetting">
                    <div className="formHead">
                        <div className="heading">
                            <p>Filter Settings</p>
                        </div>
                        <div className="closeButton">
                            <button className="closeFilterModal" onClick={closeFilterModal}>
                                <img src={closewhite24dp} alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="nameArea">
                                <div className="changeFilterName">
                                    <div className="filterNmaeLabel">
                                        Filter Name
                                    </div>
                                    <div className="filterName">
                                        <p>Hot Leads</p>
                                        <button>
                                            <img src={edit_grey} alt=""/>
                                        </button>
                                    </div>
                                </div>
                                <div className="editRules">
                                    <p>Edit Rules</p> <span>2</span>
                                </div>
                            </div>
                            <div className="formFieldsArea">
                                <label htmlFor="">Only continue if</label>
                                <div className="formFields">
                                    <div className="formFields1">
                                        <div className="inputField field_1">
                                            <select name="" id="">
                                                <option value="">Gender</option>

                                            </select>
                                        </div>
                                        <div className="inputField field_2">
                                            <select name="" id="">
                                                <option value="">Equal to</option>

                                            </select>
                                        </div>
                                        <div className="inputField field_3">
                                            <select name="" id="">
                                                <option value="">Female</option>

                                            </select>
                                        </div>
                                        <div className="deleteButton">
                                            <button><img src={trashIcon} alt=""/></button>
                                        </div>
                                    </div>
                                    <div className="addFieldsButton">
                                        <button className="addFields"><img src={whiteAddIcon} alt=""/></button>
                                    </div>

                                    <div className="formFields1">
                                        <div className="inputField field_1">
                                            <select name="" id="">
                                                <option value="">Gender</option>

                                            </select>
                                        </div>
                                        <div className="inputField field_2">
                                            <select name="" id="">
                                                <option value="">Equal to</option>

                                            </select>
                                        </div>
                                        <div className="inputField field_3">
                                            <select name="" id="">
                                                <option value="">Female</option>

                                            </select>
                                        </div>
                                        <div className="deleteButton">
                                            <button><img src={trashIcon} alt=""/></button>
                                        </div>
                                    </div>
                                    <div className="addFormFieldsButton">
                                        <button>
                                            <span className="addFields"><img src={whiteAddIcon} alt=""/></span>
                                            And
                                        </button>

                                    </div>
                                </div>


                            </div>

                            <div className="addFormFieldsButton orButton">
                                <button>
                                    <span className="addFields"><img src={whiteSlash} alt=""/></span>
                                    or
                                </button>
                            </div>
                            <div className="formFieldsArea">
                                <label htmlFor="">Only continue if</label>
                                <div className="formFields">
                                    <div className="formFields1">
                                        <div className="inputField field_1">
                                            <select name="" id="">
                                                <option value="">Gender</option>

                                            </select>
                                        </div>
                                        <div className="inputField field_2">
                                            <select name="" id="">
                                                <option value="">Equal to</option>

                                            </select>
                                        </div>
                                        <div className="inputField field_3">
                                            <select name="" id="">
                                                <option value="">Female</option>

                                            </select>
                                        </div>
                                        <div className="deleteButton">
                                            <button><img src={trashIcon} alt=""/></button>
                                        </div>
                                    </div>
                                    <div className="addOrButton">
                                        <div className="addFormFieldsButton">
                                            <button>
                                                <span className="addFields"><img src={whiteAddIcon} alt=""/></span>
                                                And
                                            </button>

                                        </div>
                                        <div className="addFormFieldsButton orButton">
                                            <button>
                                                <span className="addFields"><img src={whiteSlash} alt=""/></span>
                                                or
                                            </button>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="saveButton updateButton">
                                <button>Update <img src={chevron_right_white_24dp} alt=""/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};