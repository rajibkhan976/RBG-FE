import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Pagination from "../../shared/Pagination";
import * as actionTypes from "../../../actions/types";
import Loader from "../../shared/Loader";
import ListHead from '../auth-shared/ListHead';

// import search_icon from "../../../assets/images/search_icon.svg";
// import filter_icon from "../../../assets/images/filter_icon.svg";
// import plus_icon from "../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

import { utils } from "../../../helpers";
import { GroupServices } from '../../../services/authentication/GroupServices';
import { ErrorAlert, SuccessAlert } from '../../shared/messages';

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
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const messageDelay = 5000; // ms

    const toggleCreateHeader = (e) => {
        props.toggleCreate(e);
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

    /**
     * Auto hide success or error message
     */
     useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg])

    /**
     * Get all query params
     */
    const getQueryParams = async () => {
        let keyword = utils.getQueryVariable('search');
        let fromDt = utils.getQueryVariable('fromDate');
        let toDt = utils.getQueryVariable('toDate');
        let srtBy = utils.getQueryVariable('sortBy');
        let srtType = utils.getQueryVariable('sortType');
        let queryParams = new URLSearchParams();
        if (keyword) {
            queryParams.append("search", keyword);
        }
        if (fromDt) {
            queryParams.append("fromDate", fromDt);
        }
        if (toDt) {
            queryParams.append("toDate", toDt);
        }
        if (srtBy) {
            queryParams.append("sortBy", srtBy);
        }
        if (srtType) {
            queryParams.append("sortType", srtType);
        }
        return queryParams;
    }

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
        setSortBy(utils.getQueryVariable('sortBy'));
        setSortType(utils.getQueryVariable('sortType'));
        /**
         * Call to fetch roles
         */
        fetchGroups();
    }, []);

    /**
     * Function to fetch users
     * @returns 
     */
    const fetchGroups = async () => {
        let pageId = utils.getQueryVariable('page') || 1;
        let queryParams = await getQueryParams();

        try {
            setIsLoader(true);
            const result = await GroupServices.fetchGroups(pageId, queryParams);
            if (result) {
                setGroupsData(result.groups);
                setGroupsCount(result.pagination.count);
                /**
                 * Update store
                 */
                dispatch({
                    type: actionTypes.GROUP_COUNT,
                    count: result.pagination.count
                })
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
            }
        } catch (e) {
            console.log("Error in Group listing", e);
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    // /**
    //  * Get user from pagination component
    //  * @param {*} dataFromChild 
    //  */
    //  const getDataFn = (dataFromChild) => {
    //     console.log('Data from child', dataFromChild);
    //     if (dataFromChild) {
    //         setGroupsData(dataFromChild.groups);
    //         //Set current page
    //         setPaginationData({
    //             ...paginationData,
    //             currentPage: dataFromChild.pagination.currentPage,
    //             totalPages: dataFromChild.pagination.totalPages
    //         });
    //     }
    // }

    /**
     * Handle options toggle
     */
    const toggleOptions = (index) => {
        // setOption(index !== null ? (option !== null ? null : index) : null);
        setOption(index !== option ? index : null);
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

        utils.addQueryParameter('page', 1);
        if (keyword) {
            utils.addQueryParameter('search', keyword);
        } else {
            utils.removeQueryParameter('search');
        }

        fetchGroups();
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
        if (!window.confirm("Are you sure! want to delete the organization and its owner?")) return;
        try {
            /**
             * Delete the group
             */
            const result = await GroupServices.deleteGroup(group._id);
            if (result) {
                console.log('Group delete result', result);
                const newList = groupsData.filter((g) => g._id !== group._id);
                setGroupsData(newList);
                setOption(null);
                setGroupsCount(groupsCount - 1);
            }
        } catch (e) {
            console.log("Error in Group delete", e);
        }
    }

    const handleSortBy = (field) => {
        // Set sort type
        let type = "asc"
        if (field == sortBy) {
            if (sortType == "asc") {
                type = "dsc";
            }
        }

        // Set state and Update query param
        setSortBy(field);
        setSortType(type);
        utils.addQueryParameter('sortBy', field);
        utils.addQueryParameter('sortType', type);

        // Fetch data
        fetchGroups()
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <ListHead
                groupsCount={groupsCount}
                handleSearch={handleSearch}
                filterGroups={filterGroups}
                toggleCreateHeader={toggleCreateHeader}
                keyword={keyword}
                handleKeywordChange={handleKeywordChange}
            />
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }

            <div className="userListBody">
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading userRole">
                            <div className={"userName " + (sortBy == "name" ? "sort " + sortType : "")} onClick={() => handleSortBy("name")}>
                                Group Name
                            </div>
                            <div className={"phoneNum assignedPeople " + (sortBy == "people" ? "sort " + sortType : "")} onClick={() => handleSortBy("people")}>
                                No. of people assigned
                            </div>
                            <div className={"createDate " + (sortBy == "createdAt" ? "sort " + sortType : "")} onClick={() => handleSortBy("createdAt")}>
                                Created on
                            </div>
                        </li>
                        {groupsData &&
                            groupsData.map((elem, key) => {
                                return (
                                    <React.Fragment key={key + "group"}>
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
            {groupsCount > paginationData.limit ? <Pagination paginationData={paginationData} dataCount={groupsCount} callback={fetchGroups} /> : ''}
        </div>
    )
}

export default GroupListing
