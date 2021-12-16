import React, { useEffect, useState, useRef, createRef } from 'react';
import { useDispatch } from "react-redux";
import ConfirmBox from '../../shared/confirmBox';
import Loader from '../../shared/Loader';
import { ErrorAlert, SuccessAlert } from '../../shared/messages';
import ListHead from '../auth-shared/ListHead';
import list_board_icon from "../../../assets/images/list_board_icon.svg";
import { OrganizationServices } from '../../../services/authentication/OrganizationServices';
import { utils } from "../../../helpers";
import env from "../../../configuration/env";
import responses from "../../../configuration/responses";
import * as actionTypes from "../../../actions/types";
import moment from "moment";
import Pagination from "../../shared/Pagination";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import config from "../../../configuration/config";

const OrganizationListing = () => {
    const [organizationsData, setOrganizationsData] = useState(null);
    const [organizationsCount, setOrganizationsCount] = useState(0);
    const [paginationData, setPaginationData] = useState(
        {
            count: null,
            totalPages: null,
            currentPage: 1,
            limit: 10
        }
    );
    const [isLoader, setIsLoader] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const messageDelay = 5000; // ms
    const optionsToggleRefs = useRef([]);
    const dispatch = useDispatch();
    const [permissions, setPermissions] = useState(Object.assign({}, ...JSON.parse(localStorage.getItem("permissions")).filter(el => el.entity === "organization")));

    /**
     * Auto hide success or error message
     */
    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg])

    useEffect(() => {
        /**
         * Fetch organizations
         */
        fetchOrganizations();
    }, []);

    /**
     * Handle sort by
     */
    const handleSortBy = (field) => {
        // Set sort type
        let type = "asc";
        if (field == sortBy) {
            if (sortType == "asc") {
                type = "dsc";
            }
        }

        // Set state and Update query param
        setSortBy(field);
        setSortType(type);
        utils.addQueryParameter("sortBy", field);
        utils.addQueryParameter("sortType", type);

        // Fetch data
        fetchOrganizations();
    };

    /**
     * Handle pagination click
     */
    const paginationCallbackHandle = () => {
        fetchOrganizations();
    };

    /**
     * Get all query params
     */
    const getQueryParams = async () => {
        const keyword = utils.getQueryVariable("search");
        const fromDt = utils.getQueryVariable("fromDate");
        const toDt = utils.getQueryVariable("toDate");
        const srtBy = utils.getQueryVariable("sortBy");
        const srtType = utils.getQueryVariable("sortType");
        const queryParams = new URLSearchParams();
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
    };
    /**
     * Function to fetch organizations
     * @returns
     */
    const fetchOrganizations = async () => {
        const readPermission = Object.keys(permissions).length
            ? await permissions.actions.includes("read")
            : false;
        console.log("Permission", permissions);
        let pageId = utils.getQueryVariable("page") || 1;
        let queryParams = await getQueryParams();
        try {
            setIsLoader(true);
            if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
                throw new Error(responses.permissions.organization.read);
            }
            const result = await OrganizationServices.fetchOrganizations(pageId, queryParams);
            console.log("Data", result.organizations);
            if (result) {
                optionsToggleRefs.current = (result.organizations.map(() => createRef()));
                setOrganizationsData(result.organizations);
                setOrganizationsCount(result.pagination.count);
                // UPDATE STORE
                dispatch({
                    type: actionTypes.ORGANIZATION_COUNT,
                    count: result.pagination.count,
                });
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages,
                });
                setIsLoader(false);
            }
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    };

    /**
     * Status toggle
     * @param {*} ev 
     * @param {*} id 
     * @param {*} key 
     */
    const statusToggle = async (id, key) => {
        try {
            console.log('id', id, 'key', key, organizationsData);
            organizationsData[key].status = organizationsData[key].status == "active" ? "inactive" : "active";
            setOrganizationsData([...organizationsData]);
            setIsLoader(true);
            await OrganizationServices.organizationToggleStatus(id);
            setIsLoader(false);

            setSuccessMsg("Status has been changed successfully");
        } catch (e) {
            organizationsData[key].status = organizationsData[key].status == "active" ? "inactive" : "active";
            setOrganizationsData([...organizationsData]);
            setIsLoader(false);
            setErrorMsg(e.message);
        }

    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <ListHead
                organizationsCount={organizationsCount}
            />
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {organizationsCount ?
                <>
                    <div className="userListBody">
                        <div className="listBody">
                            <ul className="tableListing">
                                <li className="listHeading userRole">
                                    <div
                                        className={
                                            "userName " + (sortBy == "name" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("name")}
                                    >
                                        Organization Name
                                    </div>
                                    <div
                                        className={
                                            "userName " + (sortBy == "name" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("name")}
                                    >
                                        Organization Owner
                                    </div>
                                    <div
                                        className={
                                            "phoneNum assignedPeople " +
                                            (sortBy == "people" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("people")}
                                    >
                                        No. of people
                                    </div>
                                    <div>
                                        Status
                                    </div>
                                    <div
                                        className={
                                            "createDate " +
                                            (sortBy == "createdAt" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("createdAt")}
                                    >
                                        Created on
                                    </div>
                                    <div
                                        className={
                                            "createDate " +
                                            (sortBy == "updatedAt" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("updatedAt")}
                                    >
                                        Updated on
                                    </div>
                                </li>
                                {organizationsData
                                    ? organizationsData.map((elem, key) => {
                                        return (
                                            <React.Fragment key={key + "_org"}>
                                                <li className="owerInfo" key={elem._id}>
                                                    <div className="userName">
                                                        <button className="btn">
                                                            <LazyLoadImage
                                                                className="thumbImg"
                                                                src={elem.logo ? (config.bucketUrl + elem.logo) : owner_img_1}
                                                                alt="avatar"
                                                                effect="blur"
                                                                placeholderSrc={owner_img_1}
                                                            />
                                                            <p>{elem.name}</p>
                                                        </button>
                                                    </div>
                                                    <div className="phoneNum">
                                                        <button className="btn">{(elem.owner ? elem.owner.firstName + ' ' + elem.owner.lastName : '')}</button>
                                                    </div>
                                                    <div className="phoneNum">
                                                        <button className="btn">{elem.userCount}</button>
                                                    </div>
                                                    <div>
                                                        <label className={elem.status === "active" ? "toggleBtn active" : "toggleBtn"}>
                                                            <input
                                                                type="checkbox"
                                                                onChange={() => {
                                                                    statusToggle(elem._id, key);
                                                                }}
                                                            />
                                                            <span className="toggler"></span>
                                                        </label>
                                                    </div>
                                                    <div className="createDate" ref={optionsToggleRefs.current[key]}>
                                                        <button className="btn">
                                                            {moment(elem.createdAt).format("Do MMM YYYY")}
                                                        </button>
                                                    </div>
                                                    <div className="createDate">
                                                        <button className="btn">
                                                            {moment(elem.updatedAt).format("Do MMM YYYY")}
                                                        </button>
                                                    </div>
                                                </li>
                                            </React.Fragment>
                                        );
                                    })
                                    : ""}
                            </ul>
                        </div>
                    </div>
                    {organizationsCount > paginationData.limit ? (
                        <Pagination
                            type="organization"
                            paginationData={paginationData}
                            dataCount={organizationsCount}
                            callback={paginationCallbackHandle}
                        />) : ''}

                </> :
                <div className="createNew">
                    <span>
                        <img src={list_board_icon} alt="" />
                        <p>No Organizations found!</p>
                    </span>
                </div>
            }

        </div>
    )
}

export default OrganizationListing
