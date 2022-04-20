import React, {useEffect, useState} from "react";
import Loader from "../../shared/Loader";
import crossTop from "../../../../src/assets/images/cross.svg";
import arrow_forward from "../../../../src/assets/images/arrow_forward.svg";
import custom_icon from "../../../../src/assets/images/loading1.svg";
import ErrorAlert from "../../shared/messages/error"
import {Scrollbars} from "react-custom-scrollbars-2";
import {StatusServices} from "../../../services/contact/StatusServices";
import * as actionTypes from "../../../actions/types";
import {useDispatch} from "react-redux";

const StatusAddField = (props) => {
    const [isLoader, setIsLoader] = useState(false);

    const [phases, setPhases] = useState([]);
    const [statusName, setStatusName] = useState("");
    const [statusDesc, setStatusDesc] = useState("");
    const [statusType, setStatusType] = useState("");

    const [popMsgerror, setPopMsgerror] = useState(false);
    const [popMsgsuccess, setPopMsgsuccess] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState("");
    const [statusId, setStatusId] = useState("");
    const dispatch = useDispatch();

    const addStatusNameHandler = (e) => {
        setStatusName(e.target.value);
    };
    const addStatusDescHandler = (e) => {
        setStatusDesc(e.target.value);
    };
    const addStatusTypeHandler = (e) => {
        setStatusType(e.target.value);
    };
    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        try {
            if (statusName !== "" && statusDesc !== "" && statusType !== "") {
                const payload = {
                    phaseId: statusType,
                    name: statusName,
                    desc: statusDesc,
                    id: statusId,
                    status: true
                }
                setIsLoader(true);
                let createStatus = await StatusServices.saveStatus(payload);
                if (statusId) {
                    props.editStatus(payload);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Status updated successfully',
                        typeMessage: 'success'
                    });
                } else {
                    props.createdStatus(createStatus);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Status created successfully',
                        typeMessage: 'success'
                    });
                }
                setIsLoader(false);
                setPopMsgsuccess(true);
                setStatusName("");
                setStatusDesc("");
                setStatusType("");
                props.closeAddCustomModal()
            } else {
                setPopMsgerror(true)
            }
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    };
    const handleStatusSubmitNew = async (e) => {
        e.preventDefault();
        try {
            if (statusName !== "" && statusDesc !== "" && statusType !== "") {
                const payload = {
                    phaseId: statusType,
                    name: statusName,
                    desc: statusDesc,
                    id: statusId,
                    status: true
                }
                setIsLoader(true);
                let createStatus = await StatusServices.saveStatus(payload);
                if (statusId) {
                    props.editStatus(payload);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Status updated successfully',
                        typeMessage: 'success'
                    });
                } else {
                    props.createdStatus(createStatus);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Status created successfully',
                        typeMessage: 'success'
                    });
                }
                setIsLoader(false);
                setPopMsgsuccess(true);
                setStatusName("");
                setStatusDesc("");
                setStatusType("");
            } else {
                setPopMsgerror(true)
            }
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    };
    useEffect(() => {
        setPhases(props.phases);
        setSelectedPhase(props.selectedPhaseId);
        setStatusType(props.selectedPhaseId);
        if (props.modalValue.hasOwnProperty('name')) {
            setStatusName(props.modalValue.name);
            setStatusDesc(props.modalValue.description);
            setStatusType(props.modalValue.phaseId);
            setStatusId(props.modalValue._id);
        }
    }, []);
    useEffect(() => {
        if (popMsgsuccess) setTimeout(() => {
            setPopMsgsuccess("")
        }, 2000);
        if (popMsgerror) setTimeout(() => {
            setPopMsgerror("")
        }, 2000);

    }, [popMsgerror, popMsgsuccess]);
    useEffect(() => {
        console.log(props.phases);
        setPhases(props.phases);
    }, [props.phases])
    return (

        <div className="modalBackdrop statusPhases">
            <div className="slickModalBody">
                {isLoader ? <Loader /> : ''}
                <div className="slickModalHeader">
                    <button className="topCross" onClick={props.closeAddCustomModal}><img src={crossTop} alt=""/>
                    </button>
                    <div className="circleForIcon"><img src={custom_icon} alt=""/></div>
                    <h3>{statusId ? 'Edit' : 'Add'} a Status</h3>
                    <p>Fill out below details to {statusId ? 'edit' : 'create a new Status'} </p>
                </div>
                <div className="modalForm ">
                    <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical"/>}>
                        <form>

                            <div className="formControl">
                                <label>Select Phase</label>
                                <select name="category" onChange={addStatusTypeHandler} value={statusType}>
                                    {
                                        phases.map((ele, key) => {
                                            return (
                                                <option value={ele._id} key={key}>{ele.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="formControl">
                                <label>Status Name</label>
                                <input type="text" name="" onChange={addStatusNameHandler} value={statusName}/>
                            </div>
                            <div className="formControl">
                                <label>Status Description</label>
                                <textarea onChange={addStatusDescHandler} value={statusDesc}> </textarea>
                            </div>
                            {(popMsgerror === true) &&
                                <ErrorAlert message="Fill Up all the field" extraclassName="addStatsPopMsg"/>}
                            <div className="modalbtnHolder">
                                {
                                    statusId ? <>
                                        <button onClick={handleStatusSubmit} type="submit"
                                                className="saveNnewBtn">
                                            <span>Edit</span><img src={arrow_forward} alt=""/></button>
                                    </> : <>
                                        <button onClick={handleStatusSubmit} type="submit"
                                                className="saveNnewBtn">
                                            <span>Save</span><img src={arrow_forward} alt=""/></button>
                                        <button onClick={handleStatusSubmitNew} type="reset"
                                                className="saveNnewBtn">
                                            <span>Save &amp; New</span><img src={arrow_forward} alt=""/></button>
                                    </>
                                }
                            </div>
                        </form>
                    </Scrollbars>
                </div>

            </div>
        </div>
    )
};

export default StatusAddField;
