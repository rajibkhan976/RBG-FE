import React, {memo, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../../shared/Loader";

const AppointmentTriggerSetting = (props) => {
    const dispatch = useDispatch();
    const [module, setModule] = useState(props.module ? props.module : 'contact');
    const [isLoader, setIsLoader] = useState(false);
    const [eventsArray, setEvents] = useState(props.event ? props.event : {
        appointmentCreate: false,
        appointmentCanceled: false,
        appointmentRescheduled: false,
        appointmentCompleted: false,
        appointmentMissed: false,
        appointmentDayBefore: false,
        day: "0"
    });
    const [nodeId, setNodeId] = useState(props.nodeId);

    const changeEvent = async (e) => {
        setEvents(prevState => ({
          ...prevState,
            [e.target.value]: e.target.checked
        }));
    }
    const changeDay = (e) => {
        if (e.target.value < 101 && e.target.value > 0) {
            setEvents(prevState => {
                return {
                    ...prevState,
                    day: e.target.value
                }
            });
            setEvents(prevState => ({
                ...prevState,
                day: e.target.value
            }));
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
            let fields = { 'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email' } // Sample
            if (eventsArray.appointmentCreate
                || eventsArray.appointmentCanceled
                || eventsArray.appointmentRescheduled
                || eventsArray.appointmentCompleted
                || eventsArray.appointmentMissed
                || eventsArray.appointmentDayBefore
            ) {
                if (eventsArray.appointmentDayBefore && (!eventsArray.day || ((eventsArray.day % 1) != 0)  || parseInt(eventsArray.day) <= 0 || parseInt(eventsArray.day) > 101)) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: "Please provide a valid day value.",
                        typeMessage: 'error'
                    });
                    return false;
                }
                setIsLoader(true);
                let fieldsApiResponse = await ContactService.fetchFields();
                setIsLoader(false);
                // Contact fields
                fields = fieldsApiResponse.fields

                // Appointment fields
                fields.appointment_agenda = "text";
                fields.appointment_date = "date";
                fields.appointment_toTime = "text";
                fields.appointment_toDateTime = "text";
                fields.appointment_fromTime = "text";
                fields.appointment_fromDateTime = "text";
                fields.appointment_tags = "text";
                fields.appointment_status = "text";
                fields.appointment_createdAt = "text";
                props.saveFieldtrigger(module, eventsArray, nodeId, fields)
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
                            <p>Appointment Trigger Settings</p>
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
                                <div className="formBodyContainerDiv">
                                    <label htmlFor="">Events</label>
                                    <div><label><input type="checkbox" value="appointmentCreate"
                                                       defaultChecked={eventsArray.appointmentCreate}
                                                       onChange={changeEvent}/> On Create </label></div>
                                    <div><label><input type="checkbox" value="appointmentCanceled"
                                                       defaultChecked={eventsArray.appointmentCanceled}
                                                       onChange={changeEvent}/> On Cancel </label></div>
                                    <div><label><input type="checkbox" value="appointmentRescheduled"
                                                       defaultChecked={eventsArray.appointmentRescheduled}
                                                       onChange={changeEvent}/> On Re-schedule </label></div>
                                    <div><label><input type="checkbox" value="appointmentCompleted"
                                                       defaultChecked={eventsArray.appointmentCompleted}
                                                       onChange={changeEvent}/> On Complete </label></div>
                                    <div><label><input type="checkbox" value="appointmentMissed"
                                                       defaultChecked={eventsArray.appointmentMissed}
                                                       onChange={changeEvent}/> On Missed </label></div>
                                    <div><label><input type="checkbox" value="appointmentDayBefore"
                                                       defaultChecked={eventsArray.appointmentDayBefore}
                                                       onChange={changeEvent}/>
                                        &nbsp; On &nbsp;
                                        <input type="number" className="inputFieldEvent" value={eventsArray.day} onChange={changeDay} placeholder="Ex: 5"/>
                                        &nbsp; days before
                                    </label></div>
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
export default AppointmentTriggerSetting;