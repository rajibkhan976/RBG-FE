import React, { useState } from 'react';
import { utils } from "../../../helpers";
import { GroupServices } from "../../../services/authentication/GroupServices";
import Loader from "../../shared/Loader";

import arrow_forward from "../../../assets/images/arrow_forward.svg";
// import arrowDown from "../../../assets/images/arrowDown.svg";
import { useDispatch, useSelector } from 'react-redux';
const GroupFilter = (props) => {
    const [group, setGroup] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    
    let zIndexBody = useSelector((state) => state.modal.zIndexBody);
    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setStateFilter(null);
    };

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
    const handleApplyFilter = (event) => {
        event.preventDefault();
        const pageId = utils.getQueryVariable('page');
        const keyword = utils.getQueryVariable('search');
        // let group = utils.getQueryVariable('group');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');
        // let status = utils.getQueryVariable('status');

        let queryParams = new URLSearchParams();
        if (pageId) {
            queryParams.append("page", pageId);
        }
        if (keyword) {
            queryParams.append("search", keyword);
        }
        if (fromDate && toDate) {
            queryParams.append('fromDate', fromDate);
            queryParams.append('toDate', toDate);
            fetchGroups(pageId, queryParams);
        }
        // if(status) {
        //     queryParams.append("status", status);
        // }

        
    }

    /**
   * Send the data to group listing component
   * @param {*} data
   */
    const broadcastToParent = (data) => {
        props.getData(data);
    };

    /**
     * Function to fetch users based on filter
     * @returns 
     */
    const fetchGroups = async (pageId, queryParams) => {
        try {
            setIsLoader(true);
            const result = await GroupServices.fetchGroups(pageId, queryParams);
            // .then((result) => {
            console.log('Group listing result', result.groups);
            if (result) {
                broadcastToParent(result);
                // props.setStateFilter(null);
                // setIsLoader(false);
            }
        } catch (e) {
            // setIsLoader(false);
            console.log("Error in Group listing", e);
        } finally {
            setIsLoader(false);
        }
    }

    /**
     * Handle from date change
     */
    const handleDateChange = (event) => {
        event.preventDefault();
        utils.addQueryParameter(event.target.name, event.target.value);
        if (event.target.name === 'fromDate') {
            setFromDate(event.target.value);
        } else {
            setToDate(event.target.value);
        }
        console.log(event.target.name, event.target.value);
    }

    // const handleStatusChange = (event) => {
    //     setStatus(event.target.value);
    //     if (event.target.value) {
    //         utils.addQueryParameter('status', event.target.value);
    //     } else {
    //         utils.removeQueryParameter('status');
    //     }
    // }

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
        fetchGroups(1);
    }
    
    return (
        <>
            {props.stateFilter !== null && (
                <div className="sideMenuOuter filterUserMenu">
                    {isLoader ? <Loader /> : ''}
                    <div className="dialogBg" onClick={(e) => closeSideMenu(e)}></div>
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
                                                <input type="date" name="toDate" id="toDate" min={fromDate} placeholder="dd/mm/yyyy" onChange={handleDateChange} value={toDate} />
                                            </div>
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

export default GroupFilter;