import React, { useEffect, useState } from "react";
import card from "../../../../../assets/images/card.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
// import crossTop from "../../../../../assets/images/cross.svg";
// import payMode from "../../../../../assets/images/paymode.svg";
// import pluss from "../../../../../assets/images/pluss.svg";
import Loader from "../../../Loader";

import { BillingServices } from "../../../../../services/billing/billingServices";

const BillingOverview = (props) => {
//   const [newPayModal, setNewPayModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const fetchCardBank = async () => {
    let cardBanksList;

    try {
      setIsLoader(true);
      let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
          cardBanksList = cardBankResponce;

          console.log("cardBankResponce", cardBankResponce);

      if (cardBankResponce) {
        props.setCardBankList(cardBankResponce.cards);
        props.setBankList(cardBankResponce.banks);
        props.setNewPay({
          ...props.newPay,
          type: cardBankResponce.primary
        })
        props.setNewPayMethod(cardBankResponce.primary)
        console.log("cardBankResponce", cardBankResponce);
      }
    } catch (error) {
      //  //  console.log(error);
    } finally {
      console.log("cardBankList", cardBanksList && cardBanksList);
    
      props.setNewPay({
        ...props.newPay,
        billingId: cardBanksList && cardBanksList.primary === "card" ? cardBanksList.cards[0]._id : cardBanksList.banks[0]._id
      })

      setIsLoader(false);
    }
  };

  useEffect(()=>{
      fetchCardBank()
      console.log(":::::::INSIDE BILLING OVERVIEW:::::::");
  },[])


  return (
    <>
      <div className="cartProductInner productBillingOverview">
        <header className="informHeader d-flex f-align-center f-justify-between">
          <h5>Billing Overview</h5>

          {/* <button
            className="btn addPaymentInfo"
            onClick={(e) => {
              e.preventDefault();
              setNewPayModal(true);
            }}
          >
            + Add
          </button> */}
        </header>

        <div className="bodytransactionForm bodyProductPayModes">
        {isLoader && <Loader/>}
          <p className="paymentTypes">Cards</p>
          <div className="chooseTransactionType paymentTypes">
            {props.cardBankList &&
              props.cardBankList.length > 0 &&
              props.cardBankList.map((cardItem, i) => (
                <label
                  className={
                    props.newPay.type === "card" && props.newPay.billingId === cardItem._id
                      ? "paymentType active"
                      : "paymentType"
                  }
                  key={i}
                >
                  <span className="circleRadio">
                    <input
                      type="radio"
                      name="billingTransaction"
                      onChange={() => props.changeDefaultPay(cardItem, "card")}
                      checked={
                        props.newPay.type === "card" &&
                        props.newPay.billingId === cardItem._id
                      }
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
                    <span className="accinfod">
                      Expires {cardItem.expiration_month}/
                      {cardItem.expiration_year}
                    </span>
                  </span>
                </label>
              ))}
          </div>

          <p className="paymentTypes">Bank</p>

          <div className="chooseTransactionType paymentTypes">
            {/* {//  //  console.log("bankList", bankList)} */}
            {props.bankList &&
              props.bankList.length > 0 &&
              props.bankList.map((bankItem, i) => (
                <label
                  className={
                    props.newPay === "bank" && props.newPay.billingId === bankItem._id
                      ? "paymentType active"
                      : "paymentType"
                  }
                  key={i}
                >
                  <span className="circleRadio">
                    <input
                      type="radio"
                      name="billingTransaction"
                      onChange={(e) => props.changeDefaultPay(bankItem, "bank")}
                      checked={
                        props.newPay.type === "bank" &&
                        props.newPay.billingId === bankItem._id
                      }
                    />
                    {console.log(
                      ":::BANK:::",
                      props.newPay === "bank" && props.newPay.billingId === bankItem._id
                    )}
                    <span></span>
                  </span>
                  <span className="cardImage">
                    <img src={card} alt="card" />
                  </span>
                  <span className="paymentModuleInfos">
                    <span className="accNumber">
                      Bank account ending with <strong>{bankItem.last4}</strong>
                    </span>
                    <span className="accinfod">
                      Routing Number {bankItem.routing_number}
                    </span>
                  </span>
                </label>
              ))}
          </div>
        </div>
      </div>

      {/* {newPayModal && (
        <div className="modalBackdrop modalNewPay">
          {console.log("NEW PAY METHOD:::", props.newPay.type)}
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
                      defaultChecked={props.newPayMethod === "card"}
                      onChange={(e) => props.setNewPayMethod("card")}
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
                      defaultChecked={props.newPayMethod === "bank"}
                      onChange={(e) => props.setNewPayMethod("bank")}
                    />
                    <span></span>
                  </div>{" "}
                  Bank Account
                </label>
              </div>

              {props.newPayMethod === "card" && (
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
                          <label>CVV</label>
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

              {props.newPayMethod === "bank" && (
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
      )} */}
    </>
  );
};

export default BillingOverview;
