import React, {useEffect, useState} from "react";

import {Steps, Step} from "react-step-builder";

import arrowDown from "../../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import {PhasesServices} from "../../../services/contact/phasesServices";
import Loader from "../../shared/Loader";
import {ContactService} from "../../../services/contact/ContactServices";
import {utils} from "../../../helpers";
import * as actionTypes from "../../../actions/types";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function ImportFilter(props) {
    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [calenderMinDate, setCalenderMinDate] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const [phases, setPhases] = useState([]);
    const [status, setStatus] = useState([]);
    const [source, setSource] = useState([]);
    const [createdBy, setCreatedBy] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPhase, setSelectedPhase] = useState("");
    const [selectedSource, setSelectedSource] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFrom, setSelectedFrom] = useState("");
    const dispatch = useDispatch();
    const fetchPhases = async () => {
        setIsLoader(true);
        let data = await ContactService.fetchFilters();
        setIsLoader(false);
        setPhases(data.phase);
        setSource(data.source);
        setCreatedBy(data.createdBy);
    }
    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
        if (event.target.value) {
            let searchResultPhases = phases.find(ele => ele._id === event.target.value);
            setStatus(searchResultPhases.statuses)
        } else {
            setStatus([]);
        }
    }
    const timezoneOffset = useSelector((state)=>(state?.user?.data?.organizationTimezoneInfo?.utc_offset)? state.user.data.organizationTimezoneInfo.utc_offset:null);
    useEffect(()=>{
        console.log("contact filter time zone", timezoneOffset);
    })
    useEffect(() => {
        let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
        let formatedDateTime = moment(timezoneDateTime).format("YYYY-MM-DD HH:mm:ss").split(" ")[0];
        setCalenderMinDate(formatedDateTime);

        setSelectedFrom(formatedDateTime);
        setSelectedTo(formatedDateTime);
        setDate(new Date(timezoneDateTime));
        setDate2(new Date(timezoneDateTime));
    }, []);
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    }
    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    }
    // const handleToChange = (event) => {
    //     console.log("Before convert", event.target.value + " " + "24:00:01");
    //     let convertTo = event.target.value;
    //     console.log("After convert", convertTo);
    //     setSelectedTo(convertTo);
    // }
    const setEndDate = (val) => {
        let formattedDate = `${val.getFullYear()}-${
            val.getMonth() + 1
          }-${val.getDate()}`;
        setDate2(val);
        setSelectedTo(formattedDate);
    }
    // const handleFromChange = (event) => {
    //     console.log("from formate", event.target.value + " " + "00:00:01");
    //     let convertFrom = event.target.value;
    //     setSelectedFrom(convertFrom);
    //     console.log("From", selectedFrom);
    // }
    const setStartDate = (val) => {
        let formattedDate = `${val.getFullYear()}-${
            val.getMonth() + 1
          }-${val.getDate()}`;
        setDate(val);
        setSelectedFrom(formattedDate);
    }
    const handleSourceChange = (event) => {
        setSelectedSource(event.target.value);
    }
    const closeFilter = () => {
        props.hideFilter();
    }
    const applyFilter = () => {
        if (selectedUser) {
            utils.addQueryParameter('createdBy', selectedUser);
        } else {
            utils.removeQueryParameter('createdBy')
        }
        if (selectedFrom) {
            let convertFrom = utils.convertTimezoneToUTC(selectedFrom + " " + "00:00:01", timezoneOffset);
            utils.addQueryParameter('fromDate', convertFrom);
        } else {
            utils.removeQueryParameter('fromDate')
        }
        if (selectedTo) {
            let convertTo = utils.convertTimezoneToUTC(selectedTo + " " + "23:59:59", timezoneOffset);
            utils.addQueryParameter('toDate', convertTo);
        } else {
            utils.removeQueryParameter('toDate')
        }
        if (selectedSource) {
            utils.addQueryParameter('source', selectedSource);
        } else {
            utils.removeQueryParameter('source')
        }
        if (selectedStatus) {
            utils.addQueryParameter('status', selectedStatus);
        } else {
            utils.removeQueryParameter('status')
        }
        if (selectedPhase) {
            utils.addQueryParameter('phase', selectedPhase);
        } else {
            utils.removeQueryParameter('phase')
        }
        if (selectedUser || selectedFrom || selectedTo || selectedSource || selectedStatus || selectedPhase) {
            props.applyFilter();
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please select any filter first.',
                typeMessage: 'error'
            });
        }
    }
    const clearFilter = () => {
        setSelectedTo("");
        setSelectedPhase("");
        setSelectedFrom("");
        setSelectedSource("");
        setSelectedUser("");
        setSelectedStatus("");
        utils.removeQueryParameter('import');
        utils.removeQueryParameter('page');
        utils.removeQueryParameter('status');
        utils.removeQueryParameter('phase');
        utils.removeQueryParameter('source');
        utils.removeQueryParameter('createdBy');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
    }
    useEffect(() => {
        if(phases.length && selectedPhase !== ""){
            let searchResultPhases = phases.find(ele => ele._id === selectedPhase);
            if (searchResultPhases) {
                setStatus(searchResultPhases.statuses);
            }
        }
    }, [phases]);
    useEffect(() => {
        fetchPhases();
        const status = utils.getQueryVariable('status');
        if (status) {
            setSelectedStatus(status ? status : "");
        }
        const phase = utils.getQueryVariable('phase');
        if (phase) {
            setSelectedPhase(phase ? phase : "");
        }
        const user = utils.getQueryVariable('createdBy');
        if (user) {
            setSelectedUser(user ? user : "");
        }
        const fromDate = utils.getQueryVariable('fromDate');
        if (fromDate) {
            setSelectedFrom(fromDate ? fromDate : "");
        }
        const toDate = utils.getQueryVariable('toDate');
        if (toDate) {
            setSelectedTo(toDate ? toDate : "");
        }
        const source = utils.getQueryVariable('source');
        if (source) {
            setSelectedSource(source ? decodeURIComponent(source.replaceAll("+", " ")) : "");
        }
    }, []);
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={() => closeFilter()}></div>
                <div className="sideMenuInner importModalContainer updateContainer">
                    {isLoader ? <Loader/> : ''}
                    <div className="sideMenuHeader">
                        <h3>Apply Filter</h3>
                        <button className="btn btn-closeSideMenu" onClick={() => closeFilter()}>
                            <span></span><span></span></button>
                    </div>
                    <div className="importModalBody setFilter">
                        <div className="filterOfContactListing">
                            <div className="infoInputs appModal">
                                <ul>
                                    <li className="blockLi">
                                        <div className="formField w-100 appModals formControl phasesSelection">
                                            <label>Phase</label>
                                            <select value={selectedPhase} onChange={handlePhaseChange}
                                                    style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select a Phase</option>
                                                {
                                                    phases.map(ele => {
                                                        if (ele.statuses.length  && ele.statuses[0]._id !== undefined) {
                                                            return (<option value={ele._id} key={ele._id}>{ele.name}</option>)
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl statusSelection">
                                            <label>Status</label>
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
                                        <div className="formField w-100 appModals formControl">
                                            <label>Source</label>
                                            <select value={selectedSource} onChange={handleSourceChange}
                                                    style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select</option>
                                                {
                                                    source.map(ele => {
                                                        return (<option value={ele._id} key={ele._id}>{ele._id}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </li>
                                    <li className="dateRangeHeading"><p className="dateRange pTags">Created on</p></li>
                                    <li className="halfDates">
                                        <div className="formField w-50 appflex durationWraper">
                                            {/* {selectedFrom} */}
                                            <label>From</label>
                                            <div className="inFormField duration">
                                                {/* <input type="date" placeholder="dd/mm/yyyy" name=""  value={selectedFrom.split(" ")[0]}
                                                       onChange={handleFromChange}/> */}
                                                <DatePicker 
                                                    className="cmnFieldStyle"
                                                    selected={date === undefined ? new Date() : date}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholder="mm/dd/yyyy"
                                                    onChange={(e) => setStartDate(e)} 
                                                />
                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                                {/* <input type="date" placeholder="dd/mm/yyyy" name="" value={selectedTo.split(" ")[0]}
                                                       onChange={handleToChange}/> */}
                                                <DatePicker 
                                                    className="cmnFieldStyle"
                                                    selected={date2 === undefined ? new Date() : date2}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholder="mm/dd/yyyy"
                                                    onChange={(e) => setEndDate(e)} 
                                                    minDate={new Date(date)}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="blockLi">

                                        <div className="formField w-100 appModals formControl creationSelection">
                                            <label>Created by</label>
                                            <select value={selectedUser} onChange={handleUserChange}
                                                    style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select</option>
                                                {
                                                    createdBy.map(ele => {
                                                        return (<option value={ele.id} key={ele._id}>{ele._id}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </li>
                                    <li className="lastLiApp">
                                        <div className="formField formControl w-50 appflex">
                                            <button type="button" className="saveNnewBtn" onClick={applyFilter}><span>Apply Filter</span><img
                                                src={arrowRightWhite} alt=""/></button>
                                        </div>
                                        <div className="formField w-50 appflex clearFilterBtns">
                                            <span className="clearFilter" onClick={clearFilter}>Clear</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ImportFilter;