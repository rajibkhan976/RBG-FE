import React, {memo, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../../shared/Loader";

const AttendanceTriggerSetting = (props) => {
    const dispatch = useDispatch();
    const [module, setModule] = useState(props.module ? props.module : 'contact');
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState(props.event ? props.event : {
        create: false,
        update: false,
        delete: false,
        lastAttended: false,
        day: "1"
    });
    const [nodeId, setNodeId] = useState(props.nodeId);

    const changeEvent = async (e) => {
        events[e.target.value] = e.target.checked;
    }
    const changeDay = (e) => {
        if (e.target.value < 101 && e.target.value > 0) {
            setEvents(prevState => {
                return {
                    ...prevState,
                    day: e.target.value
                }
            });
            events['day'] = e.target.value;
        } else {
            setEvents(prevState => {
                return {
                    ...prevState,
                    day: e.target.value
                }
            });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please input a number between 1 to 100',
                typeMessage: 'error'
            });
        }
    }
    const saveSettings = async (e) => {
        try {
            let fields = {'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email'} // Sample
            if (events.checkIn || events.lastAttended ) {
                if (events.lastAttended && (!events.day || parseInt(events.day) <= 0 || parseInt(events.day) > 101)) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: "Please provide the day value.",
                        typeMessage: 'error'
                    });
                    return false;
                }
                setIsLoader(true);
                let fieldsApiResponse = await ContactService.fetchFields();
                setIsLoader(false);
                fields = fieldsApiResponse.fields
                fields.checkedInAt = "date";
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
                            <p>Attendance Trigger Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoader ? <Loader/> : ""}
                        <div className="formBodyContainer">
                            <div className="formFieldsArea">
                                {/* <div className="inputField">
                                    <label htmlFor="">Module</label>
                                    <select name="" id="">
                                        <option value="">Contact</option>
                                    </select>
                                </div>*/}
                                <div className="formBodyContainerDiv">
                                    <label htmlFor="">Events</label>
                                    <div><label><input type="checkbox" value="checkIn" defaultChecked={events.checkIn}
                                                       onChange={changeEvent}/> On Check In </label></div>
                                    <div><label><input type="checkbox" value="lastAttended" defaultChecked={events.lastAttended}
                                                       onChange={changeEvent}/> Last attended in &nbsp;
                                        <input type="number" className="inputFieldEvent" value={events.day} onChange={changeDay} placeholder="Ex: 5"/>
                                        &nbsp; days ago </label></div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveSettings}>Save <img src={chevron_right_white_24dp} alt=""/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default AttendanceTriggerSetting;