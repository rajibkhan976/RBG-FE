import React, {memo, useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../actions/types";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import {ContactService} from "../../../../services/contact/ContactServices";
import Loader from "../../../shared/Loader";

const FieldTrigger = (props) => {
    const dispatch = useDispatch();
    const [module, setModule] = useState(props.module ? props.module : 'contact');
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState(props.event ? props.event : {
        create: false,
        update: false,
        delete: false
    });
    const [nodeId, setNodeId] = useState(props.nodeId);

    const changeEvent = async (e) => {
        events[e.target.value] = e.target.checked;
    }

    const saveSettings = async (e) => {
        try {
            let fields = {'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email'}
            if (events.create || events.update || events.delete) {
                setIsLoader(true);
                let fieldsApiResponse = await ContactService.fetchFields();
                setIsLoader(false);
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
            <div className="automationModalBg" onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Contact Trigger Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal"/>
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoader ? <Loader /> : ""}
                        <div className="formBodyContainer">
                            <div className="formFieldsArea">
                               {/* <div className="inputField">
                                    <label htmlFor="">Module</label>
                                    <select name="" id="">
                                        <option value="">Contact</option>
                                    </select>
                                </div>*/}
                                <div className="">
                                    <label htmlFor="">Events</label>
                                    <div><label><input type="checkbox" value="create" defaultChecked={events.create} onChange={changeEvent} /> On create </label></div>
                                    <div><label><input type="checkbox" value="update" defaultChecked={events.update} onChange={changeEvent} /> On update </label></div>
                                    <div><label><input type="checkbox" value="delete" defaultChecked={events.delete} onChange={changeEvent} /> On delete </label></div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveSettings}>Save <img src={chevron_right_white_24dp} alt=""/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default FieldTrigger;