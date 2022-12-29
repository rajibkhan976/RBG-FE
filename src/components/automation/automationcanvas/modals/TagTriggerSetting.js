import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../actions/types";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../../shared/Loader";

const TagTriggerSetting = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const [module, setModule] = useState(props.module ? props.module : 'tags');
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState( props.event ? props.event : {
        addTags: true,
        removeTags: false
    });
    const [nodeId, setNodeId] = useState(props.nodeId);

    const changeEvent = async (e) => {
        events[e.target.value] = e.target.checked;
    }
    const saveSettings = async (e) => {
        try {
            let fields = { 'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email' } // Sample
            if (events.addTags || events.removeTags) {
                setIsLoader(true);
                let fieldsApiResponse = await ContactService.fetchFields();
                setIsLoader(false);
                // Contact fields
                fields = fieldsApiResponse.fields
                props.saveFieldtrigger(module, events, nodeId, fields)
                props.closeFilterModal()
            } else {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: "Please select at least one event",
                    typeMessage: 'error'
                });
            }
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    }
    return (
        <React.Fragment>
            <div className="automationModal filterModal triggerSetting">
                <div className="nodeSettingModal transactionModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Tag  Trigger Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoader ? <Loader /> : ""}
                        <div className="formBodyContainer">
                            <div className="formFieldsArea">
                                <div className="tagTriggerSetting">
                                    <label htmlFor="">Events</label>
                                    <ul className="listTag">
                                        <li>
                                            <label className="custonRadio cusCheckBox">
                                                <input type="radio"
                                                    name="tags"
                                                    value="addTags"
                                                       defaultChecked={events.addTags ? "checked" : ""}
                                                    onChange={changeEvent}
                                                />
                                                <span className="checkmark"></span>Add Tags
                                            </label>
                                        </li>
                                        <li>
                                            <label className="custonRadio cusCheckBox">
                                                <input type="radio"
                                                    name="tags"
                                                    value="removeTags"
                                                    defaultChecked={events.removeTags ? "checked" : ""}
                                                    onChange={changeEvent}
                                                />
                                                <span className="checkmark"></span> Remove Tags </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveSettings}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default TagTriggerSetting;