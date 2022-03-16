import React, { useEffect, useState, useRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/downpayment.svg";
import payMode from "../../../../../assets/images/paymode.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import profileAvatar from "../../../../../assets/images/camera.svg";
import chooseImg from "../../../../../assets/images/chooseImg.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import program from "../../../../../assets/images/program.png";
import card from "../../../../../assets/images/card.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
import banks from "../../../../../assets/images/banks.svg";
import outstandingCard from "../../../../../assets/images/outstandingCard.svg";
import outstandingCash from "../../../../../assets/images/outstandingCash.svg";
import cashCurrent from "../../../../../assets/images/cashCurrent.svg";
import help from "../../../../../assets/images/help.svg";
import bankActive from "../../../../../assets/images/bankActive.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";



const ContractOverviewTransaction = (props) => {
  
  const [contractOverview, setContractOverview] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const [addBankModal, setAddBankModal] = useState(false);

  const [paymentFailed, setPaymentFailed] = useState(false);

  const paymentFailedFn = () => {
    setPaymentFailed(true);
  };

  const closeFailedPayModal = () => {
    setPaymentFailed(false);
  };
  
  const addBankModalFn = () => {
    setAddBankModal(true);
  };


  const closeBankModal = () => {
    setAddBankModal(false);
  };
  
  const contractOverviewFn = (e) => {
    e.preventDefault();
    setContractOverview(true);
  };


  const [choosePOS, setChoosetPOS] = useState(true);
  const [chooseCourse, setChooseCourse] = useState(false);

  const chooseTransctionTypePOS = () => {
    setChoosetPOS(!choosePOS);
    setChooseCourse(false);
}


const chooseTransctionTypeCourse = () => {
      setChoosetPOS(false);
      setChooseCourse(!chooseCourse);
      
 
}

 


    return (
      <div className={props.paymentSuccess ? "posSellingForm contractOverview hide" : "posSellingForm contractOverview"}  >
        {props.showLoader && <Loader />}
        {props.successMsg &&
            <div className="formMsg success"></div>
        }
        {props.errorMsg &&
            <div className=""></div>
        }



        <div className="productAvailable contractdetails active">
          <div className="programOverview"> 
              <header className='informHeader'>
                    <h5>Program Overview</h5>
              </header>
              <div className="bodytransactionForm">
              <div className="programDetailsInfos">
                <div className="programListImage">
                  <img src={program} alt="" />
                </div>
                <div className="programInfos">
                  <h6 className="programHeading">Lifetime Jujutsu Program...</h6>
                  <ul className="programInfosUl">
                    <li>
                      <span className="labelSpan">Duration</span>
                      <span className="informationSpan"><b>12 Months</b></span>
                    </li>
                    <li>
                      <span className="labelSpan">Auto Renual</span>
                      <span className="informationSpan">OFF</span>
                    </li>
                  </ul>
                </div>
                </div>
              </div>
          </div>    

          <div className="programOverview"> 
              <header className='informHeader paymentAdd'>
                    <h5>Billing Overview <span onClick={(e)=>{addBankModalFn()}} className="addPaymentInfo">+ Add</span></h5>
              </header>
              <div className="bodytransactionForm">
                <p className="paymentTypes">Cards</p>

                <div className="chooseTransactionType paymentTypes" >
                
                    <label>
                        <div className="circleRadio">
                            <input type="radio" name="transactionTypeCard"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={card} alt=""/>
                        </div>
                        <div className="paymentModuleInfos">
                          <span className="accNumber">Credit Card ending with <b>1234</b></span>
                          <span className="accinfod">Expires  07 / 25</span>
                        </div>
                        
                    </label>
                    <label> 
                        <div className="circleRadio">
                            <input type="radio"
                                name="transactionTypeCard"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={card} alt=""/>
                        </div>
                        <div className="paymentModuleInfos">
                          <span className="accNumber">Debit Card ending with <b>7890</b></span>
                          <span className="accinfod">Expires  05 / 28</span>
                        </div>
                    </label>
                </div>

                <p className="paymentTypes bank">Bank</p>

                <div className="chooseTransactionType paymentTypes" >
                
                    <label>
                        <div className="circleRadio">
                            <input type="radio" name="transactionTypeCard"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={banks} alt=""/>
                        </div>
                        <div className="paymentModuleInfos">
                          <span className="accNumber">Bank account ending with <b>1234</b></span>
                          <span className="accinfod">Routing Number  10000100</span>
                        </div>
                        
                    </label>
                    <label> 
                        <div className="circleRadio">
                            <input type="radio"
                                name="transactionTypeCard"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={banks} alt=""/>
                        </div>
                        <div className="paymentModuleInfos">
                          <span className="accNumber">Bank account ending with <b>7890</b></span>
                          <span className="accinfod">Routing Number  10000200</span>
                        </div>
                    </label>
                </div>


              </div>
          </div> 

        </div>                    

        <div className="productAvailable paymentDetails active">
          <div className="programOverview"> 
              <header className='informHeader'>
                    <h5>Payment Overview</h5>
              </header>
              <div className="bodytransactionForm">
              <ul className="programInfosUl paymentOverviews">
                    <li>
                      <div className="labelSpan">Total Down Payment Amount</div>
                      <div className="informationSpan">$499.00</div>
                    </li>
                    <li>
                      <div className="labelSpan">Total Tuition Amount</div>
                      <div className="informationSpan">
                        <span className="infoSpan">
                            <img src={help} alt="" />
                            <span className="tooltiptextInfo">$149 x 12 Months</span>
                        </span>&nbsp;&nbsp;$1788.00</div>
                    </li>
                  </ul>
                  <ul className="totalPaymentUl">
                    <li>Total</li>
                    <li>$2287.00</li>
                  </ul>
              </div>
          </div> 

          <div className="outstandingOverview">
            <div className="outstandingDownpayment">
              <div className="downpaymentsDetails">
                <div className="cardImage">
                  <img src={outstandingCash} alt=""/>
                </div>
                <div className="paymentModuleInfos">
                  <span className="accNumber">Down Payment 2</span>
                  <span className="accinfod"><b>$ 299.00</b></span>
                </div>
              </div>
              <div className="downpaymentsPayDetails">
                <div className="paymentStatus due">Due</div>
                <div className="payDate">
                  <img src={payDate} alt=""/> 02/04/2022
                </div>
              </div>
            </div>
            <div className="outstandingDownpayment tutuionSubscriptions">
              <div className="downpaymentsDetails">
                <div className="cardImage">
                  <img src={outstandingCard} alt=""/>
                </div>
                <div className="paymentModuleInfos">
                  <span className="accNumber">Tuition Amount</span>
                  <span className="accinfod"><b>$ 149.00</b> / Month</span>
                </div>
              </div>
              <div className="downpaymentsPayDetails">
              <div className="payDate instalments">Payment Remaing ... <b>11</b></div>
                <div className="payDate instalmentDate">
                  <img src={payDate} alt=""/> 02/04/2022
                </div>
              </div>
            </div>

            <ul className="totalPaymentUl outstandings">
                    <li>Outstanding</li>
                    <li>$1938.00</li>
                  </ul>
          </div>

          <div className="dottedBorder"></div>

          <div className="currentPaymentOverview">
            <div className="outstandingDownpayment">
              <div className="downpaymentsDetails">
                <div className="cardImage">
                  <img src={cashCurrent} alt=""/>
                </div>
                <div className="paymentModuleInfos">
                  <span className="accNumber">Down Payment 1</span>
                  <span className="accinfod"><b>$ 299.00</b></span>
                </div>
                
              </div>
              <div className="downpaymentsPayDetails">
                <div className="payDate currentPayment">
                  <img src={payDate} alt=""/> Now
                </div>
              </div>
              <label className="receivedCash"><div className="customCheckbox"><input type="checkbox" name="" id="" /><span></span></div>I have received the amount by Cash</label>
            </div>

            <div className="outstandingDownpayment tutuionSubscriptions currentPayment">
              <div className="downpaymentsDetails">
                <div className="cardImage">
                  <img src={cardActive} alt=""/>
                </div>
                <div className="paymentModuleInfos">
                  <span className="accNumber">Tuition Amount</span>
                  <span className="accinfod"><b>$ 149.00</b></span>
                </div>
              </div>
              <div className="downpaymentsPayDetails">
                <div className="payDate currentPayment">
                  <img src={payDate} alt=""/> Now
                </div>
              </div>
            </div>
          </div>

          <div className="totalCartValue">
              <div className="billingAmt">
                <p>Billing Total</p>
                <h4>$ 349.00</h4>
              </div>
              <div className="buyBtns">
              {/* <button onClick={(e)=> {paymentFailedFn()}} className="saveNnewBtn">Bill Now <img src={aaroww} alt="" /></button> */}
              <button onClick={props.paymentSuccessFn} className="saveNnewBtn">Bill Now <img src={aaroww} alt="" /></button>
              
              </div>
            </div>

          
        </div>



        {addBankModal && (
         <div className="modalBackdrop holiday"> 
         
           <div className="slickModalBody">
           
             <div className="slickModalHeader">
               <button className="topCross" onClick={closeBankModal}><img src={crossTop} alt="" /></button>
               <div className="circleForIcon"><img src={payMode} alt="" /></div>
                       <h3 className="courseModalHeading">Add new billling Option</h3>
                       <p className="courseModalPara">Lorem Ipsum is simply dummy text of the printing</p>
             </div>

            <div className="payModalDetails">

                  <div className="choosePaymentInfo" >
                      
                          <label>
                              <div className="circleRadio">
                                  <input type="radio"
                                      name="transactionType" defaultChecked={choosePOS && "checked" }
                                      onChange={chooseTransctionTypePOS}
                                  /><span></span>
                              </div> Card
                          </label>
                          <label> 
                              <div className="circleRadio">
                                  <input type="radio"
                                      name="transactionType"
                                      onChange={chooseTransctionTypeCourse}
                                  /><span></span>
                              </div> Bank Account
                          </label>
                      </div>


                    {choosePOS && 
                    <div className="posSellingForm">
                        
                        <div className="modalForm auto">
                          <form >  
                            <div className="formControl">
                              <label>Card Number</label>
                              <input type="number" placeholder="xxxx-xxxx-xxxx-xxxx" name="" />
                            </div>

                            <div className="formControl">
                              <label>Card Holder Name</label>
                              <input type="text" placeholder="Ex. Adam Smith" name="" />
                            </div>
                            
                            <div className="d-flex justified-space-between">
                              <div className="formControl half">
                              <label>Expiry Date</label>
                              <input type="text" placeholder="mm/yy"  name=""/>
                            </div>
                            <div className="formControl half">
                              <label>CVC</label> 
                              <input type="text"  name=""/>
                            </div>
                            </div>
                            {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraclassName="addStatsPopMsg"/> }
                            { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraclassName="addStatsPopMsg"/>} */}
              
                             <div className="modalbtnHolder">
                                <button type="reset" className="saveNnewBtn"><img src={pluss} alt="" />Add my Card</button>
                             </div>
                          </form>
                        </div>


                    </div>
                    }


                  {chooseCourse && 
                    <div className="posSellingForm">
                      <div className="modalForm auto">
                          <form >  
                            <div className="formControl">
                              <label>Account Number</label>
                              <input type="number" placeholder="xxxx-xxxx-xxxx-xxxx" name="" />
                            </div>

                            <div className="formControl">
                              <label>Account Holder Name</label>
                              <input type="text" placeholder="Ex. Adam Smith" name="" />
                            </div>
                            
                            <div className="d-flex justified-space-between">
                              <div className="formControl half">
                              <label>Routing #</label>
                              <input type="text"  name=""/>
                            </div>
                            <div className="formControl half">
                              <label>Account Type</label> 
                              <select className='selectBox'>
                                    <option value="null">Checking</option>
                                </select>
                            </div>
                            </div>
                            {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraclassName="addStatsPopMsg"/> }
                            { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraclassName="addStatsPopMsg"/>} */}
              
                             <div className="modalbtnHolder">
                                <button type="reset" className="saveNnewBtn"><img src={pluss} alt="" />Add my Bank Account</button>
                             </div>
                          </form>
                        </div>

                    </div>
                    }
            </div>

             
           </div>
         </div>
        )}




      {paymentFailed && (
        <div className="modalBackdrop holiday">           
          <div className="slickModalBody paymentFailed">            
            <div className="slickModalHeader">
               <button className="topCross" onClick={closeFailedPayModal}><img src={crossTop} alt="" /></button> 
              <div className="circleForIcon"><img src={paymentFail} alt="" /></div>
                      <h3 className="courseModalHeading">Payment Failed !</h3>
            </div>
            <div className="payModalDetails">
              {/* <div className="choosePaymentInfo" >                      
                <label>
                    <div className="circleRadio">
                        <input type="radio" name="transactionType"/><span></span>
                    </div> Card
                </label>
                <label> 
                    <div className="circleRadio">
                        <input type="radio" name="transactionType"/><span></span>
                    </div> Bank Account
                </label>
              </div>                    */}
              <img src={cardFail} alt="" />
              <p>Payment Failed. We arn’t able to Process your Payment, Pease try again !</p>
            </div>

            <div className="buyBtns failedPayment">
              <button onClick={props.paymentSuccessFn} className="saveNnewBtn">Close</button>
              
              </div>             
            </div>
        </div>
      )}


      </div>
    );
};

export default ContractOverviewTransaction;