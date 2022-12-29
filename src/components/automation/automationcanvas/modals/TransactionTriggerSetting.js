import React, {memo, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../../shared/Loader";
import Select from "react-select";

const TransactionTriggerSetting = (props) => {
    const dispatch = useDispatch();
    const [module, setModule] = useState(props.module ? props.module : 'contact');
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState(props.event ? props.event : {
        transactionSuccess: false,
        transactionFailed: false,
        transactionBefore: false,
        day: "1"
    });
    const [nodeId, setNodeId] = useState(props.nodeId);
    

    const options = [
        { value: 'Monday', label: 'Mon' },
        { value: 'Tuesday', label: 'Tue' },
        { value: 'Wednesday', label: 'Wed' },
        { value: 'Thursday', label: 'Thu' },
        { value: 'Friday', label: 'Fri' },
        { value: 'Saturday', label: 'Sat' },
        { value: 'Sunday', label: 'Sun' }
    ];
    const [upCommingDaysStatus, setUpCommingDaysStatus] = useState(false);
    const changeEvent = async (e) => {
        events[e.target.value] = e.target.checked;
        if(e.target.value == "transactionUpcoming"){
            if(e.target.checked){
                // alert("transactionUpcoming");
                setUpCommingDaysStatus(true);
            }else{
                setUpCommingDaysStatus(false);
            }
        }
    }
    const selectStyle = {
        control: base => ({
            ...base,
            border: 0,
            boxShadow: "none"
          })
    }
    const changeDay = (e) => {
        events['day'] = e.target.value;
    }
    const saveSettings = async (e) => {
        try {
            let fields = {'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email'} // Sample
            if (events.transactionSuccess || events.transactionFailed || events.transactionBefore) {
                setIsLoader(true);
                let fieldsApiResponse = await ContactService.fetchFields();
                setIsLoader(false);
                // Contact fields
                fields = fieldsApiResponse.fields
                // Appointment fields
                fields.transaction_date = "date";
                fields.payment_for = "text";
                fields.transaction_type = "text";
                fields.transaction_for = "text";
                fields.amount = "numeric";
                fields.payment_via = "text";
                fields.status = "text";
                fields.refunded_amount = "numeric";
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
                            <p>Transaction Trigger Settings</p>
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
                                <div className="">
                                    <label htmlFor="">Events</label>
                                    <div><label><input type="checkbox" value="transactionSuccess"
                                                       defaultChecked={events.transactionSuccess}
                                                       onChange={changeEvent}/> On Success </label></div>
                                    <div><label><input type="checkbox" value="transactionFailed"
                                                       defaultChecked={events.transactionFailed}
                                                       onChange={changeEvent}/> On Failed </label></div>
                                    <div><label><input type="checkbox" value="transactionBefore"
                                                       defaultChecked={events.transactionBefore}
                                                       onChange={changeEvent}/> On &nbsp;
                                        <select value={events.day} onChange={changeDay} >
                                            {(() => {
                                                let options = [];
                                                for (let i = 1; i < 31; i++) {
                                                    options.push(<option value={i}>{i}</option>);
                                                }
                                                return options;
                                            })()}
                                        </select>
                                        &nbsp; Days before </label></div>
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
export default TransactionTriggerSetting;