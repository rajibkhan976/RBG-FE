import cross_icon from "../../../../assets/images/cross_icon.svg";
import cr_failed_icon from "../../../../assets/images/cr_failed_icon.svg";
import card_red_bg from "../../../../assets/images/card_red_bg.svg";
import arrowForward from "../../../../assets/images/arrow_forward.svg";
import { useHistory } from "react-router-dom";
import cardFail from "../../../../assets/images/cardFailed.svg";
import * as actionTypes from "../../../../actions/types";
import { useDispatch } from "react-redux";



const PurchaseFailed = (props) => {
    console.log('Purchase Failed ', props)
    let history = useHistory();
    const dispatch = useDispatch();

    const redirectToPackagePurchase = () => {
        props.closeModal();
        history.push("/package-setup");
        dispatch({
            type: actionTypes.HIDE_CREDIT_RESTRICTION,
        })
    }

    return (
        <div className="cr_modalBase">
            <div className="cr_modal small">
                <button className='cr_cross' onClick={() => props.closeModal()} ><img src={cross_icon} alt="" /></button>
                <div className="cr_modalBody">
                    <div className='cr_successMsg'>
                        <img src={cr_failed_icon} alt="" />
                        <h3 className="cr_failed">Payment Failed !</h3>
                    </div>
                    <div className="cr_paymentFailedMsg">
                        <figure>
                            <img src={cardFail} alt="" />
                        </figure>
                        <span>{props.purchaseFailedMsg ? props.purchaseFailedMsg : ''}</span>
                    </div>
                    <div className='cr_msgBody'>
                        <div className='text-center'>
                            <button className="cr_payBtn small" onClick={redirectToPackagePurchase}>
                                Try again
                                <img src={arrowForward} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseFailed;