import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../actions/types";
import arrow_forward from "../../../../assets/images/backIcon.svg";
import camera from "../../../../assets/images/camera.svg";
import { BillingServices } from "../../../../services/billing/billingServices";
import { CourseServices } from "../../../../services/setup/CourseServices";
import { ProductServices } from "../../../../services/setup/ProductServices";
import Loader from "../../Loader";

import ProductTransaction from "./transaction/ProductTransaction";
import ProgramTransaction from "./transaction/ProgramTransaction";
import ContractOverviewTransaction from "./transaction/ContractOverviewTransaction";

import PaymentSuccessSection from "./transaction/PaymentSuccessSection";

const TransactionChoose = (props) => {
  const messageDelay = 10000;

  const [choosePOS, setChoosetPOS] = useState(false);
  const [chooseCourse, setChooseCourse] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentDate1, setPaymentDate1] = useState("");
  const [firstBillingDate, setFirstBillingDate] = useState("");
  const [programStartDate, setProgramStartDate] = useState("");
  const [addDownpayment, setAddDownpayment] = useState(false);
  
  const [courseCategory, setCourseCategory] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseFees, setCourseFees] = useState(0);
  const [courseName, setCourseName] = useState("Course name");
  const [courseId, setCourseId] = useState("");
  const [catName, setCatName] = useState("Category name");
  const [courseSelected, setCourseSelected] = useState(false);
  const [courseImg, setCourseImg] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [productCatList, setProductCatList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [posSelectedCat, setPosSelectedCat] = useState();
  const [posSelectedProductIndex, setPosSelectedProductIndex] = useState();
  const [productPrice, setProductPrice] = useState(0);
  const [productPriceTax, setProductPriceTax] = useState(0);
  const [productImg, setProductImg] = useState(camera);
  const [productImgName, setProductImgName] = useState("");
  const [productCatName, setProductCatName] = useState("Category name");
  const [productName, setProductName] = useState("Product name");
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [chosedColor, setChosedColor] = useState("");
  const [chosedSize, setChosedSize] = useState("");
  const [tax, setTax] = useState(0);
  const [colorIndex, setColorIndex] = useState();
  const [sizeIndex, setSizeIndex] = useState();
  const [communication, setCommunication] = useState(false);
  const [communicationDownpayment, setCommunicationDownpayment] =
    useState(false);
  
  const [productTransactionPayment, setProductTransactionPayment] =
    useState(false);

  const [contractOverview, setContractOverview] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successProductPayment, setSuccessProductPayment] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successMsg)
      setTimeout(() => {
        setSuccessMsg("");
      }, messageDelay);
    if (errorMsg)
      setTimeout(() => {
        setErrorMsg("");
      }, messageDelay);
  }, [successMsg, errorMsg]);

  const chooseTransctionTypePOS = () => {
    try {
      setShowLoader(true);
      setChoosetPOS(true);
      setChooseCourse(false);
      fetchProductCategory();
      setProductTransactionPayment(false);
    } catch (error) {
    } finally {
      setShowLoader(false);
    }
  };
  const chooseTransctionTypeCourse = async () => {
    try {
      setShowLoader(true);
      setChoosetPOS(false);
      setChooseCourse(true);
      // const list = await BillingServices.fetchCardBank(props.contactId);
      // if (!list.cards.length || !list.banks.length) throw new Error("Please set the contact's billing info first");
      // fetchCourseCategories();
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setShowLoader(false);
    }
  };

  const fetchCourseCategories = async () => {
    setShowLoader(true);
    try {
      let result = await CourseServices.fetchCategory();
      setShowLoader(false);
      setCourseCategory(result);
      console.log(result);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setShowLoader(false);
    }
  };

  const choseCatHandel = (e) => {
    let catID = e.target.value;
    console.log("This is cat ID -> " + catID);
    fetchCourses(catID);
    setCourseFees("");
    setCatName(e.target[e.target.selectedIndex].getAttribute("data-name"));
  };

  const fetchCourses = async (catID) => {
    setShowLoader(true);
    let result = await CourseServices.fetchCourseList(catID);
    setShowLoader(false);
    console.log("Courses -> " + result.courses);
    setCourseList(result.courses);
  };

  const getCourseFees = (e) => {
    let courseFees = e.target.value;
    setCourseFees(courseFees);
    setCourseName(e.target[e.target.selectedIndex].getAttribute("data-name"));
    setCourseId(e.target[e.target.selectedIndex].getAttribute("data-courseId"));
    setCourseImg(e.target[e.target.selectedIndex].getAttribute("data-img"));
    setCourseDuration(
      e.target[e.target.selectedIndex].getAttribute("data-duration")
    );
    setCourseSelected(true);
  };

  const buyCourse = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        contact: props.contactId,
        courseID: courseId,
      };
      setShowLoader(true);
      let result = await CourseServices.initCoursePurchase(payload);
      setSuccessMsg(result);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setShowLoader(false);
      setCourseCategory("");
      setCourseList("");
      setCourseName("");
      setCourseSelected(false);
      setCourseId("");
      setCourseFees("");
      setCourseImg("");
      setCourseDuration("");
    }
  };

  /* POS transaction functions */

  const productPriceHandel = (e) => {
    let inputVal = e.target.value;
    const regexFloat = /^[+-]?\d*(?:[.,]\d*)?$/;
    // let val = inputVal.replace(/[^\d]/g, "");
    let price;

    if (regexFloat.test(inputVal)) {
      // console.log(parseFloat(inputVal));
      price = parseFloat(inputVal);
      let taxAmmount = (price * tax) / 100;
      setProductPrice(inputVal);
      setProductPriceTax((price + taxAmmount).toFixed(2));
    }
  };

  const fetchProductCategory = async () => {
    setShowLoader(true);
    let relult = await ProductServices.fetchCategory();
    setProductCatList(relult);
    setShowLoader(false);
  };

  const fetchProductList = async (catID) => {
    setShowLoader(true);
    let relult = await ProductServices.fetchProducts(catID);
    setProductList(relult.products);
    setShowLoader(false);
  };

  const choseSizeHandel = (e, key) => {
    e.preventDefault();
    setChosedSize(e.target.value);
    setSizeIndex(key);
  };

  const choseColorHandel = (e, key) => {
    setChosedColor(e.target.value);
    setColorIndex(key);
    console.log(e.target.value);
    console.log(key);
  };

  const chosePosProductHandel = (e) => {
    setPosSelectedProductIndex(e.target.value);
    console.log(e.target.value);
    setColors(productList[e.target.value].associatedColors);
    setSize(productList[e.target.value].size);
    setProductImg(
      "https://wrapperbucket.s3.us-east-1.amazonaws.com/" +
        productList[e.target.value].image
    );
    setProductImgName(productList[e.target.value].image);

    let price = parseFloat(productList[e.target.value].price);
    let taxPercent = parseFloat(
      e.target[e.target.selectedIndex].getAttribute("data-tax")
    );
    let taxAmmount = (price * taxPercent) / 100;
    setProductPrice(price);
    setProductPriceTax(price + taxAmmount);

    setProductName(productList[e.target.value].name);
    setTax(taxPercent);
    resetProductHandel();
  };

  const resetProductHandel = () => {
    setChosedColor("");
    setChosedSize("");
    setColorIndex();
    setSizeIndex();
  };

  const buyProduct = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        contact: props.contactId,
        category: posSelectedCat,
        categoryName: productCatName,
        productName: productName,
        colors: [chosedColor],
        image: productImgName,
        price: productPriceTax,
        size: [chosedSize],
        taxPercent: tax,
      };
      setShowLoader(true);
      await ProductServices.buyProduct(payload);
      setSuccessMsg("POS transaction registered successfully");
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      props.refetchContact();
      setShowLoader(false);

      setPosSelectedCat("");
      setPosSelectedProductIndex(0);
      setProductList("");
      setProductCatName("Category name");
      setProductName("Product name");
      setChosedColor("");
      setColorIndex("");
      setSizeIndex("");
      setChosedSize("");
      setProductImgName();
      setProductPrice(0);
      setProductPriceTax(0);
    }
  };

  const firstBillingDateHandel = (e) => {
    setFirstBillingDate(e.target.value);
    console.log(firstBillingDate);
  };

  const programStartDateHandel = (e) => {
    setProgramStartDate(e.target.value);
    console.log(programStartDate);
  };

  const paymentDateHandel1 = (e) => {
    setPaymentDate1(e.target.value);
    console.log(paymentDate1);
  };

  const paymentDateHandel = (e) => {
    setPaymentDate(e.target.value);
    console.log(paymentDate);
  };

  const addDownpaymentFn = (e) => {
    e.preventDefault();
    setAddDownpayment(true);
  };

  const delDownpaymentFn = (e) => {
    e.preventDefault();
    setAddDownpayment(false);
  };

  

  const contractOverviewFn = (e) => {
    e.preventDefault();
    setContractOverview(true);
  };

  const paymentSuccessFn = (e) => {
    e.preventDefault();
    setContractOverview(false);
    setPaymentSuccess(true);
  };

  useEffect(() => {}, [paymentSuccess]);

  const productPayment = (e) => {
    setProductTransactionPayment(e === true ? true : false);
  };

  useEffect(() => {}, [productTransactionPayment]);

  const setSuccessProductPaymentFn = (e) => {
    setSuccessProductPayment(!successProductPayment);
  };

  // const toggleContactListFn = (e) => {
  //   e.preventDefault();
  //   setToggleContactList(true);
  // }

  useEffect(() => {}, [successProductPayment]);

  return (
    <>
      <div className="contactTabsInner">
        <div className="transHeader pos">
          {/* <div className={(contractOverview || !productTransactionPayment) ? "backToTransction transactionPage" : "backToTransction transactionPage display"
                                }>  */}
          <div
            className={
              paymentSuccess && !productTransactionPayment && !contractOverview
                ? "backToTransction transactionPage"
                : successProductPayment
                ? "backToTransction transactionPage"
                : "backToTransction transactionPage display"
            }
          >
            {!contractOverview && !productTransactionPayment && (
              <button className="backBtn" onClick={props.backToTransList}>
                <img src={arrow_forward} alt="" />
              </button>
            )}
            {productTransactionPayment &&
              !contractOverview &&
              !successProductPayment && (
                <button
                  className="backBtn"
                  onClick={() => setProductTransactionPayment(false)}
                >
                  <img src={arrow_forward} alt="" />
                </button>
              )}
            {contractOverview && !productTransactionPayment && (
              <button
                className="backBtn"
                onClick={() => setContractOverview(false)}
              >
                <img src={arrow_forward} alt="" />
              </button>
            )}
          </div>
          <div>
            {console.log("paymentSuccess", paymentSuccess)}
            <h3 className="headingTabInner">
              {contractOverview
                ? "Contract Overview"
                : paymentSuccess || successProductPayment
                ? "Payment is Successful"
                : "Make a Transaction"}
            </h3>
            <span>
              {contractOverview
                ? "* Explanatory contract text blurb should be here."
                : "* Explanatory text blurb should be here."}
            </span>
          </div>
        </div>

        <div
          className={
            contractOverview
              ? "chooseTransactionWraper transactionPage"
              : paymentSuccess
              ? "chooseTransactionWraper transactionPage"
              : productTransactionPayment
              ? "paymentTransProduct chooseTransactionWraper"
              : "chooseTransactionWraper transactionPage display"
          }
        >
          <div className="chooseTransactionType">
            <label>
              <div class="circleRadio">
                <input
                  type="radio"
                  name="transactionType"
                  onChange={chooseTransctionTypePOS}
                />
                <span></span>
              </div>{" "}
              Product
            </label>
            <label>
              <div class="circleRadio">
                <input
                  type="radio"
                  name="transactionType"
                  onChange={chooseTransctionTypeCourse}
                />
                <span></span>
              </div>{" "}
              Program
            </label>
          </div>
          {choosePOS && (
            <div className="posSellingForm">
              {showLoader && <Loader />}
              {successMsg && (
                <div className="formMsg success">{successMsg}</div>
              )}
              {errorMsg &&
                {
                  /*  <div className="formMsg error">{errorMsg}</div>*/
                }}
              <ProductTransaction
                productTransactionPayment={productTransactionPayment}
                productPayment={(e) => productPayment(e)}
                setSuccessProductPaymentFn={setSuccessProductPaymentFn}
                successProductPayment={successProductPayment}
                setProductTransactionPayment={setProductTransactionPayment}
                chooseTransctionTypePOS={chooseTransctionTypePOS}
                backToTransList={props.backToTransList}
              />
            </div>
          )}
          {chooseCourse && (
            <div className="posSellingForm">
              {showLoader && <Loader />}
              {successMsg && (
                <div className="formMsg success">{successMsg}</div>
              )}
              {errorMsg && <div className=""></div>}
              {!contractOverview && !paymentSuccess && (
                <ProgramTransaction
                  
                  
                 
                  communication={communication}
                  communicationDownpayment={communicationDownpayment}
                  addDownpaymentFn={addDownpaymentFn}
                  addDownpayment={addDownpayment}
                  delDownpaymentFn={delDownpaymentFn}
                  choseCatHandel={choseCatHandel}
                  firstBillingDateHandel={firstBillingDateHandel}
                  firstBillingDate={firstBillingDate}
                  programStartDateHandel={programStartDateHandel}
                  programStartDate={programStartDate}
                  paymentDateHandel={paymentDateHandel}
                  paymentDate={paymentDate}
                  paymentDateHandel1={paymentDateHandel1}
                  paymentDate1={paymentDate1}
                  courseSelected={courseSelected}
                  buyCourse={buyCourse}
                  setCommunication={setCommunication}
                  setCommunicationDownpayment={setCommunicationDownpayment}
                  contractOverview={contractOverview}
                  setContractOverview={setContractOverview}
                  contractOverviewFn={contractOverviewFn}
                />
              )}
            </div>
          )}
        </div>

        {contractOverview && (
          <ContractOverviewTransaction
            communication={communication}
            setCommunication={setCommunication}
            addDownpaymentFn={addDownpaymentFn}
            addDownpayment={addDownpayment}
            delDownpaymentFn={delDownpaymentFn}
            paymentSuccess={paymentSuccess}
            setPaymentSuccess={setPaymentSuccess}
            paymentSuccessFn={paymentSuccessFn}
          />
        )}

        {paymentSuccess && <PaymentSuccessSection />}
      </div>
    </>
  );
};

export default TransactionChoose;
