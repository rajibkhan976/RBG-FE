import { useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import refundImg from "../../../../../../src/assets/images/refund_icon_dark.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import { TransactionServices } from "../../../../../services/transaction/transactionServices";


const RefundModal = (props) => {

    const [refundLimit, setRefundLimit] = useState(props.amount);
    const [refundFormData, setRefundFormData] = useState({
        amount: props.amount,
        reason: "",
        otherReason: "",
        confirmRefund: props.payVia == "cash" ? undefined : true
    });
    const [formErrorMsg, setFormErrorMsg] = useState({
        amount: "",
        reason: "",
        otherReason: "",
        confirmRefund: ""
    });


    const loader = (param) => {
        props.loader(param);
    };

    const closeModal = () => {
        props.closeModal();
    }

    const alertMsg = (msg, type) => {
        props.alertMsg(msg, type);
    };


    const refundAmountHandel = (e) => {
        let val = e.target.value;
        const re = new RegExp(/^\d*\.?\d{0,2}$/);
        if (re.test(val)) {
            fieldErrorCheck.checkAmount(val);
            if (val > refundLimit) {
                setFormErrorMsg({ ...formErrorMsg, amount: "Refund amount limit crossed. Refund amount limit is $" + refundLimit});
            }
        }
        
    };

    // const checkRefundLimit = () => {
    //     if (refundFormData.amount > refundLimit) {
    //         setFormErrorMsg({ ...formErrorMsg, amount: "Refund amount limit crossed. Refund amount limit is $" + refundLimit});
    //     } else {
    //         setFormErrorMsg({ ...formErrorMsg, amount: ""});
    //     }
    // };

    const refundReasonHandel = (e) => {
        let val = e.target.value;
        fieldErrorCheck.checkReason(val);
    };

    const otherReasonHandel = (e) => {
        let val = e.target.value;
        fieldErrorCheck.checkOtherReason(val);
    };

    const confirmRefundHandel = (e) => {
        let val = e.target.checked;
        fieldErrorCheck.checkConfirmation(val);
    };

    const fieldErrorCheck = {

        checkAmount: (val) => {
            setRefundFormData({...refundFormData, amount: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, amount: "Please enter refund amount"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, amount: ""}));
            }
        },

        checkReason: (val) => {
            setRefundFormData({...refundFormData, reason: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, reason: "Please enter refund reason"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, reason: ""}));
            }
        },

        checkOtherReason: (val) => {
            setRefundFormData({...refundFormData, otherReason: val});
            if (!val && refundFormData.reason == "others") {
                setFormErrorMsg(prevState => ({...prevState, otherReason: "Please write the reason for refund"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, otherReason: ""}));
            }
        },

        checkConfirmation: (val) => {
            setRefundFormData({...refundFormData, confirmRefund: val});
            if (!val) {
                setFormErrorMsg(prevState => ({...prevState, confirmRefund: "Please check the checkbox for confirmation"}));
            } else {
                setFormErrorMsg(prevState => ({...prevState, confirmRefund: ""}));
            }
        }

    };

    const refundSubmit = () => {
        fieldErrorCheck.checkAmount(refundFormData.amount);
        fieldErrorCheck.checkReason(refundFormData.reason);
        fieldErrorCheck.checkOtherReason(refundFormData.otherReason);
        fieldErrorCheck.checkConfirmation(refundFormData.confirmRefund);
        
        if(refundFormData.reason && refundFormData.reason !== "others") {
            if(refundFormData.amount && refundFormData.confirmRefund && formErrorMsg.amount == "") {
                refundFn();
            }
        } else if (refundFormData.reason === "others") {
            if (refundFormData.amount && refundFormData.otherReason && refundFormData.confirmRefund && formErrorMsg.amount == "") {
                refundFn();
            }
        }

        if (refundFormData.amount > refundLimit) {
            setFormErrorMsg({ ...formErrorMsg, amount: "Refund amount limit crossed. Refund amount limit is $" + refundLimit});
        }

    };
    
    const refundFn = async () => {
        let payload = {
            subscriptionId: props.subscriptionId,
            amount: parseFloat(refundFormData.amount),
            note: refundFormData.reason == "others" ? refundFormData.otherReason : refundFormData.reason
        }
        loader(true);
        try {
            let rsponse = await TransactionServices.refund(props.contactId, payload);
            console.log("Refund Response: ", rsponse);
            alertMsg("Refund transaction successfull", "success");
        } catch (e) {
            alertMsg(e.message, "error");
        } finally {
            loader(false);
            closeModal();
        }
        
    };

    
    
    

    return (
        <div className="modalBackdrop transactionModal">
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={closeModal}><img src={crossImg} alt="" /></button>  
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
                        {props.payVia == "cash" ?
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
                        : ""}
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

export default RefundModal;