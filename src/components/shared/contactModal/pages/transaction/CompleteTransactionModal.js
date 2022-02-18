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
    const [formErrorMsg, setFormErrorMsg] = useState({
        amount: "",
        reason: "",
        otherReason: "",
        confirmRefund: ""
    });
    const [formError, setFormError] = useState(false);


    const refundAmountHandel = (e) => {
        let val = e.target.value;
        console.log('val', val);
        const re = new RegExp(/^\d*\.?\d{0,2}$/);
        if (re.test(val)) {
            fieldErrorCheck.checkAmount(val);
        }
    };

    const refundReasonHandel = (e) => {
        let val = e.target.value;
        fieldErrorCheck.checkReason(val);
        // setRefundFormData({...refundFormData, reason: e.target.value});
    };

    const otherReasonHandel = (e) => {
        let val = e.target.value;
        fieldErrorCheck.checkOtherReason(val);
        // setRefundFormData({...refundFormData, otherReason: e.target.value});
    };

    const confirmRefundHandel = (e) => {
        let val = e.target.checked;
        fieldErrorCheck.checkConfirmation(val);
        // setRefundFormData({...refundFormData, confirmRefund: e.target.checked});
    };

    const fieldErrorCheck = {

        checkAmount: (val) => {
            setRefundFormData({...refundFormData, amount: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, amount: "Please enter refund amount"}));
                // setFormError(true);
            } else {
                setFormErrorMsg(prevState => ({...prevState, amount: ""}));
                // setFormError(false);
            }
        },

        checkReason: (val) => {
            setRefundFormData({...refundFormData, reason: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, reason: "Please enter refund reason"}));
                // setFormError(true);
            } else {
                setFormErrorMsg(prevState => ({...prevState, reason: ""}));
                // setFormError(false);
            }
        },

        checkOtherReason: (val) => {
            setRefundFormData({...refundFormData, otherReason: val});
            if (!val && refundFormData.reason == "others") {
                setFormErrorMsg(prevState => ({...prevState, otherReason: "Please write the reason for refund"}));
                // setFormError(true);
            } else {
                setFormErrorMsg(prevState => ({...prevState, otherReason: ""}));
                // setFormError(false);
            }
        },

        checkConfirmation: (val) => {
            setRefundFormData({...refundFormData, confirmRefund: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, confirmRefund: "Please check the checkbox for confirmation"}));
                // setFormError(true);
            } else {
                setFormErrorMsg(prevState => ({...prevState, confirmRefund: ""}));
                // setFormError(false);
            }
        }

        // if (!refundFormData.amount) {
        //     setFormError(prevState => ({...prevState, amount: "Pelase enter refund amount"}));
        //     console.log(formError);
        //    // isError = true;
        // } else {
        //     setFormError(prevState => ({...prevState, amount: ""}));
        // }

        // if (!refundFormData.reason) {
        //     setFormError(prevState => ({...prevState, reason: "Pelase enter refund amount"}));
        //     console.log(formError);
        //    // isError = true;
        // } else {
        //     setFormError(prevState => ({...prevState, reason: ""}));
        // }

        // if (!refundFormData.otherReason && refundFormData.reason == "others") {
        //     setFormError(prevState => ({...prevState, otherReason: "Please write the reason for refund"}));
        //    // isError = true;
        // } else {
        //     setFormError(prevState => ({...prevState, otherReason: ""}));
        // }
        
        // if (!refundFormData.confirmRefund) {
        //     setFormError(prevState => ({...prevState, confirmRefund: "Please check the checkbox for confirmation"}));
        //    // isError = true;
        // } else {
        //     setFormError(prevState => ({...prevState, confirmRefund: ""}));
        // }
    };

    const refundSubmit = () => {

        fieldErrorCheck.checkAmount(refundFormData.amount);
        fieldErrorCheck.checkReason(refundFormData.reason);
        fieldErrorCheck.checkOtherReason(refundFormData.otherReason);
        fieldErrorCheck.checkConfirmation(refundFormData.confirmRefund);

        console.log("form data: ", refundFormData, formError);

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
                        <div className={formErrorMsg.amount ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <label className="cmnFieldName">Refund Amount</label>
                            <input type="text" className="cmnFieldStyle" onChange={refundAmountHandel} value={refundFormData.amount}/>
                            { formErrorMsg.amount &&
                            <div className="errorMsg">{formErrorMsg.amount}</div>
                            }
                        </div>
                        <div className={formErrorMsg.reason ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <label className="cmnFieldName">Select Refund Reason</label>
                            <select className="cmnFieldStyle selectBox" onChange={refundReasonHandel}>
                                <option value="">Select a reason</option>
                                <option value="duplicate">Duplicate</option>
                                <option value="fraudulent">Fraudulent</option>
                                <option value="requested by customer">Requested by customer</option>
                                <option value="others">Others</option>
                            </select>
                            { formErrorMsg.reason &&
                            <div className="errorMsg">{formErrorMsg.reason}</div>
                            }
                        </div>
                        { refundFormData.reason == "others" ? 
                        <div className={formErrorMsg.otherReason ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <label className="cmnFieldName">Add Refund Reason <span className="mandatory">*</span></label>
                            <textarea className={"cmnFieldStyle"} placeholder="Add the Refund Reason (Mandatory)" onChange={otherReasonHandel}></textarea>
                            { formErrorMsg.otherReason &&
                            <div className="errorMsg">{formErrorMsg.otherReason}</div>
                            }
                        </div>
                        : "" }
                        <div className={formErrorMsg.confirmRefund ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <label className="cmnFieldName cashReceived">
                                <div className="customCheckbox">
                                    <input type="checkbox" onChange={confirmRefundHandel} />
                                    <span></span>
                                </div> 
                                I confirm that I have refunded the amount by cash 
                            </label>
                            { formErrorMsg.confirmRefund &&
                            <div className="errorMsg">{formErrorMsg.confirmRefund}</div>
                            }
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