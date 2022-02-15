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