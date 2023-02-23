import { useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import refundImg from "../../../../../../src/assets/images/cashCurrent.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import { TransactionServices } from "../../../../../services/transaction/transactionServices";
import Loader from "../../../Loader";


const CompleteTransactionModal = (props) => {



    const [confirmCashRec, setConfirmCashRec] = useState(false);
    const [note, setNote] = useState("");
    const [formErrorMsg, setFormErrorMsg] = useState("");
    const [loader, setLoader] = useState(false);



    const confirmCash = (e) => {
        setConfirmCashRec(e.target.checked);
        if(e.target.checked) {
            setFormErrorMsg("");
        }
    };

    const noteHandel = (e) => {
        setNote(e.target.value);
    };

    // const submitTransaction  = () => {
    //     if (confirmCashRec) {
    //         console.log("Submit", confirmCashRec);
    //     } else {
    //         setFormErrorMsg("Please check the checkbox for confirmation");
    //     }
    // };

    const submitTransaction = async () => {
        
        
        if (confirmCashRec) {
                console.log(props.item._id);
                try {
                let payload = {
                    subscriptionId : props.item._id,
                    note: note
                }
                console.log(payload);
                setLoader(true);
                const response = await TransactionServices.completeTransaction(props.item.contactId, payload);
                console.log("Complete transaction response ", response);
            } catch (e) {
        
            } finally {
                setLoader(false);
                props.closeModal(false);
                props.successM("Transaction completed successfully");
            }
        } else {
            setFormErrorMsg("Please check the checkbox for confirmation");
        }
      };


    return (
        <div className="modalBackdrop transactionModal">
            <div className="modalBackdropBg" onClick={() => props.closeModal ("close")}></div>
            {loader && <Loader />}
            
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal ("close")}><img src={crossImg} alt="" /></button>  
                    <div className="circleForIcon"><img src={refundImg} alt="" /></div>
                    <h3>Complete Transactions</h3>
                    <p>Complete Transactions for Program/Product</p>
                </div>
                <div className="modalForm auto">
                    <form>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Transaction Amount</label>
                            <div className="cmnFieldStyle readOnlyField"><span>$</span>{props.item.amount}</div>
                        </div>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Add Note</label>
                            <textarea className="cmnFieldStyle" placeholder="Add a Note for this Transaction (Optional)" onChange={noteHandel}></textarea>
                        </div>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName cashReceived">
                                <div className="customCheckbox">
                                    <input type="checkbox" onClick={confirmCash} />
                                    <span></span>
                                </div> 
                                I confirm that I have received the amount by cash
                            </label>
                            { formErrorMsg ?
                            <div className="errorMsg">{formErrorMsg}</div>
                            : "" }
                        </div>
                        <div className="cmnFormRow">
                            <div className="btnGroup centered">
                                <button type="button" className="cmnBtn" onClick={submitTransaction}>
                                    <span>Save</span>
                                    <img src={arrowForwardImg} alt="" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompleteTransactionModal;