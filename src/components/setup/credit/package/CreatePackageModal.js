import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import crossIcon from "../../../../assets/images/cross.svg";
import packageIcon from "../../../../assets/images/package_icon.svg";
import arrowForward from "../../../../assets/images/arrow_forward.svg";
import { CreditManagementServices } from "../../../../services/setup/CreditManagementServices";
import Loader from "../../../shared/Loader";
import * as actionTypes from "../../../../actions/types";

const initialPackageState = {
    name: "",
    credit: "",
    price: "",
    discount: ""
}


const CreatePackageModal = (props) => {

    const creditForm = useRef();
    const [formErrors, setFormErrors] = useState({ ...initialPackageState });
    const [isLoader, setIsLoader] = useState(false);
    const [editId, setEditId] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        /**
         * Set package details
         */
        if (props.editPackageItem) {
            setEditId(props.editPackageItem._id);
            creditForm.current['packageName'].value = props.editPackageItem.name;
            creditForm.current['creditBalance'].value = props.editPackageItem.credit;
            creditForm.current['packagePrice'].value = props.editPackageItem.price;
            creditForm.current['discount'].value = props.editPackageItem.discount;
        }
        console.log('Edit props', props.editPackageItem);
    }, [props.editPackageItem]);


    //Package name change
    const handlePackageNameChange = () => {
        let checkPackageName = checkPackageNameErr(creditForm.current['packageName'].value);
        setFormErrors({
            ...formErrors,
            name: checkPackageName
        })
    }

    //Package name validations
    const checkPackageNameErr = name => {
        let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return name.trim().length <= 0
            ? "Title cannot be empty."
            : name.trim().length > 60
                ? "Title should have maximum 60 characters."
                : isSpecialCharacterformat.test(name)
                    ? "Name should not contain any special characters" :
                    "";
    };


    //Credit balance change
    const handleCreditBalanceChange = () => {
        let checkCreditBalance = checkPackageCreditErr(creditForm.current['creditBalance'].value)
        setFormErrors({
            ...formErrors,
            credit: checkCreditBalance
        })
    }


    //Credit balance
    const checkPackageCreditErr = credit => {
        let regex = /^\d{0,7}$/;
        return credit.trim().length <= 0
            ? "Credit can not be blank"
            : isNaN(credit)
                ? "Numeric value expected for credit."
                : credit <= 0
                    ? "Zero is not considered as a valid credit."
                    : !regex.test(credit)
                        ? "Credit can't be more than 7 digits (without decimal point)"
                        : "";
    };

    //Package price change
    const handlePackagePriceChange = () => {
        let checkPackagePrice = checkPackagePriceErr(creditForm.current['packagePrice'].value);
        setFormErrors({
            ...formErrors,
            price: checkPackagePrice
        })
    }

    //Package price
    const checkPackagePriceErr = amount => {
        let regex = /^\d{0,5}(\.\d{1,2})?$/;
        return amount.trim().length <= 0
            ? "Price can not be blank"
            : isNaN(amount)
                ? "Numeric value expected for amount."
                : Number(amount) <= 0
                    ? "Zero is not considered as a valid amount."
                    : !regex.test(amount)
                        ? "Amount can't be more than 5 digit 2 decimal places."
                        : "";
    };

    //Discount change
    const handleDiscountChange = () => {
        let checkDiscount = checkDiscountErr(creditForm.current['discount'].value);
        setFormErrors({
            ...formErrors,
            discount: checkDiscount
        })
    }

    //Discount
    const checkDiscountErr = value => {
        return value.trim().length > 10
                ? "Discount text should have maximum 10 characters."
                : "";
    };


    const validateCreditForm = () => {

        let isError = false;
        let formErrorsCopy = formErrors;


        //Package name
        let checkPackageName = checkPackageNameErr(creditForm.current['packageName'].value);
        if (checkPackageName) {
            isError = true;
            formErrorsCopy.name = checkPackageName;
        }

        //Credit balance
        let checkCreditBalance = checkPackageCreditErr(creditForm.current['creditBalance'].value)
        if (checkCreditBalance) {
            isError = true;
            formErrorsCopy.credit = checkCreditBalance;
        }

        //Package price
        let checkPackagePrice = checkPackagePriceErr(creditForm.current['packagePrice'].value);
        if (checkPackagePrice) {
            isError = true;
            formErrorsCopy.price = checkPackagePrice;
        }


        //Discount
        let checkDiscount = checkDiscountErr(creditForm.current['discount'].value);
        if (checkDiscount) {
            isError = true;
            formErrorsCopy.discount = checkDiscount;
        }


        //Set errors
        setFormErrors({
            ...formErrors,
            name: formErrorsCopy.name,
            credit: formErrorsCopy.credit,
            price: formErrorsCopy.price,
            discount: formErrorsCopy.discount
        });


        return !isError;
    }

    //Submit
    const savePackage = async () => {
        let isValid = validateCreditForm();
        console.log("save package isValid: ", isValid);

        if (isValid) {
            /**
             * Submit the form
             */
            console.log('submit the form');
            let payload = {
                name: creditForm.current['packageName'].value,
                credit: Number(creditForm.current['creditBalance'].value),
                price: Number(creditForm.current['packagePrice'].value),
                discount: creditForm.current['discount'].value
            }
            setIsLoader(true);
            try {
                //Operation type
                let operationMethod = "createPackage";
                if (editId) {
                    operationMethod = "updatePackage";
                    payload.id = editId;
                }

                let createPackage = await CreditManagementServices[operationMethod](payload);
                if (createPackage) {
                    console.log('create success', createPackage);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: `Package ${editId ? 'updated' : 'created'} successfully.`,
                        typeMessage: 'success'
                    });
                    props.fetchPackages();
                }

            } catch (e) {
                console.log("In package create error : ", e.message);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            } finally {
                setIsLoader(false);
                props.closeModal();
            }
        }
    }

    return (
        <div className="modalBackdrop cr_createPackageModal">
            {console.log('In render', editId)}
            {isLoader ? <Loader /> : ""}
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={props.closeModal}>
                        <img src={crossIcon} alt="" />
                    </button>
                    <div className="circleForIcon">
                        <img src={packageIcon} alt="" />
                    </div>
                    <h3>{editId ? "Update Package" : "Create a new Package"}</h3>
                    <p>{editId ? "Update packages for Organization" : "Create new packages for Organization"}</p>
                </div>
                <div className="cmnForm">
                    <form ref={creditForm}>
                        <div className="cmnFormRow">
                            <div className="cmnFieldName">
                                Package Name
                                <span className="mandatory"> *</span>
                            </div>
                            <div className={formErrors.name ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" name="packageName" className="cmnFieldStyle" placeholder="Enter package name" onChange={handlePackageNameChange} />
                                {formErrors.name ? (
                                    <p className="errorMsg">{formErrors.name}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Credit Balance
                                    <span className="mandatory"> *</span>
                                </div>
                                <div className={formErrors.credit ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" name="creditBalance" className="cmnFieldStyle" placeholder="Ex. 1000" onChange={handleCreditBalanceChange} />
                                    {formErrors.credit ? (
                                        <p className="errorMsg">{formErrors.credit}</p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Package Price
                                    <span className="mandatory"> *</span>
                                </div>
                                <div className={formErrors.price ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" name="packagePrice" className="cmnFieldStyle" placeholder="$ Ex. 149" onChange={handlePackagePriceChange} />
                                    {formErrors.price ? (
                                        <p className="errorMsg">{formErrors.price}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFieldName">Discount</div>
                            <div className={formErrors.discount ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" name="discount" className="cmnFieldStyle" placeholder="Ex. $50 Off" onChange={handleDiscountChange} />
                                {formErrors.discount ? (
                                    <p className="errorMsg">{formErrors.discount}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="btnGroup centered">
                                <button type="button" className="cmnBtn" onClick={savePackage}>
                                    <span>Save</span>
                                    <img src={arrowForward} alt="" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreatePackageModal;