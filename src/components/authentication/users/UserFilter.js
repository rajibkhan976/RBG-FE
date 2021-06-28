import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { utils } from "../../../helpers";
import { UserServices } from "../../../services/authentication/UserServices";
import Loader from "../../shared/Loader";
import * as actionTypes from "../../../actions/types";


import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";

const UserFilter = (props) => {
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

    /**
     * Handle group change
     * @param {*} event 
     */
    const handleGroupChange = (event) => {
        event.preventDefault();
        utils.addQueryParameter('group', event.target.value);
        setGroup(event.target.value);
    }
    /**
     * Apply filter submit
     */
    const handleApplyFilter = (e) => {
        e.preventDefault();
        // UPDATE STORE
        dispatch({
            type: actionTypes.USER_FILTER,
            filter : true
        });
    }

    /**
     * Handle from date change
     */
    const handleDateChange = (event) => {
        event.preventDefault();
        utils.addQueryParameter(event.target.name, event.target.value);
        if( event.target.name === 'fromDate'){
            setFromDate(event.target.value);
        } else {
            setToDate(event.target.value);
        }
        console.log(event.target.name, event.target.value);
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
                                <div className="formField">
                                    <p>Select Group</p>
                                    <div className="inFormField">
                                        <select style={{ backgroundImage: "url(" + arrowDown + ")" }} onChange={handleGroupChange} value={group}>
                                            <option value="">Select group</option>
                                            <option value="group-1">Top Manager</option>
                                            <option value="group-4">Group4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="createdDate">
                                    <p>Created on</p>
                                    <div className="createdDateFields">
                                        <div className="formField w-50">
                                            <p>From</p>
                                            <div className="inFormField">
                                                <input type="date" name="fromDate" id="formDate" placeholder="dd/mm/yyyy" onChange={handleDateChange} value={fromDate} />
                                            </div>
                                        </div>
                                        <div className="formField w-50">
                                            <p>To</p>
                                            <div className="inFormField">
                                                <input type="date" name="toDate" id="toDate" placeholder="dd/mm/yyyy" onChange={handleDateChange} value={toDate}/>
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