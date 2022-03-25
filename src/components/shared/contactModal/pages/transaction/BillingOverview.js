import React, { useEffect, useState } from "react";
import card from "../../../../../assets/images/card.svg";
import bank_active from "../../../../../assets/images/bankActive.svg";
import bank_inactive from "../../../../../assets/images/banks.svg";
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
  const [isPrimary, setIsPrimay] = useState({
    type: 'card',
    billingId: ''
  });

  const fetchCardBank = async () => {
    let cardBanksList;

    try {
      setIsLoader(true);
      let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
      cardBanksList = cardBankResponce;
      console.log({ cardBankResponce });
      if (cardBankResponce) {
        let primaryPaymentSource = cardBankResponce.primary === 'card' ? 'cards' : 'banks';
        //Filter card bank by active
        let filterCardBank = cardBankResponce[primaryPaymentSource].filter(obj => {
          return obj.status === 'active'
        });
        //Sort cards
        if (cardBankResponce.cards) {
          let sortedCards = cardBankResponce.cards.sort(el => (el.status === "active") ? -1 : 1)
          setCardBankList(sortedCards);
        }
        //Sort banks
        if (cardBankResponce.banks) {
          let sortedBanks = cardBankResponce.banks.sort(el => (el.status === "active") ? -1 : 1)
          setBankList(sortedBanks);
        }
        //Set primary data
        if (filterCardBank) {
          setIsPrimay({
            type: cardBankResponce.primary,
            billingId: filterCardBank[0]._id
          });
        }
        console.log({ isPrimary });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  // Change default payment method
  const changeDefaultPay = (payItem, type) => {
    try {
      setIsLoader(true);
      setIsPrimay({
        type: type,
        billingId: payItem._id
      })
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    fetchCardBank()
  }, []);

  useEffect(() => {
    broadcastToParent();
  }, [isPrimary]);

  const broadcastToParent = () => {
    props.changeDefaultPay(isPrimary);
  };


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

        <div className="bodytransactionForm bodyProductPayModes d-flex f-column">
          {isLoader && <Loader />}
          <p className="paymentTypes" style={{
            order: isPrimary.type === "card" ? "1" : "3"
          }}>Cards</p>
          <div className="chooseTransactionType paymentTypes" style={{
            order: isPrimary.type === "card" ? "2" : "4"
          }}>

            {cardBankList &&
              cardBankList.length > 0 &&
              cardBankList.map((cardItem, i) => (
                <label
                  className={
                    isPrimary.type === "card" && (isPrimary.billingId === cardItem._id)
                      ? "paymentType active"
                      : "paymentType"
                  }
                  key={i}
                >
                  {/*console.log(":::setNewPay::::", isPrimary)*/}
                  <span className="circleRadio">
                    <input
                      type="radio"
                      name="billingTransaction"
                      onChange={() => changeDefaultPay(cardItem, "card")}
                      checked={
                        isPrimary.type === "card" &&
                        (isPrimary.billingId === cardItem._id)
                      }
                    />
                    <span></span>
                  </span>
                  <span className="cardImage">
                    <img src={isPrimary.type === "card" && (isPrimary.billingId === cardItem._id) ? cardActive : card} alt="card" />
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
            order: isPrimary.type === "bank" ? "1" : "3"
          }}>Bank</p>

          <div className="chooseTransactionType paymentTypes" style={{
            order: isPrimary.type === "bank" ? "2" : "4"
          }}>
            {/* {//  //  console.log("bankList", bankList)} */}
            {bankList &&
              bankList.length > 0 &&
              bankList.map((bankItem, i) => (
                <label
                  className={
                    isPrimary.type === "bank" && (isPrimary.billingId === bankItem._id)
                      ? "paymentType active"
                      : "paymentType"
                  }
                  key={i}
                >
                  <span className="circleRadio">
                    <input
                      type="radio"
                      name="billingTransaction"
                      onChange={(e) => changeDefaultPay(bankItem, "bank")}
                      checked={
                        isPrimary.type === "bank" &&
                        (isPrimary.billingId === bankItem._id)
                      }
                    />
                    {/* {console.log(
                      ":::BANK:::",
                      isPrimary.type === "bank" && (isPrimary.billingId === bankItem._id)
                    )} */}
                    <span></span>
                  </span>
                  <span className="cardImage">
                    <img src={isPrimary.type === "bank" && (isPrimary.billingId === bankItem._id) ? bank_active : bank_inactive} alt="card" />
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
          {console.log("NEW PAY METHOD:::", isPrimary.type)}
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
                      defaultChecked={isPrimaryMethod === "card"}
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
