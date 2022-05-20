import React, { useState, useEffect } from 'react'
import greenTick from "../../../assets/images/greenTick.svg";
import greyTick from "../../../assets/images/greyTick.svg";
import redCross from "../../../assets/images/redCross.svg";
import greyEdit from "../../../assets/images/greyEdit.svg";
import { PaymentSetupServices } from '../../../services/setup/PaymentSetupServices';
import { useDispatch } from 'react-redux';
import * as actionTypes from "../../../actions/types";
import Loader from '../../shared/Loader';

const SubscriptionSetup = (prop) => {
    const [isEditing, setisEditing] = useState(false);
    const [subscription, setSubscription] = useState({
        retryInterval: "",
        maxRetry: "",
    });
    const [merchantFormError, setMerchantFormError] = useState({
        retryInterval: "",
        maxRetry: ""
    });
    const [subscriptionRef, setSubscriptionRef] = useState({
        retryInterval: "",
        maxRetry: "",
    })
    const [loading, setLoading] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (prop.merchantInfo.retryInterval !== "") setLoading(false);
        setSubscription({
            retryInterval: prop.merchantInfo.retryInterval,
            maxRetry: prop.merchantInfo?.maxRetry
        });
        setSubscriptionRef({
            retryInterval: prop.merchantInfo.retryInterval,
            maxRetry: prop.merchantInfo?.maxRetry
        });

    }, [prop.merchantInfo.retryInterval, prop.merchantInfo.maxRetry])

    useEffect(() => {
        if (merchantFormError.retryInterval !== "" || merchantFormError.maxRetry !== "") {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [merchantFormError.retryInterval, merchantFormError.maxRetry])

    const retryIntervalHandel = (e) => {
        const number = e.target.value;
        const reg = /^[0-9]+$/;

        if (reg.test(number) || number === "") {
            setSubscription({ ...subscription, retryInterval: number });
        }

        if (number === "" || !reg.test(number)) {
            setMerchantFormError({ ...merchantFormError, retryInterval: "Please enter a valid interval" });
        } else {
            setMerchantFormError({ ...merchantFormError, retryInterval: "" });
        }
    };

    const maxRetryHandel = (e) => {

        const number = e.target.value;
        const reg = /^[0-9]+$/;

        if (reg.test(number) || number === "") {
            setSubscription({ ...subscription, maxRetry: number });
        }

        if (number === "" || !reg.test(number)) {
            setMerchantFormError({ ...merchantFormError, maxRetry: "Please enter a valid retry" });
        } else {
            setMerchantFormError({ ...merchantFormError, maxRetry: "" });
        }
    };

    const subcriptionFormSave = async (e) => {
        e.preventDefault();
        if(submitDisabled) return false;
        const retryInterval = subscription.retryInterval;
        const maxRetry = subscription.maxRetry;
        setLoading(true);
        try {
            const payload = {
                retryInterval: retryInterval,
                maxRetry: maxRetry
            };
            //if (merchantId) payload.merchantId = merchantId;
            const response = await PaymentSetupServices.saveMerchantInfo(payload);
            console.log(response);
            setSubscription({ ...subscription });
            setSubscriptionRef(subscription);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: response.message,
                typeMessage: 'success'
            });
            console.log("Save merchant info response:::: ", response);
        } catch (e) {
            // setSubscriptionSaveMsg({ ...subscriptionSaveMsg, message: e.message, type: "error" });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setLoading(false);
        }
        setisEditing(false);
        console.log("subscription", subscription);
    };

    const cancelEditing = () => {
        setisEditing(false);
        setSubscription(subscriptionRef);
        setMerchantFormError({
            retryInterval: "",
            maxRetry: ""
        });
    }

    return (
        <div className='ps_merchantSetup'>
            {loading ? <Loader /> : ""}
            <form onSubmit={subcriptionFormSave}>
                <div className='ps_header'>
                    <h3>Subscription Setup</h3>
                    <div className='ps_editPan'>
                        {isEditing ?
                            <>
                                <button className='round edit' type='submit' disabled={submitDisabled}><img src={submitDisabled ? greyTick : greenTick} alt="" /></button>
                                <button className='round delete' type="button" onClick={cancelEditing}><img src={redCross} alt="" /></button>
                            </> : <button className='round change' type="button" onClick={(e) => {e.preventDefault(); setisEditing(true)}}><img src={greyEdit} alt="" /></button>}
                    </div>
                </div>
                <div className='ps_formbody'>
                    <div className='ps_form'>
                        <div className='half'>
                            <label>Retry Interval (Days)</label>
                            {isEditing ?
                                <>
                                    <input name='retryIntervalData' type="text" className={merchantFormError.retryInterval ? "error" : ""} placeholder="Ex. 1"
                                        onChange={retryIntervalHandel}
                                        value={subscription.retryInterval} />
                                    {merchantFormError.retryInterval ? <div className="errorMsg">{merchantFormError.retryInterval}</div> : ""}
                                </> : <div className='ps_text2'>{subscription.retryInterval}</div>
                            }
                        </div>
                        <div className='half'>
                            <label>Max Number of Retry</label>
                            {isEditing ?
                                (<>
                                    <input name='maxRetry' type="text" className={merchantFormError.maxRetry ? "error" : ""} placeholder="Ex. 3" onChange={maxRetryHandel} value={subscription.maxRetry} />
                                    {merchantFormError.maxRetry ? <div className="errorMsg">{merchantFormError.maxRetry}</div> : ""}
                                </>) : <div className='ps_text2'>{subscription.maxRetry}</div>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default SubscriptionSetup