import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import info_3dot_white from "../../../../src/assets/images/info_3dot_white.svg";
import {PhasesServices} from "../../../services/contact/phasesServices";
import * as actionTypes from "../../../actions/types";
import {useDispatch} from "react-redux";
import ConfirmBox from "../../shared/confirmBox";
import cross from "../../../assets/images/cross.svg";
import { Scrollbars } from "react-custom-scrollbars-2";

const CategoryPhases = (props) => {
    document.title = "Red Belt Gym - Status and Phase";
    const [isLoader, setIsLoader] = useState(false);
    const [option, setOption] = useState(null);
    const [phases, setPhases] = useState([]);
    const [editPhases, setEditPhases] = useState("");
    const [editPhasesError, setEditPhasesError] = useState(false);
    const [phasesId, setPhasesId] = useState(0);
    const [selectedPhaseId, setSelectedPhaseId] = useState('');
    const [isConfirmed, setConfirmed] = useState({
        show: false,
        id: null,
    });
    const dispatch = useDispatch();
    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };
    const handelPhaseCreate = (event) => {
        if (event.target.value.length > 20) {
            setEditPhasesError(true);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Max limit for phase name reached.',
                typeMessage: 'warning'
            });
        } else {
            setEditPhases(event.target.value);
            setEditPhasesError(false);
        }
    }
    const clickPhases = async (event) => {
        event.preventDefault();
        try {
            if (editPhases.trim() !== "") {
                let payload = {
                    name: editPhases.trim(),
                    id: phasesId
                }
                setIsLoader(true);
                let createPhase = await PhasesServices.savePhases(payload);
                setIsLoader(false);
                props.updatePhases(createPhase, phasesId, editPhases)
                if (phasesId) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Phase updated successfully.',
                        typeMessage: 'success'
                    });
                } else {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Phase created successfully.',
                        typeMessage: 'success'
                    });
                }
            } else {
                setEditPhasesError(true)
            }
            setEditPhases("");
            setPhasesId(0);
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
        
    }
    useEffect(() => {
        setTimeout(() => {
            setEditPhasesError(false);
        }, 5000);
    }, [editPhasesError])
    const showNo = (elem) => {
        setSelectedPhaseId(elem._id);
    }
    const editPhase = (elem) => {
        setOption(null);
        setEditPhases(elem.name);
        setPhasesId(elem._id);
    }
    const deletePhase = async (elem, isConfirmed = null) => {
        setOption(false);
        if (isConfirmed == null && elem._id) {
            setConfirmed({
                show: true,
                id: elem._id,
            });
        } else if (isConfirmed === "cancel") {
            setConfirmed({
                show: false,
                id: null,
            });
        } else {
            setConfirmed({
                show: false,
                id: null,
            });
            try {
                setIsLoader(true);
                await PhasesServices.deletePhases(elem);
                setIsLoader(false);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: 'Phase deleted successfully.',
                    typeMessage: 'success'
                });
                props.deletePhase(elem)
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
    const removeEdit = () => {
        setPhasesId(0);
        setEditPhases("");
    }
    useEffect(() => {
        props.changePhase(selectedPhaseId)
    }, [selectedPhaseId])
    useEffect(() => {
        setPhases(props.phases);
        if (props.phases.length) {
            setSelectedPhaseId(props.phases[0]._id);
        }
    }, [props.phases]);
    useEffect(() => {
        if (props.showErrorMessage) {
            setEditPhasesError(true);
        }
    }, [props.showErrorMessage])
    return (
        <>
            {isConfirmed.show ? (
                <ConfirmBox
                    callback={(confirmedMsg) =>
                        deletePhase(isConfirmed.id, confirmedMsg)
                    }
                />
            ) : (
                ""
            )}
            <div className="phasesRightSetUpPanel">
                {isLoader ? <Loader /> : ''}
                <Scrollbars
                    renderThumbVertical={(props) => <div className="thumb-vertical" />}
                >
                <div className="innerScroll">
                    <h3 className="productListingHeader">Phase</h3>
                    <div className="productSearchPanel" >
                        <form method="post">
                            {phasesId ? <button className="deleteIt" onClick={removeEdit}><img src={cross} alt="" /></button> : ''}
                            <input type="text" name="phasesName" placeholder="Ex. Phase 1" value={editPhases}
                                   onChange={handelPhaseCreate} className={editPhasesError ? "errorInput addPhases" : "addPhases"}/>
                            <button className="btn" type="submit" onClick={clickPhases}>{phasesId ? 'Update' : 'Add'} Phases
                                <img src={arrowRightWhite} alt=""/>
                            </button>
                        </form>
                    </div>

                    <ul className="ProCategoryListing">
                        {phases.map((elem, key) => {
                            return (
                                <li key={elem._id} className={selectedPhaseId === 0 ? (key === 0 ? 'active' : '') :
                                    (selectedPhaseId === elem._id ? 'active' : '')}><button className="bigListName" onClick={() => showNo(elem)}> {elem.name} {elem.statuses && elem.statuses.filter(ele => ele._id !== undefined).length ? "(" +elem.statuses.length+")" : "(0)" } </button>
                                    <button className="showList" onClick={() => toggleOptions(key)}>
                                        <img src={info_3dot_white} alt="" />
                                    </button>
                                    <div className={
                                        option === key
                                            ? "dropdownOptions listOpen"
                                            : "listHide"
                                    }>
                                        <button className="btn btnEdit" onClick={() => editPhase(elem)}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                    </span>
                                            Edit
                                        </button>
                                        <button className="btn btnDelete" onClick={() => deletePhase(elem)}>
                                    <span>
                                        <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                    </span>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            )}
                        )}

                    </ul>
                </div>

                </Scrollbars>

            </div>
        </>
    )
};

export default CategoryPhases;
