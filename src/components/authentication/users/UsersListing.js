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
import { useLocation } from "react-router-dom";
import config from "../../../configuration/config";
import * as actionTypes from "../../../actions/types";
import { ErrorAlert, SuccessAlert } from '../../shared/messages';
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import noRecords from '../../../assets/images/noRecords.svg';
import list_board_icon from "../../../assets/images/list_board_icon.svg";
import plus_icon from '../../../assets/images/plus_icon.svg';
import moment from "moment";
import responses from '../../../configuration/responses';
import env from '../../../configuration/env';
import ConfirmBox from "../../shared/confirmBox";

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
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const messageDelay = 5000; // ms
    const [tableWidth, setTableWidth] = useState(500);
    const [permissions, setPermissions] = useState(Object.assign({}, ...JSON.parse(localStorage.getItem("permissions")).filter(el => el.entity === "user")));
    console.log('user permission', permissions);
    const [isAlert, setIsAlert] = useState({
        show: false,
        id: null,
    });
    const [time, setTime] = useState(false);
    const handelSize = () => {
        setTableWidth(window.innerWidth - 454);
    }
    const pathURL = useLocation().pathname;

    useEffect(() => {
        handelSize();
    }, []);
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setTime(true);
        }, 200)
    },[])
    const toggleCreateHeader = (e) => {
        // const createPermission = (!env.ACTIVE_PERMISSION_CHECKING)?true:permissions.actions.includes("create");
        // if (createPermission) {
        //     props.toggleCreate(e);
        // } else {
        //     setErrorMsg(responses.permissions.user.create);
        // }

        if (typeof e._id === "undefined") {
            console.log("I am here")
            // const createPermission = (Object.keys(permissions).length) ? permissions.actions.includes("create") : false;
            // if (createPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
            props.toggleCreate(e);
            // } else {
            //     setErrorMsg(responses.permissions.user.create);
            // }
        } else {
            // console.log("Here I am")
            // const updatePermission = (Object.keys(permissions).length) ? permissions.actions.includes("update") : false;
            // if (updatePermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
            props.toggleCreate(e);
            // } else {
            //     setErrorMsg(responses.permissions.user.edit);
            // }
        }
    };

    const dispatch = useDispatch();
    const isFiltered = useSelector((state) => state.user.filter);
    const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null);

    const filterUsers = () => {
        // const readPermission = (!env.ACTIVE_PERMISSION_CHECKING) ? true : ((Object.keys(permissions).length) ? permissions.actions.includes("read") : false);
        // if (readPermission) {
        props.toggleFilter("user");
        // } else {
        //     setErrorMsg(responses.permissions.user.read);
        // }
    };

    /**
     * Set filtered data
     */
    useEffect(() => {
        console.clear()
        console.log("user data",timezoneOffset)
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

    /**
     * Auto hide success or error message
     */
    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg])


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

    /**
     * If delete state is true
     * fetch groups again
     */
    useEffect(() => {
        if (isDeleted) {
            console.log('delete state changed', isDeleted);
            fetchUsers();
            setIsDeleted(false);
        }
    }, [isDeleted])

    /**
     * Set filtered data
     */
    useEffect(() => {
        if (props.getFilteredData) {
            console.log('Reached detination', props.getFilteredData);
            setUsersData(props.getFilteredData.users);
            setUsersCount(props.getFilteredData.pagination.count ? props.getFilteredData.pagination.count : 0);
            dispatch({
                type: actionTypes.USER_COUNT,
                count: props.getFilteredData.pagination.count,
            });
            //Set current page
            setPaginationData({
                ...paginationData,
                currentPage: props.getFilteredData.pagination.currentPage,
                totalPages: props.getFilteredData.pagination.totalPages
            });
        }

    }, [props.getFilteredData])

    const getQueryParams = async () => {
        const search = utils.getQueryVariable('search');
        const group = utils.getQueryVariable('group');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');
        const status = utils.getQueryVariable('status');
        const srtBy = utils.getQueryVariable('sortBy');
        const srtType = utils.getQueryVariable('sortType');

        const queryParams = new URLSearchParams();

        console.log('search', decodeURIComponent(search))
        console.log('dateeeeee', decodeURIComponent(fromDate),'dateeeeee',  decodeURIComponent(toDate))

        if (search) {
            queryParams.append("search", decodeURIComponent(search));
        }
        if (group) {
            queryParams.append("group", group);
        }
        if (fromDate && toDate) {
            queryParams.append('fromDate', decodeURIComponent(fromDate.replaceAll("+", " ")));
            queryParams.append('toDate', decodeURIComponent(toDate.replaceAll("+", " ")));
            console.log("decodeURIComponent", decodeURIComponent(fromDate.replaceAll("+", " ")));
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
        // const readPermission = await permissions.actions.includes("read");
        // const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
        const pageId = utils.getQueryVariable('page');
        const queryParams = await getQueryParams();
        console.log('queryParams', queryParams.toString())
        try {
            setIsLoader(true);
            // // if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
            //     throw new Error(responses.permissions.user.read);
            // }
            const result = await UserServices.fetchUsers(pageId, queryParams);
            // .then((result) => {
            console.log('User listing result', result.users);
            if (result) {
                setUsersData(result.users);
                setUsersCount(result.pagination.count);
                /**
                 * Update store
                 */
                dispatch({
                    type: actionTypes.USER_COUNT,
                    count: result.pagination.count,
                });
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
            }
        } catch (e) {
            // setIsLoader(false);
            console.log("Error in User listing", e);
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

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
        // const updatePermission = (!env.ACTIVE_PERMISSION_CHECKING)?true:permissions.actions.includes("update");
        // if (updatePermission) {
        //     console.log('Edit user Id', user);
        //     toggleCreateHeader(user);
        //     setOption(null);
        // } else {
        //     setErrorMsg(responses.permissions.user.edit);
        // }

    }

    /**
     * Delete user and organization
     */
    const deleteUser = async (user, isConfirmed = null) => {
        let userId = user._id;
        if (!isConfirmed && userId) {
            setIsAlert({
                show: true,
                id: userId,
            });
        } else if (
            (user && !user.isOrganizationOwner && isConfirmed == "yes")
            || (
                user
                && user.isOrganizationOwner
                && isConfirmed == "yes"
            )
        ) {
            try {
                // const deletePermission = (!env.ACTIVE_PERMISSION_CHECKING) ? true : permissions.actions.includes("delete");
                // // if (deletePermission === false) {
                //     throw new Error(responses.permissions.user.delete);
                // }
                /**
                 * Check and delete organization along with its owner
                 */
                if (user.isOrganizationOwner) {
                    await OrganizationServices.delete(user.organization._id);
                }

                /**
                 * Delete the user
                 */
                const result = await UserServices.deleteUser(isAlert.id)
                if (result) {
                    console.log('User delete result', result);
                    setOption(null);
                    setIsDeleted(true);
                    setSuccessMsg("User deleted successfully");
                    setIsAlert({
                        show: false,
                        id: null,
                    });
                }
            } catch (e) {
                console.log("Error in user delete", e);
                setErrorMsg(e.message);
            } finally {
                setIsDeleted(false);
            }
        } else {
            setIsAlert({
                show: false,
                id: null,
            });
        }
    }

    /**
     * Update keyword
     */
    const handleKeywordChange = (event) => {
        let makeKey = decodeURIComponent(event.target.value)
        setKeyword(makeKey ? makeKey : '');
    }

    /**
     * Trigger search when keyword is empty
     */
    useEffect(() => {
        if (keyword == "") {
            handleSearch({ preventDefault: () => { } });
        }
    }, [keyword]);

    /**
     * Handle search functionality
     */
    const handleSearch = (event) => {
        event.preventDefault();

        // const readPermission = (!env.ACTIVE_PERMISSION_CHECKING) ? true : ((Object.keys(permissions).length) ? permissions.actions.includes("read") : false);
        // if (readPermission) {
        utils.addQueryParameter('page', 1);
        if (keyword) {
            utils.addQueryParameter('search', keyword);
        } else {
            utils.removeQueryParameter('search');
        }

        fetchUsers();
        // } else {
        //     setErrorMsg(responses.permissions.user.read);
        // }


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
            {isAlert.show ? (
                <ConfirmBox
                    callback={(isConfirmed) => deleteUser(isAlert.id, isConfirmed)}
                />
            ) : (
                ""
            )}
            <ListHead
                toggleCreateHeader={toggleCreateHeader}
                filterUsers={filterUsers}
                handleSearch={handleSearch}
                handleKeywordChange={handleKeywordChange}
                usersCount={usersCount}
                keyword={keyword}
            />
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert> 
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {usersCount ?
                <>
                    <div className="userListBody" 
                    style={{ 'width': ((pathURL === "/users" || pathURL === "/organizations" || pathURL === "/associations") ? "auto" : tableWidth) }}
                    >
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
                                    {/*<div
                                        className={"role " + (sortBy == "role" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("role")}
                                    >Role</div>
                                    <div
                                        className={"assignedGroup " + (sortBy == "group" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("group")}
                                    >Assigned Group</div>*/}
                                    <div
                                        className="assignedGroup"
                                    >Organization</div>
                                    <div
                                        className="assignedGroup"
                                    >Association</div>
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
                                                        <div className="btn">
                                                            {/* <img className="thumbImg" src={elem.image ? (config.bucketUrl + elem.image) : owner_img_1} alt="avatar" /> */}
                                                            <LazyLoadImage
                                                                className="thumbImg"
                                                                src={elem.image ? (config.bucketUrl + elem.image) : owner_img_1}
                                                                alt="avatar"
                                                                effect="blur"
                                                                placeholderSrc={owner_img_1}
                                                            />
                                                            <p>{elem.firstName + ' ' + elem.lastName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="phoneNum">
                                                        <div className="btn">
                                                            {elem.prefix + '-' + elem.phone}
                                                        </div>
                                                    </div>
                                                    <div className="emailID">
                                                        <div className="btn">{elem.email}</div>
                                                    </div>
                                                    {/*<div className="role">
                                                        <button className="btn">{elem.role[0] ? elem.role[0].name : ''}</button>
                                                    </div>
                                                    <div className="assignedGroup">
                                                        <button className="btn">{elem.group[0] ? elem.group[0].name : ''}</button>
                                                    </div>*/}
                                                    <div className="assignedGroup">
                                                        <div className="btn">{elem.organization ? utils.generateExcerpt(elem.organization.name) : 'N/A'}</div>
                                                    </div>
                                                    <div className="assignedGroup">
                                                        <div className="btn">{elem.association ? elem.association.name : 'N/A'}</div>
                                                    </div>
                                                    <div className="status">
                                                        <div className="btn">{elem.status}</div>
                                                    </div>
                                                    <div className="createDate">
                                                        <div className="btn">{timezoneOffset ? utils.convertUTCToTimezone(elem.createdAt,timezoneOffset) :""
                                                        }
                                                        
                                                        </div>
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
                                                                            className="deleteIcon"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="12.347"
                                                                            height="13.553"
                                                                            viewBox="0 0 12.347 13.553"
                                                                        >
                                                                            <g transform="translate(0.75 0.75)">
                                                                                <path
                                                                                    className="a"
                                                                                    d="M3,6H13.847"
                                                                                    transform="translate(-3 -3.589)"
                                                                                />
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
                    {usersCount > paginationData.limit ?
                        <Pagination
                            type="user"
                            paginationData={paginationData}
                            dataCount={usersCount}
                            callback={fetchUsers} /> : ''
                    }
                </> :
                // <div className="createNew">
                //     <span>
                //         <img src={list_board_icon} alt="" />
                //         <p>No users found!</p>
                //     </span>
                // </div>
                <div className="createNew noInfos authentications">
                    <div className="noRecordsImgWraper">
                        <img src={noRecords} className="noRecords" alt="" />
                        <h4>No Users Found</h4>
                        <p>No users have been listed here yet</p>
                        {(keyword === '' && time) ?
                            <button className="creatUserBtn" onClick={toggleCreateHeader}><img className="plusIcon" src={plus_icon} alt="" /><span>Create the First User</span></button>
                            : ''}
                    </div>
                </div>
            }
        </div>
    )
}

export default UsersListing;
