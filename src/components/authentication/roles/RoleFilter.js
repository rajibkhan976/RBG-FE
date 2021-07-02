import React, { useEffect, useState } from 'react';
import { utils } from "../../../helpers";
import { RoleServices } from "../../../services/authentication/RoleServices";
import Loader from "../../shared/Loader";

import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";

const RoleFilter = (props) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setStateFilter(null);
    };

    useEffect(() => {
        /**
         * Get page id and keyword from URL
         */
        let fromDt = utils.getQueryVariable('fromDate');
        let toDt = utils.getQueryVariable('fromDate');
        let queryParams = new URLSearchParams();
        if (fromDt) {
            setFromDate(fromDt)
        }
        if (toDt) {
            setToDate(toDt);
        }
        
    }, []);

    /**
     * Apply filter submit
     */
    const handleApplyFilter = (event) => {
        event.preventDefault();
        let pageId = 1;
        let keyword = utils.getQueryVariable('search');
        let fromDate = utils.getQueryVariable('fromDate');
        let toDate = utils.getQueryVariable('toDate');

        let queryParams = new URLSearchParams();
        
        queryParams.append("page", pageId);

        utils.removeQueryParameter('page');

        if(keyword) {
            queryParams.append("search", keyword);
        }
        if(fromDate && toDate){
            queryParams.append('fromDate', fromDate);
            queryParams.append('toDate', toDate);
        }
        
        fetchRoles(pageId, queryParams);
    }

    /**
   * Send the data to user listing component
   * @param {*} data
   */
    const broadcastToParent = (data) => {
        props.getData(data);
    };

    /**
     * Function to fetch users based on filter
     * @returns 
     */
    const fetchRoles = async (pageId, queryParams) => {
        try {
            setIsLoader(true);
            await RoleServices.fetchRoles(pageId, queryParams)
                .then((result) => {
                    console.log('Role listing result', result.roles);
                    if (result) {
                        broadcastToParent(result);
                        // props.setStateFilter(null);
                        setIsLoader(false);
                    }
                })
                .catch((error) => {
                    setIsLoader(false);
                    console.log("User listing error", error);
                });
        } catch (e) {
            setIsLoader(false);
            console.log("Error in User listing", e);
        }
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
     * Handle reset filter
     */
    const handleResetFilter = (event) => {
        event.preventDefault();
        setFromDate('');
        setToDate('');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');

        let queryParams = new URLSearchParams();
        let keyword = utils.getQueryVariable('search');
        if (keyword) {
            queryParams.append("search", keyword);
        }
        
        fetchRoles(1, queryParams);
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

export default RoleFilter;