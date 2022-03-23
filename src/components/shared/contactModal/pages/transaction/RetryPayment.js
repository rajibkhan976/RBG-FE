import { useEffect, useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import retryIconDark from "../../../../../../src/assets/images/retry_icon_dark.svg";
import { TransactionServices } from "../../../../../services/transaction/transactionServices";
import Loader from "../../../Loader";


const RetryPayment = (props) => {

    const [note, setNote] = useState("");
    const [loader, setLoader] = useState(false);
    const [retryPayAlertMsg, setRetryPayAlertMsg] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        props.alertMsg(retryPayAlertMsg);
    }, [retryPayAlertMsg]);

    const noteHandle = (e) => {
        setNote(e.target.value);
    };

    const retryPayment = async () => {
        let payload = {
          subscriptionId: props._id,
          note: note ? note : ""
        }
        console.log(payload);
        try {
          setLoader(true);
          const response = await TransactionServices.retryPayment(props.contactId, payload);
          console.log("Retry response: ", response);
          setRetryPayAlertMsg({ ...retryPayAlertMsg, message: response, type: "success" });
          
        } catch (e) {
          setRetryPayAlertMsg({ ...retryPayAlertMsg, message: e.message, type: "error" });
        } finally {
          setLoader(false);
          props.closeModal(false);
        }
    };

    return (
        <div className="modalBackdrop transactionModal">
            {loader && <Loader />}
            
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal (false)}><img src={crossImg} alt="" /></button>  
                    <div className="circleForIcon"><img src={retryIconDark} alt="" /></div>
                    <h3>Retry Payment</h3>
                    <p>Retry Payment for Program/Product</p>
                </div>
                <div className="cmnForm">
                    <form>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Transaction Amount</label>
                            <div className="cmnFieldStyle readOnlyField"><span>$</span>{props.amount}</div>
                        </div>
                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Add Note</label>
                            <textarea className="cmnFieldStyle" placeholder="Add a Note for this Transaction (Optional)" onChange={noteHandle}></textarea>
                        </div>
                        <div className="cmnFormRow">
                            <div className="btnGroup centered">
                                <button type="button" className="cmnBtn" onClick={retryPayment}>
                                    <span>Pay Now</span>
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

export default RetryPayment;