import { useEffect, useState } from "react";

import crossImg from "../../../../../../src/assets/images/cross.svg";
import arrowForwardImg from "../../../../../../src/assets/images/arrow_forward.svg";
import retryIconDark from "../../../../../../src/assets/images/retry_icon_dark.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import smallTick from "../../../../../assets/images/smallTick.svg";
import paidCard from "../../../../../assets/images/paidCrad.svg";
import paySuccess from "../../../../../assets/images/paySuccess.png"
import aaroww from "../../../../../assets/images/arrow_forward.svg"
import { TransactionServices } from "../../../../../services/transaction/transactionServices";
import Loader from "../../../Loader";


const RetryPayment = (props) => {

    const [note, setNote] = useState("");
    const [loader, setLoader] = useState(false);
    const [retryPayAlertMsg, setRetryPayAlertMsg] = useState({
        message: "",
        type: ""
    });
    const [successfulRetry, setSuccessfulRetry] = useState({})

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
          console.log("Retry response:::::: ", response);
          setRetryPayAlertMsg({ ...retryPayAlertMsg, message: response, type: "success" });
          
        } catch (e) {
          console.log("Retry response:::::: ERROR::::", e.message);
          const failedTrans = {
              message: e.message
          }
        //   setRetryPayAlertMsg({ ...retryPayAlertMsg, message: e.message, type: "error" });
            setSuccessfulRetry(failedTrans)
        } finally {
          setLoader(false);
        //   props.closeModal(false);
        }
    };

    return (
        <div className={(successfulRetry.status === undefined || successfulRetry.status !== "success") ? "modalBackdrop transactionModal" : "modalBackdrop transactionModal transactionSuccssModal"}>
            {loader && <Loader />}
            <div className="modalBackdropBg" onClick={() => props.closeModal (false)}></div>        
            <div className="slickModalBody">
            {(successfulRetry.status === undefined || successfulRetry.status !== "success") &&
                <>
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
                </>
            }

            {(successfulRetry.status !== undefined && successfulRetry.status === "success") && 
                    <>
                        <div className="slickModalHeader">
                            <button className="topCross" onClick={props.closeModal (false)}><img src={crossImg} alt="" /></button> 
                        </div>
                        <div className="successHeader">
                        <div className="circleForIcon">
                            <img src={paySuccess} alt="" />
                        </div>
                        <h3 className="paySuccessHeading">
                            Transaction Successful
                            <p>{successfulRetry.message}</p>
                        </h3>
                        </div>
                        <div className="dottedBorder"></div>

                        <ul className="paymentUlHeader">
                            <li className="paymentModeHeaderLi">Payment Mode</li>
                            <li className="paymentIdHeaderLi">Transaction ID</li>
                            <li className="paymentAmtHeaderLi">Amount</li>
                        </ul>
                        
                        {/* <ul className="paymentUlInfo">
                            <li className="paymentModeLi">
                            <img src={cashSuccess} alt="" />
                            <p>Cash</p>
                            </li>
                            <li className="transactionIdProduct">
                                <span>12345678913</span>
                            </li>
                            <li className="paymentAmtLi">
                            <p>$ {refundFormData.amount}</p>
                            <img src={smallTick} alt="" />
                            </li>
                        </ul> */}

                        <ul className="paymentUlInfo">
                            <li className="paymentModeLi">
                            <img src={paidCard} alt="" />
                            <p>Online</p>
                            </li>
                            <li className="transactionIdProduct">
                            <span>{successfulRetry.transactionId}</span>
                            </li>
                            <li className="paymentAmtLi">
                            {/* <p>$ {payMentInfo.onlineAmount.toFixed(2)}</p> */}
                            <p>$ {successfulRetry.amount.toFixed(2)}</p>
                            <img src={smallTick} alt="" />
                            </li>
                        </ul>

                        <div className="dottedBorder"></div>

                        <div className="successPageBtn w-100 d-flex f-justify-center">
                        <button
                            className="saveNnewBtn"
                            onClick={() => {
                                    setSuccessfulRetry({})
                                    props.closeModal (false)
                                }
                            }
                        >
                            Go to Transaction List <img src={aaroww} alt="" />
                        </button>
                        </div>
                    </>
                }

            {(successfulRetry.status === undefined && successfulRetry.message !== undefined) && 
                <div className="modalBackdrop modalProductStatus">
                    <div className="slickModalBody paymentFailed">
                        <div className="slickModalHeader">
                        <div className="circleForIcon">
                            <img src={paymentFail} alt="" />
                        </div>
                        <h3 className="courseModalHeading">Payment Failed!</h3>
                        </div>

                        <div className="payModalDetails">
                        <img src={cardFail} alt="" />
                        <p>{successfulRetry.message}</p>
                        </div>

                        <div className="buyBtns failedPayment">
                        <button
                            onClick={() => {
                                setSuccessfulRetry({})
                            }}
                            className="saveNnewBtn"
                        >
                            Close
                        </button>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    );
};

export default RetryPayment;