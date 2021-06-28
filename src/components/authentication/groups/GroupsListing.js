import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Pagination from "../../shared/Pagination";
import * as actionTypes from "../../../actions/types";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";
import Loader from "../../shared/Loader";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

import { utils } from "../../../helpers";
import { GroupServices } from '../../../services/authentication/GroupServices';

const GroupListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [groupsData, setGroupsData] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [groupsCount, setGroupsCount] = useState(0);
    const [paginationData, setPaginationData] = useState(
        {
            count: null,
            totalPages: null,
            currentPage: 1,
            limit: 10
        }
    );
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    const [option, setOption] = useState(null);

    const toggleCreateHeader = () => {
        props.toggleCreate("groups");
    };

    const filterGroups = () => {
        props.toggleFilter("groups");
    };

    /**
     * Set filtered data
     */
    useEffect(() => {
        if (props.getFilteredData) {
            console.log('Reached detination', props.getFilteredData);
            setGroupsData(props.getFilteredData.groups);
            setGroupsCount(props.getFilteredData.pagination.count ? props.getFilteredData.pagination.count : 0);
            //Set current page
            setPaginationData({
                ...paginationData,
                currentPage: props.getFilteredData.pagination.currentPage,
                totalPages: props.getFilteredData.pagination.totalPages
            });
        }

    }, [props])

    const editThisGroup = (e, el) => {
        let yPosition = el.clientY;
        let avHeight = window.innerHeight - (70 + 70 + 54 + 57)
        if ((yPosition + 70) > avHeight) {
            setDropdownPos("top")
        }
        else {
            setDropdownPos("bottom")
        }

        const data = groupsData.filter((i) => i.keyId === e);
        console.log("E? : ", data);
        data[0].isEditing = !data[0].isEditing;
        console.log("data  :: ", data[0].isEditing);
        const newData = groupsData.map((el, i) => {
            if (el.keyId === e) {
                return data[0];
            } else return el;
        });
        console.log("newData : ", newData);
        setGroupsData(newData);
    };

    useEffect(() => {
        // console.log("groupsData after setGroupsData :", groupsData);
        /**
         * Get page id and keyword from URL
         */
         let pageId = utils.getQueryVariable('page');
         let param = utils.getQueryVariable('search');
         if (param) {
             setKeyword(param);
         }
         /**
          * Call to fetch roles
          */
         fetchGroups(pageId, param);
    }, []);

    /**
     * Function to fetch users
     * @returns 
     */
     const fetchGroups = async (pageId, keyword) => {
        try {
            setIsLoader(true);
            await GroupServices.fetchGroups(pageId, keyword)
                .then((result) => {
                    console.log('Groups listing result', result);
                    if (result) {
                        setGroupsData(result.groups);
                        setGroupsCount(result.pagination.count);
                        /**
                         * Update store
                         */
                         dispatch({
                            type: actionTypes.GROUP_COUNT,
                            count : result.pagination.count
                        })
                        setPaginationData({
                            ...paginationData,
                            currentPage: result.pagination.currentPage,
                            totalPages: result.pagination.totalPages
                        });
                        setIsLoader(false);
                    }
                })
                .catch((error) => {
                    setIsLoader(false);
                    console.log("Groups listing error", error);
                });
        } catch (e) {
            setIsLoader(false);
            console.log("Error in Group listing", e);
        }
    }

    /**
     * Get user from pagination component
     * @param {*} dataFromChild 
     */
     const getDataFn = (dataFromChild) => {
        console.log('Data from child', dataFromChild);
        if (dataFromChild) {
            setGroupsData(dataFromChild.groups);
            //Set current page
            setPaginationData({
                ...paginationData,
                currentPage: dataFromChild.pagination.currentPage,
                totalPages: dataFromChild.pagination.totalPages
            });
        }
    }

    /**
     * Handle options toggle
     */
     const toggleOptions = (index) => {
        setOption(index !== null ? (option !== null ? null : index) : null);
    };

    /**
     * Update keyword
     */
     const handleKeywordChange = (event) => {
        setKeyword(event.target.value ? event.target.value : '');
        console.log('Keyword', keyword);
    }

    /**
     * Handle search functionality
     */
    const handleSearch = (event) => {
        event.preventDefault();

        let pageId = utils.getQueryVariable('page');

        let queryParams = new URLSearchParams();
        if (keyword) {
            utils.addQueryParameter('search', keyword);
            queryParams.append("search", keyword);
        } else {
            utils.removeQueryParameter('search');
        }

        fetchGroups(pageId, queryParams);
    }

    /**
     * Edit group
     */
     const editGroup = (group) => {
        console.log('Edit group Id', group);
        toggleCreateHeader(group);
        setOption(null);
    }

    /**
     * Delete group
     */
    const deleteGroup = async (group) => {
        if(!window.confirm("Are you sure! want to delete the organization and its owner?")) return;
        try {
            /**
             * Delete the group
             */
            await GroupServices.deleteGroup(group._id)
                .then((result) => {
                    if (result) {
                        console.log('Group delete result', result);
                        const newList = groupsData.filter((g) => g._id !== group._id);
                        setGroupsData(newList);
                        setOption(null);
                    }
                });
        } catch (e) {
            console.log("Error in Group delete", e);
        }
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Users & Controls</li>
                        <li>Groups</li>
                    </ul>
                    <h2 className="inDashboardHeader">User Groups ({ groupsCount })</h2>
                    <p className="userListAbout">
                        Create & manage groups for your business
                    </p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar">
                        <form onSubmit={handleSearch}>
                            <input type="search" name="" id="" placeholder="Search groups" onChange={handleKeywordChange} autoComplete="off" value={keyword} />
                            <button className="searchIcon">
                                <img src={search_icon} alt="" />
                            </button>
                        </form>
                    </div>
                    <button className="btn btn-filter" onClick={filterGroups}>
                        <p>Filter</p>
                        <img className="filterIcon" src={filter_icon} alt="" />
                    </button>
                    <button className="creatUserBtn" onClick={toggleCreateHeader}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create a new group</span>
                    </button>
                </div>
            </div>
            <div className="userListBody">
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading userRole">
                            <div className="userName">Group Name</div>
                            <div className="phoneNum assignedPeople">
                                No. of people assigned
              </div>
                            <div className="createDate">Created on</div>
                        </li>
                        {groupsData &&
                            groupsData.map((elem, key) => {
                                return (
                                    <React.Fragment key={i + "group"}>
                                        <li className="owerInfo userRole" key={elem.keyId}>
                                            <div className="userName">
                                                <button className="btn">
                                                    <p>{elem.name}</p>
                                                </button>
                                            </div>
                                            <div className="phoneNum">
                                                <button className="btn">
                                                    {elem.userCount}
                                                </button>
                                            </div>
                                            <div className="createDate">
                                                <button className="btn">{moment(elem.createdAt).format("Do MMM YYYY")}</button>
                                                <div className="info_3dot_icon">
                                                    <button
                                                        className="btn"
                                                        onClick={() => {
                                                            toggleOptions(key);
                                                        }}
                                                    >
                                                        <img src={info_3dot_icon} alt="" />
                                                    </button>
                                                </div>
                                                <React.Fragment key={key + "_fragment"}>
                                                    <div
                                                        className={
                                                            option === key ? "dropdownOptions listOpen" : "listHide"
                                                        }
                                                    >
                                                        <button className="btn btnEdit"
                                                            onClick={() => {
                                                                editGroup(elem);
                                                            }}>
                                                            <span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 13.553 13.553"
                                                                    className="editIcon"
                                                                >
                                                                    <g transform="translate(0.75 0.75)">
                                                                        <path
                                                                            className="a"
                                                                            d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                                                            transform="translate(-2 -2.795)"
                                                                        />
                                                                        <path
                                                                            className="a"
                                                                            d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                                                            transform="translate(-4.384 -2)"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            Edit
                                                        </button>
                                                        <button className="btn btnDelete"
                                                            onClick={() => {
                                                                deleteGroup(elem);
                                                            }}>
                                                            <span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="12.347"
                                                                    height="13.553"
                                                                    viewBox="0 0 12.347 13.553"
                                                                    className="deleteIcon"
                                                                >
                                                                    <g transform="translate(0.75 0.75)">
                                                                        <path className="a" transform="translate(-3 -3.589)" />
                                                                        <path
                                                                            className="a"
                                                                            d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                                            transform="translate(-3.795 -2)"
                                                                        />
                                                                        <line
                                                                            className="a"
                                                                            y2="3"
                                                                            transform="translate(4.397 6.113)"
                                                                        />
                                                                        <line
                                                                            className="a"
                                                                            y2="3"
                                                                            transform="translate(6.397 6.113)"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </React.Fragment>
                                            </div>
                                        </li>
                                    </React.Fragment>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <Pagination type="group" paginationData={paginationData} dataCount={groupsCount} getData={getDataFn} />
        </div>
    )
}

export default GroupListing
