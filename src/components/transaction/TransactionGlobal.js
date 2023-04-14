import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import TransactionHead from './Transactionhead';
import ImportTransactionFilter from './TransactionFilter';
import arrowDown from "../../assets/images/arrowDown.svg";
import owner_img_1 from "../../assets/images/owner_img_1.png";
import cash from "../../assets/images/cash2.svg";
import card from "../../assets/images/card2.svg";
import bank from "../../assets/images/bank2.svg";
import refund from "../../assets/images/refund_icon_white.svg";
import download from "../../assets/images/download2.svg";
import noRecords from "../../assets/images/noRecords.svg";
import {TransactionHistoryServices} from "../../services/transaction/TransactionHistoryServices";
import {utils} from '../../helpers';
import Loader from "../shared/Loader";
import Pagination from '../shared/Pagination';
import * as actionTypes from "../../actions/types";
import PDFDocument from '../shared/contactModal/pdf/pdfdocument';
import {PDFDownloadLink} from '@react-pdf/renderer';

const TransactionGlobal = (props) => {
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [option, setOption] = useState(null);
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10,
    });
    const [oldTransactionList, setOldTransactionList] = useState([]);
    const [contact, setContact] = useState();
    const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : "UTC");
    const org = useSelector((state) => (state.user?.data) ? state.user.data : "");
    const modalId = useSelector((state) => state.contact.contact_modal_id);
    const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null); 
    const openFilter = (e) => {
        setShowFilter(true)
    }
    const closeFilter = (e) => {
        setShowFilter(false)
    }
    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };
    const applyFilter = (e) => {
        setShowFilter(false)
    }

    const getUnique = (arr, index) => {
        return arr.map(e => e[index]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
    }
    const fetchTransHistoryList = async (pageNo) => {
        try {
            setIsLoader(true);
            let page = pageNo ? pageNo : utils.getQueryVariable("page");
            const queryParams = await getQueryParams();
            const response = await TransactionHistoryServices.fetchTransHistoryList(queryParams, page);
            setOldTransactionList(response.transactions.map(el => {
                if (!el.history.length && el.due_date < moment()?.format("YYYY-MM-DD")) {
                    el.status = "overdue";
                }
                return el;
            }));
            setPaginationData({
                ...paginationData,
                count: response.pagination.count,
                currentPage: response.pagination.currentPage,
                totalPages: response.pagination.totalPages
            });
            let transactions = response.transactions;
            let filteredTransaction = transactions.map(el => {
                if (el.contact && (el.contact?.firstName || el.contact?.lastName)) {
                    return {
                        id: el.contact._id,
                        name: el.contact?.firstName + " " + el.contact?.lastName
                    };
                }
            });
            const uniqueNames = getUnique(filteredTransaction, 'name');
            setContact(uniqueNames);
            setShowFilter(false);
        } catch (e) {
            console.log('error', e)
        } finally {
            setIsLoader(false);
        }
    };

    const getQueryParams = async () => {
        const status = utils.getQueryVariable('status');
        console.log(status)
        const item = utils.getQueryVariable('item');
        const contact = utils.getQueryVariable('contact');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');
        const search = utils.getQueryVariable('search');
        const queryParams = new URLSearchParams();
        if (fromDate) {
            queryParams.append('fromDate', fromDate);
        }
        if (toDate) {
            queryParams.append('toDate', toDate);
        }
        if (status) {
            queryParams.append("status", status);
        }
        if (contact) {
            queryParams.append("contact", contact);
        }
        if (item) {
            queryParams.append("item", item);
        }
        if (search) {
            let searchDecoded = decodeURIComponent(search).replace(/\+/g, " ");
            queryParams.append("keyword", searchDecoded);
        }
        return queryParams;
    }

    useEffect(() => {
        const pageNo = utils.getQueryVariable("page") || 1;
        fetchTransHistoryList(pageNo);
    }, [modalId]);

    const getFilterStr = () => {
        console.log('dasdasdas')
        fetchTransHistoryList("1");
        setShowFilter(false);
    };

    const paginationCallbackHandle = () => {
        let pageNo = utils.getQueryVariable("page");
        fetchTransHistoryList(pageNo);
    };

    const clearFilter = () => {
        utils.removeQueryParameter('status');
        utils.removeQueryParameter('item');
        utils.removeQueryParameter('contact');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
        utils.addQueryParameter("page", 1);
        fetchTransHistoryList(1);
        setShowFilter(false);


    };
    const openContactModal = (e) => {
        console.log(e.contactId)
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: {
                "id": e.contactId,
                "page": 4
            },
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CONTACTS_MODAL_ID,
                contact_modal_id: {
                    "id": e.contactId
                },
            }, 100);
        })
    }
    
    useEffect(()=>{
        console.log("transaction time zone:", timezoneOffset)
    },[timezoneOffset]);
    return (
        <>
            <div className='dashInnerUI'>
                {isLoader ? <Loader /> : ""}
                <TransactionHead
                    openFilter={openFilter}
                    search={() => fetchTransHistoryList(1)}
                    transactionCount={paginationData?.count}
                />
                <div className='userListBody'>
                    {oldTransactionList?.length ?
                        <div className="overviewTable tarnsGlobal">
                            <div className="listHead auto_history">
                                <div className="listCell cellWidth_15">Name</div>
                                <div className="listCell cellWidth_15">Email Id</div>
                                <div className="listCell cellWidth_15">Date Time</div>
                                <div className="listCell cellWidth_15">Transaction ID</div>
                                <div className="listCell cellWidth_10">Amount</div>
                                <div className="listCell cellWidth_10">Item Type</div>
                                <div className="listCell cellWidth_7 center">No. of Item</div>
                                <div className="listCell cellWidth_8 center">Status</div>
                                <div className="listCell cellWidth_5 center">&nbsp;</div>
                            </div>
                            {
                                oldTransactionList?.length ? oldTransactionList.map((tHistory, key) => {
                                    return (
                                        <>
                                            <div className="listRow transGlobal" key={"trx_" + key}>
                                                <div className="listCell cellWidth_15" onClick={() => openContactModal(tHistory)}>
                                                    <div className="rowImage">
                                                        <img src={owner_img_1} alt="" />
                                                    </div>
                                                    {tHistory.contact && tHistory.contact._id ?
                                                        <button className='noBg commonColor'> {tHistory?.contact?.firstName} {tHistory?.contact?.lastName}</button> :
                                                        <button className='noBg commonColor' style={{ color: "#9BAEBC" }} title="Contact Deleted"> {tHistory?.contactDeleted?.firstName} {tHistory?.contactDeleted?.lastName}</button>

                                                    }

                                                </div>
                                                <div className="listCell cellWidth_15">
                                                    <button className='noBg'><span className='blueTxt'>{tHistory.contact && tHistory.contact._id ? tHistory?.contact?.email : tHistory?.contactDeleted?.email}</span></button>
                                                </div>
                                                <div className="listCell cellWidth_15">
                                                    {timezoneOffset ? utils.convertUTCToTimezone(tHistory?.last_transaction_date,timezoneOffset) : "..."}
                                                    {/* {(!tHistory?.last_transaction_date) ?
                                                        (
                                                            <>
                                                                {moment(utils.convertUTCToTimezone(tHistory?.due_date, timezone, 'YYYY-MM-DD HH:mm:ss')).format('Do MMM, YYYY')}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {moment(utils.convertUTCToTimezone(tHistory?.last_transaction_date, timezone, 'YYYY-MM-DD HH:mm:ss')).format('Do MMM, YYYY')}
                                                                <span className='doomed'> &nbsp;
                                                                    {moment(utils.convertUTCToTimezone(tHistory?.last_transaction_date, timezone, 'YYYY-MM-DD HH:mm:ss')).format('hh:mm A')}
                                                                </span>
                                                            </>
                                                        )} */}

                                                </div>
                                                <div className="listCell cellWidth_15"><span className='spanned'>{(!tHistory?.last_transaction_date) ? "N/A" : tHistory?.history[0]?.transactionId || tHistory?.history[0]?.transaction_id}</span></div>
                                                <div className="listCell cellWidth_10">
                                                    <span className='boldTxt'>${Math.abs(tHistory?.amount).toFixed(2)}</span>
                                                    {tHistory?.history[tHistory?.history?.length - 1]?.refunded_amount ?
                                                        <span className="refundAmmount">-${Math.abs(tHistory?.history[tHistory?.history?.length - 1]?.refunded_amount).toFixed(2)}</span>
                                                        : ""}
                                                </div>
                                                <div className="listCell cellWidth_10">{tHistory?.transaction_for === "course" ? "Program" : "Product"}</div>
                                                <div className="listCell cellWidth_7 center">
                                                    {tHistory.transaction_for === "product" ?
                                                        <div className='proListed'>
                                                            <span className='numberTag'>{tHistory?.items?.length}</span>

                                                            <div className='productDetails' >
                                                                {
                                                                    tHistory?.items && tHistory?.items.map((prolist, key2) => {
                                                                        return (

                                                                            <div className='indiviPro' key={key2}>
                                                                                <h3>{prolist.product[0].toUpperCase() + prolist.product.slice(1)}</h3>
                                                                                <p><span>Color : {prolist.color}</span><span>Size : {prolist.size}</span><span>Qty : {prolist.qnty}</span></p>
                                                                            </div>

                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        </div>
                                                        : "-"}

                                                </div>
                                                <div className="listCell cellWidth_8 center">
                                                    <button
                                                        className={tHistory.status === "completed" ? 'statusBtn succes' : tHistory.status === "failed" || tHistory.status == "active" ? 'statusBtn fail' : (tHistory.status === "refunded" || tHistory.status === "overdue") ? 'statusBtn refund' : "statusBtn"}>
                                                        {tHistory.status == "completed" ? "Success" : (tHistory.status === "active" ? "Failed" : tHistory.status)}</button>
                                                </div>
                                                <div className="listCell cellWidth_5 center">
                                                    {tHistory?.history.length > 0 &&
                                                        <button className='noBg' onClick={() => { toggleOptions(key); }}><img src={arrowDown} className={option === key && "rotateround"} /></button>
                                                    }

                                                </div>
                                            </div>
                                            <div className={
                                                option === key
                                                    ? "dropdownTransGlobal listOpen globalTransactionList"
                                                    : "listHide"
                                            }>
                                                {
                                                    tHistory?.history ? tHistory.history.map((historylist, key1) => {
                                                        return (
                                                            <>
                                                                <div className='listHistory' key={key1}>
                                                                    <div className='icons'>
                                                                        <span className={historylist.amount < 0 && historylist.status === "success" ? "round refund" :
                                                                            (historylist.status === "success" ? "round succes" : "round fail")}>
                                                                                <img src={historylist.amount < 0 && historylist.status === "success" ? refund : (historylist.payment_via === "cash" ? cash : historylist.payment_via === "bank" ? bank: card)} />
                                                                        </span>
                                                                    </div>
                                                                    <div className='listCell time'>
                                                                        {utils.convertUTCToTimezone(historylist?.transaction_date.trim(),timezoneOffset)}
                                                                        {/* {moment(utils.convertUTCToTimezone(historylist?.transaction_date, timezone, 'YYYY-MM-DD HH:mm:ss')).format('Do MMM, YYYY')}
                                                                        &nbsp;
                                                                        <span className='doomed'>{moment(utils.convertUTCToTimezone(historylist?.transaction_date, timezone, 'YYYY-MM-DD HH:mm:ss')).format('hh:mm A')}</span> */}
                                                                    </div>
                                                                    <div className='listCell id'>
                                                                        <span className='spanned'>{(historylist.transaction_id) ? historylist.transaction_id : historylist.transactionId}</span>
                                                                        {historylist.amount < 0 ?
                                                                            <div className="notePop">
                                                                                <div className="notePopIcon"></div>
                                                                                <div className="notePopContent">
                                                                                    <span>Reason: </span>
                                                                                    {historylist.note}
                                                                                </div>
                                                                            </div>
                                                                            : (historylist.status !== "success" && historylist.payment_resp.outcome.description ?
                                                                                <div className="notePop">
                                                                                    <div className="notePopIcon"></div>
                                                                                    <div className="notePopContent">
                                                                                        <span>Failed reason: </span>
                                                                                        {historylist.payment_resp.outcome.description}
                                                                                    </div>
                                                                                </div>
                                                                                : "")}
                                                                    </div>
                                                                    <div className='listCell value'><span className='boldTxt'>${Math.abs(historylist.amount).toFixed(2)}</span></div>
                                                                    <div className='listCell status'>
                                                                        {/* <button className={historylist.status==="success" ? 'statusBtn succes'
                                                                         : historylist.status==="failed" ? 'statusBtn fail'
                                                                         :'statusBtn refund' }>
                                                            {historylist.status}
                                                        </button> */}
                                                                        <button className={historylist.amount < 0 && historylist.status === "success" ? "statusBtn refund" : (
                                                                            historylist.status === "success" ? "statusBtn succes"
                                                                                : "statusBtn fail"
                                                                        )}>
                                                                            {/* {historylist.amount < 0 && historylist.status === "success" ? "Refunded" : historylist.status} */}
                                                                            {historylist.status !== "success" ? "Failed" : (historylist.amount < 0) ? "Refunded" : "Success"}
                                                                        </button>
                                                                    </div>
                                                                    {(historylist.status === "success") ? (
                                                                        <div className='listCell download'>
                                                                            {
                                                                                (tHistory?.contact._id !== undefined || tHistory?.contactDeleted !== undefined) ?
                                                                                    <PDFDownloadLink document={<PDFDocument key={key1} transactionData={historylist} contact={tHistory?.contact._id !== undefined ? tHistory?.contact : (tHistory?.contactDeleted !== undefined ? tHistory?.contactDeleted : {})} org={org}
                                                                                        transactionDate={utils.convertUTCToTimezone(historylist.transaction_date, timezoneOffset)} />} fileName={"Invoice_" + historylist.transactionId + ".pdf"}>
                                                                                        <button type="button" className='dwnLD'><img src={download} /></button>
                                                                                    </PDFDownloadLink> : ""
                                                                            }
                                                                        </div>) : ""}
                                                                </div>
                                                            </>
                                                        )
                                                    }) : ""
                                                }

                                            </div>
                                        </>
                                    )

                                })
                                    :
                                    ""
                            }


                        </div>
                        :
                        <div className="createNew noInfos authentications groups">
                            <div className="noRecordsImgWraper">
                                <img src={noRecords} className="noRecords" alt="" />
                                <h4>No Transactions Found</h4>
                                <p>No Transactions have been listed here yet</p>
                            </div>
                        </div>
                    }
                </div>

                {/* <div className="paginationOuter">
            <ul>
                <li>
                    <button className="btn paginationBtn" disabled="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492"><path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" fill="#305671"></path></svg>
                    </button>
                </li>
                {[pagination.totalPages].map((item, key) =>{
                    render(
                        <li>
                            <button className="btn paginationBtn active" value={key}>{key}</button>
                        </li>
                        )
                    })
                }
                <li>
                    <button className="btn paginationBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004"><path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#305671"></path></svg>
                    </button>
                </li>
            </ul>
        </div> */}
                {oldTransactionList?.length && paginationData.totalPages > 1 ?
                    <Pagination
                        type="role"
                        paginationData={paginationData}
                        dataCount={paginationData.count}
                        callback={paginationCallbackHandle}
                    />
                    : ""}

            </div>
            {showFilter &&
                <ImportTransactionFilter closeFilter={closeFilter} getFilterStr={getFilterStr} contact={contact} clearFilter={clearFilter} />
            }
        </>
    );

};

export default TransactionGlobal;