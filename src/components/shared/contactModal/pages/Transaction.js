import React, { useState, useEffect, useRef } from "react";
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
import RefundModal from "./transaction/RefundModal";
import EditTrModal from "./transaction/EditTrModal";
import { Scrollbars } from "react-custom-scrollbars-2";
import AlertMessage from "../../messages/alertMessage";
import moment from "moment";
import { TransactionServices } from "../../../../services/transaction/transactionServices";
import Loader from "../../Loader";
import CompleteTransactionModal from "./transaction/CompleteTransactionModal";

const Transaction = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoaderTab, setIsLoaderTab] = useState(false);
  const [isLoaderScroll, setIsLoaderScroll] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [refundModal, setRefundModal] = useState(false);
  const [editTransModal, setEditTransModal] = useState(false);
  const [completeTransModal, setCompleteTransModal] = useState(false);
  const [oldTransactionList, setOldTransactionList] = useState([]);
  const [upcomingTransaction, setUpcomingTransaction] = useState([]);
  const [upcomingPagination, setUpcomingPagination ] = useState({});
  const [oldPagination, setOldPagination ] = useState({});
  const [upcomingOptIndex, setUpcomingOptIndex] = useState();
  const [oldOptIndex, setOldOptIndex] = useState();
  const [isScroll, setIsScroll] = useState(false);
  const [completeTransElement, setCompleteTransElement] = useState();
  const [successMsg, setSuccessMsg] = useState(null);
  const upcomingOptRef = useRef();
  const oldOptRef = useRef();
  const oldTrxHistRef = useRef();
  const [refundAmount, setRefundAmount] = useState();
  const [subscriptionId, setSubscriptionId] = useState();
  const [oldHistoryIndex, setOldHistoryIndex] = useState(null);
  const [upcomingHistoryIndex, setUpcomingHistoryIndex] = useState(true);
  const [contract, setContract] = useState();
  

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
    setRefundAmount(item.amount);
  };

  const closeRefundModal = () => {
    setRefundModal(false);
    fetchOldTransactions(props.contactId, 1);
  };

  const refundLoader = (param) => {
    setIsLoader(param);
  };

  const openCloseEditTransModal = (param) => {
    setEditTransModal(param);
  };

  const openCloseCompleteTrans = (param, item) => {
    setCompleteTransModal(param);
    setCompleteTransElement(item);
    if (!param) {
      fetchUpcomingTransactions(props.contactId, 1);
    }
  };
  

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        setRefundModal(false);
        setCompleteTransModal(false);
        setUpcomingOptIndex(null);
        setOldOptIndex(null);
        setOldHistoryIndex(null);
        setUpcomingHistoryIndex(null);
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[]);


  const changeTab = (e) => {
    setActiveTab(e.target.value);
  };

  const upcomingListPageNo = (e) => {
    if (!isScroll) {
      let scrollHeight = e.target.scrollHeight;
      let scrollTop = e.target.scrollTop;
      if (scrollTop > (scrollHeight / 2)) {
        if(upcomingPagination.currentPage < upcomingPagination.totalPages) {
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
        if(oldPagination.currentPage < oldPagination.totalPages) {
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
        setOldTransactionList([ ...oldTransactionList, ...response.transactions]);
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
        setUpcomingTransaction([ ...upcomingTransaction, ...response.transactions]);
      }
      setIsScroll(false);
      setUpcomingPagination(response.pagination);
      console.log("Upcoming transaction response ", response);
    } catch (e) {

    } finally {
      setIsLoaderScroll(false);
    }
  };

  const fetchContract = async () => {
    try {
      const response = await TransactionServices.fetchContract(props.contactId);
      setContract(response.transactions);
      console.log("Contract response ", response);
    } catch (e) {

    } finally {
      setIsLoaderScroll(false);
    }
  };



  const moreOptOpenUpcoming = (index) => {
    setUpcomingOptIndex(index !== upcomingOptIndex ? index : null);
    if (upcomingOptIndex != null) {
      setUpcomingOptIndex(null);
    }
  }

  const moreOptOpenOld = (index) => {
    setOldOptIndex(index !== upcomingOptIndex ? index : null);
    if (oldOptIndex != null) {
      setOldOptIndex(null);
    }
  }

  const checkOutsideClick = (e) => {
    if (upcomingOptRef.current.contains(e.target)) {
      return;
    }
    setUpcomingOptIndex(null);

    if (oldOptRef.current.contains(e.target)) {
      return;
    }
    setUpcomingHistoryIndex(null);
    setOldOptIndex(null);
    setOldHistoryIndex(null);
  }

  const showSuccessAlert = (param) => {
    setSuccessMsg(param);
  };

  const closeAlert = () => {
    setSuccessMsg(null);
  };


  useEffect(() => {
    fetchOldTransactions(props.contactId, 1);
    fetchUpcomingTransactions(props.contactId, 1);
    fetchContract();
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
  

  return (
    <>
      { successMsg && <AlertMessage type="success" message={successMsg} time={10000} close={closeAlert} /> }
      <div className="contactTabsInner">
        <h3 className="headingTabInner">Transactions</h3>
        <div className="transHeader">
          <button className="saveNnewBtn" onClick={props.goToTransaction}>
            Make a Transaction <img src={arrow_forward} alt="" />
          </button>
          <span>* Explanatory text blurb should be here.</span>
        </div>
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
            <li><button type="button" value="2" onClick={changeTab} className={activeTab == 2 ? "active" : ""}>Contract Transactions</button></li>
          </ul>
        </div>

        <div className={activeTab == 0 ? "listTab active" : "listTab"}>
          <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={upcomingListPageNo}>
          <div className="transactionListing dueTransactions"  ref={upcomingOptRef}>
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
            { upcomingTransaction.length ? upcomingTransaction.map((item, index) => {
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
                        <div>
                          <span>{item.transaction_for == "product" ? "Product" : "Program"}:</span> “{ item.title }”
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cell amt">
                    <span className="amount" >
                    <span className="tutionAmt">{item.type == "tuiton_fees" ? "Tution Fee" : (item.type == "downpayment" ? "Downpayment" : "Outstanding")}</span>
                      { "$ " + parseFloat(item.amount).toFixed(2) }
                    </span>
                  </div>
                
                  <div className="cell times">
                    <span className="time">
                      { item.due_date }
                    </span>
                  </div>
                  <div className="cell action">
                    <div className="moreOpt">
                      <button type="button" className="moreOptBtn" onClick={() => moreOptOpenUpcoming (index)}></button>
                      <div className={upcomingOptIndex === index ? "optDropdown" : "optDropdown hide"}>
                        <button type="button" className="edit" onClick={() => openCloseEditTransModal (true, item)}>Edit</button> 
                        {item.payment_via === "cash" ? 
                        <button type="button" className="complete" onClick={() => openCloseCompleteTrans (true, item)}>Complete Transactions</button> 
                        : ""}
                        {/* <button type="button" className="history">History</button> */}
                      </div>  
                    </div>
                  </div>
                </div>
                

                <div className={item.history.length ? "cellWrapers historyDetails upcoming" : "hide"}>

                  <div className={upcomingHistoryIndex == index ? "showMore hide" : "showMore"} onClick={() => showUpcomingHistory (index)}>
                    <img src={dropVector} alt="" />
                  </div>


                  {upcomingHistoryIndex == index ?
                  <div className="showDetails">
                    {item.history.map((element, key) => {
                      return (
                        <div key={"oldhistory" + key} className={element.status == "failed" ? "cellWrapers fail historyInnerInfo" : (element.amount < 0 ? "cellWrapers success refunded historyInnerInfo" : "cellWrapers success historyInnerInfo")}>
                          <div className="cell particulars">
                            <div className="d-flex">
                              <div className="iconCont">
                                <span>
                                  {element.amount < 0 ? 
                                  <img src={refundIcon} alt="" />
                                  : ( element.payment_via == "cash" ? 
                                    <img src={cashSmallWhite} alt="" />
                                    : ( element.payment_via == "bank" ?
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
                                  {element.status == "failed" ? "failed" : (element.amount < 0 ? "refunded" : "successful")}
                                  {element.amount < 0 ? 
                                  <div className="notePop">
                                    <div className="notePopIcon"></div>
                                    <div className="notePopContent">
                                      <span>Reason: </span>
                                      {element.note}
                                    </div>
                                  </div>
                                  : ""}
                                </div>
                                <div>
                                  <span>Transaction ID:</span> {element._id}
                              
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
            )}) : "" }
            {isLoaderScroll ? 
              <div className="bottomLoader">
              </div>  
              : ""}
          </div>
          </Scrollbars>
        </div>

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


                  
                    <div className={item.history.length && item.history[item.history.length - 1].status == "success" ? "row success withHistory" : "row fail withHistory"} key={index}>
                      <div className="cellWraperss">

                        <div className="cell particulars">
                          <div className="d-flex">
                            <div className="iconCont">
                              {item.history.length && item.history[item.history.length - 1].payment_via == "cash" ? 
                              <span>
                                <img src={cashSmallWhite} alt="" />
                              </span>
                              : (item.history.length && item.history[item.history.length - 1].payment_via == "bank" ? 
                                <span>
                                  <img src={bankSmallWhite} alt="" />
                                </span>
                                :
                                <span>
                                  <img src={cardSmallWhite} alt="" />
                                </span>
                                )
                              }
                              
                              {item.history.length && item.history[item.history.length - 1].amount < 0 ?
                              <span className="refund">
                                <img src={refundIcon} alt="" />
                              </span>
                              : ""}
                            </div>
                            <div className="textCont">
                              <div className="status">
                                {item.history.length && item.history[item.history.length - 1].status == "success" ? "success" : "failed"}
                                {item.history.length && item.history[item.history.length - 1].amount < 0 ? 
                                <span className="refundedTag">Refunded</span>
                                : ""}
                                
                              </div>
                              <div>
                                <span>{item.transaction_for == "course" ? "Program" : "Product"}: </span> 
                                {item.transaction_for === "product" ? 
                                 item.history && item.history[item.history.length - 1].transaction_data[0].product
                                :
                                item.title
                                }
                                
                                <div className={item.transaction_for == "product" ? "productItemList" : "hide"}>
                                  <div className="productNumber">
                                    {item.history.length && item.history[item.history.length - 1].transaction_data.length > 1 ?
                                    item.history.length && item.history[item.history.length - 1].transaction_data.length
                                    : "1"}
                                  </div>
                                  <ul className="productItems">
                                    
                                    {item.transaction_for == "product" ? item.history[item.history.length - 1].transaction_data.map((product, key) => {
                                      return (
                                        <li className="itemList">
                                          <h3><span>{key+1 + "."}</span>{product.product}</h3>
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
                            </div>
                          </div>
                        </div>

                        <div className="cell amt">
                          <div className="amount" >
                            <span className="tutionAmt">{item.type == "tuiton_fees" ? "Tution Fee" : (item.type == "downpayment" ? "Downpayment" : "Outstanding")}</span>
                            {"$ " + parseFloat(Math.abs(item.history.length && item.history[item.history.length - 1].amount)).toFixed(2)}
                          </div>
                        </div>

                        {/* <div className="cell transactionIds">
                          <span className="transID">
                          {item._id}
                          </span>
                        </div> */}

                        <div className="cell times">
                          <span className="time">
                            {moment(item.history.length && item.history[item.history.length - 1].transaction_date, 'YYYY-MM-DD').fromNow()}
                          </span>
                        </div>

                        <div className="cell action">
                          <div className="moreOpt">
                          <button type="button" className="moreOptBtn" onClick={() => moreOptOpenOld (index)}></button>
                            <div className={oldOptIndex === index ? "optDropdown" : "optDropdown hide"}>
                              {item.history.length && item.history[item.history.length -1].status == "success" ?
                                <button type="button" className="refund" onClick={() => openRefundModal (item)}>Refund</button>
                                :
                                <button type="button" className="retry">Retry</button> 
                              }
                              {/* <button type="button" className="history">History</button> */}
                            </div>  
                          </div>
                        </div>
                      </div> 
                      <div className="cellWrapers historyDetails">

                        <div className={oldHistoryIndex == index ? "showMore hide" : "showMore"} onClick={() => showOldTrxHistory (index)}>
                          <img src={dropVector} alt="" />
                        </div>


                        {oldHistoryIndex == index ?
                        <div className="showDetails">
                          {item.history.map((element, key) => {
                            return (
                              <div key={"oldhistory" + key} className={element.status == "failed" ? "cellWrapers fail historyInnerInfo" : (element.amount < 0 ? "cellWrapers success refunded historyInnerInfo" : "cellWrapers success historyInnerInfo")}>
                                <div className="cell particulars">
                                  <div className="d-flex">
                                    <div className="iconCont">
                                      <span>
                                        {element.amount < 0 ? 
                                        <img src={refundIcon} alt="" />
                                        : ( element.payment_via == "cash" ? 
                                          <img src={cashSmallWhite} alt="" />
                                          : ( element.payment_via == "bank" ?
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
                                        {element.status == "failed" ? "failed" : (element.amount < 0 ? "refunded" : "successful")}
                                        {element.amount < 0 ? 
                                        <div className="notePop">
                                          <div className="notePopIcon"></div>
                                          <div className="notePopContent">
                                            <span>Reason: </span>
                                            {element.note}
                                          </div>
                                        </div>
                                        : ""}
                                      </div>
                                      <div>
                                        <span>Transaction ID:</span> {element._id}
                                    
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







                  //  </div>
                )
              }) : ""}
              
              {isLoaderScroll ? 
              <div className="bottomLoader">
              </div>  
              : ""}
              
              {/* <div className="row fail">
                <div className="cell">
                  <div className="d-flex">
                    <div className="iconCont">
                      <span>
                        <img src={icon_trans} alt="" />
                      </span>
                    </div>
                    <div className="textCont">
                      <div className="status">
                        Fail
                      </div>
                      <div>
                        <span>Course:</span> “Sample course name”
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cell">
                  <span className="amount" >
                    $100
                  </span>
                </div>
                <div className="cell">
                  <span className="transID">
                    dfg41456df1567sdtfg24g
                  </span>
                </div>
                <div className="cell">
                  <span className="time">
                    18 m ago
                  </span>
                </div>
                <div className="cell">
                  <div className="moreOpt">
                    <button type="button" className="moreOptBtn"></button>
                    <div className="optDropdown">
                      <button type="button" className="retry">Retry</button>  
                      <button type="button" className="history">History</button>
                    </div>  
                  </div>
                </div>
              </div>
              <div className="row success">
                <div className="cell">
                  <div className="d-flex">
                    <div className="iconCont">
                      <span>
                        <img src={icon_trans} alt="" />
                      </span>
                    </div>
                    <div className="textCont">
                      <div className="status">
                        Success
                      </div>
                      <div>
                        <span>Course:</span> “Sample course name”
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cell">
                  <span className="amount" >
                    $100
                  </span>
                </div>
                <div className="cell">
                  <span className="transID">
                    dfg41456df1567sdtfg24g
                  </span>
                </div>
                <div className="cell">
                  <span className="time">
                    18 m ago
                  </span>
                </div>
                <div className="cell">
                  <div className="moreOpt">
                    <button type="button" className="moreOptBtn"></button>
                    <div className="optDropdown">
                      <button type="button" className="refund" onClick={() => openCloseRefundModal (true)}>Refund</button>  
                      <button type="button" className="history">History</button>
                    </div>  
                  </div>
                </div>
              </div> */}
            </div>
          </Scrollbars>
        </div>
        <div className={activeTab == 2 ? "listTab active" : "listTab"}>
          <div className="transactionListing">
            {contract && contract.length ?
            <div className="row head">
              <div className="cell">Program Name</div>
              <div className="cell">Total Amount</div>
              <div className="cell">Contract Duraton</div>
              <div className="cell">Auto Renuwal</div>
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
                <div className="row success" key={index}>
                  <div className="cell">
                    <div className="d-flex">
                      <div className="iconCont">
                        <span>
                          <img src={icon_trans} alt="" />
                        </span>
                        {/* <span className="ifDependent">
                          <img src={wwConnect} alt="" />
                        </span> */}
                      </div>
                      <div className="textCont">
                        <div className="status">
                          {item.status == "active" ? "active" : "expired"}
                        </div>
                        <div>
                          <span>Program:</span> “{item.courseName}”
                        </div>
                          {/* <a href="javascript:void(0)" className="dependent">
                            <span>
                              <img src={wwConnect2} alt="" />
                            </span>
                            Emily Martyns
                          </a> */}
                      </div>
                    </div>
                  </div>
                  <div className="cell">
                    <span className="amount" >
                      $ {item.amount}
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
                      <span className="enableStatus">Enable</span>
                      :
                      <span className="disableStatus">Disable</span>
                    }
                    </span>
                  </div>
                  <div className="cell">
                    <div className="moreOpt">
                      <button type="button" className="moreOptBtn"></button>
                      <div className="optDropdown hide">
                        <button type="button" className="cancelPayment">Cancel</button>
                      </div>  
                    </div>
                  </div>
                </div>
              )
            }) : ""}
            

          </div>
        </div>

      </div>
      { refundModal && <RefundModal closeModal={() => closeRefundModal ()} 
      amount={refundAmount} 
      subscriptionId={subscriptionId} 
      contactId={props.contactId} 
      loader={(param) => refundLoader (param)}
      /> }

      { editTransModal && <EditTrModal closeModal={(param) => openCloseEditTransModal (param)} contactId={props.contactId} /> }

      { completeTransModal && 
      <CompleteTransactionModal 
        closeModal={(param) => openCloseCompleteTrans (param)} 
        item={completeTransElement} 
        successM={(param) => showSuccessAlert (param)} 
      /> 
      }

    </>
  );
};

export default Transaction;