import { useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import editForModal from "../../../../../../src/assets/images/editForModal.svg";


const EditTrModal = (props) => {
  
    

    return (
        <div className="modalBackdrop transactionModal">
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal (false)}><img src={crossImg} alt="" /></button>  
                    <div className="circleForIcon"><img src={editForModal} alt="" /></div>
                    <h3>Edit Transactions</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing</p>
                </div>
                <div className="cmnForm fullWidth">
                    <form>
                        <div class="cmnFormRow fullWidth flatForm">
                            <label class="cmnFieldName">Change Date</label>
                            <input type="date" class="cmnFieldStyle" value=""/>
                        </div>
                        <div class="cmnFormRow fullWidth flatForm">
                            <label class="cmnFieldName">Change Payment Mode</label>
                            <select class="cmnFieldStyle selectBox">
                                <option value="">Online</option>
                                <option value="">Cash</option>
                            </select>
                            <div className="onlinePymentboxTrans">
                                <div className="head">
                                    <h3>Payment Source</h3>
                                    <button className="addBtn_style2">+ Add</button>
                                </div>
                                <div className="paymentSourcetabs">
                                    <div className="tabBtns">
                                        <button className="active">Card</button>
                                        <button>Bank</button>
                                    </div>
                                    <div className="tabcontent">
                                        <ul>
                                            <li>
                                                <div className="radio"></div>
                                                <div className="img">
                                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V2H18V4Z" />
                                                    </svg>
                                                </div>
                                                <div className="text">
                                                    <h3>Creadit Card ending with 1234</h3>
                                                    <p>Expires  07 / 25</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                 </div> {/* end of tab body */}
                            </div>  
                       </div> 
                       <div class="cmnFormRow fullWidth flatForm">
                            <label class="cmnFieldName">Change Amount</label>
                            <div class="cmnFormField preField"><div class="unitAmount">$</div>
                                 <input type="number" class="cmnFieldStyle" placeholder="300" value="300"/>                      
                            </div>
                        </div>
                        <div className="notifyBox">
                            <label className="d-flex f-align-center">
                                <div class="customCheckbox">
                                    <input type="checkbox" name="" value=""/>
                                    <span></span>
                                </div>
                                <div>I want update this change for all the upcoming transactions of this subscription</div>
                            </label>
                        </div>
                        <button class="saveNnewBtn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditTrModal;