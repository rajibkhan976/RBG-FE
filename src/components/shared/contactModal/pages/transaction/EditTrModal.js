import { useState,useEffect } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import editForModal from "../../../../../../src/assets/images/editForModal.svg";
import plus_icon from "../../../../../../src/assets/images/plus_icon.svg";
import cross_small from "../../../../../../src/assets/images/cross_small.svg";
import paySuccess from "../../../../../assets/images/paySuccess.png"
import aaroww from "../../../../../assets/images/arrow_forward.svg"
import cashSuccess from "../../../../../assets/images/cashSuccess.svg";
import smallTick from "../../../../../assets/images/smallTick.svg";
import paidCard from "../../../../../assets/images/paidCrad.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import Loader from "../../../Loader";

import { BillingServices } from "../../../../../services/billing/billingServices";
import { TransactionServices } from "../../../../../services/transaction/transactionServices";
import AlertMessage from "../../../messages/alertMessage";


const EditTrModal = (props) => {
    const [editCardPart, setEditCardPart] = useState(true);
    const [editBankPart, setEditBankPart] = useState(false);

    const [editCardDetailsPart, setEditCardDetailsPart] = useState(false);
    const [editBankDetailsPart, setEditBankDetailsPart] = useState(false);

    const [checkingForCard, setCheckingForCard] = useState(false);
    const [checkingForBank, setCheckingForBank] = useState(false);
    const [addBtnClicked, setAddBtnClicked] = useState(false);
    
    const [cardExpairyMonthCheck, setCardExpairyMonthCheck] = useState("");
    const [cardExpairyYearCheck, setCardExpairyYearCheck] = useState("");
    const [cardNumberOn, setCardNumberOn] = useState("");   

    const [openOnlineBox, setOpenOnlineBox] = useState(false);
    const [paylater, setPaylater] = useState(false);

    const [alertMsg, setAlertMsg] = useState({
        type: null,
        message: null,
        time: 5000 //ms
    })

    const [editTransFormData, setEditTransFormData] = useState({
        amount: "",
        dueDate: "",
        paymentMode: "",
        applyForAll: false
    });
    const [formErrorMsg, setFormErrorMsg] = useState({
        amount: "",
        dueDate: "",
        paymentMode: "",
        form:"",
    });
    
    const [addCardFormData, setAddCardFormData] = useState({
        cardNumber: "",
        cardHolderName: "",
        exDate: "",
        exDateMonth: "",
        exDateYear: "",
        cvv: ""
    });
    const [addCardformErrorMsg, setAddCardFormErrorMsg] = useState({
        cardNumber: "",
        cardHolderName: "",
        exDate: "",
        exDateMonth: "",
        exDateYear: "",
        cvv: ""
    });

    const [addBankFormData, setAddBankFormData] = useState({
        accNumber: "",
        accHolderName: "",
        routing: "",
        checking: ""
    });
    const [addBankformErrorMsg, setAddBankFormErrorMsg] = useState({
        accNumber: "",
        accHolderName: "",
        routing: "",
        checking: ""
    });
    
    
    const [isLoader, setIsLoader] = useState(false);
      
    const [cardList, setCardList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [primaryType, setPrimaryType] = useState(null);
    const [successfulpay, setSuccessfulpay] = useState({})

    useEffect(() => {
        setEditTransFormData({
            amount: props.transaction.amount,
            dueDate: props.transaction.due_date,
            paymentMode: props.transaction.payment_via,
            form : "",
            applyForAll: false
        })
        if (props.transaction.payment_via == "online") {
            setOpenOnlineBox(true);
        }
        
    }, [])
   
    const fetchCardBank = async () => {
        try {
          setIsLoader(true);
          let cardBankResponce = await BillingServices.fetchCardBank(props.contactId);
          if (cardBankResponce) {
            setCardList(cardBankResponce.cards);
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

      
    const editCardHandler = (e) =>{
        e.preventDefault();
        setEditCardPart(true);
        setEditBankPart(false);
        setEditCardDetailsPart(false);
        setEditBankDetailsPart(false);

        setAddBtnClicked(false) ;
    }
    const editBankHandler = (e) =>{
        e.preventDefault();
        setEditBankPart(true);
        setEditCardPart(false);
        setEditCardDetailsPart(false);
        setEditBankDetailsPart(false);

        setAddBtnClicked(false) ;
    }
    const editCardDetailsHandler = (e) =>{
        e.preventDefault();
        setEditCardDetailsPart(true);
        setEditCardPart(false);
        setEditBankPart(false);
        setEditBankDetailsPart(false);

        setAddBtnClicked(true) ;
    }
    const editBankDetailsHandler = (e) =>{
        e.preventDefault();
        setEditBankDetailsPart(true);
        setEditBankPart(false);
        setEditCardPart(false);
        setEditCardDetailsPart(false);

        setAddBtnClicked(true) ;
    }

    const [cardId, setCardId] = useState(null);

    const activeCreditCard = async (cardBank) => {
        setCardId(cardBank._id);
        setIsLoader(true)
    
        let cardData = {
          billingID: cardBank && cardBank._id,
          contactID: cardBank && props.contactId,
          accountType: cardBank && cardBank.accountType,
        };
        
        try {
          await BillingServices.activeCard(cardData);
        } catch (error) {
          console.log(error);
        } finally {
          fetchCardBank();
        }
      };


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

     const addCardNumberHandler = (e) =>{
        let val = e.target.value;
        if (val.length < 24) {
            var formattedCardNumber = val.replace(/[^\d]/g, "");
            var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
            if (cardNumberSections) {
              //console.log("formattedCardNumber", formattedCardNumber);
              formattedCardNumber = cardNumberSections.join(" ");
              addCardfieldErrorCheck.checkcardNumber(formattedCardNumber);
              var cardNumberChanged = formattedCardNumber.replace(/[^\d ]/g, "");
              setCardNumberOn(cardNumberChanged);
            }
            if (e.target.value === "") {
                addCardfieldErrorCheck.checkcardNumber("");
            }
          }
        
    }
    const addCardNameHandler = (e) =>{
        let val = e.target.value;
        const re = /^[a-zA-Z ]*$/;
        if (re.test(val)) {
          addCardfieldErrorCheck.checkcardName(val);
        }
    }
    const cardExpiryHandler = (e) =>{
        let val = e.target.value;
        
        var formattedCardExpairy = val.replace(/[^\d]/g, "");
        formattedCardExpairy = formattedCardExpairy.substring(0, 6);

        var cardExpairySectionsMonth = formattedCardExpairy.slice(0, 2);
        var cardExpairySectionsYear = formattedCardExpairy.slice(2, 6);

        if (cardExpairySectionsMonth > 0 && cardExpairySectionsYear > 0) {
        formattedCardExpairy =
            cardExpairySectionsMonth + "/" + cardExpairySectionsYear;
        } else if (formattedCardExpairy <= 2) {
        formattedCardExpairy = cardExpairySectionsMonth;
        }
        setCardExpairyYearCheck(cardExpairySectionsYear);
        setCardExpairyMonthCheck(cardExpairySectionsMonth);
        addCardfieldErrorCheck.checkcardExp(formattedCardExpairy);
        
    }

    const cardcvvHandler = (e) =>{
        let val = e.target.value;
        var formattedCardCvv = val.replace(/[^\d]/g, "");
        formattedCardCvv = formattedCardCvv.substring(0, 4);
        addCardfieldErrorCheck.checkcardcvv(formattedCardCvv);
       // setAddCardFormData({...addCardFormData, cvv: formattedCardCvv})
    }

    const addCardfieldErrorCheck = {

        checkcardNumber: (val) => {
            setAddCardFormData({...addCardFormData, cardNumber: val});
            if (!val || val.length < 17) {
                setAddCardFormErrorMsg(prevState => ({...prevState, cardNumber: "Please enter a valid card number"}));
            } else {
                setAddCardFormErrorMsg(prevState => ({...prevState, cardNumber: ""}));
            }
        },
        checkcardName: (val) => {
            setAddCardFormData({...addCardFormData, cardHolderName: val});
            if (!val) {
                setAddCardFormErrorMsg(prevState => ({...prevState, cardHolderName: "Please enter Card Holder Name"}));
            } else {
                setAddCardFormErrorMsg(prevState => ({...prevState, cardHolderName: ""}));
            }
        },
        checkcardExp: (val) => {
            setAddCardFormData({...addCardFormData, exDate: val});
            if (!val || val.length < 7) {
                setAddCardFormErrorMsg(prevState => ({...prevState, exDate: "Please enter expiry date"}));
            } else {
                setAddCardFormErrorMsg(prevState => ({...prevState, exDate: ""}));
            }
        },
        checkcardcvv: (val) => {
            setAddCardFormData({...addCardFormData, cvv: val});
            if (val.length > 0 && val.length < 3) {
                setAddCardFormErrorMsg(prevState => ({...prevState, cvv: "CVV should be 3 or 4 digits"}));
            } else {
                setAddCardFormErrorMsg(prevState => ({...prevState, cvv: ""}));
            }
        }
    }
  

    const submitCardChangeForm = async (e) =>{
        e.preventDefault();
        addCardfieldErrorCheck.checkcardNumber(addCardFormData.cardNumber);
        addCardfieldErrorCheck.checkcardName(addCardFormData.cardHolderName);
        addCardfieldErrorCheck.checkcardExp(addCardFormData.exDate);
        addCardfieldErrorCheck.checkcardcvv(addCardFormData.cvv);       
        //setAddBtnClicked(true) ;

        if(addCardFormData.cardNumber === "" || addCardFormData.cardNumber.length < 17 || addCardFormData.cardHolderName === "" || addCardFormData.exDate === "" || (addCardFormData.cvv.length && addCardFormData.cvv.length < 3)){
            setCheckingForCard(false);
        } else{
            setCheckingForCard(true);
        }
        console.log("cardExpairySectionsMonth",cardExpairyMonthCheck);
        let cardPayload =  {
            contact: props.contactId,
            card_number: addCardFormData.cardNumber.split(" ").join(""),
            expiration_year: cardExpairyYearCheck,
            expiration_month: cardExpairyMonthCheck,
            cvv: addCardFormData.cvv.trim() !== "" ? addCardFormData.cvv : "",
            cardholder_name: addCardFormData.cardHolderName,
            status: "inactive",
          }
          if(checkingForCard) {
        try {
            await BillingServices.addCard(cardPayload);
            // setFormErrorMsg((errorMessage) => ({
            //   ...errorMessage,
            //   card_details_invalid: "",
            // })); 
            // setTimeout(() => {
            //   setSuccessMessage("Card successfully added!")
            // }, 2000);
            //hideNewCardHandler();
          } catch (error) {
            setIsLoader(false)
            // setFormErrorMsg((errorMessage) => ({
            //   ...errorMessage,
            //   card_details_invalid: error.message,
            // }));
          } finally {
            //cardError = false;
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
            console.log("FINISHED");
            setEditCardDetailsPart(false);
            setEditCardPart(true);
            
          }
        }
    }

    const addBankNumberHandler = (e) =>{
        let val = e.target.value;
        var formattedAccNum = val.replace(/[^\d]/g, "");
        formattedAccNum = formattedAccNum.substring(0, 12);
        addBankfieldErrorCheck.checkaccNumber(formattedAccNum);
    }
    const addBankNameHandler = (e) =>{
        let val = e.target.value;
        const re = /^[a-zA-Z ]*$/;
        if (re.test(val)) {
            addBankfieldErrorCheck.checkaccHolderName(val);
        }
    }
    const bankRoutingHandler = (e) =>{
        let val = e.target.value;    
        var formattedRouting = val.replace(/[^\d]/g, "");
        formattedRouting = formattedRouting.substring(0, 9);
        addBankfieldErrorCheck.checkrouting(formattedRouting);
    }
    const bankTypeHandler = (e) =>{
        let val = e.target.value;
        addBankfieldErrorCheck.checkchecking(val);
    }

    const addBankfieldErrorCheck = {

        checkaccNumber: (val) => {
            setAddBankFormData({...addBankFormData, accNumber: val});
            if (!val || val.length < 9) {
                setAddBankFormErrorMsg(prevState => ({...prevState, accNumber: "Please enter Account Number"}));
            } else {
                setAddBankFormErrorMsg(prevState => ({...prevState, accNumber: ""}));
            }
        },
        checkaccHolderName: (val) => {
            setAddBankFormData({...addBankFormData, accHolderName: val});
            if (!val) {
                setAddBankFormErrorMsg(prevState => ({...prevState, accHolderName: "Please enter Account holder name"}));
            } else {
                setAddBankFormErrorMsg(prevState => ({...prevState, accHolderName: ""}));
            }
        },
        checkrouting: (val) => {
            setAddBankFormData({...addBankFormData, routing: val});
            if (!val) {
                setAddBankFormErrorMsg(prevState => ({...prevState, routing: "Please enter Routing"}));
            } else {
                setAddBankFormErrorMsg(prevState => ({...prevState, routing: ""}));
            }
        },
        checkchecking: (val) => {
            setAddBankFormData({...addBankFormData, checking: val});
            if (!val) {
                setAddBankFormErrorMsg(prevState => ({...prevState, checking: "Please enter Checking"}));
            } else {
                setAddBankFormErrorMsg(prevState => ({...prevState, checking: ""}));
            }
        },
    }

    
    const submitBankChangeForm = async (e)  =>{
        e.preventDefault();
        addBankfieldErrorCheck.checkaccNumber(addBankFormData.accNumber);
        addBankfieldErrorCheck.checkaccHolderName(addBankFormData.accHolderName);
        addBankfieldErrorCheck.checkrouting(addBankFormData.routing);
        addBankfieldErrorCheck.checkchecking(addBankFormData.checking);   
        //setAddBtnClicked(true) ;
        if (addBankFormData.accNumber === "" && addBankFormData.accHolderName === "" && addBankFormData.routing === "" && addBankFormData.checking === ""){
            setCheckingForBank(false);
        }else{
            setCheckingForBank(true);
        }

        let bankPayload = {
            contact: props.contactId,
            routing_number:  addBankFormData.routing,
            account_number: addBankFormData.accNumber,
            account_holder: addBankFormData.accHolderName,
            account_type: "checking",
            status: "inactive"
          } 
            
          try {
            
            let response = await BillingServices.addBank(bankPayload);
            // setFormErrorMsg((errorMessage) => ({
            //   ...errorMessage,
            //   bank_details_invalid: "",
            // })); 
            // setTimeout(() => {
            //   setSuccessMessage("Bank details successfully added!")
            // }, 2000);
            // hideNewCardHandler2();
            console.log(response);
          } catch (error) {
            setIsLoader(false)
            // setFormErrorMsg((errorMessage) => ({
            //   ...errorMessage,
            //   bank_details_invalid: error.message,
            // }));
          } finally {
            //bankError = false;
            bankPayload = null;
            fetchCardBank();
            setEditBankDetailsPart(false);
            setEditBankPart(true);
          }


    }

    const selectCashOrOnlineHandler = (e) =>{
        let val = e.target.value;
        fieldErrorCheck.checkmode(val);
        //console.log(e.target.value);
        if(e.target.value === "online") { 
            setOpenOnlineBox(true);
        }else {
            setOpenOnlineBox(false);
        }
    }
    const changeTransDateHandler = (e) =>{
        const dayNow = new Date();
        let val = e.target.value;
        let dateChecking = new Date(val);
        if(dayNow < dateChecking){
            fieldErrorCheck.checkdate(val);
        }   
    }
    const changeTransAmountHandler = (e) =>{
        let val = e.target.value;
        const re = new RegExp(/^\d*\.?\d{0,2}$/);
        if (re.test(val)) {
            fieldErrorCheck.checkamount(val);
        }
        
    }
    const checkUpdateForAllHandler = (e) =>{
        let val = e.target.checked;
        fieldErrorCheck.checkUpdateForAll(val);
    }
    
    
    const fieldErrorCheck = {

        checkdate: (val) => {
            setEditTransFormData({...editTransFormData, dueDate: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, dueDate: "Please select a future date"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, dueDate: ""}));
            }
        },
        checkamount: (val) => {
            setEditTransFormData({...editTransFormData, amount: parseFloat(val)});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, amount: "Please enter amount"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, amount: ""}));
            }
        },
        checkmode: (val) => {
            setEditTransFormData({...editTransFormData, paymentMode: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, paymentMode: "Please enter Payment mode"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, paymentMode: ""}));
            }
        },
        checkUpdateForAll: (val) => {
            setEditTransFormData({...editTransFormData, applyForAll: val});
        },
        checkform: () => {
            if (editTransFormData.paymentMode === "online") {
                if((addBtnClicked === true && checkingForBank === false) || (addBtnClicked === true && checkingForCard === false)){
                    setFormErrorMsg(prevState => ({...prevState, form: "Fill up the form for bank/card details"}));   
                } else{
                    setFormErrorMsg(prevState => ({...prevState, form: ""}));   
                } 
            }
        }
    }    

    const closeAlert = (loadData) => {
        props.closeModal(false, null, loadData)
        setAlertMsg({})
    };
    
    const editMainFormSubmit = async (e) =>{
        e.preventDefault();     
       
        fieldErrorCheck.checkmode(editTransFormData.paymentMode);
        fieldErrorCheck.checkamount(editTransFormData.amount);
        fieldErrorCheck.checkdate(editTransFormData.dueDate);            
        fieldErrorCheck.checkform();      
        
        let dueDate = paylater ? editTransFormData.dueDate : new Date().toISOString().split('T')[0];        
        
        if (editTransFormData.paymentMode && editTransFormData.amount && dueDate) {
            try {
                setIsLoader(true);
                let payload = {
                    subscriptionId: props.transaction._id,
                    amount: editTransFormData.amount,
                    payment_via: editTransFormData.paymentMode,
                    due_date: dueDate,
                    applyForAll: editTransFormData.applyForAll,
                    billingId: cardId
                }
                let updateResp = await TransactionServices.updateTransaction(props.contactId, payload);

                // console.log(updateResp === new Date().toISOString().split('T')[0]);

                if(updateResp && dueDate === new Date().toISOString().split('T')[0]) {
                    const newSuccess = {
                        status: updateResp.transaction.status,
                        mode: updateResp.transaction.payment_via,
                        amount: updateResp.transaction.amount,
                        transactionId: updateResp.transaction.transactionId,
                        message: updateResp.message
                    }
                    setSuccessfulpay(newSuccess);
                } 
                else {
                    props.setSuccessMsg(updateResp.message);
                    closeAlert(true);
                }
            } catch (e) {
                const failedTrans = {
                    message: e.message
                };
            //    setAlertMsg({ ...alertMsg, type: "error", "message": e.message, time: 5000 })
               setSuccessfulpay(failedTrans);
            } finally {
                setIsLoader(false);
            }
        }
             
    }

    return (
        <div className={(successfulpay.status === undefined || successfulpay.status !== "success") ? "modalBackdrop transactionModal" : "modalBackdrop transactionModal transactionSuccssModal"}>
            <div className="slickModalBody">
                {(successfulpay.status === undefined && successfulpay.message === undefined) &&
                    <>
                        <div className="slickModalHeader">
                            <button className="topCross" onClick={() => props.closeModal (false)}><img src={crossImg} alt="" /></button>  
                            <div className="circleForIcon"><img src={editForModal} alt="" className="small"/></div>
                            <h3>Edit Transactions</h3>
                            <p>Edit transactions by Date, Payment method and amount.</p>
                        </div>
                        <div className="cmnForm fullWidth">
                            <form>
                            {isLoader ? <Loader /> : ""}
                                <div className="cmnFormRow fullWidth flatForm">
                                    <label className="cmnFieldName">Change Date</label>
                                    <div className="dateHolderDiv">
                                        <label className="labelWithInfo paymentTime">
                                            <span className="labelHeading">I want to Pay Later</span>
                                            <label className={paylater ? "toggleBtn active" : "toggleBtn"}>
                                                <input type="checkbox" name="check-communication" 
                                                onChange={(e) =>
                                                    e.target.checked
                                                    ? setPaylater(true)
                                                    : setPaylater(false)
                                                }
                                                />
                                                <span className="toggler"></span>
                                            </label>
                                        </label>
                                        <div className={paylater ? "paymentNow" : "paymentNow display"}><p>Payment date <span>Now</span></p></div>
                                        <div className={paylater ? "paymentNow display" : "paymentNow"} ><input type="date" className="cmnFieldStyle" value={editTransFormData.dueDate} onChange={changeTransDateHandler}/></div>
                                    </div>                            
                                    { (formErrorMsg.dueDate && paylater) &&
                                    <div className="errorMsg">{formErrorMsg.dueDate}</div>
                                    }
                                </div>
                                <div className="cmnFormRow fullWidth flatForm">
                                    <label className="cmnFieldName">Change Payment Mode</label>
                                    <select className="cmnFieldStyle selectBox" onChange={selectCashOrOnlineHandler} value={editTransFormData.paymentMode}>
                                        <option value="online">Online</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                    { formErrorMsg.paymentMode &&
                                    <div className="errorMsg">{formErrorMsg.paymentMode}</div>
                                    }
                                    {openOnlineBox && 
                                    <div className="onlinePymentboxTrans">
                                        <div className="head">
                                            <h3>
                                                { (editCardDetailsPart || editBankDetailsPart) ? "Add a New Payment Source" : "Payment Source"}                                   
                                            </h3>
                                            {editCardPart && <button className="addBtn_style2" onClick={editCardDetailsHandler}>+ Add</button>}
                                            {editBankPart && <button className="addBtn_style2" onClick={editBankDetailsHandler}>+ Add</button>}
                                            {editCardDetailsPart && <button className="noFill" onClick={editCardHandler}><img src={cross_small} alt=""/></button>}  
                                            {editBankDetailsPart && <button className="noFill" onClick={editBankHandler}><img src={cross_small} alt=""/></button>}  
                                        </div>
                                        <div className="paymentSourcetabs">
                                            <div className="tabBtns">
                                                <button className={(editCardPart || editCardDetailsPart) ? "active" : ""} onClick={editCardHandler}>Card</button>
                                                <button className={(editBankPart || editBankDetailsPart) ? "active" : ""} onClick={editBankHandler}>Bank</button>       
                                            </div>
                                            
                                                <div className="tabcontent">
                                                    {editCardPart &&
                                                        <ul>
                                                            
                                                            {cardList &&
                                                                    cardList.map((elem, i) => (
                                                                    
                                                                        <li className={elem.status === "active" ? "active" : ""} key={i}>
                                                                            <div className="radio"> 
                                                                                <div className="circleRadio">     
                                                                                    <input type="radio" name="radio11" onChange={() => activeCreditCard(elem)} defaultChecked={elem.status === "active" ? "checked" : ""}/>
                                                                                    <span></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="img">
                                                                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V2H18V4Z" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="text">
                                                                                <h3>Creadit Card ending with {elem.last4}</h3>
                                                                                <p>Expires  {elem.expiration_month} / {elem.expiration_year}</p>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                )  
                                                            }
                                                        </ul>
                                                    }
                                                    {/* edit form for card */}
                                                    {editCardDetailsPart && 
                                                        <div className="editform">
            
                                                            <div className="editformRow">
                                                                <label className="editFormLabel">
                                                                    Card Number 
                                                                    <span className="mandatory"> *</span>
                                                                </label>
                                                                <input type="text" className="editFormStyle" 
                                                                placeholder="xxxx xxxx xxxx xxxx"
                                                                value={addCardFormData.cardNumber}
                                                                onChange={addCardNumberHandler} 
                                                                />
                                                                
                                                                { addCardformErrorMsg.cardNumber &&
                                                                        <div className="errorMsg">{addCardformErrorMsg.cardNumber}</div>
                                                                    }
                                                            </div>
                                                            <div className="editformRow">
                                                                <label className="editFormLabel">
                                                                    Card Holder Name
                                                                    <span className="mandatory"> *</span>
                                                                    </label>
                                                                <input type="text" className="editFormStyle" 
                                                                placeholder="Ex. Adam Smith"
                                                                value={addCardFormData.cardHolderName}
                                                                onChange={addCardNameHandler}
                                                                />
                                                                { addCardformErrorMsg.cardHolderName &&
                                                                        <div className="errorMsg">{addCardformErrorMsg.cardHolderName}</div>
                                                                    }
                                                            </div>
                                                            <div className="editformRow">
                                                                <div className="half">
                                                                    <label className="editFormLabel">
                                                                        Expiry Date
                                                                        <span className="mandatory"> *</span>
                                                                    </label>
                                                                    <input type="text" className="editFormStyle" 
                                                                    placeholder="mm/yyyy"
                                                                    value={addCardFormData.exDate}        
                                                                    onChange={cardExpiryHandler}
                                                                    />
                                                                    { addCardformErrorMsg.exDate &&
                                                                        <div className="errorMsg">{addCardformErrorMsg.exDate}</div>
                                                                    }
                                                                </div>
                                                                <div className="half">
                                                                    <label className="editFormLabel">CVV</label>
                                                                    <input type="text" className="editFormStyle"
                                                                    onChange={cardcvvHandler}
                                                                    value={addCardFormData.cvv}        
                                                                    />
                                                                    { addCardformErrorMsg.cvv &&
                                                                        <div className="errorMsg">{addCardformErrorMsg.cvv}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mt20">
                                                                <button className="creatUserBtn" onClick={submitCardChangeForm}>
                                                                    <img className="plusIcon" src={plus_icon} alt=""/><span>Add my Card</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    }

                                                {/* //end condition for card */}
                                                {editBankPart &&  
                                                    <ul>
                                                    
                                                    {bankList &&
                                                            bankList.map((elem, i) => (                                                    
                                                                <li className={elem.status === "active" ? "active" : ""} key={i}>
                                                                    <div className="radio">
                                                                        <div className="circleRadio">
                                                                            <input type="radio" onChange={() => activeCreditCard(elem)} defaultChecked={elem.status === "active" ? "checked" : ""} />
                                                                            <span></span>
                                                                        </div>  
                                                                    </div>
                                                                    <div className="img">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M7 10H4V17H7V10Z" />
                                                                            <path d="M13.5 10H10.5V17H13.5V10Z"/>
                                                                            <path d="M22 19H2V22H22V19Z"/>
                                                                            <path d="M20 10H17V17H20V10Z"/>
                                                                            <path d="M12 1L2 6V8H22V6L12 1Z"/>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="text">
                                                                        <h3>Account number ending with {elem.last4}</h3>
                                                                        <p>#Routing </p>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )
                                                    }
                                                    </ul>
                                                    }
                                                    
                                                    {editBankDetailsPart && 
                                                        <div className="editform">
                                                            <div className="editformRow">
                                                                <label className="editFormLabel">Account Number</label>
                                                                <input type="text" className="editFormStyle"
                                                                onChange={addBankNumberHandler}
                                                                value={addBankFormData.accNumber} 
                                                                />
                                                                { addBankformErrorMsg.accNumber &&  
                                                                        <div className="errorMsg">{addBankformErrorMsg.accNumber}</div>
                                                                    }
                                                            </div>
                                                            <div className="editformRow">
                                                                <label className="editFormLabel">Account Holder Name</label>
                                                                <input type="text" className="editFormStyle"
                                                                onChange={addBankNameHandler}
                                                                value={addBankFormData.accHolderName} 
                                                                />
                                                                { addBankformErrorMsg.accHolderName &&  
                                                                        <div className="errorMsg">{addBankformErrorMsg.accHolderName}</div>
                                                                    }
                                                            </div>
                                                            <div className="editformRow">
                                                                <div className="half">
                                                                    <label className="editFormLabel">Routing #</label>   
                                                                    <input type="text" className="editFormStyle" 
                                                                        onChange={bankRoutingHandler}                                                              
                                                                        value={addBankFormData.routing}                                                              
                                                                    />
                                                                    { addBankformErrorMsg.routing &&  
                                                                        <div className="errorMsg">{addBankformErrorMsg.routing}</div>
                                                                    }
                                                                </div>
                                                                <div className="half">
                                                                    <label className="editFormLabel">Account Type</label>
                                                                    <select className="editFormStyle" 
                                                                        onChange={bankTypeHandler}  
                                                                        value={addBankFormData.checking}                                                              
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="checking">Checking</option>
                                                                        <option value="saving">Savings</option>
                                                                        <option value="business_checking">Business Checking</option>
                                                                    </select>
                                                                    { addBankformErrorMsg.checking &&  
                                                                        <div className="errorMsg">{addBankformErrorMsg.checking}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mt20">
                                                                <button className="creatUserBtn" onClick={submitBankChangeForm}><img className="plusIcon" src={plus_icon} alt=""/><span>Add my Card</span></button>
                                                            </div>
                                                            
                                                        </div>
                                                    }
                                            </div>               
                                            
                                        </div> {/* end of tab body */}
                                    </div>  
                                    } 
                                    {/* //total box is ended here  */}
                                    { formErrorMsg.form &&
                                    <div className="errorMsg">{formErrorMsg.form}</div>
                                    }
                                </div> 
                            <div className="cmnFormRow fullWidth flatForm">
                                    <label className="cmnFieldName">Change Amount</label>
                                    <div className="cmnFormField preField"><div className="unitAmount">$</div>
                                        <input type="number" className="cmnFieldStyle" placeholder="300" value={editTransFormData.amount} onChange={changeTransAmountHandler}/>                      
                                    </div>
                                    { formErrorMsg.amount &&
                                    <div className="errorMsg">{formErrorMsg.amount}</div>
                                    }
                                </div>
                                <div className="notifyBox">
                                    <label className="d-flex f-align-center">
                                        <div className="customCheckbox">
                                            <input type="checkbox" name=""  onChange={checkUpdateForAllHandler} />
                                            <span></span>
                                        </div>
                                        <div>I want to update this change for all the upcoming transactions of this subscription</div>
                                    </label>
                                </div>
                                <div className="btnPlaceMiddle">
                                    <button className="saveNnewBtn" onClick={editMainFormSubmit}>Submit</button>
                                </div>    
                            </form>
                        </div>
                    </>
                }
                {(successfulpay.status !== undefined && successfulpay.status === "success") &&
                    <>
                        <div className="slickModalHeader">
                            <button className="topCross" onClick={() => props.closeModal (false)}><img src={crossImg} alt="" /></button>  
                        </div>
                        <div className="successHeader">
                        <div className="circleForIcon">
                            <img src={paySuccess} alt="" />
                        </div>
                        <h3 className="paySuccessHeading">
                            Transaction Successful
                            <p>{successfulpay.message}</p>
                        </h3>
                        </div>
                        <>
                        <div className="dottedBorder"></div>

                        <ul className="paymentUlHeader">
                            <li className="paymentModeHeaderLi">Payment Mode</li>
                            <li className="paymentIdHeaderLi">Transaction ID</li>
                            <li className="paymentAmtHeaderLi">Amount</li>
                        </ul>
                        </>

                        <ul className="paymentUlInfo">
                            <li className="paymentModeLi">
                            <img src={successfulpay.mode === "cash" ? cashSuccess : paidCard} alt="" />
                            <p>{successfulpay.mode}</p>
                            </li>
                            <li className="transactionIdProduct">
                                <span>{successfulpay.transactionId}</span>
                            </li>
                            <li className="paymentAmtLi">
                            <p>$ {successfulpay.amount.toFixed(2)}</p>
                            <img src={smallTick} alt="" />
                            </li>
                        </ul>

                        <div className="dottedBorder"></div>
                        <div className="successPageBtn w-100 d-flex f-justify-center">
                        <button
                            className="saveNnewBtn"
                            onClick={()=>
                                {
                                    setSuccessfulpay({})
                                    props.closeModal(false, null, true)
                                }
                            }
                        >
                            Close <img src={aaroww} alt="" />
                        </button>
                        </div>
                    </>
                }

                {console.log("successfulEDIT::::", successfulpay)}

                {(successfulpay.status === undefined && successfulpay.message !== undefined) && 
                    <div className="modalBackdrop modalProductStatus">
                        <div className="slickModalBody paymentFailed">
                            <div className="slickModalHeader">
                            <div className="circleForIcon">
                                <img src={paymentFail} alt="" />
                            </div>
                            <h3 className="courseModalHeading">Payment Failed!</h3>
                            </div>

                            <div className="payModalDetails">
                            <img src={cardFail} alt="" />
                            <p>{successfulpay.message}</p>
                            </div>

                            <div className="buyBtns failedPayment">
                            <button
                                onClick={() => setSuccessfulpay({})}
                                className="saveNnewBtn"
                            >
                                Close
                            </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {alertMsg.message && <AlertMessage
                type={alertMsg.type}
                message={alertMsg.message}
                time={alertMsg.time}
                close={closeAlert} />}
        </div>
    );
}

export default EditTrModal;