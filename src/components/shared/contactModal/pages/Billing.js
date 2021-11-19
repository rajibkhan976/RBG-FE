import React, { useState, useEffect }  from "react";
import bank from "../../../../assets/images/bank.svg";
import credit_card from "../../../../assets/images/credit_card.svg";
import cross_white from "../../../../assets/images/cross_white.svg";
import plus from "../../../../assets/images/plus_icon.svg";
import {ErrorAlert, SuccessAlert} from "../../messages";



const Billing = () => {
    const [listCardAnnim, setListCardAnnim] = useState(true);
    const [newCardAnnim, setNewCardAnnim] = useState(false);
    const [listBankAnnim, setListBankAnnim] = useState(true);
    const [newBankAnnim, setNewBankAnnim] = useState(false);
    const [primaryChecked, setPrimaryChecked] = useState(false);
    const [cardNumberCheck, setCardNumberCheck] = useState("");
    const [cardNumberOn, setCardNumberOn] = useState("");
    const [cardNameCheck, setCardNameCheck] = useState("");
    const [cardExpairyCheck, setCardExpairyCheck] = useState("");
    const [cardExpairyMonthCheck, setCardExpairyMonthCheck] = useState("");
    const [cardExpairyYearCheck, setCardExpairyYearCheck] = useState("");
    const [cardActivationCheck, setCardActivationCheck] = useState(false);
    const [cardActivationCheckText, setCardActivationCheckText] = useState("");
    const [bankActivationCheck, setBankActivationCheck] = useState(false);
    const [bankActivationCheckText, setBankActivationCheckText] = useState("");

    const [cardCvvCheck, setCardCvvCheck] = useState("");
    const [bankAccountCheck, setBankAccountCheck] = useState("");
    const [bankNameCheck, setBankNameCheck] = useState("");
    const [bankRoutingCheck, setBankRoutingCheck] = useState("");
    
    const [activeCreditCardCheck, setActiveCreditCardCheck] = useState([
        {
            cardNumber: "XXXXXXXXXXXX1234",
            expairyDate: "08/22",
            id: 1, 
            checkIt: true

        },
        {
            cardNumber: "XXXXXXXXXXXX5678",
            expairyDate: "07/22",
            id: 2, 
            checkIt: false
        },
        {
            cardNumber: "XXXXXXXXXXXX9101",
            expairyDate: "06/22",
            id: 3, 
            checkIt: false
        }
    ]);
    const [activeBankCheck, setActiveBankCheck] = useState([
        {
            accountNumber: "XXXXXXXXXXXX1234",
            routingA: "08/22",
            id: 1, 
            checkIt: true

        },
        {
            accountNumber: "XXXXXXXXXXXX5678",
            routingA: "07/22",
            id: 2, 
            checkIt: false
        },
        {
            accountNumber: "XXXXXXXXXXXX9101",
            routingA: "06/22",
            id: 3, 
            checkIt: false
        }
    ]);
    const [cardDataFormatting, setCardDataFormatting] = useState([
        {
            "contact": "618cfc610bd605dd51cbc0b7",
            "card_number": cardNumberOn,
            "expiration_year": cardExpairyCheck,
            "expiration_month": cardExpairyCheck,
            "cvv": cardCvvCheck,
            "cardholder_name": cardNameCheck,
            "status": cardActivationCheckText
        }
    ]);
    const [bankDataFormatting, setBankDataFormatting] = useState([
        {
            "contact": "618cfc610bd605dd51cbc0b7",
            "routing_number": bankRoutingCheck,
            "account_number": bankAccountCheck,
            "account_holder": bankNameCheck,
            "account_type": "checking",
            "status": bankActivationCheckText
        }    
    ]);
    const [formErrorMsg, setFormErrorMsg] = useState([
        {
            "card_num_Err" : false,
            "card_name_Err" : false,
            "card_exp_Err" : false,
            "card_cvv_Err" : false,
            "bank_routing_err" : false,
            "bank_acc_Err" : false,
            "bank_name_Err": false  
        }
    ]);

    const openNewCardHandler = () =>{
        setListCardAnnim(false);
        setNewCardAnnim(true)
    };
    const hideNewCardHandler = () =>{
        setListCardAnnim(true);
        setNewCardAnnim(false)
    };
    
    const openNewCardHandler2 = () =>{
        setListBankAnnim(false);
        setNewBankAnnim(true)
    };
    const hideNewCardHandler2 = () =>{
        setListBankAnnim(true);
        setNewBankAnnim(false)
    }; 
    
    const changeToPrimary1 = () =>{
      setPrimaryChecked(false);
    };
    const changeToPrimary2 = () =>{
      setPrimaryChecked(true);
    };

    
    const activeCreditCard = (creditCard) =>{
        let mapped = activeCreditCardCheck.map((el,i) => {         
            if (creditCard.id === el.id) {
                return {
                    ...el,
                    checkIt : !el.checkIt
                }        
            } else {
                return {
                    ...el,
                    checkIt : false
                }   
            }
        });

        setActiveCreditCardCheck(mapped);
        
    };
    
    const activeBank = (bank) =>{
        let mapped2 = activeBankCheck.map((el,i) => {         
            if (bank.id === el.id) {
                return {
                    ...el,
                    checkIt : !el.checkIt
                }        
            } else {
                return {
                    ...el,
                    checkIt : false
                }  
            }
        });
        setActiveBankCheck(mapped2);
    };
    

    // .................. validation ................


    
    const cardNumberCheckHandler = (e) =>{
        let cardNumber = e.target.value;
        var formattedCardNumber = cardNumber.replace(/[^\d]/g, "");
        formattedCardNumber = formattedCardNumber.substring(0, 16);
        
            // Split the card number is groups of 4
            var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
            if (formattedCardNumber.match(/\d{1,4}/g)) {
                formattedCardNumber = cardNumberSections.join('-'); 
                setCardNumberCheck(formattedCardNumber);
             }
             if(e.target.value === ""){
                setCardNumberCheck("");
             }
             let cardNumberChanged = cardNumber.replace("-", 3)
             setCardNumberOn(cardNumberChanged)
               // setCardNumber(e.target.value);
                console.log(e.target.value, formattedCardNumber.match(/\d{1,4}/g));     
    }

    const cardNameCheckHandler = (e) =>{
        const re =/^[a-zA-Z ]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setCardNameCheck(e.target.value);        
        };
       // console.log(cardNameCheck);
    }

    
    const cardExpairyCheckHandler = (e) =>{
          let cardExpairy = e.target.value;
          var formattedCardExpairy = cardExpairy.replace(/[^\d]/g, "");
          formattedCardExpairy = formattedCardExpairy.substring(0, 6);

          var cardExpairySectionsMonth = formattedCardExpairy.slice(0,2);
          var cardExpairySectionsYear = formattedCardExpairy.slice(2,6);

          if(cardExpairySectionsMonth > 0 && cardExpairySectionsYear > 0){
             formattedCardExpairy =  cardExpairySectionsMonth + "/" + cardExpairySectionsYear;
          }else if(formattedCardExpairy <= 2){
             formattedCardExpairy =  cardExpairySectionsMonth 
          }
          setCardExpairyCheck(formattedCardExpairy);   
          setCardExpairyMonthCheck(cardExpairySectionsMonth);   
          setCardExpairyYearCheck(cardExpairySectionsYear);      
          console.log(cardExpairySectionsMonth +"," + cardExpairySectionsYear);
    }
    
    const cardCvvCheckHandler = (e) =>{
        let cardCvv = e.target.value;
        var formattedCardCvv = cardCvv.replace(/[^\d]/g, "");
        formattedCardCvv = formattedCardCvv.substring(0, 3);    
        setCardCvvCheck(formattedCardCvv);       
    }
    const cardActiveHandler = (e) =>{     
        var checkActiveCard = "";
        if(cardActivationCheck === false){
            checkActiveCard = "Active"
        }else{
            checkActiveCard = "Inactive"
        }
        setCardActivationCheck(!cardActivationCheck);
        setCardActivationCheckText(checkActiveCard);
    }

    const bankActiveHandler = (e) =>{     
        var checkActiveBank = "Inactive";
        if(bankActivationCheck === false){
            checkActiveBank = "Active"
        }else{
            checkActiveBank = "Inactive"
        }
        setBankActivationCheck(!bankActivationCheck);
        setBankActivationCheckText(checkActiveBank);
    }
    const bankAccountCheckHandler = (e) =>{
        let accountNumber = e.target.value;
        var formattedAccountNumber = accountNumber.replace(/[^\d]/g, "");
        formattedAccountNumber = formattedAccountNumber.substring(0, 12);
        setBankAccountCheck(formattedAccountNumber);
    }

    
    const bankNameCheckHandler = (e) =>{
        const re =/^[a-zA-Z ]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setBankNameCheck(e.target.value);        
        };
       // console.log(bankNameCheck);
    }

    
    const bankRoutingCheckHandler = (e) =>{
        let bankRouting = e.target.value;
        var formattedBankRouting = bankRouting.replace(/[^\d]/g, "");
        formattedBankRouting = formattedBankRouting.substring(0, 9);    
        setBankRoutingCheck(formattedBankRouting);       
    }
    
   
    const saveCardData = (e) =>{
        e.preventDefault();
        setCardDataFormatting({...cardDataFormatting, card_number: cardNumberCheck ,expiration_year : cardExpairyYearCheck,  expiration_month : cardExpairyMonthCheck, cvv: cardCvvCheck, cardholder_name: cardNameCheck , status: cardActivationCheckText});
        

        if(!cardNumberCheck || cardNumberCheck.length < 19){
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_num_Err : true}));
        } else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_num_Err : false}));
        };
        
        if(!cardNameCheck){
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_name_Err : true}));
        } else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_name_Err : false}));
        };
        if(!cardExpairyCheck || cardExpairyCheck.length < 7){
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_exp_Err : true}));
        } else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_exp_Err : false}));
        };
        if(!cardCvvCheck || cardCvvCheck.length < 3){
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_cvv_Err : true}));
        } else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, card_cvv_Err : false}));
        };
        
        // if(cardNumber && cardNameCheck && cardExpairyCheck && cardCvvCheck && cardCvvCheck.length === 3){
        //     setFormErrorMsg({card_cvv_Err : false ,card_exp_Err : false, card_num_Err : false, card_name_Err : false});
        // };
        console.log(cardDataFormatting);
        //console.log(formErrorMsg);
        console.log(cardNumberCheck +" ,"+ cardNumberOn +" ,"+ cardNumberCheck.length +" , " + cardExpairyCheck + " , " + cardCvvCheck + " , " + cardNameCheck +" , " + cardActivationCheck )
    }
   
    const saveBankData = (e) =>{
        e.preventDefault();
        setBankDataFormatting({...bankDataFormatting, routing_number: bankRoutingCheck, account_number: bankAccountCheck, account_holder: bankNameCheck, status: bankActivationCheckText});
        if(!bankRoutingCheck || bankRoutingCheck.length < 9){
            setFormErrorMsg((errorMessage) => ({...errorMessage, bank_routing_err : true}));
        } else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, bank_routing_err : false}));
        };
        if(!bankNameCheck){
            setFormErrorMsg((errorMessage) => ({...errorMessage, bank_name_Err : true}));
        }else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, bank_name_Err : false}));
        };
        if(!bankAccountCheck || bankAccountCheck.length < 8 ){
            setFormErrorMsg((errorMessage) => ({...errorMessage, bank_acc_Err : true}));
        }else {
            setFormErrorMsg((errorMessage) => ({...errorMessage, bank_acc_Err : false}));
        };
        
        console.log(bankDataFormatting);
        console.log(bankRoutingCheck +" , " + bankAccountCheck + " , " + bankNameCheck +" , " + bankActivationCheck )
    }




    return(
        <>
            <div className="contactTabsInner">
                <h3 className="headingTabInner">Billing Info</h3> 
                <p className="subheadingTabInner">Explanatory text blurb should be here.</p>
                <div className="twoBillingCardContainer">
                    <div className="billing_module">
                        <div className="primaryMaker">
                            <label>
                                <div class="circleRadio">
                                <input type="radio" name="primary" onChange={changeToPrimary1} defaultChecked={!primaryChecked}/><span></span>
                                </div><span className={!primaryChecked ? "" : "hide"}> Primary</span><span className={!primaryChecked ? "hide" : ""}>Make Primary</span>
                            </label>
                        </div>
                        <div className="flipCardHolder">
                            <div className={listCardAnnim ? "cardList show" : "cardList hide"}>
                                <div className="header">
                                    <div className="headerLeft">
                                        <img src={credit_card} alt=""/> Credit Cards
                                    </div>
                                    <button className="cardAddBtn" onClick={openNewCardHandler}>Add a Card</button>
                                </div>
                                <div className="body">
                                   
                                    { activeCreditCardCheck.map((creditCard,i) => (
                                         <div key={creditCard.id} className={creditCard.checkIt ? "list active" : "list"}>
                                         <label className="leftside" >
                                            <div class="circleRadio">
                                               <input type="radio" 
                                                name="credit"
                                                onChange={()=>activeCreditCard(creditCard)} 
                                                defaultChecked={creditCard.checkIt}
                                                id={i}
                                                />
                                               <span></span>
                                             </div> {creditCard.checkIt ? "Active" : ""}
                                         </label>
                                         <div className="rightside">
                                             <p>
                                                 <span>Card Number</span>
                                                 {creditCard.cardNumber}
                                              </p>
                                              <p className="diff">
                                                 <span>Expiry</span>
                                                 {creditCard.expairyDate}
                                              </p>
                                         </div>
                                     </div>
                                    ))}

                                </div>
                            </div>
                            <div className={newCardAnnim ? "addInList show" : "addInList hide"}>
                                <div className="header">
                                    <button className="noEffectBtn cross"  onClick={hideNewCardHandler}><img src={cross_white} alt=""/></button>
                                    <img src={credit_card} alt=""/>
                                    <h3>Add a credit Card</h3>
                                </div>
                                <div className="addingForm">
                                    <form>
                                        <div className="formModule">
                                            <label>Card Number</label>
                                            <div className="activeFactor">
                                                <input type="text" className="creditCardText" placeholder="xxxx-xxxx-xxxx-xxxx" onChange={cardNumberCheckHandler} value={cardNumberCheck} />
                                                <div className="activate">
                                                    <div class="customCheckbox">
                                                    <input type="checkbox" name="credit" onChange={cardActiveHandler} checked={cardActivationCheck}/><span></span>
                                                    </div> {cardActivationCheck ? "Active" : "Inactive"}
                                                </div>
                                            </div>
                                        
                                            {formErrorMsg.card_num_Err ? <p className="errorMsg">Please fill up the field</p> : ""}
                                        </div>
                                        <div className="formModule">
                                            <label>Card Holder Name</label>
                                            <input type="text" placeholder="Ex. Adam Smith" onChange={cardNameCheckHandler} value={cardNameCheck}/>
                                            {formErrorMsg.card_name_Err ? <p className="errorMsg">Please fill up the field</p> : ""}
                                        </div>

                                       
                                        <div className="halfDivForm">
                                            <div className="half formModule">
                                                <label>Expiry Date</label>
                                                <input type="text" placeholder="mm/yy" onChange={cardExpairyCheckHandler} value={cardExpairyCheck}/> 
                                                {formErrorMsg.card_exp_Err ? <p className="errorMsg">Please fill up the field</p> : ""}
                                            </div>
                                            <div className="half formModule">
                                                <label>CVV</label>
                                                <input type="text" onChange={cardCvvCheckHandler} value={cardCvvCheck}/> 
                                                {formErrorMsg.card_cvv_Err ? <p className="errorMsg">Please fill up the field</p> : ""}
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button className="orangeBtn" onClick={saveCardData}><img src={plus} alt=""/> Add my Card</button>
                                        </div>
                                    </form>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* ............................. */}
                    <div className="billing_module">
                        <div className="primaryMaker">
                            <label>
                                <div class="circleRadio">
                                <input type="radio"  name="primary" onChange={changeToPrimary2} defaultChecked={primaryChecked}/><span></span>
                                </div><span className={primaryChecked ? "" : "hide"}>Primary</span><span className={primaryChecked ? "hide" : ""}>Make Primary</span>
                            </label>
                        </div>
                        <div className="flipCardHolder">
                            <div className={listBankAnnim ? "cardList show" : "cardList hide"}>
                                <div className="header">
                                    <div className="headerLeft">
                                        <img src={bank} alt=""/> Bank Accounts
                                    </div>
                                    <button className="cardAddBtn"  onClick={openNewCardHandler2}>Add an Account</button>
                                </div>
                                <div className="body">
                                    
                                    { activeBankCheck.map((bank,i) => (
                                         <div key={bank.id} className={bank.checkIt ? "list active" : "list"}>
                                         <label className="leftside">
                                            <div class="circleRadio">
                                             <input type="radio" 
                                             name="bank"
                                             onChange={()=>activeBank(bank)} 
                                             defaultChecked={bank.checkIt}
                                             id={i}
                                             />
                                             <span></span>
                                             </div> 
                                         </label>
                                         <div className="rightside">
                                             <p>
                                                 <span>Account Number</span>
                                                 {bank.accountNumber}
                                              </p>
                                              <p className="diff">
                                                 <span>Routing #</span>
                                                 {bank.routingA}
                                              </p>
                                              <div className="checking">checking</div>
                                         </div>
                                     </div>
                                    ))}
                                    
                                </div>
                            </div>
                           
                            <div className={newBankAnnim ? "addInList show" : "addInList hide"}>
                                <div className="header">
                                    <button className="noEffectBtn cross" onClick={hideNewCardHandler2}><img src={cross_white} alt=""/></button>
                                    <img src={bank} alt=""/>
                                    <h3>Add a Bank Account</h3>
                                </div>
                                <div className="addingForm">
                                    <form>
                                        <div className="formModule">
                                            <label>Account Number</label>
                                            <div className="activeFactor">
                                                <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx" onChange={bankAccountCheckHandler} value={bankAccountCheck}/>
                                                <div className="activate">
                                                    <div class="customCheckbox">
                                                    <input type="checkbox" name="credit" onChange={bankActiveHandler} checked={bankActivationCheck}/><span></span>
                                                    </div> {bankActivationCheck ? "Active" : "Inactive"}
                                                </div>
                                            </div>
                                            {formErrorMsg.bank_acc_Err ? <p className="errorMsg">Please fill up the field</p> : ""}
                                        </div>
                                        <div className="formModule">
                                            <label>Account Holder Name</label>
                                            <input type="text" placeholder="Ex. Adam Smith" onChange={bankNameCheckHandler} value={bankNameCheck}/>
                                            {formErrorMsg.bank_name_Err ? <p className="errorMsg">Please fill up the field</p> : ""}
                                        </div>
                                        <div className="halfDivForm">
                                            <div className="half formModule">
                                                <label>Routing #</label>
                                                <input type="text" onChange={bankRoutingCheckHandler} value={bankRoutingCheck}/> 
                                                {formErrorMsg.bank_routing_err ? <p className="errorMsg">Please fill up the field</p> : ""}   
                                            </div>
                                            <div className="half formModule">
                                                <label>Account Type</label>
                                                <select className="selectBox">
                                                    <option>Checking</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button className="orangeBtn" onClick={saveBankData}><img src={plus} alt=""/> Add my Bank Account</button>
                                        </div>
                                    </form>
                                    </div>
                                </div>    
                            </div>
                        </div>
                </div>
              
            </div>
        </>
    );
}

export default Billing;