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
    const [events, setEvents] = useState(props.event ? props.event : {
        appointmentCreate: false,
        appointmentCanceled: false,
        appointmentRescheduled: false,
        appointmentCompleted: false,
        appointmentMissed: false,
        appointmentDayBefore: false,
        day: "1"
    });
    const [nodeId, setNodeId] = useState(props.nodeId);

    const changeEvent = async (e) => {
        events[e.target.value] = e.target.checked;
    }
    const changeDay = (e) => {
        events['day'] = e.target.value;
    }
    const saveSettings = async (e) => {
        try {
            let fields = { 'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email' } // Sample
            if (events.appointmentCreate
                || events.appointmentCanceled
                || events.appointmentRescheduled
                || events.appointmentCompleted
                || events.appointmentMissed
                || events.appointmentDayBefore
            ) {
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
                                <div className="">
                                    <label htmlFor="">Events</label>
                                    <div><label><input type="checkbox" value="appointmentCreate"
                                                       defaultChecked={events.appointmentCreate}
                                                       onChange={changeEvent}/> On Create </label></div>
                                    <div><label><input type="checkbox" value="appointmentCanceled"
                                                       defaultChecked={events.appointmentCanceled}
                                                       onChange={changeEvent}/> On Cancel </label></div>
                                    <div><label><input type="checkbox" value="appointmentRescheduled"
                                                       defaultChecked={events.appointmentRescheduled}
                                                       onChange={changeEvent}/> On Re-schedule </label></div>
                                    <div><label><input type="checkbox" value="appointmentCompleted"
                                                       defaultChecked={events.appointmentCompleted}
                                                       onChange={changeEvent}/> On Complete </label></div>
                                    <div><label><input type="checkbox" value="appointmentMissed"
                                                       defaultChecked={events.appointmentMissed}
                                                       onChange={changeEvent}/> On Missed </label></div>
                                    <div><label><input type="checkbox" value="appointmentDayBefore"
                                                       defaultChecked={events.appointmentDayBefore}
                                                       onChange={changeEvent}/>
                                        &nbsp; On &nbsp;
                                        <select value={events.day} onChange={changeDay} >
                                            {(() => {
                                                let options = [];
                                                for (let i = 1; i < 31; i++) {
                                                    options.push(<option value={i}>{i}</option>);
                                                }
                                                return options;
                                            })()}
                                        </select>
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