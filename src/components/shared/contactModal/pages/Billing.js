import React, { useState, useEffect, useReducer, useRef } from "react";
import bank from "../../../../assets/images/bank.svg";
import credit_card from "../../../../assets/images/credit_card.svg";
import cross_white from "../../../../assets/images/cross_white.svg";
import plus from "../../../../assets/images/plus_icon.svg";
import { ErrorAlert, SuccessAlert } from "../../messages";
import Loader from "../../Loader";
//import axios from "axios";
import ConfirmBox from "../../confirmBox";
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import { BillingServices } from "../../../../services/billing/billingServices";
import { useStoreActions } from "react-flow-renderer";
//import { billingUrl } from "../../../../configuration/config";

let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let currentMonth = currentTime.getMonth();

const Billing = (props) => {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [changePaymentValue, setChangePaymentValue] = useState("");
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
    const [bankAccountType, setBankAccountType] = useState("checking");
    const [companyName, setCompanyName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [merchantOptions, setMerchantOptions] = useState({
      hasId: false,
      activeFor: []
    })
    const [deleteCardBank, setDeleteCardBank] = useState(null);

    const billingCardContainer = useRef(null)
    const addCardBtn = useRef(null)
    const addBankBtn = useRef(null)
    const addCardForm = useRef(null)
    const addBankForm = useRef(null)
    const dispatch = useDispatch();

  const [formErrorMsg, setFormErrorMsg] = useState({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: "",
      bank_account_type: "",
      company_name: ""
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
        // console.log("cardBankResponce.paymentsActivatedFor", cardBankResponce.paymentsActivatedFor);
        setMerchantOptions({
          hasId: cardBankResponce.hasMerchantId,
          activeFor: [...cardBankResponce.paymentsActivatedFor]
        })
        let cards = cardBankResponce.cards;
        cards.forEach(function(item,i){
          if(item.status === "active"){
            cards.splice(i, 1);
            cards.unshift(item);
          }
        });

        let banks = cardBankResponce.banks;
        banks.forEach(function(item,i){
          if(item.status === "active"){
            banks.splice(i, 1);
            banks.unshift(item);
          }
        });
        setCardBankList(cardBankResponce.cards);
        setBankList(cardBankResponce.banks);
        setPrimaryType(cardBankResponce.primary);
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
      card_details_invalid: "",
      bank_details_invalid: "",
      bank_account_type: "",
      company_name: ""
    });
    hideNewCardHandler2()
  };

  const hideNewCardHandler = () => {
    setListCardAnnim(true);
    setNewCardAnnim(false);

    setFormErrorMsg({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: "",
      bank_details_invalid: "",
      bank_account_type: "",
      company_name: ""
    });
  };

  const openNewCardHandler2 = () => {
    setListBankAnnim(false);
    setNewBankAnnim(true);
    setBankAccountCheck("");
    setBankNameCheck("");
    setBankRoutingCheck("");
    setBankAccountType("checking");
    setFormErrorMsg({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: "",
      bank_details_invalid: "",
      bank_account_type: "",
      company_name: ""
    });
    hideNewCardHandler()
  };
  const hideNewCardHandler2 = () => {
    setListBankAnnim(true);
    setNewBankAnnim(false);

    setFormErrorMsg({
      card_num_Err: "",
      card_name_Err: "",
      card_exp_Err: "",
      card_cvv_Err: "",
      bank_routing_err: "",
      bank_acc_Err: "",
      bank_name_Err: "",
      card_details_invalid: "",
      bank_details_invalid: "",
      bank_account_type: "",
      company_name: ""
    });
  };

  const activeCreditCard = async (cardBank) => {
    setIsLoader(true)
    console.log("cardBank........", cardBank);
    let cardData = {
      billingID: cardBank && cardBank._id,
      contactID: cardBank && props.contactId,
      accountType: cardBank && cardBank.accountType,
    };
    
    try {
      await BillingServices.activeCard(cardData);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: cardBank.accountType == "card" ? "Card successfully set as primary" : "Bank successfully set as primary",
        typeMessage: 'success'
      });
    } catch (error) {
      console.log(error);
    } finally {
      fetchCardBank();
    }
  };

  // .................. validation ................

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
    if (cardNumber.length < 24) {
      var formattedCardNumber = cardNumber.replace(/[^\d]/g, "");

      // Split the card number is groups of 4
      var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
      if (formattedCardNumber.match(/\d{1,4}/g)) {
        formattedCardNumber = cardNumberSections.join(" ");
        setCardNumberCheck(formattedCardNumber);
        var cardNumberChanged = formattedCardNumber.replace(/[^\d ]/g, "");
        setCardNumberOn(cardNumberChanged);
      }
      if (e.target.value === "") {
        setCardNumberCheck("");
      }
    }

    if(cardNumber.length > 17) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        card_num_Err: "",
      }));
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
       if (e.target.value.length <= 50) {
         setCardNameCheck(e.target.value)
       }
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
    formattedCardCvv = formattedCardCvv.substring(0, 4);
    
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
    console.log(accountNumber.length)
    if(accountNumber.length === 0 || accountNumber.length < 3 || accountNumber.length > 20){
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
    /*formattedAccountNumber = formattedAccountNumber.substring(0, 12);*/
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
  const bankAccountTypeHandler = (e) => {
    let accountType = e.target.value;
    if(accountType === "") {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_account_type: "Please enter proper account type",
      }));
    }
    else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_account_type: "",
      }));
    }
    setBankAccountType(accountType);
  }

  const companyNameHandel = (e) => {
    let company = e.target.value;
    if(companyName === "") {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        company_name: "Please enter company name",
      }));
    }
    else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        company_name: "",
      }));
    }
    setCompanyName(company);
  }

  const saveCardData = async (e) => {
    e.preventDefault();
    
    let cardError = false;
    console.log(cardNumberCheck, formErrorMsg.card_num_Err);
    if (!cardNumberCheck || formErrorMsg.card_num_Err || cardNumberCheck.length < 17) {
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

      if (inputMonth >= currentMonth) {
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
      card_number: cardNumberOn.split(" ").join(""),
      expiration_year:expiration_year,
      expiration_month: expiration_month,
      cvv: cardCvvCheck.trim() !== "" ? cardCvvCheck : "",
      cardholder_name: cardNameCheck,
      status: "active",
    }: cardError = true

    if (!cardError) {
      addCardBtn.current.disabled = true
      addBankBtn.current.disabled = true
      setIsLoader(true)
      try {
        (cardBankList.length == 0 && bankList.length == 0) && makePrimaryMethod(e, "card");
        await BillingServices.addCard(cardPayload);
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          card_details_invalid: "",
        }));
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Card successfully added!",
          typeMessage: 'success'
        });
        hideNewCardHandler();
      } catch (error) {
        setIsLoader(false)
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error.message,
          typeMessage: 'error'
        });
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
        addCardForm.current.reset()
        fetchCardBank();
        console.log("FINISHED");
        addCardBtn.current.disabled = false
        addBankBtn.current.disabled = false
      }
    }
  };

  const saveBankData = async (e) => {
    e.preventDefault();

    let bankError = false;

    if (!bankRoutingCheck || bankRoutingCheck.length < 9) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_routing_err: "Please enter proper Routing",
      }));
      bankError = true
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_routing_err: "",
      }));
    }
    if (!bankNameCheck || bankNameCheck.trim() === "" || bankNameCheck.length === 0) {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_name_Err: "Please enter proper Account holder's name",
      }));
      bankError = true
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_name_Err: "",
      }));
    }
    if (!bankAccountCheck || bankAccountCheck.length === 0) {
      setFormErrorMsg((errorMessage) => ({
      ...errorMessage,
        bank_acc_Err: "Please provide proper account number.",
      }));
      bankError = true
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_acc_Err: "",
      }));
    }
    if (!bankAccountType === "") {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_account_type: "Please provide proper account account type.",
      }));
      bankError = true
    } else {
      setFormErrorMsg((errorMessage) => ({
        ...errorMessage,
        bank_account_type: "",
      }));
    }
      if (bankAccountType === "business_checking") {
        if (companyName === "") {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            company_name: "Please enter company name.",
          }));
          bankError = true
        } else {
          setFormErrorMsg((errorMessage) => ({
            ...errorMessage,
            company_name: "",
        }));
      }
    }

      let bankPayload = bankRoutingCheck.trim() !== "" && bankAccountCheck.trim() !== "" && bankNameCheck.trim() !== "" ? {
        contact: props.contactId,
        routing_number:  bankRoutingCheck,
        account_number: bankAccountCheck,
        account_holder: bankNameCheck,
        account_type: bankAccountType,
        company_name: companyName,
        status: "active",
      } : bankError = true

    if (!bankError) {
      setIsLoader(true)
      try {
        (cardBankList.length === 0 && bankList.length === 0) && makePrimaryMethod(e, "bank");
        await BillingServices.addBank(bankPayload);
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          bank_details_invalid: "",
        })); 
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Bank details successfully added!",
          typeMessage: 'success'
        });
        hideNewCardHandler2();
      } catch (error) {
        setIsLoader(false)
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error.message,
          typeMessage: 'error'
        });
      } finally {
        bankError = false;
        bankPayload = {
          contact: props.contactId,
          routing_number: "",
          account_number: "",
          account_holder: "",
          account_type: "checking",
          status: "inactive",
        };
        setBankAccountType("checking");
        addBankForm.current.reset()
        fetchCardBank();
      }
    }
  };

  const makePrimaryMethod = (value) => {
    setIsLoader(true);
    
    if (props.contactId && value) {
      let payload = {
        contactID: props.contactId,
        accountType: value,
      };
      
      try {
        BillingServices.makePrimary(payload);
        setPrimaryType(value);
      }
      catch (error) {
        console.log(error);
        setFormErrorMsg((errorMessage) => ({
          ...errorMessage,
          bank_details_invalid: error.message,
        }));
      } finally {
        setIsLoader(false);
        setConfirmPopup(false);
      }
    }
  };

  const changePaymentMethod = (confirmation) => {
    if (confirmation == "yes") {
      makePrimaryMethod(changePaymentValue);
    } else {
      setConfirmPopup(false);
    }
    setChangePaymentValue(null);
  };

  const openDeletePopup = (param) => {
    console.log(cardBankList);
    setDeleteConfirmPopup(true);
    setDeleteCardBank(param);
  }

  const deleteConfirm = (confirmation) => {
    if (confirmation == "yes") {
      deletePay()
    } else {
      setDeleteConfirmPopup(false);
      setDeleteCardBank(null);
    }
  };

  const deletePay = async () => {
    try {
      setIsLoader(true);
     const result = await BillingServices.deletePay(deleteCardBank._id);
      // console.log("Result::::::: ", result);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: deleteCardBank.accountType == "card" ? "Card deleted successfully" : "Bank account deleted successfully",
        typeMessage: 'success'
      });
      if(deleteCardBank.accountType === "card") {
        const filterCard = cardBankList.filter(card => card._id !== deleteCardBank._id);
        setCardBankList(filterCard);
      } else {
        const filterBank = bankList.filter(bank => bank._id !== deleteCardBank._id);
        setBankList(filterBank);
      }
    } catch (error) {
      console.log("Result::::::: ", error);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "You can’t delete this card/bank account. This card/bank account is associated with subscription(s).",
        typeMessage: 'error'
      });
    } finally {
      
      setIsLoader(false);
      setDeleteConfirmPopup(false);
      setDeleteCardBank(null);
    }
    
  }

  const openChangePayModal = (value) => {
    setConfirmPopup(true);
    setChangePaymentValue(value);
  }

  useEffect(()=>{
    console.log("merchantOptions", merchantOptions);
  },[merchantOptions])

  useEffect(()=>{},[formErrorMsg])

  useEffect(()=>{},[cardBankList, bankList])
  
  useEffect(() => {
     if (successMessage) setTimeout(() => { setSuccessMessage("") }, 5000)
 }, [successMessage])

  return (
    <>
    {confirmPopup ?
        <ConfirmBox
          callback={(isConfirmed) => changePaymentMethod(isConfirmed)} 
          message="Are you sure, you want to change your primary payment method?"
        />
       : ""
      }
        <div className={props.contact.is_payment_setup_remaining ? "contactTabsInner d-flex f-column" : isLoader ? "contactTabsInner loading contactTabsInnerBilling" : "contactTabsInner contactTabsInnerBilling"}>
        {isLoader ? <Loader /> : ""}
        <div className="contactTabsScrollSpace">
        <h3 className="headingTabInner">Billing Info</h3>
        <p className="subheadingTabInner">
        Manage your billing details here
        </p>
        {(!props.contact.is_payment_setup_remaining) ?
            <div className="twoBillingCardContainer" ref={billingCardContainer}>
              {
                formErrorMsg.card_details_invalid ? <div className="importCPaymentError d-flex f-align-center f-justify-center">
                  <p>{formErrorMsg.card_details_invalid}</p>
                </div> : formErrorMsg.bank_details_invalid ? <div className="importCPaymentError d-flex f-align-center f-justify-center">
                  <p>{formErrorMsg.bank_details_invalid}</p>
                </div> : ""
              }
              {
                successMessage !== "" && <SuccessAlert message={successMessage} />
              }

              {/* {console.log("merchantOptions", merchantOptions, merchantOptions ? merchantOptions.activeFor.indexOf("credit_card") : "")} */}
              
              {console.log("merchantOptions", merchantOptions.hasId)}
              {merchantOptions.hasId ?
                <>
                  <div className="billing_module">
                          {/* <div className="primaryMaker" onClick={() => openChangePayModal("card")}>
                        {cardBankList && cardBankList.length > 0 &&
                            <label>
                              <div className="circleRadio">
                                <input
                                    type="radio"
                                    name="primary"
                                    defaultChecked={primaryType === "card" ? true : false}
                                />
                                <span></span>
                              </div>
                              <span>
                            {primaryType !== "card" && "Make "}
                                Primary
                          </span>
                            </label>
                        }
                          </div> */}
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
                                            <div className="circleRadio">
                                              {/* <input
                                                  type="radio"
                                                  name="bank"
                                                  value={creditCard.last4}
                                                  onChange={() => activeCreditCard(creditCard)}
                                                  checked={creditCard.status === "active"}
                                                  id={i}
                                              /> */}
                                              <button 
                                              className="radioLooksButton" 
                                              value={creditCard.last4}
                                              onClick={() => activeCreditCard(creditCard)}
                                              ></button>
                                              <span className={creditCard.status === "active" ? "radioLooks active" : "radioLooks"}></span>
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
                                            <button type="button" className={cardBankList.length == 1 && bankList.length == 0 ? "deleteCardBank show" : "deleteCardBank"} onClick={() => openDeletePopup (creditCard)}></button>
                                          </div>
                                        </div>
                                    ))}
                              </div>
                            {/* {merchantOptions.activeFor.length === 0 || merchantOptions.activeFor.indexOf("credit_card") >= 0 ?
                              <>
                              </> : <div className="body">
                                  <div className="noDetailsFound">
                                  <figure>
                                    <svg width="34" height="29" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.5 28.5H33.5L17 0L0.5 28.5ZM18.5 24H15.5V21H18.5V24ZM18.5 18H15.5V12H18.5V18Z" fill="#F1A768"/>
                                    </svg>
                                  </figure>
                                  <p>
                                    Credit card option is disabled <br/>because merchant is not activated to accept payments
                                  </p>
                                </div>
                              </div>
                              } */}
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
                              <form id="addCardForm" ref={addCardForm}>
                                <div className="formModule">
                                  <label>Card Number</label>
                                  <div className={formErrorMsg.card_num_Err ? "activeFactor error" : "activeFactor"}>
                                    <input
                                        type="text"
                                        className="creditCardText"
                                        placeholder="xxxx xxxx xxxx xxxx"
                                        onChange={cardNumberCheckHandler}
                                        value={cardNumberCheck}
                                    />
                                    {/* <div className="activate">
                                      <div className="customCheckbox">
                                        {
                                          cardBankList.length > 0 &&
                                          <input
                                              type="checkbox"
                                              name="credit"
                                              onChange={(e) =>
                                                  e.target.checked
                                                      ? setCardActivationCheckText("active")
                                                      : setCardActivationCheckText("inactive")
                                              }
                                          /> 
                                            }
                                            
                                          {cardBankList.length === 0 && 
                                          <input
                                              type="checkbox"
                                              name="credit yyy"
                                              defaultChecked
                                              onChange={(e) =>
                                                  e.target.checked
                                                      ? setCardActivationCheckText("active")
                                                      : setCardActivationCheckText("inactive")
                                              }
                                              // checked={cardActivationCheck}
                                          /> }
                                        <span></span>
                                      </div>
                                      {" "}
                                      Active
                                    </div> */}
                                  </div>

                                  {formErrorMsg.card_num_Err && <p className="errorMsg">{formErrorMsg.card_num_Err}</p>}
                                </div>
                                <div className="formModule">
                                  <label>Card Holder's Name</label>
                                  <input
                                      type="text"
                                      placeholder="Ex. Adam Smith"
                                      maxLength={50}
                                      onChange={cardNameCheckHandler}
                                      value={cardNameCheck}
                                      className={formErrorMsg.card_name_Err ? "error" : ""}
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
                                        className={formErrorMsg.card_exp_Err ? "error" : ""}
                                    />
                                    {formErrorMsg.card_exp_Err && <p className="errorMsg">{formErrorMsg.card_exp_Err}</p>}
                                  </div>
                                  <div className="half formModule">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        onChange={cardCvvCheckHandler}
                                        value={cardCvvCheck}
                                        className={formErrorMsg.card_cvv_Err ? "error" : ""}
                                    />
                                    {formErrorMsg.card_cvv_Err && <p className="errorMsg">{formErrorMsg.card_cvv_Err}</p>}
                                  </div>
                                </div>

                                <div className="text-center">
                                  <button className="orangeBtn" onClick={(e)=>saveCardData(e)} ref={addCardBtn}>
                                    <img src={plus} alt=""/> Add my Card
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                  </div>
                  
                  <div className="billing_module">
                        {/* <div className="primaryMaker" onClick={() => openChangePayModal("bank")}>
                      {bankList && bankList.length > 0 && 
                          <label>
                            <div className="circleRadio">
                              <input
                                  type="radio"
                                  name="primary"
                                  defaultChecked={primaryType === "bank" ? true : false}
                              />
                              <span></span>
                            </div>
                            <span>
                          {primaryType !== "bank" && "Make "}
                              Primary
                        </span>
                          </label>
                        }
                        </div> */}
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
                                          <div className="circleRadio">
                                            {console.log('666666', bank.last4, bank.status)}
                                            {/* <input
                                                type="radio"
                                                name="bank"
                                                value={bank.last4}
                                                onChange={() => activeCreditCard(bank)}
                                                checked={bank.status === "active"}
                                                id={i}
                                            /> */}
                                            <button 
                                              className="radioLooksButton" 
                                              value={bank.last4}
                                              onClick={() => activeCreditCard(bank)}
                                              ></button>
                                              <span className={bank.status === "active" ? "radioLooks active" : "radioLooks"}></span>
                                          </div>
                                        </label>
                                        <div className="rightside">
                                          <p>
                                            <span>Account Number</span>
                                            XXXXXXXXXXXX{bank?.last4}
                                          </p>
                                          <p className="diff routingNum">
                                            <span>Routing #</span>
                                            {bank.routing_number}
                                          </p>
                                          <div className="checking">
                                            <h4>Account type</h4>
                                            {bank.account_type}
                                          </div>
                                          <button type="button" className={bankList.length == 1 && cardBankList.length == 0 ? "deleteCardBank show" : "deleteCardBank"} onClick={() => openDeletePopup (bank)}></button>
                                        </div>
                                      </div>
                                  ))}
                            </div>
                            {/* {merchantOptions.activeFor.length === 0 || merchantOptions.activeFor.indexOf("ach") >= 0 ?
                              <>
                            </> : <div className="body"><div className="noDetailsFound">
                                  <figure>
                                    <svg width="34" height="29" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.5 28.5H33.5L17 0L0.5 28.5ZM18.5 24H15.5V21H18.5V24ZM18.5 18H15.5V12H18.5V18Z" fill="#F1A768"/>
                                    </svg>
                                  </figure>
                              <p>
                                Bank account option is disabled <br/>because merchant is not activated to accept payments
                              </p>
                            </div>
                            </div> 
                            } */}
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
                            <div className="addingForm bank">
                              <form ref={addBankForm}>
                                <div className="formModule">
                                  <label>Account Number</label>
                                  <div className={formErrorMsg.bank_acc_Err ? "activeFactor error" : "activeFactor"}>
                                    <input
                                        type="text"
                                        placeholder="xxxxxxxxx"
                                        onChange={bankAccountCheckHandler}
                                        value={bankAccountCheck}
                                    />
                                    {/* <div className="activate">
                                      <div className="customCheckbox">
                                      {
                                          bankList.length > 0 &&
                                          <input
                                              type="checkbox"
                                              name="bank"
                                              onChange={(e) =>
                                                  e.target.checked
                                                      ? setBankActivationCheckText("active")
                                                      : setBankActivationCheckText("inactive")
                                              }
                                              // checked={cardActivationCheck}
                                          />
                                            }

                                          {
                                          bankList.length === 0 &&
                                          <input
                                              type="checkbox"
                                              name="bank"
                                              defaultChecked
                                              onChange={(e) =>
                                                  e.target.checked
                                                      ? setBankActivationCheckText("active")
                                                      : setBankActivationCheckText("inactive")
                                              }
                                              // checked={cardActivationCheck}
                                          />}
                                        <span></span>
                                      </div>
                                      {" "}
                                      Active
                                    </div> */}
                                  </div>
                                  {formErrorMsg.bank_acc_Err && <p className="errorMsg">{formErrorMsg.bank_acc_Err}</p>}
                                </div>
                                <div className="formModule">
                                  <label>Account Holder's Name</label>
                                  <input
                                      type="text"
                                      placeholder="Ex. Adam Smith"
                                      maxLength={100}
                                      onChange={bankNameCheckHandler}
                                      value={bankNameCheck}
                                      className={formErrorMsg.bank_name_Err ? "error" : ""}
                                  />
                                  {formErrorMsg.bank_name_Err && <p className="errorMsg">{formErrorMsg.bank_name_Err}</p>}
                                </div>
                                <div className="halfDivForm">
                                  <div className="half formModule routing">
                                    <label>Routing #</label>
                                    <input
                                        type="text"
                                        onChange={bankRoutingCheckHandler}
                                        value={bankRoutingCheck}
                                        className={formErrorMsg.bank_routing_err ? "error" : ""}
                                    />
                                    {formErrorMsg.bank_routing_err && <p className="errorMsg">{formErrorMsg.bank_routing_err}</p>}
                                  </div>
                                  <div className="half formModule acType">
                                    <label>Account Type</label>
                                    <select className="selectBox" onChange={bankAccountTypeHandler} value={bankAccountType}>
                                      <option value="checking">Checking</option>
                                      <option value="savings">Savings</option>
                                      <option value="business_checking">Business Checking</option>
                                    </select>
                                    {formErrorMsg.bank_account_type && <p className="errorMsg">{formErrorMsg.bank_account_type}</p>}
                                  </div>
                                </div>
                                {bankAccountType == "business_checking" ?
                                <div className="formModule">
                                  <label>Company Name</label>
                                  <input
                                      type="text"
                                      placeholder="Enter company name"
                                      onChange={companyNameHandel}
                                      value={companyName}
                                  />
                                  {formErrorMsg.company_name && <p className="errorMsg">{formErrorMsg.company_name}</p>}
                                </div>
                                : "" }
                                <div className="text-center">
                                  <button className="orangeBtn" onClick={saveBankData} ref={addBankBtn} disabled={isLoader}>
                                    <img src={plus} alt=""/> Add my Bank Account
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                  </div>
                </>
              : <div className="noDetailsFound">
              <figure>
                <svg width="34" height="29" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 28.5H33.5L17 0L0.5 28.5ZM18.5 24H15.5V21H18.5V24ZM18.5 18H15.5V12H18.5V18Z" fill="#F1A768"/>
                </svg>
              </figure>
              <p>
                Billing option is disabled because <br/>merchant is not activated to accept payments
              </p>
            </div>}
            </div>
            : <div className="importBillingError f-1 d-flex f-column f-align-center f-justify-center">
              <p>Billing details is importing; <br/>Please try again after some time.</p>
            </div>
        }
        </div>
      </div>
      {console.log("deleteCardBank", deleteCardBank)}
      {deleteConfirmPopup ? 
        <ConfirmBox
          type="redDeletPopup"
          callback={(isConfirmed) => deleteConfirm(isConfirmed)} 
          message={"Are you sure you want to delete this " + deleteCardBank.accountType + "?"}
        />
        : ""}
    </>
  );
};

export default Billing;
