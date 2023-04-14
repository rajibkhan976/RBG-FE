import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import * as actionTypes from "../../../actions/types";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";

const UserFilter = (props) => {
    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [today, setToday] = useState();
    const [group, setGroup] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setStateFilter(null);
    };
    const dispatch = useDispatch();
    let zIndexBody = useSelector((state) => state.modal.zIndexBody);
    console.log(zIndexBody);
    /**
     * Handle group change
     * @param {*} event 
     */
    const handleGroupChange = (event) => {
        event.preventDefault();
        utils.addQueryParameter('group', event.target.value);
        setGroup(event.target.value);
    }
    const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null);

    useEffect(() => {
        let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
        setToday(timezoneDateTime);
    }, [timezoneOffset]);

    /**
     * Apply filter submit
     */
    const handleApplyFilter = (e) => {
        e.preventDefault();
        // UPDATE STORE
        if(!group && !fromDate && !status){
            return;
        }
        if(fromDate && !toDate){
            return;
        }
        dispatch({
            type: actionTypes.USER_FILTER,
            filter : true
        });
    }

    /**
     * Handle from date change
     */
    // const handleDateChangeFrom = (event) => {
    //     event.preventDefault();

    //     utils.addQueryParameter(event.target.name, utils.convertTimezoneToUTC(event.target.value + " " + "00:00:01", timezoneOffset));
       
    //     setFromDate(event.target.value);

    //     console.log(event.target.name, event.target.value, utils.convertTimezoneToUTC(event.target.value + " " + "00:00:01", timezoneOffset) );
    // }
    const setStartDate = (val) => {
        if (val) {
            let formattedDate = `${val.getFullYear()}-${
                val.getMonth() + 1
            }-${val.getDate()}`;
            setFromDate(formattedDate);
            utils.addQueryParameter("fromDate", utils.convertTimezoneToUTC(formattedDate + " " + "00:00:01", timezoneOffset));
        } else {
            utils.removeQueryParameter("fromDate");
        }
        setDate(val);
    }
    const setEndDate = (val, e) => {
        if (val) {
            let formattedDate = `${val.getFullYear()}-${
                val.getMonth() + 1
            }-${val.getDate()}`;
            utils.addQueryParameter("toDate", utils.convertTimezoneToUTC(formattedDate + " " + "23:59:59", timezoneOffset));
            setToDate(formattedDate);
        } else {
            utils.removeQueryParameter("toDate");
        }
        setDate2(val);

    }

    /**
     * Handle status change
     * @param {*} event 
     */
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        if(event.target.value) {
            utils.addQueryParameter('status', event.target.value);
        } else {
            utils.removeQueryParameter('status');
        }
    }

    /**
     * Handle reset filter
     */
    const handleResetFilter = (event) => {
        event.preventDefault();
        setGroup('');
        setFromDate('');
        setToDate('');
        setStatus('');
        setDate("");
        setDate2("");
        utils.removeQueryParameter('group');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
        utils.removeQueryParameter('status');
        // UPDATE STORE
        dispatch({
            type: actionTypes.USER_FILTER,
            filter : true
        });
    }

    return (
        <>
            {props.stateFilter !== null && (
                <div className="sideMenuOuter filterUserMenu">
                    <div className="dialogBg" onClick={(e) => closeSideMenu(e)}></div>
                    {isLoader ? <Loader /> : ''}
                    <div className="sideMenuInner">
                        <button
                            className="btn btn-closeSideMenu"
                            onClick={(e) => closeSideMenu(e)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                        <div className="sideMenuHeader">
                            <h3 className="liteHeading">Apply Filter</h3>
                        </div>
                        <div className="sideMenuBody">
                            <form className="formBody" onSubmit={handleApplyFilter}>
                                {false ? <div className="formField">
                                    <p>Select Group</p>
                                    <div className="inFormField">
                                        <select style={{ backgroundImage: "url(" + arrowDown + ")" }} onChange={handleGroupChange} value={group}>
                                            <option value="">Select group</option>
                                            <option value="group-1">Top Manager</option>
                                            <option value="group-4">Group4</option>
                                        </select>
                                    </div>
                                </div> : ''}
                                <div className="createdDate">
                                    <p>Created on</p>
                                    <div className="createdDateFields">
                                        <div className="formField w-50">
                                            <p>From</p>
                                            <div className="inFormField">
                                                {/* <input type="date" name="fromDate" id="formDate" placeholder="dd/mm/yyyy" onChange={handleDateChangeFrom} value={fromDate} /> */}
                                                <DatePicker 
                                                    className="cmnFieldStyle"
                                                    selected={date}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    onChange={(e) => setStartDate(e)}
                                                    maxDate={new Date(today)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formField w-50">
                                            <p>To</p>
                                            <div className="inFormField">
                                                {/* <input type="date" name="toDate" id="toDate" min={fromDate} placeholder="dd/mm/yyyy" onChange={handleDateChangeTo} value={toDate}/> */}
                                                <DatePicker 
                                                    className="cmnFieldStyle"
                                                    selected={date2}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    onChange={(e) => setEndDate(e)} 
                                                    minDate={new Date(date)}
                                                    maxDate={new Date(today)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="selectStatus">
                                    <div className="formField">
                                        <p>Select Status</p>
                                        <div className="inFormField">
                                            <select style={{ backgroundImage: "url(" + arrowDown + ")" }} onChange={handleStatusChange} value={status}>
                                                <option value="null">Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="applyFilterBtn">
                                    <button className="saveNnewBtn">
                                        <span>Apply Filter</span>
                                        <img className="" src={arrow_forward} alt="" />
                                    </button>
                                    <button className="btn-link" onClick={handleResetFilter}>Clear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserFilter;