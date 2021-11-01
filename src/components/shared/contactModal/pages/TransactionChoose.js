import React, { useState } from "react";
import aaroww from "../../../../assets/images/arrow_forward.svg";
import arrow_forward from "../../../../assets/images/backIcon.svg";
import tick from "../../../../assets/images/tick.svg";
import camera from "../../../../assets/images/camera.svg";
import categoryTag from "../../../../assets/images/categoryTag.svg";
import product from "../../../../assets/images/proImg4.png";

  

const TransactionChoose = (props) => {


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
    const activeClassHandler = (event) => {
        event. preventDefault();
        setAddActive(!addActive);
    };
    const [addActive2, setAddActive2] = useState(false);
    const activeClassHandler2 = (event) => {
        event. preventDefault();
        setAddActive2(!addActive2);
    };

    return(
        <>
            <div className="contactTabsInner">
                
                <div className="transHeader pos">
                    <div class="backToTransction">
                        <button className="backBtn" onClick={props.backToTransList}><img src={arrow_forward} alt=""/></button>
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
                                    {/* <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#369ED5" }} onClick={activeClassHandler}>
                                        <img src={addActive ? tick : ""} alt=""/>
                                    </button>
                                    <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#797D62" }} onClick={activeClassHandler}>
                                        <img src={addActive ? tick : ""} alt=""/>
                                    </button> */}
                                    <button className="addColor" style={{ backgroundColor: "#369ED5" }}></button>
                                    <button className="addColor"  style={{ backgroundColor: "#797D62" }}></button>
                                </div>
                            </div>
                            <div class="formControl">
                                <label>Available Sizes</label>
                                <div class="pickSize">
                                    <button className={addActive2 ? "size active" :  "size"}  onClick={activeClassHandler2}>S</button>
                                    {/* <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>M</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>L</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>XL</button> */}
                                    <button className="size">M</button>
                                    <button className="size">L</button>
                                </div>
                            </div>
                            <div className="formsection">
                                <label>Price</label>
                                <input type="text" placeholder="Ex: 99" className="editableInput"/> <span className="tax"> * 10% tax will be applicable</span>
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable">
                            <h3 className="commonHeadding">Preview Windows</h3>
                            <div className="previewBox">
                                <div className="previewImgBox">
                                    <span className="sizeTag">S</span>
                                    <img src={camera} alt="" />
                                   <span> Preview image</span>
                                </div>
                                <h3>Product Name</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> Category</p>
                                   
                                <h4>$ 000</h4>
                                <span className="tax"> * Amount showing including taxes </span>
                            </div>

                            <button class="saveNnewBtn">Buy <img src={aaroww} alt=""/></button>
                        </div>
                    </form>
                </div>
               }
                { chooseCourse && <div className="posSellingForm">
                <form>
                        <div className="transaction_form">
                            <div className="formsection gap">
                                <label>Select Catagory</label>
                                <select className="selectBox">
                                    <option>Select Catagory</option>
                                </select>
                            </div>
                            <div className="formsection gap">
                                <label>Select Course</label>
                                <select className="selectBox">
                                    <option>Select Course</option>
                                </select>
                            </div>
                            
                            <div className="formsection">
                                <label>Price</label>
                                <input type="text" placeholder="Ex: 99" className="editableInput"/> <span className="tax"> * 10% tax will be applicable</span>
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable active">
                            <h3 className="commonHeadding">Preview Windows</h3>
                            <div className="previewBox">
                                <div className="previewImgBox">
                                    <span className="sizeTag">S</span>
                                    <img src={product} alt="" />
                                 
                                </div>
                                <h3>Easy Entry Course</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> Jim and Training</p>
                                   
                                <h4>$ 100</h4>
                                <span className="tax"> * Amount showing including taxes </span>
                            </div>

                            <button class="saveNnewBtn">Buy <img src={aaroww} alt=""/></button>
                        </div>
                    </form>
                </div>
                }
            </div>
        </>
    );
}

export default TransactionChoose;