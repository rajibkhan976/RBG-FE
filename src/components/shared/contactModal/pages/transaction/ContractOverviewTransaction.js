import React, { useEffect, useState, useRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/downpayment.svg";
import modalTopIcon from "../../../../../assets/images/setupicon5.svg";
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
import help from "../../../../../assets/images/help.svg";
import bankActive from "../../../../../assets/images/bankActive.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";



const ContractOverviewTransaction = (props) => {
  
  const [contractOverview, setContractOverview] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const [addPogramModal, setAddPogramModal] = useState(false);
  
  const addPogramModalFn = () => {
    setAddPogramModal(true);
  };


  const closePogramModal = () => {
    setAddPogramModal(false);
  };
  
  const contractOverviewFn = (e) => {
    e.preventDefault();
    setContractOverview(true);
  };


 


    return (
      <div className="posSellingForm contractOverview">
        {props.showLoader && <Loader />}
        {props.successMsg &&
            <div className="formMsg success"></div>
        }
        {props.errorMsg &&
            <div className=""></div>
        }



        <div className="productAvailable contractdetails active">
          <div class="programOverview"> 
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

          <div class="programOverview"> 
              <header className='informHeader paymentAdd'>
                    <h5>Billing Overview <span class="addPaymentInfo">+ Add</span></h5>
              </header>
              <div className="bodytransactionForm">
                <p className="paymentTypes">Cards</p>

                <div className="chooseTransactionType paymentTypes" >
                
                    <label>
                        <div class="circleRadio">
                            <input type="radio" name="transactionTypeCard"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={card} alt=""/>
                        </div>
                        <div class="paymentModuleInfos">
                          <span className="accNumber">Credit Card ending with <b>1234</b></span>
                          <span className="accinfod">Expires  07 / 25</span>
                        </div>
                        
                    </label>
                    <label> 
                        <div class="circleRadio">
                            <input type="radio"
                                name="transactionTypeCard"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={card} alt=""/>
                        </div>
                        <div class="paymentModuleInfos">
                          <span className="accNumber">Debit Card ending with <b>7890</b></span>
                          <span className="accinfod">Expires  05 / 28</span>
                        </div>
                    </label>
                </div>

                <p className="paymentTypes bank">Bank</p>

                <div className="chooseTransactionType paymentTypes" >
                
                    <label>
                        <div class="circleRadio">
                            <input type="radio" name="transactionTypeBank"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={banks} alt=""/>
                        </div>
                        <div class="paymentModuleInfos">
                          <span className="accNumber">Bank account ending with <b>1234</b></span>
                          <span className="accinfod">Routing Number  10000100</span>
                        </div>
                        
                    </label>
                    <label> 
                        <div class="circleRadio">
                            <input type="radio"
                                name="transactionTypeBank"/><span></span>
                        </div> 
                        <div className="cardImage">
                          <img src={banks} alt=""/>
                        </div>
                        <div class="paymentModuleInfos">
                          <span className="accNumber">Bank account ending with <b>7890</b></span>
                          <span className="accinfod">Routing Number  10000200</span>
                        </div>
                    </label>
                </div>


              </div>
          </div> 

        </div>                    

        <div className="productAvailable paymentDetails active">
          <div class="programOverview"> 
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
                            <span class="tooltiptextInfo">$149 x 12 Months</span>
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
                <div class="paymentModuleInfos">
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
                <div class="paymentModuleInfos">
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
                  <img src={outstandingCash} alt=""/>
                </div>
                <div class="paymentModuleInfos">
                  <span className="accNumber">Down Payment 1</span>
                  <span className="accinfod"><b>$ 299.00</b></span>
                </div>
                <label className="receivedCash"><div class="customCheckbox"><input type="checkbox" name="" id="" /><span></span></div>I have received the amount by Cash</label>
              </div>
              <div className="downpaymentsPayDetails">
                <div className="payDate currentPayment">
                  <img src={payDate} alt=""/> 02/04/2022
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    );
};

export default ContractOverviewTransaction;