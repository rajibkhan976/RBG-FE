import React, { useEffect, useState, useRef, createRef } from 'react';
import { useDispatch } from "react-redux";
import moment from "moment";
import * as actionTypes from "../../../actions/types";

import Pagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";

import Loader from "../../shared/Loader";
import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import { RoleServices } from "../../../services/authentication/RoleServices";
import { utils } from "../../../helpers";

// import owner_img_1 from "../../../assets/images/owner_img_1.png";
// import more_pages_Icon from "../../../assets/images/more_pages_Icon.svg";
// import arrow from "../../../assets/images/arrow.svg";
// import cross_icon from "../../../assets/images/cross_icon.svg";
// import camera_icon from "../../../assets/images/camera_icon.svg";
// import arrow_forward from "../../../assets/images/arrow_forward.svg";
// import list_board_icon from "../../../assets/images/list_board_icon.svg";

const RolesListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [rolesData, setRolesData] = useState(null);
    const [rolesCount, setRolesCount] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [paginationData, setPaginationData] = useState(
        {
            count: null,
            totalPages: null,
            currentPage: 1,
            limit: 10
        }
    );
    const [keyword, setKeyword] = useState(null);
    const [option, setOption] = useState(null);
    const optionsToggleRef = useRef();
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);


    const toggleCreateHeader = (e) => {
        props.toggleCreate(e);
    };

    const filterRoles = () => {
        props.toggleFilter("roles");
    };

    useEffect(() => {
        setSortBy(utils.getQueryVariable('sortBy'));
        setSortType(utils.getQueryVariable('sortType')); 
        fetchRoles();
    }, []);

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

    /**
     * Function to fetch roles
     * @returns
     */
    const fetchRoles = async () => {

        let pageId = utils.getQueryVariable('page') || 1;
        let queryParams = await getQueryParams();

        try {
            setIsLoader(true);
            const result = await RoleServices.fetchRoles(pageId, queryParams);
            console.log('Data', result.roles);
            if(result) {
                setRolesData(result.roles);
                setRolesCount(result.pagination.count);
                // UPDATE STORE
                dispatch({
                    type: actionTypes.ROLE_COUNT,
                    count : result.pagination.count
                });
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
                setIsLoader(false);
            }
        } catch (e) {
            setIsLoader(false);
            console.log("Error in Role listing", JSON.stringify(e));
        }
    }

    /**
     * Set filtered data
     */
    useEffect(() => {
        if (props.getFilteredData) {
            console.log('Reached detination', props.getFilteredData);
            setRolesData(props.getFilteredData.roles);
            setRolesCount(props.getFilteredData.pagination.count ? props.getFilteredData.pagination.count : 0);
            //Set current page
            setPaginationData({
                ...paginationData,
                currentPage: props.getFilteredData.pagination.currentPage,
                totalPages: props.getFilteredData.pagination.totalPages
            });
        }

    }, [props.getFilteredData])

    /**
     * Handle pagination click
     */
    const paginationCallbackHandle = () => {
        fetchRoles();
    }

    /**
     * Update keyword
     */
    const handleKeywordChange = (event) => {
        console.log(event.target.value);
        setKeyword(event.target.value);
    }

    /**
     * Handle search functionality
     */
    const handleSearch = (event) => {
        event.preventDefault();

        utils.addQueryParameter('page', 1);
        if(keyword) {
            utils.addQueryParameter('search', keyword);
        } else {
            utils.removeQueryParameter('search');
        }        
        fetchRoles();
    }

    /**
     * Handle options toggle
     */
    const toggleOptions = (index) => {
        console.log("Index",index);
        setOption(index !== null ? (option !== null ? null : index) : null);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    /**
     * Handle outside click
     */
    const handleClickOutside = (event) => {
        if (optionsToggleRef.current.contains(event.target)) {
            //console.log('// inside click');
            return;
          }
          //console.log('// outside click');
          setOption(null);
    }

    /**
     * Function to edit role
     */
    const editRole = (role) => {
        console.log('Edit role id', role);
        toggleCreateHeader(role);
        setOption(null);
    }

    /**
     * Function to delete role
     */
    const deleteRole = async (roleId) => {
        if (roleId) {
            try {
                await RoleServices.deleteRole(roleId)
                    .then((result) => {
                        if(result) {
                            console.log('Role delete result', result);
                            const newList = rolesData.filter((role) => role._id !== roleId);
                            setRolesData(newList);
                            setOption(null);
                        }
                    })
                    .catch((error) => {
                        console.log("Role delete error", error);
                    });
            } catch (e) {
                console.log("Error in Role delete", e);
            }
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
        fetchRoles()
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Users & Controls</li>
                        <li>Roles</li>
                    </ul>
                    <h2 className="inDashboardHeader">User Roles ({rolesCount})</h2>
                    <p className="userListAbout">Create & manage roles for your users</p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar">
                        <form onSubmit={handleSearch}>
                            <input type="search" name="search" placeholder="Search roles" defaultValue={keyword} onChange={handleKeywordChange} autoComplete="off" />
                            <button className="searchIcon">
                                <img src={search_icon} alt="" />
                            </button>
                        </form>
                    </div>
                    <button className="btn btn-filter" onClick={filterRoles}>
                        <p>Filter</p>
                        <img className="filterIcon" src={filter_icon} alt="" />
                    </button>
                    <button className="creatUserBtn" onClick={toggleCreateHeader}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create a new role</span>
                    </button>
                </div>
            </div>
            
            <div className="userListBody">
                <div className="listBody" ref={optionsToggleRef}>
                    <ul className="tableListing">
                        <li className="listHeading userRole">
                            <div
                                className={"userName " + (sortBy == "name" ? "sort " + sortType : "")}
                                onClick={() => handleSortBy("name")}>Role Name</div>
                            <div
                                className={"phoneNum assignedPeople " + (sortBy == "people" ? "sort " + sortType : "")}
                                onClick={() => handleSortBy("people")}>
                                No. of people assigned
                            </div>
                            <div
                                className={"createDate " + (sortBy == "createdAt" ? "sort " + sortType : "")}
                                onClick={() => handleSortBy("createdAt")}
                            >Created on</div>
                        </li>
                        {rolesData ?
                            rolesData.map((elem, key) => {
                                return (
                                    <React.Fragment key={key + "_role"}>
                                        <li className="owerInfo userRole" key={elem._id} >
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
                                                    {/* {console.log('Here', option, key)} */}
                                                    <div
                                                        className={
                                                            option === key ? "dropdownOptions listOpen" : "listHide"
                                                        }
                                                    >
                                                        <button className="btn btnEdit"
                                                                onClick={() => {
                                                                    editRole(elem);
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
                                                                    deleteRole(elem._id);
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
                            }) : ''
                        }
                    </ul>
                </div>
            </div>
            {rolesCount ? <Pagination
                type="role"
                paginationData={paginationData}
                dataCount={rolesCount}
                callback={paginationCallbackHandle} /> : ''}
        </div>
    )
}

export default RolesListing
