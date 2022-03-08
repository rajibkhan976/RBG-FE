import { useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import editForModal from "../../../../../../src/assets/images/editForModal.svg";
import plus_icon from "../../../../../../src/assets/images/plus_icon.svg";
import cross_small from "../../../../../../src/assets/images/cross_small.svg";


const EditTrModal = (props) => {
    const [editCardPart, setEditCardPart] = useState(true);
    const [editBankPart, setEditBankPart] = useState(false);

    const [editCardDetailsPart, setEditCardDetailsPart] = useState(false);
    const [editBankDetailsPart, setEditBankDetailsPart] = useState(false);

    const [cashOrOnline, setCashOrOnline] = useState("");

    const [openOnlineBox, setOpenOnlineBox] = useState(false);

    const [editTransFormData, setEditTransFormData] = useState({
        amount: "",
        date: "",
        mode: "",
        note: false
    });
    const [formErrorMsg, setFormErrorMsg] = useState({
        amount: "",
        date: "",
        mode: "",
        note: false,
    });

    const editCardHandler = (e) =>{
        e.preventDefault();
        setEditCardPart(true);
        setEditBankPart(false);
        setEditCardDetailsPart(false);
        setEditBankDetailsPart(false);
    }
    const editBankHandler = (e) =>{
        e.preventDefault();
        setEditBankPart(true);
        setEditCardPart(false);
        setEditCardDetailsPart(false);
        setEditBankDetailsPart(false);
    }
    const editCardDetailsHandler = (e) =>{
        e.preventDefault();
        setEditCardDetailsPart(true);
        setEditCardPart(false);
        setEditBankPart(false);
        setEditBankDetailsPart(false);
    }
    const editBankDetailsHandler = (e) =>{
        e.preventDefault();
        setEditBankDetailsPart(true);
        setEditBankPart(false);
        setEditCardPart(false);
        setEditCardDetailsPart(false);
    }
    const selectCashOrOnlineHandler = (e) =>{
        let val = e.target.value;
        fieldErrorCheck.checkmode(val);
        //console.log(e.target.value);
        if(e.target.value === "online") { 
            setOpenOnlineBox(true);
        }else {
            setOpenOnlineBox(false);
        }
    }
    const changeTransDateHandler = (e) =>{
        let val = e.target.value;
        fieldErrorCheck.checkdate(val);
    }
    const changeTransAmountHandler = (e) =>{
        let val = e.target.value;
        fieldErrorCheck.checkamount(val);
    }
    const checkNoteHandler = (e) =>{
        let val = e.target.value;
        fieldErrorCheck.checknote(val);
        
    }
    
    
    const fieldErrorCheck = {

        checkdate: (val) => {
            setEditTransFormData({...editTransFormData, date: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, date: "Please enter date"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, date: ""}));
            }
        },
        checkamount: (val) => {
            setEditTransFormData({...editTransFormData, amount: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, amount: "Please enter amount"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, amount: ""}));
            }
        },
        checkmode: (val) => {
            setEditTransFormData({...editTransFormData, mode: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, mode: "Please enter Payment mode"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, mode: ""}));
            }
        },
        checknote: (val) => {
            setEditTransFormData({...editTransFormData, note: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, note: "Please check to submit"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, note: ""}));
            }
        }
    }
     
    
    const editMainFormSubmit = (e) =>{
        e.preventDefault();
        fieldErrorCheck.checkmode(editTransFormData.mode);
        fieldErrorCheck.checkamount(editTransFormData.amount);
        fieldErrorCheck.checkdate(editTransFormData.date);

        console.log("fffffffffffffffff",editTransFormData.mode,editTransFormData.amount,editTransFormData.date);
    }

    return (
        <div className="modalBackdrop transactionModal">
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal (false)}><img src={crossImg} alt="" /></button>  
                    <div className="circleForIcon"><img src={editForModal} alt="" className="small"/></div>
                    <h3>Edit Transactions</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing</p>
                </div>
                <div className="cmnForm fullWidth">
                    <form>
                        <div class="cmnFormRow fullWidth flatForm">
                            <label class="cmnFieldName">Change Date</label>
                            <input type="date" class="cmnFieldStyle" value={editTransFormData.date} onChange={changeTransDateHandler}/>
                            { formErrorMsg.date &&
                            <div className="errorMsg">{formErrorMsg.date}</div>
                            }
                        </div>
                        <div class="cmnFormRow fullWidth flatForm">
                            <label class="cmnFieldName">Change Payment Mode</label>
                            <select class="cmnFieldStyle selectBox" onChange={selectCashOrOnlineHandler} value={editTransFormData.mode}>
                                <option value="">Select</option>
                                <option value="online">Online</option>
                                <option value="cash">Cash</option>
                            </select>
                            { formErrorMsg.mode &&
                            <div className="errorMsg">{formErrorMsg.mode}</div>
                            }
                            {openOnlineBox && 
                                 <div className="onlinePymentboxTrans">
                                 <div className="head">
                                     <h3>
                                         { (editCardDetailsPart || editBankDetailsPart) ? "Add a New Payment Source" : "Payment Source"}         
                                              
                                     </h3>
                                     {editCardPart && <button className="addBtn_style2" onClick={editCardDetailsHandler}>+ Add</button>}
                                     {editBankPart && <button className="addBtn_style2" onClick={editBankDetailsHandler}>+ Add</button>}
                                     {editCardDetailsPart && <button className="noFill" onClick={editCardHandler}><img src={cross_small} alt=""/></button>}  
                                     {editBankDetailsPart && <button className="noFill" onClick={editBankHandler}><img src={cross_small} alt=""/></button>}  
                                 </div>
                                 <div className="paymentSourcetabs">
                                     <div className="tabBtns">
                                         <button className={(editCardPart || editCardDetailsPart) ? "active" : ""} onClick={editCardHandler}>Card</button>
                                         <button className={(editBankPart || editBankDetailsPart) ? "active" : ""} onClick={editBankHandler}>Bank</button>
                                         
                                     </div>
                                     
                                         <div className="tabcontent">
                                            {editCardPart &&
                                                 <ul>
                                                     <li>
                                                         <div className="radio">
                                                             <div class="circleRadio">
                                                                 <input type="radio"/>
                                                                 <span></span>
                                                             </div>
                                                         </div>
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
                                                     <li>
                                                         <div className="radio">
                                                             <div class="circleRadio">
                                                                 <input type="radio"/>
                                                                 <span></span>
                                                             </div>
                                                         </div>
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
                                                     <li>
                                                         <div className="radio">
                                                             <div class="circleRadio">
                                                                 <input type="radio"/>
                                                                 <span></span>
                                                             </div>
                                                         </div>
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
                                             }
                                             {/* edit form for card */}
                                             {editCardDetailsPart && 
                                                 <div className="editform">
                                                     <div class="editformRow">
                                                         <label class="editFormLabel">Card Number</label>
                                                         <input type="text" className="editFormStyle" placeholder="xxxx-xxxx-xxxx-xxxx"/>
                                                     </div>
                                                     <div class="editformRow">
                                                         <label class="editFormLabel">Card Holder Name</label>
                                                         <input type="text" className="editFormStyle" placeholder="Ex. Adam Smith"/>
                                                     </div>
                                                     <div class="editformRow">
                                                         <div className="half">
                                                             <label class="editFormLabel">Expiry Date</label>
                                                             <input type="text" className="editFormStyle" placeholder="mm/yy"/>
                                                         </div>
                                                         <div className="half">
                                                             <label class="editFormLabel">CVC</label>
                                                             <input type="text" className="editFormStyle"/>
                                                         </div>
                                                     </div>
                                                     <div className="d-flex justify-content-center mt20">
                                                         <button class="creatUserBtn"><img class="plusIcon" src={plus_icon} alt=""/><span>Add my Card</span></button>
                                                     </div>
                                                 </div>
                                             }

                                         {/* //end condition for card */}
                                        {editBankPart &&  
                                            <ul>
                                              <li>
                                                  <div className="radio">
                                                      <div class="circleRadio">
                                                          <input type="radio"/>
                                                          <span></span>
                                                      </div>  
                                                  </div>
                                                  <div className="img">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 10H4V17H7V10Z" />
                                                        <path d="M13.5 10H10.5V17H13.5V10Z"/>
                                                        <path d="M22 19H2V22H22V19Z"/>
                                                        <path d="M20 10H17V17H20V10Z"/>
                                                        <path d="M12 1L2 6V8H22V6L12 1Z"/>
                                                    </svg>
                                                  </div>
                                                  <div className="text">
                                                      <h3>Account number ending with 1234</h3>
                                                      <p>#Routing </p>
                                                  </div>
                                              </li>
                                             
                                            </ul>
                                            }
                                             {editBankDetailsPart && 
                                                 <div className="editform">
                                                     <div class="editformRow">
                                                         <label class="editFormLabel">Account Number</label>
                                                         <input type="text" className="editFormStyle"/>
                                                     </div>
                                                     <div class="editformRow">
                                                         <label class="editFormLabel">Account Holder Name</label>
                                                         <input type="text" className="editFormStyle"/>
                                                     </div>
                                                     <div class="editformRow">
                                                         <div className="half">
                                                             <label class="editFormLabel">Routing #</label>
                                                             <input type="text" className="editFormStyle" />
                                                         </div>
                                                         <div className="half">
                                                             <label class="editFormLabel">Account Type</label>
                                                             <select className="editFormStyle">
                                                                 <option>Checking</option>
                                                             </select>
                                                         </div>
                                                     </div>
                                                     <div className="d-flex justify-content-center mt20">
                                                         <button class="creatUserBtn"><img class="plusIcon" src={plus_icon} alt=""/><span>Add my Card</span></button>
                                                     </div>
                                                     
                                                 </div>
                                             }
                                      </div>               
                                     
                                  </div> {/* end of tab body */}
                             </div>  
                            } 
                            {/* //total box is ended here  */}
                           
                        </div> 
                       <div class="cmnFormRow fullWidth flatForm">
                            <label class="cmnFieldName">Change Amount</label>
                            <div class="cmnFormField preField"><div class="unitAmount">$</div>
                                 <input type="number" class="cmnFieldStyle" placeholder="300" value={editTransFormData.amount} onChange={changeTransAmountHandler}/>                      
                            </div>
                            { formErrorMsg.amount &&
                            <div className="errorMsg">{formErrorMsg.amount}</div>
                            }
                        </div>
                        <div className="notifyBox">
                            <label className="d-flex f-align-center">
                                <div class="customCheckbox">
                                    <input type="checkbox" name="" onChange={checkNoteHandler} defaultCheck={editTransFormData.note ? "checked" : ""}/>
                                    <span></span>
                                </div>
                                <div>I want update this change for all the upcoming transactions of this subscription</div>
                            </label>
                        </div>
                        <div className="btnPlaceMiddle">
                            <button class="saveNnewBtn" onClick={editMainFormSubmit}>Submit</button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditTrModal;
