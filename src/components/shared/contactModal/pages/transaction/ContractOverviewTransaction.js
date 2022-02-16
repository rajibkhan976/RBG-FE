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
import bankActive from "../../../../../assets/images/bankActive.svg";
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
                
              </div>
          </div> 
        </div>

      </div>
    );
};

export default ContractOverviewTransaction;