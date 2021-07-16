import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Pagination from "../../shared/Pagination";
import ListHead from '../auth-shared/ListHead';
import { UserServices } from "../../../services/authentication/UserServices";
import { OrganizationServices } from "../../../services/authentication/OrganizationServices";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import config from "../../../configuration/config";
import * as actionTypes from "../../../actions/types";

import owner_img_1 from "../../../assets/images/owner_img_1.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import list_board_icon from "../../../assets/images/list_board_icon.svg";
import moment from "moment";

const UsersListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [usersData, setUsersData] = useState(null);
    const [usersCount, setUsersCount] = useState(0);
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
    const [keyword, setKeyword] = useState('');
    const [option, setOption] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    const toggleCreateHeader = (e) => {
        props.toggleCreate(e);
    };

    const dispatch = useDispatch();
    const isFiltered = useSelector((state) => state.user.filter);


    const filterUsers = () => {
        props.toggleFilter("user");
    };

    /**
     * Set filtered data
     */
    useEffect(() => {
        if (isFiltered) {
            console.log('is filtered inside');
            fetchUsers();
            // UPDATE STORE
            dispatch({
                type: actionTypes.USER_FILTER,
                filter: false
            });
        }

    }, [isFiltered]);


    useEffect(() => {
        /**
         * Get page id and keyword from URL
         */
        let param = utils.getQueryVariable('search');
        if (param) {
            setKeyword(param);
        }
        /**
         * Call to fetch roles
         */
        console.log('param', param)
        fetchUsers();
    }, []);

    const getQueryParams = async () => {
        const search = utils.getQueryVariable('search');
        const group = utils.getQueryVariable('group');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');
        const status = utils.getQueryVariable('status');
        const srtBy = utils.getQueryVariable('sortBy');
        const srtType = utils.getQueryVariable('sortType');

        const queryParams = new URLSearchParams();

        console.log('search', search)
        if (search) {
            queryParams.append("search", search);
        }
        if (group) {
            queryParams.append("group", group);
        }
        if (fromDate && toDate) {
            queryParams.append('fromDate', fromDate);
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
        return queryParams;
    }

    /**
     * Function to fetch users
     * @returns 
     */
    const fetchUsers = async () => {

        const pageId = utils.getQueryVariable('page');
        const queryParams = await getQueryParams();
        console.log('queryParams', queryParams.toString())
        try {
            setIsLoader(true);
            const result = await UserServices.fetchUsers(pageId, queryParams);
                // .then((result) => {
            console.log('User listing result', result.users);
            if (result) {
                setUsersData(result.users);
                setUsersCount(result.pagination.count);
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
            }
        } catch (e) {
            // setIsLoader(false);
            console.log("Error in User listing", e);
        } finally {
            setIsLoader(false);
        }
    }

    // const paginationCallbackHandle = () => {
    //     fetchUsers();
    // }


    /**
     * Handle options toggle
     */
    const toggleOptions = (index) => {
        // setOption(index !== null ? (option !== null ? null : index) : null);
        setOption(index !== option ? index : null);
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
     * Delete user and organization
     */
    const deleteUser = async (user) => {
        if (
            (user && !user.isOrganizationOwner)
            || (
                user
                && user.isOrganizationOwner
                && window.confirm("Are you sure! want to delete the organization and its owner?")
            )
        ) {
            try {
                /**
                 * Check and delete organization along with its owner
                 */
                if (user.isOrganizationOwner) {
                    await OrganizationServices.delete(user.organization._id);
                }

                /**
                 * Delete the user
                 */
                const result = await UserServices.deleteUser(user._id)
                    // .then((result) => {
                if (result) {
                    console.log('Role delete result', result);
                    const newList = usersData.filter((u) => u._id !== user._id);
                    setUsersData(newList);
                    setOption(null);
                }
                    // })
                    // .catch((error) => {
                    //     console.log("Role delete error", error);
                    // });
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

        utils.addQueryParameter('page', 1);
        if (keyword) {
            utils.addQueryParameter('search', keyword);
        } else {
            utils.removeQueryParameter('search');
        }

        fetchUsers();
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
        fetchUsers()
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <ListHead
                toggleCreateHeader={toggleCreateHeader}
                filterUsers={filterUsers}
                handleSearch={handleSearch}
                handleKeywordChange={handleKeywordChange}
                usersCount={usersCount}
                keyword={keyword}
            />
            {usersCount ?
                <>
                    <div className="userListBody">
                        <div className="listBody">
                            <ul className="tableListing">
                                <li className="listHeading">
                                    <div
                                        className={"userName " + (sortBy == "name" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("name")}
                                    >User Name</div>
                                    <div
                                        className={"phoneNum " + (sortBy == "phone" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("phone")}
                                    >Phone No</div>
                                    <div
                                        className={"emailID " + (sortBy == "email" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("email")}
                                    >Email Id</div>
                                    <div
                                        className={"role " + (sortBy == "role" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("role")}
                                    >Role</div>
                                    <div
                                        className={"assignedGroup " + (sortBy == "group" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("group")}
                                    >Assigned Group</div>
                                    <div
                                        className={"status " + (sortBy == "status" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("status")}
                                    >Status</div>
                                    <div
                                        className={"createDate " + (sortBy == "createdAt" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("createdAt")}
                                    >Created on</div>
                                </li>
                                {usersData &&
                                    usersData.map((elem, key) => {
                                        return (
                                            <React.Fragment key={key + "_user"}>
                                                <li className="owerInfo">
                                                    <div className="userName">
                                                        <button className="btn">
                                                            {/* <img className="thumbImg" src={elem.image ? (config.bucketUrl + elem.image) : owner_img_1} alt="avatar" /> */}
                                                            <LazyLoadImage
                                                                className="thumbImg"
                                                                src={elem.image ? (config.bucketUrl + elem.image) : owner_img_1}
                                                                alt="avatar"
                                                                effect="blur"
                                                                placeholderSrc={owner_img_1}
                                                            />
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
                                                                        deleteUser(elem);
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
                    {usersCount > paginationData.limit?
                    <Pagination
                        type="user"
                        paginationData={paginationData}
                        dataCount={usersCount}
                        callback={fetchUsers} />:''
                    }
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
