import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import wwConnect from "../../../../assets/images/wwConnect.svg";
import wwConnect2 from "../../../../assets/images/wwConnect2.svg";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
import cashSmallWhite from "../../../../assets/images/cash_icon_small_white.svg";
import cardSmallWhite from "../../../../assets/images/card_icon_small_white.svg";
import bankSmallWhite from "../../../../assets/images/bank.svg";
import refundIcon from "../../../../assets/images/refund_icon_white.svg";
import noDataIcon from "../../../../assets/images/noData_icon.svg";
import dropVector from "../../../../assets/images/dropVector.svg";
import contractIconWhite from "../../../../assets/images/contract_icon_white.svg";
import RefundModal from "./transaction/RefundModal";
import EditTrModal from "./transaction/EditTrModal";
import { Scrollbars } from "react-custom-scrollbars-2";
import AlertMessage from "../../messages/alertMessage";
import moment from "moment";
import { TransactionServices } from "../../../../services/transaction/transactionServices";
import Loader from "../../Loader";
import CompleteTransactionModal from "./transaction/CompleteTransactionModal";
import ConfirmBox from "../../confirmBox";
import RetryPayment from "./transaction/RetryPayment";
import { utils } from "../../../../helpers";
import PDFDocument from "../pdf/pdfdocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Transaction = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isRefundLoader, setIsRefundLoader] = useState(false);
  const [isLoaderScroll, setIsLoaderScroll] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [refundModal, setRefundModal] = useState(false);
  const [editTransModal, setEditTransModal] = useState(false);
  const [completeTransModal, setCompleteTransModal] = useState(false);
  const [oldTransactionList, setOldTransactionList] = useState([]);
  const [upcomingTransaction, setUpcomingTransaction] = useState([]);
  const [upcomingPagination, setUpcomingPagination] = useState({});
  const [oldPagination, setOldPagination] = useState({});
  const [contractPagination, setContractPagination] = useState({});
  const [upcomingOptIndex, setUpcomingOptIndex] = useState();
  const [oldOptIndex, setOldOptIndex] = useState();
  const [isScroll, setIsScroll] = useState(false);
  const [completeTransElement, setCompleteTransElement] = useState();
  const [successMsg, setSuccessMsg] = useState(null);
  const upcomingOptRef = useRef();
  const oldOptRef = useRef();
  const contractRef = useRef();
  const [refundAmount, setRefundAmount] = useState();
  const [refundPayVia, setRefundPayVia] = useState();
  const [subscriptionId, setSubscriptionId] = useState();
  const [oldHistoryIndex, setOldHistoryIndex] = useState(null);
  const [upcomingHistoryIndex, setUpcomingHistoryIndex] = useState(true);
  const [contract, setContract] = useState();
  const [editTransaction, setEditTransaction] = useState(null);
  const [contractOptIndex, setContractOptIndex] = useState(null);
  const [cancelContractModal, setCancelContractModal] = useState(false);
  const [cancelContractId, setCancelContractId] = useState(null);
  const [retryModal, setRetryModal] = useState(false);
  const [retryAmount, setRetryAmount] = useState();
  const [retryId, setRetryId] = useState();
  const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : "UTC");
  const org = useSelector((state) => (state.user?.data) ? state.user.data : "");
  const [refundAlertMsg, setRefundAlertMsg] = useState({
    message: "",
    type: ""
  });
  const [cancelAlertMsg, setCancelAlertMsg] = useState({
    message: "",
    type: ""
  });
  const [retryPayAlertMsg, setRetryPayAlertMsg] = useState({
    message: "",
    type: ""
  });
  const [copyToClipMsg, setCopyToClipMsg] = useState({
    message: "",
    type: ""
  });
  const openItemRef = useRef(null);
  // Overdue Transactions
  const [overdueTransactionList, setOverdueTransactionList] = useState([]);
  const [overduePagination, setOverduePagination] = useState({});
  const overdueOptRef = useRef();
  const [overdueOptIndex, setOverdueOptIndex] = useState();



  const showOldTrxHistory = (index) => {
    if (oldHistoryIndex == index) {
      setOldHistoryIndex(null);
    } else {
      setOldHistoryIndex(index);
    }
  };

  const showUpcomingHistory = (index) => {
    if (upcomingHistoryIndex == index) {
      setUpcomingHistoryIndex(null);
    } else {
      setUpcomingHistoryIndex(index);
    }
  }

  const openRefundModal = (item) => {
    setRefundModal(true);
    setSubscriptionId(item._id);
    if (item.refunded_amount && item.refunded_amount != undefined) {
      setRefundAmount(item.amount - item.refunded_amount)
    } else {
      setRefundAmount(item.amount);
    }
    setRefundPayVia(item.payment_via);
    console.log(item.payment_via);
  };

  const closeRefundModal = () => {
    setRefundModal(false);
    fetchOldTransactions(props.contactId, 1);
  };

  const refundLoader = (param) => {
    setIsRefundLoader(param);
  };

  const retryAlertMsg = (param) => {
    setRetryPayAlertMsg({ ...retryPayAlertMsg, message: param.message, type: param.type });
  };

  const refundAlert = (msg, type) => {
    setRefundAlertMsg({ ...refundAlertMsg, message: msg, type: type });
  };

  const closeRefundAlert = () => {
    setRefundAlertMsg({ ...refundAlertMsg, message: "", type: "" });
  };

  const closeCancelContractAlert = () => {
    setRefundAlertMsg({ ...cancelAlertMsg, message: "", type: "" });
  };

  const closeRetryPaymentAlert = () => {
    setRetryPayAlertMsg({ ...retryPayAlertMsg, message: "", type: "" });
  };

  const closeCopyToClipAlert = () => {
    setCopyToClipMsg({ ...copyToClipMsg, message: "", type: "" });
  };

  const openCloseEditTransModal = (param, transaction, loadData) => {
    setEditTransaction(transaction);
    setEditTransModal(param);

    // if (loadData) {
    setIsLoader(true)
    try {
      fetchOldTransactions(props.contactId, 1);
      fetchUpcomingTransactions(props.contactId, 1);
      fetchOverdueTransactions(props.contactId, 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false)
    }
    // }
  };

  const openCloseCompleteTrans = (param, item) => {

    console.log("outside condition");

    if (param) {
      console.log("inside if");
      setCompleteTransElement(item);
      setCompleteTransModal(param);
    } else if (param == false) {
      console.log("inside else if");
      setCompleteTransModal(false);
      fetchUpcomingTransactions(props.contactId, 1);
      fetchOldTransactions(props.contactId, 1);
      fetchOverdueTransactions(props.contactId, 1);
      setActiveTab(1);
    }

    if (param == "close") {
      console.log("outside close");
      setCompleteTransModal(false);
    }
  };

  const openCloseRetryModal = (param, item) => {
    setRetryModal(param);
    setRetryAmount(item.amount);
    setRetryId(item._id);
    if (param == false) {
      setRetryModal(false);
      setRetryAmount(0);
      setRetryId(null);
      fetchOldTransactions(props.contactId);
    }
  }

  const contractOptTgl = (index) => {
    setContractOptIndex(index);
  }

  const openCancelContractModal = (item) => {
    setCancelContractModal(true);
    setCancelContractId(item._id);
  }

  const cancelContractHandle = (param) => {
    if (param == "yes") {
      cancelContract();
    } else {
      setCancelContractModal(false);
      setCancelContractId(null);
    }
  }


  useEffect(() => {
    console.log("Timezone: ", timezone);
    const close = (e) => {
      if (e.keyCode === 27) {
        setRefundModal(false);
        setCompleteTransModal(false);
        setUpcomingOptIndex(null);
        setOldOptIndex(null);
        setOldHistoryIndex(null);
        setUpcomingHistoryIndex(null);
        setContractOptIndex(null);
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);

  useEffect(() => {
    const close = (e) => {
      e.stopPropagation();

      if (e.target !== openItemRef.current) {
        setUpcomingOptIndex(null);
        setOldOptIndex();
        setContractOptIndex(null)
      }
    }
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close)
  }, [])


  const changeTab = (e) => {
    setActiveTab(e.target.value);
  };

  const upcomingListPageNo = (e) => {
    if (!isScroll) {
      let scrollHeight = e.target.scrollHeight;
      let scrollTop = e.target.scrollTop;
      if (scrollTop > (scrollHeight / 2)) {
        if (upcomingPagination.currentPage < upcomingPagination.totalPages) {
          fetchUpcomingTransactions(props.contactId, (upcomingPagination.currentPage + 1));
        }
        ;
      }
    }
  };

  const oldListPageNo = (e) => {
    if (!isScroll) {
      let scrollHeight = e.target.scrollHeight;
      let scrollTop = e.target.scrollTop;
      if (scrollTop > (scrollHeight / 2)) {
        if (oldPagination.currentPage < oldPagination.totalPages) {
          fetchOldTransactions(props.contactId, (oldPagination.currentPage + 1));
        }
        ;
      }
    }
  };

  const fetchOldTransactions = async (contactId, pageNumber) => {
    try {
      setIsScroll(true);
      setIsLoaderScroll(true);
      const response = await TransactionServices.fetchOldTransactions(contactId, pageNumber);
      setIsScroll(false);
      if (response.pagination.currentPage == 1) {
        setOldTransactionList(response.transactions);
      } else {
        setOldTransactionList([...oldTransactionList, ...response.transactions]);
      }
      setOldPagination(response.pagination);
      console.log("Old transaction response ", response);
    } catch (e) {

    } finally {
      setIsLoaderScroll(false);
    }
  };

  const fetchUpcomingTransactions = async (contactId, pageNumber) => {
    try {
      setIsScroll(true);
      setIsLoaderScroll(true);
      const response = await TransactionServices.fetchUpcomingTransactions(contactId, pageNumber);
      if (response.pagination.currentPage == 1) {
        setUpcomingTransaction(response.transactions);
      } else {
        setUpcomingTransaction([...upcomingTransaction, ...response.transactions]);
      }
      setIsScroll(false);
      setUpcomingPagination(response.pagination);
      console.log("Upcoming transaction response ", response);
    } catch (e) {

    } finally {
      setIsLoaderScroll(false);
    }
  };

  const contractListPageNo = (e) => {
    if (!isScroll) {
      let scrollHeight = e.target.scrollHeight;
      let scrollTop = e.target.scrollTop;
      if (scrollTop > (scrollHeight / 2.5)) {
        if (contractPagination.currentPage < contractPagination.totalPages) {
          fetchContract(props.contactId, (contractPagination.currentPage + 1));
        }
        ;
      }
    }
  };

  const fetchContract = async (contactId, pageNumber) => {
    try {
      setIsScroll(true);
      setIsLoaderScroll(true);
      const response = await TransactionServices.fetchContract(contactId, pageNumber);
      if (response.pagination.currentPage == 1) {
        setContract(response.transactions);
        console.log("Contract response: ", response);
      } else {
        setContract([...contract, ...response.transactions]);
      }
      // setContract(response.transactions);
      setIsScroll(false);
      setContractPagination(response.pagination);
    } catch (e) {

    } finally {
      setIsLoaderScroll(false);
    }
  };

  const cancelContract = async () => {
    let payload = {
      contractId: cancelContractId
    }
    try {
      setIsLoader(true);
      const response = await TransactionServices.cancelContract(props.contactId, payload);
      setCancelAlertMsg({ ...cancelAlertMsg, message: response, type: "success" });
    } catch (e) {
      setCancelAlertMsg({ ...cancelAlertMsg, message: e.message, type: "error" });
    } finally {
      setCancelContractModal(false);
      setIsLoader(false);
      setCancelContractId(null);
      fetchContract(props.contactId, 1);
      fetchOldTransactions(props.contactId, 1);
      fetchUpcomingTransactions(props.contactId, 1);
    }
  };

  const moreOptOpenUpcoming = (index) => {
    setUpcomingOptIndex(index !== upcomingOptIndex ? index : null);
    if (upcomingOptIndex != null) {
      setUpcomingOptIndex(null);
    }
  };

  const moreOptOpenOld = (index) => {
    setOldOptIndex(index !== upcomingOptIndex ? index : null);
    if (oldOptIndex != null) {
      setOldOptIndex(null);
    }
  };

  const checkOutsideClick = (e) => {
    if (upcomingOptRef.current.contains(e.target)) {
      return;
    }
    setUpcomingOptIndex(null);

    if (oldOptRef.current.contains(e.target)) {
      return;
    }
    if (overdueOptRef.current.contains(e.target)) {
      return;
    }
    if (contractRef.current.contains(e.target)) {
      return;
    }
    setUpcomingHistoryIndex(null);
    setOldOptIndex(null);
    setOldHistoryIndex(null);
    setContractOptIndex(null);
  };

  const showSuccessAlert = (param) => {
    setSuccessMsg(param);
  };

  const checkRefundAmount = (param) => {
    return param.history && param.history.map(e => {
      if (e.refunded_amount !== undefined && e.amount > 0 && e.status == "success") {
        param.refunded_amount = (parseFloat(Math.abs(e.refunded_amount)).toFixed(2));
        return true;
      }
    })
  };

  const dayLeft = (due_date) => {
    console.log('Initial due date', due_date);
    let payDate = moment(due_date, "YYYY-MM-DD");
    let today = moment().startOf('day');

    //Difference in number of days
    let result = moment.duration(payDate.diff(today)).asDays();

    if (result < 31) {
      if (result == 0) {
        return "Today"
      } else {
        if (result == 1) {
          return result + " Day left"
        } else {
          return result + " Days left"
        }
      }
    } else {
      return moment(due_date.split(" ")[0], 'YYYY-MM-DD').format('Do MMM, YYYY')
    }
  };

  const closeAlert = () => {
    setSuccessMsg(null);
  };

  useEffect(() => {
    fetchOldTransactions(props.contactId, 1);
    fetchUpcomingTransactions(props.contactId, 1);
    fetchContract(props.contactId, 1);
    fetchOverdueTransactions(props.contactId, 1);
    console.log(props.contactId);

    document.addEventListener("mousedown", checkOutsideClick);
    return () => {
      document.removeEventListener("mousedown", checkOutsideClick);
    }
  }, []);

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    setDt(new Date().toLocaleString());
  }, []);

  const dateCalculationFunction = (transdate) => {

    const dt = new Date();
    var d1 = new Date(transdate);

    var diff = dt - d1.getTime();


    var daydiff = diff / (1000 * 60 * 60 * 24);

    var modVal = diff % (1000 * 60 * 60 * 24);
    var hours = modVal / (1000 * 60 * 60);
    modVal = modVal % (1000 * 60 * 60);
    var min = modVal / (1000 * 60);
    modVal = modVal % (1000 * 60);

    var showTime;

    if (daydiff >= 1) {
      showTime = Math.floor(daydiff) + (Math.floor(daydiff) == 1 ? " day ago" : " days ago");
    } else if (Math.floor(hours) > 0) {
      showTime = Math.floor(hours) + (Math.floor(hours) == 1 ? " hr ago" : " hrs ago");
    } else if (Math.floor(min) >= 1) {
      showTime = Math.floor(min) + (Math.floor(min) == 1 ? " min ago" : " mins ago");
    } else {
      showTime = "0 mins ago";
    }
    return showTime;
  };

  const downloadInvoice = async (elem) => {
    // setIsLoader(true);
    console.log("download function")
    try {
      const transactionData = { ...elem, orgCode: org.organizationCode };
      const organizationData = { name: org.organization };
      const contactData = props.contact;
      const html = (transactionData.transaction_for === "product") ?
        await getProductPDFHTML([transactionData], contactData, organizationData) :
        await getCoursePDFHTML([transactionData], contactData, organizationData);
    } catch (e) {
    } finally {
      // setIsLoader(false);
    }
  }

  const getCoursePDFHTML = async (txn, contact, org) => {
    const date = new Date();
    const transactionDate = moment(txn[0].transaction_date).format("LLL");
    const isRefund = (txn[0].amount < 0) ? true : false;

    let html = `<!DOCTYPE html>
    <html lang="en">
       <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
          <script>
          document.body.onload = function() {
            html2canvas(document.querySelector(".container")).then(canvas => {
              document.body.appendChild(canvas)
            });
          };
          </script>
          <style>
             * {
             box-sizing: border-box;
             font-family: 'PT Serif', serif;
             color: #305671;
             }
             .tableQ tbody tr:nth-child(even) td{
             background-color: #F5FAFF;      
             }
          </style>
       </head>
       <body style="box-sizing: border-box;
          font-family: 'PT Serif', serif;
          color: #305671;
          padding: 0;
          margin: 0;">
          <div class="container" style="box-sizing:border-box;width: 100%;padding: 10px 10px 10px 10px;position: relative;">
             <div class="header" style="box-sizing: border-box;font-family: 'PT Serif', serif;color: #305671;width: 100%;padding: 0px 20px;margin: 0;border-bottom: 1px solid rgba(48, 86, 113, 0.5);margin-bottom: 3em;">
                <h2 style="font-weight: 700;
                   font-size: 1.6em;
                   line-height: 2em;
                   text-align: center;
                   text-decoration-line: underline;">Tax Invoice</h2>
                <table class="table" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                   <tr>
                      <td class="left" style="text-align: left;">
                         <div class="org" style="font-weight: 700;
                            font-size: 1.2em;
                            line-height: 2em;">${org.name}</div>
                      </td>
                      <td class="right" style="text-align: right;">
                         <p class="text1" style="font-weight: 700;
                            font-size: 0.8em;
                            line-height: 1em;">Invoice Number : <span style="font-weight: 400;"> ${txn[0]._id}</span></p>
                         <p class="text1" style="font-weight: 700;
                            font-size: 0.8em;
                            line-height: 1em;">Date : <span style="font-weight: 400;"> ${transactionDate} </span></p>
                      </td>
                   </tr>
                </table>
             </div>
             <div class="main" style="box-sizing: border-box;font-family: 'PT Serif', serif;color: #305671;padding: 0;margin: 0;">
                <div class="text2 gap1" style="padding-left: 20px;font-size: 0.7em;
                   padding-bottom: 0.9em;">Bill To,</div>
                <div class="text3 gap1" style="padding-left: 20px;font-size: 1.29em;
                   line-height: 1.2em;
                   font-weight: 700;
                   padding-bottom: 0.5em;">${contact.firstName + " " + contact.lastName}</div>
                <div class="text4 gap1" style="padding-left: 20px;font-size: 0.9em;
                   line-height: 1em;
                   color: #97AAB8;
                   padding-bottom: 0.5em;">${contact.email}</div>
                <div class="text4 gap1" style="padding-left: 20px;font-size: 0.9em;
                   line-height: 1em;
                   color: #97AAB8;
                   padding-bottom: 0.5em;">${contact.phone?.dailCode + "-" + contact.phone?.number}</div>
                <div class="tableWrapper" style="margin-top: 3em;">
                   <table class="tableQ" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <thead style="width: 100%;">
                         <tr>
                            <th style="width: 4%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-left: 20px;">No.</th>
                            <th style="width: 35%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               font-size: 0.8em;
                               text-align: left;
                               padding: 1.2em 1em;">Program Name</th>
                            <th style="width: 35%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: left;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;">Program Start</th>
                            <th style="width: 26%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-right: 20px;">Price</th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr>
                            <td style="width: 4%;color: #305671; 
                               background-color: #fff;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-left: 20px;">1.</td>
                            <td style="width: 35%;color: #305671; 
                               background-color: #fff;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;">${txn[0].transaction_data.course}</td>
                            <td style="width: 35%;color: #305671; 
                               background-color: #fff;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;">${moment(txn[0].transaction_data.course_start).format("LL")}</td>
                            <td style="width: 26%;color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 1em;
                               padding: 1.2em 1em;padding-right: 20px;">$${txn[0].amount}</td>
                         </tr>
                      </tbody>
                      <tfoot>
                         <tr>
                            <td colspan="3" style="font-weight: bold;
                               border-top: 1px solid rgba(48, 86, 113, 0.5);
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 0.8em;">Total  :</td>
                            <td colspan="1" style="font-weight: bold;
                               border-top: 1px solid rgba(48, 86, 113, 0.5);
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 0.8em;padding-right: 20px;">$${txn[0].amount}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>
                <div class="tableWrapper" style="margin-top: 3em;">
                   <table class="tableQ" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <thead style="width: 100%;">
                         <tr>
                            <th style="width: 30%; background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;    
                               font-size: 0.8em;
                               text-align: left;
                               padding: 1.2em 1em;padding-left: 20px;">Description</th>
                            <th style="width: 35%;background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;  
                               font-size: 0.8em;
                               text-align: left;
                               padding: 1.2em 1em;">Payment Mode</th>
                            <th class="left" style="width: 20%;background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;  
                               font-size: 0.8em;
                               padding: 1.2em 1em;text-align: left;">Transaction ID</th>
                            <th style="width: 15%;background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-right: 20px;">Total </th>
                         </tr>
                      </thead>
                      <tbody>
                         ${txn.map(el => (
      `<tr>
                            <td style="width: 30%;color: #305671; 
                               background-color: #fff; 
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-left: 20px;">${(!isRefund) ? (el.transaction_type === "tuiton_fees") ? "Tuition Fees" : el.transaction_type.charAt(0).toUpperCase() + el.transaction_type.slice(1) : el.note}</td>
                            <td style="width: 35%;color: #305671; 
                               background-color: #fff;  
                               font-size: 0.8em;
                               padding: 1.2em 1em;">${el.payment_via.charAt(0).toUpperCase() + el.payment_via.slice(1)}</td>
                            <td class="left" style="width: 20%;color: #305671; 
                               background-color: #fff;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;text-align: left;">${(el.transactionId) ? el.transactionId : el.transaction_id}</td>
                            <td style="width: 15%;color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-right: 20px;">$${el.amount}</td>
                         </tr>
                         `))}
                      </tbody>
                      <tfoot>
                         <tr class="bigfooter">
                            ${(txn[0].payment_via !== "cash" && !isRefund) ? (`
                            <td class="left" style="font-weight: bold; padding: 1.2em 1em;padding-left: 20px; text-align: left;font-size: 0.7em;">
                               <p> <span style="color: #97AAB8;">${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? "Bank Details:" : "Credit Card Details:"}:</span>  XXXX${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? txn[0].payment_resp.bank_account.last4 : txn[0].payment_resp.card.last4}</p>
                               <p> <span style="color: #97AAB8;">${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? "Routing Number:" : "Expiry Date:"} </span> ${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? txn[0].payment_resp.bank_account.routing_number : txn[0].payment_resp.card.expiration_month + "/" + txn[0].payment_resp.card.expiration_year}</p>
                            </td>
                            `) : (`
                            <td class="left" style="font-weight: bold; padding: 1.2em 1em;padding-left: 20px; text-align: left;font-size: 0.7em;">${(isRefund) ? "Refunded via original Method" : txn[0].payment_via}</td>
                            `)}
                            <td style="text-align: left;font-weight: bold;
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 0.8em;">&nbsp;</td>
                            <td class="text6 left" style="font-weight: bold;
                               padding: 1.2em 1em;    
                               font-size: 1em;">Total ${(isRefund) ? "Refunded" : "Paid"} :</td>
                            <td class="text6" style="font-weight: bold;
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 1em;">$${txn[0].amount}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>
             </div>
             <div class="footer" style="width: 100%;padding: 10px 10px 10px 10px; box-sizing: border-box;font-family: 'PT Serif', serif;">
                <p class="text7" style="color: #97AAB8; font-size: 0.8em;">Note : This is a digitally generated document and does not require any signature.</p>
                <p class="text8" style="font-size: 0.8em;border-top: 1px solid #ddd;padding-top: 10px;">© redbeltgym.com ${date.getFullYear()}</p>
             </div>
          </div>
       </body>
    </html>`;
    return await html;
  };

  const getProductPDFHTML = async (txn, contact, org) => {
    const date = new Date();
    const transactionDate = moment(txn[0].transaction_date).format("LLL");
    const isRefund = (txn[0].amount < 0) ? true : false;
    // const transactionDate = txn[0].transaction_date;
    let subTotal = 0;
    let html = `<!DOCTYPE html>
    <html lang="en">
       <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap" rel="stylesheet">
          <style>
             * {
             box-sizing: border-box;
             font-family: 'PT Serif', serif;
             color: #305671;
             }
             .tableQ tbody tr:nth-child(even) td{
             background-color: #F5FAFF;      
             }
          </style>
       </head>
       <body style="box-sizing: border-box;
          font-family: 'PT Serif', serif;
          color: #305671;
          padding: 0;
          margin: 0;">
          <div class="container" style="box-sizing:border-box;width: 100%;padding: 10px 10px 10px 10px;position: relative;">
             <div class="header" style="box-sizing: border-box;font-family: 'PT Serif', serif;color: #305671;width: 100%;padding: 0px 20px;margin: 0;border-bottom: 1px solid rgba(48, 86, 113, 0.5);margin-bottom: 3em;">
                <h2 style="font-weight: 700;
                   font-size: 1.6em;
                   line-height: 2em;
                   text-align: center;
                   text-decoration-line: underline;">Tax Invoice</h2>
                <table class="table" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                   <tr>
                      <td class="left" style="text-align: left;">
                         <div class="org" style="font-weight: 700;
                            font-size: 1.2em;
                            line-height: 2em;">${org.name}</div>
                      </td>
                      <td class="right" style="text-align: right;">
                         <p class="text1" style="font-weight: 700;
                            font-size: 0.8em;
                            line-height: 1em;">Invoice Number : <span style="font-weight: 400;"> ${txn[0]._id}</span></p>
                         <p class="text1" style="font-weight: 700;
                            font-size: 0.8em;
                            line-height: 1em;">Date : <span style="font-weight: 400;"> ${transactionDate} </span></p>
                      </td>
                   </tr>
                </table>
             </div>
             <div class="main" style="box-sizing: border-box;font-family: 'PT Serif', serif;color: #305671;padding: 0;margin: 0;">
                <div class="text2 gap1" style="padding-left: 20px;font-size: 0.7em;
                   padding-bottom: 0.9em;">Bill To,</div>
                <div class="text3 gap1" style="padding-left: 20px;font-size: 1.29em;
                   line-height: 1.2em;
                   font-weight: 700;
                   padding-bottom: 0.5em;">${contact.firstName + " " + contact.lastName}</div>
                <div class="text4 gap1" style="padding-left: 20px;font-size: 0.9em;
                   line-height: 1em;
                   color: #97AAB8;
                   padding-bottom: 0.5em;">${contact.email}</div>
                <div class="text4 gap1" style="padding-left: 20px;font-size: 0.9em;
                   line-height: 1em;
                   color: #97AAB8;
                   padding-bottom: 0.5em;">${(contact.phone?.number) ? contact.phone.dailCode + "-" + contact.phone?.number : ""}</div>
                <div class="tableWrapper" style="margin-top: 3em;">
                   <table class="tableQ" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <thead style="width: 100%;">
                         <tr>
                            <th style="width: 4%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-left: 20px;">No.</th>
                            <th style="width: 42%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;">Description</th>
                            <th style="width: 8%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;">Color</th>
                            <th style="width: 8%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;">Size</th>
                            <th style="width: 15%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;">Price</th>
                            <th style="width: 8%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;">Qty</th>
                            <th style="width: 15%;background-color: #305671; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-right: 20px;">Total</th>
                         </tr>
                      </thead>
                      <tbody>
                         ${txn[0]?.transaction_data.map((el, index) => {
      const price = (!isRefund) ? Number((el?.price * el?.qnty)) : txn[0].amount;
      subTotal = (!isRefund) ? subTotal + price : txn[0].amount;
      return (
        `<tr>
                                  <td style="width: 4%;color: #305671; 
                                     background-color: #fff;   
                                     font-size: 0.8em;
                                     padding: 1.2em 1em;padding-left: 20px;">${index + 1}.</td>
                                  <td style="width: 42%;color: #305671; 
                                     background-color: #fff;   
                                     font-size: 0.8em;
                                     text-align: center;
                                     padding: 1.2em 1em;">${(!isRefund) ? el.product : "Refund for " + el.product}</td>
                                  <td style="width: 8%;color: #305671; 
                                     background-color: #fff;   
                                     text-align: right;    
                                     font-size: 0.8em;
                                     padding: 1.2em 1em;">${el?.color || "-"}</td>
                                  <td style="width: 8%;color: #305671; 
                                     background-color: #fff;   
                                     text-align: right;    
                                     font-size: 0.8em;
                                     padding: 1.2em 1em;">${el?.size || "-"}</td>
                                  <td style="width: 15%;color: #305671; 
                                     background-color: #fff;   
                                     text-align: right;    
                                     font-size: 0.8em;
                                     padding: 1.2em 1em;">${(!isRefund) ? "$" + el?.price : "-"}</td>
                                  <td style="width: 8%;color: #305671; 
                                     background-color: #fff;   
                                     text-align: right;    
                                     font-size: 0.8em;
                                     padding: 1.2em 1em;">${(!isRefund) ? el?.qnty : "-"}</td>
                                  <td style="width: 15%;color: #305671; 
                                     background-color: #fff;   
                                     text-align: right;    
                                     font-size: 0.8em;
                                     padding: 1.2em 1em;padding-right: 20px;">$${price.toFixed(2)}</td>
                            </tr>`
      );
    })}
                         <tr class="total">
                            <td colspan="5" style="color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 0.5em 1em;">Sub Total  :</td>
                            <td colspan="2" style="color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 0.5em 1em;padding-right: 20px;">$${subTotal.toFixed(2)}</td>
                         </tr>
                         <tr class="total">
                            <td colspan="5" style="color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 0.5em 1em;">Tax  :</td>
                            <td colspan="2" style="color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 0.5em 1em;padding-right: 20px;">${(!isRefund) ? "$" + (txn[0].amount - subTotal).toFixed(2) : "-"}</td>
                         </tr>
                      </tbody>
                      <tfoot>
                         <tr>
                            <td colspan="5" style="font-weight: bold;
                               border-top: 1px solid rgba(48, 86, 113, 0.5);
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 0.8em;">Total  :</td>
                            <td colspan="2" style="font-weight: bold;
                               border-top: 1px solid rgba(48, 86, 113, 0.5);
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 0.8em;padding-right: 20px;">$${(txn[0].amount).toFixed(2)}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>
                <div class="tableWrapper" style="margin-top: 3em;">
                   <table class="tableQ" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <thead style="width: 100%;">
                         <tr>
                            <th style="width: 30%; background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;    
                               font-size: 0.8em;
                               text-align: left;
                               padding: 1.2em 1em;padding-left: 20px;">Description</th>
                            <th style="width: 35%;background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;  
                               font-size: 0.8em;
                               text-align: left;
                               padding: 1.2em 1em;">Payment Mode</th>
                            <th class="left" style="width: 20%;background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;  
                               font-size: 0.8em;
                               padding: 1.2em 1em;text-align: left;">Transaction ID</th>
                            <th style="width: 15%;background-color: #305671 !important; 
                               color: #fff;
                               font-weight: 700;  
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-right: 20px;">Total </th>
                         </tr>
                      </thead>
                      <tbody>
                         ${txn.map(el => {
      const desc = (!isRefund) ? (el.transaction_type === "tuiton_fees") ? "Tuition Fees" : el.transaction_type.charAt(0).toUpperCase() + el.transaction_type.slice(1) : el.note;
      return (
        `
                         <tr>
                            <td style="width: 30%;color: #305671; 
                               background-color: #fff; 
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-left: 20px;">${desc}</td>
                            <td style="width: 35%;color: #305671; 
                               background-color: #fff;  
                               font-size: 0.8em;
                               padding: 1.2em 1em;">${el.payment_via.charAt(0).toUpperCase() + el.payment_via.slice(1)}</td>
                            <td class="left" style="width: 20%;color: #305671; 
                               background-color: #fff;   
                               font-size: 0.8em;
                               padding: 1.2em 1em;text-align: left;">${(el.transactionId) ? el.transactionId : el.transaction_id}</td>
                            <td style="width: 15%;color: #305671; 
                               background-color: #fff;   
                               text-align: right;    
                               font-size: 0.8em;
                               padding: 1.2em 1em;padding-right: 20px;">$${el.amount.toFixed(2)}</td>
                         </tr>
                         `
      )
    })}
                      </tbody>
                      <tfoot>
                         <tr class="bigfooter">
                            ${(txn[0].payment_via !== "cash" && !isRefund) ?
        (`
                            <td class="left" style="font-weight: bold; padding: 1.2em 1em;padding-left: 20px; text-align: left; font-size: 0.7em;">
                               <p> <span style="color: #97AAB8;">${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? "Bank Details:" : "Credit Card Details:"}:</span>  XXXX${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? txn[0].payment_resp.bank_account.last4 : txn[0].payment_resp.card.last4}</p>
                               <p> <span style="color: #97AAB8;">${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? "Routing Number:" : "Expiry Date:"} </span> ${(txn[0].payment_resp.hasOwnProperty("bank_account")) ? txn[0].payment_resp.bank_account.routing_number : txn[0].payment_resp.card.expiration_month + "/" + txn[0].payment_resp.card.expiration_year}</p>
                            </td>
                            `) :
        (`
                            <td class="left" style="font-weight: bold; padding: 1.2em 1em;padding-left: 20px; text-align: left; font-size: 0.7em;">${(isRefund) ? "Refunded via original method" : ""}</td>
                            `)}
                            <td style="text-align: left;font-weight: bold; text-align: right; padding: 1.2em 1em; font-size: 0.8em;">&nbsp;</td>
                            <td class="text6 left" style="font-weight: bold;
                               padding: 1.2em 1em;    
                               font-size: 1em;">${(isRefund) ? "Total Refunded" : "Total Paid"} :</td>
                            <td class="text6" style="font-weight: bold;
                               text-align: right; 
                               padding: 1.2em 1em;    
                               font-size: 1em;">$${txn[0].amount.toFixed(2)}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>
             </div>
             <div class="footer" style="width: 100%;padding: 10px 10px 10px 10px; box-sizing: border-box;font-family: 'PT Serif', serif;">
                <p class="text7" style="color: #97AAB8; font-size: 0.8em;">Note : This is a digitally generated document and does not require any signature.</p>
                <p class="text8" style="font-size: 0.8em;border-top: 1px solid #ddd;padding-top: 10px;">© redbeltgym.com ${date.getFullYear()}</p>
             </div>
          </div>
       </body>
    </html>`;
    return await html;
  };

  // Overdue Transactions
  const overdueListPageNo = (e) => {
    if (!isScroll) {
      let scrollHeight = e.target.scrollHeight;
      let scrollTop = e.target.scrollTop;
      if (scrollTop > (scrollHeight / 2)) {
        if (overduePagination.currentPage < overduePagination.totalPages) {
          fetchOverdueTransactions(props.contactId, (overduePagination.currentPage + 1));
        }
        ;
      }
    }
  };

  const fetchOverdueTransactions = async (contactId, pageNumber) => {
    try {
      setIsScroll(true);
      setIsLoaderScroll(true);
      const response = await TransactionServices.fetchOverdueTransactions(contactId, pageNumber);
      setIsScroll(false);
      if (response.pagination.currentPage == 1) {
        setOverdueTransactionList(response.transactions);
      } else {
        setOverdueTransactionList([...overdueTransactionList, ...response.transactions]);
      }
      setOverduePagination(response.pagination);
      console.log("Overdue transaction response ", response);
    } catch (e) {

    } finally {
      setIsLoaderScroll(false);
    }
  };

  const openCloseEditTransOverdueModal = (param, transaction, loadData) => {
    setEditTransaction(transaction);
    setEditTransModal(param);

    // if (loadData) {
    setIsLoader(true)
    try {
      fetchOldTransactions(props.contactId, 1);
      fetchUpcomingTransactions(props.contactId, 1);
      fetchOverdueTransactions(props.contactId, 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);

    }
    // }
  };

  const moreOptOpenOverDue = (index) => {
    setOverdueOptIndex(index !== overdueOptIndex ? index : null);
    if (overdueOptIndex != null) {
      setOverdueOptIndex(null);
    }
  };
  // Overdue Transactions

  return (
    <>
      {successMsg && <AlertMessage type="success" message={successMsg} time={10000} close={closeAlert} />}
      <div className="contactTabsInner contactTabsInnerTransaction">
        <div className="contactTabsScrollSpace">
          <h3 className="headingTabInner">Transactions</h3>
          <div className="transHeader">
            <button className="saveNnewBtn" onClick={props.goToTransaction}>
              Make a Transaction <img src={arrow_forward} alt="" />
            </button>
            <span>Manage transaction for Products and Programs</span>
          </div>
          {isRefundLoader ? <Loader /> : ''}
          {isLoader ? <Loader /> : ''}
          <div className={transactionList?.pagination?.count > 0 ? "transactionListing" : "hide"}>
            <div className="row head">
              <div className="cell">Particulars</div>
              <div className="cell">Amount</div>
              <div className="cell">Transaction ID</div>
              <div className="cell">&nbsp;</div>
            </div>
          </div>

          <div className="tabHead">
            <ul>
              <li><button type="button" value="0" onClick={changeTab} className={activeTab == 0 ? "active" : ""}>Upcoming Transactions</button></li>
              <li><button type="button" value="1" onClick={changeTab} className={activeTab == 1 ? "active" : ""}>Old Transactions</button></li>
              <li><button type="button" value="2" onClick={changeTab} className={activeTab == 2 ? "active" : ""}>Overdue Transactions</button></li>
              <li><button type="button" value="3" onClick={changeTab} className={activeTab == 3 ? "active" : ""}>Contract Transactions</button></li>
            </ul>
          </div>
          {/* Upcoming Transactions */}
          <div className={activeTab == 0 ? "listTab active" : "listTab"}>
            <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={upcomingListPageNo}>
              <div className="transactionListing dueTransactions" ref={upcomingOptRef}>
                {/* <div className={isLoaderTab ? "hide" :"row head"}> */}
                {upcomingTransaction.length ?
                  <div className="row head">
                    <div className="cell particulars">Particulars</div>
                    <div className="cell amt">Amount</div>
                    <div className="cell times">&nbsp;</div>
                    <div className="cell action">&nbsp;</div>
                  </div>
                  :
                  <div className={isLoaderScroll ? "hide" : "noDataSec"}>
                    <img src={noDataIcon} alt="" />
                    <h2>No Transaction Found</h2>
                    <p>No transaction have been created yet</p>
                  </div>
                }
                {upcomingTransaction.length ? upcomingTransaction.map((item, index) => {
                  return (
                    <div className="row withHistory due" key={index}>
                      <div className="cellWraperss">

                        <div className="cell particulars">
                          <div className="d-flex">
                            <div className="iconCont">
                              <span>
                                {item.payment_via === "cash" ?
                                  <img src={cashSmallWhite} alt="" />
                                  :
                                  <img src={cardSmallWhite} alt="" />
                                }
                              </span>
                            </div>
                            <div className="textCont">
                              <div className="status">
                                Due
                              </div>
                              <div className="itemTitle">
                                <span>{item.transaction_for == "product" ? "Product" : "Program"}:</span> <p>“{item.title}”</p>
                              </div>
                              <div className="pid">
                                <span>PID: </span> {item._id}
                                <CopyToClipboard text={item._id}
                                  onCopy={() => setCopyToClipMsg({ ...copyToClipMsg, message: "PID copied to clipboard", type: "success" })}>
                                  <span className="copyTo" title="Click to Copy"></span>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cell amt">
                          <span className="amount" >
                            <span className="tutionAmt">{item.type == "tuiton_fees" ? "Tution Fee" : (item.type == "downpayment" ? "Downpayment" : "Outstanding")}</span>
                            {"$ " + parseFloat(item.amount).toFixed(2)}
                          </span>
                        </div>

                        <div className="cell times">
                          <span className="time">
                            {/* {dayLeft(item.due_date)}<br /> */}
                            {dayLeft(utils.convertUTCToTimezone(item.due_date, timezone, "YYYY-MM-DD"))}
                            {/* {utils.convertUTCToTimezone(item.due_date ,timezone)} */}
                          </span>
                        </div>
                        <div className="cell action">
                          <div className="moreOpt">
                            <button type="button" className="moreOptBtn" onClick={() => moreOptOpenUpcoming(index)} ref={upcomingOptIndex === index ? openItemRef : null}></button>
                            <div className={upcomingOptIndex === index ? "optDropdown" : "optDropdown hide"}>
                              <button type="button" className="edit" onClick={() => openCloseEditTransModal(true, item)}>Edit</button>
                              {item.payment_via === "cash" ?
                                <button type="button" className="complete" onClick={() => openCloseCompleteTrans(true, item)}>Complete Transactions</button>
                                : ""}
                              {/* <button type="button" className="history">History</button> */}
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className={item.history.length ? "cellWrapers historyDetails upcoming" : "hide"}>

                        <div className={upcomingHistoryIndex == index ? "showMore hide" : "showMore"} onClick={() => showUpcomingHistory(index)}>
                          <img src={dropVector} alt="" />
                        </div>


                        {upcomingHistoryIndex == index ?
                          <div className="showDetails">
                            {item.history && item.history.map((element, key) => {
                              return (
                                <div key={"oldhistory" + key} className={element.status !== "success" ? "cellWrapers fail historyInnerInfo" : (element.amount < 0 ? "cellWrapers success refunded historyInnerInfo" : "cellWrapers success historyInnerInfo")}>
                                  <div className="cell particulars">
                                    <div className="d-flex">
                                      <div className="iconCont">
                                        <span>
                                          {element.amount < 0 ?
                                            <img src={refundIcon} alt="" />
                                            : (element.payment_via == "cash" ?
                                              <img src={cashSmallWhite} alt="" />
                                              : (element.payment_via == "bank" ?
                                                <img src={bankSmallWhite} alt="" />
                                                :
                                                <img src={cardSmallWhite} alt="" />
                                              )
                                            )
                                          }
                                        </span>
                                      </div>
                                      <div className="textCont">
                                        <div className="status">
                                          {(element.status !== "success") ? "failed" : (element.amount < 0 ? "refunded" : "successful")}
                                          {element.amount < 0 ?
                                            <div className="notePop">
                                              <div className="notePopIcon"></div>
                                              <div className="notePopContent">
                                                <span>Reason: </span>
                                                {element.note}
                                              </div>
                                            </div>
                                            : (element.status !== "success" && element.payment_resp.outcome.description ?
                                              <div className="notePop">
                                                <div className="notePopIcon"></div>
                                                <div className="notePopContent">
                                                  <span>Failed reason: </span>
                                                  {element.payment_resp.outcome.description}
                                                </div>
                                              </div>
                                              : "")}
                                        </div>
                                        <div className="itemTitle">
                                          <span>Transaction ID:</span> <p>{element.transactionId || element.transaction_id}</p>

                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="cell amt">
                                    <div className="amount" >
                                      {/* $ {calculateTotalTransactionAmount(element.transaction_data)} */}
                                      {/* ${(element.transaction_data?.amount)?element.transaction_data.amount : element.transaction_data[0].price} */}
                                      $ {Math.abs(element.amount).toFixed(2)}
                                    </div>
                                  </div>

                                  <div className="cell times">
                                    <span className="time">
                                      {moment(element.transaction_date.split(" ")[1], 'hh:mm A').format('hh:mm A')}
                                      <span className="historyDate">
                                        {/* {element.transaction_date.split(" ")[0]}  */}
                                        {moment(element.transaction_date.split(" ")[0], 'YYYY-MM-DD').format('Do MMM, YYYY')}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              )
                            })}

                          </div>

                          : ""}
                      </div>


                    </div>
                  )
                }) : ""}
                {isLoaderScroll ?
                  <div className="bottomLoader">
                  </div>
                  : ""}
              </div>
            </Scrollbars>
          </div>
          {/* Old Transactions */}
          <div className={activeTab == 1 ? "listTab active" : "listTab"}>
            <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={oldListPageNo}>
              <div className="transactionListing oldTransactions" ref={oldOptRef}>
                {/* <div className="indRowHeadWrapers"> */}
                {oldTransactionList.length ?
                  <div className="row head">
                    <div className="cell particulars">Particulars</div>
                    <div className="cell amt">Amount</div>
                    {/* <div className="cell transactionIds">Transaction ID</div> */}
                    <div className="cell times">&nbsp;</div>
                    <div className="cell action">&nbsp;</div>
                  </div>
                  :
                  <div className={isLoaderScroll ? "hide" : "noDataSec"}>
                    <img src={noDataIcon} alt="" />
                    <h2>No Transaction Found</h2>
                    <p>No transaction have been created yet</p>
                  </div>
                }
                {/* </div> */}
                {oldTransactionList && oldTransactionList.length > 0 ? oldTransactionList.map((item, index) => {
                  return (
                    //  <div className="indRowWrapers">



                    <div className={item.history && item.history[0] && item.history[0].status == "success" ? "row success withHistory" : (item.history && item.history[0] && item.history[0].status == "failed" && item.history[0].amount > 0 ? "row fail withHistory" : "row success withHistory")} key={index}>
                      <div className="cellWraperss">

                        <div className="cell particulars">
                          <div className="d-flex">
                            <div className="iconCont">
                              {item.history && item.history[0] && item.history[0].payment_via == "cash" ?
                                <span>
                                  <img src={cashSmallWhite} alt="" />
                                </span>
                                : (item.history && item.history[0] && item.history[0].payment_via == "bank" ?
                                  <span>
                                    <img src={bankSmallWhite} alt="" />
                                  </span>
                                  :
                                  <span>
                                    <img src={cardSmallWhite} alt="" />
                                  </span>
                                )
                              }

                              {/* {item.amount < 0 ?
                              <span className="refund">
                                <img src={refundIcon} alt="" />
                              </span>
                              : ""} */}
                            </div>
                            <div className="textCont">
                              <div className="status">
                                {item.history && item.history[0] && item.history[0].status == "failed" && item.history[0].amount > 0 ? "failed" : "success"}
                                {/* {item.history && item.history[0].amount < 0 && item.history[0].status == "success" ? 
                                <span className="refundedTag">Refunded</span>
                                : ""} */}
                                {item.refunded_amount ?
                                  <span className="refundedTag">Refunded</span>
                                  : ""}
                                {item.createdAt != item.updatedAt ?
                                  <div className="editedTag">Edited</div>
                                  : ""}
                              </div>
                              <div className="itemTitle">
                                <span>{item.transaction_for == "course" ? "Program" : "Product"}: </span>
                                <p>
                                  {item.transaction_for === "product" ?
                                    item.history && item.history[0]?.transaction_data[0]?.product
                                    :
                                    item.title
                                  }
                                </p>
                                <div className={item.transaction_for == "product" ? "productItemList" : "hide"}>
                                  <div className="productNumber">
                                    {item.history && item.history[0] && item.history[0].transaction_data.length > 1 ?
                                      item.history && item.history[0] && item.history[0].transaction_data.length
                                      : "1"}
                                  </div>
                                  <ul className="productItems">

                                    {item.transaction_for == "product" ? item.history && item.history[0] && item.history[0].transaction_data.map((product, key) => {
                                      return (
                                        <li className="itemList" key={key}>
                                          <h3><span>{key + 1 + "."}</span>{product.product}</h3>
                                          <div className="productSpec">
                                            Color: <span className={"productColor " + product.color}></span>
                                            Size: <span>{product.size}</span>
                                            Qty: <span>{product.qnty}</span>
                                          </div>
                                        </li>
                                      )
                                    }) : ""}

                                  </ul>
                                </div>
                              </div>
                              <div className="pid">
                                <span>PID: </span> {item._id}
                                <CopyToClipboard text={item._id}
                                  onCopy={() => setCopyToClipMsg({ ...copyToClipMsg, message: "PID copied to clipboard", type: "success" })}>
                                  <span className="copyTo" title="Click to Copy"></span>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="cell amt">
                          <div className="amount" >
                            <span className="tutionAmt">{item.type == "tuiton_fees" ? "Tution Fee" : (item.type == "downpayment" ? "Downpayment" : "Outstanding")}</span>
                            <p>{"$" + parseFloat(Math.abs(item.history && item.amount)).toFixed(2)}</p>
                            {checkRefundAmount(item) && item.refunded_amount != undefined ?
                              <div className="refundedAmount">{"Refunded $" + item.refunded_amount}</div>
                              : ""}
                          </div>
                        </div>

                        {/* <div className="cell transactionIds">
                          <span className="transID">
                          {item._id}
                          </span>
                        </div> */}

                        <div className="cell times">
                          <span className="time">
                            {/* {moment(item.history && item.history[0] && item.history[0].transaction_date, 'YYYY-MM-DD').fromNow()} <br /> */}
                            {moment(utils.convertUTCToTimezone(item.history && item.history[0] && item.history[0].transaction_date, timezone, 'YYYY-MM-DD hh:mm A')).fromNow()}
                          </span>
                        </div>

                        <div className="cell action">
                          <div className="moreOpt">

                            <button type="button" className={checkRefundAmount(item) && item.refunded_amount != Math.abs(item.amount).toFixed(2) ? "moreOptBtn" : "hide"} onClick={() => moreOptOpenOld(index)} ref={oldOptIndex === index ? openItemRef : null}></button>
                            <div className={oldOptIndex === index ? "optDropdown" : "optDropdown hide"}>
                              {item.history && item.history[0] && item.history[0].status == "failed" && item.history[0].amount > 0 ?
                                <button type="button" className="retry" onClick={() => openCloseRetryModal(true, item)}>Retry</button>
                                :
                                <button type="button" className="refund" onClick={() => openRefundModal(item)}>Refund</button>
                              }
                              {/* <button type="button" className="refund" onClick={() => openRefundModal(item)}>Refund</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cellWrapers historyDetails">

                        <div className={oldHistoryIndex == index ? "showMore hide" : "showMore"} onClick={() => showOldTrxHistory(index)}>
                          <img src={dropVector} alt="" />
                        </div>


                        {oldHistoryIndex == index ?
                          <div className="showDetails">
                            {item.history && item.history.map((element, key) => {
                              return (
                                <div key={"oldhistory" + key} className={element.status == "failed" || element.status == "declined" ? "cellWrapers fail historyInnerInfo" : (element.amount < 0 ? "cellWrapers success refunded historyInnerInfo" : "cellWrapers success historyInnerInfo")}>
                                  <div className="cell particulars">
                                    <div className="d-flex">
                                      <div className="iconCont">
                                        <span>
                                          {element.amount < 0 ?
                                            <img src={refundIcon} alt="" />
                                            : (element.payment_via == "cash" ?
                                              <img src={cashSmallWhite} alt="" />
                                              : (element.payment_via == "bank" ?
                                                <img src={bankSmallWhite} alt="" />
                                                :
                                                <img src={cardSmallWhite} alt="" />
                                              )
                                            )
                                          }
                                        </span>
                                      </div>
                                      <div className="textCont">
                                        <div className="status">
                                          {element.status == "failed" ? "failed" : (element.status == "declined" ? "declined" : (element.amount < 0 ? "refunded" : "successful"))}
                                          {element.note && element.note != "" ?
                                            <div className="notePop">
                                              <div className="notePopIcon"></div>
                                              <div className="notePopContent">
                                                <p>
                                                  <span>{element.amount < 0 ? "Reason: " : "Note: "}</span>
                                                  {element.note}
                                                </p>
                                                {element.status == "failed" && element.payment_resp.outcome.description ?
                                                  <p>
                                                    <span>Failed reason: </span>
                                                    {element.payment_resp.outcome.description}
                                                  </p>
                                                  : ""}

                                              </div>
                                            </div>
                                            : (element.status == "declined" || element.status == "failed" && element.payment_resp.outcome ?
                                              <div className="notePop">
                                                <div className="notePopIcon"></div>
                                                <div className="notePopContent">
                                                  <span>Failed reason: </span> {element.payment_resp.outcome.description}
                                                </div>
                                              </div>
                                              : "")}
                                        </div>
                                        <div className="itemTitle">
                                          <span>Transaction ID:&nbsp;</span> <p>{(element.transactionId) ? element.transactionId : element.transaction_id}</p>

                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="cell amt">
                                    <div className="amount" >
                                      {/* $ {calculateTotalTransactionAmount(element.transaction_data)} */}
                                      {/* ${(element.transaction_data?.amount)?element.transaction_data.amount : element.transaction_data[0].price} */}
                                      $ {Math.abs(element.amount).toFixed(2)}
                                    </div>
                                  </div>

                                  <div className="cell times">
                                    <span className="time">
                                      {/* {moment(element.transaction_date.split(" ")[1], 'hh:mm A').format('hh:mm A')} */}
                                      {/* {element.transaction_date} <br /><br /> */}
                                      {utils.convertUTCToTimezone(element.transaction_date, timezone, 'YYYY-MM-DD,hh:mm A').split(",")[1]}
                                      <span className="historyDate">
                                        {/* {element.transaction_date.split(" ")[0]}  */}
                                        {/* {moment(element.transaction_date.split(" ")[0], 'YYYY-MM-DD').format('Do MMM, YYYY')} */}
                                        {moment(utils.convertUTCToTimezone(element.transaction_date, timezone, 'YYYY-MM-DD,hh:mm A').split(",")[0]).format('Do MMM, YYYY')}
                                      </span>
                                    </span>
                                  </div>
                                  {element.status !== "failed" &&
                                    <PDFDownloadLink
                                      document={<PDFDocument key={index} transactionData={element} contact={props.contact} org={org} transactionDate={utils.convertUTCToTimezone(element.transaction_date, timezone, 'LLL')} />}
                                      fileName={"Invoice_" + (element.transactionId) ? element.transactionId : element.transaction_id + ".pdf"}
                                    >
                                      <button type="button" className="downloadInvoiceBtn" title="Download invoice"></button>
                                    </PDFDownloadLink>
                                  }
                                </div>
                              )
                            })}

                          </div>

                          : ""}
                      </div>
                    </div>

                  )
                }) : ""}

                {isLoaderScroll ?
                  <div className="bottomLoader">
                  </div>
                  : ""}
              </div>
            </Scrollbars>
          </div>
          {/* Overdue Transactions */}
          <div className={activeTab == 2 ? "listTab active" : "listTab"}>
            <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={overdueListPageNo}>
              <div className="transactionListing oldTransactions" ref={overdueOptRef}>
                {overdueTransactionList.length ?
                  <div className="row head">
                    <div className="cell particulars">Particulars</div>
                    <div className="cell amt">Amount</div>
                    <div className="cell times">&nbsp;</div>
                    <div className="cell action">&nbsp;</div>
                  </div>
                  :
                  <div className={isLoaderScroll ? "hide" : "noDataSec"}>
                    <img src={noDataIcon} alt="" />
                    <h2>No Transaction Found</h2>
                    <p>No transaction have been created yet</p>
                  </div>
                }
                {overdueTransactionList && overdueTransactionList.length > 0 ? overdueTransactionList.map((item, index) => {
                  return (
                    <div className="row due warning" key={index}>
                      <div className="cellWraperss">

                        <div className="cell particulars">
                          <div className="d-flex">
                            <div className="iconCont">
                              {item?.payment_via === "cash" ?
                                <span>
                                  <img src={cashSmallWhite} alt="" />
                                </span>
                                :
                                <span>
                                  <img src={cardSmallWhite} alt="" />
                                </span>
                              }
                            </div>
                            <div className="textCont">
                              <div className="status">Overdue</div>
                              <div className="itemTitle">
                                <span>{item.transaction_for == "course" ? "Program" : "Product"}: </span>
                                <p>
                                  {item.transaction_for === "product" ?
                                    item.history && item.history[0]?.transaction_data[0]?.product
                                    :
                                    item.title
                                  }
                                </p>
                                <div className={item.transaction_for == "product" ? "productItemList" : "hide"}>
                                  <div className="productNumber">
                                    {item.history && item.history[0] && item.history[0].transaction_data.length > 1 ?
                                      item.history && item.history[0] && item.history[0].transaction_data.length
                                      : "1"}
                                  </div>
                                </div>
                              </div>
                              <div className="pid">
                                <span>PID: </span> {item._id}
                                <CopyToClipboard text={item._id}
                                  onCopy={() => setCopyToClipMsg({ ...copyToClipMsg, message: "PID copied to clipboard", type: "success" })}>
                                  <span className="copyTo" title="Click to Copy"></span>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="cell amt">
                          <div className="amount" >
                            <span className="tutionAmt">{item.type == "tuiton_fees" ? "Tuition Fees" : (item.type == "downpayment" ? "Downpayment" : "Outstanding")}</span>
                            <p>{"$" + parseFloat(Math.abs(item.amount)).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="cell times">
                          <span className="time">
                            {moment(utils.convertUTCToTimezone(item.due_date, timezone, 'YYYY-MM-DD hh:mm A')).fromNow()}
                          </span>
                        </div>

                        <div className="cell action">
                          <div className="moreOpt">

                            <button type="button" className="moreOptBtn" onClick={() => moreOptOpenOverDue(index)} ref={overdueOptIndex === index ? openItemRef : null}></button>
                            <div className={overdueOptIndex === index ? "optDropdown" : "optDropdown hide"}>
                              <button type="button" className="edit" onClick={() => openCloseEditTransOverdueModal(true, item)}>Edit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }) : ""}

                {isLoaderScroll ?
                  <div className="bottomLoader">
                  </div>
                  : ""}
              </div>
            </Scrollbars>
          </div>

          {/* Contract Transactions */}
          <div className={activeTab == 3 ? "listTab active" : "listTab"}>
            <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={contractListPageNo}>
              <div className="transactionListing" ref={contractRef}>
                {contract && contract.length ?
                  <div className="row head">
                    <div className="cell">Program Name</div>
                    <div className="cell">Total Amount</div>
                    <div className="cell">Contract Duraton</div>
                    <div className="cell">Auto Renewal</div>
                    <div className="cell">&nbsp;</div>
                  </div>
                  :
                  <div className={isLoaderScroll ? "hide" : "noDataSec"}>
                    <img src={noDataIcon} alt="" />
                    <h2>No Transaction Found</h2>
                    <p>No transaction have been created yet</p>
                  </div>
                }

                {contract && contract.length > 0 ? contract.map((item, index) => {
                  return (
                    <div className={item.status == "active" ? "row success" : (item.status == "cancelled" ? "row fail" : "row inactive")} key={index}>
                      <div className="cell">
                        <div className="d-flex">
                          <div className="iconCont">
                            <span>
                              <img src={contractIconWhite} alt="" />
                            </span>
                            {/* <span className="ifDependent">
                          <img src={wwConnect} alt="" />
                        </span> */}
                          </div>
                          <div className="textCont">
                            <div className="status">
                              {item.status}
                            </div>
                            <div className="itemTitle">
                              <span>Program:</span> <p>“{item.courseName}”</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cell">
                        <span className="amount" >
                          {"$" + item.amount}
                        </span>
                      </div>
                      <div className="cell">
                        <span className="transID">
                          {item.duration}
                        </span>
                      </div>
                      <div className="cell">
                        <span className="time">
                          {item.auto_renew == 1 ?
                            <span className="enableStatus">Enabled</span>
                            :
                            <span className="disableStatus">Disabled</span>
                          }
                        </span>
                      </div>
                      <div className="cell">
                        <div className={item.status == "cancelled" ? "hide" : "moreOpt"}>
                          <button type="button" className="moreOptBtn" onClick={() => contractOptTgl(index)} ref={contractOptIndex === index ? openItemRef : null}></button>
                          {contractOptIndex == index ?
                            <div className="optDropdown">
                              <button type="button" className="cancelPayment" onClick={() => openCancelContractModal(item)}>Cancel</button>
                            </div>
                            : ""}
                        </div>
                      </div>
                    </div>
                  )
                }) : ""}
              </div>
              {isLoaderScroll ?
                <div className="bottomLoader">
                </div>
                : ""}
            </Scrollbars>
          </div>
        </div>
      </div>
      {refundModal && <RefundModal closeModal={() => closeRefundModal()}
        amount={refundAmount}
        subscriptionId={subscriptionId}
        contactId={props.contactId}
        loader={(param) => refundLoader(param)}
        alertMsg={(msg, type) => refundAlert(msg, type)}
        payVia={refundPayVia}
      />}


      {editTransModal && <EditTrModal
        transaction={editTransaction}
        closeModal={(param, trans, loadDate) => openCloseEditTransModal(param, trans, loadDate)}
        contactId={props.contactId}
        setSuccessMsg={setSuccessMsg}
      />}

      {refundAlertMsg.message ?
        <AlertMessage message={refundAlertMsg.message} type={refundAlertMsg.type} time={5000} close={closeRefundAlert} />
        : ""}


      {completeTransModal &&
        <CompleteTransactionModal
          closeModal={(param) => openCloseCompleteTrans(param)}
          item={completeTransElement}
          successM={(param) => showSuccessAlert(param)}
        />
      }

      {cancelContractModal &&
        <ConfirmBox
          message="Are you sure, you want to cancel this contract?"
          callback={(param) => cancelContractHandle(param)}
        />
      }

      {cancelAlertMsg.message ?
        <AlertMessage message={cancelAlertMsg.message} type={cancelAlertMsg.type} time={5000} close={closeCancelContractAlert} />
        : ""}

      {retryModal &&
        <RetryPayment
          closeModal={(param) => openCloseRetryModal(param)}
          amount={retryAmount}
          contactId={props.contactId}
          _id={retryId}
          alertMsg={(param) => retryAlertMsg(param)}
        />
      }

      {retryPayAlertMsg.message ?
        <AlertMessage message={retryPayAlertMsg.message} type={retryPayAlertMsg.type} time={5000} close={closeRetryPaymentAlert} />
        : ""}

      {copyToClipMsg.message ?
        <AlertMessage message={copyToClipMsg.message} type={copyToClipMsg.type} time={2000} close={closeCopyToClipAlert} />
        : ""}

    </>
  );
};

export default Transaction;