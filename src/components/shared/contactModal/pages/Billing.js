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
    const openNewCardHandler2 = () =>{
        setListCardAnnim(false);
        setNewCardAnnim(true)
    };
    const hideNewCardHandler2 = () =>{
        setListCardAnnim(true);
        setNewCardAnnim(false)
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
                                <input type="radio"/><span></span>
                                </div>Primary
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
                                    <div className="list active">
                                        <label className="leftside">
                                           <div class="circleRadio">
                                            <input type="radio" name="credit"/><span></span>
                                            </div> Active
                                        </label>
                                        <div className="rightside">
                                            <p>
                                                <span>Card Number</span>
                                                xxxxxxxxxxxx1234
                                             </p>
                                             <p className="diff">
                                                <span>Expiry</span>
                                                08/20
                                             </p>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label className="leftside">
                                           <div class="circleRadio">
                                            <input type="radio" name="credit"/><span></span>
                                            </div> 
                                        </label>
                                        <div className="rightside">
                                            <p>
                                                <span>Card Number</span>
                                                xxxxxxxxxxxx1234
                                             </p>
                                             <p className="diff">
                                                <span>Expiry</span>
                                                08/20
                                             </p>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label className="leftside">
                                           <div class="circleRadio">
                                            <input type="radio" name="credit"/><span></span>
                                            </div> 
                                        </label>
                                        <div className="rightside">
                                            <p>
                                                <span>Card Number</span>
                                                xxxxxxxxxxxx1234
                                             </p>
                                             <p className="diff">
                                                <span>Expiry</span>
                                                08/20
                                             </p>
                                        </div>
                                    </div>
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
                                <input type="radio"/><span></span>
                                </div>Make Primary
                            </label>
                        </div>
                        <div className="flipCardHolder">
                            <div className={listCardAnnim ? "cardList show" : "cardList hide"}>
                                <div className="header">
                                    <div className="headerLeft">
                                        <img src={bank} alt=""/> Bank Accounts
                                    </div>
                                    <button className="cardAddBtn"  onClick={openNewCardHandler2}>Add an Account</button>
                                </div>
                                <div className="body">
                                    <div className="list active">
                                        <label className="leftside">
                                           <div class="circleRadio">
                                            <input type="radio" name="credit"/><span></span>
                                            </div> Active
                                        </label>
                                        <div className="rightside">
                                            <p>
                                                <span>Account Number</span>
                                                xxxxxxxxxxxx1234
                                             </p>
                                             <p className="diff">
                                                <span>Routing #</span>
                                                12345678
                                             </p>
                                             <div className="checking">checking</div>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label className="leftside">
                                           <div class="circleRadio">
                                            <input type="radio" name="credit"/><span></span>
                                            </div> 
                                        </label>
                                        <div className="rightside">
                                            <p>
                                                <span>Account Number</span>
                                                xxxxxxxxxxxx1234
                                             </p>
                                             <p className="diff">
                                                <span>Routing #</span>
                                                12345678
                                             </p>
                                             <div className="checking">checking</div>
                                        </div>
                                    </div>
                                    <div className="list">
                                        <label className="leftside">
                                           <div class="circleRadio">
                                            <input type="radio" name="credit"/><span></span>
                                            </div> 
                                        </label>
                                        <div className="rightside">
                                            <p>
                                                <span>Account Number</span>
                                                xxxxxxxxxxxx1234
                                             </p>
                                             <p className="diff">
                                                <span>Routing #</span>
                                                12345678
                                             </p>
                                             <div className="checking">checking</div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                           
                            <div className={newCardAnnim ? "addInList show" : "addInList hide"}>
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