import React, { Fragment, useCallback, useEffect, useState } from 'react'
import TableOptionsDropdown from '../../shared/TableOptionsDropdown';
import DefaultUserImage from "../../../assets/images/user.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import noRecords from '../../../assets/images/noRecords.svg';
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import { useParams } from 'react-router-dom';
import { AutomationServices } from '../../../services/automation/AutomationServices';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import * as actionTypes from '../../../actions/types'
import Pagination from '../../shared/Pagination';
import moment from 'moment';

export default function AutomationHistory(props) {
    // const [dropdownPos, setDropdownPos] = useState("bottom");
    // const [automationObject, setAutomationObject] = useState({});
    // const [stateTabDetails, setStateTabDetails] = useState("overview");
    const { automationId } = useParams();
    const [automationHistory, setAutomationHistory] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [filterData, setFilterData] = useState({
        fromDate: "",
        toDate: "",
        status: ""
    });
    const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : "UTC");
    const dispatch = useDispatch();

    useEffect(() => {
        fetchHistory();
        return () => {
            setAutomationHistory([]);
            setPaginationData({});
        }
    }, []);

    const fetchHistory = async () => {
        try {
            props.isLoading(true);
            const pageId = utils.getQueryVariable('page') || 1;
            const queryParams = await getQueryParams() || null;
            const res = await AutomationServices.fetchHistory(automationId, pageId, queryParams);
            setAutomationHistory(res.data);
            setPaginationData(res.pagination);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            props.isLoading(false);
        }
    };

    const getQueryParams = async () => {
        const from = utils.getQueryVariable('fromDate');
        const to = utils.getQueryVariable('toDate');
        const status = utils.getQueryVariable('status');
        const queryParams = new URLSearchParams();
        if (from) {
            queryParams.append("fromDate", from);
        }
        if (to) {
            queryParams.append("toDate", to);
        }
        if (status) {
            queryParams.append("status", status);
        }

        return queryParams;
    }

    const paginationCallbackHandle = useCallback(() => {
        fetchHistory();
    }, []);

    const handleFromDate = (e) => {
        const { value } = e.target;
        setFilterData(prevState => ({ ...prevState, fromDate: value }));
    };

    const handletoDate = (e) => {
        const { value } = e.target;
        setFilterData(prevState => ({ ...prevState, toDate: value }));
    };

    const handleStatus = (e) => {
        const { value } = e.target;
        setFilterData(prevState => ({ ...prevState, status: value }));
    };

    const handleApplyFilter = () => {
        if (filterData.fromDate && !filterData.toDate) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "To date is mandatory if you're choosing from date",
                typeMessage: 'error'
            });
            return;
        }
        // const queryParams = Object.entries(filterData).filter(el => el[1] !== '').map(el => `${el[0]}=${el[1]}`).join("&");
        // fetchHistory(queryParams)
        if (filterData.fromDate) {
            utils.addQueryParameter('fromDate', filterData.fromDate);
            utils.addQueryParameter('toDate', filterData.toDate);
        } else {
            utils.removeQueryParameter('fromDate');
            utils.removeQueryParameter('toDate');
        }
        if (filterData.status) {
            utils.addQueryParameter('status', filterData.status);
        } else {
            utils.removeQueryParameter('status');
        }

        fetchHistory();
    }

    return (
        <Fragment>
            <div className="tabBodyInner">
                <div className="overviewFilter auto_history">
                    <div className="formBody">
                        <div className="formField">
                            <p>From</p>
                            <div className="inFormField">
                                <input
                                    type="date"
                                    name='fromdate'
                                    max={moment().format('YYYY-MM-DD')}
                                    onChange={handleFromDate}
                                    placeholder="dd/mm/yyyy"
                                    value={filterData.fromDate}
                                />
                            </div>
                        </div>
                        <div className="formField">
                            <p>To</p>
                            <div className="inFormField">
                                <input type="date"
                                    name='todate'
                                    min={filterData.fromDate}
                                    max={moment().format('YYYY-MM-DD')}
                                    disabled={(filterData.fromDate) ? false : true}
                                    onChange={handletoDate}
                                    value={(filterData.fromDate) ? filterData.toDate : ''}
                                    placeholder="dd/mm/yyyy" />
                            </div>
                        </div>
                        <div className="formField selectStatusOverview">
                            <div className="inFormField">
                                <select onChange={handleStatus} value={filterData.status} style={{ backgroundImage: "url(" + arrowDown + ")" }}>
                                    <option value="">Select status</option>
                                    <option value="Initialized">In-Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-dBlue btn-Overviewfilter"
                            onClick={handleApplyFilter}>
                            Apply Filter
                            <img className="" src={arrow_forward} alt="" />
                        </button>
                    </div>
                </div>

                <div className="overviewTable">
                    <div className="listHead auto_history">
                        <div className="listCell cellWidth_20">
                            Contact Details
                        </div>
                        {/* <div className="listCell cellWidth_45">
                            Stages Completed
                        </div> */}
                        <div className="listCell cellWidth_20">Status</div>
                        <div className="listCell cellWidth_15">
                            Created On
                        </div>
                        <div className="listCell cellWidth_15">
                            Completed On
                        </div>
                    </div>

                    {automationHistory.length > 0 ?
                        automationHistory.map((elem, i) => {
                            return (
                                <>
                                    {/* {console.log(elem)} */}
                                    <div className="listRow" key={"automation_history_" + i}>
                                        <div className="listCell cellWidth_20">
                                            <figure
                                                className="contactImage"
                                                style={{
                                                    backgroundImage:
                                                        "url(" +
                                                        (elem.contactDisplay
                                                            ? elem.contactDisplay
                                                            : owner_img_1) +
                                                        ")",
                                                }}
                                            ></figure>
                                            <p>{(elem.firstName || "-") + " "+ (elem.lastName || "")}</p>
                                        </div>
                                        {/* <div className="listCell cellWidth_45">
                                            <span>
                                                {elem.completedStages} of {elem.totalStages}
                                            </span>
                                            <div className="progressBar">
                                                <div className="bar">
                                                    <div
                                                        className="fill"
                                                        style={{
                                                            width:
                                                                (elem.completedStages /
                                                                    elem.totalStages) *
                                                                100 +
                                                                "%",
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="listCell cellWidth_20">
                                            <span
                                                style={{
                                                    color:
                                                        (elem.automationStatus.toLowerCase() === "failed")
                                                            ? "#ED707A"
                                                            : elem.automationStatus.toLowerCase() === "initialized"
                                                                ? "#FF9D00"
                                                                : "#46D35C",
                                                }}
                                            >
                                                {(elem.automationStatus.toLowerCase() === 'initialized') ? 'In-Progress' : elem.automationStatus}
                                            </span>
                                        </div>
                                        <div className="listCell cellWidth_15">
                                            {utils.convertUTCToTimezone(elem.createdAt, timezone, "LLL")}
                                        </div>
                                        <div className="listCell cellWidth_15">
                                            {(elem?.completedAt) ? utils.convertUTCToTimezone(elem?.completedAt, timezone, "LLL") : "-"}
                                        </div>
                                    </div>
                                </>
                            );
                        }) : (<div className="createNew noInfos">
                            <div className="noRecordsImgWraper">
                                <img src={noRecords} className="noRecords" alt="" />
                                <h4>No Automation History Found</h4>
                                <p>No automation history have been listed here</p>
                            </div>
                        </div>)}
                </div>
                {paginationData.count > 10 ? (
                    <Pagination
                        paginationData={paginationData}
                        dataCount={paginationData.count}
                        callback={paginationCallbackHandle}
                    />
                ) : (
                    ""
                )}
            </div>
        </Fragment>
    )
}
