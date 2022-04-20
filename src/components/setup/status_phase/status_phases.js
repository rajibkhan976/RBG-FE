import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import plus_icon from "../../../../src/assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../src/assets/images/info_3dot_icon.svg";
import info_3dot_white from "../../../../src/assets/images/info_3dot_white.svg";

import CategoryPhases from "./categoryPhases"
import StatusAddField from "./statusAddField"
import {PhasesServices} from "../../../services/contact/phasesServices";
import {StatusServices} from "../../../services/contact/StatusServices";
import noRecords from "../../../assets/images/noRecords.svg";
import Moment from "moment";
import ConfirmBox from "../../shared/confirmBox";
import * as actionTypes from "../../../actions/types";
import {useDispatch} from "react-redux";

const StatusPhases = (props) => {
    document.title = "Red Belt Gym - Status and Phase";
    const [isLoader, setIsLoader] = useState(false);
    const [option, setOption] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [statusToggleIndex, setStatusToggleIndex] = useState();
    const [phases, setPhases] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedPhase, setSelectedPhase] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [modalValue, setModalValue] = useState({});
    const [isConfirmed, setConfirmed] = useState({
        show: false,
        id: null,
    });
    const dispatch = useDispatch();
    const openAddStatusFieldHandler = (event) =>{
        if (phases.length) {
            setModalValue({});
            setOpenModal(true);
        } else {
            setShowErrorMessage(true);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please create a phase first.',
                typeMessage: 'warning'
            });
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 100);
        }

    }
    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };
    const statusToogle = async (elem) => {
        try {

        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
        const payload = {
            phaseId: elem.phaseId,
            name: elem.name,
            desc: elem.description,
            id: elem._id,
            status: !elem.status
        }
        setIsLoader(true);
        await StatusServices.saveStatus(payload);
        let localPhases = phases;
        let searchResultPhases = phases.find(ele => ele._id === elem.phaseId);
        let indexPhases = phases.indexOf(searchResultPhases);
        let searchResultStatus = searchResultPhases.statuses.find(ele => ele._id === elem._id);
        let indexStats = searchResultPhases.statuses.indexOf(searchResultStatus);
        searchResultStatus.status = !searchResultStatus.status;
        searchResultPhases.statuses[indexStats] = searchResultStatus;
        localPhases[indexPhases] = searchResultPhases;
        setPhases(phases);
        setIsLoader(false);
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: 'Status updated successfully.',
            typeMessage: 'success'
        });
    }
    const closeCustomModal = () =>{
        setOpenModal(false);
    }
    const fetchPhases = async () => {
        try {

        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
        setIsLoader(true);
        let phases = await PhasesServices.fetchPhases();
        setIsLoader(false);
        setPhases(phases.phases);
    }
    const changePhase = async (id) => {
        if (id !== '') {
            setSelectedPhase(id);
            let selectedPhaseFilter = phases.filter(elem => elem._id === id);
            setStatuses(selectedPhaseFilter[0].statuses);
        }
    }
    const openEditStatusModal = (elem) => {
        setModalValue(elem);
        setOpenModal(true);
    }
    const deleteStatus = async (elem, isConfirmed = null) => {
        setOption(null);
        if (isConfirmed == null && elem.hasOwnProperty('_id')) {
            setConfirmed({
                show: true,
                id: elem,
            });
        } else if (isConfirmed === "cancel") {
            setConfirmed({
                show: false,
                id: null,
            });
        } else {
            try {
                setConfirmed({
                    show: false,
                    id: null,
                });
                setIsLoader(true);
                await StatusServices.deleteStatus(elem._id);
                setIsLoader(false);
                let localPhases = phases;
                let searchResultPhases = phases.find(ele => ele._id === elem.phaseId);
                let indexPhases = phases.indexOf(searchResultPhases);
                let searchResultStatus = searchResultPhases.statuses.find(ele => ele._id === elem._id);
                let indexStats = searchResultPhases.statuses.indexOf(searchResultStatus);
                searchResultPhases.statuses.splice(indexStats, 1);
                localPhases[indexPhases] = searchResultPhases;
                setPhases(phases);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: 'Status deleted successfully.',
                    typeMessage: 'success'
                });
            } catch (e) {
                setIsLoader(false);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            }
        }
    }
    const createdStatus = (elem) => {
        setOption(null);
        let localPhases = phases;
        let searchResultPhases = phases.find(ele => ele._id === elem.phaseId);
        let indexPhases = phases.indexOf(searchResultPhases);
        if (searchResultPhases.statuses === undefined) {
            searchResultPhases.statuses = [];
            searchResultPhases.statuses[0] = elem
        } else {
            let searchResultStatus = searchResultPhases.statuses.find(ele => ele._id === elem._id);
            let indexStats = searchResultPhases.statuses.indexOf(searchResultStatus);
            searchResultPhases.statuses.push(elem);
            searchResultPhases.statuses[indexStats] = searchResultStatus;
        }
        localPhases[indexPhases] = searchResultPhases;
        setPhases(phases);
        if (selectedPhase) {
            let selectedPhaseFilter = localPhases.filter(elem => elem._id === selectedPhase);
            setStatuses(selectedPhaseFilter[0].statuses);
        }
    }
    const editStatus = (payload) => {
        setOption(null);
        let localPhases = phases;
        let searchResultPhases = phases.find(ele => ele._id === payload.phaseId);
        let indexPhases = phases.indexOf(searchResultPhases);
        let searchResultStatus = searchResultPhases.statuses.find(ele => ele._id === payload.id);
        let indexStats = searchResultPhases.statuses.indexOf(searchResultStatus);
        searchResultStatus.name = payload.name;
        searchResultStatus.description = payload.desc;
        searchResultStatus.phaseId = payload.phaseId;
        searchResultStatus.status = payload.status;
        searchResultPhases.statuses[indexStats] = searchResultStatus;
        localPhases[indexPhases] = searchResultPhases;
        setPhases(phases);
    }
    const updatePhases = (createPhase, id, name) => {
        if (id) {
            let element = phases.map((el) => {
                if (el._id === id) {
                    el.name = name;
                    return {...el};
                }  else {
                    return {...el};
                }
            });
            setPhases(element);
        } else {
            setPhases([...phases, createPhase]);
        }
    }
    const deletePhase = (elem) => {
        let element = phases.filter(el => el._id !== elem);
        setPhases(element);
    }
    useEffect(() => {
        fetchPhases();
    }, [])
    return (
        <>
            {isConfirmed.show ? (
                <ConfirmBox
                    callback={(confirmedMsg) =>
                        deleteStatus(isConfirmed.id, confirmedMsg)
                    }
                />
            ) : (
                ""
            )}
            <div className="dashInnerUI phases">
                {isLoader ? <Loader /> : ''}
                <div className="userListHead phases">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup </li>
                            <li>Status &amp; Phase</li>
                        </ul>
                        <h2 className="inDashboardHeader">
                            Status &amp; Phase
                        </h2>
                        <p className="userListAbout">Manage your statuses for the respective phases.</p>
                    </div>
                    <button className="creatUserBtn"
                            onClick={openAddStatusFieldHandler}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Add a Status</span>
                    </button>
                </div>
                <div className="userListBody">
                    { phases && phases.length && statuses && statuses.length > 0 ?
                        <ul className="customtableListing">
                            <li className="listHeading">
                                <div>Status Name</div>
                                <div className="bigspace">Description</div>
                                <div>Created at</div>
                                <div className="vacent"></div>
                            </li>
                            { statuses.map((elem, key) => {
                                return (
                                    <li>
                                        <div>{elem.name}</div>
                                        <div className="bigspace colorFade">{elem.description}</div>
                                        <div className="colorFade">{Moment(elem.createdAt).isValid() ? Moment(elem.createdAt).format('LLL') : elem.createdAt}</div>
                                        <div>
                                            {/*<label className={elem.status ? "toggleBtn active" : "toggleBtn"}>
                                                <input type="checkbox"
                                                       value={elem.status}
                                                       onChange={() => {
                                                           statusToogle(elem);
                                                       }}/>
                                                <span className="toggler"></span>
                                            </label>*/}
                                            <div className="info_3dot_icon">
                                                <button className="btn"
                                                        onClick={() => {
                                                            toggleOptions(key);
                                                        }}>
                                                    <img src={info_3dot_icon} alt=""/>
                                                </button>
                                            </div>
                                            <div className={
                                                option === key
                                                    ? "dropdownOptions listOpen"
                                                    : "listHide"
                                            }>
                                                <button className="btn btnEdit" onClick={() => openEditStatusModal(elem)}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                </span>
                                                    Edit
                                                </button>
                                                <button className="btn btnDelete" onClick={() => deleteStatus(elem)}>
                                <span>
                                    <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                </span>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            )}
                        </ul>
                        : (
                            <div className="createNew noInfos">
                                <div className="noRecordsImgWraper">
                                    <img src={noRecords} className="noRecords" alt="" />
                                    <h4>No Status Found</h4>
                                    <p>No statuses have been listed here yet</p>
                                </div>
                                <button className="creatUserBtn buttonForNoRecord"
                                        onClick={openAddStatusFieldHandler}>
                                    <img className="plusIcon" src={plus_icon} alt="" />
                                    <span>Add a Status</span>
                                </button>
                            </div>
                        )}
                </div>
            </div>

            <CategoryPhases phases={phases} changePhase={changePhase} showErrorMessage={showErrorMessage} updatePhases={updatePhases} deletePhase={deletePhase}/>
            {openModal &&
                <StatusAddField phases={phases} selectedPhaseId={selectedPhase} modalValue={modalValue} createdStatus={createdStatus}
                                editStatus={editStatus} closeAddCustomModal={(param) => closeCustomModal(param)}
                />
            }
        </>
    )
};

export default StatusPhases;
