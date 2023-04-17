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
import cardFail from "../../../../../assets/images/cardFailed.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";
import config from "../../../../../configuration/config";
import BillingOverview from "./BillingOverview";
import { utils } from "../../../../../helpers";
import { ProgramServices } from "../../../../../services/transaction/ProgramServices";
import PaymentSuccessSection from "./PaymentSuccessSection";



const ContractOverviewTransaction = (props) => {
  console.log('overview ', props.programContractData);

  const [contractOverview, setContractOverview] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const [addBankModal, setAddBankModal] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState("");


  const paymentFailedFn = (message) => {
    setPaymentFailed(true);
    setPaymentFailedMessage(message);
  };

  const closeFailedPayModal = () => {
    setPaymentFailed(false);
  };

  const addBankModalFn = () => {
    setAddBankModal(true);
  };


  const closeBankModal = () => {
    setAddBankModal(false);
  };

  const contractOverviewFn = (e) => {
    e.preventDefault();
    setContractOverview(true);
  };


  const [choosePOS, setChoosetPOS] = useState(true);
  const [chooseCourse, setChooseCourse] = useState(false);

  const chooseTransctionTypePOS = () => {
    setChoosetPOS(!choosePOS);
    setChooseCourse(false);
  }


  const chooseTransctionTypeCourse = () => {
    setChoosetPOS(false);
    setChooseCourse(!chooseCourse);
  }

  const [contractData, setContractData] = useState({
    courseName: "",
    courseImage: "",
    duration: ""
  });

  // Change default payment method
  const changeDefaultPayFn = (data) => {
    console.log('data came from biling overviwe', data);
    setContractData({
      ...contractData,
      billingId: data.billingId
    });
  };

  //Set program contract data
  useEffect(() => {
    //Remaining payment count
    let remainingPaymentCount = Number(props.programContractData.numberOfPayments);
    //Default transaction is in cash
    let isReceivedDefaultCash = false;
    let isReceivedDefaultCashFlagErr = false;

    /**
     * Payment now
     */
    let payNowTuitionAmount = 0;
    if (props.programContractData.isPayNow) {
      remainingPaymentCount--;

      //Pay now tuition fee
      payNowTuitionAmount = Number(props.programContractData.amount);
      console.log('Pay now tuition amount', payNowTuitionAmount)
    }


    //Pay now down payments
    let payNowDownPayments = [];
    let payNowDownPaymentsAmount = 0;
    if (props.programContractData.downPayments && props.programContractData.downPayments.length) {
      payNowDownPayments = props.programContractData.downPayments.filter(obj => {
        return obj.isPayNow === 1 && obj.amount !== ''
      });
      payNowDownPayments = payNowDownPayments.map(payNowDownPayments => ({ ...payNowDownPayments, isReceivedCash: false }));
      console.log('Pay now down payments ', payNowDownPayments);
      payNowDownPaymentsAmount = payNowDownPayments.reduce((total, obj) => Number(obj.amount) + total, 0);
      console.log('Pay now down payments total amout: ', payNowDownPaymentsAmount, typeof payNowDownPaymentsAmount);
    }
    console.log('Now amount', payNowTuitionAmount, typeof payNowTuitionAmount);
    //Billing total
    let nowPaymentAmount = payNowTuitionAmount + payNowDownPaymentsAmount;

    /**
     * Payment due
     */

    //Due tuition fee
    let dueTuitionAmount = 0;
    if (props.programContractData.payment_type === "recurring") {
      dueTuitionAmount = props.programContractData.amount * remainingPaymentCount;
      console.log('Due tuition amount recurring', dueTuitionAmount)
    } else if (props.programContractData.payment_type === "onetime" && !props.programContractData.isPayNow) {
      dueTuitionAmount = props.programContractData.amount * 1;
      console.log('Due tuition amount one time', dueTuitionAmount)
    }

    //Due down payments
    let dueDownPayments = [];
    let dueDownPaymentsAmount = 0;
    if (props.programContractData.downPayments && props.programContractData.downPayments.length) {
      dueDownPayments = props.programContractData.downPayments.filter(obj => {
        return obj.isPayNow === 0 && obj.amount !== ''
      });
      console.log('Due down payments ', dueDownPayments);
      dueDownPaymentsAmount = dueDownPayments.reduce((total, obj) => Number(obj.amount) + total, 0);
      console.log('Due down payments total amout: ', dueDownPaymentsAmount);

    }

    let duePaymentAmount = dueTuitionAmount + dueDownPaymentsAmount;
    console.log('Due payment amount', duePaymentAmount);

    /**
     * Payment Overview
     */

    //Total down payment amount
    let totalDownPayment = 0;
    if (props.programContractData.downPayments && props.programContractData.downPayments.length) {
      totalDownPayment = props.programContractData.downPayments.reduce((total, obj) => Number(obj.amount) + total, 0);
    }

    //Total tuition amount
    let totalTuitionAmount = Number(props.programContractData.amount) * props.programContractData.numberOfPayments

    //Total
    let total = totalDownPayment + totalTuitionAmount;


    setContractData({
      ...contractData,
      contact: props.programContractData.contact,
      amount: props.programContractData.amount,
      payment_type: props.programContractData.payment_type,
      billing_cycle: props.programContractData.billing_cycle,
      courseStart: props.programContractData.courseStart,
      numberOfPayments: props.programContractData.numberOfPayments,
      paymentDate: props.programContractData.paymentDate,
      isPayNow: props.programContractData.isPayNow,
      default_transaction: props.programContractData.default_transaction,
      downpayments: props.programContractData.downPayments,
      courseName: props.programContractData.courseName,
      courseImage: props.programContractData.courseImage,
      duration: props.programContractData.duration + ' ' + utils.capitalizeFirst(props.programContractData.durationInterval) + '(s)',
      billingCycleText: props.programContractData.billing_cycle === 'monthly' ? 'Month' : (props.programContractData.billing_cycle === 'weekly' ? 'Week' : 'Year'),
      auto_renew_text: props.programContractData.auto_renew ? 'ON' : 'OFF',
      auto_renew: props.programContractData.auto_renew,
      totalDownPayment: totalDownPayment,
      tuitionAmount: props.programContractData.amount,
      totalTuitionAmount: props.programContractData.amount * props.programContractData.numberOfPayments,
      total: total,
      dueDownPayments: dueDownPayments,
      payNowDownPayments: payNowDownPayments,
      durationInterval: props.programContractData.durationInterval,
      payNowTuitionAmount: payNowTuitionAmount,
      nowPaymentAmount: nowPaymentAmount,
      remainingPaymentCount: remainingPaymentCount,
      duePaymentAmount: duePaymentAmount,
      nextDueDate: props.programContractData.nextDueDate,
      isReceivedDefaultCash: isReceivedDefaultCash,
      isReceivedDefaultCashFlagErr: isReceivedDefaultCashFlagErr,
      isNoCardBankFlagErr: false
    });

  }, [props.programContractData]);

  //Toggle receive cash
  const toggleReceiveCash = async (e, key) => {
    console.log('Toggle receive cash', e.target.checked, key);
    let elems = [...contractData.payNowDownPayments];
    elems[key]["isReceivedCash"] = e.target.checked;
    if (e.target.checked) {
      elems[key]["isReceivedCashFlagErr"] = !e.target.checked;
    }
    let newElem = elems[key];
    elems[key] = newElem;
    console.log('RC D', elems);
    setContractData({
      ...contractData,
      payNowDownPayments: elems
    });
  }

  //Toggle default receive cash
  const toggleDefaultReceiveCash = async (e) => {
    setContractData({
      ...contractData,
      isReceivedDefaultCash: e.target.checked,
      isReceivedDefaultCashFlagErr: !e.target.checked
    });
  }

  //Bill Now
  const billNow = async (e) => {
    e.preventDefault();
    console.log('Bill now', contractData);
    let isError = false;
    //Check cash received or not
    if (contractData.payNowDownPayments.length) {
      let isExistsNotPaidCash = contractData.payNowDownPayments.filter(obj => {
        return obj.payment_type === 'cash' && obj.isReceivedCash === false
      });
      //Cash not received
      if (isExistsNotPaidCash.length) {
        isError = true;
        console.log('Pay now down payments length', contractData);
        let newEl = contractData.payNowDownPayments.filter(obj => {
          if (obj.payment_type === 'cash' && !obj.isReceivedCash) {
            obj.isReceivedCashFlagErr = true
          }
          return obj;
        });
        setContractData({
          ...contractData,
          payNowDownPayments: newEl
        });
      }
    }
    //Check default transaction cash received or not
    console.log('default cash not received', contractData.isReceivedDefaultCash, contractData.default_transaction);
    if (contractData.isPayNow && !contractData.isReceivedDefaultCash && contractData.default_transaction === 'cash') {
      isError = true;
      setContractData({
        ...contractData,
        isReceivedDefaultCashFlagErr: true
      });
    }
    //Check billing id
    console.log('no card and bank', !contractData.billingId, contractData.default_transaction);
    if (!contractData.billingId && contractData.default_transaction === 'online') {
      isError = true;
      setContractData({
        ...contractData,
        isNoCardBankFlagErr: true
      });
    }
    if (!isError) {
      setIsLoader(true);
      let oprationMethod = "buyProgram";
      try {
        const result = await ProgramServices[oprationMethod](contractData)
        if (result.status === 'success') {
          console.log('bill now result', result);
          props.paymentSuccessFn(e, result.data);
        } else if (result.status === 'pending') {
          props.paymentSuccessFn(e, []);
        } else {
          paymentFailedFn(result.description);
        }
      } catch (e) {
        paymentFailedFn('Something went wrong! Please contact support.');
        console.log("Error in bill now", e);
      } finally {
        setIsLoader(false);
      }
    }
  }


  return (
    <div className={props.paymentSuccess ? "posSellingForm contractOverview hide" : "posSellingForm contractOverview"}  >
      {isLoader && <Loader />}
      {props.successMsg &&
        <div className="formMsg success"></div>
      }
      {props.errorMsg &&
        <div className=""></div>
      }

      <div className="productAvailable contractdetails active">
        <div className="programOverview">
          <header className='informHeader'>
            <h5>Program Overview</h5>
          </header>
          <div className="bodytransactionForm">
            <div className="programDetailsInfos">
              <div className="programListImage">
                <img src={contractData.courseImage ? config.bucketUrl + contractData.courseImage : program} />
              </div>
              <div className="programInfos">
                <h6 className="programHeading">{contractData.courseName}</h6>
                <ul className="programInfosUl">
                  <li>
                    <span className="labelSpan">Duration</span>
                    <span className="informationSpan"><b>{contractData.duration}</b></span>
                  </li>
                  <li>
                    <span className="labelSpan">Auto Renewal</span>
                    <span className="informationSpan">{contractData.auto_renew_text}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <BillingOverview
          contactId={props.programContractData.contact}
          changeDefaultPay={changeDefaultPayFn}
          isNoCardBankFlagErr={contractData.isNoCardBankFlagErr}
        />
      </div>

      <div className="productAvailable paymentDetails active">
        <div className="programOverview">
          <header className='informHeader'>
            <h5>Payment Overview</h5>
          </header>
          <div className="bodytransactionForm">
            <ul className="programInfosUl paymentOverviews">
              <li>
                <div className="labelSpan">Total Down Payment Amount</div>
                <div className="informationSpan">${parseFloat(contractData.totalDownPayment).toFixed(2)}</div>
              </li>
              <li>
                <div className="labelSpan">Total Tuition Amount</div>
                <div className="informationSpan">
                  <span className="infoSpan">
                    <img src={help} alt="" />
                    {contractData.payment_type === 'onetime' ?
                      <span className="tooltiptextInfo overViewPages"> ${contractData.tuitionAmount} x 1 </span> :
                      <span className="tooltiptextInfo overViewPages">${contractData.tuitionAmount} x {contractData.numberOfPayments + ' ' + contractData.billingCycleText + '(s)'}</span>
                    }
                  </span>&nbsp;&nbsp;${parseFloat(contractData.totalTuitionAmount).toFixed(2)}</div>
              </li>
            </ul>
            <ul className="totalPaymentUl">
              <li>Total</li>
              <li>${parseFloat(contractData.total).toFixed(2)}</li>
            </ul>
          </div>
        </div>
        {contractData.duePaymentAmount > 0 ?
          <div className="outstandingOverview">
            {contractData.dueDownPayments && contractData.dueDownPayments.map((el, key) => {
              return (
                <React.Fragment key={key + "_dueDownPayments"}>
                  <div className="outstandingDownpayment">
                    <div className="downpaymentsDetails">
                      <div className="cardImage">
                        <img src={el.payment_type === 'cash' ? outstandingCash : outstandingCard} alt="" />
                      </div>
                      <div className="paymentModuleInfos">
                        <span className="accNumber">{el.title}</span>
                        <span className="accinfod"><b>$ {parseFloat(el.amount).toFixed(2)}</b></span>
                      </div>
                    </div>
                    <div className="downpaymentsPayDetails">
                      <div className="paymentStatus due">Due</div>
                      <div className="payDate">
                        <img src={payDate} /> {utils.standardDateFormat(el.paymentDate)}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {contractData.remainingPaymentCount > 0 ?
              <div className="outstandingDownpayment tutuionSubscriptions">
                <div className="downpaymentsDetails">
                  <div className="cardImage">
                    <img src={outstandingCard} alt="" />
                  </div>
                  <div className="paymentModuleInfos">
                    <span className="accNumber">Tuition Amount</span>
                    <span className="accinfod"><b>$ {parseFloat(contractData.tuitionAmount).toFixed(2)}</b> / {contractData.billingCycleText}</span>
                  </div>
                </div>
                <div className="downpaymentsPayDetails">
                  <div className="payDate instalments">Payment Remaining <b>{contractData.remainingPaymentCount}</b></div>
                  <div className="payDate instalmentDate">
                    <img src={payDate} alt="" /> {contractData.nextDueDate ? utils.standardDateFormat(contractData.nextDueDate) : utils.standardDateFormat(contractData.paymentDate)}
                  </div>
                </div>
              </div> : ""}

            <ul className="totalPaymentUl outstandings">
              <li>Outstanding</li>
              <li>${parseFloat(contractData.duePaymentAmount).toFixed(2)}</li>
            </ul>
          </div>
          : ''}
        <div className="dottedBorder"></div>

        <div className={contractData.payNowTuitionAmount || contractData.payNowDownPayments ? "currentPaymentOverview programPayNowOverview" : "currentPaymentOverview programPayNowOverview noNowPayments"}>
          {contractData.payNowDownPayments && contractData.payNowDownPayments.map((el, key) => {
            return (
              <React.Fragment key={key + "_payNowDownPayments"}>
                <div className={el.isReceivedCashFlagErr ? "outstandingDownpayment error" : "outstandingDownpayment"}>
                  <div className="downpaymentsDetails">
                    <div className="cardImage">
                      <img src={el.payment_type === 'cash' ? cashCurrent : cardActive} />
                    </div>
                    <div className="paymentModuleInfos">
                      <span className="accNumber">{el.title}</span>
                      <span className="accinfod"><b>$ {parseFloat(el.amount).toFixed(2)}</b></span>
                    </div>

                  </div>
                  <div className="downpaymentsPayDetails">
                    <div className="payDate currentPayment">
                      <img src={payDate} alt="" /> Now
                    </div>
                  </div>
                  {el.payment_type === 'cash' ?
                    <>
                      <label className="receivedCash">
                        <div className="customCheckbox">
                          <input type="checkbox" onChange={e => toggleReceiveCash(e, key)} />
                          <span></span>
                        </div>I have received the amount by Cash
                      </label>
                      {el.isReceivedCashFlagErr ? <p className="errorMsg">Please confirm the payment has been received</p> : ""}
                    </>
                    : ''}
                </div>
              </React.Fragment>
            );
          })}


          {contractData.payNowTuitionAmount ? <div className={contractData.isReceivedDefaultCashFlagErr ? "outstandingDownpayment tutuionSubscriptions currentPayment error" : "outstandingDownpayment tutuionSubscriptions currentPayment"}>
            <div className="downpaymentsDetails">
              <div className="cardImage">
                <img src={contractData.default_transaction === 'cash' ? cashCurrent : cardActive} alt="" />
              </div>
              <div className="paymentModuleInfos">
                <span className="accNumber">Tuition Amount</span>
                <span className="accinfod"><b>$ {parseFloat(contractData.payNowTuitionAmount).toFixed(2)}</b></span>
              </div>
            </div>
            <div className="downpaymentsPayDetails">
              <div className="payDate currentPayment">
                <img src={payDate} alt="" /> {contractData.isPayNow ? 'Now' : ''}
              </div>
            </div>
            {contractData.default_transaction === 'cash' ?
              <React.Fragment>
                <label className="receivedCash">
                  <div className="customCheckbox">
                    <input type="checkbox" onChange={e => toggleDefaultReceiveCash(e)} />
                    <span></span>
                  </div>I have received the amount by Cash
                </label>
                {contractData.isReceivedDefaultCashFlagErr ? <p className="errorMsg">Please confirm the payment has been received</p> : ""}
              </React.Fragment>
              : ''}

          </div> : ''}
        </div>

        <div className="totalCartValue">
          <div className="billingAmt">
            <p>Billing Total</p>
            <h4>$ {parseFloat(contractData.nowPaymentAmount).toFixed(2)}</h4>
          </div>
          <div className="buyBtns">
            {/* <button onClick={(e)=> {paymentFailedFn()}} className="saveNnewBtn">Bill Now <img src={aaroww} alt="" /></button> */}
            <button onClick={billNow} className="saveNnewBtn">{contractData.nowPaymentAmount ? 'Bill Now' : 'Make Contract'} <img src={aaroww} alt="" /></button>

          </div>
        </div>


      </div>



      {addBankModal && (
        <div className="modalBackdrop holiday">

          <div className="slickModalBody">

            <div className="slickModalHeader">
              <button className="topCross" onClick={closeBankModal}><img src={crossTop} alt="" /></button>
              <div className="circleForIcon"><img src={payMode} alt="" /></div>
              <h3 className="courseModalHeading">Add new billling Option</h3>
              <p className="courseModalPara">Lorem Ipsum is simply dummy text of the printing</p>
            </div>

            <div className="payModalDetails">

              <div className="choosePaymentInfo" >

                <label>
                  <div className="circleRadio">
                    <input type="radio"
                      name="transactionType" defaultChecked={choosePOS && "checked"}
                      onChange={chooseTransctionTypePOS}
                    /><span></span>
                  </div> Card
                </label>
                <label>
                  <div className="circleRadio">
                    <input type="radio"
                      name="transactionType"
                      onChange={chooseTransctionTypeCourse}
                    /><span></span>
                  </div> Bank Account
                </label>
              </div>


              {choosePOS &&
                <div className="posSellingForm">

                  <div className="modalForm auto">
                    <form >
                      <div className="formControl">
                        <label>Card Number</label>
                        <input type="number" placeholder="xxxx-xxxx-xxxx-xxxx" name="" />
                      </div>

                      <div className="formControl">
                        <label>Card Holder Name</label>
                        <input type="text" placeholder="Ex. Adam Smith" name="" />
                      </div>

                      <div className="d-flex justified-space-between">
                        <div className="formControl half">
                          <label>Expiry Date</label>
                          <input type="text" placeholder="mm/yyyy" name="" />
                        </div>
                        <div className="formControl half">
                          <label>CVC</label>
                          <input type="text" name="" />
                        </div>
                      </div>
                      {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
                            { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>} */}

                      <div className="modalbtnHolder">
                        <button type="reset" className="saveNnewBtn"><img src={pluss} alt="" />Add my Card</button>
                      </div>
                    </form>
                  </div>


                </div>
              }


              {chooseCourse &&
                <div className="posSellingForm">
                  <div className="modalForm auto">
                    <form >
                      <div className="formControl">
                        <label>Account Number</label>
                        <input type="number" placeholder="xxxx-xxxx-xxxx-xxxx" name="" />
                      </div>

                      <div className="formControl">
                        <label>Account Holder Name</label>
                        <input type="text" placeholder="Ex. Adam Smith" name="" />
                      </div>

                      <div className="d-flex justified-space-between">
                        <div className="formControl half">
                          <label>Routing #</label>
                          <input type="text" name="" />
                        </div>
                        <div className="formControl half">
                          <label>Account Type</label>
                          <select className='selectBox'>
                            <option value="null">Checking</option>
                          </select>
                        </div>
                      </div>
                      {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
                            { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>} */}

                      <div className="modalbtnHolder">
                        <button type="reset" className="saveNnewBtn"><img src={pluss} alt="" />Add my Bank Account</button>
                      </div>
                    </form>
                  </div>

                </div>
              }
            </div>


          </div>
        </div>
      )}

      {paymentSuccess && <PaymentSuccessSection />}

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
              <p>{paymentFailedMessage}</p>
            </div>

            <div className="buyBtns failedPayment">
              <button onClick={closeFailedPayModal} className="saveNnewBtn">Close</button>

            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ContractOverviewTransaction;