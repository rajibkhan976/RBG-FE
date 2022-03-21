import React, { useEffect, useState, useRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/downpayment.svg";
import payMode from "../../../../../assets/images/paymode.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import profileAvatar from "../../../../../assets/images/camera.svg";
import chooseImg from "../../../../../assets/images/chooseImg.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import program from "../../../../../assets/images/program.png";
import card from "../../../../../assets/images/card.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
import banks from "../../../../../assets/images/banks.svg";
import outstandingCard from "../../../../../assets/images/outstandingCard.svg";
import outstandingCash from "../../../../../assets/images/outstandingCash.svg";
import cashCurrent from "../../../../../assets/images/cashCurrent.svg";
import help from "../../../../../assets/images/help.svg";
import bankActive from "../../../../../assets/images/bankActive.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import paySuccess from "../../../../../assets/images/paySuccess.png";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import cashSuccess from "../../../../../assets/images/cashSuccess.svg";
import paidCard from "../../../../../assets/images/paidCrad.svg";
import smallTick from "../../../../../assets/images/smallTick.svg";

import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";


const PaymentSuccessSection = (props) => {
  const [successList, setSuccessList] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    console.table('Payment props', props.successData);
    setSuccessList(props.successData);
    let totalAmount = props.successData && props.successData.reduce((total, obj) => parseInt(obj.amount) + total, 0)
    setAmountPaid(totalAmount);
  }, [props.successData]);


  return (
    <div className="posSellingForm contractOverview">
      <div className="successHeader">
        <div className="circleForIcon"><img src={paySuccess} alt="" /></div>
        <h3 className="paySuccessHeading">Payment Successful ! </h3>
      </div>
      <div class="dottedBorder"></div>

      <ul className="paymentUlHeader">
        <li className="paymentModeHeaderLi">Payment Mode</li>
        <li className="paymentIdHeaderLi">Transaction ID</li>
        <li className="paymentAmtHeaderLi">Amount</li>
      </ul>
      {successList && successList.map((el, key) => {
        return (
          <React.Fragment key={key + "_paymentSuccess"}>
            <ul className="paymentUlInfo programPaymentSuccess">
              <li className="paymentModeLi">
                <img src={el.defaultTransaction === 'cash' ? cashSuccess : paidCard} alt="" />
                <p>{el.defaultTransaction}</p>
              </li>
              <li className="paymentIdLi"><p>{el.transactionId}</p></li>
              <li className="paymentAmtLi">
                <p>$ {el.amount}</p>
                <img src={smallTick} alt="" />
              </li>
            </ul>
          </React.Fragment>
        );
      })}
      <ul className="totalPaymentUl">
        <li>
          <p>Amount Paid</p>
        </li>
        <li>
          <p>$ {parseFloat(amountPaid).toFixed(2)}</p>
        </li>
      </ul>
      <div className="dottedBorder"></div>
      <div className="successPageBtn programPayment">
        <button onClick={props.backToTransList} className="saveNnewBtn">Go to Transaction List <img src={aaroww} alt="" /></button>
      </div>
    </div>
  )
};

export default PaymentSuccessSection;