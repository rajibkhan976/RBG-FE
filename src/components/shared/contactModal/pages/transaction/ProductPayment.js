import React, { useEffect, useState, useRef, createRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import help from "../../../../../assets/images/help.svg";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import card from "../../../../../assets/images/card.svg";
import cashCurrent from "../../../../../assets/images/cashCurrent.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import payMode from "../../../../../assets/images/paymode.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import cashSuccess from "../../../../../assets/images/cashSuccess.svg";
import paidCard from "../../../../../assets/images/paidCrad.svg";
import smallTick from "../../../../../assets/images/smallTick.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import paySuccess from "../../../../../assets/images/paySuccess.png";
import Loader from "../../../../shared/Loader";
import { BillingServices } from "../../../../../services/billing/billingServices";

const ProductPayment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [downPayments, setDownPayments] = useState([]);
  const [createdDownPayment, setCreatedDownpayment] = useState({
    isPayNow: 1
  })
  const [downPaymentActive, setDownPaymentActive] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [newPay, setNewPay] = useState("cash");
  const [newPayModal, setNewPayModal] = useState(false);
  const [productPaymentFailed, setProductPaymentFailed] = useState(false);
  const downPaymentList = useRef(null);
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalTaxAmt, setTotalTaxAmt] = useState(0);
  const [outStanding, setOutstanding] = useState({
    amount: 0,
    payment_type: "online"
  });
  const [cardBankList, setCardBankList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [payments, setPayments] = useState([])
  const downpaymentsContainer = useRef(null);
  const createDownpayAmount = useRef(null)

  const [hasError, setHasError] = useState(false)
  const [downPaymentErrorMsg, setDownPaymentErrorMsg] = useState({
    title_Err: "",
    amount_Err: "",
    payNow_Err: "",
    payMode_Err: "",
    payStatus_Err: "",
    payDate_Err: ""
  });

  const fetchCardBank = async () => {
    try {
      console.log("Fetching cards");
      setIsLoader(true);
      let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
      console.log("cardBankResponce", cardBankResponce);
      if (cardBankResponce) {
        setCardBankList(cardBankResponce.cards);
        setBankList(cardBankResponce.banks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  //   toggle pay later for down payment
  const addpayLater = (e, i) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    try {
      setIsLoader(true)
      setCreatedDownpayment({
        ...createdDownPayment,
        isPayNow: e.target.checked ? 0 : 1,
        paymentDate: e.target.checked ? today : ""
      })
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoader(false)
    }
  };

  //   delete downpayment
  const deleteNewDownPayment = (e, downpay, i) => {
    e.preventDefault();
    try {
      console.log(downpay.id, "Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  //   add pay date
  const addPayDate = (e, i) => {
    let dateSelected = e.target.value;
    
    if(e.target.value !== "") {
      try {
        setIsLoader(true)
        setCreatedDownpayment({
          ...createdDownPayment,
          paymentDate: dateSelected
        })
      } catch (error) {
        console.log(error);
      } finally{
        setIsLoader(false)
      }
    } else {
      setHasError(true)
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        payDate_Err: "Next payment cannot be empty"
      })
    }
  };

  const payDateChangeOverview = () => {
    setPayLater(!payLater);
  };

  const billPayment = (e) => {
    e.preventDefault();
    setProductPaymentFailed(true);
  };

  const openSuccessMessage = () => {
    setProductPaymentFailed(false)
    props.setSuccessProductPaymentFn(true)
  }

  const resetProductForm = (e) => {
    e.preventDefault()
    props.setSuccessProductPaymentFn(false)
    props.setProductTransactionPayment(false)
    props.chooseTransctionTypePOS()
    props.setCartState([])
  }

  useEffect(()=>{
    console.log("createdDownPayment", createdDownPayment);
  },[createdDownPayment])

  useEffect(() => {
    
  }, [downPayments, outStanding]);

  useEffect(() => {
    const getTotalCart = () => {
      if (props.cartState.length > 0) {
        const totalPlaceholder = 0;
        const totalTaxPlaceholder = 0;

        const sumAmt = props.cartState.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.price * currentValue.qnty,
          totalPlaceholder
        );
          const taxtAmt = props.cartState.reduce(
            (prevTax, currentTax)=>
            prevTax + (currentTax.tax && currentTax.price*0.1),
            totalTaxPlaceholder
          )

        setTotalAmt(parseFloat(sumAmt).toFixed(2));
        setTotalTaxAmt(parseFloat(taxtAmt).toFixed(2));
        setOutstanding({
          ...outStanding,
          amount: (parseFloat(sumAmt)+parseFloat(taxtAmt)).toFixed(2)
        })

        console.log("sumAmt", sumAmt, taxtAmt);
      } else {
        console.log("Sum now", props.cartState);
        setTotalAmt(0.00);
        setTotalTaxAmt(0.00);
      }
    };
    getTotalCart();
  }, [props.cartState, totalAmt, totalTaxAmt]);

  const checkAndSetDownPayments = (e) => {    
    if (e.target.checked) {
      setDownPaymentActive(true);
      setCreatedDownpayment({
        title: "",
        amount: outStanding.amount,
        type: "downpayment",
        isPayNow: 1,
        payment_type: "cash",
        payment_status: "unpaid"
      })
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title_Err: "Title cannot be blank"
      })
    } else {
      setDownPaymentActive(false);
      setCreatedDownpayment({
        ...downPayments,
        amount: 0,
        isPayNow: 0,
        title: ""
      })
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title_Err: ""
      })
      setDownPayments([])
    }
  };

  const addDownPayTitle = (e) => {
    if(e.target.value.trim().length > 0) {
      setCreatedDownpayment({
        ...createdDownPayment,
        title: e.target.value
      })
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title_Err: ""
      })
    }
    else {
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title_Err: "Title cannot be blank"
      })
    }
  }

  const addDownPayAmount = (e) => {
    if(e.target.value[0] == 0) {
      e.target.value = ""
    }
    if(e.target.value.trim().length > 0 && parseFloat(e.target.value) !== 0 && parseFloat(e.target.value) <= parseFloat(outStanding.amount)) {
      setCreatedDownpayment({
        ...createdDownPayment,
        amount: e.target.value
      })
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        amount_Err: ""
      })
    }
    else {
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        amount_Err: parseFloat(e.target.value) === 0 ? "Amount cannot be 0" : parseFloat(e.target.value) > parseFloat(outStanding.amount) ? "Amount cannot be more than outstanding amount" : "Amount cannot be nothing"
      })
    }    
  }

  const changePaymentType = (e) => {
    setCreatedDownpayment({
      ...createdDownPayment,
      payment_type: e.target.value,
    })
  }

  const changePaymentStatus = (e) => {
    setCreatedDownpayment({
      ...createdDownPayment,
      payment_status: e.target.value,
    })
  }

  //   add more down payment
  const addNewDownPayment = (e, i) => {
    e.preventDefault();
    console.log(hasError&&"HAS ERROR");
    if(!hasError) {
      setIsLoader(true);
      console.log(downPaymentErrorMsg, createdDownPayment)

      try {
        setOutstanding({
          ...outStanding,
          amount: parseFloat(outStanding.amount) - createdDownPayment.amount
        })
        setDownPayments(prevDownpayments => [...prevDownpayments, createdDownPayment])
      } catch (err) {
        console.log(err);
        setHasError(true);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          server_Err: err.message
        })
      } finally {
        setHasError(true);
        setDownPaymentErrorMsg({
          title_Err: "",
          amount_Err: "",
          payNow_Err: "",
          payMode_Err: "",
          payStatus_Err: "",
        })
        createDownpayAmount.current.value = outStanding.amount !== 0 ? (parseFloat(outStanding.amount) - createdDownPayment.amount).toFixed(2) : 0
        setCreatedDownpayment({
          title: "",
          amount: outStanding.amount !== 0 ? (parseFloat(outStanding.amount) - createdDownPayment.amount).toFixed(2) : 0,
          type: "downpayment",
          isPayNow: 1,
          payment_type: "cash",
          payment_status: "unpaid"
        })
        setIsLoader(false);
      }
    }
  };

  useEffect(()=>{
    fetchCardBank();
  },[])

  return (
    <>
      {isLoader && <Loader />}
      {!props.successProductPayment && 
        <form className="productPaymentTransaction">
          <div className="gridCol">
            <div className="cartProductInner productDownPayment">
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>
                  Down Payment{" "}
                  <span className="cartCount">
                    {downPayments.length > 0 ? downPayments.length : 0}
                  </span>
                </h5>

                <label
                  className={downPaymentActive ? "toggleBtn active" : "toggleBtn"}
                >
                  <input
                    type="checkbox"
                    name="down-payment-active"
                    onChange={(e) => checkAndSetDownPayments(e)}
                  />
                  <span className="toggler"></span>
                </label>
              </header>
              {downPaymentActive && (
                <div className="bodytransactionForm" ref={downPaymentList}>
                {outStanding.amount !== 0 && <div className="newDownpayment">
                      <button
                        className="addNewDownpayment"
                        onClick={(e)=>addNewDownPayment(e)}
                        disabled={hasError === true || outStanding.amount === 0}
                      >
                        + Add
                      </button>
                    <div className="transaction_form products forDownpayment">
                      <div className={downPaymentErrorMsg.title_Err !== "" ? "cmnFormRow gap error" : "cmnFormRow gap"}>
                        <label className="labelWithInfo">
                          <span className="labelHeading">Title</span>
                          <span className="infoSpan">
                            <img src={info_icon} alt="" />
                            <span className="tooltiptextInfo">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </span>
                          </span>
                        </label>
                        <div className="cmnFormField">
                          <input
                            className="cmnFieldStyle"
                            onChange={(e)=>addDownPayTitle(e)}
                            defaultValue={createdDownPayment.title}
                          />
                        </div>
                        {downPaymentErrorMsg.title_Err && <p className="errorMsg">{downPaymentErrorMsg.title_Err}</p>}
                      </div>
                      <div className="cmnFormRow gap">
                        <div className={downPaymentErrorMsg.amount_Err !== "" ? "leftSecTransaction error" : "leftSecTransaction"} style={{fontSize: 0}}>
                          <label className="labelWithInfo">
                            <span className="labelHeading">Amount</span>
                            <span className="infoSpan">
                              <img src={info_icon} alt="" />
                              <span className="tooltiptextInfo amount">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                              </span>
                            </span>
                          </label>
                          <div className="cmnFormField preField">
                            <div className="unitAmount">$</div>
                            <input
                              type="number"
                              placeholder="149"
                              className="editableInput numberType cmnFieldStyle"
                              onChange={(e)=>addDownPayAmount(e)}
                              defaultValue={outStanding.amount}
                              ref={createDownpayAmount}
                            />
                          </div>
                        {downPaymentErrorMsg.amount_Err && <p className="errorMsg">{downPaymentErrorMsg.amount_Err}</p>}
                        </div>
                        <div className={downPaymentErrorMsg.payDate_Err !== "" ? "rightSecTransaction error" : "rightSecTransaction"}>
                          <label className="labelWithInfo paymentTime">
                            <span className="labelHeading">
                              I want to Pay Later
                            </span>
                            <label className={
                              createdDownPayment.isPayNow === 1 ? "toggleBtn" : "toggleBtn active"}
                            >
                              <input
                                type="checkbox"
                                name="check-communication"
                                onChange={(e) => addpayLater(e)}
                                defaultChecked={createdDownPayment.isPayNow === 1 ? false : true}
                              />
                              <span className="toggler"></span>
                            </label>
                          </label>
                          {createdDownPayment.isPayNow === 1 && (
                            <div className="paymentNow display">
                              <p>
                                Payment date <span>Now</span>
                              </p>
                            </div>
                          )}
                          {createdDownPayment.isPayNow === 0 && (
                            <div className="paymentNow">
                              <input
                                type="date"
                                placeholder="mm/dd/yyyy"
                                className="cmnFieldStyle"
                                onChange={(e) => addPayDate(e)}
                                defaultValue={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                          )}
                          {downPaymentErrorMsg.payDate_Err && <p className="errorMsg">{downPaymentErrorMsg.payDate_Err}</p>}
                        </div>
                      </div>
                      <div className="cmnFormRow gap">
                        <div className="leftSecTransaction">
                          <label className="labelWithInfo">
                            <span className="labelHeading">Payment Mode</span>
                            <span className="infoSpan">
                              <img src={info_icon} alt="" />
                              <span className="tooltiptextInfo paymentType">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                              </span>
                            </span>
                          </label>
                          <div className="cmnFormField">
                            <select
                              className="selectBox"
                              defaultValue={createdDownPayment.payment_type}
                              onChange={(e)=>changePaymentType(e)}
                            >
                              <option value="cash">Cash</option>
                              <option value="online">Online</option>
                            </select>
                          </div>
                        </div>
                        <div className="rightSecTransaction">
                          <label className="labelWithInfo">
                            <span className="labelHeading">
                              Payment Status
                            </span>
                            <span className="infoSpan">
                              <img src={info_icon} alt="" />
                              <span className="tooltiptextInfo paymentStatus">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                              </span>
                            </span>
                          </label>
                          <select
                            className="selectBox"
                            onChange={(e)=>changePaymentStatus(e)}
                            defaultValue={createdDownPayment.payment_status}
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>}
                  {(downPayments &&
                      downPayments.length > 0) && 
                      <div className="downPaymentsCreated" ref={downpaymentsContainer}>
                    {downPayments.map((downpay, i) => (
                        <div className="newDownpayment" key={"dp" + i} id={`dp-${downPayments.length}`}>
                          <button
                            className="delNewDownpayment"
                            onClick={(e) => deleteNewDownPayment(e, downpay, i)}
                          >
                            <img src={deleteBtn} alt="delete" /> Remove
                          </button>
                          <div className="transaction_form products forDownpayment">
                            <div className="cmnFormRow gap">
                              <label className="labelWithInfo">
                                <span className="labelHeading">Title</span>
                                <span className="infoSpan">
                                  <img src={info_icon} alt="" />
                                  <span className="tooltiptextInfo">
                                    Lorem Ipsum is simply dummy text of the printing
                                    and typesetting industry.
                                  </span>
                                </span>
                              </label>
                              <div className="cmnFormField">
                                <input
                                  className="cmnFieldStyle"
                                  defaultValue={downpay.title}
                                />
                              </div>
                            </div>
                            <div className="cmnFormRow gap">
                              <div className="leftSecTransaction">
                                <label className="labelWithInfo">
                                  <span className="labelHeading">Amount</span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo amount">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </span>
                                  </span>
                                </label>
                                <div className="cmnFormField preField">
                                  <div className="unitAmount">$</div>
                                  <input
                                    type="number"
                                    placeholder="149"
                                    className="editableInput numberType cmnFieldStyle"
                                    defaultValue={downpay.amount}
                                  />
                                </div>
                              </div>
                              <div className="rightSecTransaction">
                                <label className="labelWithInfo paymentTime">
                                  <span className="labelHeading">
                                    I want to Pay Later
                                  </span>
                                  <label
                                    className={
                                      downpay.isPayNow === 1
                                        ? "toggleBtn"
                                        : "toggleBtn active"
                                    }
                                  >
                                    <input
                                      type="checkbox"
                                      name="check-communication"
                                      defaultValue={downpay.isPayNow === 0 ? true : false}
                                    />
                                    <span className="toggler"></span>
                                  </label>
                                </label>
                                {downpay.isPayNow === 1 && (
                                  <div className="paymentNow display">
                                    <p>
                                      Payment date <span>Now</span>
                                    </p>
                                  </div>
                                )}
                                {downpay.isPayNow === 0 && (
                                  <div className="paymentNow">
                                    <input
                                      type="date"
                                      placeholder="mm/dd/yyyy"
                                      className="cmnFieldStyle"
                                      defaultValue={downpay.paymentDate}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="cmnFormRow gap">
                              <div className="leftSecTransaction">
                                <label className="labelWithInfo">
                                  <span className="labelHeading">Payment Mode</span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo paymentType">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </span>
                                  </span>
                                </label>
                                <div className="cmnFormField">
                                  <select
                                    className="selectBox"
                                    defaultValue={downpay.payMode}
                                  >
                                    <option value="cash">Cash</option>
                                    <option value="online">Online</option>
                                  </select>
                                </div>
                              </div>
                              <div className="rightSecTransaction">
                                <label className="labelWithInfo">
                                  <span className="labelHeading">
                                    Payment Status
                                  </span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo paymentStatus">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </span>
                                  </span>
                                </label>
                                <select
                                  className="selectBox"
                                  defaultValue={downpay.payStatus}
                                >
                                  <option value="Unpaid">Unpaid</option>
                                  <option value="Paid">Paid</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>}
                </div>
              )}
            </div>
            <div className="cartProductInner productBillingOverview">
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>Billing Overview</h5>

                <button
                  className="btn addPaymentInfo"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewPayModal(true);
                  }}
                >
                  + Add
                </button>
              </header>

              <div className="bodytransactionForm bodyProductPayModes">
                <p className="paymentTypes">Cards</p>
                <div className="chooseTransactionType paymentTypes">
                  {/* {console.log("cardBankList", cardBankList)} */}
                { cardBankList && cardBankList.length > 0 && cardBankList.map((cardItem, i)=> 
                  <label className={cardItem.status === "active" ? "paymentType active" : "paymentType"} key={i}> {/*active*/}
                    <span className="circleRadio">
                      <input
                        type="radio"
                        name="billingTransaction"
                        defaultChecked={cardItem.status === "active"}
                      />
                      <span></span>
                    </span>
                    <span className="cardImage">
                      <img src={cardActive} alt="card" />
                    </span>
                    <span className="paymentModuleInfos">
                      <span className="accNumber">
                        Credit Card ending with <strong>{cardItem.last4}</strong>
                      </span>
                      <span className="accinfod">Expires {cardItem.expiration_month}/{cardItem.expiration_year}</span>
                    </span>
                  </label>
                )}
                </div>

                <p className="paymentTypes">Bank</p>

                  <div className="chooseTransactionType paymentTypes">
                  {/* {console.log("bankList", bankList)} */}
                    { bankList && bankList.length > 0 && bankList.map((bankItem, i)=> 
                      <label className="paymentType">
                        <span className="circleRadio">
                          <input type="radio" name="billingTransaction" />
                          <span></span>
                        </span>
                        <span className="cardImage">
                          <img src={card} alt="card" />
                        </span>
                        <span className="paymentModuleInfos">
                          <span className="accNumber">
                            Bank account ending with <strong>{bankItem.last4}</strong>
                          </span>
                          <span className="accinfod">Routing Number {bankItem.routing_number}</span>
                        </span>
                      </label>
                    )}
                  </div>
              </div>
            </div>
          </div>
          <div className="gridCol">
            <div className="cartProductInner payOverviewProduct">
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>Payment Overview</h5>
              </header>
              <div className="bodytransactionForm">
                <ul className="programInfosUl paymentOverviews">
                  <li>
                    <div className="labelSpan">Total item Price</div>
                    <div className="informationSpan">$ {totalAmt}</div>
                  </li>
                  <li>
                    <div className="labelSpan">Tax</div>
                    <div className="informationSpan">$ {totalTaxAmt}</div>
                  </li>
                </ul>
                <ul className="totalPaymentUl">
                  <li>Total</li>
                  <li>$ {(parseFloat(totalAmt) + parseFloat(totalTaxAmt)).toFixed(2)}</li>
                </ul>
              </div>
            </div>

            <div className="dottedBorder"></div>

            {outStanding.amount !== 0 && <div className="cartProductInner outStandingProduct "> {/**outstandingOverviewProduct */}
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>Outstanding</h5>
                <h3>$ {parseFloat(outStanding.amount).toFixed(2)}</h3>
              </header>
              <div className="bodytransactionForm">
                <div className="cmnFormRow">
                  <div className="cmnFormCol">
                    <label className="labelWithInfo">
                      <span>Payment Mode</span>
                      <span className="infoSpan">
                        <img src={help} alt="Help" />
                        <span className="tooltiptextInfo">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </span>
                      </span>
                    </label>
                    <div className="cmnFormField">
                      <select className="selectBox cmnFieldStyle">
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                  </div>
                  <div className="cmnFormCol">
                    <label className="labelWithInfo paymentTime">
                      <span className="labelHeading">I want to Pay Later</span>
                      <label
                        className={payLater ? "toggleBtn active" : "toggleBtn"}
                      >
                        <input
                          type="checkbox"
                          name="check-communication"
                          defaultValue={false}
                          onChange={payDateChangeOverview}
                        />
                        <span className="toggler"></span>
                      </label>
                    </label>
                    {!payLater && (
                      <div className="paymentNow display">
                        <p>
                          Payment date <span>Now</span>
                        </p>
                      </div>
                    )}
                    {payLater && (
                      <div className="paymentNow">
                        <input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          className="cmnFieldStyle"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>}

            {downPayments.length > 0 && <div className="currentPaymentOverview cartProductInner">
                <div className="outstandingDownpayment">
                  <div className="downpaymentsDetails">
                    <div className="cardImage">
                      <img src={cashCurrent} alt="" />
                    </div>
                    <div className="paymentModuleInfos">
                      <span className="accNumber">{downPayments[0].title}</span>
                      <span className="accinfod">
                        <b>$ {downPayments[0].amount}</b>
                      </span>
                    </div>
                  </div>
                  <div className="downpaymentsPayDetails">
                    <div className="payDate currentPayment">
                      <img src={payDate} alt="" /> {downPayments[0].isPayNow === 1 ? "Now" : downPayments[0].paymentDate}
                    </div>
                  </div>
                  <label className="receivedCash">
                    <div className="customCheckbox">
                      <input type="checkbox" name="" id="" />
                      <span></span>
                    </div>
                    I have received the amount by Cash
                  </label>
                </div>
            </div>}

            <div className="totalCartValue cartProductInner f-row">
              <div className="billingAmt">
                <p>Billing Total</p>
                {/* downPayments[0] */}
                <h4>$ {downPayments.length > 0 ? downPayments[0].amount : (parseFloat(totalAmt)+parseFloat(totalTaxAmt)).toFixed(2)}</h4>
              </div>
              <div className="buyBtns">
                <button className="saveNnewBtn" onClick={(e) => billPayment(e)}>
                  Bill Now <img src={aaroww} alt="" />
                </button>
              </div>
            </div>
          </div>
        </form>
      }

      {productPaymentFailed && (
        <div className="modalBackdrop modalProductStatus">
          <div className="slickModalBody paymentFailed">
            <div className="slickModalHeader">
              <div className="circleForIcon">
                <img src={paymentFail} alt="" />
              </div>
              <h3 className="courseModalHeading">Payment Failed !</h3>
            </div>

            <div className="payModalDetails">
              <img src={cardFail} alt="" />
              <p>
                Payment Failed. We arn’t able to Process your Payment, Pease try
                again !
              </p>
            </div>

            <div className="buyBtns failedPayment">
              <button
                onClick={() => openSuccessMessage()}
                className="saveNnewBtn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {props.successProductPayment && (
        <>
          <div className="posSellingForm contractOverview">
            <div className="successHeader">
              <div className="circleForIcon">
                <img src={paySuccess} alt="" />
              </div>
              <h3 className="paySuccessHeading">Payment Successful ! </h3>
            </div>
            <div className="dottedBorder"></div>

            <ul className="paymentUlHeader">
              <li className="paymentModeHeaderLi">Payment Mode</li>
              <li className="paymentIdHeaderLi">Transaction ID</li>
              <li className="paymentAmtHeaderLi">Amount</li>
            </ul>

            <ul className="paymentUlInfo">
              <li className="paymentModeLi">
                <img src={cashSuccess} alt="" />
                <p>Cash</p>
              </li>
              <li className="paymentIdLi">
                <p>dfg41456df1567sdtfg45a</p>
              </li>
              <li className="paymentAmtLi">
                <p>$ 200.00</p>
                <img src={smallTick} alt="" />
              </li>
            </ul>

            <ul className="paymentUlInfo">
              <li className="paymentModeLi">
                <img src={paidCard} alt="" />
                <p>Card</p>
              </li>
              <li className="paymentIdLi">
                <p>dfg41456df1567sdtfg45a</p>
              </li>
              <li className="paymentAmtLi">
                <p>$ 420.00</p>
                <img src={smallTick} alt="" />
              </li>
            </ul>

            <ul className="totalPaymentUl">
              <li>
                <p>Amount Paid</p>
              </li>
              <li>
                <p>$ 620.00</p>
              </li>
            </ul>

            <div className="dottedBorder"></div>

            <div className="successPageBtn">
              <button 
                className="saveNnewBtn"
                onClick={(e) => {
                    resetProductForm(e)
                    props.backToTransList()
                  }
                }
              >
                Go to Transaction List <img src={aaroww} alt="" />
              </button>
            </div>
          </div>
        </>
      )}

      {newPayModal && (
        <div className="modalBackdrop modalNewPay">
          <div className="slickModalBody">
            <div className="slickModalHeader">
              <button
                className="topCross"
                onClick={(e) => {
                  e.preventDefault();
                  setNewPayModal(false);
                }}
              >
                <img src={crossTop} alt="" />
              </button>
              <div className="circleForIcon">
                <img src={payMode} alt="" />
              </div>
              <h3 className="courseModalHeading">Add new billling Option</h3>
              <p className="courseModalPara">
                Lorem Ipsum is simply dummy text of the printing
              </p>
            </div>

            <div className="payModalDetails">
              <div className="choosePaymentInfo">
                <label>
                  <div className="circleRadio">
                    <input
                      type="radio"
                      name="transactionType"
                      defaultChecked={newPay === "card"}
                      onChange={(e) => setNewPay("card")}
                    />
                    <span></span>
                  </div>{" "}
                  Card
                </label>
                <label>
                  <div className="circleRadio">
                    <input
                      type="radio"
                      name="transactionType"
                      defaultChecked={newPay === "bank"}
                      onChange={(e) => setNewPay("bank")}
                    />
                    <span></span>
                  </div>{" "}
                  Bank Account
                </label>
              </div>

              {newPay === "card" && (
                <div className="posSellingForm">
                  <div className="modalForm">
                    <form>
                      <div className="cmnFormRow">
                        <label>Card Number</label>
                        <div className="cmnFormField">
                          <input
                            className="cmnFieldStyle"
                            type="number"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            name=""
                          />
                        </div>
                      </div>

                      <div className="cmnFormRow">
                        <label>Card Holder Name</label>
                        <div className="cmnFormField">
                          <input
                            type="text"
                            placeholder="Ex. Adam Smith"
                            className="cmnFieldStyle"
                            name=""
                          />
                        </div>
                      </div>

                      <div className="cmnFormRow">
                        <div className="cmnFormCol">
                          <label>Expiry Date</label>
                          <div className="cmnFormField">
                            <input
                              type="text"
                              placeholder="mm/yy"
                              name=""
                              className="cmnFieldStyle"
                            />
                          </div>
                        </div>
                        <div className="cmnFormCol">
                          <label>CVC</label>
                          <div className="cmnFormField">
                            <input
                              type="text"
                              name=""
                              className="cmnFieldStyle"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="modalbtnHolder">
                        <button type="reset" className="saveNnewBtn orangeBtn">
                          <img src={pluss} alt="" /> Add my Card
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {newPay === "bank" && (
                <div className="posSellingForm">
                  <div className="modalForm">
                    <form>
                      <div className="cmnFormRow">
                        <label>Account Number</label>
                        <div className="cmnFormField">
                          <input
                            type="number"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            className="cmnFieldStyle"
                            name=""
                          />
                        </div>
                      </div>

                      <div className="cmnFormRow">
                        <label>Account Holder Name</label>
                        <div className="cmnFormField">
                          <input
                            type="text"
                            placeholder="Ex. Adam Smith"
                            className="cmnFieldStyle"
                            name=""
                          />
                        </div>
                      </div>

                      <div className="cmnFormRow">
                        <div className="cmnFormCol">
                          <label>Routing #</label>
                          <div className="cmnFormField">
                            <input
                              type="text"
                              className="cmnFieldStyle"
                              name=""
                            />
                          </div>
                        </div>
                        <div className="cmnFormCol">
                          <label>Account Type</label>
                          <div className="cmnFormField">
                            <select className="cmnFieldStyle selectBox">
                              <option value="null">Checking</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="modalbtnHolder">
                        <button
                          type="reset"
                          className="saveNnewBtn orangeBtn"
                          onClick={(e) => {
                            e.preventDefault();
                            setNewPayModal(true);
                          }}
                        >
                          <img src={pluss} alt="" />
                          Add my Bank Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPayment;
