import React, { useState } from "react";
import arrow_forward from "../../../../assets/images/backIcon.svg";
import tick from "../../../../assets/images/tick.svg";


const TransactionChoose = () => {


    const [choosePOS, setChoosetPOS] = useState(false);
    const [chooseCourse, setChooseCourse] = useState(false);
    
    const chooseTransctionTypePOS = () => {
        setChoosetPOS(!choosePOS);
        setChooseCourse(false)
    }
    const chooseTransctionTypeCourse = () => {
        setChoosetPOS(false);
        setChooseCourse(!chooseCourse)
    }

    const [addActive, setAddActive] = useState(false);
    const activeClassHandler = () => {
        setAddActive(!addActive);
    };


    return(
        <>
            <div className="contactTabsInner">
                
                <div className="transHeader pos">
                    <div class="backToTransction">
                        <button className="backBtn"><img src={arrow_forward} alt=""/></button>
                    </div>
                    <div>
                        <h3 className="headingTabInner">Make a Transaction {/* <span className="posTag">POS</span> */} </h3> 
                        <span>* Explanatory text blurb should be here.</span>
                    </div>
                    
                </div>
                <div className="chooseTransactionType">
                    <label>
                    <div class="circleRadio">
                        <input type="radio" 
                        name="transactionType"
                        onChange={chooseTransctionTypePOS}
                        /><span></span>
                        </div> Product
                    </label>
                    <label>
                    <div class="circleRadio">
                    <input type="radio" 
                        name="transactionType"
                        onChange={chooseTransctionTypeCourse}
                        /><span></span>
                        </div> Course
                    </label>
                </div>
               { choosePOS && <div className="posSellingForm">
                    <form>
                        <div className="transaction_form">
                            <div className="formsection gap">
                                <label>Select Catagory</label>
                                <select className="selectBox">
                                    <option>Select Catagory</option>
                                </select>
                            </div>
                            <div className="formsection gap">
                                <label>Select Product</label>
                                <select className="selectBox">
                                    <option>Select Product</option>
                                </select>
                            </div>
                            <div class="formControl">
                                <label>Available Colours</label>
                                <div class="pickColor">
                                    <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#834140" }} onClick={activeClassHandler}>
                                         <img src={addActive ? tick : ""} alt=""/>
                                    </button>
                                    <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#369ED5" }} onClick={activeClassHandler}>
                                        <img src={addActive ? tick : ""} alt=""/>
                                    </button>
                                    <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#797D62" }} onClick={activeClassHandler}>
                                        <img src={addActive ? tick : ""} alt=""/>
                                    </button>
                                </div>
                            </div>
                            <div class="formControl">
                                <label>Available Sizes</label>
                                <div class="pickSize">
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>S</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>M</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>L</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>XL</button>
                                </div>
                            </div>
                            <div className="formsection">
                                <label>Price</label>
                                <input type="text" placeholder="Ex: 99" className="editableInput"/>
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable">
                            <h3>Preview Windows</h3>
                        </div>
                    </form>
                </div>
               }
                { chooseCourse && <div className="posSellingForm">
                        <div className="productAvailable">
                            dddlm
                        </div>
                 </div>
                }
            </div>
        </>
    );
}

export default TransactionChoose;