import React, { useEffect, useRef, useState } from "react";
import card from "../../../../../assets/images/card.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import payMode from "../../../../../assets/images/paymode.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import Loader from "../../../Loader";
import { SuccessAlert } from "../../../messages";

import { BillingServices } from "../../../../../services/billing/billingServices";

let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let currentMonth = currentTime.getMonth() + 1;

const BillingOverview = (props) => {
  const [newPayModal, setNewPayModal] = useState(false);
  const [cardBankList, setCardBankList] = useState([])
  const [bankList, setBankList] = useState([])
  const [isLoader, setIsLoader] = useState(false);
  const payModes = useRef(null)
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

  // NEW CARD BANK VALIDATION STATES
  const [cardNumberCheck, setCardNumberCheck] = useState("");
  const [cardNumberOn, setCardNumberOn] = useState("");
  const [cardNameCheck, setCardNameCheck] = useState("");
  const [cardExpairyCheck, setCardExpairyCheck] = useState("");
  const [cardExpairyMonthCheck, setCardExpairyMonthCheck] = useState("");
  const [cardExpairyYearCheck, setCardExpairyYearCheck] = useState("");
  const [cardCvvCheck, setCardCvvCheck] = useState("");

  const [bankAccountCheck, setBankAccountCheck] = useState("");
  const [bankNameCheck, setBankNameCheck] = useState("");
  const [bankRoutingCheck, setBankRoutingCheck] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  // NEW CARD BANK VALIDATION STATES

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

  // CARD BANK VALIDATION FUNCTIONS
  const testCardTypeFn = (cardNum) => {
    let visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let visaPatternTwo = /^4\d{3}(| |-)(?:\d{4}\1){2}\d{4}$/;
    let visaPatternThree = /^4\d{12}(?:\d{3})?$/;
    let mastPattern = /^(?:5[1-5][0-9]{14})$/;
    let mastPatternTwo = /^5[1-5]\d{14}$/;
    let mastPatternThree = /^5[1-5]\d{2}(| |-)(?:\d{4}\1){2}\d{4}$/;
    let amexPattern = /^(?:3[47][0-9]{13})$/;
    let amexPatternTwo = /^3[47]\d{13,14}$/;
    let amexPatternThree = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;
    let discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    let discPatternTwo = /^6(?:011|5\d\d)(| |-)(?:\d{4}\1){2}\d{4}$/
    let discPatternThree = /^(?:6011\d{12})|(?:65\d{14})$/

    let isAmex = amexPattern.test(cardNum) === true;
    let isAmexTwo = amexPatternTwo.test(cardNum) === true;
    let isAmexThree = amexPatternThree.test(cardNum) === true;
    let isVisa = visaPattern.test(cardNum) === true;
    let isVisaTwo = visaPatternTwo.test(cardNum) === true
    let isVisaThree = visaPatternThree.test(cardNum) === true
    let isMast = mastPattern.test(cardNum) === true;
    let isMastTwo = mastPatternTwo.test(cardNum) === true
    let isMastThree = mastPatternThree.test(cardNum) === true
    let isDisc = discPattern.test(cardNum) === true;
    let isDiscTwo = discPatternTwo.test(cardNum) === true
    let isDiscThree = discPatternThree.test(cardNum) === true

    let cardString;
    
    if (isAmex || isAmexTwo || isAmexThree || isVisa || isVisaTwo || isVisaThree || isMast || isMastThree || isMastTwo || isDisc || isDiscTwo || isDiscThree) {
      // console.log("IF IN CARD");
      if (isAmex || isAmexTwo || isAmexThree) {
        // console.log("IF IN CARD - AMEX");
        // AMEX-specific logic goes here
        cardString = "isAmex";
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_num_Err: "",
        }));
        return cardString;
      } else {
        if (isAmex || isAmexTwo || isAmexThree){
          cardString = "isAmex";
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          return cardString;
        }
        else if (isVisa || isVisaTwo || isVisaThree) {
          cardString = "isVisa";
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          return cardString;
        }
        else if (isMast || isMastThree || isMastTwo) {
        cardString = "isMast";
        setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          return cardString;
        }
        else if (isDisc || isDiscTwo || isDiscThree) {
          cardString = "isDisc";
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          return cardString;
        }
        else {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "Card number is not valid.",
          }));
        }
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
          console.log("TYPE::::", cardType);
          // AMEX-specific logic goes here
          formattedCardNumber = formattedCardNumber.substring(0, 15);
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
              card_num_Err: "",
          }));
          break;

        case "isVisa":
          console.log("TYPE::::", cardType);
          formattedCardNumber = formattedCardNumber.substring(0, 16);
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          break;

        case "isMast" || "isDisc":
          console.log("TYPE::::", cardType);
          formattedCardNumber = formattedCardNumber.substring(0, 16);
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          break;

        case "isDisc":
          console.log("TYPE::::", cardType);
          formattedCardNumber = formattedCardNumber.substring(0, 16);
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            card_num_Err: "",
          }));
          break;  
  
        default:
          console.log("cardType", cardType);
          setFormErrorMsg((errorMessage) => ({
              ...errorMessage,
              card_num_Err: "Please provide a valid card number.",
            }));
          break;
      }

      // Split the card number is groups of 4
      var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
      if (formattedCardNumber.match(/\d{1,4}/g)) {
        console.log("formattedCardNumber", formattedCardNumber);
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
      if(e.target.value.length === 0) { 
        setCardNameCheck(e.target.value)
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_name_Err: "Please enter card holder's name.",
        }))
     } 
     else {
       setCardNameCheck(e.target.value)
       setFormErrorMsg((errorMessage) => ({
         ...errorMessage,
         card_name_Err: "",
       }))
     }
    }
  };

  const cardExpairyCheckHandler = (e) => {
    let cardExpairy = e.target.value;
    
    if(cardExpairy !=="" && cardExpairy.length){
      if(cardExpairy[0]>1) 
      cardExpairy = "0" + cardExpairy[0]
    }
    console.log(cardExpairy.length);
    if(cardExpairy.length === 0 || cardExpairy.length < 7) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_exp_Err: "Card expiry date is not valid.",
      }));
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_exp_Err: "",
      }));
    }

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
    if(accountNumber.length === 0 || accountNumber.length < 9){
      setFormErrorMsg((errorMessage) => ({
      ...errorMessage,
        bank_acc_Err: "Please provide proper account number.",
      }));
    }
    else {
      setFormErrorMsg((errorMessage) => ({
      ...errorMessage,
        bank_acc_Err: "",
      }));
    }
    var formattedAccountNumber = accountNumber.replace(/[^\d]/g, "");
    formattedAccountNumber = formattedAccountNumber.substring(0, 12);
    setBankAccountCheck(formattedAccountNumber);
  };

  const bankNameCheckHandler = (e) => {
    const re = /^[a-zA-Z ]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if(e.target.value.length === 0) {
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          bank_name_Err: "Please enter proper Account holder's name",
        }));
      }
      else {
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          bank_name_Err: "",
        }));
      }
      setBankNameCheck(e.target.value);
    }
  };

  const bankRoutingCheckHandler = (e) => {
    let bankRouting = e.target.value;
    if(e.target.value.length === 0 || e.target.value.length < 9) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_routing_err: "Please enter proper Routing",
      }));
    }
    else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_routing_err: "",
      }));
    }
    var formattedBankRouting = bankRouting.replace(/[^\d]/g, "");
    formattedBankRouting = formattedBankRouting.substring(0, 9);
    setBankRoutingCheck(formattedBankRouting);
  };
  // CARD BANK VALIDATION FUNCTIONS

  const addPayMethod = (e, type) => {
    e.preventDefault();
    saveCardData(e)
    console.log("type", type);
  }

  // SAVE CARD DATA
  const saveCardData = async (e) => {
    e.preventDefault();

    let cardError = false;
    
    if (!cardNumberCheck || formErrorMsg.card_num_Err) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_num_Err: "Please provide a valid card number.",
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
        card_name_Err: "Please enter card holder's name.",
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
    if (cardCvvCheck !== "" && cardCvvCheck.length < 3) {
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

    const cardExpairyYearCheckFn = () => {
      let inputYear = cardExpairyYearCheck;
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
      else {
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_exp_Err: "Card expiry date is not valid.",
        }));
        cardError = true;
        return false;
      }
    };

    const cardExpairyMonthCheckFn = () => {
      let inputMonth = cardExpairyMonthCheck;

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

    const expiration_year = cardExpairyYearCheckFn();
    const expiration_month = cardExpairyMonthCheckFn();

    let cardPayload = cardNumberOn.trim() !== "" && expiration_year !== undefined && expiration_month !== undefined && cardNameCheck.trim() !== "" ? {
      contact: props.contactId,
      card_number: cardNumberOn,
      expiration_year:expiration_year,
      expiration_month: expiration_month,
      cvv: cardCvvCheck.trim() !== "" ? cardCvvCheck : "",
      cardholder_name: cardNameCheck,
      status: "active",
    }: cardError = true

    if (!cardError) {
      setIsLoader(true)
      
      try {
        await BillingServices.addCard(cardPayload);
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_details_invalid: "",
        })); 
        setTimeout(() => {
          setSuccessMessage("Card successfully added!")
        }, 2000);

        console.log("CARD ADDED::::::::", cardPayload);

        // props.changeDefaultPay(cardPayload, "card")
        setNewPayModal(false)
      } catch (error) {
        setIsLoader(false)
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_details_invalid: error.message,
        }));
      } finally {
        cardError = false;
        cardPayload = {
          contact: "",
          card_number: "",
          expiration_year: "",
          expiration_month: "",
          cvv: "",
          cardholder_name: "",
          status: "",
        };
        fetchCardBank();
      }
    }
  };
  // SAVE CARD DATA

  useEffect(()=>{},[props.newPay])

  useEffect(()=>{
      fetchCardBank()
      console.log(":::::::INSIDE BILLING OVERVIEW:::::::");
  },[])


  return (
    <>
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

      {newPayModal && (
        <div className="modalBackdrop modalNewPay">
        {
          successMessage !== "" && <SuccessAlert message={successMessage} />
        }
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
                    <div className="formBodyNew">
                      <div className={formErrorMsg.card_num_Err !== "" ? "cmnFormRow error" : "cmnFormRow"}>
                        <label>Card Number</label>
                        <div className="cmnFormField">
                          <input
                            className="cmnFieldStyle"
                            type="text"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            onChange={cardNumberCheckHandler}
                            value={cardNumberCheck}
                            name=""
                          />
                        </div>
                          {formErrorMsg.card_num_Err && <p className="errorMsg">{formErrorMsg.card_num_Err}</p>}
                      </div>

                      <div className={formErrorMsg.card_name_Err !== "" ? "cmnFormRow error" : "cmnFormRow"}>
                        <label>Card Holder's Name</label>
                        <div className="cmnFormField">
                          <input
                            type="text"
                            placeholder="Ex. Adam Smith"
                            className="cmnFieldStyle"
                            onChange={cardNameCheckHandler}
                            value={cardNameCheck}
                            name=""
                          />
                        </div>
                          {formErrorMsg.card_name_Err && <p className="errorMsg">{formErrorMsg.card_name_Err}</p>}
                      </div>

                      <div className="cmnFormRow">
                        <div className={formErrorMsg.card_exp_Err !== "" ? "cmnFormCol error" : "cmnFormCol"}>
                          <label>Expiry Date</label>
                          <div className="cmnFormField">
                            <input
                              type="text"
                              placeholder="mm/yyyy"
                              name=""
                              className="cmnFieldStyle"
                              onChange={cardExpairyCheckHandler}
                              value={cardExpairyCheck}
                            />
                          </div>
                          {formErrorMsg.card_exp_Err && <p className="errorMsg">{formErrorMsg.card_exp_Err}</p>}
                        </div>
                        <div className={formErrorMsg.card_cvv_Err !== "" ? "cmnFormCol error" : "cmnFormCol"}>
                          <label>CVV</label>
                          <div className="cmnFormField">
                            <input
                              type="text"
                              name=""
                              className="cmnFieldStyle"
                              onChange={cardCvvCheckHandler}
                              value={cardCvvCheck}
                            />
                          </div>
                          {formErrorMsg.card_cvv_Err && <p className="errorMsg">{formErrorMsg.card_cvv_Err}</p>}
                        </div>
                      </div>

                      <div className="modalbtnHolder">
                        <button type="reset" className="saveNnewBtn orangeBtn" onClick={(e)=>addPayMethod(e, "card")}>
                          <img src={pluss} alt="" /> Add my Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {props.newPayMethod === "bank" && (
                <div className="posSellingForm">
                  <div className="modalForm">
                    <div className="formBodyNew">
                      <div className="cmnFormRow">
                        <label>Account Number</label>
                        <div className="cmnFormField">
                          <input
                            type="number"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            className="cmnFieldStyle"
                            onChange={bankAccountCheckHandler}
                            value={bankAccountCheck}
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
                            onChange={bankNameCheckHandler}
                            value={bankNameCheck}
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
                              onChange={bankRoutingCheckHandler}
                              value={bankRoutingCheck}
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
                          onClick={(e)=>addPayMethod(e, "bank")}
                        >
                          <img src={pluss} alt="" />
                          Add my Bank Account
                        </button>
                      </div>
                    </div>
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

export default BillingOverview;
