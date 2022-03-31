import React, { useEffect, useState, useRef, createRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import help from "../../../../../assets/images/help.svg";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import cardFail from "../../../../../assets/images/cardFailed.svg";
import payDate from "../../../../../assets/images/payDate.svg";
import cashSuccess from "../../../../../assets/images/cashSuccess.svg";
import paidCard from "../../../../../assets/images/paidCrad.svg";
import smallTick from "../../../../../assets/images/smallTick.svg";
import paymentFail from "../../../../../assets/images/paymentFailed.svg";
import paySuccess from "../../../../../assets/images/paySuccess.png";
import Loader from "../../../../shared/Loader";
import { ProductServices } from "../../../../../services/setup/ProductServices";
import BillingOverview from "./BillingOverview";

const ProductPayment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [productPayload, setProductPayload] = useState(null);
  const [downPayments, setDownPayments] = useState([]);
  
  const [downPaymentActive, setDownPaymentActive] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [newPay, setNewPay] = useState({
    type: "card",
    billingId: null,
  });
  const [productPaymentFailed, setProductPaymentFailed] = useState(false);
  const downPaymentList = useRef(null);
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalTaxAmt, setTotalTaxAmt] = useState(0);
  const [outStanding, setOutstanding] = useState({
    amount: 0,
    payment_type: "cash",
    title: "",
    type: "outstanding",
    paymentDate: new Date(new Date()).toISOString().split("T")[0],
    isPayNow: 1,
    payment_status: "unpaid",
  });
  const [cardBankList, setCardBankList] = useState([]);
  // const [bankList, setBankList] = useState([]);
  // const [payments, setPayments] = useState([]);
  const [newCard, setNewCard] = useState(null);
  const [newBank, setNewBank] = useState(null);
  const [newPayMethod, setNewPayMethod] = useState(null);
  const [modifiedCart, setModifiedCart] = useState(null);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(null);
  const [payMentInfo, setPaymentInfo] = useState(null);
  const [noBankCard, setNoBankCard] = useState(false)
  const downpaymentsContainer = useRef(null);
  const createDownpayAmount = useRef(null);
  const datePayment = useRef(null);
  const inputOutstandingDate = useRef(null);

  const [paymentFailed, setPaymentFailed] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
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
    edit_PayStatus_Err: "",
    payment_not_received: "",
  });
  const [productBuy, setProductBuy] = useState([])

  useEffect(() => {
   
    console.log("totalAmt+totalTaxAmt", parseFloat(totalAmt)+parseFloat(totalTaxAmt), outStanding);

    getTotalCart();
  }, []);


  const getTotalCart = () => {
    if (props.cartState.length > 0) {
      const totalPlaceholder = 0;
      const totalTaxPlaceholder = 0;
      let modifiedCartState = [...props.cartState];

      const sumAmt = modifiedCartState.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.price * currentValue.qnty,
        totalPlaceholder
      );
      console.log("currentTax.tax", props.cartState);
      const taxtAmt = modifiedCartState.filter((cartItem, i) => cartItem.tax === true).reduce(
        (prevTax, currentTax) =>
          parseFloat(prevTax) + (currentTax.price * currentTax.qnty * (props.salesTax / 100)),
        totalTaxPlaceholder
      );

      console.log("TAxED AMOUNT", modifiedCartState, taxtAmt, modifiedCartState.filter((cartItem, i) => cartItem.tax === 1));

      setTotalAmt(parseFloat(sumAmt));
      setTotalTaxAmt(parseFloat(taxtAmt));
      setOutstanding({
        ...outStanding,
        amount: (parseFloat(sumAmt) + parseFloat(taxtAmt)),
        title: "Outstanding"
      });
      
      setModifiedCart(modifiedCartState);
    } else {
      setTotalAmt(0.0);
      setTotalTaxAmt(0.0);
    }
  };

  
  const payDateChangeOverview = (e) => {
    console.log(outStanding);
    try {
      setIsLoader(true);

      if (e.target.checked) {
        console.log("checked");
        setOutstanding({
          ...outStanding,
          isPayNow: 0,
          paymentDate: tomorrowPayDate().toISOString().split("T")[0]
        })
      } else {
        setOutstanding({
          ...outStanding,
          isPayNow: 1,
          paymentDate: todayPayDate().toISOString().split("T")[0]
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  const billPayment = async (e) => {
    e.preventDefault();
    let cartItems = [...modifiedCart];

    const paymentsArray = [...downPayments];

    let outStandingPlaceholder = outStanding;
        outStandingPlaceholder.title = "Outstanding";
        if(parseFloat(outStandingPlaceholder.amount) !== 0) {
          outStandingPlaceholder.amount = parseFloat(parseFloat(outStandingPlaceholder.amount))
          paymentsArray.push(outStandingPlaceholder);
          console.log("paymentsArray", paymentsArray);
        }
        // console.log(outStandingPlaceholder);

        cartItems.forEach((cartItem, index) => {
          const cartItemss = {...cartItem}
          delete cartItemss.image;
          delete cartItemss.name;
          delete cartItemss.tax;
          return cartItemss;
        });

        console.log("cartItems from bill now", cartItems);
        
    const productPayload = {
      contact: props.contactId,
      default_transaction: paymentsArray.filter(py => py.payment_type === "online").length === 0 ? "cash" : newPay && newPay.type,
      billingId: newPay.billingId !== null && newPay.billingId,
      items: cartItems,
      payments: paymentsArray,
    };
    
        console.log("PAYLOAD:::", productPayload, newPay, newPay.type);
    
    const  filteredPay = [...downPayments].filter((payNow, i)=> payNow.isPayNow === 1 && payNow.payment_type === "cash" && payNow.paymentConfirmation === false)
    const  titleDpConfirmation = [...downPayments].filter((titleNow, i) => titleNow.title === "" || titleNow.title.trim() === "")
    const  amountDpConfirmation = [...downPayments].filter((titleNow, i) => titleNow.amount === "" || titleNow.amount === "0" || parseFloat(titleNow.amount) === 0 || isNaN(titleNow.amount))

    // console.log("::::amountDpConfirmation >>>>>>>", [...downPayments], [...downPayments].map((titleNow, i) => (titleNow?.amount === "", titleNow.amount === "0", titleNow.amount === 0)))

    var titleCon = [],amountCon = [];
    for(var i =0; i<downPayments.length; ++i){
      // console.log("downPayments["+i+"].amount :::::::::: ", downPayments[i].amount, isNaN(downPayments[i].amount));
      if(downPayments[i].title.trim() === "")
        titleCon = [...titleCon,i]
      if((typeof downPayments[i]?.amount) === "string" && downPayments[i]?.amount?.trim() === "" || downPayments[i].amount === 0 || downPayments[i].amount === "0" || isNaN(downPayments[i].amount ))
        amountCon = [...amountCon,i]
    }

    console.log("TESTING AMOUNT 0", downPayments);

    const functionCallBillPay = async (hasOnlinePay) => {
      try {
        setIsLoader(true);
        let productBuy = await ProductServices.buyProduct(productPayload);
    
        if (productBuy.status === "success") {
            let payIfo = [];
            let cashAmount = 0;
            let onlineAmount = 0;
            let transIdArr = []
    
            setPaymentSuccessMessage("Product purchase transaction successfull.");
            payIfo.onlinePayment = hasOnlinePay && productPayload.payments.filter(
                (payment) => payment.payment_type === "online" && payment.isPayNow === 1
            );
            payIfo.cashPayment = productPayload.payments.filter(
                (payment) => payment.payment_type === "cash" && payment.isPayNow === 1
            );
    
            payIfo.onlineAmount = hasOnlinePay && productPayload.payments
                .filter((payment) => payment.payment_type === "online" && payment.isPayNow === 1)
                .reduce(
                    (previousValue, currentValue) =>
                        parseFloat(previousValue) + parseFloat(currentValue.amount),
                    onlineAmount
                );
            payIfo.cashAmount = productPayload.payments
                .filter((payment) => payment.payment_type === "cash" && payment.isPayNow === 1)
                .reduce(
                    (previousValue, currentValue) =>
                        parseFloat(previousValue) + parseFloat(currentValue.amount),
                    cashAmount
                );
    
            setPaymentInfo(payIfo);
    
            setProductBuy(productBuy)
    
            setPaymentFailed(null);
            setProductPaymentFailed(false);
            openSuccessMessage();
    
            setHasError(false);
            setDownPaymentErrorMsg({
                ...downPaymentErrorMsg,
                payment_not_received: ""
            })
        } else {
            setPaymentFailed(productBuy.description);
            setProductPaymentFailed(true);
        }
      } catch (error) {
        setPaymentFailed(error);
        setProductPaymentFailed(true);
      } finally {
        setErrorMsg("")
        setIsLoader(false);
      }
    }

    if (!hasError) {
      if(filteredPay.length === 0 && titleDpConfirmation.length === 0 && amountDpConfirmation.length === 0) {
        if(paymentsArray.filter(py => py.payment_type === "online").length !== 0) {
          if(productPayload.billingId !== "") {
            functionCallBillPay(true)
          }
          else {
            setErrorMsg("Please add some payment methods (card or bank) before making online payment!")
            setNoBankCard(true)
            setTimeout(() => {
              setErrorMsg("")
              setNoBankCard(false)
            }, 5000);
          }
        }
        if(paymentsArray.filter(py => py.payment_type === "online").length === 0) {
          functionCallBillPay(false)
        }
      }
      else {
        console.log("amountDpConfirmation", amountDpConfirmation);
        setHasError(true);
        if(filteredPay.length > 0){
          setDownPaymentErrorMsg({
            ...downPaymentErrorMsg,
            payment_not_received: "Please confirm the payment has been received"
          })
        }
        if(titleDpConfirmation.length > 0) {
          setDownPaymentErrorMsg({
            ...downPaymentErrorMsg,
            downpayment_no_title: "Please give downpayment Title(s)"
          })
        }
        if(amountDpConfirmation.length > 0) {
          setDownPaymentErrorMsg({
            ...downPaymentErrorMsg,
            edit_Amount_Err: {msg : "Please enter some downpayment value", key :  amountCon}
          })
        }
      }
    }
  };

  const openSuccessMessage = () => {
    setProductPaymentFailed(false);
    props.setSuccessProductPaymentFn(true);
  };

  const resetProductForm = (e) => {
    e.preventDefault();
    props.setSuccessProductPaymentFn(false);
    props.setProductTransactionPayment(false);
    props.chooseTransctionTypePOS();
    props.setCartState([]);
    setModifiedCart([]);
  };

  // MAKE DOWNPAYMENTS ACTIVE
  const checkAndSetDownPayments = (e) => {
    let errStat = downPaymentErrorMsg;

    if (e.target.checked) {
      setDownPaymentActive(true);
      setDownPayments(downpayments=>[...downpayments, {
        title: "Downpayment 1",
        amount: "",
        type: "downpayment",
        isPayNow: 1,
        paymentDate: todayPayDate().toISOString().split("T")[0],
        payment_type: "cash",
        payment_status: "paid",
        paymentConfirmation: false,
        dpId: [...downpayments].filter(dp=>dp.dpId === Math.floor(100000 + Math.random() * 900000)).length === 0 ? Math.floor(100000 + Math.random() * 900000) : Math.floor(100000 + Math.random() * 900000)
      }])
      
      setHasError(true);

      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title: "Title cannot be blank",
        amount_Err: "Amount cannot be nothing",
      });
    } else {
      setDownPaymentActive(false);
      
      setDownPayments([]);

      setOutstanding({
        ...outStanding,
        amount: parseFloat(totalAmt) + parseFloat(totalTaxAmt),
        payment_type: "online",
      });
      
      setHasError(false);

      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        title: "",
        amount_Err: "",
      });
      setDownPaymentErrorMsg(errStat);
    }
  };
  // MAKE DOWNPAYMENTS ACTIVE
  
  // Add new downpayments
  const addNewDownPayment = (e) => {
    e.preventDefault()
    const totalPlaceholder = 0;
    const downpaymentsPlaceholder = [...downPayments]

    const totalDownpaymentsAmt = downPayments.reduce(
        (previousValue, currentValue) =>
          parseFloat(previousValue) + parseFloat(currentValue.amount),
        totalPlaceholder
      );

    try {
      if ((totalDownpaymentsAmt !== 0 && !isNaN(totalDownpaymentsAmt)) && outStanding.amount !== 0) {
        downpaymentsPlaceholder.unshift({
          title: `Downpayment ${parseInt([...downPayments].length) + 1}`,
          amount: "",
          type: "downpayment",
          isPayNow: 1,
          paymentDate: todayPayDate().toISOString().split("T")[0],
          payment_type: "cash",
          payment_status: "paid",
          paymentConfirmation: false,
          dpId: [...downPayments].filter(dp=>dp.dpId === Math.floor(100000 + Math.random() * 900000)).length === 0 ? Math.floor(100000 + Math.random() * 900000) : Math.floor(100000 + Math.random() * 900000)
        })

        setDownPayments(downpaymentsPlaceholder)
      //     setDownPayments(downpayments=>[
      //       ...downpayments,
      //   {
      //     title: `Downpayment ${parseInt([...downpayments].length) + 1}`,
      //     amount: "",
      //     type: "downpayment",
      //     isPayNow: 1,
      //     paymentDate: todayPayDate().toISOString().split("T")[0],
      //     payment_type: "cash",
      //     payment_status: "paid",
      //     paymentConfirmation: false,
      //     dpId: [...downpayments].filter(dp=>dp.dpId === Math.floor(100000 + Math.random() * 900000)).length === 0 ? Math.floor(100000 + Math.random() * 900000) : Math.floor(100000 + Math.random() * 900000)
      //   },
      // ])
      }
    } catch(error) {
      console.log(error);
    } finally{
      
    }
  }
  // Add new downpayments

  //   delete downpayment
  const deleteNewDownPayment = (e, downpay, i) => {
    e.preventDefault();
    try {
      setDownPayments((downpayment) =>
        downpayment.filter((dn) => dn.dpId !== i)
      );
      setOutstanding({
        ...outStanding,
        amount: outStanding.amount + downpay.amount,
      });
      console.log("outStanding + downpay.amount", outStanding + downpay.amount);
    } catch (error) {
    }
  };
  //   delete downpayment

  const nextPayDate = () => {
    let today = new Date();
    let tentativeDate = new Date(today);
    tentativeDate.setMonth(tentativeDate.getMonth() + 1);
    return tentativeDate;
  };

  const todayPayDate = () => {
    let today = new Date();
    return today;
  };

  const tomorrowPayDate = () => {
    let today = new Date();
    let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

    return tomorrow;
  };

  const payDueMode = (e) => {
    try {
      setIsLoader(true);

      if (e.target.value === "online") {
        setOutstanding({
          ...outStanding,
          payment_type: "online",
        });
      }
      if (e.target.value === "cash") {
        setOutstanding({
          ...outStanding,
          payment_type: "cash",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };

  const changeOutstandingPayDate = (e) => {
    let outStandingDateSelected = e.target.value;

    if (e.target.value !== "") {
      try {
        setIsLoader(true);
        setOutstanding({
          ...outStanding,
          paymentDate: outStandingDateSelected,
        });
      } catch (error) {
        //  //  console.log(error);
        setHasError(true);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          outStandingDate_Err: "Problem with outstanding payment date",
        });
      } finally {
        setIsLoader(false);
        setHasError(false);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          outStandingDate_Err: "",
        });
      }
    } else {
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        outStandingDate_Err: "Outstanding payment date cannot be blank",
      });
    }
  };

  const billingTotalAmt = () => {
    let totalPlaceholder= 0.00;

    const totalDownpaymentsAmt = downPayments
    .filter((dpTarget, index) => dpTarget.isPayNow === 1)
    .reduce(
      (previousValue, currentValue) =>
        parseFloat(previousValue) + (currentValue.amount === "" || parseFloat(currentValue.amount) === 0 || currentValue.amount === "0" ? 0 : parseFloat(currentValue.amount)),
      totalPlaceholder
    )

    if (downPayments.length === 0) {
      if (outStanding.isPayNow === 0) {
        return 0.00;
      }
      if (outStanding.isPayNow === 1) {
        return parseFloat(outStanding.amount);
      }
    }
    if (downPayments.length > 0) {
      if (outStanding.amount > 0.00) {
        if (outStanding.isPayNow === 0) {
          return totalDownpaymentsAmt;
        }
        if (outStanding.isPayNow === 1) {
          return (parseFloat(outStanding.amount) + totalDownpaymentsAmt)
        }
      }
      if (outStanding.amount === 0.00) {
        return totalDownpaymentsAmt
      }
    }
  };

  // mark first downpayment PAID
  const markDownPaid = (e, downPay, i) => {
    const downPaymentsPlaceholder = [...downPayments];

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    try {
      setIsLoader(true);

      if (e.target.checked) {        
        downPaymentsPlaceholder.filter((dpP) => dpP.dpId === i)[0].paymentDate = today;
        downPaymentsPlaceholder.filter((dpP) => dpP.dpId === i)[0].payment_status = "paid";
        downPaymentsPlaceholder.filter((dpP) => dpP.dpId === i)[0].paymentConfirmation = true;

        setDownPayments(downPaymentsPlaceholder)
        setHasError(false)
        setDownPaymentErrorMsg({
          ...downPaymentActive,
          payment_not_received: ""
        })
      }
       else {
        downPaymentsPlaceholder.filter((dpP) => dpP.dpId === i)[0].paymentConfirmation = false;
        setDownPayments(downPaymentsPlaceholder)
      }
    } catch (error) {
      console.log(error);
    } finally {      
      setIsLoader(false);
    }
  };
  // mark first downpayment PAID

  const changeDefaultPayFn = (data) => {
    console.log('data came from biling overviwe', data);
    setNewPay({
      type: data.type,
      billingId: data.billingId
    });
  };

  // Edit created Downpayments
  const changeDownpaymentTitle = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];

    if (e.target.value.trim().length > 0) {
      downPaymentsPlaceholder[i].title = e.target.value;

      setDownPayments(downPaymentsPlaceholder);
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_Title_Err: "",
        downpayment_no_title: ""
      });
    } else {
      downPaymentsPlaceholder[i].title = e.target.value;

      setDownPayments(downPaymentsPlaceholder);
      
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_Title_Err: "Title cannot be blank",
      });
    }
  };
  const changeDownpaymentAmount = (e, downpay, i) => {
    console.log("i : index ::: ", i,typeof e.target.value);
    const downPaymentsPlaceholder = [...downPayments];
    const totalPlaceholder = 0;

    const totalDownpaymentsAmt = downPayments
      .filter((dpTarget, index) => index !== i)
      .reduce(
        (previousValue, currentValue) =>
          parseFloat(previousValue) + (currentValue.amount === "" || parseFloat(currentValue.amount) === 0 || currentValue.amount === "0" || isNaN(currentValue.amount) ? 0 : parseFloat(currentValue.amount)),
        totalPlaceholder
      )
      // .reduce(
      //   (previousValue, currentValue) =>
      //     parseFloat(previousValue) + parseFloat(currentValue.amount),
      //   totalPlaceholder
      // );
      
    try {
      console.log(parseFloat(e.target.value), downPayments, parseFloat(totalDownpaymentsAmt) , parseFloat(totalAmt) + parseFloat(totalTaxAmt));

      // if modified amount is 0 or nothing
      if (e.target.value.trim() === "" || parseFloat(e.target.value) === 0 || e.target.value === "0") {
        // e.target.value = ""
      console.log("e value", e.target.value);

        downPaymentsPlaceholder[i].amount = parseFloat(e.target.value);
        
        setDownPayments(downPaymentsPlaceholder);

        setHasError(true);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: {msg : "Downpayment amounts can't be empty or 0", key : [i]},
        });
        console.log("downPaymentsPlaceholder:::", downPaymentsPlaceholder);
      }
      // if modified amount is 0 or nothing

      // if amount in summation with other downpayments and outstanding is more than total
      if (
        parseFloat(e.target.value) + totalDownpaymentsAmt + parseFloat(outStanding.amount) >
        parseFloat(totalAmt) + parseFloat(totalTaxAmt)
      ) {
        // downPaymentsPlaceholder[i].amount = parseFloat(e.target.value);

        console.log("e value", e.target.value);
        
        setHasError(true);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: {msg : "Downpayments amount exceeding total; please modify amount", key : [i]}
        });

        setTimeout(() => {
          setHasError(false);
          setDownPaymentErrorMsg({
            ...downPaymentErrorMsg,
            edit_Amount_Err: {msg : "", key : null}
          });
        }, 5000);
      }
      // if amount in summation with other downpayments and outstanding is more than total

      // if amount in summation with other downpayments and outstanding is less than total
      if (
        parseFloat(e.target.value) + parseFloat(totalDownpaymentsAmt) <
        parseFloat(totalAmt) + parseFloat(totalTaxAmt)
      ) {
        console.log("e value", e.target.value);
        downPaymentsPlaceholder[i].amount = parseFloat(e.target.value);

        setDownPayments(downPaymentsPlaceholder);

        setOutstanding({
          ...outStanding,
          amount:
            (parseFloat(totalAmt) + parseFloat(totalTaxAmt)) -
            (totalDownpaymentsAmt + parseFloat(e.target.value)),
        });

        setHasError(false);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: {msg : "", key : null}
        });
      }
      // if amount in summation with other downpayments and outstanding is less than total


      // if amount in summation with other downpayments and outstanding is equalling total
      if (
        (parseFloat(e.target.value) + totalDownpaymentsAmt) ===
        parseFloat(totalAmt) + parseFloat(totalTaxAmt)
      ) {
        console.log("e value", e.target.value);
        downPaymentsPlaceholder[i].amount = parseFloat(e.target.value);

        setDownPayments(downPaymentsPlaceholder);

        setOutstanding({
          ...outStanding,
          amount: 0,
        });

        setHasError(false);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_Amount_Err: {msg : "", key : null},
        });
      }
      // if amount in summation with other downpayments and outstanding is equalling total
    } catch (err) {
      //  //  console.log(err);
    } finally {
      
    }
  };
  useEffect(()=>{
    console.log("downPayments", downPayments);
  },[downPayments])
  const changeDownpaymentIsPayNow = (e, downpay, i) => {
    const downPaymentsPlaceholder = [...downPayments];

    console.log(e, downpay, i, e.target.checked);

    try {
      setIsLoader(true);
      
      if (e.target.checked) {
        downPaymentsPlaceholder[i].isPayNow = 0;
        downPaymentsPlaceholder[i].paymentDate = tomorrowPayDate().toISOString().split("T")[0];
        downPaymentsPlaceholder[i].payment_status = "unpaid"
        
        if(downPaymentsPlaceholder[i].paymentDate === "") {
          setHasError(true);
          setDownPaymentErrorMsg({
            ...downPaymentErrorMsg,
            edit_PayDate_Err: "Date cannot be empty",
          });
        }
        
        setDownPayments(downPaymentsPlaceholder);
      } else {
        downPaymentsPlaceholder[i].isPayNow = 1;
        downPaymentsPlaceholder[i].paymentDate = todayPayDate().toISOString().split("T")[0];
        downPaymentsPlaceholder[i].paymentConfirmation =  false

        setHasError(false);
        setDownPaymentErrorMsg({
          ...downPaymentErrorMsg,
          edit_PayDate_Err: "",
        });
        setDownPayments(downPaymentsPlaceholder);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };
  const changeDownpaymentDate = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];

    try {
      setIsLoader(true);
      downPaymentsPlaceholder[i].paymentDate = e.target.value;

      setDownPayments(downPaymentsPlaceholder);

      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_PayDate_Err: "",
      });
    } catch (error) {
      console.log(error);
      setHasError(true);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_PayDate_Err: error,
      });
    } finally {
      setIsLoader(false);
      setHasError(false);
      setDownPaymentErrorMsg({
        ...downPaymentErrorMsg,
        edit_PayDate_Err: "",
      });
    }
    console.log("changeDownpaymentDate", e.target.value, downpay);
  };
  const changeDownpaymentType = (e, downpay, i) => {
    //  console.log(e.target.value === "online");
    const downPaymentsPlaceholder = [...downPayments];
    downPaymentsPlaceholder[i].payment_type = e.target.value;
    downPaymentsPlaceholder[i].payment_status = e.target.value === "online" ? "unpaid" : "paid";

    setDownPayments(downPaymentsPlaceholder);
    console.log("changeDownpaymentType", e.target.value, downpay);
  };
  const changeDownpaymentStatus = (e, downpay, i) => {
    //  //  console.log(e.target);
    const downPaymentsPlaceholder = [...downPayments];
    downPaymentsPlaceholder[i].payment_status = e.target.value;
    downPaymentsPlaceholder[i].paymentConfirmation = e.target.value === "unpaid" ? false : ""

    setDownPayments(downPaymentsPlaceholder);
    console.log("changeDownpaymentStatus", e.target.value, downpay);
  };
  // Edit created Downpayments

  const totalDownpayment = () => {
    let totalPlaceholder = 0;

    downPayments.reduce(
      (previousValue, currentValue) =>
        parseFloat(previousValue) + parseFloat(currentValue.amount),
      totalPlaceholder
    );

    return totalPlaceholder
  }

  return (
    <>
      {isLoader && <Loader />}
      {!props.successProductPayment && (
        <form className="productPaymentTransaction">
          {errorMsg !== "" && <div className="popupMessage error innerDrawerMessage">
            <p>{errorMsg}</p>
          </div>}
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
                  className={
                    downPaymentActive ? "toggleBtn active" : "toggleBtn"
                  }
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
                  {parseFloat(outStanding.amount) > 0 && (
                    <div className="newDownpayment">
                      <button
                        className="addNewDownpayment"
                        onClick={(e) => addNewDownPayment(e)}
                        // disabled={hasError === true || outStanding.amount === 0}
                        disabled={outStanding.amount === 0}
                      >
                        + Add more Downpayments
                      </button>
                    </div>
                  )}

                  {downPayments && downPayments.length > 0 && (
                    <div
                      className="downPaymentsCreated"
                      ref={downpaymentsContainer}
                    >
                      {downPayments.map((downpay, i) => (
                        <div className="newDownpayment" key={i}>
                          {i !== downPayments.length - 1 && <button
                            className="delNewDownpayment"
                            onClick={(e) => deleteNewDownPayment(e, downpay, downpay.dpId)}
                          >
                            <img src={deleteBtn} alt="delete" /> Remove
                          </button>}
                          <div className="transaction_form products forDownpayment">
                            <div
                              className={
                                ((downPaymentErrorMsg.edit_Title_Err || downPaymentErrorMsg.downpayment_no_title) && downpay.title.trim() === "")
                                  ? "cmnFormRow gap error"
                                  : "cmnFormRow gap"
                              }
                            >
                              <label className="labelWithInfo">
                                <span className="labelHeading">Title <sup className="requiredSt">*</sup></span>
                                <span className="infoSpan">
                                  <img src={info_icon} alt="" />
                                  <span className="tooltiptextInfo">
                                    Add a title for your downpayment
                                  </span>
                                </span>
                              </label>
                              <div className="cmnFormField">
                                <input
                                  className="cmnFieldStyle"
                                  onChange={(e) =>
                                    changeDownpaymentTitle(e, downpay, i)
                                  }
                                  value={downpay.title}
                                />
                              </div>
                              {(downPaymentErrorMsg.edit_Title_Err && downpay.title.trim() === "") ? (
                                <p className="errorMsg">
                                  {downPaymentErrorMsg.edit_Title_Err}
                                </p>
                              ) : (downPaymentErrorMsg.downpayment_no_title && downpay.title.trim() === "") ? (
                                <p className="errorMsg">
                                  {downPaymentErrorMsg.downpayment_no_title}
                                </p>
                              ): ""}
                            </div>
                            <div className="cmnFormRow gap">
                              {console.log("downPaymentErrorMsg.edit_Amount_Err : "+i+" : ",downPaymentErrorMsg.edit_Amount_Err)}
                              <div
                                className={
                                  (downPaymentErrorMsg.edit_Amount_Err && downPaymentErrorMsg.edit_Amount_Err.key !== null &&  (downPaymentErrorMsg.edit_Amount_Err.key.includes(i)))
                                    ? "leftSecTransaction error"
                                    : "leftSecTransaction"
                                }
                              >
                                {/* {console.log("CHECKING LOGGED:::>>>", downpay, downpay.amount === 0, downpay.amount === "0", downpay.amount === undefined, isNaN(downpay.amount))} */}
                                <label className="labelWithInfo">
                                  <span className="labelHeading">Amount <sup className="requiredSt">*</sup></span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo amount">
                                      Enter downpayment amount
                                    </span>
                                  </span>
                                </label>
                                <div className="cmnFormField preField">
                                  <div className="unitAmount">$</div>
                                  <input
                                    type="number"
                                    placeholder="149"
                                    className="editableInput numberType cmnFieldStyle"
                                    value={downpay.amount}
                                    onChange={(e) =>
                                      changeDownpaymentAmount(e, downpay, i)
                                    }
                                  />
                                </div>

                                {downPaymentErrorMsg.edit_Amount_Err && downPaymentErrorMsg.edit_Amount_Err.key !== null &&  downPaymentErrorMsg.edit_Amount_Err.key.includes(i)  && (
                                <p className="errorMsg">
                                {/* {console.log("I : ", i)} */}

                                    {downPaymentErrorMsg.edit_Amount_Err.msg}
                                  </p>
                                )}
                                {!downPaymentErrorMsg.edit_Amount_Err && (downpay.amount === 0 || downpay.amount === "0" || downpay.amount === undefined || isNaN(downpay.amount)) ? (
                                  <p className="errorMsg">
                                    {console.log("HERE:::::::")}
                                    Amount cannot be empty or 0
                                  </p>
                                ) : ""}
                              </div>
                              <div
                                className={
                                  downPaymentErrorMsg.edit_PayDate_Err
                                    ? "rightSecTransaction error"
                                    : "rightSecTransaction"
                                }
                              >
                                <label className="labelWithInfo paymentTime">
                                  <span className="labelHeading">
                                    I want to pay later
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
                                      onChange={(e) =>
                                        changeDownpaymentIsPayNow(e, downpay, i)
                                      }
                                    />
                                    {console.log("downpay.isPayNow", downpay.dpId, downpay.isPayNow)}
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
                                {console.log("downpay.isPayNow", downpay.isPayNow)}
                                {downpay.isPayNow === 0 && (
                                  <div className="paymentNow">
                                    <input
                                      type="date"
                                      placeholder="mm-dd-yyyy"
                                      className="cmnFieldStyle"
                                      // defaultValue={downpay.paymentDate}
                                      onChange={(e) =>
                                        changeDownpaymentDate(e, downpay, i)
                                      }
                                      value={downpay.paymentDate}
                                      min={
                                        todayPayDate()
                                          .toISOString()
                                          .split("T")[0]
                                      }
                                    />
                                  </div>
                                )}
                                {downPaymentErrorMsg.edit_PayDate_Err && (
                                  <p className="errorMsg">
                                    {downPaymentErrorMsg.edit_PayDate_Err}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="cmnFormRow gap">
                              <div className="leftSecTransaction">
                                <label className="labelWithInfo">
                                  <span className="labelHeading">
                                    Payment Mode
                                  </span>
                                  <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span className="tooltiptextInfo paymentType">
                                      Set mode of payment of this downpayment (Cash or Online for Bank and Card)
                                    </span>
                                  </span>
                                </label>
                                <div className="cmnFormField">
                                  <select
                                    className="selectBox"
                                    value={downpay.payment_type}
                                    onChange={(e) =>
                                      changeDownpaymentType(e, downpay, i)
                                    }
                                  >
                                    <option value="cash">Cash</option>
                                    <option value="online">Online</option>
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
                                      Set status of payment <br/>(Default unpaid for Online payment mode)
                                    </span>
                                  </span>
                                </label>
                                <select
                                  className="selectBox"
                                  value={downpay.payment_type === "online" ? "unpaid" : downpay.payment_status}
                                  onChange={(e) =>
                                    changeDownpaymentStatus(e, downpay, i)
                                  }
                                  disabled={downpay.payment_type === "online" || downpay.isPayNow === 0}
                                >
                                  <option value="unpaid">Unpaid</option>
                                  <option value="paid">Paid</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <BillingOverview
              contactId={props.contactId}
              changeDefaultPay={changeDefaultPayFn}
              isNoCardBankFlagErr={noBankCard}
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
                    <div className="informationSpan">$ {totalAmt.toFixed(2)}</div>
                  </li>
                  <li>
                    <div className="labelSpan">Tax</div>
                    <div className="informationSpan">$ {totalTaxAmt.toFixed(2)}</div>
                  </li>
                </ul>
                <ul className="totalPaymentUl">
                  <li>Total</li>
                  <li>
                    $ {(parseFloat(totalAmt) + parseFloat(totalTaxAmt)).toFixed(
                      2
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {downPayments
              .filter((dp, index) => dp.isPayNow !== 1)
              .map((downPay, i) => (
                <div
                  className="currentPaymentOverview cartProductInner downPayLater outstandingOverviewProduct"
                  key={i}
                >
                  <div className="outstandingDownpayment">
                    <div className="downpaymentsDetails">
                      <div className="cardImage">
                        {downPay.payment_type === "cash" ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.3276 19.4026C14.8044 19.3766 13.2913 19.1497 11.8276 18.7276C9.94165 18.1548 7.95855 17.9736 6.00006 18.1951C5.03973 18.3121 4.08781 18.4899 3.15006 18.7276C3.03936 18.7557 2.92372 18.7582 2.81194 18.7348C2.70016 18.7114 2.59519 18.6627 2.50506 18.5926C2.42115 18.5191 2.35472 18.4277 2.3106 18.3252C2.26649 18.2227 2.2458 18.1116 2.25006 18.0001V6.00012C2.24506 5.8288 2.29891 5.66093 2.40262 5.52447C2.50633 5.38801 2.65365 5.29118 2.82006 5.25012C3.91403 4.9761 5.02723 4.78555 6.15006 4.68012C8.16955 4.4894 10.2069 4.69059 12.1501 5.27262C13.9496 5.81318 15.8371 5.99912 17.7076 5.82012C18.7578 5.70816 19.7983 5.51763 20.8201 5.25012C20.9308 5.22203 21.0464 5.21959 21.1582 5.24299C21.27 5.26638 21.3749 5.315 21.4651 5.38512C21.5575 5.45806 21.6315 5.55174 21.681 5.65859C21.7305 5.76543 21.7542 5.88243 21.7501 6.00012V18.0001C21.7551 18.1715 21.7012 18.3393 21.5975 18.4758C21.4938 18.6122 21.3465 18.7091 21.1801 18.7501C20.1789 19.0059 19.1616 19.1938 18.1351 19.3126C17.5348 19.377 16.9313 19.407 16.3276 19.4026ZM7.67256 16.5976C9.19572 16.6236 10.7088 16.8506 12.1726 17.2726C14.0466 17.8403 16.0164 18.0215 17.9626 17.8051C18.7196 17.7162 19.4709 17.5835 20.2126 17.4076V6.94512C19.4327 7.11257 18.6439 7.23527 17.8501 7.31262C15.8201 7.5151 13.7702 7.32411 11.8126 6.75012C10.0256 6.21057 8.15113 6.02211 6.29256 6.19512C5.4372 6.2713 4.58784 6.40409 3.75006 6.59262V17.0926C4.44873 16.9417 5.15464 16.8266 5.86506 16.7476C6.46421 16.6632 7.06769 16.6131 7.67256 16.5976Z"
                              fill="#305671"
                            />
                            <path
                              d="M3.27733 9.75037H2.93983C2.75149 9.73526 2.5758 9.64962 2.44788 9.51057C2.31995 9.37152 2.24922 9.18931 2.24983 9.00037V6.00037C2.24484 5.82905 2.29868 5.66118 2.40239 5.52472C2.5061 5.38826 2.65342 5.29144 2.81983 5.25037C3.9138 4.97635 5.027 4.7858 6.14983 4.68037C6.32984 4.66264 6.5102 4.71056 6.65767 4.8153C6.80514 4.92005 6.90979 5.07456 6.95233 5.25037C7.00459 5.49689 7.02974 5.74839 7.02733 6.00037C7.02733 6.99494 6.63224 7.94876 5.92898 8.65202C5.22572 9.35529 4.27189 9.75037 3.27733 9.75037ZM3.74983 6.59287V8.19787C4.20872 8.09945 4.62535 7.85999 4.94139 7.51302C5.25743 7.16605 5.45706 6.72894 5.51233 6.26287C4.96483 6.34537 4.37983 6.45037 3.74983 6.59287Z"
                              fill="#305671"
                            />
                            <path
                              d="M20.76 9.75058C19.8942 9.75249 19.0545 9.45476 18.3832 8.90793C17.712 8.36111 17.2507 7.59887 17.0775 6.75058C17.0569 6.63936 17.0617 6.52491 17.0916 6.41581C17.1214 6.30671 17.1756 6.20578 17.25 6.12058C17.3119 6.03688 17.3905 5.96698 17.4809 5.91533C17.5713 5.86368 17.6715 5.83141 17.775 5.82058C18.8026 5.70532 19.8203 5.51481 20.82 5.25058C20.9307 5.22249 21.0463 5.22005 21.1581 5.24345C21.2699 5.26684 21.3749 5.31546 21.465 5.38558C21.5575 5.45852 21.6314 5.5522 21.6809 5.65905C21.7305 5.76589 21.7541 5.88289 21.75 6.00058V9.00058C21.7526 9.17925 21.6913 9.35298 21.5772 9.49048C21.4631 9.62799 21.3036 9.72022 21.1275 9.75058C21.0055 9.76564 20.882 9.76564 20.76 9.75058ZM18.855 7.20058C19.1715 7.70137 19.6728 8.0571 20.25 8.19058V6.94558C19.77 7.04308 19.305 7.13308 18.855 7.20058Z"
                              fill="#305671"
                            />
                            <path
                              d="M3 18.75C2.80109 18.75 2.61032 18.671 2.46967 18.5303C2.32902 18.3897 2.25 18.1989 2.25 18V15C2.25 14.8011 2.32902 14.6103 2.46967 14.4697C2.61032 14.329 2.80109 14.25 3 14.25C3.87533 14.2511 4.72268 14.5584 5.39524 15.1187C6.0678 15.6789 6.52319 16.4568 6.6825 17.3175C6.7015 17.419 6.69932 17.5234 6.67609 17.6241C6.65286 17.7248 6.60908 17.8195 6.5475 17.9025C6.48573 17.9839 6.40796 18.0519 6.31897 18.1022C6.22997 18.1525 6.13164 18.1841 6.03 18.195C5.06968 18.3119 4.11776 18.4898 3.18 18.7275C3.12113 18.7423 3.06069 18.7498 3 18.75ZM3.75 15.8775V17.055C4.155 16.9725 4.545 16.8975 4.9275 16.8375C4.65817 16.3907 4.24193 16.0513 3.75 15.8775Z"
                              fill="#305671"
                            />
                            <path
                              d="M18.0524 19.2975C17.879 19.3017 17.7095 19.2458 17.5728 19.1391C17.436 19.0324 17.3405 18.8817 17.3024 18.7125C17.2609 18.4774 17.2433 18.2387 17.2499 18C17.2499 17.0054 17.645 16.0516 18.3482 15.3483C19.0515 14.6451 20.0053 14.25 20.9999 14.25C21.1988 14.25 21.3896 14.329 21.5302 14.4697C21.6709 14.6103 21.7499 14.8011 21.7499 15V18C21.7549 18.1713 21.701 18.3392 21.5973 18.4757C21.4936 18.6121 21.3463 18.7089 21.1799 18.75C20.1787 19.0058 19.1614 19.1937 18.1349 19.3125L18.0524 19.2975ZM20.2499 15.8775C19.8566 16.012 19.5083 16.2527 19.2435 16.5731C18.9787 16.8935 18.8079 17.2809 18.7499 17.6925C19.2224 17.6175 19.7174 17.5275 20.2499 17.4075V15.8775Z"
                              fill="#305671"
                            />
                            <path
                              d="M13.125 15H10.5C10.3011 15 10.1103 14.921 9.96967 14.7803C9.82902 14.6397 9.75 14.4489 9.75 14.25C9.75 14.0511 9.82902 13.8603 9.96967 13.7197C10.1103 13.579 10.3011 13.5 10.5 13.5H13.125C13.2245 13.5 13.3198 13.4605 13.3902 13.3902C13.4605 13.3198 13.5 13.2245 13.5 13.125C13.5 13.0255 13.4605 12.9302 13.3902 12.8598C13.3198 12.7895 13.2245 12.75 13.125 12.75H10.875C10.3777 12.75 9.90081 12.5525 9.54917 12.2008C9.19754 11.8492 9 11.3723 9 10.875C9 10.3777 9.19754 9.90081 9.54917 9.54917C9.90081 9.19754 10.3777 9 10.875 9H13.5C13.6989 9 13.8897 9.07902 14.0303 9.21967C14.171 9.36032 14.25 9.55109 14.25 9.75C14.25 9.94891 14.171 10.1397 14.0303 10.2803C13.8897 10.421 13.6989 10.5 13.5 10.5H10.875C10.7755 10.5 10.6802 10.5395 10.6098 10.6098C10.5395 10.6802 10.5 10.7755 10.5 10.875C10.5 10.9745 10.5395 11.0698 10.6098 11.1402C10.6802 11.2105 10.7755 11.25 10.875 11.25H13.125C13.6223 11.25 14.0992 11.4475 14.4508 11.7992C14.8025 12.1508 15 12.6277 15 13.125C15 13.6223 14.8025 14.0992 14.4508 14.4508C14.0992 14.8025 13.6223 15 13.125 15Z"
                              fill="#305671"
                            />
                            <path
                              d="M12 10.5C11.8011 10.5 11.6103 10.421 11.4697 10.2803C11.329 10.1397 11.25 9.94891 11.25 9.75V9C11.25 8.80109 11.329 8.61032 11.4697 8.46967C11.6103 8.32902 11.8011 8.25 12 8.25C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9V9.75C12.75 9.94891 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5Z"
                              fill="#305671"
                            />
                            <path
                              d="M12 15.75C11.8011 15.75 11.6103 15.671 11.4697 15.5303C11.329 15.3897 11.25 15.1989 11.25 15V14.25C11.25 14.0511 11.329 13.8603 11.4697 13.7197C11.6103 13.579 11.8011 13.5 12 13.5C12.1989 13.5 12.3897 13.579 12.5303 13.7197C12.671 13.8603 12.75 14.0511 12.75 14.25V15C12.75 15.1989 12.671 15.3897 12.5303 15.5303C12.3897 15.671 12.1989 15.75 12 15.75Z"
                              fill="#305671"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V2H18V4Z"
                              fill="#305671"
                            />
                          </svg>
                        )}
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
              ))}

            <div
              className="dottedBorder"
              style={{
                order: outStanding.isPayNow === 0 && "3",
              }}
            ></div>

            {parseFloat(outStanding.amount) > 0 && (
              <div
                className={
                  outStanding.isPayNow === 0
                    ? "cartProductInner outStandingProduct outstandingOverviewProduct"
                    : "cartProductInner outStandingProduct"
                }
                style={{
                  marginTop: outStanding.isPayNow === 0 && "10px",
                  order: outStanding.isPayNow === 0 && "2",
                }}
              >
                {" "}
                {/**outstandingOverviewProduct */}
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
                            Set mode of payment of Outstanding amount (Cash or Online for Bank and Card)
                          </span>
                        </span>
                      </label>
                      <div className="cmnFormField">
                        <select
                          className="selectBox cmnFieldStyle"
                          onChange={(e) => payDueMode(e)}
                          value={outStanding.payment_type}
                        >
                          <option value="online">Online</option>
                          <option value="cash">Cash</option>
                        </select>
                      </div>
                    </div>
                    <div className="cmnFormCol">
                      <label className="labelWithInfo paymentTime">
                        <span className="labelHeading">
                          I want to pay later
                        </span>
                        <label
                          className={
                            outStanding.isPayNow === 0 ? "toggleBtn active" : "toggleBtn"
                          }
                        >
                          {/* {console.log(":::outStanding:::", outStanding)} */}
                          <input
                            type="checkbox"
                            name="check-communication"
                            defaultValue={false}
                            onChange={(e) => payDateChangeOverview(e)}
                          />
                          <span className="toggler"></span>
                        </label>
                      </label>
                      {outStanding.isPayNow === 1 && (
                        <div className="paymentNow display">
                          <p>
                            Payment date <span>Now</span>
                          </p>
                        </div>
                      )}
                      {outStanding.isPayNow === 0 && (
                        <div
                          className={
                            downPaymentErrorMsg.outStandingDate_Err
                              ? "paymentNow error"
                              : "paymentNow"
                          }
                        >
                          <input
                            type="date"
                            placeholder="mm/dd/yyyy"
                            className="cmnFieldStyle"
                            defaultValue={
                              tomorrowPayDate().toISOString().split("T")[0]
                            }
                            min={todayPayDate().toISOString().split("T")[0]}
                            onChange={(e) => changeOutstandingPayDate(e)}
                            ref={inputOutstandingDate}
                          />
                          {downPaymentErrorMsg.outStandingDate_Err && (
                            <p className="errorMsg">
                              {downPaymentErrorMsg.outStandingDate_Err}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {downPayments.length > 0 && downPayments.filter((downpay, i) => downpay.isPayNow === 1).map((downPay, i) =>
              <div
                className="currentPaymentOverview cartProductInner"
                style={{
                  marginTop: 0,
                  marginBottom: "5px"
                }}
                key={i}
              >
                {console.log("::::MAPPING::::", downPay, i)}
                <div className={(downPay.payment_type === "cash" && downPay.paymentConfirmation === false) ? "outstandingDownpayment error" : "outstandingDownpayment"}>
                  <div className="downpaymentsDetails">
                    <div className="cardImage">
                      {downPay.payment_type === "cash" ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.3276 19.4026C14.8044 19.3766 13.2913 19.1497 11.8276 18.7276C9.94165 18.1548 7.95855 17.9736 6.00006 18.1951C5.03973 18.3121 4.08781 18.4899 3.15006 18.7276C3.03936 18.7557 2.92372 18.7582 2.81194 18.7348C2.70016 18.7114 2.59519 18.6627 2.50506 18.5926C2.42115 18.5191 2.35472 18.4277 2.3106 18.3252C2.26649 18.2227 2.2458 18.1116 2.25006 18.0001V6.00012C2.24506 5.8288 2.29891 5.66093 2.40262 5.52447C2.50633 5.38801 2.65365 5.29118 2.82006 5.25012C3.91403 4.9761 5.02723 4.78555 6.15006 4.68012C8.16955 4.4894 10.2069 4.69059 12.1501 5.27262C13.9496 5.81318 15.8371 5.99912 17.7076 5.82012C18.7578 5.70816 19.7983 5.51763 20.8201 5.25012C20.9308 5.22203 21.0464 5.21959 21.1582 5.24299C21.27 5.26638 21.3749 5.315 21.4651 5.38512C21.5575 5.45806 21.6315 5.55174 21.681 5.65859C21.7305 5.76543 21.7542 5.88243 21.7501 6.00012V18.0001C21.7551 18.1715 21.7012 18.3393 21.5975 18.4758C21.4938 18.6122 21.3465 18.7091 21.1801 18.7501C20.1789 19.0059 19.1616 19.1938 18.1351 19.3126C17.5348 19.377 16.9313 19.407 16.3276 19.4026ZM7.67256 16.5976C9.19572 16.6236 10.7088 16.8506 12.1726 17.2726C14.0466 17.8403 16.0164 18.0215 17.9626 17.8051C18.7196 17.7162 19.4709 17.5835 20.2126 17.4076V6.94512C19.4327 7.11257 18.6439 7.23527 17.8501 7.31262C15.8201 7.5151 13.7702 7.32411 11.8126 6.75012C10.0256 6.21057 8.15113 6.02211 6.29256 6.19512C5.4372 6.2713 4.58784 6.40409 3.75006 6.59262V17.0926C4.44873 16.9417 5.15464 16.8266 5.86506 16.7476C6.46421 16.6632 7.06769 16.6131 7.67256 16.5976Z"
                            fill="#305671"
                          />
                          <path
                            d="M3.27733 9.75037H2.93983C2.75149 9.73526 2.5758 9.64962 2.44788 9.51057C2.31995 9.37152 2.24922 9.18931 2.24983 9.00037V6.00037C2.24484 5.82905 2.29868 5.66118 2.40239 5.52472C2.5061 5.38826 2.65342 5.29144 2.81983 5.25037C3.9138 4.97635 5.027 4.7858 6.14983 4.68037C6.32984 4.66264 6.5102 4.71056 6.65767 4.8153C6.80514 4.92005 6.90979 5.07456 6.95233 5.25037C7.00459 5.49689 7.02974 5.74839 7.02733 6.00037C7.02733 6.99494 6.63224 7.94876 5.92898 8.65202C5.22572 9.35529 4.27189 9.75037 3.27733 9.75037ZM3.74983 6.59287V8.19787C4.20872 8.09945 4.62535 7.85999 4.94139 7.51302C5.25743 7.16605 5.45706 6.72894 5.51233 6.26287C4.96483 6.34537 4.37983 6.45037 3.74983 6.59287Z"
                            fill="#305671"
                          />
                          <path
                            d="M20.76 9.75058C19.8942 9.75249 19.0545 9.45476 18.3832 8.90793C17.712 8.36111 17.2507 7.59887 17.0775 6.75058C17.0569 6.63936 17.0617 6.52491 17.0916 6.41581C17.1214 6.30671 17.1756 6.20578 17.25 6.12058C17.3119 6.03688 17.3905 5.96698 17.4809 5.91533C17.5713 5.86368 17.6715 5.83141 17.775 5.82058C18.8026 5.70532 19.8203 5.51481 20.82 5.25058C20.9307 5.22249 21.0463 5.22005 21.1581 5.24345C21.2699 5.26684 21.3749 5.31546 21.465 5.38558C21.5575 5.45852 21.6314 5.5522 21.6809 5.65905C21.7305 5.76589 21.7541 5.88289 21.75 6.00058V9.00058C21.7526 9.17925 21.6913 9.35298 21.5772 9.49048C21.4631 9.62799 21.3036 9.72022 21.1275 9.75058C21.0055 9.76564 20.882 9.76564 20.76 9.75058ZM18.855 7.20058C19.1715 7.70137 19.6728 8.0571 20.25 8.19058V6.94558C19.77 7.04308 19.305 7.13308 18.855 7.20058Z"
                            fill="#305671"
                          />
                          <path
                            d="M3 18.75C2.80109 18.75 2.61032 18.671 2.46967 18.5303C2.32902 18.3897 2.25 18.1989 2.25 18V15C2.25 14.8011 2.32902 14.6103 2.46967 14.4697C2.61032 14.329 2.80109 14.25 3 14.25C3.87533 14.2511 4.72268 14.5584 5.39524 15.1187C6.0678 15.6789 6.52319 16.4568 6.6825 17.3175C6.7015 17.419 6.69932 17.5234 6.67609 17.6241C6.65286 17.7248 6.60908 17.8195 6.5475 17.9025C6.48573 17.9839 6.40796 18.0519 6.31897 18.1022C6.22997 18.1525 6.13164 18.1841 6.03 18.195C5.06968 18.3119 4.11776 18.4898 3.18 18.7275C3.12113 18.7423 3.06069 18.7498 3 18.75ZM3.75 15.8775V17.055C4.155 16.9725 4.545 16.8975 4.9275 16.8375C4.65817 16.3907 4.24193 16.0513 3.75 15.8775Z"
                            fill="#305671"
                          />
                          <path
                            d="M18.0524 19.2975C17.879 19.3017 17.7095 19.2458 17.5728 19.1391C17.436 19.0324 17.3405 18.8817 17.3024 18.7125C17.2609 18.4774 17.2433 18.2387 17.2499 18C17.2499 17.0054 17.645 16.0516 18.3482 15.3483C19.0515 14.6451 20.0053 14.25 20.9999 14.25C21.1988 14.25 21.3896 14.329 21.5302 14.4697C21.6709 14.6103 21.7499 14.8011 21.7499 15V18C21.7549 18.1713 21.701 18.3392 21.5973 18.4757C21.4936 18.6121 21.3463 18.7089 21.1799 18.75C20.1787 19.0058 19.1614 19.1937 18.1349 19.3125L18.0524 19.2975ZM20.2499 15.8775C19.8566 16.012 19.5083 16.2527 19.2435 16.5731C18.9787 16.8935 18.8079 17.2809 18.7499 17.6925C19.2224 17.6175 19.7174 17.5275 20.2499 17.4075V15.8775Z"
                            fill="#305671"
                          />
                          <path
                            d="M13.125 15H10.5C10.3011 15 10.1103 14.921 9.96967 14.7803C9.82902 14.6397 9.75 14.4489 9.75 14.25C9.75 14.0511 9.82902 13.8603 9.96967 13.7197C10.1103 13.579 10.3011 13.5 10.5 13.5H13.125C13.2245 13.5 13.3198 13.4605 13.3902 13.3902C13.4605 13.3198 13.5 13.2245 13.5 13.125C13.5 13.0255 13.4605 12.9302 13.3902 12.8598C13.3198 12.7895 13.2245 12.75 13.125 12.75H10.875C10.3777 12.75 9.90081 12.5525 9.54917 12.2008C9.19754 11.8492 9 11.3723 9 10.875C9 10.3777 9.19754 9.90081 9.54917 9.54917C9.90081 9.19754 10.3777 9 10.875 9H13.5C13.6989 9 13.8897 9.07902 14.0303 9.21967C14.171 9.36032 14.25 9.55109 14.25 9.75C14.25 9.94891 14.171 10.1397 14.0303 10.2803C13.8897 10.421 13.6989 10.5 13.5 10.5H10.875C10.7755 10.5 10.6802 10.5395 10.6098 10.6098C10.5395 10.6802 10.5 10.7755 10.5 10.875C10.5 10.9745 10.5395 11.0698 10.6098 11.1402C10.6802 11.2105 10.7755 11.25 10.875 11.25H13.125C13.6223 11.25 14.0992 11.4475 14.4508 11.7992C14.8025 12.1508 15 12.6277 15 13.125C15 13.6223 14.8025 14.0992 14.4508 14.4508C14.0992 14.8025 13.6223 15 13.125 15Z"
                            fill="#305671"
                          />
                          <path
                            d="M12 10.5C11.8011 10.5 11.6103 10.421 11.4697 10.2803C11.329 10.1397 11.25 9.94891 11.25 9.75V9C11.25 8.80109 11.329 8.61032 11.4697 8.46967C11.6103 8.32902 11.8011 8.25 12 8.25C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9V9.75C12.75 9.94891 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5Z"
                            fill="#305671"
                          />
                          <path
                            d="M12 15.75C11.8011 15.75 11.6103 15.671 11.4697 15.5303C11.329 15.3897 11.25 15.1989 11.25 15V14.25C11.25 14.0511 11.329 13.8603 11.4697 13.7197C11.6103 13.579 11.8011 13.5 12 13.5C12.1989 13.5 12.3897 13.579 12.5303 13.7197C12.671 13.8603 12.75 14.0511 12.75 14.25V15C12.75 15.1989 12.671 15.3897 12.5303 15.5303C12.3897 15.671 12.1989 15.75 12 15.75Z"
                            fill="#305671"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V8H18V13C18 13.55 17.55 14 17 14ZM18 4H2V2H18V4Z"
                            fill="#305671"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="paymentModuleInfos">
                      <span className="accNumber">{downPay.title}</span>
                      <span className="accinfod">
                        <b>$ {isNaN(downPay.amount) ? 0 : downPay.amount}</b>
                      </span>
                    </div>
                  </div>
                  <div className={downPay.payment_type === "cash" ? "downpaymentsPayDetails" : "downpaymentsPayDetails d-flex f-align-center"}>
                    <div 
                      className="payDate currentPayment"
                      style={{
                        marginTop: downPay.payment_type === "online" && "16px"
                      }}
                    >
                      <img src={payDate} alt="" />{" "}
                      {downPay.isPayNow === 1
                        ? "Now"
                        : downPay.paymentDate}
                    </div>
                  </div>
                  {(downPay.isPayNow === 1 && downPay.payment_type === "cash") && 
                    <>
                      <label className="receivedCash">
                        <div className="customCheckbox">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={(e) => markDownPaid(e, downPay, downPay.dpId)}
                            checked={downPay.paymentConfirmation}
                          />
                          <span></span>
                        </div>
                        I have received the amount by {downPay.payment_type === "cash" ? "Cash" : "Card/Bank"}
                      </label>
                      {downPaymentErrorMsg.payment_not_received !== "" && downPay.payment_type === "cash" && downPay.paymentConfirmation === false && <p className="errorMsg">
                              {downPaymentErrorMsg.payment_not_received}
                            </p>}
                    </>
                  }
                </div>
              </div>
            )}

            <div className="totalCartValue cartProductInner f-row">
              <div className="billingAmt">
                <p>Billing Total</p>
                {/* downPayments[0] */}
                {/* <h4>$ {downPayments.length > 0 ? downPayments[0].amount : (parseFloat(totalAmt)+parseFloat(totalTaxAmt)).toFixed(2)}</h4> */}
                <h4>$ {isNaN(billingTotalAmt()) ? 0 : billingTotalAmt().toFixed(2)}</h4>
              </div>
              <div className="buyBtns">
                <button
                  className="saveNnewBtn"
                  onClick={(e) => billPayment(e)}
                  disabled={hasError === false ? false : true}
                  style={{
                    paddingLeft: billingTotalAmt() === 0 && "10px",
                    paddingRight: billingTotalAmt() === 0 && "10px"
                  }}
                >
                  {billingTotalAmt() === 0 ? "Make Contract" : "Bill Now"} <img src={aaroww} alt=""
                  style={{
                    marginLeft: billingTotalAmt() === 0 && "6px"
                  }} />
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

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
              <p>{paymentFailed && paymentFailed}</p>
              {/* {console.log("IN BODY:::", paymentFailed)} */}
            </div>

            <div className="buyBtns failedPayment">
              <button
                onClick={() => setProductPaymentFailed(false)}
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
          <div className="posSellingForm contractOverview paymentSuccessFullScreen">
            <div className="successHeader">
              <div className="circleForIcon">
                <img src={paySuccess} alt="" />
              </div>
              <h3 className="paySuccessHeading">
                {paymentSuccessMessage}
              </h3>
            </div>
            {(payMentInfo.cashAmount > 0.00 || payMentInfo.onlineAmount > 0.00) &&
            <>
              <div className="dottedBorder"></div>

              <ul className="paymentUlHeader">
                <li className="paymentModeHeaderLi">Payment Mode</li>
                <li className="paymentIdHeaderLi">Transaction ID</li>
                <li className="paymentAmtHeaderLi">Amount</li>
              </ul>
            </>
            }

            {console.log("Product Trans ID>>>>", productBuy.data)}
            
            {payMentInfo.cashPayment.length > 0.00 && payMentInfo.cashAmount > 0 && (
              <ul className="paymentUlInfo">
                <li className="paymentModeLi">
                  <img src={cashSuccess} alt="" />
                  <p>Cash</p>
                </li>
                <li className="transactionIdProduct">
                  {
                    productBuy.data.filter(cashTransac => cashTransac.defaultTransaction && cashTransac.isPayNow !== 0 && cashTransac.defaultTransaction === "cash").map((transId)=>(
                      <span>{transId.transactionId}</span>
                    ))
                  }
                </li>
                <li className="paymentAmtLi">
                  <p>$ {payMentInfo.cashAmount.toFixed(2)}</p>
                  <img src={smallTick} alt="" />
                </li>
              </ul>
            )}

            {payMentInfo.onlinePayment.length > 0.00 && payMentInfo.onlineAmount > 0 && (
              <ul className="paymentUlInfo">
                <li className="paymentModeLi">
                  <img src={paidCard} alt="" />
                  <p>Online</p>
                </li>
                <li className="transactionIdProduct">
                  {
                    productBuy.data.filter(onlineTransac => onlineTransac.defaultTransaction && onlineTransac.defaultTransaction === "online").map((transId)=>(
                      <span>{transId.transactionId}</span>
                    ))
                  }
                </li>
                <li className="paymentAmtLi">
                  <p>$ {payMentInfo.onlineAmount.toFixed(2)}</p>
                  <img src={smallTick} alt="" />
                </li>
              </ul>
            )}
            {(payMentInfo.cashAmount > 0.00 || payMentInfo.onlineAmount > 0.00) &&
              <>
                <ul className="totalPaymentUl">
                  <li>
                    <p>Amount Paid</p>
                  </li>
                  <li>
                    <p>$ {billingTotalAmt().toFixed(2)}</p>
                  </li>
                </ul>

                <div className="dottedBorder"></div>
              </>
            }
            <div className="successPageBtn w-100 d-flex f-justify-center">
              <button
                className="saveNnewBtn"
                onClick={(e) => {
                  resetProductForm(e);
                  props.backToTransList();
                }}
                style={{
                  marginTop: (payMentInfo.cashAmount === 0 || payMentInfo.onlineAmount === 0) && "100px"
                }}
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
