import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cardIcon from "../../../../assets/images/card.svg";
import bankIcon from "../../../../assets/images/banks.svg";
import arrowForward from "../../../../assets/images/arrow_forward.svg";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import cross_icon from "../../../../assets/images/cross_icon.svg";
import backBlackArrow from "../../../../assets/images/backBlackArrow.svg";
import noDataIcon from "../../../../assets/images/noData_icon.svg"
import {CreditManagementServices} from '../../../../services/setup/CreditManagementServices';
import Loader from '../../../shared/Loader';
import * as actionTypes from "../../../../actions/types";
import {utils} from '../../../../helpers';


const initialCardState = {
    cardNumber: "",
    cardHolderName: "",
    cardExpiryDate: "",
    cardCvv: "",
    isOrgBillingId: ""
}

const initialBankState = {
    bankAccountNumber: "",
    bankHolderName: "",
    routingNumber: "",
    accountType: ""
}

const PackagePaymentModal = (props) => {
    const [order, setOrder] = useState(props.package);
    const [showForm, setShowForm] = useState(false);
    const [editCardPart, setEditCardPart] = useState(true);
    const [editBankPart, setEditBankPart] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [formErrors, setFormErrors] = useState({ ...initialCardState, ...initialBankState });
    const [isLoader, setIsLoader] = useState(false);
    const [orgBillingId, setOrgBillingId] = useState(null);
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user.data);



    const cardForm = useRef();
    const bankForm = useRef();

    const showFormHandler = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
        setFormErrors({ ...initialCardState });
    }
    const openCardForm = (e) => {
        e.preventDefault();
        setEditCardPart(true);
        setEditBankPart(false);
    }
    const openBankForm = (e) => {
        e.preventDefault();
        setEditBankPart(true);
        setEditCardPart(false);
    }

    useEffect(() => {
        //Fetch cards & banks
        fetchCardBank();
    }, [])

    const fetchCardBank = async () => {
        try {
            setIsLoader(true);
            const response = await CreditManagementServices.fetchCardBanks();
            console.log('card bank list', response);

            //cards
            if (response.hasOwnProperty('cards')) {
                setCardList(response.cards);
                //set billing id
                let isPrimaryCard = response.cards.filter((el) => el.isPrimary)
                if (isPrimaryCard.length) {
                    setOrgBillingId(isPrimaryCard[0]._id);
                }
            }

            //banks
            if (response.hasOwnProperty('banks')) {
                setBankList(response.banks);
                //set billing id
                let isPrimaryBank = response.banks.filter((el) => el.isPrimary)
                if (isPrimaryBank.length) {
                    setOrgBillingId(isPrimaryBank[0]._id);
                }
            }
        } catch (e) {
            console.log('Error in fetch credit packages', e);
        } finally {
            setIsLoader(false);
        }
    }

    //Credit card number
    const handleCreditCardChange = () => {
        let checkCardNumber = checkCardNumberErr(cardForm.current['cardNumber'].value);
        setFormErrors({
            ...formErrors,
            cardNumber: checkCardNumber
        })

        //Format
        let formattedCC = utils.getFormattedCardNumber(cardForm.current['cardNumber'].value);
        if (formattedCC) {
            cardForm.current['cardNumber'].value = formattedCC;
        }
    }

    //Credit card holder name
    const handleCardHolderNameChange = () => {
        let checkCardHolderName = checkCardHolderNameErr(cardForm.current['cardHolderName'].value);
        setFormErrors({
            ...formErrors,
            cardHolderName: checkCardHolderName
        })
    }

    //Credit card expiry date
    const handleCardExpiryChange = () => {
        let checkExpiryDate = checkCardExpiryDateErr(cardForm.current['cardExpiryDate'].value);
        console.log('check ex date', checkExpiryDate);
        setFormErrors({
            ...formErrors,
            cardExpiryDate: checkExpiryDate
        })
        //Format
        let formattedDate = utils.getFormattedExpiryDate(cardForm.current['cardExpiryDate'].value);
        cardForm.current['cardExpiryDate'].value = formattedDate;
    }

    //Credit card expiry date
    const handleCardCvvChange = () => {
        let checkCardCvv = checkCardCvvErr(cardForm.current['cvv'].value);
        setFormErrors({
            ...formErrors,
            cardCvv: checkCardCvv
        })
    }

    //Card number
    const checkCardNumberErr = (cardNumber) => {
        console.log(cardNumber, typeof cardNumber);
        //Validate
        let isValidCard = false;
        if (cardNumber) {
            isValidCard = utils.getValidCreditCard(cardNumber);
        }
        console.log('is valid card', isValidCard);

        return cardNumber.trim().length <= 0
            ? "Card number can not be blank"
            : cardNumber <= 0
                ? "Zero is not considered as a valid card number."
                : !isValidCard
                    ? "Card number is not valid"
                    : "";
    };

    //Card holder name
    const checkCardHolderNameErr = name => {
        let charRegex = /^[a-zA-Z\x20]+$/;
        let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        return name.trim().length <= 0
            ? "Card holder name can not be blank"
            : name.trim().length > 60
                ? "Name should have maximum 60 characters."
                : !charRegex.test(name) ?
                    "Number and special characters not allowed"
                    : isSpecialCharacterformat.test(name)
                        ? "Name should not contain any special characters" :
                        "";
    }

    //Card expiry date
    const checkCardExpiryDateErr = date => {

        let isValidDate = false;
        if (date) {
            isValidDate = utils.validateExpiryDate(date);
        }
        console.log('is valid date', isValidDate);

        return date.trim().length <= 0
            ? "Expiry date can not be blank"
            : !isValidDate
                ? "Expiry date is not valid"
                : "";
    }

    //Card CVV
    const checkCardCvvErr = cvv => {
        let cvvRegex = /^([0-9]{3})$/
        let isValidCvv = cvvRegex.test(cvv)

        return cvv.trim().length > 0 && !isValidCvv
            ? "CVV is not valid" : ""
    }


    //Validate card form
    const validateCardForm = () => {

        let isError = false;
        let formErrorsCopy = formErrors;


        //Card number
        let checkCardNumber = checkCardNumberErr(cardForm.current['cardNumber'].value);
        if (checkCardNumber) {
            isError = true;
            formErrorsCopy.cardNumber = checkCardNumber;
        }

        //Card holder name
        let checkCardHolderName = checkCardHolderNameErr(cardForm.current['cardHolderName'].value);
        if (checkCardHolderName) {
            isError = true;
            formErrorsCopy.cardHolderName = checkCardHolderName;
        }

        //Card expiry date
        let checkCardExpiryDate = checkCardExpiryDateErr(cardForm.current['cardExpiryDate'].value);
        if (checkCardHolderName) {
            isError = true;
            formErrorsCopy.cardExpiryDate = checkCardExpiryDate;
        }

        //Card CVV
        let checkCardCvv = checkCardCvvErr(cardForm.current['cvv'].value);
        if (checkCardCvv) {
            isError = true;
            formErrorsCopy.cardCvv = checkCardCvv;
        }

        //Set errors
        setFormErrors({
            ...formErrors,
            cardNumber: formErrorsCopy.cardNumber,
            cardHolderName: formErrorsCopy.cardHolderName,
            cardExpiryDate: formErrorsCopy.cardExpiryDate,
            cardCvv: formErrorsCopy.cardCvv
        });

        return !isError;
    }

    //Submit
    const saveCard = async () => {
        let isValid = validateCardForm();
        if (isValid) {
            /**
             * Submit the form
             */
            console.log('submit the form');
            let expiryDate = cardForm.current['cardExpiryDate'].value.split("/");
            let payload = {
                card_number: cardForm.current['cardNumber'].value.replace(/[^\d ]/g, ""),
                expiration_year: expiryDate[1],
                expiration_month: expiryDate[0],
                cvv: cardForm.current['cvv'].value,
                cardholder_name: cardForm.current['cardHolderName'].value,
            }

            setIsLoader(true);
            try {
                //Operation type
                let operationMethod = "insertCard";

                let insertCard = await CreditManagementServices[operationMethod](payload);
                if (insertCard) {
                    console.log('create card success', insertCard);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: `Card added successfully.`,
                        typeMessage: 'success'
                    });
                    //Redirect to the listing
                    setOrgBillingId(null);
                    fetchCardBank();
                    setShowForm(false);

                }

            } catch (e) {
                console.log("In card create error : ", e.message);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            } finally {
                setIsLoader(false);
            }
        }

    }

    //Account number
    const checkAccountNumberErr = accountNumber => {

        return accountNumber.trim().length === 0 || accountNumber.trim().length < 3 || accountNumber.trim().length > 20
            ? "Account number is not valid" : ""
    }

    //Bank holder name
    const checkBankHolderNameErr = name => {
        let charRegex = /^[a-zA-Z\x20]+$/
        let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        return name.trim().length <= 0
            ? "Card holder name can not be blank"
            : name.trim().length > 60
                ? "Name should have maximum 60 characters."
                : !charRegex.test(name) ?
                    "Number and special characters not allowed"
                    : isSpecialCharacterformat.test(name)
                        ? "Name should not contain any special characters" :
                        "";
    }

    //Routing number
    const checkRoutingNumberErr = routingNumber => {

        return routingNumber.trim().length === 0 || routingNumber.trim().length < 9
            ? "Routing number is not valid" : ""
    }

    //Handler bank account change
    const handleBankAccountNumberChange = () => {
        let checkAccountNumber = checkAccountNumberErr(bankForm.current['bankAccountNumber'].value);
        setFormErrors({
            ...formErrors,
            bankAccountNumber: checkAccountNumber
        })

        //Format
        bankForm.current['bankAccountNumber'].value = bankForm.current['bankAccountNumber'].value.replace(/[^\d]/g, "");
    }

    const handleBankHolderNameChange = () => {
        let checkBankHolderName = checkBankHolderNameErr(bankForm.current['bankHolderName'].value);
        setFormErrors({
            ...formErrors,
            bankHolderName: checkBankHolderName
        })
    }

    const handleBankRoutingNumberChange = () => {
        let checkRoutingNumber = checkRoutingNumberErr(bankForm.current['bankRoutingNumber'].value);
        setFormErrors({
            ...formErrors,
            routingNumber: checkRoutingNumber
        })

        //Format
        let formattedBankRouting = bankForm.current['bankRoutingNumber'].value.replace(/[^\d]/g, "");
        formattedBankRouting = formattedBankRouting.substring(0, 9);
        bankForm.current['bankRoutingNumber'].value = formattedBankRouting;

    }

    const bankAccountTypeHandler = (e) => {
        let accountType = e.target.value;
        if (accountType === "") {
            setFormErrors((errorMessage) => ({
                ...errorMessage,
                accountType: "Please enter proper account type",
            }));
        } else {
            setFormErrors((errorMessage) => ({
                ...errorMessage,
                bank_account_type: "",
            }));
        }
        bankForm.current['bankAccountType'].value = accountType;
    }

    //Validate card form
    const validateBankForm = () => {

        let isError = false;
        let formErrorsCopy = formErrors;


        //Bank number
        let checkAccountNumber = checkAccountNumberErr(bankForm.current['bankAccountNumber'].value);
        if (checkAccountNumber) {
            isError = true;
            formErrorsCopy.bankAccountNumber = checkAccountNumber;
        }

        //Bank holder name
        let checkBankHolderName = checkBankHolderNameErr(bankForm.current['bankHolderName'].value);
        if (checkBankHolderName) {
            isError = true;
            formErrorsCopy.bankHolderName = checkBankHolderName;
        }

        //Routing number
        let checkRoutingNumber = checkRoutingNumberErr(bankForm.current['bankRoutingNumber'].value);
        if (checkRoutingNumber) {
            isError = true;
            formErrorsCopy.routingNumber = checkRoutingNumber;
        }
        if (!bankForm.current['bankAccountType'].value === "") {
            isError = true;
            formErrorsCopy.accountType = bankForm.current['bankAccountType'].value;
        }

        //Set errors
        setFormErrors({
            ...formErrors,
            bankAccountNumber: formErrorsCopy.bankAccountNumber,
            bankHolderName: formErrorsCopy.bankHolderName,
            routingNumber: formErrorsCopy.routingNumber,
            accountType: formErrorsCopy.accountType
        });

        return !isError;
    }

    //Save bank
    const saveBank = async (e) => {
        console.log('save bank');
        e.preventDefault();

        let isValid = validateBankForm();
        if (isValid) {
            /**
             * Submit the form
             */
            console.log('submit the form');
            let payload = {
                account_number: bankForm.current['bankAccountNumber'].value,
                account_holder: bankForm.current['bankHolderName'].value,
                routing_number: bankForm.current['bankRoutingNumber'].value,
                account_type: bankForm.current['bankAccountType'].value,
            }

            setIsLoader(true);
            try {
                //Operation type
                let operationMethod = "insertBank";

                let insertBank = await CreditManagementServices[operationMethod](payload);
                if (insertBank) {
                    console.log('create bank success', insertBank);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: `Bank added successfully.`,
                        typeMessage: 'success'
                    });
                    setOrgBillingId(null);
                    //Redirect to the listing
                    fetchCardBank();
                    setShowForm(false);

                }

            } catch (e) {
                console.log("In bank create error : ", e.message);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            } finally {
                setIsLoader(false);
            }
        }
    }

    const handleCardBankChange = (element, type) => {
        console.log('el', element, cardList, bankList)

        //Filter cards
        let filterCards = cardList.filter((card, index) => {
            card.isPrimary = card._id === element._id;
            card.status = card._id === element._id ? "active" : "inactive";
            return card;
        })
        console.log('FC', filterCards);
        setCardList(filterCards);

        //Filter banks
        let filterBanks = bankList.filter((bank, index) => {
            bank.isPrimary = bank._id === element._id;
            bank.status = bank._id === element._id ? "active" : "inactive";
            return bank;
        })
        console.log('FB', filterBanks);

        setBankList(filterBanks);

        setOrgBillingId(element._id);
        setFormErrors({
            ...formErrors,
            isOrgBillingId: ""
        })
    }

    const validatePayNow = () => {

        let isError = false;
        let formErrorsCopy = formErrors;

        //Org billing id
        if (!orgBillingId) {
            isError = true;
            formErrorsCopy.isOrgBillingId = 'Please select or create a card/bank';
        }

        setFormErrors({
            ...formErrors,
            isOrgBillingId: formErrorsCopy.isOrgBillingId
        });

        return !isError;

    }

    const payNow = async () => {
        let isValid = validatePayNow();

        if (isValid) {
            let payload = {
                packageId: order._id,
                orgBillingId: orgBillingId
            }
            setIsLoader(true);
            try {
                //Operation type
                let operationMethod = "purchasePackage";
                let purchasePackage = await CreditManagementServices[operationMethod](payload);
                if (purchasePackage) {
                    console.log('purchase success', purchasePackage);
                    props.closeModal();
                    props.openPaymentSuccessModal(purchasePackage);
                    // props.fetchPackages();
                    //Update org credit point
                    dispatch({
                        type: actionTypes.USER_DATA,
                        data: {
                            ...loggedInUser,
                            credit: loggedInUser.credit + purchasePackage.credit,
                            currentPlan: order.name,
                            isPackage: true,
                            packageId: order._id
                        }
                    });
                }

            } catch (e) {
                console.log(e);
                props.openPaymentFailedModal(e.message);
            } finally {
                setIsLoader(false);
            }
        }
    }



    return (
        <React.Fragment>
            <div className="cr_modalBase">
                {isLoader ? <Loader /> : ""}
                <div className="cr_modal">
                    <button className='cr_cross' onClick={() => props.closeModal()} ><img src={cross_icon} alt="" /></button>
                    <div className="cr_modalHead">
                        <button className='cr_backBtn' onClick={() => props.closeModal()}><img src={backBlackArrow} alt="" /></button>
                        <h2>Order Summary</h2>
                    </div>
                    <div className="cr_modalBody cr_order_summery">
                        <div className="cr_leftColumn">
                            <div className="cr_packageDetails">
                                <h3>{order.name.toUpperCase()}</h3>
                                <div className="cr_creditPaymetnHolder">
                                    <div className="cr_credit">
                                        <h4>CREDIT</h4>
                                        <p>{order.credit.toLocaleString()}</p>
                                    </div>
                                    <div className="cr_payment">
                                        <h4>PAYMENT</h4>
                                        <p>{`$` + order.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={formErrors.isOrgBillingId ? "cr_paymentMethod cr_error" : "cr_paymentMethod"}>
                                <div className="cr_paymentMethodHead">
                                    <h3>Payment Method</h3>
                                    <button className="cr_addPaymentMethodBtn" onClick={showFormHandler}>{showForm ? "< Back" : "+ Add"}</button>
                                </div>
                                <div className="cr_payMethodListWrap">
                                    {!showForm &&
                                        <>
                                            {cardList.length ?
                                                <div className="cr_payMethodList">
                                                    <h3>Card</h3>
                                                    <div className="cr_payMethodListItem">
                                                        {
                                                            cardList.map((card, index) => {
                                                                return (
                                                                    <>
                                                                        <label className={card.isPrimary ? "cr_paymentType active" : "cr_paymentType"} key={'card_' + index}>
                                                                            <span className="circleRadio">
                                                                                <input type="radio" name="card" onChange={() => handleCardBankChange(card, 'card')} checked={card.isPrimary && orgBillingId === card._id} />
                                                                                <span></span>
                                                                            </span>
                                                                            <span className="cardImage">
                                                                                <img src={cardIcon} alt="card" />
                                                                            </span>
                                                                            <span className="paymentModuleInfos">
                                                                                <span className="accNumber">Credit Card ending with <strong>{card.last4}</strong></span>
                                                                                <span className="accinfod">Expires {card.expiration_month}/{card.expiration_year}</span>
                                                                            </span>
                                                                        </label>

                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div> : ''}

                                            {bankList.length ?
                                                <div className="cr_payMethodList">
                                                    <h3>Bank</h3>
                                                    <div className="cr_payMethodListItem">
                                                        {
                                                            bankList.map((bank, index) => {
                                                                return (
                                                                    <>
                                                                        <label className={bank.isPrimary ? "cr_paymentType active" : "cr_paymentType"} key={'bank_' + index}>
                                                                            <span className="circleRadio ">
                                                                                <input type="radio" name="card" onChange={() => handleCardBankChange(bank, 'bank')} checked={bank.isPrimary && orgBillingId === bank._id} />
                                                                                <span></span>
                                                                            </span>
                                                                            <span className="cardImage">
                                                                                <img src={bankIcon} alt="card" />
                                                                            </span>
                                                                            <span className="paymentModuleInfos">
                                                                                <span className="accNumber">Bank account ending with <strong>{bank.last4}</strong></span>
                                                                                <span className="accinfod">Routing Number {bank.routing_number}</span>
                                                                            </span>
                                                                        </label>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div> : ''}
                                        </>
                                    }
                                    {showForm &&
                                        <>
                                            <div className="paymentSourcetabs">
                                                <div className="tabBtns">
                                                    <button onClick={openCardForm} className={editCardPart ? "active" : ""}>Card</button>
                                                    <button onClick={openBankForm} className={editBankPart ? "active" : ""}>Bank</button>
                                                </div>
                                                <div className="tabcontent">
                                                    {editCardPart &&
                                                        <div className="editform">
                                                            <form ref={cardForm}>
                                                                <div className="editformRow">
                                                                    <label className="editFormLabel">
                                                                        Card Number
                                                                        <span className="mandatory"> *</span>
                                                                    </label>
                                                                    <input type="text" name="cardNumber" className={formErrors.cardNumber ? "editFormStyle cr_error" : "editFormStyle"}
                                                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                                                        onChange={handleCreditCardChange}
                                                                    />
                                                                    {formErrors.cardNumber ? (
                                                                        <p className="errorMsg">{formErrors.cardNumber}</p>
                                                                    ) : null}
                                                                </div>
                                                                <div className="editformRow">
                                                                    <label className="editFormLabel">
                                                                        Card Holder Name
                                                                        <span className="mandatory"> *</span>
                                                                    </label>
                                                                    <input type="text" name="cardHolderName" className={formErrors.cardHolderName ? "editFormStyle cr_error" : "editFormStyle"}
                                                                        placeholder="Ex. Adam Smith"
                                                                        onChange={handleCardHolderNameChange}
                                                                    />
                                                                    {formErrors.cardHolderName ? (
                                                                        <p className="errorMsg">{formErrors.cardHolderName}</p>
                                                                    ) : null}

                                                                </div>
                                                                <div className="editformRow">
                                                                    <div className="half">
                                                                        <label className="editFormLabel">
                                                                            Expiry Date
                                                                            <span className="mandatory"> *</span>
                                                                        </label>
                                                                        <input type="text" name="cardExpiryDate" className={formErrors.cardExpiryDate ? "editFormStyle cr_error" : "editFormStyle"}
                                                                            placeholder="mm/yyyy"
                                                                            onChange={handleCardExpiryChange}
                                                                        />

                                                                    </div>
                                                                    <div className="half">
                                                                        <label className="editFormLabel">CVV</label>
                                                                        <input type="text" name="cvv" className={formErrors.cardCvv ? "editFormStyle cr_error" : "editFormStyle"}
                                                                            onChange={handleCardCvvChange}
                                                                        />
                                                                        {formErrors.cardCvv ? (
                                                                            <p className="errorMsg">{formErrors.cardCvv}</p>
                                                                        ) : null}
                                                                    </div>
                                                                    {formErrors.cardExpiryDate ? (
                                                                        <p className="errorMsg">{formErrors.cardExpiryDate}</p>
                                                                    ) : null}
                                                                </div>
                                                                <div className="d-flex justify-content-center mt20">
                                                                    <button type="button" className="creatUserBtn" onClick={saveCard}>
                                                                        <img className="plusIcon" src={plus_icon} alt="" /><span>Add my Card</span>
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    }
                                                    {editBankPart === true &&
                                                        <form ref={bankForm}>
                                                            <div className="editform">
                                                                <div className="editformRow">
                                                                    <label className="editFormLabel">
                                                                        Account Number
                                                                        <span className="mandatory"> *</span>
                                                                    </label>
                                                                    <input type="text" name="bankAccountNumber" className={formErrors.bankAccountNumber ? "editFormStyle cr_error" : "editFormStyle"} placeholder="XXXXXXXXXXXX"
                                                                        onChange={handleBankAccountNumberChange}
                                                                    />
                                                                    {formErrors.bankAccountNumber ? (
                                                                        <p className="errorMsg">{formErrors.bankAccountNumber}</p>
                                                                    ) : null}
                                                                </div>
                                                                <div className="editformRow">
                                                                    <label className="editFormLabel">
                                                                        Account Holder Name
                                                                        <span className="mandatory"> *</span>
                                                                    </label>
                                                                    <input type="text" name="bankHolderName" className={formErrors.bankHolderName ? "editFormStyle cr_error" : "editFormStyle"} placeholder="Ex. Adam Smith"
                                                                        onChange={handleBankHolderNameChange}
                                                                    />
                                                                    {formErrors.bankHolderName ? (
                                                                        <p className="errorMsg">{formErrors.bankHolderName}</p>
                                                                    ) : null}
                                                                </div>
                                                                <div className="editformRow">
                                                                    <div className="half">
                                                                        <label className="editFormLabel">
                                                                            Routing #
                                                                            <span className="mandatory"> *</span>
                                                                        </label>
                                                                        <input type="text" name="bankRoutingNumber" className={formErrors.routingNumber ? "editFormStyle cr_error" : "editFormStyle"} placeholder="XXXXXXXX"
                                                                            onChange={handleBankRoutingNumberChange}
                                                                        />
                                                                        {formErrors.routingNumber ? (
                                                                            <p className="errorMsg">{formErrors.routingNumber}</p>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="half">
                                                                        <label className="editFormLabel">Account Type</label>
                                                                        <select className="editFormStyle" name="bankAccountType"
                                                                                onChange={bankAccountTypeHandler}>
                                                                            <option value="checking">Checking</option>
                                                                            <option value="savings">Savings</option>
                                                                            <option value="business_checking">Business Checking</option>
                                                                        </select>
                                                                        {formErrors.bank_account_type &&
                                                                            <p className="errorMsg">{formErrors.bank_account_type}</p>}
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-center mt20">
                                                                    <button className="creatUserBtn" onClick={saveBank}>
                                                                        <img className="plusIcon" src={plus_icon} alt="" /><span>Add my Bank</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {!cardList.length && !bankList.length && !showForm &&
                                        <div className="noDataSec">
                                            <img src={noDataIcon} />
                                            <h2>No Card/Bank Found</h2>
                                            <p>No billing details have been created yet</p>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="cr_rightColumn">
                            <div className="cr_billingOverviewCard">
                                <h3>Billing Overview</h3>
                                <div className="cr_billingOverviewBody">
                                    <div className="cr_priceBrakeout">
                                        <div className="cr_brakeoutIist">
                                            <div className="cr_priceLable">Package Price</div>
                                            <div className="cr_priceVal">{`$` + order.price.toFixed(2)}</div>
                                        </div>
                                        <div className="cr_brakeoutIist total">
                                            <div className="cr_priceLable">Total Amount</div>
                                            <div className="cr_priceVal">{`$` + order.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <button className="cr_payBtn" onClick={payNow}>
                                        Pay {`$` + order.price.toFixed(2)}
                                        <img src={arrowForward} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default PackagePaymentModal;