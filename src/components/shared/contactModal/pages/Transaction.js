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
  const [activeTab, setActiveTab] = useState(0);
  const [refundModal, setRefundModal] = useState(false);
  const [editTransModal, setEditTransModal] = useState(false);
  const [completeTransModal, setCompleteTransModal] = useState(false);
  const [oldTransactionList, setOldTransactionList] = useState({});
  const [upcomingTransaction, setUpcomingTransaction] = useState([]);
  const [upcomingPagination, setUpcomingPagination ] = useState({});
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

  const showOldTrxHistory = (index) => {
    if (oldHistoryIndex == index) {
      setOldHistoryIndex(null);
    } else {
      setOldHistoryIndex(index);
    }
    
  };


  const openRefundModal = (item) => {
    setRefundModal(true);

    let trxType = item.history[item.history.length -1].transaction_for;
    console.log("trxType ", item);
    let data = item.history[item.history.length -1];
    setSubscriptionId(item._id);

    if (trxType == "product") {
      let amount = (data.transaction_data.length > 1) ? data.transaction_data.reduce((v1, v2) => (v1.price*v1.qnty) + (v2.price*v2.qnty)).toFixed(2) : (data.transaction_data[0].price*data.transaction_data[0].qnty).toFixed(2);
      setRefundAmount(amount);
    } else {
      setRefundAmount(data.transaction_data.amount);
    }
  };

  const closeRefundModal = () => {
    setRefundModal(false);
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

  const fetchOldTransactions = async (contactId) => {
    try {
      setIsLoader(true);
      const response = await TransactionServices.fetchOldTransactions(contactId);
      setOldTransactionList(response.transactions);
      console.log("Old transaction response ", response);
    } catch (e) {

    } finally {
      setIsLoader(false);
    }
  };

  const fetchUpcomingTransactions = async (contactId, pageNumber) => {
    try {
      setIsScroll(true);
      setIsLoaderTab(true);
      const response = await TransactionServices.fetchUpcomingTransactions(contactId, pageNumber);
      setUpcomingTransaction([ ...upcomingTransaction, ...response.transactions]);
      setIsScroll(false);
      setUpcomingPagination(response.pagination);
      console.log("Upcoming transaction response ", response);
    } catch (e) {

    } finally {
      setIsLoaderTab(false);
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
    fetchOldTransactions(props.contactId);
    fetchUpcomingTransactions(props.contactId, 1);
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


  const calculateTotalTransactionAmount = (data) => {
    if(data?.amount) {
      return Math.abs(data.amount);
    } else {
      const amount = (data.length > 1) ? data.reduce((v1, v2) => (v1.price*v1.qnty) + (v2.price*v2.qnty)).toFixed(2) : (data[0].price*data[0].qnty).toFixed(2);
      // console.log("reduced"+JSON.stringify(amount));
      return amount;
    }
  }
  

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
        <div className={transactionList?.pagination?.count > 0 ? "transactionListing" : "hide"}>
          {isLoader ? <Loader /> : ''}
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
          { isLoaderTab ? <Loader /> : "" }
          <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={upcomingListPageNo}>
          <div className="transactionListing dueTransactions"  ref={upcomingOptRef}>
            {/* <div className={isLoaderTab ? "hide" :"row head"}> */}
            <div className="row head">
                <div className="cell particulars">Particulars</div>
                <div className="cell amt">Amount</div>
                <div className="cell times">&nbsp;</div>
                <div className="cell action">&nbsp;</div>
            </div>
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
                      { "$" + parseFloat(item.amount).toFixed(2) }
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
              </div>
            )}) : "" }
          </div>
          </Scrollbars>
        </div>

        <div className={activeTab == 1 ? "listTab active" : "listTab"}>
          <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={upcomingListPageNo}>
            <div className="transactionListing oldTransactions" ref={oldOptRef}>
            {/* <div className="indRowHeadWrapers"> */}
                <div className="row head">
                  <div className="cell particulars">Particulars</div>
                  <div className="cell amt">Amount</div>
                  {/* <div className="cell transactionIds">Transaction ID</div> */}
                  <div className="cell times">&nbsp;</div>
                  <div className="cell action">&nbsp;</div>
                </div>
              {/* </div> */}
              {oldTransactionList.length > 0 ? oldTransactionList.map((item, index) => {
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
                                <span>{item.type == "tuiton_fees" ? "Program" : "Product"}:</span> “{item.title}”
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
                                    {Math.abs(element.amount)}
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
                          
                          
                          
                          {/* <div className="cellWrapers fail historyInnerInfo">
                            <div className="cell particulars">
                              <div className="d-flex">
                                <div className="iconCont">
                                  <span>
                                    <img src={cardSmallWhite} alt="" />
                                  </span>
                                </div>
                                <div className="textCont">
                                  <div className="status">
                                    {item.status == "success" ? "successful" : "failed"}
                                  </div>
                                  <div>
                                    <span>Transaction ID:</span> {item._id}
                                
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="cell amt">
                              <div className="amount" >
                                {"$ " + item.amount}
                              </div>
                            </div>

                            <div className="cell times">
                              <span className="time">
                                12.59 PM 
                                <span className="historyDate">15 Feb, 2022</span>
                              </span>
                            </div>
                          </div> */}

                        </div>

                        : ""}




                      </div>
                    </div>







                  //  </div>
                )
              }) : ""}
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
            <div className="row head">
              <div className="cell">Particulars</div>
              <div className="cell">Amount</div>
              <div className="cell">Transaction ID</div>
              <div className="cell">&nbsp;</div>
            </div>
            <div className="row success">
              <div className="cell">
                <div className="d-flex">
                  <div className="iconCont">
                    <span>
                      <img src={icon_trans} alt="" />
                    </span>
                      <span className="ifDependent">
                        <img src={wwConnect} alt="" />
                      </span>
                  </div>
                  <div className="textCont">
                    <div className="status">
                      success
                    </div>
                    <div>
                      <span>Course:</span> “Sample course name”
                    </div>
                      <a href="" className="dependent">
                        <span>
                          <img src={wwConnect2} alt="" />
                        </span>
                        Emily Martyns
                      </a>
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
                    <button type="button" className="cancelPayment">Cancel</button>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      { refundModal && <RefundModal closeModal={() => closeRefundModal ()} 
      amount={refundAmount} 
      subscriptionId={subscriptionId} 
      contactId={props.contactId} 
      loader={(param) => refundLoader ()}
      /> }

      { editTransModal && <EditTrModal closeModal={(param) => openCloseEditTransModal (param)} /> }

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