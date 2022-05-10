import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PaymentSetupServices } from '../../../services/setup/PaymentSetupServices';
import Loader from '../../shared/Loader';
import * as actionTypes from '../../../actions/types';
import greenTick from "../../../assets/images/greenTick.svg";
import greyTick from "../../../assets/images/greyTick.svg";
import redCross from "../../../assets/images/redCross.svg";
import greyEdit from "../../../assets/images/greyEdit.svg";
import Tax from './tax';
import SubscriptionSetup from './subscriptionSetup';

const PaymentSetup = () => {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [merchantInfo, setMerchantInfo] = useState({
        paysimpleEmail: "",
        merchantId: "",
        retryInterval: "",
        maxRetry: "",
        editAccess: true,
        hasMerchantId: false
    });
    const [hasEmail, setHasEmail] = useState(true);
    const emailRefData = useRef();
    const [loading, setLoading] = useState(false);
    const [merchantFormError, setMerchantFormError] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");
    const [isEditing, setisEditing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPaymentSetup();
        console.log(isEditing);
        return () => setMerchantInfo({
            paysimpleEmail: "",
            merchantId: "",
            retryInterval: "",
            maxRetry: "",
            editAccess: true,
            hasMerchantId: false
        })
    }, [])

    const fetchPaymentSetup = async () => {
        setLoading(true);
        try {
            let response = await PaymentSetupServices.fetchPaymentSetup();
            console.log("Payment setup response:::: ", response);
            setMerchantInfo({
                paysimpleEmail: (response.data?.paysimpleEmail) ? response.data.paysimpleEmail : "",
                merchantId: (response.data?.merchantId) ? response.data.merchantId : "",
                retryInterval: (response.data?.retryInterval) ? response.data.retryInterval : 3,
                maxRetry: (response.data?.retryLimit) ? response.data.retryLimit : 2,
                editAccess: response?.editAccess,
                hasMerchantId: (response?.hasMerchantId) ? true : false
            });
            // console.clear()
            console.log("Paysimple Email", response.data?.paysimpleEmail);
            const enableEditOnEmptyEmail = (typeof response.data?.paysimpleEmail === "undefined" || response.data?.paysimpleEmail === "") ? false : true;
            setHasEmail(enableEditOnEmptyEmail);
        } catch (e) {
            // setMerchantInfoSaveMsg({ message: e.message, type: "error", duration: 5000 });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const saveMerchantInfo = async (e) => {
        e.preventDefault();
        const paysimpleEmail = merchantInfo.paysimpleEmail;
        setMerchantFormError("");
        setLoading(true);
        try {
            const payload = {
                paysimpleEmail: paysimpleEmail
            };
            //if (merchantId) payload.merchantId = merchantId;
            const response = await PaymentSetupServices.saveMerchantInfo(payload);
            setHasEmail(true);
            setMerchantInfo({ ...merchantInfo, editAccess: response.editAccess });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: response.message,
                typeMessage: 'success'
            });
            // setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: "Payment setup data updated successfully", type: "success" });
            console.log("Save merchant info response:::: ", response);
        } catch (e) {
            // setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: e.message, type: "error" });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setLoading(false);
            setisEditing(false);
        }

    };

    const paysimpleConnect = async (e) => {
        e.preventDefault();
        if (merchantFormError !== "" || merchantInfo.paysimpleEmail === "") return false;
        const paysimpleEmail = merchantInfo.paysimpleEmail;
        setLoading(true);
        try {
            const payload = {
                paysimpleEmail: paysimpleEmail,
                connectPaysimple: true
            };
            //if (merchantId) payload.merchantId = merchantId;
            const response = await PaymentSetupServices.saveMerchantInfo(payload);
            setMerchantInfo({ ...merchantInfo, hasMerchantId: response.hasMerchantId });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: response.message,
                typeMessage: 'success'
            });
            // setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: "Payment setup data updated successfully", type: "success" });
        } catch (e) {
            // setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: e.message, type: "error" });
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setLoading(false);
            setisEditing(false);
        }
    };

    const checkEmail = (e) => {
        // const paysimpleEmail = merchantInfo.paysimpleEmail;
        const email = emailRefData.current;
        if (emailRe.test(email.value)) {
            setMerchantFormError("");
        } else {
            setMerchantFormError("Please enter a valid email id");
        }
        setMerchantInfo({ ...merchantInfo, paysimpleEmail: e.target.value });
    };

    return (
        <div className="paymentSetupMainBody" data-testid="paymentsetup">
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setup</li>
                        <li>Payment Setup</li>
                    </ul>
                    <h2 className="inDashboardHeader">Payment Setup</h2>
                    <p className="userListAbout">Setup Merchant and Billing setup for your Organization </p>
                </div>
            </div>
            <div className='ps_merchantSetup_outer'>
                <div className='ps_merchantSetup'>
                    {loading ? <Loader /> : ""}
                    <form id='payment-setup' onSubmit={saveMerchantInfo}>
                        <div className='ps_header'>
                            <h3>Merchant Payment Setup</h3>

                            {hasEmail && !isEditing ? (
                                <div className={(merchantInfo.hasMerchantId) ? "paySimpleStat greaentag" : "paySimpleStat"}>
                                    Account Status
                                    <tag className={(merchantInfo.hasMerchantId) ? "tag green" : "tag"}>{merchantInfo.hasMerchantId ? "Connected" : "Not Connected"}</tag>
                                </div>
                            ) : ''}
                            <div className='ps_editPan'>
                                {(isEditing || !hasEmail) ? (
                                    <button className='round edit'
                                        type='submit'
                                        disabled={(merchantFormError !== "" || merchantInfo.paysimpleEmail === "") ? "disabled" : ""}><img src={(merchantFormError !== "" || merchantInfo.paysimpleEmail === "") ? greyTick : greenTick} alt="" /></button>
                                ) : ''}
                                {(isEditing) ? (<button className='round delete' onClick={() => {
                                    setisEditing(false);
                                    setMerchantFormError("");
                                    setMerchantInfo({ ...merchantInfo, paysimpleEmail: defaultEmail })
                                }}><img src={redCross} alt="" /></button>) : ''}

                                {(!merchantInfo.hasMerchantId && !isEditing && hasEmail) ? (<button className='round change' onClick={() => { setisEditing(true); setDefaultEmail(merchantInfo.paysimpleEmail) }}><img src={greyEdit} alt="" /></button>) : ''}
                            </div>
                        </div>
                        <div className='ps_formbody'>
                            <div className='ps_form'>
                                <label>Pay Simple Email ID</label>
                                {(isEditing || !hasEmail) ? (
                                    <>
                                        <input name='paysimpleEmail' type="text" placeholder="Ex. example@email.com"
                                            value={merchantInfo.paysimpleEmail}
                                            onChange={checkEmail}
                                            ref={emailRefData}
                                            className={merchantInfo.paysimpleEmail !== "" && merchantFormError ? "error" : ""} />
                                        {merchantFormError ? <div className="errorMsg">{merchantFormError}</div> : ""}
                                    </>
                                ) : (
                                    <>
                                        <div className='ps_text1'>{merchantInfo.paysimpleEmail}</div>
                                        {!merchantInfo.hasMerchantId ? <button type='button' className='ps_designedBtn' onClick={paysimpleConnect}>Connect to Paysimple</button> : ''}

                                    </>
                                )}

                            </div>
                        </div>
                    </form>
                </div>
                <SubscriptionSetup merchantInfo={merchantInfo} />
                <Tax />
            </div>
        </div>
    );
};

export default PaymentSetup;