import { useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import refundImg from "../../../../../../src/assets/images/refund_icon_dark.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";


const CompleteTransactionModal = (props) => {

    const [refundFormData, setRefundFormData] = useState({
        amount: "",
        reason: "",
        otherReason: "",
        confirmRefund: false
    });


    const refundAmountHandel = (e) => {
        // setRefundFormData({...refundFormData, amount: e.target.value});
        let val = e.target.value;
        const re = new RegExp(/^\d*\.?\d{0,2}$/);

        if (re.test(val)) {
            setRefundFormData({...refundFormData, amount: e.target.value});
        }
         
    };

    const refundReasonHandel = (e) => {
        setRefundFormData({...refundFormData, reason: e.target.value});
    };

    const otherReasonHandel = (e) => {
        setRefundFormData({...refundFormData, otherReason: e.target.value})
    };

    const confirmRefundHandel = (e) => {
        setRefundFormData({...refundFormData, confirmRefund: e.target.checked})
    };

    const refundSubmit = () => {
        console.log(refundFormData);
    };

    
    
    

    return (
        <div className="modalBackdrop transactionModal">
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal (false)}><img src={crossImg} alt="" /></button>  
                    <div className="circleForIcon"><img src={refundImg} alt="" /></div>
                    <h3>Refund</h3>
                    <p>Fill out below details for refund</p>
                </div>
                <div className="cmnForm">
                    <form>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Refund Amount {refundFormData.amount}</label>
                            <input type="text" className="cmnFieldStyle" onChange={refundAmountHandel} value={refundFormData.amount}/>
                        </div>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Select Refund Reason</label>
                            <select className="cmnFieldStyle selectBox" onChange={refundReasonHandel}>
                                <option value="">Select a reason</option>
                                <option value="duplicate">Duplicate</option>
                                <option value="fraudulent">Fraudulent</option>
                                <option value="requested by customer">Requested by customer</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        { refundFormData.reason == "others" ? 
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Add Refund Reason <span className="mandatory">*</span></label>
                            <textarea className="cmnFieldStyle" placeholder="Add the Refund Reason (Mandatory)" onChange={otherReasonHandel}></textarea>
                        </div>
                        : "" }
                        <div className="cmnFormRow">
                            <label className="cmnFieldName cashReceived">
                                <div className="customCheckbox">
                                    <input type="checkbox" onChange={confirmRefundHandel} />
                                    <span></span>
                                </div> 
                                I confirm that I have refunded the amount by cash 
                            </label>
                        </div>
                        <div className="cmnFormRow">
                            <div className="btnGroup centered">
                                <button type="button" className="cmnBtn" onClick={refundSubmit}>
                                    <span>Refund</span>
                                    <img src={arrowForwardImg} alt="" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompleteTransactionModal;