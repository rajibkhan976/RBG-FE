import React, { useEffect, useState, useRef, createRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import help from "../../../../../assets/images/help.svg";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import card from "../../../../../assets/images/card.svg";
import card_payment_mode from "../../../../../assets/images/card_payment_mode.svg"
import cashCurrent from "../../../../../assets/images/cashCurrent.svg";
import cardActive from "../../../../../assets/images/cardActive.svg";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import payMode from "../../../../../assets/images/paymode.svg";
import pluss from "../../../../../assets/images/pluss.svg";
import cashSuccess from "../../../../../assets/images/cashSuccess.svg";
import paidCard from "../../../../../assets/images/paidCrad.svg";
import smallTick from "../../../../../assets/images/smallTick.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import paySuccess from "../../../../../assets/images/paySuccess.png";
import Loader from "../../../../shared/Loader";
import { BillingServices } from "../../../../../services/billing/billingServices";
import { ProductServices } from "../../../../../services/setup/ProductServices";
import BillingOverview from "./BillingOverview";

const ProductPayment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [productPayload, setProductPayload] = useState(null)
  const [downPayments, setDownPayments] = useState([]);
  const [createdDownPayment, setCreatedDownpayment] = useState({
    isPayNow: 1
  })
  const [downPaymentActive, setDownPaymentActive] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [newPay, setNewPay] = useState({
    type: "card",
    billingId: null
  });
  const [productPaymentFailed, setProductPaymentFailed] = useState(false);
  const downPaymentList = useRef(null);
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalTaxAmt, setTotalTaxAmt] = useState(0);
  const [outStanding, setOutstanding] = useState({
    amount: 0,
    payment_type: "online",
    title: "Outstanding",
    type: "outstanding",
    paymentDate: new Date(new Date()).toISOString().split('T')[0],
    isPayNow: 1,
    payment_status: "unpaid"
  });
  const [cardBankList, setCardBankList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [payments, setPayments] = useState([])
  const [newCard, setNewCard] = useState(null)
  const [newBank, setNewBank] = useState(null)
  const [newPayMethod, setNewPayMethod] = useState(null)
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(null)
  const downpaymentsContainer = useRef(null);
  const createDownpayAmount = useRef(null)
  const datePayment = useRef(null)
  const inputOutstandingDate = useRef(null)

  const [paymentFailed, setPaymentFailed] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [downPaymentErrorMsg, setDownPaymentErrorMsg] = useState({
    title_Err: "",
    amount_Err: "",
    payNow_Err: "",
    payMode_Err: "",
    payStatus_Err: "",
    payDate_Err: "",
    outStandingDate_Err: "",
    outStanding_Err: "",
    edit_Title_Err: "",
    edit_Amount_Err: "",
    edit_PayDate_Err: "",
    edit_PayType_Err: "",
    edit_PayStatus_Err: ""
  });

  useEffect(()=>{
    const getTotalCart = () => {
      if (props.cartState.length > 0) {
        const totalPlaceholder = 0;
        const totalTaxPlaceholder = 0;

        const sumAmt = props.cartState.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.price * currentValue.qnty,
          totalPlaceholder
        );
        const taxtAmt = props.cartState.reduce(
          (prevTax, currentTax)=>
          prevTax + (currentTax.tax && currentTax.price*0.1),
          totalTaxPlaceholder
        );

        setTotalAmt(parseFloat(sumAmt).toFixed(2));
        setTotalTaxAmt(parseFloat(taxtAmt).toFixed(2));
        setOutstanding({
          ...outStanding,
          amount: (parseFloat(sumAmt)+parseFloat(taxtAmt)).toFixed(2)
        })

        //  //  console.log("sumAmt", sumAmt, taxtAmt);
      } else {
        //  //  console.log("Sum now", props.cartState);
        setTotalAmt(0.00);
        setTotalTaxAmt(0.00);
      }
    };

    getTotalCart();
  },[])

  //   toggle pay later for down payment
  const addpayLater = (e, i) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;

    try {
      setIsLoader(true)
      setCreatedDownpayment({
        ...createdDownPayment,
        isPayNow: e.target.checked ? 0 : 1,
        paymentDate: e.target.checked ? today : ""
      })
    } catch (error) {
    } finally{
      setIsLoader(false)
    }
  };

  //   add pay date
  const addPayDate = (e, i) => {
    let dateSelected = e.target.value;
    
    if(e.target.value !== "") {
      try {
        setIsLoader(true)
        setCreatedDownpayment({
          ...createdDownPayment,
          paymentDate: dateSelected
        })
        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          payDate_Err: ""
        })
      } catch (error) {
        setHasError(true)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          payDate_Err: error
        })
      } finally{
        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          payDate_Err: ""
        })
        setIsLoader(false)
      }
    } else {
      setHasError(true)
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        payDate_Err: "Next payment cannot be empty"
      })
    }
  };

  const payDateChangeOverview = (e) => {
    const outStandingPlaceholder = outStanding;

    try{
      if(e.target.checked) {
        setPayLater(true);
        outStandingPlaceholder.paymentDate = nextPayDate().toISOString().split('T')[0]
      } else {
        setPayLater(false)
        outStandingPlaceholder.paymentDate = todayPayDate().toISOString().split('T')[0]
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOutstanding(outStandingPlaceholder)
      setIsLoader(false)
    }
  };

  const billPayment = async (e) => {
    e.preventDefault();
    const paymentsArray = [...downPayments]
          outStanding.amount !== 0 && paymentsArray.push(outStanding)

    const productPayload = {
      contact: props.contactId,
      default_transaction: newPay && newPay.type,
      billingId: newPay.billingId !== null && newPay.billingId,
      items: props.cartState,
      payments: paymentsArray
    };

    console.log("productPayload:::::", productPayload, "CARD LIST:::", cardBankList, "BANK LIST:::", bankList);

    if(!hasError) {
      try {
        setIsLoader(true)
        let productBuy = await ProductServices.buyProduct(productPayload)
        if(productBuy) {
          setPaymentSuccessMessage(productBuy.message)
          openSuccessMessage()
          console.log("Payload result:::", productBuy);
        }
      } catch (error) {
        setPaymentFailed(error.message)
        setProductPaymentFailed(true)
      } finally {
        setIsLoader(false)
        setPaymentFailed(null)
        setProductPaymentFailed(false)
        console.log("SUCCESS:::");
      }
    }
  };

  const openSuccessMessage = () => {
    setProductPaymentFailed(false)
    props.setSuccessProductPaymentFn(true)
  }

  const resetProductForm = (e) => {
    e.preventDefault()
    props.setSuccessProductPaymentFn(false)
    props.setProductTransactionPayment(false)
    props.chooseTransctionTypePOS()
    props.setCartState([])
  }

  const checkAndSetDownPayments = (e) => {    
    if (e.target.checked) {
      //  console.log("outStanding.amount       ::::           ", outStanding.amount , typeof outStanding.amount);
      setDownPaymentActive(true);
      setCreatedDownpayment({
        title: "Downpayment",
        amount: parseFloat(outStanding.amount).toFixed(2),
        type: "downpayment",
        isPayNow: 1,
        payment_type: "cash",
        payment_status: "unpaid"
      })
    } else {
      setDownPaymentActive(false);
      setCreatedDownpayment({
        amount: 0,
        isPayNow: 0,
        title: ""
      })
      setDownPayments([])
      setOutstanding({
        ...outStanding,
        amount: parseFloat(totalAmt)+parseFloat(totalTaxAmt),
        payment_type: "online",
      });
      // console.log("parseFloat(totalAmt+totalTaxAmt).toFixed(2)", parseFloat(totalAmt)+parseFloat(totalTaxAmt));
    }
  };

  const addDownPayTitle = (e) => {
    if(e.target.value.trim().length > 0) {
      setCreatedDownpayment({
        ...createdDownPayment,
        title: e.target.value
      })
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title_Err: ""
      })
    }
    else {
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title_Err: "Title cannot be blank"
      })
    }
  }

  const addDownPayAmount = (e) => {
    if(e.target.value[0] == 0) {
      e.target.value = ""
    }
    if(e.target.value.trim().length > 0 && parseFloat(e.target.value) !== 0 && parseFloat(e.target.value) <= parseFloat(outStanding.amount)) {
      setCreatedDownpayment({
        ...createdDownPayment,
        amount: e.target.value
      })
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        amount_Err: ""
      })
    }
    else {
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        amount_Err: parseFloat(e.target.value).toFixed(2) === 0 ? "Amount cannot be 0" : parseFloat(e.target.value).toFixed(2) > parseFloat(outStanding.amount).toFixed(2) ? "Amount cannot be more than outstanding amount" : "Amount cannot be nothing"
      })
    }    
  }

  const changePaymentType = (e) => {
    //  //  console.log("changePaymentType:::::", e.target.value);

    setCreatedDownpayment({
      ...createdDownPayment,
      payment_type: e.target.value,
    })
  }

  const changePaymentStatus = (e) => {
    //  //  console.log("changePaymentStatus:::::", e.target.value);
    
    setCreatedDownpayment({
      ...createdDownPayment,
      payment_status: e.target.value,
    })
  }

  //   add more down payment
  const addNewDownPayment = (e, i) => {
    e.preventDefault();

      console.log("outstanding ::: 266  ::::::::  in add ",outStanding.amount, typeof outStanding.amount);

    let createdDownPaymentPlaceholder = createdDownPayment;

    createdDownPaymentPlaceholder.paymentDate = createdDownPaymentPlaceholder.isPayNow === 0 && datePayment.current.value

    if(!hasError) {
      setIsLoader(true);

      try {
        setDownPayments(prevDownpayments => [...prevDownpayments, createdDownPaymentPlaceholder])
        setOutstanding({
          ...outStanding,
          amount: parseFloat(outStanding.amount).toFixed(2) - parseFloat(createdDownPaymentPlaceholder.amount).toFixed(2) <= 0 ? 0.00 : (parseFloat(outStanding.amount) - parseFloat(createdDownPaymentPlaceholder.amount)).toFixed(2)
        })
          // console.log(":::createdDownPayment:::", outStanding);
      } catch (err) {
        //  //  console.log(err);
        setHasError(true);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          server_Err: err.message
        })
      } finally {
        setHasError(false);
        setDownPaymentErrorMsg({
          title_Err: "",
          amount_Err: "",
          payNow_Err: "",
          payMode_Err: "",
          payStatus_Err: "",
        })
        
        createDownpayAmount.current.value = outStanding.amount > 0 ? (outStanding.amount - parseFloat(createdDownPayment.amount)).toFixed(2) : 0
        
        setCreatedDownpayment({
          title: `Downpayment`,
          amount: outStanding.amount > 0 ? (outStanding.amount - parseFloat(createdDownPayment.amount)).toFixed(2) : 0,
          type: "downpayment",
          isPayNow: 0,
          payment_type: "online",
          payment_status: "unpaid"
        })
        setIsLoader(false);
      }
    }
  };

  //   delete downpayment
  const deleteNewDownPayment = (e, downpay, i) => {
    e.preventDefault();
    try {
      //  //  console.log("outStanding.amount", downpay)
      setDownPayments(downpayment => downpayment.filter((dn, index) => index !== i))
      downpay.paymentDate ? setCreatedDownpayment({
        title: "Downpayment",
        amount: downpay.amount,
        type: "downpayment",
        isPayNow: 0,
        paymentDate: downpay.paymentDate,
        payment_type: "online",
        payment_status: "unpaid"
      }) : setCreatedDownpayment({
        title: "Downpayment",
        amount: downpay.amount,
        type: "downpayment",
        isPayNow: 1,
        payment_type: "online",
        payment_status: "unpaid"
      })
      setOutstanding({
        ...outStanding,
        amount: downpay.amount
      })
    } catch (error) {
      //  //  console.log(error);
    }
  };

  const nextPayDate = () => {
    let today = new Date();
    let tentativeDate = new Date(today)
        tentativeDate.setMonth(tentativeDate.getMonth()+1);
    return tentativeDate
  }

  const todayPayDate = () => {
    let today = new Date();
    return today
  }

  const payDueMode = (e) => {
    try {
      setIsLoader(true);

      if(e.target.value === "online") {
        setOutstanding({
          ...outStanding,
          payment_type: "online"
        }) 
      }
      if(e.target.value === "cash") {
        setOutstanding({
          ...outStanding,
          payment_type: "cash"
        }) 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false)
    }
  }

  const changeOutstandingPayDate = (e) => {    
    let outStandingDateSelected = e.target.value.toISOString().split('T')[0];
    
    if(e.target.value !== "") {
      try {
        setIsLoader(true)
        setOutstanding({
          ...outStanding,
          paymentDate: outStandingDateSelected
        })
      } catch (error) {
        //  //  console.log(error);
        setHasError(true)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          outStandingDate_Err: "Problem with outstanding payment date"
        })
      } finally{
        setIsLoader(false)
        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          outStandingDate_Err: ""
        })
      }
    } else {
      setHasError(true)
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        outStandingDate_Err: "Outstanding payment date cannot be blank"
      })
    }
  }

  const billingTotalAmt = () => {
    //  //  console.log("Downpayments:::", downPayments.length);
    if(downPayments.length === 0) {
      if(payLater){
        return 0
      }
      if(!payLater){
        return parseFloat(outStanding.amount).toFixed(2)
      }
    }
    if(downPayments.length > 0) {
      if(outStanding.amount > 0) {
        if(payLater){
          return parseFloat(outStanding.amount).toFixed(2)
        }
        if(!payLater) {
          return parseFloat(outStanding.amount).toFixed(2)
        }
      }
      if(outStanding.amount === 0) {
        return parseFloat(downPayments[0].amount).toFixed(2)
      }
    }
  }

  // mark first downpayment PAID
  const markDownPaid = (e) => {
    const downPaymentsPlaceholder = [...downPayments];
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;

    try {
      setIsLoader(true)
      if(e.target.checked) {
        downPaymentsPlaceholder[0].isPayNow = 1
        downPaymentsPlaceholder[0].paymentDate = today
        downPaymentsPlaceholder[0].payment_status = "paid"
      } else {
        downPaymentsPlaceholder[0].isPayNow = 0
        downPaymentsPlaceholder[0].paymentDate = nextPayDate().toISOString().split('T')[0]
        downPaymentsPlaceholder[0].payment_status = "unpaid"
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreatedDownpayment(downPaymentsPlaceholder)
      console.log(downPaymentsPlaceholder);
      setIsLoader(false)
    }
  }
  // mark first downpayment PAID

  // Change default payment method
  const changeDefaultPay= (payItem, type) => {
    console.log("here");
    try {
      setIsLoader(true)
      setNewPay({
        type: type,
        billingId: payItem._id
      })      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false)
    }
  }

  useEffect(()=>{
    console.log("PAY METHOD MODIFIED:::", newPay);
  },[newPay])

  // Edit created Downpayments
  const changeDownpaymentTitle = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];
    
    if(e.target.value.trim().length > 0) {
      downPaymentsPlaceholder[i].title = e.target.value

      setDownPayments(downPaymentsPlaceholder)
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_Title_Err: ""
      })
    }
    else {
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_Title_Err: "Title cannot be blank"
      })
    }
  }
  const changeDownpaymentAmount = (e, downpay, i) => {
    const downPaymentsPlaceholder = [...downPayments];
    const totalPlaceholder = 0;

    const totalDownpaymentsAmt = downPayments.filter((dpTarget, index) => index !== i).reduce(
      (previousValue, currentValue) =>
        parseFloat(previousValue) + parseFloat(currentValue.amount),
      totalPlaceholder
    );

    try {
      if(e.target.value.trim() === "" || parseFloat(e.target.value) === 0) {
        //  //  console.log("e.target.value.trim() ===  || parseFloat(e.target.value) === 0");
        setHasError(true)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: "Amount can't be empty or 0"
        })
      }
      if(parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt) > (parseFloat(totalAmt) + parseFloat(totalTaxAmt))){
        //  //  console.log("parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt) > (parseFloat(totalAmt) + parseFloat(totalTaxAmt))");
        setHasError(true)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: "Downpayments amount exceeding total"
        })

        setOutstanding({
          ...outStanding,
          amount: 0
        })
      }
      if(parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt) < (parseFloat(totalAmt) + parseFloat(totalTaxAmt))) {
        //  //  console.log("parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt) < (parseFloat(totalAmt) + parseFloat(totalTaxAmt))");
        downPaymentsPlaceholder[i].amount = e.target.value;
        
        setDownPayments(downPaymentsPlaceholder)

        setOutstanding({
          ...outStanding,
          amount: (parseFloat(totalAmt) + parseFloat(totalTaxAmt)) - (parseFloat(totalDownpaymentsAmt) + parseFloat(e.target.value))
        })

        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: ""
        })
      }
      if(parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt) === (parseFloat(totalAmt) + parseFloat(totalTaxAmt))) {
        //  //  console.log("parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt) === (parseFloat(totalAmt) + parseFloat(totalTaxAmt))");
        downPaymentsPlaceholder[i].amount = e.target.value;
        
        setDownPayments(downPaymentsPlaceholder)

        setOutstanding({
          ...outStanding,
          amount: 0
        })

        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: ""
        })
      }
    }
    catch (err) {
      //  //  console.log(err);
    }
    finally {
      // ((parseFloat(totalAmt) + parseFloat(totalTaxAmt)) - (parseFloat(totalDownpaymentsAmt) + parseFloat(e.target.value))).toFixed(2)
      //  //  console.log((parseFloat(totalAmt) + parseFloat(totalTaxAmt)) - (parseFloat(totalDownpaymentsAmt) + parseFloat(e.target.value)));
      setTimeout(() => {
        createDownpayAmount.current.value = 0
        setHasError(true);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          amount_Err: "Amount cannot be nothing"
        })
      }, 1000);
    }
    // //  //  console.log(parseFloat(e.target.value)+parseFloat(totalDownpaymentsAmt));
  }
  const changeDownpaymentIsPayNow = (e, downpay, i) => {
    //  //  console.log(e.target);
    try {
      setIsLoader(true)
      const downPaymentsPlaceholder = [...downPayments];
            downPaymentsPlaceholder[i].isPayNow = e.target.checked ? 0 : 1

      setDownPayments(downPaymentsPlaceholder)
      
      if(e.target.checked) {
        setHasError(true)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_PayDate_Err: "Date cannot be empty"
        })
      } else {
        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_PayDate_Err: ""
        })
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoader(false)
    }
  }
  const changeDownpaymentDate = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];

    try {
      setIsLoader(true);
      downPaymentsPlaceholder[i].paymentDate = e.target.value;

      setDownPayments(downPaymentsPlaceholder);

      setHasError(false)
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_PayDate_Err: ""
      })
    } catch (error) {
      console.log(error);
      setHasError(true)
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_PayDate_Err: error
      })
    } finally {
      setIsLoader(false);
      setHasError(false)
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_PayDate_Err: ""
      })
    }
    console.log("changeDownpaymentDate", e.target.value, downpay);
  }
  const changeDownpaymentType = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];
          downPaymentsPlaceholder[i].payment_type = e.target.value

    setDownPayments(downPaymentsPlaceholder)
    console.log("changeDownpaymentType", e.target.value, downpay);
  }
  const changeDownpaymentStatus = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];
          downPaymentsPlaceholder[i].payment_status = e.target.value

    setDownPayments(downPaymentsPlaceholder)
    console.log("changeDownpaymentStatus", e.target.value, downpay);
  }
  // Edit created Downpayments

  return (
    <>
      {isLoader && <Loader />}
      {!props.successProductPayment && 
        <form className="productPaymentTransaction">
          <div className="gridCol">
            <div className="cartProductInner productDownPayment">
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>
                  Down Payment{" "}
                  <span className="cartCount">
                    {downPayments.length > 0 ? downPayments.length : 0}
                  </span>
                </h5>

                <label
                  className={downPaymentActive ? "toggleBtn active" : "toggleBtn"}
                >
                  <input
                    type="checkbox"
                    name="down-payment-active"
                    onChange={(e) => checkAndSetDownPayments(e)}
                  />
                  <span className="toggler"></span>
                </label>
              </header>
              {downPaymentActive && (
                <div className="bodytransactionForm" ref={downPaymentList}>
                  {/* {//  //  console.log("OUTSTANDING::::", outStanding)} */}
                {outStanding.amount > 0 && <div className="newDownpayment">
                      <button
                        className="addNewDownpayment"
                        onClick={(e)=>addNewDownPayment(e)}
                        disabled={hasError === true || outStanding.amount === 0}
                      >
                        + Add
                      </button>
                    <div className="transaction_form products forDownpayment">
                      <div className={downPaymentErrorMsg.title_Err !== "" ? "cmnFormRow gap error" : "cmnFormRow gap"}>
                        <label className="labelWithInfo">
                          <span className="labelHeading">Title</span>
                          <span className="infoSpan">
                            <img src={info_icon} alt="" />
                            <span className="tooltiptextInfo">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </span>
                          </span>
                        </label>
                        <div className="cmnFormField">
                          {downPayments && downPayments.length === 0 ? <input
                            className="cmnFieldStyle"
                            onChange={(e)=>addDownPayTitle(e)}
                            defaultValue={createdDownPayment.title}
                            // value={createdDownPayment.title}
                          /> : <input
                          className="cmnFieldStyle"
                          onChange={(e)=>addDownPayTitle(e)}
                          defaultValue={createdDownPayment.title}
                          // value={createdDownPayment.title}
                        />}
                          
                        </div>
                        {downPaymentErrorMsg.title_Err && <p className="errorMsg">{downPaymentErrorMsg.title_Err}</p>}
                      </div>
                      <div className="cmnFormRow gap">
                        <div className={downPaymentErrorMsg.amount_Err !== "" ? "leftSecTransaction error" : "leftSecTransaction"} style={{fontSize: 0}}>
                          <label className="labelWithInfo">
                            <span className="labelHeading">Amount</span>
                            <span className="infoSpan">
                              <img src={info_icon} alt="" />
                              <span className="tooltiptextInfo amount">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                              </span>
                            </span>
                          </label>
                          <div className="cmnFormField preField">
                            <div className="unitAmount">$</div>
                            <input
                              type="number"
                              placeholder="149"
                              className="editableInput numberType cmnFieldStyle"
                              onChange={(e)=>addDownPayAmount(e)}
                              defaultValue={outStanding.amount}
                              ref={createDownpayAmount}
                            />
                          </div>
                        {downPaymentErrorMsg.amount_Err && <p className="errorMsg">{downPaymentErrorMsg.amount_Err}</p>}
                        </div>
                        <div className={downPaymentErrorMsg.payDate_Err !== "" ? "rightSecTransaction error" : "rightSecTransaction"}>
                          <label className="labelWithInfo paymentTime">
                            <span className="labelHeading">
                              I want to Pay Later
                            </span>
                            <label className={
                              createdDownPayment.isPayNow === 1 ? "toggleBtn" : "toggleBtn active"}
                            >
                              <input
                                type="checkbox"
                                name="check-communication"
                                onChange={(e) => addpayLater(e)}
                                defaultChecked={createdDownPayment.isPayNow === 1 ? false : true}
                              />
                              <span className="toggler"></span>
                            </label>
                          </label>
                          {createdDownPayment.isPayNow === 1 && (
                            <div className="paymentNow display">
                              <p>
                                Payment date <span>Now</span>
                              </p>
                            </div>
                          )}
                          {createdDownPayment.isPayNow === 0 && (
                            <div className="paymentNow">
                              <input
                                ref={datePayment}
                                type="date"
                                placeholder="mm-dd-yyyy"
                                className="cmnFieldStyle"
                                onChange={(e) => addPayDate(e)}
                                defaultValue={nextPayDate().toISOString().split('T')[0]}
                              />
                            </div>
                          )}
                          {downPaymentErrorMsg.payDate_Err && <p className="errorMsg">{downPaymentErrorMsg.payDate_Err}</p>}
                        </div>
                      </div>
                      <div className="cmnFormRow gap">
                        <div className="leftSecTransaction">
                          <label className="labelWithInfo">
                            <span className="labelHeading">Payment Mode</span>
                            <span className="infoSpan">
                              <img src={info_icon} alt="" />
                              <span className="tooltiptextInfo paymentType">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                              </span>
                            </span>
                          </label>
                          <div className="cmnFormField">
                          {/* {  //  console.log("{createdDownPayment.payment_type} ", createdDownPayment.payment_type)} */}
                            <select
                              className="selectBox"
                              value={createdDownPayment.payment_type}
                              onChange={(e)=>changePaymentType(e)}
                              disabled={downPayments.length > 0}
                            >
                              <option value="cash">Cash</option>
                              <option value="online">Card</option>
                            </select>
                          </div>
                        </div>
                        <div className="rightSecTransaction">
                          <label className="labelWithInfo">
                            <span className="labelHeading">
                              Payment Status
                            </span>
                            <span className="infoSpan">
                              <img src={info_icon} alt="" />
                              <span className="tooltiptextInfo paymentStatus">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                              </span>
                            </span>
                          </label>
                          {<select
                            className="selectBox"
                            onChange={(e)=>changePaymentStatus(e)}
                            value={createdDownPayment.payment_status}
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                          </select>}
                        </div>
                      </div>
                    </div>
                  </div>}
                  
                  {downPayments && downPayments.length > 0 && 
                      <div className="downPaymentsCreated" ref={downpaymentsContainer}>
                    {downPayments.map((downpay, i) => (
                        <div className="newDownpayment" key={"dp" + i}>
                          <button
                            className="delNewDownpayment"
                            onClick={(e) => deleteNewDownPayment(e, downpay, i)}
                          >
                            <img src={deleteBtn} alt="delete" /> Remove
                          </button>
                          <div className="transaction_form products forDownpayment">
                            <div className={downPaymentErrorMsg.edit_Title_Err ? "cmnFormRow gap error" : "cmnFormRow gap"}>
                              <label className="labelWithInfo">
                                <span className="labelHeading">Title</span>
                                <span className="infoSpan">
                                  <img src={info_icon} alt="" />
                                  <span className="tooltiptextInfo">
                                    Lorem Ipsum is simply dummy text of the printing
                                    and typesetting industry.
                                  </span>
                                </span>
                              </label>
                              <div className="cmnFormField">
                                <input
                                  className="cmnFieldStyle"
                                  defaultValue={downpay.title}
                                  onChange={(e)=>changeDownpaymentTitle(e, downpay, i)}
                                />
                              </div>
                              {downPaymentErrorMsg.edit_Title_Err && <p className="errorMsg">{downPaymentErrorMsg.edit_Title_Err}</p>}
                            </div>
                            <div className="cmnFormRow gap">
                              <div className={downPaymentErrorMsg.edit_Amount_Err ? "leftSecTransaction error" : "leftSecTransaction"}>
                                <label className="labelWithInfo">
                                  <span className="labelHeading">Amount</span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo amount">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </span>
                                  </span>
                                </label>
                                <div className="cmnFormField preField">
                                  <div className="unitAmount">$</div>
                                  <input
                                    type="number"
                                    placeholder="149"
                                    className="editableInput numberType cmnFieldStyle"
                                    defaultValue={downpay.amount}
                                    onChange={(e)=>changeDownpaymentAmount(e, downpay, i)}
                                  />
                                </div>
                              {downPaymentErrorMsg.edit_Amount_Err && <p className="errorMsg">{downPaymentErrorMsg.edit_Amount_Err}</p>}
                              </div>
                              <div className={downPaymentErrorMsg.edit_PayDate_Err ? "rightSecTransaction error" : "rightSecTransaction"}>
                                <label className="labelWithInfo paymentTime">
                                  <span className="labelHeading">
                                    I want to Pay Later
                                  </span>
                                  <label
                                    className={
                                      downpay.isPayNow === 1
                                        ? "toggleBtn"
                                        : "toggleBtn active"
                                    }
                                  >
                                    <input
                                      type="checkbox"
                                      name="check-communication"
                                      // defaultValue={downpay.isPayNow === 0 ? true : false}
                                      onChange={(e)=>changeDownpaymentIsPayNow(e, downpay, i)}
                                      value={downpay.isPayNow === 0 ? true : false}
                                    />
                                    <span className="toggler"></span>
                                  </label>
                                </label>
                                {downpay.isPayNow === 1 && (
                                  <div className="paymentNow display">
                                    <p>
                                      Payment date <span>Now</span>
                                    </p>
                                  </div>
                                )}
                                {downpay.isPayNow === 0 && (
                                  <div className="paymentNow">
                                    <input
                                      type="date"
                                      placeholder="mm-dd-yyyy"
                                      className="cmnFieldStyle"
                                      defaultValue={downpay.paymentDate}
                                      onChange={(e)=>changeDownpaymentDate(e, downpay, i)}
                                      min={todayPayDate().toISOString().split('T')[0]}
                                    />
                                  </div>
                                )}
                                {downPaymentErrorMsg.edit_PayDate_Err && <p className="errorMsg">{downPaymentErrorMsg.edit_PayDate_Err}</p>}
                              </div>
                            </div>
                            <div className="cmnFormRow gap">
                              <div className="leftSecTransaction">
                                <label className="labelWithInfo">
                                  <span className="labelHeading">Payment Mode</span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo paymentType">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </span>
                                  </span>
                                </label>
                                <div className="cmnFormField">
                                  <select
                                    className="selectBox"
                                    value={downpay.payment_type}
                                    onChange={(e)=>changeDownpaymentType(e, downpay, i)}
                                  >
                                    <option value="cash">Cash</option>
                                    <option value="online">Card</option>
                                  </select>
                                </div>
                              </div>
                              <div className="rightSecTransaction">
                                <label className="labelWithInfo">
                                  <span className="labelHeading">
                                    Payment Status
                                  </span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo paymentStatus">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </span>
                                  </span>
                                </label>
                                <select
                                  className="selectBox"
                                  value={downpay.payment_status}
                                  onChange={(e)=>changeDownpaymentStatus(e, downpay, i)}
                                >
                                  <option value="unpaid">Unpaid</option>
                                  <option value="paid">Paid</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>}
                </div>
              )}
            </div>
            <BillingOverview
              contactId={props.contactId}
              cardBankList={cardBankList}
              bankList={bankList}
              newPay={newPay}
              changeDefaultPay={changeDefaultPay}
              newPayMethod={newPayMethod}
              setNewPayMethod={setNewPayMethod}
              setCardBankList={setCardBankList}
              setBankList={setBankList}
              setNewPay={setNewPay}
            />
          </div>
          <div className="gridCol">
            <div className="cartProductInner payOverviewProduct">
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>Payment Overview</h5>
              </header>
              <div className="bodytransactionForm">
                <ul className="programInfosUl paymentOverviews">
                  <li>
                    <div className="labelSpan">Total item Price</div>
                    <div className="informationSpan">$ {totalAmt}</div>
                  </li>
                  <li>
                    <div className="labelSpan">Tax</div>
                    <div className="informationSpan">$ {totalTaxAmt}</div>
                  </li>
                </ul>
                <ul className="totalPaymentUl">
                  <li>Total</li>
                  <li>$ {(parseFloat(totalAmt) + parseFloat(totalTaxAmt)).toFixed(2)}</li>
                </ul>
              </div>
            </div>

            {downPayments.filter((dp, index) => index !== 0).map((downPay, i) => 
                <div className="currentPaymentOverview cartProductInner downPayLater outstandingOverviewProduct" key={i}>
                    <div className="outstandingDownpayment">
                      <div className="downpaymentsDetails">
                        <div className="cardImage">
                          {downPay.payment_type === "cash" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3276 19.4026C14.8044 19.3766 13.2913 19.1497 11.8276 18.7276C9.94165 18.1548 7.95855 17.9736 6.00006 18.1951C5.03973 18.3121 4.08781 18.4899 3.15006 18.7276C3.03936 18.7557 2.92372 18.7582 2.81194 18.7348C2.70016 18.7114 2.59519 18.6627 2.50506 18.5926C2.42115 18.5191 2.35472 18.4277 2.3106 18.3252C2.26649 18.2227 2.2458 18.1116 2.25006 18.0001V6.00012C2.24506 5.8288 2.29891 5.66093 2.40262 5.52447C2.50633 5.38801 2.65365 5.29118 2.82006 5.25012C3.91403 4.9761 5.02723 4.78555 6.15006 4.68012C8.16955 4.4894 10.2069 4.69059 12.1501 5.27262C13.9496 5.81318 15.8371 5.99912 17.7076 5.82012C18.7578 5.70816 19.7983 5.51763 20.8201 5.25012C20.9308 5.22203 21.0464 5.21959 21.1582 5.24299C21.27 5.26638 21.3749 5.315 21.4651 5.38512C21.5575 5.45806 21.6315 5.55174 21.681 5.65859C21.7305 5.76543 21.7542 5.88243 21.7501 6.00012V18.0001C21.7551 18.1715 21.7012 18.3393 21.5975 18.4758C21.4938 18.6122 21.3465 18.7091 21.1801 18.7501C20.1789 19.0059 19.1616 19.1938 18.1351 19.3126C17.5348 19.377 16.9313 19.407 16.3276 19.4026ZM7.67256 16.5976C9.19572 16.6236 10.7088 16.8506 12.1726 17.2726C14.0466 17.8403 16.0164 18.0215 17.9626 17.8051C18.7196 17.7162 19.4709 17.5835 20.2126 17.4076V6.94512C19.4327 7.11257 18.6439 7.23527 17.8501 7.31262C15.8201 7.5151 13.7702 7.32411 11.8126 6.75012C10.0256 6.21057 8.15113 6.02211 6.29256 6.19512C5.4372 6.2713 4.58784 6.40409 3.75006 6.59262V17.0926C4.44873 16.9417 5.15464 16.8266 5.86506 16.7476C6.46421 16.6632 7.06769 16.6131 7.67256 16.5976Z" fill="#305671"/>
<path d="M3.27733 9.75037H2.93983C2.75149 9.73526 2.5758 9.64962 2.44788 9.51057C2.31995 9.37152 2.24922 9.18931 2.24983 9.00037V6.00037C2.24484 5.82905 2.29868 5.66118 2.40239 5.52472C2.5061 5.38826 2.65342 5.29144 2.81983 5.25037C3.9138 4.97635 5.027 4.7858 6.14983 4.68037C6.32984 4.66264 6.5102 4.71056 6.65767 4.8153C6.80514 4.92005 6.90979 5.07456 6.95233 5.25037C7.00459 5.49689 7.02974 5.74839 7.02733 6.00037C7.02733 6.99494 6.63224 7.94876 5.92898 8.65202C5.22572 9.35529 4.27189 9.75037 3.27733 9.75037ZM3.74983 6.59287V8.19787C4.20872 8.09945 4.62535 7.85999 4.94139 7.51302C5.25743 7.16605 5.45706 6.72894 5.51233 6.26287C4.96483 6.34537 4.37983 6.45037 3.74983 6.59287Z" fill="#305671"/>
<path d="M20.76 9.75058C19.8942 9.75249 19.0545 9.45476 18.3832 8.90793C17.712 8.36111 17.2507 7.59887 17.0775 6.75058C17.0569 6.63936 17.0617 6.52491 17.0916 6.41581C17.1214 6.30671 17.1756 6.20578 17.25 6.12058C17.3119 6.03688 17.3905 5.96698 17.4809 5.91533C17.5713 5.86368 17.6715 5.83141 17.775 5.82058C18.8026 5.70532 19.8203 5.51481 20.82 5.25058C20.9307 5.22249 21.0463 5.22005 21.1581 5.24345C21.2699 5.26684 21.3749 5.31546 21.465 5.38558C21.5575 5.45852 21.6314 5.5522 21.6809 5.65905C21.7305 5.76589 21.7541 5.88289 21.75 6.00058V9.00058C21.7526 9.17925 21.6913 9.35298 21.5772 9.49048C21.4631 9.62799 21.3036 9.72022 21.1275 9.75058C21.0055 9.76564 20.882 9.76564 20.76 9.75058ZM18.855 7.20058C19.1715 7.70137 19.6728 8.0571 20.25 8.19058V6.94558C19.77 7.04308 19.305 7.13308 18.855 7.20058Z" fill="#305671"/>
<path d="M3 18.75C2.80109 18.75 2.61032 18.671 2.46967 18.5303C2.32902 18.3897 2.25 18.1989 2.25 18V15C2.25 14.8011 2.32902 14.6103 2.46967 14.4697C2.61032 14.329 2.80109 14.25 3 14.25C3.87533 14.2511 4.72268 14.5584 5.39524 15.1187C6.0678 15.6789 6.52319 16.4568 6.6825 17.3175C6.7015 17.419 6.69932 17.5234 6.67609 17.6241C6.65286 17.7248 6.60908 17.8195 6.5475 17.9025C6.48573 17.9839 6.40796 18.0519 6.31897 18.1022C6.22997 18.1525 6.13164 18.1841 6.03 18.195C5.06968 18.3119 4.11776 18.4898 3.18 18.7275C3.12113 18.7423 3.06069 18.7498 3 18.75ZM3.75 15.8775V17.055C4.155 16.9725 4.545 16.8975 4.9275 16.8375C4.65817 16.3907 4.24193 16.0513 3.75 15.8775Z" fill="#305671"/>
<path d="M18.0524 19.2975C17.879 19.3017 17.7095 19.2458 17.5728 19.1391C17.436 19.0324 17.3405 18.8817 17.3024 18.7125C17.2609 18.4774 17.2433 18.2387 17.2499 18C17.2499 17.0054 17.645 16.0516 18.3482 15.3483C19.0515 14.6451 20.0053 14.25 20.9999 14.25C21.1988 14.25 21.3896 14.329 21.5302 14.4697C21.6709 14.6103 21.7499 14.8011 21.7499 15V18C21.7549 18.1713 21.701 18.3392 21.5973 18.4757C21.4936 18.6121 21.3463 18.7089 21.1799 18.75C20.1787 19.0058 19.1614 19.1937 18.1349 19.3125L18.0524 19.2975ZM20.2499 15.8775C19.8566 16.012 19.5083 16.2527 19.2435 16.5731C18.9787 16.8935 18.8079 17.2809 18.7499 17.6925C19.2224 17.6175 19.7174 17.5275 20.2499 17.4075V15.8775Z" fill="#305671"/>
<path d="M13.125 15H10.5C10.3011 15 10.1103 14.921 9.96967 14.7803C9.82902 14.6397 9.75 14.4489 9.75 14.25C9.75 14.0511 9.82902 13.8603 9.96967 13.7197C10.1103 13.579 10.3011 13.5 10.5 13.5H13.125C13.2245 13.5 13.3198 13.4605 13.3902 13.3902C13.4605 13.3198 13.5 13.2245 13.5 13.125C13.5 13.0255 13.4605 12.9302 13.3902 12.8598C13.3198 12.7895 13.2245 12.75 13.125 12.75H10.875C10.3777 12.75 9.90081 12.5525 9.54917 12.2008C9.19754 11.8492 9 11.3723 9 10.875C9 10.3777 9.19754 9.90081 9.54917 9.54917C9.90081 9.19754 10.3777 9 10.875 9H13.5C13.6989 9 13.8897 9.07902 14.0303 9.21967C14.171 9.36032 14.25 9.55109 14.25 9.75C14.25 9.94891 14.171 10.1397 14.0303 10.2803C13.8897 10.421 13.6989 10.5 13.5 10.5H10.875C10.7755 10.5 10.6802 10.5395 10.6098 10.6098C10.5395 10.6802 10.5 10.7755 10.5 10.875C10.5 10.9745 10.5395 11.0698 10.6098 11.1402C10.6802 11.2105 10.7755 11.25 10.875 11.25H13.125C13.6223 11.25 14.0992 11.4475 14.4508 11.7992C14.8025 12.1508 15 12.6277 15 13.125C15 13.6223 14.8025 14.0992 14.4508 14.4508C14.0992 14.8025 13.6223 15 13.125 15Z" fill="#305671"/>
<path d="M12 10.5C11.8011 10.5 11.6103 10.421 11.4697 10.2803C11.329 10.1397 11.25 9.94891 11.25 9.75V9C11.25 8.80109 11.329 8.61032 11.4697 8.46967C11.6103 8.32902 11.8011 8.25 12 8.25C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9V9.75C12.75 9.94891 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5Z" fill="#305671"/>
<path d="M12 15.75C11.8011 15.75 11.6103 15.671 11.4697 15.5303C11.329 15.3897 11.25 15.1989 11.25 15V14.25C11.25 14.0511 11.329 13.8603 11.4697 13.7197C11.6103 13.579 11.8011 13.5 12 13.5C12.1989 13.5 12.3897 13.579 12.5303 13.7197C12.671 13.8603 12.75 14.0511 12.75 14.25V15C12.75 15.1989 12.671 15.3897 12.5303 15.5303C12.3897 15.671 12.1989 15.75 12 15.75Z" fill="#305671"/>
</svg> : <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V2H18V4Z" fill="#305671"/>
</svg>}
                        </div>
                        <div className="paymentModuleInfos">
                          <span className="accNumber">{downPay.title}</span>
                          <span className="accinfod">
                            <b>$ {downPay.amount}</b>
                          </span>
                        </div>
                      </div>
                      <div className="downpaymentsPayDetails">
                        <span className="payDue">Due</span>
                        <div className="payDate currentPayment">
                          <img src={payDate} alt="" /> {downPay.paymentDate}
                        </div>
                      </div>
                    </div>
                </div>
              )            
            }

            <div className="dottedBorder" style={{
              order: payLater && "3"
            }}></div>

            {parseFloat(outStanding.amount) > 0 && <div 
              className={payLater ? "cartProductInner outStandingProduct outstandingOverviewProduct" : "cartProductInner outStandingProduct"}
              style={{
                marginTop: payLater && "10px",
                order: payLater && "2"
              }}
              > {/**outstandingOverviewProduct */}
              <header className="informHeader d-flex f-align-center f-justify-between">
                <h5>Outstanding</h5>
                <h3>$ {parseFloat(outStanding.amount).toFixed(2)}</h3>
              </header>
              <div className="bodytransactionForm">
                <div className="cmnFormRow">
                  <div className="cmnFormCol">
                    <label className="labelWithInfo">
                      <span>Payment Mode</span>
                      <span className="infoSpan">
                        <img src={help} alt="Help" />
                        <span className="tooltiptextInfo">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </span>
                      </span>
                    </label>
                    <div className="cmnFormField">
                      <select className="selectBox cmnFieldStyle" onChange={(e)=>payDueMode(e)}>
                        <option value="online">Card</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>
                  </div>
                  <div className="cmnFormCol">
                    <label className="labelWithInfo paymentTime">
                      <span className="labelHeading">I want to Pay Later</span>
                      <label
                        className={payLater ? "toggleBtn active" : "toggleBtn"}
                      >
                        <input
                          type="checkbox"
                          name="check-communication"
                          defaultValue={false}
                          onChange={(e) => payDateChangeOverview(e)}
                        />
                        <span className="toggler"></span>
                      </label>
                    </label>
                    {!payLater && (
                      <div className="paymentNow display">
                        <p>
                          Payment date <span>Now</span>
                        </p>
                      </div>
                    )}
                    {payLater && (
                      <div className={downPaymentErrorMsg.outStandingDate_Err ? "paymentNow error" : "paymentNow"}>
                        <input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          className="cmnFieldStyle"
                          defaultValue={nextPayDate().toISOString().split('T')[0]}
                          min={todayPayDate().toISOString().split('T')[0]}
                          onChange={(e)=>changeOutstandingPayDate(e)}
                          ref={inputOutstandingDate}
                        />
                        {downPaymentErrorMsg.outStandingDate_Err && <p className="errorMsg">{downPaymentErrorMsg.outStandingDate_Err}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>}

            {downPayments.length > 0 && <div className="currentPaymentOverview cartProductInner" style={{
              marginTop: 0
            }}>
                <div className="outstandingDownpayment">
                  <div className="downpaymentsDetails">
                    <div className="cardImage">
                      {downPayments[0].payment_type === "cash" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3276 19.4026C14.8044 19.3766 13.2913 19.1497 11.8276 18.7276C9.94165 18.1548 7.95855 17.9736 6.00006 18.1951C5.03973 18.3121 4.08781 18.4899 3.15006 18.7276C3.03936 18.7557 2.92372 18.7582 2.81194 18.7348C2.70016 18.7114 2.59519 18.6627 2.50506 18.5926C2.42115 18.5191 2.35472 18.4277 2.3106 18.3252C2.26649 18.2227 2.2458 18.1116 2.25006 18.0001V6.00012C2.24506 5.8288 2.29891 5.66093 2.40262 5.52447C2.50633 5.38801 2.65365 5.29118 2.82006 5.25012C3.91403 4.9761 5.02723 4.78555 6.15006 4.68012C8.16955 4.4894 10.2069 4.69059 12.1501 5.27262C13.9496 5.81318 15.8371 5.99912 17.7076 5.82012C18.7578 5.70816 19.7983 5.51763 20.8201 5.25012C20.9308 5.22203 21.0464 5.21959 21.1582 5.24299C21.27 5.26638 21.3749 5.315 21.4651 5.38512C21.5575 5.45806 21.6315 5.55174 21.681 5.65859C21.7305 5.76543 21.7542 5.88243 21.7501 6.00012V18.0001C21.7551 18.1715 21.7012 18.3393 21.5975 18.4758C21.4938 18.6122 21.3465 18.7091 21.1801 18.7501C20.1789 19.0059 19.1616 19.1938 18.1351 19.3126C17.5348 19.377 16.9313 19.407 16.3276 19.4026ZM7.67256 16.5976C9.19572 16.6236 10.7088 16.8506 12.1726 17.2726C14.0466 17.8403 16.0164 18.0215 17.9626 17.8051C18.7196 17.7162 19.4709 17.5835 20.2126 17.4076V6.94512C19.4327 7.11257 18.6439 7.23527 17.8501 7.31262C15.8201 7.5151 13.7702 7.32411 11.8126 6.75012C10.0256 6.21057 8.15113 6.02211 6.29256 6.19512C5.4372 6.2713 4.58784 6.40409 3.75006 6.59262V17.0926C4.44873 16.9417 5.15464 16.8266 5.86506 16.7476C6.46421 16.6632 7.06769 16.6131 7.67256 16.5976Z" fill="#305671"/>
<path d="M3.27733 9.75037H2.93983C2.75149 9.73526 2.5758 9.64962 2.44788 9.51057C2.31995 9.37152 2.24922 9.18931 2.24983 9.00037V6.00037C2.24484 5.82905 2.29868 5.66118 2.40239 5.52472C2.5061 5.38826 2.65342 5.29144 2.81983 5.25037C3.9138 4.97635 5.027 4.7858 6.14983 4.68037C6.32984 4.66264 6.5102 4.71056 6.65767 4.8153C6.80514 4.92005 6.90979 5.07456 6.95233 5.25037C7.00459 5.49689 7.02974 5.74839 7.02733 6.00037C7.02733 6.99494 6.63224 7.94876 5.92898 8.65202C5.22572 9.35529 4.27189 9.75037 3.27733 9.75037ZM3.74983 6.59287V8.19787C4.20872 8.09945 4.62535 7.85999 4.94139 7.51302C5.25743 7.16605 5.45706 6.72894 5.51233 6.26287C4.96483 6.34537 4.37983 6.45037 3.74983 6.59287Z" fill="#305671"/>
<path d="M20.76 9.75058C19.8942 9.75249 19.0545 9.45476 18.3832 8.90793C17.712 8.36111 17.2507 7.59887 17.0775 6.75058C17.0569 6.63936 17.0617 6.52491 17.0916 6.41581C17.1214 6.30671 17.1756 6.20578 17.25 6.12058C17.3119 6.03688 17.3905 5.96698 17.4809 5.91533C17.5713 5.86368 17.6715 5.83141 17.775 5.82058C18.8026 5.70532 19.8203 5.51481 20.82 5.25058C20.9307 5.22249 21.0463 5.22005 21.1581 5.24345C21.2699 5.26684 21.3749 5.31546 21.465 5.38558C21.5575 5.45852 21.6314 5.5522 21.6809 5.65905C21.7305 5.76589 21.7541 5.88289 21.75 6.00058V9.00058C21.7526 9.17925 21.6913 9.35298 21.5772 9.49048C21.4631 9.62799 21.3036 9.72022 21.1275 9.75058C21.0055 9.76564 20.882 9.76564 20.76 9.75058ZM18.855 7.20058C19.1715 7.70137 19.6728 8.0571 20.25 8.19058V6.94558C19.77 7.04308 19.305 7.13308 18.855 7.20058Z" fill="#305671"/>
<path d="M3 18.75C2.80109 18.75 2.61032 18.671 2.46967 18.5303C2.32902 18.3897 2.25 18.1989 2.25 18V15C2.25 14.8011 2.32902 14.6103 2.46967 14.4697C2.61032 14.329 2.80109 14.25 3 14.25C3.87533 14.2511 4.72268 14.5584 5.39524 15.1187C6.0678 15.6789 6.52319 16.4568 6.6825 17.3175C6.7015 17.419 6.69932 17.5234 6.67609 17.6241C6.65286 17.7248 6.60908 17.8195 6.5475 17.9025C6.48573 17.9839 6.40796 18.0519 6.31897 18.1022C6.22997 18.1525 6.13164 18.1841 6.03 18.195C5.06968 18.3119 4.11776 18.4898 3.18 18.7275C3.12113 18.7423 3.06069 18.7498 3 18.75ZM3.75 15.8775V17.055C4.155 16.9725 4.545 16.8975 4.9275 16.8375C4.65817 16.3907 4.24193 16.0513 3.75 15.8775Z" fill="#305671"/>
<path d="M18.0524 19.2975C17.879 19.3017 17.7095 19.2458 17.5728 19.1391C17.436 19.0324 17.3405 18.8817 17.3024 18.7125C17.2609 18.4774 17.2433 18.2387 17.2499 18C17.2499 17.0054 17.645 16.0516 18.3482 15.3483C19.0515 14.6451 20.0053 14.25 20.9999 14.25C21.1988 14.25 21.3896 14.329 21.5302 14.4697C21.6709 14.6103 21.7499 14.8011 21.7499 15V18C21.7549 18.1713 21.701 18.3392 21.5973 18.4757C21.4936 18.6121 21.3463 18.7089 21.1799 18.75C20.1787 19.0058 19.1614 19.1937 18.1349 19.3125L18.0524 19.2975ZM20.2499 15.8775C19.8566 16.012 19.5083 16.2527 19.2435 16.5731C18.9787 16.8935 18.8079 17.2809 18.7499 17.6925C19.2224 17.6175 19.7174 17.5275 20.2499 17.4075V15.8775Z" fill="#305671"/>
<path d="M13.125 15H10.5C10.3011 15 10.1103 14.921 9.96967 14.7803C9.82902 14.6397 9.75 14.4489 9.75 14.25C9.75 14.0511 9.82902 13.8603 9.96967 13.7197C10.1103 13.579 10.3011 13.5 10.5 13.5H13.125C13.2245 13.5 13.3198 13.4605 13.3902 13.3902C13.4605 13.3198 13.5 13.2245 13.5 13.125C13.5 13.0255 13.4605 12.9302 13.3902 12.8598C13.3198 12.7895 13.2245 12.75 13.125 12.75H10.875C10.3777 12.75 9.90081 12.5525 9.54917 12.2008C9.19754 11.8492 9 11.3723 9 10.875C9 10.3777 9.19754 9.90081 9.54917 9.54917C9.90081 9.19754 10.3777 9 10.875 9H13.5C13.6989 9 13.8897 9.07902 14.0303 9.21967C14.171 9.36032 14.25 9.55109 14.25 9.75C14.25 9.94891 14.171 10.1397 14.0303 10.2803C13.8897 10.421 13.6989 10.5 13.5 10.5H10.875C10.7755 10.5 10.6802 10.5395 10.6098 10.6098C10.5395 10.6802 10.5 10.7755 10.5 10.875C10.5 10.9745 10.5395 11.0698 10.6098 11.1402C10.6802 11.2105 10.7755 11.25 10.875 11.25H13.125C13.6223 11.25 14.0992 11.4475 14.4508 11.7992C14.8025 12.1508 15 12.6277 15 13.125C15 13.6223 14.8025 14.0992 14.4508 14.4508C14.0992 14.8025 13.6223 15 13.125 15Z" fill="#305671"/>
<path d="M12 10.5C11.8011 10.5 11.6103 10.421 11.4697 10.2803C11.329 10.1397 11.25 9.94891 11.25 9.75V9C11.25 8.80109 11.329 8.61032 11.4697 8.46967C11.6103 8.32902 11.8011 8.25 12 8.25C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9V9.75C12.75 9.94891 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5Z" fill="#305671"/>
<path d="M12 15.75C11.8011 15.75 11.6103 15.671 11.4697 15.5303C11.329 15.3897 11.25 15.1989 11.25 15V14.25C11.25 14.0511 11.329 13.8603 11.4697 13.7197C11.6103 13.579 11.8011 13.5 12 13.5C12.1989 13.5 12.3897 13.579 12.5303 13.7197C12.671 13.8603 12.75 14.0511 12.75 14.25V15C12.75 15.1989 12.671 15.3897 12.5303 15.5303C12.3897 15.671 12.1989 15.75 12 15.75Z" fill="#305671"/>
</svg> : <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V2H18V4Z" fill="#305671"/>
</svg>}
                    </div>
                    <div className="paymentModuleInfos">
                      <span className="accNumber">{downPayments[0].title}</span>
                      <span className="accinfod">
                        <b>$ {downPayments[0].amount}</b>
                      </span>
                    </div>
                  </div>
                  <div className="downpaymentsPayDetails">
                    <div className="payDate currentPayment">
                      <img src={payDate} alt="" /> {downPayments[0].isPayNow === 1 ? "Now" : downPayments[0].paymentDate}
                    </div>
                  </div>
                  <label className="receivedCash">
                    <div className="customCheckbox">
                      <input 
                        type="checkbox" 
                        name="" 
                        id="" 
                        onChange={(e)=>markDownPaid(e)}
                        checked={downPayments && downPayments[0].payment_status === "paid" ? true : false}
                      />
                      {console.log(downPayments && downPayments[0].payment_status === "paid" ? true : false)}
                      <span></span>
                    </div>
                    I have received the amount by Cash
                  </label>
                </div>
            </div>}

            <div className="totalCartValue cartProductInner f-row">
              <div className="billingAmt">
                <p>Billing Total</p>
                {/* downPayments[0] */}
                {/* <h4>$ {downPayments.length > 0 ? downPayments[0].amount : (parseFloat(totalAmt)+parseFloat(totalTaxAmt)).toFixed(2)}</h4> */}
                <h4>{billingTotalAmt()}</h4>
              </div>
              <div className="buyBtns">
                <button 
                  className="saveNnewBtn" 
                  onClick={(e) => billPayment(e)}
                  disabled={hasError === false ? false : true}
                >
                  Bill Now <img src={aaroww} alt="" />
                </button>
              </div>
            </div>
          </div>
        </form>
      }

      {productPaymentFailed && (
        <div className="modalBackdrop modalProductStatus">
          <div className="slickModalBody paymentFailed">
            <div className="slickModalHeader">
              <div className="circleForIcon">
                <img src={paymentFail} alt="" />
              </div>
              <h3 className="courseModalHeading">Payment Failed !</h3>
            </div>

            <div className="payModalDetails">
              <img src={cardFail} alt="" />
              <p>
                {paymentFailed}
              </p>
            </div>

            <div className="buyBtns failedPayment">
              <button
                onClick={() => openSuccessMessage()}
                className="saveNnewBtn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {props.successProductPayment && (
        <>
          <div className="posSellingForm contractOverview">
            <div className="successHeader">
              <div className="circleForIcon">
                <img src={paySuccess} alt="" />
              </div>
              <h3 className="paySuccessHeading">{paymentSuccessMessage}</h3>
            </div>
            <div className="dottedBorder"></div>

            <ul className="paymentUlHeader">
              <li className="paymentModeHeaderLi">Payment Mode</li>
              {/* <li className="paymentIdHeaderLi">Transaction ID</li> */}
              <li className="paymentAmtHeaderLi">Amount</li>
            </ul>

            <ul className="paymentUlInfo">
              <li className="paymentModeLi">
                <img src={cashSuccess} alt="" />
                <p>Cash</p>
              </li>
              {/* <li className="paymentIdLi">
                <p>dfg41456df1567sdtfg45a</p>
              </li> */}
              <li className="paymentAmtLi">
                <p>$ 200.00</p>
                <img src={smallTick} alt="" />
              </li>
            </ul>

            <ul className="paymentUlInfo">
              <li className="paymentModeLi">
                <img src={paidCard} alt="" />
                <p>Card</p>
              </li>
              {/* <li className="paymentIdLi">
                <p>dfg41456df1567sdtfg45a</p>
              </li> */}
              <li className="paymentAmtLi">
                <p>$ 420.00</p>
                <img src={smallTick} alt="" />
              </li>
            </ul>

            <ul className="totalPaymentUl">
              <li>
                <p>Amount Paid</p>
              </li>
              <li>
                <p>$ 620.00</p>
              </li>
            </ul>

            <div className="dottedBorder"></div>

            <div className="successPageBtn">
              <button 
                className="saveNnewBtn"
                onClick={(e) => {
                    resetProductForm(e)
                    props.backToTransList()
                  }
                }
              >
                Go to Transaction List <img src={aaroww} alt="" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPayment;
