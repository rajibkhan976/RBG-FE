import React, {useEffect, useRef, useState} from "react";
import {ErrorAlert, SuccessAlert} from "../../../messages";
import card from "../../../../../assets/images/card.svg";
import bank_active from "../../../../../assets/images/bankActive.svg";
import bank_inactive from "../../../../../assets/images/banks.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import payMode from "../../../../../assets/images/paymode.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import noDataIcon from "../../../../../assets/images/noData_icon.svg"
import Loader from "../../../Loader";

import {BillingServices} from "../../../../../services/billing/billingServices";
import {setTimeout} from "timers";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../../../actions/types";
let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let currentMonth = currentTime.getMonth() + 1;

const BillingOverview = (props) => {
    // {console.log('billing props', props)}
    const addCardBtn = useRef(null);
    const addBankBtn = useRef(null);
    const [newPayModal, setNewPayModal] = useState(false);
    const [cardBankList, setCardBankList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [addLoader, setAddLoader] = useState(false);
    const [newPayTab, setNewPayTab] = useState(false);
    const [monthError, setMonthError] = useState(false);
    // const [cardNumberOn, setCardNumberOn] = useState("");
    const [cardNumberCheck, setCardNumberCheck] = useState("");
    const [cardExpairyCheck, setCardExpairyCheck] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isPrimary, setIsPrimay] = useState({
        type: 'card',
        billingId: ''
    });
    const dispatch = useDispatch();
    const [newCardState, setNewCardState] = useState({
        contact: props.contactId,
        card_number: '',
        expiration_year: '',
        expiration_month: '',
        cvv: '',
        cardholder_name: '',
        status: 'active'
    });
    const [newBankState, setNewBankState] = useState({
        contact: props.contactId,
        routing_number: '',
        account_number: '',
        account_holder: '',
        account_type: 'checking',
        company_name: '',
        status: 'active'
    });
    const [newPayHasError, setNewPayHasError] = useState(false);
    const [newPayErrors, setNewPayErrors] = useState({
        contactId: '',
        status: '',
        card_number: '',
        expiration_year: '',
        expiration_month: '',
        expiration_date: '',
        cvv: '',
        cardholder_name: '',
        routing_number: '',
        account_number: '',
        account_holder: '',
        account_type: '',
        card_details_invalid: '',
        bank_details_invalid: '',
        primary_invalid: '',
        bank_account_type: '',
        company_name: ''
    });

    const makePrimaryMethod = (e, value) => {
        if (props.contactId && value) {
            let payload = {
                contactID: props.contactId,
                accountType: value,
            };

            try {
                BillingServices.makePrimary(payload);
            } catch (error) {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    primary_invalid: error.message,
                }));
            } finally {
                setIsPrimay({
                    type: value,
                    billingId: e
                });
            }
        }
    };

    const fetchCardBank = async () => {
        let cardBanksList;

        try {
            setIsLoader(true);
            let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
            cardBanksList = cardBankResponce;
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
                // if (filterCardBank) {
                //     setIsPrimay({
                //         type: cardBankResponce.primary,
                //         billingId: filterCardBank[0]._id
                //     });
                //     setNewPayTab(cardBankResponce.primary)
                // }

                cardBankResponce.banks.forEach((bank) => {
                    if (bank.status == "active") {
                        setIsPrimay({
                            type: "bank",
                            billingId: bank._id
                        });
                        setNewPayTab("bank")
                    }
                })
                
                cardBankResponce.cards.forEach((card) => {
                    if (card.status == "active") {
                        setIsPrimay({
                            type: "card",
                            billingId: card._id
                        });
                        setNewPayTab("card")
                    }
                })
            }
        } catch (error) {
        } finally {
            if ((cardBanksList.banks.length === 0 && cardBanksList.cards.length === 0) || (!cardBanksList.primary || cardBanksList.primary === null)) {
                
                setNewPayTab('card')
            }
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

            if(type == "card") {
                let cards = cardBankList;
                cards.forEach(function(card, i){
                    if(payItem._id == card._id) {
                        card.status = "active"
                    } else {
                        card.status = "inactive"
                    }
                });
                let banks = bankList;
                bankList.forEach(function(bank, i){
                    bank.status = "inactive"
                });
                setCardBankList(cards);
                setBankList(banks);
            } else {
                let banks = bankList;
                banks.forEach(function(bank, i){
                    if(payItem._id == bank._id) {
                        bank.status = "active"
                    } else {
                        bank.status = "inactive"
                    }
                });
                let cards = cardBankList;
                cards.forEach(function(card, i){
                    card.status = "inactive"
                });
                setCardBankList(cards);
                setBankList(banks);
            }

        } catch (error) {
        } finally {
            setIsLoader(false);
        }
    };

    const changeAddTab = (type) => {
        setNewPayTab(type)
    }
    // CARD NUMBER CHECK
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
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    card_number: "",
                }));
                return cardString;
            } else {
                if (isAmex || isAmexTwo || isAmexThree) {
                    cardString = "isAmex";
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_number: "",
                    }));
                    return cardString;
                } else if (isVisa || isVisaTwo || isVisaThree) {
                    cardString = "isVisa";
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_number: "",
                    }));
                    return cardString;
                } else if (isMast || isMastThree || isMastTwo) {
                    cardString = "isMast";
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_number: "",
                    }));
                    return cardString;
                } else if (isDisc || isDiscTwo || isDiscThree) {
                    cardString = "isDisc";
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_number: "",
                    }));
                    return cardString;
                } else {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_number: "Card number is not valid.",
                    }));
                }
            }
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                card_number: "Card number is not valid.",
            }));
        }
    };
    const cardNumberCheckHandler = (e) => {
        let val = e.target.value;
        if (val.length < 24) {
            var formattedCardNumber = val.replace(/[^\d]/g, "");

            var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
            if (cardNumberSections) {
                // console.log("formattedCardNumber", formattedCardNumber);
                formattedCardNumber = cardNumberSections.join(" ");
                setCardNumberCheck(formattedCardNumber);
                var cardNumberChanged = formattedCardNumber.replace(/[^\d ]/g, "");
                setNewCardState({
                    ...newCardState,
                    card_number: cardNumberChanged
                });
                // console.log("errors:::", newPayErrors);
            }
            if (e.target.value === "") {
                setNewCardState({
                    ...newCardState,
                    card_number: ""
                });
                setCardNumberCheck('');
            }
        }

        if (val.length > 16) {
            setNewPayErrors(errorMessage => ({
                ...errorMessage,
                card_number: ""
            }))
            setNewPayHasError(false);
        }
    };
    // CARD NUMBER CHECK
    // CARD NAME CHECK
    const cardNameCheckHandler = (e) => {
        const re = /^[a-zA-Z ]*$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            if (e.target.value.length === 0) {
                setNewCardState({
                    ...newCardState,
                    cardholder_name: e.target.value
                })
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    cardholder_name: "Please enter card holder's name.",
                }))
            } else {
                setNewCardState({
                    ...newCardState,
                    cardholder_name: e.target.value
                })
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    cardholder_name: "",
                }))
            }
        }
    };
    // CARD NAME CHECK

    // CARD EXPIRY CHECK
    const cardExpairyCheckHandler = (e) => {
        let cardExpairy = e.target.value;

        if (cardExpairy !== "" && cardExpairy.length) {
            if (cardExpairy[0] > 1)
                cardExpairy = "0" + cardExpairy[0]
        }
        if (cardExpairy.length === 0 || cardExpairy.length < 7) {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                expiration_date: "Card expiry date is not valid.",
            }));
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                expiration_date: "",
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
        setNewCardState({
            ...newCardState,
            expiration_month: cardExpairySectionsMonth,
            expiration_year: cardExpairySectionsYear,
        });
    };
    // CARD EXPIRY CHECK

    // CARD CVV CHECK
    const cardCvvCheckHandler = (e) => {
        let cardCvv = e.target.value;
        var formattedCardCvv = cardCvv.replace(/[^\d]/g, "");
        formattedCardCvv = formattedCardCvv.substring(0, 4);

        setNewCardState({
            ...newCardState,
            cvv: formattedCardCvv
        });
    };
    // CARD CVV CHECK

    // SAVE NEW CARD
    const saveNewCard = async (e) => {
        e.preventDefault()

        let cardError;
        let cardPayload;

        const cardExpairyYearCheckFn = () => {
            let inputYear = newCardState.expiration_year;
            if (inputYear >= currentYear) {
                return inputYear;
            } else if (inputYear == currentYear) {
                if (newCardState.expiration_month > currentMonth) {
                    return inputYear;
                } else {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        expiration_date: "Card expiry date is not valid.",
                    }));
                    cardError = true;
                    return false;
                }
            } else {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    expiration_date: "Card expiry date is not valid.",
                }));
                cardError = true;
                return false;
            }
        };

        const cardExpairyMonthCheckFn = () => {
            let inputMonth = newCardState.expiration_month;

            if (inputMonth >= currentMonth) {
                //console.log(inputMonth);
                if (inputMonth <= 12) {
                    return inputMonth;
                } else {
                    setMonthError(true);
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        expiration_date: "Card expiry date is not valid.",
                    }));
                    cardError = true;
                    return false;
                }
            } else if (inputMonth <= currentMonth && inputMonth.length > 0) {
                if (newCardState.expiration_year > currentYear) {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        expiration_date: "",
                    }));
                    return inputMonth;
                } else {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        expiration_date: "Card expiry date is not valid.",
                    }));
                    cardError = true;
                    return false;
                }
            } else if (inputMonth == "00" || inputMonth === 0) {
                if (inputMonth.length > 0) {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        expiration_date: "Card expiry date is not valid.",
                    }));
                    cardError = true;
                    return false;
                } else {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        expiration_date: "Card expiry date is not valid.",
                    }));
                    cardError = true;
                    return false;
                }
            } else {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    expiration_date: "Card expiry date is not valid.",
                }));
                cardError = true;
                return false;
            }
        };

        const expiration_year = cardExpairyYearCheckFn();
        const expiration_month = cardExpairyMonthCheckFn();
        

        if (newCardState.card_number.length < 17) {
            cardError = true;

            setNewPayErrors(errorMessage => ({
                ...errorMessage,
                card_number: "Please provide a valid card number."
            }))
            setNewPayHasError(true)
        } else {
            cardError = false;
            setNewPayErrors(errorMessage => ({
                ...errorMessage,
                card_number: ""
            }))
            setNewPayHasError(false);
        }
        if (newCardState.cardholder_name.trim() === "") {
            cardError = true;

            setNewPayErrors(errorMessage => ({
                ...errorMessage,
                cardholder_name: "Please provide a valid card holder's name"
            }))
            setNewPayHasError(true)
        }
        if (newCardState.expiration_month.trim() === "" || newCardState.expiration_year.trim() === "") {
            cardError = true;

            setNewPayErrors(errorMessage => ({
                ...errorMessage,
                expiration_date: "Please provide a valid card expiration date"
            }))
            setNewPayHasError(true)
        }
        let inputMonth = newCardState.expiration_month;
        if (inputMonth >= currentMonth) {
            if (inputMonth <= 12) {
            } else {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    expiration_date: "Card expiry date is not valid.",
                }));
                cardError = true;
            }
        }

        // CREATE NEW CARD PAYLOAD
        cardPayload = newCardState.card_number.trim() !== "" && expiration_year !== undefined && expiration_month !== undefined && newCardState.cardholder_name.trim() !== "" ? {
            contact: newCardState.contact,
            card_number: newCardState.card_number.split(" ").join(""),
            expiration_year: newCardState.expiration_year,
            expiration_month: newCardState.expiration_month,
            cvv: newCardState.cvv.trim() !== "" ? newCardState.cvv : "",
            cardholder_name: newCardState.cardholder_name,
            status: "active"
        } : ""

        console.log("Error messageeeeeeeeeeeeeeeeeeeeeeeeeeeee ", newPayErrors, newCardState.expiration_month, currentMonth);

        if (!cardError && !newPayHasError && (newCardState.expiration_month >= currentMonth)) {
            setAddLoader(true)
            console.log('oo');
            try {
                let cardBankResponce = await BillingServices.addCard(cardPayload);

                if (cardBankResponce) {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_details_invalid: "",
                    }));

                    setSuccessMessage("Card successfully added!")

                    setTimeout(() => {
                        setSuccessMessage("")
                    }, 2000);
                    setNewPayHasError(false)
                    setNewPayModal(false);
                    makePrimaryMethod(cardBankResponce._id, "card");

                    setNewPayErrors({
                        contactId: '',
                        status: '',
                        card_number: '',
                        expiration_year: '',
                        expiration_month: '',
                        expiration_date: '',
                        cvv: '',
                        cardholder_name: '',
                        routing_number: '',
                        account_number: '',
                        account_holder: '',
                        account_type: '',
                        card_details_invalid: '',
                        bank_details_invalid: '',
                        primary_invalid: '',
                        bank_account_type: '',
                        company_name: ''
                    })
                    setTimeout(() => {
                        fetchCardBank();
                    }, 200)
                }
            } catch (error) {
                cardError = true;
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    card_details_invalid: error.message,
                }));
                setTimeout(() => {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        card_details_invalid: "",
                    }));
                }, 5000)
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

                setAddLoader(false)
            }
        }
    }
    // SAVE NEW CARD

    // BANK ACCOUNT CHECK
    const bankAccountCheckHandler = (e) => {
        let accountNumber = e.target.value;
        if (accountNumber.length === 0 || accountNumber.length < 3 || accountNumber.length > 20) {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                account_number: "Please provide proper account number.",
            }));
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                account_number: "",
            }));
        }
        var formattedAccountNumber = accountNumber.replace(/[^\d]/g, "");
        setNewBankState({
            ...newBankState,
            account_number: formattedAccountNumber
        });
    };
    // BANK ACCOUNT CHECK

    // BANK HOLDER NAME CHECK
    const bankNameCheckHandler = (e) => {
        const re = /^[a-zA-Z ]*$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            if (e.target.value.length === 0) {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    account_holder: "Please enter proper Account holder's name",
                }));
            } else {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    account_holder: "",
                }));
            }
            setNewBankState({
                ...newBankState,
                account_holder: e.target.value
            });
        }
    };
    // BANK HOLDER NAME CHECK

    // BANK ROUTING NUMBER CHECK
    const bankRoutingCheckHandler = (e) => {
        let bankRouting = e.target.value;

        if (e.target.value.length === 0 || e.target.value.length < 9) {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                routing_number: "Please enter proper Routing",
            }));
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                routing_number: "",
            }));
        }
        var formattedBankRouting = bankRouting.replace(/[^\d]/g, "");
        formattedBankRouting = formattedBankRouting.substring(0, 9);
        setNewBankState({
            ...newBankState,
            routing_number: formattedBankRouting
        });
    };
    // BANK ROUTING NUMBER CHECK

    const companyNameHandeler = (e) => {
        let name = e.target.value;
        if (name === "") {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                company_name: "Please enter company name",
            }));
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                company_name: "",
            }));
        }
        setNewBankState({
            ...newBankState,
            company_name: name
        });
    }



    // SAVE NEW BANK ACCOUNT
    const saveNewBank = async (e) => {
        e.preventDefault();

        let bankError = false;

        if (newBankState.routing_number === "" || newBankState.routing_number < 9) {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                routing_number: "Please enter proper Routing",
            }));
            bankError = true
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                routing_number: "",
            }));
        }
        if (newBankState.account_holder.trim() === "" || newBankState.account_holder.length === 0) {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                account_holder: "Please enter proper Account holder's name",
            }));
            bankError = true
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                account_holder: "",
            }));
        }

        if (newBankState.account_number.length === 0) {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                account_number: "Please provide proper account number.",
            }));
            bankError = true
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                account_number: "",
            }));
        }
        if (!newBankState.account_type === "") {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                bank_account_type: "Please provide proper account account type.",
            }));
            bankError = true
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                bank_account_type: "",
            }));
        }
        if (newBankState.account_type === "business_checking" && newBankState.company_name === "") {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                company_name: "Please enter company name.",
            }));
            bankError = true
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                company_name: "",
            }));
        }

        let company_name = e.target.value;
        if (company_name === "") {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                company_name: "Please enter company name",
            }));
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                company_name: "",
            }));
        }

        let bankPayload = newBankState.routing_number.trim() !== "" && newBankState.account_number.trim() !== "" && newBankState.account_holder.trim() !== "" ? {
            contact: props.contactId,
            routing_number: newBankState.routing_number,
            account_number: newBankState.account_number,
            account_holder: newBankState.account_holder,
            account_type: newBankState.account_type,
            company_name: newBankState.company_name,
            status: "active",
        } : bankError = true

        if (!bankError && !newPayHasError) {
            setAddLoader(true)

            try {
                let bankResponse = await BillingServices.addBank(bankPayload);

                if (bankResponse) {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        bank_details_invalid: "",
                    }));

                    setSuccessMessage("Account successfully added!")

                    setTimeout(() => {
                        setSuccessMessage("")
                    }, 2000);
                    setNewPayHasError(false)

                    setNewPayModal(false)
                    makePrimaryMethod(bankResponse._id, "bank");

                    setNewPayErrors({
                        contactId: '',
                        status: '',
                        card_number: '',
                        expiration_year: '',
                        expiration_month: '',
                        expiration_date: '',
                        cvv: '',
                        cardholder_name: '',
                        routing_number: '',
                        account_number: '',
                        account_holder: '',
                        account_type: '',
                        card_details_invalid: '',
                        bank_details_invalid: '',
                        primary_invalid: '',
                        bank_account_type: '',
                        company_name: ''
                    })
                    setTimeout(() => {
                        fetchCardBank();
                    }, 200)
                    
                }
            } catch (error) {
                setNewPayErrors((errorMessage) => ({
                    ...errorMessage,
                    bank_details_invalid: error.message,
                }));
                setTimeout(() => {
                    setNewPayErrors((errorMessage) => ({
                        ...errorMessage,
                        bank_details_invalid: "",
                    }));
                }, 5000);
            } finally {
                bankError = false;

                bankPayload = {
                    contact: props.contactId,
                    routing_number: "",
                    account_number: "",
                    account_holder: "",
                    account_type: "",
                    status: "active",
                };

                setNewBankState({
                    contact: props.contactId,
                    routing_number: '',
                    account_number: '',
                    account_holder: '',
                    account_type: 'checking',
                    status: 'active'
                })

                setAddLoader(false)
            }
        }
    }
    // SAVE NEW BANK ACCOUNT

    // OPEN NEW PAYMENT MODAL
    const openNewPaymentModal = (e) => {
        e.preventDefault();
        setNewPayModal(true);

        setNewCardState({
            contact: props.contactId,
            card_number: '',
            expiration_year: '',
            expiration_month: '',
            cvv: '',
            cardholder_name: '',
            status: 'active'
        })
        setNewBankState({
            contact: props.contactId,
            routing_number: '',
            account_number: '',
            account_holder: '',
            account_type: 'checking',
            status: 'inactive'
        })
        setCardNumberCheck("")
        setCardExpairyCheck("")
    }
    // OPEN NEW PAYMENT MODAL
    const bankAccountTypeHandler = (e) => {
        let accountType = e.target.value;
        if (accountType === "") {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                bank_account_type: "Please enter proper account type",
            }));
        } else {
            setNewPayErrors((errorMessage) => ({
                ...errorMessage,
                bank_account_type: "",
            }));
        }
        setNewBankState((previousState) => ({
            ...previousState,
            account_type: accountType
        }));
        if (accountType != "business_checking") {
            setNewBankState({
                ...newBankState,
                account_type: accountType,
                company_name: ""
            });
        }
    }

    

    useEffect(() => {
        fetchCardBank()
    }, []);

    useEffect(() => {
        broadcastToParent();
    }, [isPrimary]);

    const broadcastToParent = () => {
        props.changeDefaultPay(isPrimary);
    };

    let zIndexBody = useSelector((state) => state.modal.zIndexBody);

    return (
        <>
            {
                successMessage !== "" && <SuccessAlert extraClass="billingOverviewSuccess" message={successMessage}/>
            }
            <div
                className={props.isNoCardBankFlagErr ? "cartProductInner productBillingOverview error" : "cartProductInner productBillingOverview"}>
                <header className="informHeader d-flex f-align-center f-justify-between">
                    <h5>Billing Overview</h5>

                    {!isLoader && <button
                        className="btn addPaymentInfo"
                        onClick={(e) => {
                            openNewPaymentModal(e);
                            dispatch({
                                type: actionTypes.MODAL_COUNT_INCREMENT,
                                area: 'bodyModal'
                            })                            
                        }}
                    >
                        + Add
                    </button>}
                </header>

                <div className={isPrimary.type == "bank" ? "bodytransactionForm bodyProductPayModes d-flex f-column reverseWrap" : "bodytransactionForm bodyProductPayModes d-flex f-column"}>
                    {isLoader && <Loader/>}
                    {cardBankList &&
                    !cardBankList.length &&
                    bankList &&
                    !bankList.length ? <div className="noDataSec">
                        <img src={noDataIcon} alt=""/>
                        <h2>No Card/Bank Found</h2>
                        <p>No billing details have been created yet</p>
                    </div> : ''}
                    <div className="cardBankWrap">
                        {cardBankList && cardBankList.length ? <p className="paymentTypes">Cards</p> : ''}
                        <div className="chooseTransactionType paymentTypes">

                            {cardBankList &&
                                cardBankList.length > 0 &&
                                cardBankList.map((cardItem, i) => (
                                    <label
                                        className={
                                            cardItem.status === "active"
                                                ? "paymentType active"
                                                : "paymentType"
                                        }
                                        key={i}
                                    >
                                        <span className="circleRadio">
                        {/* <input
                            type="radio"
                            name="billingTransaction"
                            onClick={() => changeDefaultPay(cardItem, "card")}
                            checked={
                                cardItem.status === "active"
                            }
                        />
                        <span></span> */}
                        <button type="button" 
                        className="radioLooksButton" 
                        onClick={() => changeDefaultPay(cardItem, "card")}
                        ></button>
                        <span className={cardItem.status === "active" ? "radioLooks active" : "radioLooks"}></span>
                        </span>
                                            <span className="cardImage">
                            <img src={cardItem.status === "active" ? cardActive : card}
                                alt="card"/>
                        </span>
                                            <span className="paymentModuleInfos">
                            <span className="accNumber">
                            Credit Card ending with <strong>{cardItem?.last4}</strong>
                            </span>
                            <span className="accinfod">
                            Expires {cardItem.expiration_month}/
                                {cardItem.expiration_year}
                            </span>
                        </span>
                                    </label>
                                ))}
                        </div>
                    </div>
                        
                    <div className="cardBankWrap">
                        {bankList && bankList.length ? <p className="paymentTypes">Bank</p> : ''}
                        <div className="chooseTransactionType paymentTypes">
                            {/* {//  //  console.log("bankList", bankList)} */}
                            {bankList &&
                                bankList.length > 0 &&
                                bankList.map((bankItem, i) => (
                                    <label
                                        className={
                                            bankItem.status === "active"
                                                ? "paymentType active"
                                                : "paymentType"
                                        }
                                        key={i}
                                    >
                        <span className="circleRadio">
                            {/* <input
                                type="radio"
                                name="billingTransaction"
                                onClick={(e) => changeDefaultPay(bankItem, "bank")}
                                checked={
                                    bankItem.status === "active"
                                }
                            /> */}
                            <button type="button" 
                            className="radioLooksButton" 
                            onClick={(e) => changeDefaultPay(bankItem, "bank")}
                            ></button>
                            <span className={bankItem.status === "active" ? "radioLooks active" : "radioLooks"}></span>
                            {/* {console.log(
                            ":::BANK:::",
                            isPrimary.type === "bank" && (isPrimary.billingId === bankItem._id)
                            )} */}
                            
                        </span>
                                        <span className="cardImage">
                        <img
                            src={bankItem.status === "active" ? bank_active : bank_inactive}
                            alt="card"/>
                    </span>
                                        <span className="paymentModuleInfos">
                        <span className="accNumber">
                            Bank account ending with <strong>{bankItem?.last4}</strong>
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
            </div>

            {newPayModal && (
                <div className="modalBackdrop modalNewPay" style={{zIndex: zIndexBody}} >
                    {addLoader && <Loader/>}
                    <div className="modalBackdropBg" onClick={(e) => {
                                    e.preventDefault();
                                    setNewPayModal(false);
                                }}></div>
                    <div className="slickModalBody">
                        <div className="slickModalHeader">
                            <button
                                className="topCross"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNewPayModal(false);
                                }}
                            >
                                <img src={crossTop} alt=""/>
                            </button>
                            <div className="circleForIcon">
                                <img src={payMode} alt=""/>
                            </div>
                            <h3 className="courseModalHeading">Add new billing</h3>
                            <p className="courseModalPara">
                                Add a Credit card or Bank details for transactions.
                            </p>
                        </div>
                        {
                            newPayErrors.card_details_invalid ?
                                <div className="importCPaymentError d-flex f-align-center f-justify-center">
                                    <p>{newPayErrors.card_details_invalid}</p>
                                </div> : newPayErrors.bank_details_invalid ?
                                    <div className="importCPaymentError d-flex f-align-center f-justify-center">
                                        <p>{newPayErrors.bank_details_invalid}</p>
                                    </div> : ""
                        }
                        <div className="payModalDetails">
                            <div className="choosePaymentInfo">
                                <label>
                                    <div className="circleRadio">
                                        <input
                                            type="radio"
                                            name="transactionType"
                                            defaultChecked={newPayTab === "card"}
                                            onChange={() => changeAddTab("card")}
                                        />
                                        {/* {console.log("in body check:::>>>", newPayTab)} */}
                                        <span></span>
                                    </div>
                                    {" "}
                                    Card
                                </label>
                                <label>
                                    <div className="circleRadio">
                                        <input
                                            type="radio"
                                            name="transactionType"
                                            defaultChecked={newPayTab === "bank"}
                                            onChange={() => changeAddTab("bank")}
                                        />
                                        <span></span>
                                    </div>
                                    {" "}
                                    Bank Account
                                </label>
                            </div>

                            {newPayTab === "card" && (
                                <div className="posSellingForm">
                                    <div className="modalForm">
                                        <div className="formBodyNew">
                                            <div
                                                className={newPayErrors.card_number !== "" ? "cmnFormRow error" : "cmnFormRow"}>
                                                <label>Card Number</label>
                                                <div className="cmnFormField">
                                                    <input
                                                        className="cmnFieldStyle"
                                                        type="text"
                                                        placeholder="xxxx xxxx xxxx xxxx"
                                                        name=""
                                                        onChange={cardNumberCheckHandler}
                                                        value={cardNumberCheck}
                                                    />
                                                </div>
                                                {newPayErrors.card_number !== "" &&
                                                    <p className="errorMsg">{newPayErrors.card_number}</p>}
                                            </div>

                                            <div
                                                className={newPayErrors.cardholder_name !== "" ? "cmnFormRow error" : "cmnFormRow"}>
                                                <label>Card Holder Name</label>
                                                <div className="cmnFormField">
                                                    <input
                                                        type="text"
                                                        onChange={cardNameCheckHandler}
                                                        maxLength={50}
                                                        placeholder="Ex. Adam Smith"
                                                        className="cmnFieldStyle"
                                                        name=""
                                                        value={newCardState.cardholder_name}
                                                    />
                                                </div>
                                                {newPayErrors.cardholder_name !== "" &&
                                                    <p className="errorMsg">{newPayErrors.cardholder_name}</p>}
                                            </div>

                                            <div className="cmnFormRow">
                                                <div
                                                    className={newPayErrors.expiration_date !== "" ? "cmnFormCol error" : "cmnFormCol"}>
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
                                                    {newPayErrors.expiration_date !== "" &&
                                                        <p className="errorMsg">{newPayErrors.expiration_date}</p>}
                                                </div>
                                                <div className="cmnFormCol">
                                                    <label>CVV</label>
                                                    <div
                                                        className={newPayErrors.cvv !== "" ? "cmnFormField error" : "cmnFormField"}>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            className="cmnFieldStyle"
                                                            onChange={cardCvvCheckHandler}
                                                            value={newCardState.cvv}
                                                        />
                                                    </div>
                                                    {newPayErrors.cvv !== "" &&
                                                        <p className="errorMsg">{newPayErrors.cvv}</p>}
                                                </div>
                                            </div>

                                            <div className="modalbtnHolder">
                                                <button
                                                    type="button"
                                                    className="saveNnewBtn orangeBtn"
                                                    onClick={saveNewCard}
                                                    ref={addCardBtn}
                                                >
                                                    <img src={pluss} alt=""/> Add my Card
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {newPayTab === "bank" && (
                                <div className="posSellingForm">
                                    <div className="modalForm">
                                        <div className="formBodyNew">
                                            <div className="cmnFormRow">
                                                <label>Account Number</label>
                                                <div
                                                    className={newPayErrors.account_number ? "cmnFormField error" : "cmnFormField"}>
                                                    <input
                                                        type="text"
                                                        placeholder="xxxxxxxxxx"
                                                        className="cmnFieldStyle"
                                                        name=""
                                                        onChange={bankAccountCheckHandler}
                                                        value={newBankState.account_number}
                                                    />
                                                </div>
                                                {newPayErrors.account_number &&
                                                    <p className="errorMsg">{newPayErrors.account_number}</p>}
                                            </div>

                                            <div className="cmnFormRow">
                                                <label>Account Holder Name</label>
                                                <div
                                                    className={newPayErrors.account_holder ? "cmnFormField error" : "cmnFormField"}>
                                                    <input
                                                        type="text"
                                                        placeholder="Ex. Adam Smith"
                                                        className="cmnFieldStyle"
                                                        maxLength={100}
                                                        name=""
                                                        onChange={bankNameCheckHandler}
                                                        value={newBankState.account_holder}
                                                    />
                                                </div>
                                                {newPayErrors.account_holder &&
                                                    <p className="errorMsg">{newPayErrors.account_holder}</p>}
                                            </div>

                                            <div className="cmnFormRow">
                                                <div
                                                    className={newPayErrors.routing_number ? "cmnFormCol error" : "cmnFormCol"}>
                                                    <label>Routing #</label>
                                                    <div className="cmnFormField">
                                                        <input
                                                            type="text"
                                                            className="cmnFieldStyle"
                                                            name=""
                                                            onChange={bankRoutingCheckHandler}
                                                            value={newBankState.routing_number}
                                                        />
                                                    </div>
                                                    {newPayErrors.routing_number &&
                                                        <p className="errorMsg">{newPayErrors.routing_number}</p>}
                                                </div>
                                                <div className="cmnFormCol">
                                                    <label>Account Type</label>
                                                    <div className="cmnFormField">
                                                        <select className="cmnFieldStyle selectBox"
                                                                onChange={bankAccountTypeHandler}
                                                                // value={newBankState.account_type}
                                                                >
                                                            <option value="checking">Checking</option>
                                                            <option value="savings">Savings</option>
                                                            <option value="business_checking">Business Checking</option>
                                                        </select>
                                                        {newPayErrors.bank_account_type &&
                                                            <p className="errorMsg">{newPayErrors.bank_account_type}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            { newBankState.account_type === "business_checking" ? 
                                            <div className="cmnFormRow">
                                                <label>Company Name</label>
                                                <div
                                                    className={newPayErrors.company_name ? "cmnFormField error" : "cmnFormField"}>
                                                    <input
                                                        type="text"
                                                        placeholder="Company name"
                                                        className="cmnFieldStyle"
                                                        maxLength={100}
                                                        name=""
                                                        value={newBankState.company_name} 
                                                        onChange={companyNameHandeler}
                                                    />
                                                </div>
                                                {newPayErrors.company_name &&
                                                    <p className="errorMsg">{newPayErrors.company_name}</p>}
                                            </div>
                                            : "" }

                                            <div className="modalbtnHolder">
                                                <button
                                                    type="reset"
                                                    className="saveNnewBtn orangeBtn"
                                                    ref={addBankBtn}
                                                    onClick={saveNewBank}
                                                >
                                                    <img src={pluss} alt=""/> &nbsp;
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
