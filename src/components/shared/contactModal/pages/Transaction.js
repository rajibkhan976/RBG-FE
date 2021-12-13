import React, { useState, useEffect } from "react";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import wwConnect from "../../../../assets/images/wwConnect.svg";
import wwConnect2 from "../../../../assets/images/wwConnect2.svg";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";

import { TransactionServices } from "../../../../services/transaction/transactionServices";
import Loader from "../../Loader";

const Transaction = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const fetchTransactionList = async (contactID) => {
    try {
      setIsLoader(true);
      const transactionRes = await TransactionServices.fetchTransactionList(contactID);
      setTransactionList(transactionRes);
      console.log("List", transactionRes)
    } catch (e) {

    } finally {
      setIsLoader(false);
    }
  };
  //console.log("transactionList", transactionList);



  useEffect(() => {
    fetchTransactionList(props.contactId);
  }, []);

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    // let secTimer = setInterval(() => {
    setDt(new Date().toLocaleString());
    // }, 1000);

    // return () => clearInterval(secTimer);
  }, []);

  const dateCalculationFunction = (transdate) => {
    //console.log("transdate :  ", transdate);
    //console.log("dt :  ", new Date());
    const dt = new Date();
    var d1 = new Date(transdate);
    // var d2 = new Date(dt);
    //console.log("d1 : ", d1);
    // console.log("d2: ", d2);
    var diff = dt - d1.getTime();

    //console.log("diff :: ", diff);
    // var yearCalc =  dt.getFullYear();
    // if(yearCalc % 4 === 0 || yearCalc % 400 === 0 ){
    //   var yeardiff = diff / (1000 * 60 * 60 * 24 * 366);
    // }else{
    //   var yeardiff = diff / (1000 * 60 * 60 * 24 * 365);
    // }
    //console.log("yearDiff :: ", yeardiff);
    var daydiff = diff / (1000 * 60 * 60 * 24);
    //console.log("diff :: ", daydiff);

    var modVal = diff % (1000 * 60 * 60 * 24);
    var hours = modVal / (1000 * 60 * 60);
    modVal = modVal % (1000 * 60 * 60);
    var min = modVal / (1000 * 60);
    modVal = modVal % (1000 * 60);
    //var sec = modVal / 1000;

    var showTime;
    // if (yeardiff >= 1) {
    //   showTime = Math.floor(yeardiff) + (Math.floor(yeardiff) == 1 ? " year ago" : " years ago");
    // } else 
    if (daydiff >= 1) {
      showTime = Math.floor(daydiff) + (Math.floor(daydiff) == 1 ? " day ago" : " days ago");
    } else if (Math.floor(hours) > 0) {
      showTime = Math.floor(hours) + (Math.floor(hours) == 1 ? " hr ago" : " hrs ago");
    } else if (Math.floor(min) >= 1) {
      showTime = Math.floor(min) + (Math.floor(min) == 1 ? " min ago" : " mins ago");
    } else {
      // showTime = Math.floor(min) +  "mins ago";
      showTime = "0 mins ago";
    }
    //console.log(transdate, showTime);
    return showTime;
  };

  const CourseTransaction = (prop) => {
    const transData = prop.list;
    return (
      <div key={"trans_" + prop.key}
        className={(transData.outcome.result === "success") ? "row success" : "row fail"}
      >
        <div className="cell">
          <div className="d-flex">
            <div className="iconCont">
              <span>
                <img src={icon_trans} alt="" />
              </span>
              {transData.card && (
                <span className="ifDependent">
                  <img src={wwConnect} alt="" />
                </span>
              )}
            </div>
            <div className="textCont">
              <div className="status">
                {(transData?.outcome.result) ? transData?.outcome.result : "success"}
              </div>
              <div>
                <span>Course:</span> “
                {transData.payment_for}”
              </div>
              {transData.card && (
                <a href="" className="dependent">
                  <span>
                    <img src={wwConnect2} alt="" />
                  </span>{" "}
                  {transData.card.cardholder_name}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="cell">
          <span
            className="amount"
          >
            {transData.approved_amount
              ? "$" + transData.approved_amount
              : "NA"}
            {/* {transList.is_pos && <span>POS</span>} */}
          </span>
        </div>
        <div className="cell">
          <span className="transID">
            {transData.transaction_id
              ? transData.transaction_id
              : "NA"}
            NA
          </span>
        </div>
        <div className="cell">
          <span className="time">
            {dateCalculationFunction(transData.transaction_date)}
          </span>
        </div>
      </div>
    )
  };

  const PosTransaction = (prop) => {
    const transData = prop.list;
    return (
      <div key={"trans_" + prop.key} className="row success"
      >
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
                <span>Product:</span> “
                {transData.transaction_data.name}”
              </div>
            </div>
          </div>
        </div>
        <div className="cell">
          <span className="amount pos">
            {transData.transaction_data.price}<span>POS</span>
          </span>
        </div>
        <div className="cell">
          <span className="transID">
            {transData.transaction_id ? transData.transaction_id : "NA"}
          </span>
        </div>
        <div className="cell">
          <span className="time">
            {dateCalculationFunction(transData.transaction_date)}
          </span>
        </div>
      </div>
    )
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
        <div className="transactionListing">
          {isLoader ? <Loader /> : ''}
          <div className="row head">
            <div className="cell">Particulars</div>
            <div className="cell">Amount</div>
            <div className="cell">Transaction ID</div>
            <div className="cell">&nbsp;</div>
          </div>
          <>
            {
              transactionList?.pagination?.count > 0 ? transactionList?.transactions?.map((transaction, key) => {
                return (!transaction.is_pos) ? <CourseTransaction list={transaction} key={key} /> : <PosTransaction list={transaction} key={key} />;
              }) : (
                <div className="createNew">
                  <span>
                    <img src={list_board_icon} alt="" />
                    <p>No transaction found!</p>
                  </span>
                </div>
              )}

          </>
        </div>
      </div>
    </>
  );
};

export default Transaction;
