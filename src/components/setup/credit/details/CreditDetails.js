import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import arrow1 from "../../../../assets/images/arrow1.svg";
import cd_walet_icon from "../../../../assets/images/cd_walet_icon.svg";
import cd_sms_icon from "../../../../assets/images/cd_sms_icon.svg";
import cd_call_icon from "../../../../assets/images/cd_call_icon.svg";
import { CreditManagementServices } from "../../../../services/setup/CreditManagementServices";
import moment from "moment";
import Loader from "../../../shared/Loader";
import { utils } from "../../../../helpers";
import Pagination from "../../../shared/Pagination";
import noRecords from '../../../../assets/images/noRecords.svg';
import { useLocation } from "react-router-dom";


const CreditDetails = () => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterDate, setFilterDate] = useState([new Date(), new Date()]);
    const [logsCount, setLogsCount] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const isDisplay = false;


    const loggedInUser = useSelector((store) => store.user.data);

    useEffect(() => {
        let isMounted = true;
        // Fetch data for socket update
        if (isMounted) {
            fetchTransaction();
        }

        return () => (isMounted = false)

    }, [loggedInUser]);

    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10,
    });


    const getQueryParams = async () => {
        const service = utils.getQueryVariable("service");
        const fromDt = utils.getQueryVariable("fromDate");
        const toDt = utils.getQueryVariable("toDate");
        const srtBy = utils.getQueryVariable("sortBy");
        const srtType = utils.getQueryVariable("sortType");
        const queryParams = new URLSearchParams();
        if (service) {
            queryParams.append("service", service);
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
        fetchTransaction();
    };

    const handleDateFileterChange = (dateDuration) => {
        console.log('date filter', dateDuration);
        if (dateDuration && dateDuration.length) {
            utils.addQueryParameter('fromDate', moment(dateDuration[0]).format("YYYY-MM-DD"));
            utils.addQueryParameter('toDate', moment(dateDuration[1]).format("YYYY-MM-DD"));
            setFilterDate(dateDuration);
        }

        // Fetch data
        fetchTransaction();
    }

    //Handle pagination click
    const paginationCallbackHandle = useCallback(() => {
        fetchTransaction();
    }, []);


    const fetchTransaction = async () => {

        let queryParams = await getQueryParams();
        let pageId = utils.getQueryVariable("page");
        pageId = pageId ? pageId : 1;

        try {
            setLoading(true);
            let response = await CreditManagementServices.fetchTransaction(pageId, queryParams);
            if (response) {
                setTransactionList(response.transactions);
                setLogsCount(response.pagination.count);
                setPaginationData({
                    ...paginationData,
                    currentPage: response.pagination.currentPage,
                    totalPages: response.pagination.totalPages,
                });
            }
            console.log("Credit transaction response:: ", response);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleServiceChange = (e) => {
        console.log('service change', e.target.value);
        let service = e.target.value;
        if (service && service !== 'all') {
            utils.addQueryParameter('service', e.target.value);
        } else {
            utils.removeQueryParameter('service');
        }
        fetchTransaction();
    }


    return (
        <React.Fragment>
            {loading && <Loader />}
            <div className="cr_body">
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup</li>
                            <li>Credit Management</li>
                            <li>Credit Report</li>
                        </ul>
                        <h2 className="inDashboardHeader">Credit Report</h2>
                        <p className="userListAbout">Credit history Report for your Organization</p>
                    </div>
                    <div className="cr_featureShowStat">
                        <h3>Credit Balance : <span> {loggedInUser ? loggedInUser.credit.toLocaleString() : 0}</span></h3>
                    </div>
                    <div className="listFeatures">

                        <select className="cmnFieldStyle cr_select" onChange={handleServiceChange}>
                            <option value="all">All</option>
                            <option value="call">Call</option>
                            {isDisplay ? <option value="sms">SMS</option> : ''}
                            <option value="point-credited">Points Credited</option>
                        </select>
                        <div className="cr_dateInput formControl">
                            <DateRangePicker onChange={handleDateFileterChange} value={filterDate} format="dth MMMyyyy" />
                        </div>
                    </div>
                </div>
                <div className="userListBody">
                    <div className="listBody cr_tableListing" >
                        {transactionList.length ?
                            <ul className="tableListing">
                                <li className="listHeading ">
                                    <div className={"cr_td_head" + (sortBy == "crItems" ? "sort " + sortType : "")}
                                        onClick={() => handleSortBy("crItems")}>
                                        Credit Items
                                    </div>
                                    <div className="cr_td_head vacent">Amount</div>
                                    <div className="cr_td_head vacent">Transaction ID </div>
                                    <div className={"cr_td_head" + (sortBy == "date" ? "sort " + sortType : "")} onClick={() => handleSortBy("date")}>Date</div>
                                    <div className={"cr_td_head" + (sortBy == "time" ? "sort " + sortType : "")} onClick={() => handleSortBy("time")}>Time</div>
                                    <div className="cr_td_head vacent">Credit/Debit</div>
                                </li>
                                {transactionList.map((item, index) => {
                                    return (
                                        <li key={"trx_" + index}>
                                            <div className="cr_successDetails">
                                                <img src={item.serviceSlug === "point-credited" ? cd_walet_icon : (item.serviceSlug === "sms" ? cd_sms_icon : cd_call_icon)} alt="" />
                                                <div className="text">
                                                    <h3>{item.status}</h3>
                                                    <p><span>Service:  </span> {item.service}</p>
                                                </div>
                                            </div>
                                            <div className={item.approved_amount ? "cr_amount" : "cr_td"}>
                                                {item.type === "credit" ? "$" + item.approved_amount : "N/A"}
                                            </div>
                                            <div className="cr_td">
                                                {item.type === "credit" ? item.transaction_id : "N/A"}
                                            </div>
                                            <div className="cr_date">
                                                {moment(item.createdAt.split(" ")[0], 'YYYY-MM-DD').format('Do MMM, YYYY')}
                                            </div>
                                            <div className="cr_date">
                                                {moment(item.createdAt.split(" ")[1], 'hh:mm A').format('hh:mm A')}
                                            </div>
                                            <div className="cr_credit">
                                                <span className={item.type === "credit" ? "greentxt" : "redtxt"}>{item.type === "credit" ? "+" + item.credit : "-" + item.credit}</span>
                                            </div>
                                        </li>
                                    )
                                })}

                            </ul>
                            :
                            <div className="cr_noInfos">
                                <div className="noRecordsImgWraper">
                                    <img src={noRecords} className="noRecords" alt="" />
                                    <h4>No Records Found</h4>
                                    <p>No Records have been listed here yet</p>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                {logsCount > paginationData.limit ? (
                    <Pagination
                        type="creditTransaction"
                        paginationData={paginationData}
                        dataCount={logsCount}
                        callback={paginationCallbackHandle}
                    />) : ''}
            </div>
        </React.Fragment>
    )
}

export default CreditDetails;