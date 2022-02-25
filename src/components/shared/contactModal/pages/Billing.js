import React, { useState, useEffect } from "react";
import bank from "../../../../assets/images/bank.svg";
import credit_card from "../../../../assets/images/credit_card.svg";
import cross_white from "../../../../assets/images/cross_white.svg";
import plus from "../../../../assets/images/plus_icon.svg";
//import { ErrorAlert, SuccessAlert } from "../../messages";
import Loader from "../../Loader";
//import axios from "axios";

import { BillingServices } from "../../../../services/billing/billingServices";
//import { billingUrl } from "../../../../configuration/config";

let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let currentMonth = currentTime.getMonth() + 1;

const Billing = (props) => {
  const [listCardAnnim, setListCardAnnim] = useState(true);
  const [newCardAnnim, setNewCardAnnim] = useState(false);
  const [listBankAnnim, setListBankAnnim] = useState(true);
  const [newBankAnnim, setNewBankAnnim] = useState(false);
  const [cardNumberCheck, setCardNumberCheck] = useState("");
  const [cardNumberOn, setCardNumberOn] = useState("");
  const [cardNameCheck, setCardNameCheck] = useState("");
  const [cardExpairyCheck, setCardExpairyCheck] = useState("");
  const [cardExpairyMonthCheck, setCardExpairyMonthCheck] = useState("");
  const [cardExpairyYearCheck, setCardExpairyYearCheck] = useState("");
  const [cardActivationCheckText, setCardActivationCheckText] =
    useState("inactive");
  //const [bankActivationCheck, setBankActivationCheck] = useState(false);
  const [bankActivationCheckText, setBankActivationCheckText] =
    useState("inactive");
  const [isLoader, setIsLoader] = useState(false);

    const [cardCvvCheck, setCardCvvCheck] = useState("");
    const [bankAccountCheck, setBankAccountCheck] = useState("");
    const [bankNameCheck, setBankNameCheck] = useState("");
    const [bankRoutingCheck, setBankRoutingCheck] = useState("");

  const [cardDataFormatting, setCardDataFormatting] = useState({
    contact: props.contactId,
    card_number: cardNumberOn,
    expiration_year: cardExpairyCheck,
    expiration_month: cardExpairyCheck,
    cvv: cardCvvCheck,
    cardholder_name: cardNameCheck,
    status: cardActivationCheckText,
  });
  const [bankDataFormatting, setBankDataFormatting] = useState({
    contact: props.contactId,
    routing_number: bankRoutingCheck,
    account_number: bankAccountCheck,
    account_holder: bankNameCheck,
    account_type: "checking",
    status: bankActivationCheckText,
  });
  const [formErrorMsg, setFormErrorMsg] = useState({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: ""
    });

  //   const [cardBankLoader, setCardBankLoader] = useState();
  const [cardBankList, setCardBankList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [primaryType, setPrimaryType] = useState(null);
  const [dateError, setDateError] = useState("Please fill up the field");

  const fetchCardBank = async () => {
    try {
      setIsLoader(true);
      let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
      if (cardBankResponce) {
        setCardBankList(cardBankResponce.cards);
        setBankList(cardBankResponce.banks);
        setPrimaryType(cardBankResponce.primary);
        setIsLoader(false);
        console.log(cardBankResponce.cards);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    fetchCardBank();
  }, []);

  const openNewCardHandler = () => {
    setListCardAnnim(false);
    setNewCardAnnim(true);

    setCardNumberCheck("");
    setCardNumberOn("");
    setCardNameCheck("");
    setCardExpairyCheck("");
    setCardExpairyMonthCheck("");
    setCardExpairyYearCheck("");
    setCardCvvCheck("")
    setCardActivationCheckText("inactive");
    
    setFormErrorMsg({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: ""
    });
    hideNewCardHandler2()
  };

  const hideNewCardHandler = () => {
    setListCardAnnim(true);
    setNewCardAnnim(false);
  };

  const openNewCardHandler2 = () => {
    setListBankAnnim(false);
    setNewBankAnnim(true);
    setBankAccountCheck("");
    setBankNameCheck("");
    setBankRoutingCheck("");

    setFormErrorMsg({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: ""
    });
    hideNewCardHandler()
  };
  const hideNewCardHandler2 = () => {
    setListBankAnnim(true);
    setNewBankAnnim(false);
  };

  const activeCreditCard = async (cardBank) => {
    let cardData = {
      billingID: cardBank && cardBank._id,
      contactID: cardBank && props.contactId,
      accountType: cardBank && cardBank.accountType,
    };

    try {
      setIsLoader(true)
      await BillingServices.activeCard(cardData);
      fetchCardBank();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false)
    }
  };

  // .................. validation ................

  const testCardTypeFn = (cardNum) => {
    let visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let mastPattern = /^(?:5[1-5][0-9]{14})$/;
    let amexPattern = /^(?:3[47][0-9]{13})$/;
    let discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    let isAmex = amexPattern.test(cardNum) === true;
    let isVisa = visaPattern.test(cardNum) === true;
    let isMast = mastPattern.test(cardNum) === true;
    let isDisc = discPattern.test(cardNum) === true;

    let cardString;

    if (isAmex || isVisa || isMast || isDisc) {
      // console.log("IF IN CARD");
      if (isAmex) {
        // console.log("IF IN CARD - AMEX");
        // AMEX-specific logic goes here
        cardString = "isAmex";
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_num_Err: "",
        }));
        return cardString;
      } else {
        // console.log("IF IN CARD - ELSE");
        cardString = "isOther";
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_num_Err: "",
        }));
        return cardString;
      }
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_num_Err: "Card number is not valid.",
      }));
    }
  };

  const cardNumberCheckHandler = (e) => {
    let cardNumber = e.target.value;
    if (cardNumber.length <= 19) {
      var formattedCardNumber = cardNumber.replace(/[^\d]/g, "");
      let cardType = testCardTypeFn(formattedCardNumber);

      switch (cardType) {
        case "isAmex":
          // console.log("IF IN CARD - AMEX");
          // AMEX-specific logic goes here
          formattedCardNumber = formattedCardNumber.substring(0, 15);
          break;

        default:
           // console.log("IF IN CARD - ELSE");
          formattedCardNumber = formattedCardNumber.substring(0, 16);
          break;
      }

      // Split the card number is groups of 4
      var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
      if (formattedCardNumber.match(/\d{1,4}/g)) {
        formattedCardNumber = cardNumberSections.join("-");
        setCardNumberCheck(formattedCardNumber);
        var cardNumberChanged = formattedCardNumber.replace(/[^\d ]/g, "");
        setCardNumberOn(cardNumberChanged);
      }
      if (e.target.value === "") {
        setCardNumberCheck("");
      }
    }
  };

  const cardNameCheckHandler = (e) => {
    const re = /^[a-zA-Z ]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setCardNameCheck(e.target.value);
    }
  };

  const cardExpairyCheckHandler = (e) => {
    let cardExpairy = e.target.value;
    var formattedCardExpairy = cardExpairy.replace(/[^\d]/g, "");
    formattedCardExpairy = formattedCardExpairy.substring(0, 6);

    var cardExpairySectionsMonth = formattedCardExpairy.slice(0, 2);
    var cardExpairySectionsYear = formattedCardExpairy.slice(2, 6);

    if (cardExpairySectionsMonth > 0 && cardExpairySectionsYear > 0) {
      formattedCardExpairy =
        cardExpairySectionsMonth + "/" + cardExpairySectionsYear;
    } else if (formattedCardExpairy <= 2) {
      formattedCardExpairy = cardExpairySectionsMonth;
    }
    setCardExpairyCheck(formattedCardExpairy);
    setCardExpairyMonthCheck(cardExpairySectionsMonth);
    setCardExpairyYearCheck(cardExpairySectionsYear);
    //console.log(cardExpairySectionsMonth + "," + cardExpairySectionsYear);
  };

  const cardCvvCheckHandler = (e) => {
    let cardCvv = e.target.value;
    var formattedCardCvv = cardCvv.replace(/[^\d]/g, "");
    formattedCardCvv = formattedCardCvv.substring(0, 3);
    
    setCardCvvCheck(formattedCardCvv);
  };
  useEffect(() => {}, [
    cardCvvCheck,
    cardExpairyMonthCheck,
    cardExpairyYearCheck,
    cardExpairyCheck,
    cardNameCheck,
    cardNumberCheck,
  ]);

  const bankAccountCheckHandler = (e) => {
    let accountNumber = e.target.value;
    var formattedAccountNumber = accountNumber.replace(/[^\d]/g, "");
    formattedAccountNumber = formattedAccountNumber.substring(0, 12);
    setBankAccountCheck(formattedAccountNumber);
  };

  const bankNameCheckHandler = (e) => {
    const re = /^[a-zA-Z ]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setBankNameCheck(e.target.value);
    }
  };

  const bankRoutingCheckHandler = (e) => {
    let bankRouting = e.target.value;
    var formattedBankRouting = bankRouting.replace(/[^\d]/g, "");
    formattedBankRouting = formattedBankRouting.substring(0, 9);
    setBankRoutingCheck(formattedBankRouting);
  };

  const saveCardData = async (e) => {
    e.preventDefault();

    let cardError = false;

    if (!cardNumberCheck) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_num_Err: "Card number is not valid.",
      }));
      cardError = true;
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_num_Err: "",
      }));
    }

    if (!cardNameCheck) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_name_Err: "Card name is not valid.",
      }));
      cardError = true;
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_name_Err: "",
      }));
    }
    if (!cardExpairyCheck || cardExpairyCheck.length < 7) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_exp_Err: "Card expiry date is not valid.",
      }));
      cardError = true;
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_exp_Err: "",
      }));
    }
    if (!cardCvvCheck || cardCvvCheck.length < 3 || cardCvvCheck == "000") {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_cvv_Err: "Card CVV number is not valid.",
      }));
      cardError = true;
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_cvv_Err: "",
      }));
    }

    setCardDataFormatting({
      ...cardDataFormatting,
      contact: props.contactId,
      card_number: cardNumberOn,
      expiration_year: cardExpairyYearCheck,
      expiration_month: cardExpairyMonthCheck,
      cvv: cardCvvCheck,
      cardholder_name: cardNameCheck,
      status: cardActivationCheckText,
    });

    const cardExpairyYearCheckFn = (year) => {
      let inputYear = year;
      if (inputYear > currentYear) {
        return inputYear;
      } else if (inputYear == currentYear) {
        if (cardExpairyMonthCheck > currentMonth) {
          return inputYear;
        } else {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_exp_Err: "Card expiry date is not valid.",
          }));
          cardError = true;
          return false;
        }
      }
    };

    const cardExpairyMonthCheckFn = (month) => {
      let inputMonth = month;

      if (inputMonth > currentMonth) {
        //console.log(inputMonth);
        if (inputMonth <= 12) {
          return inputMonth;
        } else {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_exp_Err: "Card expiry date is not valid.",
          }));
          cardError = true;
          return false;
        }
      } else if (inputMonth <= currentMonth && inputMonth.length > 0) {
        if (cardExpairyYearCheck > currentYear) {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_exp_Err: "",
          }));
          return inputMonth;
        } else {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_exp_Err: "Card expiry date is not valid.",
          }));
          cardError = true;
          return false;
        }
      } else if (inputMonth == "00" || inputMonth === 0) {
        if (inputMonth.length > 0) {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_exp_Err: "Card expiry date is not valid.",
          }));
          cardError = true;
          return false;
        } else {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_exp_Err: "Card expiry date is not valid.",
          }));
          cardError = true;
          return false;
        }
      } else {
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_exp_Err: "Card expiry date is not valid.",
        }));
        cardError = true;
        return false;
      }
    };


    let cardPayload = {
      contact: props.contactId,
      card_number: cardNumberOn.trim() !== "" && cardNumberOn,
      expiration_year:
        cardExpairyYearCheckFn(cardExpairyYearCheck) !== undefined &&
        cardExpairyYearCheckFn(cardExpairyYearCheck),
      expiration_month:
        cardExpairyMonthCheckFn(cardExpairyMonthCheck) !== undefined &&
        cardExpairyMonthCheckFn(cardExpairyMonthCheck),
      cvv: cardCvvCheck.trim() !== "" && cardCvvCheck,
      cardholder_name: cardNameCheck.trim() !== "" && cardNameCheck,
      status: cardBankList.length === 0 ? "active" : cardActivationCheckText,
    };

    if (!cardError) {
      try {
        setIsLoader(true)
        await BillingServices.addCard(cardPayload);
        cardBankList.length == 0 && makePrimaryMethod(e, "card");
        hideNewCardHandler();
        fetchCardBank();
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_details_invalid: "",
        }));
      } catch (error) {
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_details_invalid: error.message,
        }));
      } finally {
        setIsLoader(false)
        cardError = false;
      }
    }
  };

  const saveBankData = async (e) => {
    e.preventDefault();

    let bankError = false;

    if (!bankRoutingCheck || bankRoutingCheck.length < 9) {
      bankError = true

      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_routing_err: "Please enter proper Routing",
      }));
    } else {
      bankError = false
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_routing_err: "",
      }));
    }
    if (!bankNameCheck) {
      bankError = true
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_name_Err: "Please enter proper Account holder name",
      }));
    } else {
      bankError = false
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_name_Err: "",
      }));
    }
    if (!bankAccountCheck || bankAccountCheck.length < 8) {
      bankError = true
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_acc_Err: "Bank account number not valid",
      }));
    } else {
      bankError = false
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_acc_Err: "",
      }));
    }

    setBankDataFormatting({
      ...bankDataFormatting,
      contact: props.contactId,
      routing_number: bankRoutingCheck,
      account_number: bankAccountCheck,
      account_holder: bankNameCheck,
      status: bankActivationCheckText,
    });

    let bankPayload = {
      contact: props.contactId,
      routing_number: bankRoutingCheck,
      account_number: bankAccountCheck,
      account_holder: bankNameCheck,
      account_type: "checking",
      status: bankActivationCheckText,
    };

    if (!bankError) {
      try {
        await BillingServices.addBank(bankPayload);
        cardBankList.length == 0 && makePrimaryMethod(e, "bank");
        hideNewCardHandler2();
        fetchCardBank();
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          bank_details_invalid: "",
        }));
      } catch (error) {
        console.log(error);
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          bank_details_invalid: error.message,
        }));
      } finally {
        bankPayload = {
          contact: props.contactId,
          routing_number: "",
          account_number: "",
          account_holder: "",
          account_type: "checking",
          status: "inactive",
        };
      }
    }
  };

  const makePrimaryMethod = (e, value) => {
    let payload = {
      contactID: props.contactId,
      accountType: value,
    };
    if (props.contactId && value) {
      BillingServices.makePrimary(payload);
      setPrimaryType(value);
    }
  };

  useEffect(()=>{},[formErrorMsg])

  return (
    <>
      <div className={props.contact.is_payment_setup_remaining ? "contactTabsInner d-flex f-column" : isLoader ? "contactTabsInner loading" : "contactTabsInner"}>
        {isLoader ? <Loader /> : ""}
        <h3 className="headingTabInner">Billing Info</h3>
        <p className="subheadingTabInner">
          Explanatory text blurb should be here.
        </p>
        {(!props.contact.is_payment_setup_remaining) ?
            <div className="twoBillingCardContainer">
              {props.contact && props.contact.payment_error !== undefined ?
                  <div className="importCPaymentError d-flex f-align-center f-justify-center">
                    <p>{props.contact.payment_error}</p>
                  </div> : formErrorMsg.card_details_invalid ? <div className="importCPaymentError d-flex f-align-center f-justify-center">
                    <p>{formErrorMsg.card_details_invalid}</p>
                  </div> : formErrorMsg.bank_details_invalid ? <div className="importCPaymentError d-flex f-align-center f-justify-center">
                    <p>{formErrorMsg.bank_details_invalid}</p>
                  </div> : ""
              }
              <div className="billing_module">
                {cardBankList && cardBankList.length > 0 &&
                  <div className="primaryMaker">
                    <label>
                      <div class="circleRadio">
                        <input
                            type="radio"
                            name="primary"
                            onChange={(e) => makePrimaryMethod(e, "card")}
                            defaultChecked={
                                primaryType === "card"
                            }
                        />
                        <span></span>
                      </div>
                      <span>
                    {primaryType !== "card" && "Make "}
                        Primary
                  </span>
                    </label>
                  </div>
                }
                <div className="flipCardHolder">
                  <div
                      className={listCardAnnim ? "cardList show" : "cardList hide"}
                  >
                    <div className="header">
                      <div className="headerLeft">
                        <img src={credit_card} alt=""/> Credit Cards
                      </div>
                      <button className="cardAddBtn" onClick={openNewCardHandler}>
                        Add a Card
                      </button>
                    </div>
                    <div className="body">
                      {cardBankList &&
                          cardBankList.map((creditCard, i) => (
                              <div
                                  key={i}
                                  className={
                                    creditCard.status === "active"
                                        ? "list active"
                                        : "list"
                                  }
                              >
                                <label className="leftside">
                                  <div class="circleRadio">
                                    <input
                                        type="radio"
                                        name="credit"
                                        onChange={() => activeCreditCard(creditCard)}
                                        defaultChecked={
                                          creditCard.status === "active" ? true : false
                                        }
                                        id={i}
                                    />
                                    <span></span>
                                  </div>
                                  {" "}
                                  {creditCard.checkIt ? "Active" : ""}
                                </label>
                                <div className="rightside">
                                  <p>
                                    <span>Card Number</span>
                                    XXXXXXXXXXXX{creditCard.last4}{" "}
                                  </p>
                                  <p className="diff">
                                    <span>Expiry</span>
                                    {`${creditCard.expiration_month} / ${creditCard.expiration_year}`}
                                  </p>
                                </div>
                              </div>
                          ))}
                    </div>
                  </div>
                  <div
                      className={newCardAnnim ? "addInList show" : "addInList hide"}
                  >
                    <div className="header">
                      <button
                          className="noEffectBtn cross"
                          onClick={hideNewCardHandler}
                      >
                        <img src={cross_white} alt=""/>
                      </button>
                      <img src={credit_card} alt=""/>
                      <h3>Add a credit Card</h3>
                    </div>
                    <div className="addingForm">
                      <form id="addCardForm">
                        <div className="formModule">
                          <label>Card Number</label>
                          <div className="activeFactor">
                            <input
                                type="text"
                                className="creditCardText"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                onChange={cardNumberCheckHandler}
                                value={cardNumberCheck}
                            />
                            <div className="activate">
                              <div class="customCheckbox">
                                <input
                                    type="checkbox"
                                    name="credit"
                                    defaultChecked={(!cardBankList || cardBankList.length === 0) && (!bankList || bankList.length === 0)}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setCardActivationCheckText("active")
                                            : setCardActivationCheckText("inactive")
                                    }
                                    // checked={cardActivationCheck}
                                />
                                <span></span>
                              </div>
                              {" "}
                              Active
                            </div>
                          </div>

                          {formErrorMsg.card_num_Err && <p className="errorMsg">{formErrorMsg.card_num_Err}</p>}
                        </div>
                        <div className="formModule">
                          <label>Card Holder Name</label>
                          <input
                              type="text"
                              placeholder="Ex. Adam Smith"
                              onChange={cardNameCheckHandler}
                              value={cardNameCheck}
                          />
                          {formErrorMsg.card_name_Err && <p className="errorMsg">{formErrorMsg.card_name_Err}</p>}
                        </div>

                        <div className="halfDivForm">
                          <div className="half formModule">
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                placeholder="mm/yyyy"
                                onChange={cardExpairyCheckHandler}
                                value={cardExpairyCheck}
                            />
                            {formErrorMsg.card_exp_Err && <p className="errorMsg">{formErrorMsg.card_exp_Err}</p>}
                          </div>
                          <div className="half formModule">
                            <label>CVV</label>
                            <input
                                type="text"
                                onChange={cardCvvCheckHandler}
                                value={cardCvvCheck}
                            />
                            {formErrorMsg.card_cvv_Err && <p className="errorMsg">{formErrorMsg.card_cvv_Err}</p>}
                          </div>
                        </div>

                        <div className="text-center">
                          <button className="orangeBtn" onClick={saveCardData}>
                            <img src={plus} alt=""/> Add my Card
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* ............................. */}
              <div className="billing_module">
              {bankList &&
                          bankList.length > 0 && 
                <div className="primaryMaker">
                  <label>
                    <div class="circleRadio">
                      <input
                          type="radio"
                          name="primary"
                          onChange={(e) => makePrimaryMethod(e, "bank")}
                          defaultChecked={
                              primaryType === "bank"
                          }
                      />
                      <span></span>
                    </div>
                    <span>
                  {primaryType !== "bank" && "Make "}
                      Primary
                </span>
                  </label>
                </div>
                }
                <div className="flipCardHolder">
                  <div
                      className={listBankAnnim ? "cardList show" : "cardList hide"}
                  >
                    <div className="header">
                      <div className="headerLeft">
                        <img src={bank} alt=""/> Bank Accounts
                      </div>
                      <button className="cardAddBtn" onClick={openNewCardHandler2}>
                        Add an Account
                      </button>
                    </div>
                    <div className="body">
                      {bankList &&
                          bankList.map((bank, i) => (
                              <div
                                  key={i}
                                  className={
                                    bank.status === "active" ? "list active" : "list"
                                  }
                              >
                                <label className="leftside">
                                  <div class="circleRadio">
                                    <input
                                        type="radio"
                                        name="bank"
                                        onChange={() => activeCreditCard(bank)}
                                        defaultChecked={
                                          bank.status === "active" ? true : false
                                        }
                                        id={i}
                                    />
                                    <span></span>
                                  </div>
                                </label>
                                <div className="rightside">
                                  <p>
                                    <span>Account Number</span>
                                    XXXXXXXXXXXX{bank.last4}
                                  </p>
                                  <p className="diff">
                                    <span>Routing #</span>
                                    {bank.routing_number}
                                  </p>
                                  <div className="checking">{bank.account_type}</div>
                                </div>
                              </div>
                          ))}
                    </div>
                  </div>

                  <div
                      className={newBankAnnim ? "addInList show" : "addInList hide"}
                  >
                    <div className="header">
                      <button
                          className="noEffectBtn cross"
                          onClick={hideNewCardHandler2}
                      >
                        <img src={cross_white} alt=""/>
                      </button>
                      <img src={bank} alt=""/>
                      <h3>Add a Bank Account</h3>
                    </div>
                    <div className="addingForm">
                      <form>
                        <div className="formModule">
                          <label>Account Number</label>
                          <div className="activeFactor">
                            <input
                                type="text"
                                placeholder="xxxxxxxxx"
                                onChange={bankAccountCheckHandler}
                                value={bankAccountCheck}
                            />
                            <div className="activate">
                              <div class="customCheckbox">
                                <input
                                    type="checkbox"
                                    name="credit"
                                    defaultChecked={(!cardBankList || cardBankList.length === 0) && (!bankList || bankList.length === 0)}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setBankActivationCheckText("active")
                                            : setBankActivationCheckText("inactive")
                                    }
                                    // checked={bankActivationCheck}
                                />
                                <span></span>
                              </div>
                              {" "}
                              Active
                            </div>
                          </div>
                          {formErrorMsg.bank_acc_Err && <p className="errorMsg">{formErrorMsg.bank_acc_Err}</p>}
                        </div>
                        <div className="formModule">
                          <label>Account Holder Name</label>
                          <input
                              type="text"
                              placeholder="Ex. Adam Smith"
                              onChange={bankNameCheckHandler}
                              value={bankNameCheck}
                          />
                          {formErrorMsg.bank_name_Err && <p className="errorMsg">{formErrorMsg.bank_name_Err}</p>}
                        </div>
                        <div className="halfDivForm">
                          <div className="half formModule">
                            <label>Routing #</label>
                            <input
                                type="text"
                                onChange={bankRoutingCheckHandler}
                                value={bankRoutingCheck}
                            />
                            {formErrorMsg.bank_routing_err && <p className="errorMsg">{formErrorMsg.bank_routing_err}</p>}
                          </div>
                          <div className="half formModule">
                            <label>Account Type</label>
                            <select className="selectBox">
                              <option>Checking</option>
                            </select>
                          </div>
                        </div>

                        <div className="text-center">
                          <button className="orangeBtn" onClick={saveBankData}>
                            <img src={plus} alt=""/> Add my Bank Account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : <div className="importBillingError f-1 d-flex f-column f-align-center f-justify-center">
              <p>Billing details is importing; <br/>Please try again after some time.</p>
            </div>
        }
      </div>
    </>
  );
};

export default Billing;
