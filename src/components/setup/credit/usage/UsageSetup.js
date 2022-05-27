import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { utils } from "../../../../helpers";
import * as actionTypes from "../../../../actions/types";
import { CreditManagementServices } from "../../../../services/setup/CreditManagementServices";
import Loader from "../../../shared/Loader";

const initialUsageState = {
    call: "",
    sms: "",
    buyNumber: "",
    autoRenewLimit: ""
}

const UsageSetup = () => {
    document.title = "Red Belt Gym - Usage";

    const usageForm = useRef();
    const limitForm = useRef();
    const [formErrors, setFormErrors] = useState({ ...initialUsageState });
    const [isLoader, setIsLoader] = useState(false);
    const dispatch = useDispatch();
    let isDisplay = false;

    const fetchUsage = async () => {
        try {
            setIsLoader(true);
            const response = await CreditManagementServices.fetchUsage();
            console.log('usage ', response);
            if (typeof response.creditUsage === 'object') {
                const { call, sms, buyNumber, autoRenewLimit } = response.creditUsage;
                usageForm.current['callCreditUsage'].value = call;
                if(isDisplay){
                    usageForm.current['smsCreditUsage'].value = sms;
                    usageForm.current['buyNumberCreditUsage'].value = buyNumber;
                }
                limitForm.current['autoRenewLimit'].value = autoRenewLimit;
            }
        } catch (e) {
            console.log('Error in fetch credit packages', e);
        } finally {
            setIsLoader(false);
        }
    }

    useEffect(() => {
        fetchUsage();
    }, []);

    //Call usage change
    const handleCallCreditUsage = () => {
        let checkCallUsage = checkUsageErr(usageForm.current['callCreditUsage'].value, 'call');
        setFormErrors({
            ...formErrors,
            call: checkCallUsage
        })
    }

    //Call usage validations
    const checkUsageErr = (callUsage, type) => {
        let regex = /^\d{0,5}$/;
        return callUsage.trim().length <= 0
            ? `${utils.capitalizeFirst(type)} usage can not be blank` :
            isNaN(callUsage)
                ? `Numeric value expected for ${type} usage.`
                : callUsage <= 0
                    ? `Zero is not considered as a valid ${type} usage.`
                    : !regex.test(callUsage)
                        ? `${utils.capitalizeFirst(type)} usage should be 5 digits (without decimal point)`
                        : "";
    };



    //Sms usage
    const handleSmsCreditUsage = () => {
        if (isDisplay) {
            let checkSmsUsage = checkUsageErr(usageForm.current['smsCreditUsage'].value, 'sms');
            setFormErrors({
                ...formErrors,
                sms: checkSmsUsage
            })
        }
    }

    //Buy number usage
    const handleBuyNumberCreditUsage = () => {
        if (isDisplay) {
            let checkBuyNumberUsage = checkUsageErr(usageForm.current['buyNumberCreditUsage'].value, 'buy number');
            setFormErrors({
                ...formErrors,
                buyNumber: checkBuyNumberUsage
            })
        }

    }

    const validateUsageForm = () => {

        let isError = false;
        let formErrorsCopy = formErrors;

        //Call usage
        let checkCallUsage = checkUsageErr(usageForm.current['callCreditUsage'].value, 'call');
        if (checkCallUsage) {
            isError = true;
            formErrorsCopy.call = checkCallUsage;
        }


        if (isDisplay) {
            //Sms usage
            let checkSmsUsage = checkUsageErr(usageForm.current['smsCreditUsage'].value, 'sms');
            if (checkSmsUsage) {
                isError = true;
                formErrorsCopy.sms = checkSmsUsage;
            }

            //Buy number usage
            let checkBuyNumberUsage = checkUsageErr(usageForm.current['buyNumberCreditUsage'].value, 'buy number');
            if (checkSmsUsage) {
                isError = true;
                formErrorsCopy.buyNumber = checkBuyNumberUsage;
            }
        }

        //Set errors
        setFormErrors({
            ...formErrors,
            call: formErrorsCopy.call,
            sms: formErrorsCopy.sms,
            buyNumber: formErrorsCopy.buyNumber,
        });

        return !isError;
    }

    const saveUsageSetup = async () => {
        let isValid = validateUsageForm();
        console.log('Save usage setup : ', isValid);
        if (isValid) {
            /**
             * Submit the form
             */
            console.log('submit the form');
            let payload = {
                call: Number(usageForm.current['callCreditUsage'].value),
            }
            if(isDisplay) {
                payload.sms = Number(usageForm.current['smsCreditUsage'].value);
                payload.buyNumber = Number(usageForm.current['buyNumberCreditUsage'].value);
            }
            setIsLoader(true);
            try {
                //Operation type
                let operationMethod = "createUsage";

                let usageSetup = await CreditManagementServices[operationMethod](payload);
                if (usageSetup) {
                    console.log('create success', usageSetup);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Credit usage setup saved successfully.',
                        typeMessage: 'success'
                    });
                }

            } catch (e) {
                console.log("In package create error : ", e.message);
            } finally {
                setIsLoader(false);
            }
        }
    }

    //Credit balance limit
    const handleAutoRenewLimit = () => {
        let checkAutoRenewLimit = checkUsageErr(limitForm.current['autoRenewLimit'].value, 'auto renew');
        setFormErrors({
            ...formErrors,
            autoRenewLimit: checkAutoRenewLimit
        })

    }

    const validateLimitForm = () => {

        let isError = false;
        let formErrorsCopy = formErrors;

        //Auto renew usage
        let checkAutoRenewLimit = checkUsageErr(limitForm.current['autoRenewLimit'].value, 'auto renew');
        if (checkAutoRenewLimit) {
            isError = true;
            formErrorsCopy.autoRenewLimit = checkAutoRenewLimit;
        }

        //Set errors
        setFormErrors({
            ...formErrors,
            autoRenewLimit: formErrorsCopy.autoRenewLimit,
        });

        return !isError;
    }

    const saveLimitSetup = async () => {
        let isValid = validateLimitForm();
        console.log('Save limit setup : ', isValid);
        if (isValid) {
            /**
             * Submit the form
             */
            console.log('submit the form');
            let payload = {
                autoRenewLimit: Number(limitForm.current['autoRenewLimit'].value)
            }
            setIsLoader(true);
            try {
                //Operation type
                let operationMethod = "createUsage";

                let usageSetup = await CreditManagementServices[operationMethod](payload);
                if (usageSetup) {
                    console.log('create success', usageSetup);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Credit limit setup saved successfully.',
                        typeMessage: 'success'
                    });
                }

            } catch (e) {
                console.log("In package create error : ", e.message);
            } finally {
                setIsLoader(false);
            }
        }
    }

    return (
        <React.Fragment>
            {isLoader ? <Loader /> : ""}
            <div className="cr_body">
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup</li>
                            <li>Credit</li>
                            <li>Usage</li>
                        </ul>
                        <h2 className="inDashboardHeader">Credit Setup</h2>
                        <p className="userListAbout">Credit usage and limit setup for Organization</p>
                    </div>
                </div>
                <div className="cr_creditSetupBody">
                    <div className="cr_creditSetupFormWrap">
                        <h2>Credit Usage Setup</h2>
                        <div className="cr_creditSetupForm">
                            <form ref={usageForm}>
                                <div className={formErrors.call ? "cmnFormRow errorField" : "cmnFormRow"}>
                                    <label className="cmnFieldName">Call  (Per Minute)</label>
                                    <input type="text" name="callCreditUsage" className="cmnFieldStyle" placeholder="Ex. 3" onChange={handleCallCreditUsage} />
                                    {formErrors.call ? (
                                        <p className="errorMsg">{formErrors.call}</p>
                                    ) : null}
                                </div>
                                {isDisplay ?
                                    <div className={formErrors.sms ? "cmnFormRow errorField" : "cmnFormRow"}>
                                        <label className="cmnFieldName">SMS  (Per Sms)</label>
                                        <input type="text" name="smsCreditUsage" className="cmnFieldStyle" placeholder="Ex. 3" onChange={handleSmsCreditUsage} />
                                        {formErrors.sms ? (
                                            <p className="errorMsg">{formErrors.sms}</p>
                                        ) : null}
                                    </div> : ''}
                                {isDisplay ?
                                    <div className={formErrors.buyNumber ? "cmnFormRow errorField" : "cmnFormRow"}>
                                        <label className="cmnFieldName">Buy Number  (Per Number)</label>
                                        <input type="text" name="buyNumberCreditUsage" className="cmnFieldStyle" placeholder="Ex. 3" onChange={handleBuyNumberCreditUsage} />
                                        {formErrors.buyNumber ? (
                                            <p className="errorMsg">{formErrors.buyNumber}</p>
                                        ) : null}
                                    </div> : ''}
                                <div className="cmnFormRow">
                                    <div className="btnGroup centered">
                                        <button type="button" className="cmnBtn" onClick={saveUsageSetup}>
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="cr_creditSetupFormWrap cr_creditLimitFrom">
                        <h2>Credit Limit Setup</h2>
                        <div className="cr_creditSetupForm">
                            <form ref={limitForm}>
                                <div className={formErrors.autoRenewLimit ? "cmnFormRow errorField" : "cmnFormRow"}>
                                    <label className="cmnFieldName">Credit Balance limit for Auto Renew</label>
                                    <input type="text" name="autoRenewLimit" className="cmnFieldStyle" placeholder="Ex. 50" onChange={handleAutoRenewLimit} />
                                    {formErrors.autoRenewLimit ? (
                                        <p className="errorMsg">{formErrors.autoRenewLimit}</p>
                                    ) : null}
                                </div>
                                <div className="cmnFormRow">
                                    <div className="btnGroup centered">
                                        <button type="button" className="cmnBtn" onClick={saveLimitSetup}>
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UsageSetup;