import React, { useEffect, useRef, useState } from 'react';
import { PaymentSetupServices } from '../../../services/setup/PaymentSetupServices';
import Loader from '../../shared/Loader';
import AlertMessage from "../../shared/messages/alertMessage";


const PaymentSetup = () => {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [merchantInfo, setMerchantInfo] = useState({
        paysimpleEmail: "",
        merchantId: "",
        retryInterval: "",
        maxRetry: "",
        editAccess: false
    });
    const formRef = useRef();
    const [merchantFormError, setMerchantFormError] = useState({
        paysimpleEmail: "",
        merchantId: "",
        retryInterval: "",
        maxRetry: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetchingMerchantid, setFetchingMerchantid] = useState(false);
    const [merchantFromError, setMerchantFromError] = useState("");
    const [merchantInfoSaveMsg, setMerchantInfoSaveMsg] = useState({
        message: "",
        type: "",
        duration: 5000
    });

    useEffect(() => {
        fetchPaymentSetup();
        return () => setMerchantInfo({
            paysimpleEmail: "",
            merchantId: "",
            retryInterval: "",
            maxRetry: "",
            editAccess: false
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMerchantFromError("");
        }, 3000);

        return () => clearTimeout();
    }, [merchantFromError]);


    const fetchPaymentSetup = async () => {
        setLoading(true);
        try {
            let response = await PaymentSetupServices.fetchPaymentSetup();
            console.log("Payment setup response:::: ", response);
            setMerchantInfo({
                paysimpleEmail: (response.data?.paysimpleEmail) ? response.data.paysimpleEmail : "",
                merchantId: (response.data?.merchantId) ? response.data.merchantId : "",
                retryInterval: (response.data?.retryInterval) ? response.data.retryInterval : "",
                maxRetry: (response.data?.retryLimit) ? response.data.retryLimit : "",
                editAccess: (response?.editAccess) ? response?.editAccess : true
            });
        } catch (e) {
            setMerchantInfoSaveMsg({ message: e.message, type: "error", duration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    const getMerchantId = async () => {
        const formData = formRef.current;
        const paysimpleEmail = formData["paysimpleEmail"].value;
        // formData["paysimpleEmail"].value = merchantInfo.paysimpleEmail;
        try {
            if (paysimpleEmail) {
                setFetchingMerchantid(true);
                const payload = {
                    paysimpleEmail: paysimpleEmail
                };
                const response = await PaymentSetupServices.getMerchantId(payload);
                setMerchantInfo({ ...merchantInfo, merchantId: (response?.merchantID) ? response.merchantID : "" });
                console.log("Get merchant id response:::: ", response);
            } else {
                setMerchantFormError({ ...merchantFromError, paysimpleEmail: "Please enter a valid email id" });
            }
        } catch (e) {
            formData["paysimpleEmail"].value = merchantInfo.paysimpleEmail;
            // setMerchantInfo({ ...merchantInfo, paysimpleEmail: "", merchantId: "" });
            setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: e.message, type: "error" });
        } finally {
            setFetchingMerchantid(false);
        }

    };

    const saveMerchantInfo = async () => {
        const formField = formRef.current;
        const paysimpleEmail = formField["paysimpleEmail"].value;
        const merchantId = formField.getElementsByClassName("merchantId")[0].innerText;
        const retryInterval = formField["retryIntervalData"].value;
        const maxRetry = formField["maxRetry"].value;
        if (validateFields(paysimpleEmail, retryInterval, maxRetry)) {
            setMerchantFromError("");
            setLoading(true);
            try {
                const payload = {
                    paysimpleEmail: paysimpleEmail,
                    retryInterval: retryInterval,
                    maxRetry: maxRetry
                };
                if (merchantId) payload.merchantId = merchantId;
                const response = await PaymentSetupServices.saveMerchantInfo(payload);
                setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: "Payment setup data updated successfully", type: "success" });
                console.log("Save merchant info response:::: ", response);
            } catch (e) {
                setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: e.message, type: "error" });
            } finally {
                setLoading(false);
            }
        }
    };

    const validateFields = (paysimpleEmail, retryInterval, maxRetry) => {
        let bool = true;
        if (!paysimpleEmail.length || !emailRe.test(paysimpleEmail)) {
            bool = false;
            setMerchantFormError({ ...merchantFormError, paysimpleEmail: "Please enter a valid email id" });
        } else if (!retryInterval.length || !/^[0-9]+$/.test(retryInterval)) {
            bool = false;
            setMerchantFormError({ ...merchantFormError, retryInterval: "Please enter a valid integer number" });
        } else if (!maxRetry.length || !/^[0-9]+$/.test(maxRetry)) {
            bool = false;
            setMerchantFormError({ ...merchantFormError, maxRetry: "Please enter a valid integer number" });
        } else {
            bool = true;
            setMerchantFormError({
                paysimpleEmail: "",
                merchantId: "",
                retryInterval: "",
                maxRetry: ""
            });
        }
        return bool;
    }

    const closeSaveMerchantAlert = () => {
        setMerchantInfoSaveMsg({ ...merchantInfoSaveMsg, message: "", type: "" });
    };

    const checkEmail = (e) => {
        if (emailRe.test(e.target.value)) {
            setMerchantFormError({ ...merchantFormError, paysimpleEmail: "" });
        } else {
            setMerchantFormError({ ...merchantFormError, paysimpleEmail: "Please enter a valid email id" });
        }
    };

    const retryIntervalHandel = (e) => {
        const number = e.target.value;
        const reg = /^[0-9]+$/;
        // if ((reg.test(number) || number === "") && number !== "0") {
        //     setMerchantInfo({ ...merchantInfo, retryInterval: number });
        //     setMerchantFormError({ ...merchantFormError, retryInterval: "" });
        // } else {
        //     setMerchantFormError({ ...merchantFormError, retryInterval: "Please enter a valid number" });
        // }

        if (!reg.test(number) || number <= 0) {
            console.log("hello");
            setMerchantFormError({ ...merchantFormError, retryInterval: "Please enter a valid integer number" });
        } else {
            setMerchantFormError({ ...merchantFormError, retryInterval: "" });
        }
    };

    const maxRetryHandel = (e) => {
        const number = e.target.value;
        const reg = /^[0-9]+$/;
        // if ((reg.test(number) || number === "") && number !== "0") {
        //     setMerchantInfo({ ...merchantInfo, maxRetry: number });
        //     setMerchantFormError({ ...merchantFormError, maxRetry: "" });
        // } else {
        //     setMerchantFormError({ ...merchantFormError, maxRetry: "Please enter a valid number" });
        // }

        if (!reg.test(number) || number <= 0) {
            console.log("hello");
            setMerchantFormError({ ...merchantFormError, maxRetry: "Please enter a valid integer number" });
        } else {
            setMerchantFormError({ ...merchantFormError, maxRetry: "" });
        }
    };


    return (
        <div className="paymentSetupMainBody">
            {loading ? <Loader /> : ""}
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
            <div className="paymentSetupBody">
                <form name='paymentSetupForm' ref={formRef}>
                    <div className="merchantSetup">
                        <h3>Merchant Payment Setup</h3>
                        <div className="merchantSetupBody">
                            <div className="cmnFormRow">
                                <label className="cmnFieldName">
                                    Pay Simple Email ID <span className="mandatory">*</span>
                                    <div className="notePop">
                                        <div className="notePopIcon info"></div>
                                        <div className="notePopContent">
                                            Email of PaySimple live account. This is required to get the merchant ID for the respective email.
                                        </div>
                                    </div>
                                </label>
                                <div className={merchantFormError.paysimpleEmail ? "cmnFormField email errorField" : "cmnFormField email"}>
                                    <input name='paysimpleEmail' className="cmnFieldStyle" type="text" placeholder="Ex. example@email.com"
                                        defaultValue={merchantInfo.paysimpleEmail} onChange={checkEmail} />
                                    <button type="button" className={merchantFormError.paysimpleEmail || fetchingMerchantid ? "saveNnewBtn disabled" : "saveNnewBtn"} onClick={getMerchantId}>Get Merchant ID</button>
                                    {merchantFormError.paysimpleEmail ? <div className="errorMsg">{merchantFormError.paysimpleEmail}</div> : ""}
                                </div>
                            </div>
                            <div className="cmnFormRow">
                                <label className="cmnFieldName">
                                    Merchant ID
                                    <div className="notePop">
                                        <div className="notePopIcon info"></div>
                                        <div className="notePopContent">
                                            Paysimple merchant ID for collecting payments. System retrieves it once PaySimple account is live.
                                        </div>
                                    </div>
                                </label>
                                <div className={fetchingMerchantid ? "cmnFormField fetching" : "cmnFormField"}>
                                    <div className={merchantInfo.merchantId ? "cmnFieldStyle merchantId" : "cmnFieldStyle noId"}>
                                        {fetchingMerchantid ? "Fetching . . ." : (merchantInfo.merchantId ? merchantInfo.merchantId : "Click the button above to get your Merchant ID")}
                                    </div>
                                </div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFormCol">
                                    <label className="cmnFieldName">
                                        Retry Interval (Days) <span className="mandatory">*</span>
                                        <div className="notePop">
                                            <div className="notePopIcon info"></div>
                                            <div className="notePopContent">
                                                Interval in days between two successive retries. Min 1 day.
                                            </div>
                                        </div>
                                    </label>
                                    <div className={merchantFormError.retryInterval ? "cmnFormField errorField" : "cmnFormField"}>
                                        <input name='retryIntervalData' type="text" className="cmnFieldStyle" placeholder="Ex. 1" onChange={retryIntervalHandel}
                                            defaultValue={merchantInfo.retryInterval} />
                                        {merchantFormError.retryInterval ? <div className="errorMsg">{merchantFormError.retryInterval}</div> : ""}
                                    </div>
                                </div>
                                <div className="cmnFormCol">
                                    <label className="cmnFieldName">
                                        Max Number of Retry <span className="mandatory">*</span>
                                        <div className="notePop">
                                            <div className="notePopIcon info"></div>
                                            <div className="notePopContent">
                                                Maximum number of times system should retry a payment before it declares it as failed.
                                            </div>
                                        </div>
                                    </label>
                                    <div className={merchantFormError.maxRetry ? "cmnFormField errorField" : "cmnFormField"}>
                                        <input name='maxRetry' type="text" className="cmnFieldStyle" placeholder="Ex. 3" onChange={maxRetryHandel} defaultValue={merchantInfo.maxRetry} />
                                        {merchantFormError.maxRetry ? <div className="errorMsg">{merchantFormError.maxRetry}</div> : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="cmnFormRow">
                                <button type="button" className={fetchingMerchantid ? "saveNnewBtn saveMerchantBtn disabled" : "saveNnewBtn saveMerchantBtn"} 
                                onClick={saveMerchantInfo}
                                disabled={!merchantInfo.editAccess}>Save</button>
                                {merchantFromError ? <div className="errorMsg merchantFromError">{merchantFromError}</div> : ""}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {merchantInfoSaveMsg.message ? <AlertMessage type={merchantInfoSaveMsg.type} message={merchantInfoSaveMsg.message} time={merchantInfoSaveMsg.duration} close={closeSaveMerchantAlert} /> : ""}

        </div>
    );
};

export default PaymentSetup;