import React, { useState, useEffect } from "react";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import wwConnect from "../../../../assets/images/wwConnect.svg";
import wwConnect2 from "../../../../assets/images/wwConnect2.svg";

import { TransactionServices } from "../../../../services/transaction/transactionServices";
import Loader from "../../Loader";

const Transaction = (props) => {
  const [transactionList, setTransactionList] = useState([]);

  const fetchTransactionList = async () => {
    let transactionResponce = await TransactionServices.fetchTransactionList(
      props.contactId
    );
    setTransactionList(transactionResponce);
  };
  console.log("transactionList", transactionList);

  //  useEffect(() => {
  //  transactionList.length === 0 && fetchTransactionList();
  //  //console.log("transactionList", transactionList);
  //  }, [transactionList]);

  useEffect(() => {
    fetchTransactionList();
  }, []);

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const dateCalculationFunction = (transdate) => {
    var d1 = new Date(transdate);
    var d2 = new Date(dt);

    var diff = d1.getTime() - d2.getTime();
    console.log("diff :: ", diff);
    var daydiff = diff / (1000 * 60 * 60 * 24);
    var modVal = diff % (1000 * 60 * 60 * 24);
    var hours = modVal / (1000 * 60 * 60);
    modVal = modVal % (1000 * 60 * 60);
    var min = modVal / (1000 * 60);
    modVal = modVal % (1000 * 60);
    var sec = modVal / 1000;
    //modVal = modVal%(1000)
    // var mili = modVal
    console.log(
      Math.floor(daydiff) +
        " , " +
        Math.floor(hours) +
        " , " +
        Math.floor(min) +
        " , " +
        Math.floor(sec)
    ); //+ " , " + Math.floor(mili));
    var showTime;
    if (daydiff >= 1) {
      showTime =
        Math.floor(daydiff) +
        (Math.floor(daydiff) == 1 ? "day ago" : "days ago");
    } else if (Math.floor(hours) > 0) {
      showTime = Math.floor(hours) + "hr ago";
    } else if (Math.floor(min) >= 1) {
      showTime = Math.floor(daydiff) + "mins ago";
    } else {
      // showTime = Math.floor(min) +  "mins ago";
      showTime = "";
    }
    console.log(transdate, showTime);
    return showTime;
  };
  //var showTimeDIff = dateCalculationFunction("2021-11-25 16:20:04");
  //console.log(showTimeDIff);
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
          <div className="row head">
            <div className="cell">Particulars</div>
            <div className="cell">Amount</div>
            <div className="cell">Transaction ID</div>
            <div className="cell">&nbsp;</div>
          </div>
          <>
            {transactionList.length !== 0 ? (
              transactionList.transactions.map((transList, i) => (
                <>
                  {/* {console.log("This is", transList )} */}
                  <div
                    key={i}
                    className={
                      transList.outcome.result === "success"
                        ? "row success"
                        : transList.outcome.result === "failed"
                        ? "row fail"
                        : "row"
                    }
                  >
                    <div className="cell">
                      <div className="d-flex">
                        <div className="iconCont">
                          <span>
                            <img src={icon_trans} alt="" />
                          </span>
                          {transList.card && (
                            <span className="ifDependent">
                              <img src={wwConnect} alt="" />
                            </span>
                          )}
                        </div>
                        <div className="textCont">
                          <div className="status">
                            {transList.outcome.result}
                          </div>
                          <div>
                            <span>{transList.transaction_for}:</span> “
                            {transList.payment_for}”
                          </div>
                          {transList.card && (
                            <a href="" className="dependent">
                              <span>
                                <img src={wwConnect2} alt="" />
                              </span>{" "}
                              {transList.card.cardholder_name}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="cell">
                      <span
                        className={
                          transList.is_pos === true ? "amount pos" : "amount"
                        }
                      >
                        {transList.approved_amount
                          ? "$" + transList.approved_amount
                          : "NA"}
                        {transList.is_pos && <span>POS</span>}
                      </span>
                    </div>
                    <div className="cell">
                      <span className="transID">
                        {transList.transaction_id
                          ? transList.transaction_id
                          : "NA"}
                      </span>
                    </div>
                    <div className="cell">
                      <span className="time">
                        {dateCalculationFunction(transList.transaction_date)}
                      </span>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <Loader />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Transaction;
