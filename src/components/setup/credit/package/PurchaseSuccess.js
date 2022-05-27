import { useHistory, useLocation } from "react-router-dom";
import cross_icon from "../../../../assets/images/cross_icon.svg";
import success_tick from "../../../../assets/images/success_tick.svg";
import arrowForward from "../../../../assets/images/arrow_forward.svg";
import celebrationImg from "../../../../assets/images/celebrationImg.svg";
import card_white_bg from "../../../../assets/images/card_white_bg.svg";
import green_bank from "../../../../assets/images/green_bank.svg";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../actions/types";



const PurchaseSuccess = (props) => {
    console.log('Purchase success', props);
    let history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();


    let isRestrictionModal = useSelector((state) => state.credit.isRestrictionModal)
    console.log(isRestrictionModal)

    const redirectToCreditDetails = () => {
        props.closeModal();
        history.push("/credit-details")
        dispatch({
            type: actionTypes.HIDE_CREDIT_RESTRICTION,
        })
    }

    const closeRestrictionModal = () => {
        props.closeModal();
        dispatch({
            type: actionTypes.HIDE_CREDIT_RESTRICTION,
        })
        //Fetch packages
        if(location.pathname === "/package-setup") {
            window.location.reload();
        }
    }



    return (
        <div className="cr_modalBase">
            <div className="cr_modal small">
                <button className='cr_cross' onClick={closeRestrictionModal} ><img src={cross_icon} alt="" /></button>
                <div className="cr_modalBody">
                    <div className='cr_successMsg'>
                        <img src={success_tick} alt="" />
                        <h3>Payment Successful !</h3>
                        <div className='cr_creditMsg'>
                            <img src={celebrationImg} alt="" />
                            <span>{props.purchasedData.credit}</span>  credit added to your account
                        </div>
                    </div>
                    <div className='cr_msgBody'>
                        <ul className='cr_modalDataTable'>
                            <li key="cr_icon">
                                <div className='cr_icon'>&nbsp;</div>
                                <div className="cr_payMethod">Payment Type</div>
                                <div className="cr_trxId">Transaction ID</div>
                                <div>Amount</div>
                            </li>
                            <li className='cr_mainData' key="cc">
                                <div className='cr_icon'><img src={props.purchasedData.card ? card_white_bg : green_bank} alt="" /></div>
                                <div className="cr_payMethod">{props.purchasedData.card ? 'Credit Card' : 'Bank'}</div>
                                <div className="cr_trxId">{props.purchasedData.transaction_id}</div>
                                <div>{`$ ` + props.purchasedData.approved_amount.toFixed(2)}</div>
                            </li>
                            <li className='cr_final' key="paid">
                                <div className='cr_icon'></div>
                                <div>Amount Paid</div>
                                <div>&nbsp;</div>
                                <div>{`$ ` + props.purchasedData.approved_amount.toFixed(2)}</div>
                            </li>
                        </ul>
                        <div className='text-center'>
                            {isRestrictionModal ? <button className="cr_payBtn small" onClick={closeRestrictionModal}>Close</button> :
                                <button className="cr_payBtn small" onClick={redirectToCreditDetails}>
                                    Credit Details
                                    <img src={arrowForward} />
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccess;