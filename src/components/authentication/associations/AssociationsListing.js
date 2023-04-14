import React, { useState, useEffect } from 'react';
import Loader from '../../shared/Loader';
import { useDispatch, useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from '../../shared/messages';
import ListHead from '../auth-shared/ListHead';
import list_board_icon from "../../../assets/images/list_board_icon.svg";
import * as actionTypes from "../../../actions/types";
import { utils } from "../../../helpers";
import { AssociationServices } from '../../../services/authentication/AssociationServices';
import moment from "moment";
import Pagination from "../../shared/Pagination";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import config from "../../../configuration/config";


const AssociationsListing = () => {
    const [associationsData, setAssociationsData] = useState(null);
    const [associationsCount, setAssociationsCount] = useState(0);
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
    const dispatch = useDispatch();
    const messageDelay = 5000; // ms


    const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null);


    /**
     * Auto hide success or error message
     */
     useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg])

    useEffect(() => {
        /**
         * Fetch associations
         */
         fetchAssociations();
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
        fetchAssociations();
    };

    /**
     * Handle pagination click
     */
    const paginationCallbackHandle = () => {
        fetchAssociations();
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
     * Function to fetch associations
     * @returns
     */
    const fetchAssociations = async () => {
        let pageId = utils.getQueryVariable("page") || 1;
        let queryParams = await getQueryParams();
        try {
            setIsLoader(true);
            const result = await AssociationServices.fetchAssociations(pageId, queryParams);
            console.log("Data", result.associations);
            if (result) {
                setAssociationsData(result.associations);
                setAssociationsCount(result.pagination.count);
                // UPDATE STORE
                dispatch({
                    type: actionTypes.ASSOCIATION_COUNT,
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


    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <ListHead associationsCount={associationsCount}/>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {
                associationsCount ?
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
                                        Association Name
                                    </div>
                                    <div
                                        className="phoneNum assignedPeople sortOff"
                                        
                                    >
                                        Association Owner
                                    </div>
                                    <div
                                        className="phoneNum assignedPeople sortOff"
                                    >
                                        Assigned Organization
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
                                {associationsData
                                    ? associationsData.map((elem, key) => {
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
                                                        <button className="btn">{(elem.organization ? utils.generateExcerpt(elem.organization.name) : 'N/A')}</button>
                                                    </div>
                                                    <div className="createDate">
                                                        <button className="btn">
                                                            {/* {moment(elem.createdAt).format("Do MMM YYYY")} */}
                                                            {utils.convertUTCToTimezone(elem.createdAt,timezoneOffset)
                                                            }

                                                        </button>
                                                    </div>
                                                    <div className="createDate">
                                                        <button className="btn">
                                                            {/* {moment(elem.updatedAt).format("Do MMM YYYY")} */}
                                                            {utils.convertUTCToTimezone(elem.updatedAt,timezoneOffset)
                                                            }
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
                    {associationsCount > paginationData.limit ? (
                        <Pagination
                            type="association"
                            paginationData={paginationData}
                            dataCount={associationsCount}
                            callback={paginationCallbackHandle}
                        />) : ''}

                    </> :
                    <div className="createNew">
                        <span>
                            <img src={list_board_icon} alt="" />
                            <p>No Associations found!</p>
                        </span>
                    </div>
            }

        </div>
    )
}

export default AssociationsListing
