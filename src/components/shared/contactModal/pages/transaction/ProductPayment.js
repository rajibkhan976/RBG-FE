import React, { useEffect, useState, useRef, createRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import help from "../../../../../assets/images/help.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/no_downpayment.svg";
import modalTopIcon from "../../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import profileAvatar from "../../../../../assets/images/camera.svg";
import chooseImg from "../../../../../assets/images/chooseImg.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
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
import { Scrollbars } from "react-custom-scrollbars-2";

const ProductPayment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [downPayments, setDownPayments] = useState([]);
  const [downPaymentActive, setDownPaymentActive] = useState(false);
  const [tempDownPayObj, setTempDownPayObj] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [payLater, setPayLater] = useState(false);
  const [newPay, setNewPay] = useState("card");
  const [newPayModal, setNewPayModal] = useState(false);
  const [productPaymentFailed, setProductPaymentFailed] = useState(false);
  const newDownPaymentAdd = useRef(null);
  const downPaymentList = useRef(null);

  const checkAndSetDownPayments = (e) => {
    if (e.target.checked && downPayments.length === 0) {
      setDownPaymentActive(true);
      setDownPayments([
        ...downPayments,
        {
          id: "dp-" + downPayments.length,
          status: "inactive",
          title: "",
          amount: "",
          paylater: false,
          payDate: null,
          payMode: "Cash",
          payStatus: "Unpaid",
        },
      ]);
    } else {
      setDownPaymentActive(false);
      setDownPayments([]);
    }
  };

  //   toggle pay later for down payment
  const addpayLater = (e, i) => {
    let downPaymentsPlaceholder = [...downPayments];
    downPaymentsPlaceholder[i].paylater = e.target.checked ? true : false;
    console.log("downPaymentsPlaceholder", downPaymentsPlaceholder);

    try {
      setDownPayments(downPaymentsPlaceholder);
      console.log(
        "downPaymentsPlaceholder",
        "changed",
        downPaymentsPlaceholder
      );
    } catch (error) {
      console.log(error);
    }
  };

  //   add more down payment
  const addNewDownPayment = (e, i) => {
    e.preventDefault();
    console.log(downPayments);

    try {
      setDownPayments([
        ...downPayments,
        {
          id: "dp-" + downPayments.length,
          status: "inactive",
          title: "",
          amount: "",
          paylater: false,
          payDate: null,
          payMode: "cash",
          payStatus: "Unpaid",
        },
      ]);
    } catch (err) {
      console.log(err);
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
    let downPaymentsPlaceholder = [...downPayments];

    try {
      downPaymentsPlaceholder[i].payDate =
        downPaymentsPlaceholder[i].paylater && dateSelected
          ? dateSelected
          : null;
      setDownPayments(downPaymentsPlaceholder);
    } catch (error) {
      console.log(error);
    }
  };

  const payDateChangeOverview = () => {
    console.log("hi");
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

  useEffect(() => {
    if (downPayments.length > 0) {
      let downPaymentsPlaceholder = downPayments;
      downPaymentsPlaceholder.forEach((dp, i) => {
        if (i !== downPaymentsPlaceholder.length) {
          dp.status = "active";
        }
      });
    }
  }, [downPayments]);

  return (
    <>
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
                  {downPayments &&
                    downPayments.length > 0 &&
                    downPayments.map((downpay, i) => (
                      <div className="newDownpayment" key={"dp" + i}>
                        {downpay.status === "inactive" ? (
                          <button
                            className="addNewDownpayment"
                            onClick={(e) => addNewDownPayment(e, i)}
                          >
                            + Add
                          </button>
                        ) : (
                          <button
                            className="delNewDownpayment"
                            onClick={(e) => deleteNewDownPayment(e, downpay, i)}
                          >
                            <img src={deleteBtn} alt="delete" /> Remove
                          </button>
                        )}
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
                                    downpay.paylater
                                      ? "toggleBtn active"
                                      : "toggleBtn"
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    name="check-communication"
                                    onChange={(e) => addpayLater(e, i)}
                                    defaultValue={false}
                                  />
                                  <span className="toggler"></span>
                                </label>
                              </label>
                              {!downpay.paylater && (
                                <div className="paymentNow display">
                                  <p>
                                    Payment date <span>Now</span>
                                  </p>
                                </div>
                              )}
                              {downpay.paylater && (
                                <div className="paymentNow">
                                  <input
                                    type="date"
                                    placeholder="mm/dd/yyyy"
                                    className="cmnFieldStyle"
                                    onChange={(e) => addPayDate(e, i)}
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
                                  <option value="Cash">Card</option>
                                  <option value="Card">Cash</option>
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

              <div className="bodytransactionForm">
                <p className="paymentTypes">Cards</p>
                <div className="chooseTransactionType paymentTypes">
                  <label className="paymentType active">
                    <span className="circleRadio">
                      <input
                        type="radio"
                        name="billingTransaction"
                        defaultChecked
                      />
                      <span></span>
                    </span>
                    <span className="cardImage">
                      <img src={cardActive} alt="card" />
                    </span>
                    <span className="paymentModuleInfos">
                      <span className="accNumber">
                        Credit Card ending with <strong>1234</strong>
                      </span>
                      <span className="accinfod">Expires 07 / 25</span>
                    </span>
                  </label>
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
                        Credit Card ending with <strong>1234</strong>
                      </span>
                      <span className="accinfod">Expires 07 / 25</span>
                    </span>
                  </label>
                </div>

                <p className="paymentTypes">Bank</p>
                <div className="chooseTransactionType paymentTypes">
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
                        Bank account ending with <strong>1234</strong>
                      </span>
                      <span className="accinfod">Routing Number 10000100</span>
                    </span>
                  </label>
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
                        Bank account ending with <strong>1234</strong>
                      </span>
                      <span className="accinfod">Routing Number 10000100</span>
                    </span>
                  </label>
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
                    <div className="informationSpan">$600.00</div>
                  </li>
                  <li>
                    <div className="labelSpan">Tax</div>
                    <div className="informationSpan">$20.00</div>
                  </li>
                </ul>
                <ul className="totalPaymentUl">
                  <li>Total</li>
                  <li>$2287.00</li>
                </ul>
              </div>
            </div>
            <div className="cartProductInner outstandingOverviewProduct">
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>Outstanding</h5>
                <h3>$ 420.00</h3>
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
            </div>

            <div className="currentPaymentOverview cartProductInner">
              <div className="outstandingDownpayment">
                <div className="downpaymentsDetails">
                  <div className="cardImage">
                    <img src={cashCurrent} alt="" />
                  </div>
                  <div className="paymentModuleInfos">
                    <span className="accNumber">Down Payment 1</span>
                    <span className="accinfod">
                      <b>$ 299.00</b>
                    </span>
                  </div>
                </div>
                <div className="downpaymentsPayDetails">
                  <div className="payDate currentPayment">
                    <img src={payDate} alt="" /> Now
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
            </div>

            <div className="totalCartValue cartProductInner f-row">
              <div className="billingAmt">
                <p>Billing Total</p>
                <h4>$ 349.00</h4>
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
              <button
                className="topCross"
                onClick={() => setProductPaymentFailed(false)}
              >
                <img src={crossTop} alt="" />
              </button>
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
                      {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
                { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>} */}

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
                      {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
                        { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>} */}

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
