import React, {useEffect, useState, createRef, useRef} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import Select from "react-select";
import {TagServices} from "../../../../services/setup/tagServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import Loader from "../../../shared/Loader";
import {AutomationServices} from "../../../../services/automation/AutomationServices";

const AutomationModal = (props) => {
    const dispatch = useDispatch();
    const [addAutomation, setAddAutomation] = useState(props.automationId);
    const [removeAutomation, setRemoveAutomation] = useState(props.automationId);
    const [events, setEvents] = useState(props.events ? props.events : {
        addAutomation: false,
        removeAutomation: false
    });
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const changeEvent = async (e) => {
        events[e.target.value] = e.target.checked;
        const name = e.target.value;
        if (name === 'addAutomation') {
            setEvents({
                addAutomation: true,
                removeAutomation: false
            })
        } else {
            setEvents({
                addAutomation: false,
                removeAutomation: true
            })
        }
    }

    const addAutomationHandeler = (e) => {
        setAddAutomation(e);
    }

    const removeAutomationHandeler = (e) => {
        setRemoveAutomation(e);
    }

    const fetchAutomations = async () => {
        try {
            setIsLoading(true);
            let result = await AutomationServices.getAutomations('all');
            const optionSet = result.data ? (result.data.data ? result.data.data : []) : [];
            setIsLoading(false);
            let options = [];
            await optionSet.forEach((value) => {
                options.push({
                    value: value._id,
                    label: value.name
                })
            });
            setOptions(options);
        } catch (e) {
            setIsLoading(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }

    }
    const saveAutomation = () => {
        if ((events.addAutomation && addAutomation) || (events.removeAutomation && removeAutomation)) {
            props.saveAutomation(props.elem.id, events, events.addAutomation ? addAutomation : removeAutomation);
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "Please select a Option and a automation.",
                typeMessage: 'error'
            });
        }
    }
    useEffect(() => {
        fetchAutomations();
    }, [])
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className="nodeSettingModal automationActionSetting">
                    <div className="formHead">
                        <div className="heading">
                            <p>Automation Action Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal"/>
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoading ? <Loader/> : ''}
                        <div className="formBodyContainer">
                            <div className="formFieldsArea">
                                <label htmlFor="">Events</label>
                                <ul className='listTag'>
                                    <li>
                                        <label className="custonRadio cusCheckBox">
                                            <input type="radio"
                                                   name="automation"
                                                   value="addAutomation"
                                                   defaultChecked={events.addAutomation}
                                                   onChange={changeEvent}
                                            />
                                            <span className="checkmark"></span>Add to Automation
                                        </label>
                                        {isLoading ? <Loader/> : ''}
                                        {events.addAutomation && <div className="inFormField">
                                            <Select
                                                className="multiSelect"
                                                name="automation"
                                                options={options}
                                                value={addAutomation}
                                                onChange={(e) => addAutomationHandeler(e)}
                                                placeholder="Select"
                                            />
                                        </div>}
                                    </li>
                                    <li>
                                        <label className="custonRadio cusCheckBox">
                                            <input type="radio"
                                                   name="automation"
                                                   value="removeAutomation"
                                                   defaultChecked={events.removeAutomation}
                                                   onChange={changeEvent}
                                            />
                                            <span className="checkmark"></span>Remove from Automation
                                        </label>
                                        {events.removeAutomation &&
                                            <div className="inFormField">
                                                <Select
                                                    className="multiSelect"
                                                    name="automation"
                                                    options={options}
                                                    value={removeAutomation}
                                                    onChange={(e) => removeAutomationHandeler(e)}
                                                    placeholder="Select"
                                                />
                                            </div>}
                                    </li>
                                </ul>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveAutomation}>Save <img src={chevron_right_white_24dp} alt=""/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default AutomationModal;