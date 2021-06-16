import React, { useState, useEffect } from 'react';

import Pagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";
import { UserServices } from "../../../services/authentication/UserServices";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import config from "../../../configuration/config";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import list_board_icon from "../../../assets/images/list_board_icon.svg";
import moment from "moment";

const UsersListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [usersData, setUsersData] = useState(null);
    const [usersCount, setUsersCount] = useState(0);
    const [paginationData, setPaginationData] = useState(
        {
            count: null,
            totalPages: null,
            currentPage: 1,
            limit: 10
        }
    );
    const [keyword, setKeyword] = useState('');
    const [option, setOption] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    const toggleCreateHeader = (e) => {
        props.toggleCreate(e);
    };

    const filterUsers = () => {
        props.toggleFilter("user");
    };

    /**
     * Set filtered data
     */
    useEffect(() => {
        if (props.getFilteredData) {
            console.log('Reached detination', props.getFilteredData);
            setUsersData(props.getFilteredData.users);
            setUsersCount(props.getFilteredData.pagination.count ? props.getFilteredData.pagination.count : 0);
            //Set current page
            setPaginationData({
                ...paginationData,
                currentPage: props.getFilteredData.pagination.currentPage,
                totalPages: props.getFilteredData.pagination.totalPages
            });
        }

    }, [props])

    const editThisUser = (e, el) => {
        let yPosition = el.clientY;
        let avHeight = window.innerHeight - (70 + 70 + 54 + 57)
        if ((yPosition + 70) > avHeight) {
            setDropdownPos("top")
        }
        else {
            setDropdownPos("bottom")
        }

        const data = usersData.filter((i) => i.keyId === e);
        console.log("E? : ", data, "EL:::");
        data[0].isEditing = !data[0].isEditing;
        console.log("data  :: ", data[0].isEditing);
        const newData = usersData.map((el, i) => {
            if (el.keyId === e) {
                return data[0];
            } else return el;
        });
        console.log("newData : ", newData);
        setUsersData(newData);
    };

    useEffect(() => {
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
        fetchUsers(pageId, param);
    }, []);

    /**
     * Function to fetch users
     * @returns 
     */
    const fetchUsers = async (pageId, keyword) => {
        try {
            setIsLoader(true);
            await UserServices.fetchUsers(pageId, keyword)
                .then((result) => {
                    console.log('User listing result', result.users);
                    if (result) {
                        setUsersData(result.users);
                        setUsersCount(result.pagination.count);
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
                    console.log("User listing error", error);
                });
        } catch (e) {
            setIsLoader(false);
            console.log("Error in User listing", e);
        }
    }

    /**
     * Get user from pagination component
     * @param {*} dataFromChild 
     */
    const getDataFn = (dataFromChild) => {
        console.log('Data from child', dataFromChild);
        if (dataFromChild) {
            setUsersData(dataFromChild.users);
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
     * Edit user
     */
    const editUser = (user) => {
        console.log('Edit user Id', user);
        toggleCreateHeader(user);
        setOption(null);
    }

    /**
     * Delete user
     */
    const deleteUser = async (userId) => {
        if (userId) {
            try {
                await UserServices.deleteUser(userId)
                    .then((result) => {
                        if (result) {
                            console.log('Role delete result', result);
                            const newList = usersData.filter((user) => user._id !== userId);
                            setUsersData(newList);
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
        let group = utils.getQueryVariable('group');

        let queryParams = new URLSearchParams();
        if (keyword) {
            utils.addQueryParameter('search', keyword);
            queryParams.append("search", keyword);
        } else {
            utils.removeQueryParameter('search');
        }
        queryParams.append("group", group);

        fetchUsers(pageId, queryParams);
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Users & Controls</li>
                        <li>Users</li>
                    </ul>
                    <h2 className="inDashboardHeader">User List ({usersCount})</h2>
                    <p className="userListAbout">
                        Create & manage multiple sub-users with different access
                    </p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar">
                        <form onSubmit={handleSearch}>
                            <input type="search" placeholder="Search users" onChange={handleKeywordChange} autoComplete="off" value={keyword} />
                            <button className="searchIcon">
                                <img src={search_icon} alt="" />
                            </button>
                        </form>
                    </div>
                    <button className="btn btn-filter" onClick={filterUsers}>
                        <p>Filter</p>
                        <img className="filterIcon" src={filter_icon} alt="" />
                    </button>
                    <button className="creatUserBtn" onClick={toggleCreateHeader}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create an user</span>
                    </button>
                </div>
            </div>
            {usersCount ?
                <>
                    <div className="userListBody">
                        <div className="listBody">
                            <ul className="tableListing">
                                <li className="listHeading">
                                    <div className="userName">User Name</div>
                                    <div className="phoneNum">Phone No</div>
                                    <div className="emailID">Email Id</div>
                                    <div className="role">Role</div>
                                    <div className="assignedGroup">Assigned Group</div>
                                    <div className="status">Status</div>
                                    <div className="createDate">Created on</div>
                                </li>
                                {usersData &&
                                    usersData.map((elem, key) => {
                                        return (
                                            <React.Fragment key={key + "_user"}>
                                                <li className="owerInfo">
                                                    <div className="userName">
                                                        <button className="btn">
                                                            <img className="thumbImg" src={elem.image ? (config.bucketUrl + elem.image) : owner_img_1} alt="avatar" />
                                                            <p>{elem.firstName + ' ' + elem.lastName}</p>
                                                        </button>
                                                    </div>
                                                    <div className="phoneNum">
                                                        <button className="btn">{elem.phone}</button>
                                                    </div>
                                                    <div className="emailID">
                                                        <button className="btn">{elem.email}</button>
                                                    </div>
                                                    <div className="role">
                                                        <button className="btn">{elem.role[0] ? elem.role[0].name : ''}</button>
                                                    </div>
                                                    <div className="assignedGroup">
                                                        <button className="btn">{elem.group[0] ? elem.group[0].name : ''}</button>
                                                    </div>
                                                    <div className="status">
                                                        <button className="btn">{elem.status}</button>
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
                                                                        editUser(elem);
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
                                                                        deleteUser(elem._id);
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
                    <Pagination
                        type="user"
                        paginationData={paginationData}
                        dataCount={usersCount}
                        getData={getDataFn} />
                </> :
                <div className="createNew">
                    <span>
                        <img src={list_board_icon} alt="" />
                        <p>No users found!</p>
                    </span>
                </div>
            }
        </div>
    )
}

export default UsersListing;
