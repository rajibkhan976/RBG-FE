import React, { useState, useEffect, useRef } from "react";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import wwConnect from "../../../../assets/images/wwConnect.svg";
import wwConnect2 from "../../../../assets/images/wwConnect2.svg";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
import CompleteTransactionModal from "./transaction/CompleteTransactionModal";
import { Scrollbars } from "react-custom-scrollbars-2";

import { TransactionServices } from "../../../../services/transaction/transactionServices";
import Loader from "../../Loader";

const Transaction = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoaderTab, setIsLoaderTab] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [refundModal, setRefundModal] = useState(false);
  const [oldTransactionList, setOldTransactionList] = useState({});
  const [upcomingTransaction, setUpcomingTransaction] = useState([]);
  const [upcomingPagination, setUpcomingPagination ] = useState({});
  const [upcomingOptIndex, setUpcomingOptIndex] = useState();
  const [isScroll, setIsScroll] = useState(false);
  const upcomingOptRef = useRef();


  const openCloseRefundModal = (param) => {
    setRefundModal(param);
  };

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
      console.log(upcomingTransaction);
    }
  };

  const moreOptOpen = (index) => {
    setUpcomingOptIndex(index !== upcomingOptIndex ? index : null);
    console.log(index);
  }

  const checkOutsideClick = (e) => {
    if (upcomingOptRef.current.contains(e.target)) {
      return;
    }
    setUpcomingOptIndex(null);
  }


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

  

  return (
    <>
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
          <div className={isLoader ? "transactionListing" : "transactionListing noEvent"}  ref={upcomingOptRef}>
            <div className={isLoaderTab ? "hide" :"row head"}>
              <div className="cell">Particulars</div>
              <div className="cell">Amount</div>
              <div className="cell">Payment Type</div>
              <div className="cell">Duration Left</div>
              <div className="cell">&nbsp;</div>
            </div>
            { upcomingTransaction.length ? upcomingTransaction.map((item, index) => {
              return (
              <div className="row due" key={index}>
                <div className="cell">
                  <div className="d-flex">
                    <div className="iconCont">
                      <span>
                        <img src={icon_trans} alt="" />
                      </span>
                    </div>
                    <div className="textCont">
                      <div className="status">
                        Due
                      </div>
                      <div>
                        <span>Course:</span> “{ item.title }”
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cell">
                  <span className="amount" >
                    { "$" + item.amount }
                  </span>
                </div>
                <div className="cell">
                  <span className="paymentType">
                    { item.payment_type }
                  </span>
                </div>
                <div className="cell">
                  <span className="time">
                    { item.due_date }
                  </span>
                </div>
                <div className="cell">
                  <div className="moreOpt">
                    <button type="button" className="moreOptBtn" onClick={() => moreOptOpen (index)}></button>
                    <div className={upcomingOptIndex === index ? "optDropdown" : "optDropdown hide"}>
                      <button type="button" className="edit">Edit</button> 
                      <button type="button" className="complete">Complete Transactions</button>  
                      <button type="button" className="history">History</button>
                    </div>  
                  </div>
                </div>
              </div>
            )}) : "" }
          </div>
          </Scrollbars>
        </div>

        <div className={activeTab == 1 ? "listTab active" : "listTab"}>
          <div className="transactionListing">
            <div className="row head">
              <div className="cell">Particulars</div>
              <div className="cell">Amount</div>
              <div className="cell">Transaction ID</div>
              <div className="cell">&nbsp;</div>
            </div>
            <div className="row fail">
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
            </div>
          </div>
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
      { refundModal && <CompleteTransactionModal closeModal={(param) => openCloseRefundModal (param)} /> }
    </>
  );
};

export default Transaction;
