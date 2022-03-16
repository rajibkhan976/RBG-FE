import React, { useEffect, useRef, useState } from "react";
import card from "../../../../../assets/images/card.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
// import crossTop from "../../../../../assets/images/cross.svg";
// import payMode from "../../../../../assets/images/paymode.svg";
// import pluss from "../../../../../assets/images/pluss.svg";
import Loader from "../../../Loader";

import { BillingServices } from "../../../../../services/billing/billingServices";

const BillingOverview = (props) => {
//   const [newPayModal, setNewPayModal] = useState(false);
  const [cardBankList, setCardBankList] = useState([])
  const [bankList, setBankList] = useState([])
  const [isLoader, setIsLoader] = useState(false);
  const payModes = useRef(null)

  const fetchCardBank = async () => {
    let cardBanksList;

    try {
      setIsLoader(true);
      let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
          cardBanksList = cardBankResponce;

      if (cardBankResponce) {
        setCardBankList(cardBankResponce.cards);
        setBankList(cardBankResponce.banks);
        props.setNewPay({
          ...props.newPay,
          type: cardBankResponce.primary,
          billingId: cardBankResponce.primary === "card" ? cardBanksList.cards.filter((cards, i)=>cards.status === "active")[0]._id : cardBanksList.banks.filter((banks,i)=>banks.status === "active")[0]._id
        })
        props.setNewPayMethod(cardBankResponce.primary)
        console.log("cardBankResponce.primary", cardBankResponce.primary, cardBankResponce.banks);
      }
    } catch (error) {
      //  //  console.log(error);
    } finally {
      console.log("cardBankList", cardBanksList && cardBanksList);

      setIsLoader(false);
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      payModes.current.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }, 100);
  }

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

        <div className="bodytransactionForm bodyProductPayModes d-flex f-column" ref={payModes}>
        {isLoader && <Loader/>}
          <p className="paymentTypes" style={{
            order: props.newPay.type === "card" ? "1" : "3"
          }}>Cards</p>
          <div className="chooseTransactionType paymentTypes" style={{
            order: props.newPay.type === "card" ? "2" : "4"
          }}>

            {cardBankList &&
              cardBankList.length > 0 &&
              cardBankList.map((cardItem, i) => (
                <label
                  className={
                    props.newPay.type === "card" && props.newPay.billingId === cardItem._id
                      ? "paymentType active"
                      : "paymentType"
                  }
                  key={i}
                  style={{
                    order: (props.newPay.type === "card" && props.newPay.billingId === cardItem._id) ? 1 : 2,
                    marginTop: (props.newPay.type === "card" && props.newPay.billingId === cardItem._id) ? "0" : "10px"
                  }}
                >
                  {/* {console.log(":::setNewPay::::", props.newPay)} */}
                  <span className="circleRadio">
                    <input
                      type="radio"
                      name="billingTransaction"
                      onChange={() => {
                          props.changeDefaultPay(cardItem, "card")
                          scrollToTop()
                        }
                      }
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
          
          <p className="paymentTypes" style={{
            order: props.newPay.type === "bank" ? "1" : "3"
          }}>Bank</p>

          <div className="chooseTransactionType paymentTypes" style={{
            order: props.newPay.type === "bank" ? "2" : "4"
          }}>
            {/* {//  //  console.log("bankList", bankList)} */}
            {bankList &&
              bankList.length > 0 &&
              bankList.map((bankItem, i) => (
                <label
                  className={
                    props.newPay === "bank" && props.newPay.billingId === bankItem._id
                      ? "paymentType active"
                      : "paymentType"
                  }
                  key={i}
                  style={{
                    order: (props.newPay.type === "bank" && props.newPay.billingId === bankItem._id) ? 1 : 2,
                    marginTop: (props.newPay.type === "bank" && props.newPay.billingId === bankItem._id) ? "0" : "10px"
                  }}
                >
                  <span className="circleRadio">
                    <input
                      type="radio"
                      name="billingTransaction"
                      onChange={(e) => {
                          props.changeDefaultPay(bankItem, "bank")
                          scrollToTop()
                        }
                      }
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
