import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";

import moment from "moment";
import info_icon from "../../../../../assets/images/infos.svg";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/no_downpayment.svg";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { utils } from "../../../../../helpers"
import { useSelector } from "react-redux";


const DownPayments = forwardRef((props, ref) => {
    const [tomorrow, setTomorrow] = useState();
    const downPaymentElement = {
        title: "Down Payment 1",
        titleErr: "",
        amount: "",
        amountErr: "",
        isPayNow: 1,
        paymentDate: "",
        minPaymentDate: "",
        payment_type: "cash",
        payment_status: "paid",
    }
    const [payLaterDate, setPayLaterDate] = useState();
    const [calenderMinDate, setCalenderMinDate] = useState();
    const [isDownPayment, setIsDownPayment] = useState(false);
    const [downPaymentElems, setDownPaymentElems] = useState([{ ...downPaymentElement }]);
    const timezoneOffset = useSelector((state) => (state.user?.data.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null);

    useEffect(() => {
      let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
      let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset, "YYYY-MM-DD");
      setCalenderMinDate(timezoneDateTime);
      let tomorrowDate = moment().add(1, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
      let tomorrowsDateConverted = utils.convertUTCToTimezone(tomorrowDate ,timezoneOffset, "YYYY-MM-DD");
      setTomorrow(tomorrowsDateConverted);
    }, [timezoneOffset]);
  
    useEffect(() => {
        if (props.contractData && props.contractData.isDownPayment && props.contractData.downPayments.length) {
            setIsDownPayment(true);
            setDownPaymentElems(props.contractData.downPayments);
        }
    }, [props.contractData])

    useEffect(() => {
        broadcastToParent();
    }, [downPaymentElems]);

    const broadcastToParent = () => {
        props.downPaymentsCallback({ downPaymentElems, isDownPayment });
    };

    useImperativeHandle(ref, () => ({
        validate,
    }));

    const validate = (addnew = false) => {
        let errflag = false;
        const newElems = downPaymentElems.map(el => {
            let newEl = { ...el };
            const errTitle = checkTitleErr(el.title);
            const errAmount = checkAmountErr(el.amount);
            if (errflag === false && (errTitle.length > 0 || errAmount.length > 0)) {
                errflag = true;
            }
            newEl.titleErr = errTitle;
            newEl.amountErr = errAmount;
            return newEl;
        });

        if (addnew && errflag === false) {
            downPaymentElement.title = 'Down Payment ' + (downPaymentElems.length + 1)
            newElems.unshift(downPaymentElement);
        }
        setDownPaymentElems(newElems);

        return !errflag;
    }

    const addDownpaymentFn = (e) => {
        e.preventDefault();
        validate(true);
    };

    const checkTitleErr = title => {
        return title.trim().length <= 0
            ? "Title cannot be empty."
            : title.trim().length < 2 || title.trim().length > 60
                ? "Title should have minimum 2 characters and maximum 60 characters."
                : "";
    };

    const checkAmountErr = amount => {
        let val = parseFloat(amount);
        let regex = /^\d{0,5}(\.\d{1,2})?$/;
        return isNaN(val)
            ? "Numeric value expected for amount."
            : val <= 0
                ? "Zero is not considered as a valid amount."
                : !regex.test(val)
                    ? "Amount can't be more than 2 decimal places."
                    : "";
    };

    const downpayDatepicker = (val, key, type) => {

        let formattedDate = `${val.getFullYear()}-${
            val.getMonth() + 1
          }-${val.getDate()}`;
        formattedDate = utils.dateConversion(formattedDate)
        setPayLaterDate(val);

        validateIndividual(formattedDate, key, type);
    }

    const validateIndividual = (e, key, type) => {
        let elems = [...downPaymentElems];
        if (type === "isPayNow") {
            elems[key][type] = e.target.checked ? 1 : 0;
        } else if (type === "paymentDate") {
            elems[key][type] = e;
        }
        else {
            elems[key][type] = e.target.value;
        }
        let newElem = elems[key];
        switch (type) {
            case "title":
                newElem.titleErr = checkTitleErr(newElem.title);
                break;
            case "amount":
                if(!newElem.paymentDate) {
                    newElem.paymentDate = tomorrow;
                }
                newElem.amountErr = checkAmountErr(newElem.amount);
                break;
            case "isPayNow":
                if (e.target.checked && newElem.payment_type === 'cash') {
                    newElem.payment_status = 'paid';
                } else if (e.target.checked && newElem.payment_type === 'online') {
                    newElem.payment_status = 'unpaid';
                } else {
                    newElem.payment_status = 'unpaid';
                }
                break;
            case "payment_type":
                if (newElem.payment_type === 'online') {
                    newElem.payment_status = 'unpaid';
                } else if (newElem.payment_type === 'cash' && newElem.isPayNow === 1) {
                    newElem.payment_status = 'paid';
                }

            default:
                break;
        }
        elems[key] = newElem;
        setDownPaymentElems( elems);
    };

    //Delete down payment
    const delDownpaymentFn = (e, key) => {
        e.preventDefault();
        // setDownPaymentElems(key !== 0 ? downPaymentElems.filter((_, k) => key !== k) : downPaymentElems);
        setDownPaymentElems(downPaymentElems.filter((_, k) => key !== k));
    };

    //Downpayment toggle
    const downPaymentToggle = (e) => {
        let isActive = e.target.checked;
        setIsDownPayment(isActive);
        setDownPaymentElems([{ ...downPaymentElement }]);
        if (!isActive) {
            setDownPaymentElems([]);
        }
    }

    return (
        <React.Fragment>
            <div className="productAvailable downpayment active">
                <div className="downPaymentToogle">
                    <header className="informHeader"><h5>Down Payment <span className="cartCount">{!isDownPayment ? 0 : downPaymentElems.length}</span></h5></header>
                    <label
                        className={isDownPayment ? "toggleBtn active" : "toggleBtn"
                        }
                    >
                        <input
                            type="checkbox"
                            name="check-communication"
                            onChange={(e) => downPaymentToggle(e)}
                            checked={isDownPayment}
                        />
                        <span className="toggler"></span>
                    </label>

                </div>
                <div className="previewBox">
                    <div className={isDownPayment ? "previewImgBox course" : "previewImgBox course display"
                    }>
                        <div className="nodownpaymentInfos">
                            <img src={downpayment} alt="" />
                            <p className="noDownpaymentText">Down Payment is Disabled</p>
                        </div>
                    </div>
                    <div className={isDownPayment ? "previewDownpaymentBox programs display" : "previewDownpaymentBox programs"
                    }>
                        {downPaymentElems.map((el, key) => (
                            <div className="newDownpayment_downPaymentWrapers" key={key}>
                                <div className="downPaymentsCreated">
                                    <div className="newDownpayment programs buttons programPages">
                                        
                                        {key === 0 ?

                                            <button className="addNewDownpayment" onClick={addDownpaymentFn}>+ Add more Downpayments</button> : ''
                                        }

                                    </div>



                                    <div className="newDownpayment programs">
                                        {key !== (downPaymentElems.length - 1) ?
                                            <button className="delNewDownpayment" onClick={(e) => delDownpaymentFn(e, key)}><img src={deleteBtn} /> Remove</button> : ''
                                        }
                                        <div className="transaction_form products forDownpayment programs">
                                            <div className={
                                                el.titleErr.length > 0
                                                    ? "formsection gap errorField"
                                                    : "formsection gap"
                                            }>
                                                <label className="labelWithInfo">
                                                    <span className="labelHeading">Title</span>
                                                    <span className="infoSpan">
                                                        <img src={info_icon} alt="" />
                                                        <span className="tooltiptextInfo programDownpayment">Title for down payment.</span>
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="cmnFieldStyle"
                                                    value={el.title}
                                                    onBlur={e => validateIndividual(e, key, "title")}
                                                    onChange={e => validateIndividual(e, key, "title")}
                                                />
                                            </div>
                                            <div className={
                                                el.amountErr.length > 0
                                                    ? "formsection gap errorField"
                                                    : "formsection gap"
                                            }>
                                                <div className="leftSecTransaction">
                                                    <label className="labelWithInfo">
                                                        <span className="labelHeading">Amount</span>
                                                        <span className="infoSpan">
                                                            <img src={info_icon} alt="" />
                                                            <span className="tooltiptextInfo amount">Amount you want to pay as down payment.</span>
                                                        </span>
                                                    </label>
                                                    <div className="cmnFormField preField">
                                                        <div className='unitAmount'>
                                                            $
                                                        </div>
                                                        <input
                                                            type="number"
                                                            className="cmnFieldStyle numberType"
                                                            value={el.amount}
                                                            onBlur={e => validateIndividual(e, key, "amount")}
                                                            onChange={e => validateIndividual(e, key, "amount")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="rightSecTransaction">

                                                    <label className="labelWithInfo paymentTime">
                                                        <span className="labelHeading">I want to Pay Later</span>
                                                        <label
                                                            className={el.isPayNow ? "toggleBtn " : "toggleBtn active"
                                                            }
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name="check-communication"
                                                                onChange={e => validateIndividual(e, key, "isPayNow")}
                                                                checked={el.isPayNow}
                                                            />
                                                            <span className="toggler"></span>
                                                        </label>
                                                    </label>
                                                    <div className={el.isPayNow ? "paymentNow display" : "paymentNow"} >
                                                        <p>Payment date <span>Now</span></p>
                                                    </div>
                                                    <div className={el.isPayNow ? "paymentNow " : "paymentNow display"} >
                                                        {/* <input
                                                            type="date"
                                                            className="editableInput"
                                                            placeholder="mm/dd/yyyy"
                                                            value={el.paymentDate}
                                                            min={el.minPaymentDate}
                                                            onChange={e => validateIndividual(e, key, "paymentDate")}
                                                        /> */}
                                                        <DatePicker 
                                                            className="cmnFieldStyle"
                                                            selected={el.paymentDate ? new Date(el.paymentDate + " 00:00:00") : (tomorrow ? new Date(tomorrow): new Date())}
                                                            format="MM/dd/yyyy"
                                                            dateFormat="MM/dd/yyyy"
                                                            placeholderText="MM/DD/YYYY"
                                                            onChange={(val) => downpayDatepicker(val, key, "paymentDate")} 
                                                            minDate={tomorrow ? new Date(tomorrow): new Date()}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="formsection gap">
                                                <div className="leftSecTransaction">
                                                    <label className="labelWithInfo">
                                                        <span className="labelHeading">Payment Mode</span>
                                                        <span className="infoSpan">
                                                            <img src={info_icon} alt="" />
                                                            <span className="tooltiptextInfo paymentType">Payment mode.</span>
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="selectBox"
                                                        name="paymentMode"
                                                        value={el.payment_type}
                                                        onChange={e => validateIndividual(e, key, "payment_type")}
                                                    >
                                                        <option value="cash">Cash</option>
                                                        <option value="online">Online</option>
                                                    </select>
                                                </div>
                                                <div className="rightSecTransaction">
                                                    <label className="labelWithInfo">
                                                        <span className="labelHeading">Payment Status</span>
                                                        <span className="infoSpan">
                                                            <img src={info_icon} alt="" />
                                                            <span className="tooltiptextInfo paymentStatus">Payment status.</span>
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="selectBox"
                                                        name="paymentStatus"
                                                        value={el.payment_status}
                                                        onChange={e => validateIndividual(e, key, "payment_status")}
                                                        disabled
                                                    >
                                                        <option value="unpaid">Unpaid</option>
                                                        <option value="paid">Paid</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment >
    );

});

export default DownPayments;