import React, {useEffect, useState} from "react";
import arrowDown from "../../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import {PhasesServices} from "../../../services/contact/phasesServices";
import Loader from "../../shared/Loader";
import {utils} from "../../../helpers";
import * as actionTypes from "../../../actions/types";
import {useDispatch} from "react-redux";
import {ContactService} from "../../../services/contact/ContactServices";

function Update(props) {
    const [isLoader, setIsLoader] = useState(false);
    const [phases, setPhases] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedStatusError, setSelectedStatusError] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState("");
    const [selectedPhaseError, setSelectedPhaseError] = useState(false);
    const dispatch = useDispatch();
    const fetchPhases = async () => {
        setIsLoader(true);
        let data = await PhasesServices.fetchPhases();
        setIsLoader(false);
        setPhases(data.phases);
    }
    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
        setSelectedPhaseError(false);
        if (event.target.value) {
            let searchResultPhases = phases.find(ele => ele._id === event.target.value);
            setStatus(searchResultPhases.statuses)
        } else {
            setStatus([]);
        }
    }
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setSelectedStatusError(false);
    }
    const closeUpdate = () => {
        props.hideUpdate();
    }
    const updateContacts = async () => {
        if (selectedPhase && selectedStatus) {
            const pageId = utils.getQueryVariable('page');
            const queryParams = await getQueryParams();
            try {
                let payload = {
                    'all': props.selectAllCheckbox,
                    'selected': props.selectedContacts,
                    'status': selectedStatus,
                    'phase': selectedPhase
                };
                setIsLoader(true);
                await ContactService.updateSelectedContact(payload, pageId, queryParams);
                setIsLoader(false);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: 'Contacts Updated Successfully',
                    typeMessage: 'success'
                });
                props.hideUpdate();
            } catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            }
        } else {
            if (!selectedPhase && !selectedStatus) {
                setSelectedPhaseError(true);
                setSelectedStatusError(true);
            } else if (!selectedPhase && selectedStatus) {
                setSelectedPhaseError(true);
            } else {
                setSelectedStatusError(true);
            }
        }
    }

    const getQueryParams = async () => {
        const search = utils.getQueryVariable('search');
        const group = utils.getQueryVariable('group');
        const status = utils.getQueryVariable('status');
        const srtBy = utils.getQueryVariable('sortBy');
        const srtType = utils.getQueryVariable('sortType');
        const cache = utils.getQueryVariable('cache');
        const importId = utils.getQueryVariable('import');
        const phase = utils.getQueryVariable('phase');
        const source = utils.getQueryVariable('source');
        const by = utils.getQueryVariable('createdBy');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');

        const queryParams = new URLSearchParams();
        if (cache) {
            queryParams.append("cache", cache);
        }
        if (search) {
            let searchDecoded = decodeURIComponent(search).replace(/\+/g, " ");
            queryParams.append("search", searchDecoded);
        }
        if (group) {
            queryParams.append("group", group);
        }
        if (fromDate) {
            queryParams.append('fromDate', fromDate);
        }
        if (toDate) {
            queryParams.append('toDate', toDate);
        }
        if (status) {
            queryParams.append("status", status);
        }
        if (srtBy) {
            queryParams.append("sortBy", srtBy);
        }
        if (srtType) {
            queryParams.append("sortType", srtType);
        }
        if (importId) {
            queryParams.append("import", importId);
        }
        if (phase) {
            queryParams.append("phase", phase);
        }
        if (source) {
            queryParams.append("source", decodeURIComponent(source).replaceAll("+", " "));
        }
        if (by) {
            queryParams.append("createdBy", by);
        }
        return queryParams;
    }

    useEffect(() => {
        fetchPhases();
    }, [])
    useEffect(() => {
        if (selectedStatusError || selectedPhaseError) {
            setTimeout(() => {
                setSelectedPhaseError(false);
                setSelectedStatusError(false    );
            }, 5000);
        }
    }, [selectedStatusError, selectedPhaseError])
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="sideMenuInner importModalContainer updateContainer">
                    <div className="sideMenuHeader">
                        <h3>Update</h3>
                        <p>Update all the selected Contacts </p>
                        <button className="btn btn-closeSideMenu" onClick={() => closeUpdate()}>
                            <span></span><span></span></button>
                    </div>
                    <div className="importModalBody">
                        {isLoader ? <Loader/> : ''}
                        <div className="infoInputs appModal">
                            <ul>
                                <li>
                                    <div className={"formField w-50 durationWraper" + (selectedPhaseError ? ' error ' : "")}>
                                        <label>Phase</label>
                                        <div className="inFormField">
                                            <select value={selectedPhase} onChange={handlePhaseChange}
                                                    style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select a Phase</option>
                                                {
                                                    phases.map(ele => {
                                                        if (ele.statuses.length) {
                                                            return (<option value={ele._id} key={ele._id}>{ele.name}</option>)
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"formField w-50 durationWraper" + (selectedStatusError ? " error " : "")}>
                                        <label>Status</label>
                                        <div className="inFormField">
                                            <select value={selectedStatus} onChange={handleStatusChange}
                                                    style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select a Status</option>
                                                {
                                                    status.map(ele => {
                                                        if (ele._id !== undefined) {
                                                            return (<option value={ele._id} key={ele._id}>{ele.name}</option>)
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="formField w-100 appModals updates formControl">
                                        <button type="button" className="saveNnewBtn" onClick={updateContacts}><span>Update</span><img
                                            src={arrowRightWhite} alt=""/></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Update;