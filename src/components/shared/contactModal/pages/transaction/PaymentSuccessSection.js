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
import smallTick from "../../../../../assets/images/smallTick.svg";

import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";



const PaymentSuccessSection = (props) => {
  const [paymentFailed, setPaymentFailed] = useState(false);

  const paymentFailedFn = () => {
    setPaymentFailed(true);
  };

  const closeFailedPayModal = () => {
    setPaymentFailed(false);
  };
  

 


    return (
      <div className="posSellingForm contractOverview">
        <div className="successHeader">
          <div className="circleForIcon"><img src={paySuccess} alt="" /></div>
          <h3 className="paySuccessHeading">Payment Successful ! </h3>
        </div>
        <div class="dottedBorder"></div>

        <ul className="paymentUlHeader">
          <li>Payment Mode</li>
          <li>Transaction ID</li>
          <li>Amount</li>
        </ul>

        <ul className="paymentUlInfo">
          <li className="paymentModeLi">
            <img src={cashSuccess} alt=""/>
            <p>Cash</p>
          </li>
          <li className="paymentIdLi"><p>dfg41456df1567sdtfg45a</p></li>
          <li className="paymentAmtLi">
            <p>$ 200.00</p>
            <img src={smallTick} alt=""/>
          </li>
        </ul>
      
        <button onClick={(e)=> {paymentFailedFn()}} class="saveNnewBtn">Bill Now <img src={aaroww} alt="" /></button>


        {paymentFailed && (
  <div className="modalBackdrop holiday">           
    <div className="slickModalBody paymentFailed">            
      <div className="slickModalHeader">
         <button className="topCross" onClick={closeFailedPayModal}><img src={crossTop} alt="" /></button> 
        <div className="circleForIcon"><img src={paymentFail} alt="" /></div>
                <h3 className="courseModalHeading">Payment Failed !</h3>
      </div>
      <div className="payModalDetails">
       
        <img src={cardFail} alt="" />
        <p>Payment Failed. We arn’t able to Process your Payment, Pease try again !</p>
      </div>

      <div className="buyBtns failedPayment">
        <button onClick={props.paymentSuccessFn} class="saveNnewBtn">Close</button>
        
        </div>             
      </div>
  </div>
)}

                           
       

       
        </div>


)
};     

export default PaymentSuccessSection;