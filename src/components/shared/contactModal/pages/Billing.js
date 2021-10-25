import React, { useState } from "react";
import bank from "../../../../assets/images/bank.svg";
import credit_card from "../../../../assets/images/credit_card.svg";
import cross_white from "../../../../assets/images/cross_white.svg";
import plus from "../../../../assets/images/plus_icon.svg";



const Billing = () => {
    const [listCardAnnim, setListCardAnnim] = useState(true);
    const [newCardAnnim, setNewCardAnnim] = useState(false);


    const openNewCardHandler = () =>{
        setListCardAnnim(false);
        setNewCardAnnim(true)
    };
    const hideNewCardHandler = () =>{
        setListCardAnnim(true);
        setNewCardAnnim(false)
    };
    const [listBankAnnim, setListBankAnnim] = useState(true);
    const [newBankAnnim, setNewBankAnnim] = useState(false);
    const openNewCardHandler2 = () =>{
        setListBankAnnim(false);
        setNewBankAnnim(true)
    };
    const hideNewCardHandler2 = () =>{
        setListBankAnnim(true);
        setNewBankAnnim(false)
    }; 
    const [primaryChecked, setPrimaryChecked] = useState(false);
    const changeToPrimary1 = () =>{
      setPrimaryChecked(false);
    };
    const changeToPrimary2 = () =>{
      setPrimaryChecked(true);
    };

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
                                </div><span className={!primaryChecked ? "" : "hide"}>Make Primary</span><span className={!primaryChecked ? "hide" : ""}>Primary</span>
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
                                        <label>Card Number</label>
                                        <div className="activeFactor">
                                            <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx"/>
                                            <div className="activate">
                                                <div class="circleRadio">
                                                <input type="radio" name="credit"/><span></span>
                                                </div> Active
                                            </div>
                                        </div>
                                        <label>Card Holder Name</label>
                                        <input type="text" placeholder="Ex. Adam Smith"/>
                                        <div className="halfDivForm">
                                            <div className="half">
                                                <label>Expiry Date</label>
                                                <input type="date" placeholder="mm/yy"/> 
                                            </div>
                                            <div className="half">
                                                <label>CVV</label>
                                                <input type="text" /> 
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button className="orangeBtn"><img src={plus} alt=""/> Add my Card</button>
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
                                </div><span className={primaryChecked ? "" : "hide"}>Make Primary</span><span className={primaryChecked ? "hide" : ""}>Primary</span>
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
                                        <label>Card Number</label>
                                        <div className="activeFactor">
                                            <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx"/>
                                            <div className="activate">
                                                <div class="circleRadio">
                                                <input type="radio" name="credit"/><span></span>
                                                </div> Active
                                            </div>
                                        </div>
                                        <label>Card Holder Name</label>
                                        <input type="text" placeholder="Ex. Adam Smith"/>
                                        <div className="halfDivForm">
                                            <div className="half">
                                                <label>Routing #</label>
                                                <input type="text"/> 
                                            </div>
                                            <div className="half">
                                                <label>Account Type</label>
                                                <select className="selectBox">
                                                    <option>Checking</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button className="orangeBtn"><img src={plus} alt=""/> Add my Bank Account</button>
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