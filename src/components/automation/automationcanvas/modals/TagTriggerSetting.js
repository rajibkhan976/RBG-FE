import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../actions/types";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../../shared/Loader";
import {AutomationServices} from "../../../../services/automation/AutomationServices";
import Select from "react-select";

const TagTriggerSetting = (props) => {
    const dispatch = useDispatch();
    const module = props.module ? props.module : 'tags';
    const [isLoader, setIsLoader] = useState(false);
    const [options, setOptions] = useState([]);
    const [events, setEvents] = useState( props.event ? props.event : {
        addTags: true,
        removeTags: false,
        selectedTag: {value: '', label: 'Please select a tag.'}
    });
    const changeEvent = async (e) => {
        if (e.target.value === "addTags") {
            setEvents(prevState => ({
                ...prevState,
                addTags: true,
                removeTags: false
            }));
        } else {
            setEvents(prevState => ({
                ...prevState,
                addTags: false,
                removeTags: true
            }));
        }

    }
    const saveSettings = async (e) => {
        try {
            let fields = { 'fname': 'text', 'lname': 'text', 'phone': 'numeric', 'email': 'email' } // Sample
            if (events.addTags || events.removeTags) {
                if (events.selectedTag.value === "") {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: "Please select tag.",
                        typeMessage: 'error'
                    });
                    return false;
                }
                setIsLoader(true);
                let fieldsApiResponse = await ContactService.fetchFields();
                setIsLoader(false);
                // Contact fields
                fields = fieldsApiResponse.fields
                props.saveFieldtrigger(module, events, props.nodeId, fields)
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
    const fetchTagStatusPhase = async () => {
        try {
            let resp = await AutomationServices.fetchTagStatusPhase();
            console.log("resp", resp)
            let options = [{
                value: "",
                label: "Please select a tag."
            }];
            await resp.tags.forEach((value) => {
                options.push({
                    value: value._id,
                    label: value.name
                })
            });
            setOptions(options);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    }
    const addTagHandeler = (e) => {
        setEvents(prevState => ({
            ...prevState,
            selectedTag: e
        }));
    }
    useEffect(async () => {
        await fetchTagStatusPhase();
    }, [])
    return (
        <React.Fragment>
            <div className="automationModal filterModal triggerSetting">
                <div className="nodeSettingModal transactionModal notOverlap">
                    <div className="formHead">
                        <div className="heading">
                            <p>Tag Trigger Settings</p>
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
                                            {events.addTags && <div className="inFormField">
                                                <Select
                                                    className="multiSelect"
                                                    name="addTags"
                                                    options={options}
                                                    value={events.selectedTag}
                                                    onChange={(e) => addTagHandeler(e)}
                                                    placeholder="Select a tag"
                                                />
                                            </div>}
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
                                            {events.removeTags && <div className="inFormField">
                                                <Select
                                                    className="multiSelect"
                                                    name="removeTags"
                                                    options={options}
                                                    value={events.selectedTag}
                                                    onChange={(e) => addTagHandeler(e)}
                                                    placeholder="Select a tag"
                                                />
                                            </div>}
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