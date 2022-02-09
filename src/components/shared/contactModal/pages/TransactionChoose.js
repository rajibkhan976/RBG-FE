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


const TransactionChoose = (props) => {

    const messageDelay = 10000;

    const [choosePOS, setChoosetPOS] = useState(false);
    const [chooseCourse, setChooseCourse] = useState(false);
    const [paymentDate, setPaymentDate] = useState("");    
    const [addDownpayment, setAddDownpayment] = useState(false);
    const [addManually, setAddManually] = useState(false)
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
    const [toggleContactList, setToggleContactList] = useState({
      status: false,
      listContent: [],
    });


    const dispatch = useDispatch();

    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg]);

    const chooseTransctionTypePOS = () => {
        setChoosetPOS(!choosePOS);
        setChooseCourse(false);
        fetchProductCategory();
    }
    const chooseTransctionTypeCourse = async () => {
        try {
            setShowLoader(true);
            setChoosetPOS(false);
            setChooseCourse(!chooseCourse);
            const list = await BillingServices.fetchCardBank(props.contactId);
            if (!list.cards.length || !list.banks.length) throw new Error("Please set the contact's billing info first");
            fetchCourseCategories();
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setShowLoader(false);
        }
    }


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
    }

    const choseCatHandel = (e) => {
        let catID = e.target.value;
        console.log("This is cat ID -> " + catID);
        fetchCourses(catID);
        setCourseFees("");
        setCatName(e.target[e.target.selectedIndex].getAttribute("data-name"));
    }

    const fetchCourses = async (catID) => {
        setShowLoader(true);
        let result = await CourseServices.fetchCourseList(catID);
        setShowLoader(false);
        console.log("Courses -> " + result.courses);
        setCourseList(result.courses);
    }

    const getCourseFees = (e) => {
        let courseFees = e.target.value;
        setCourseFees(courseFees);
        setCourseName(e.target[e.target.selectedIndex].getAttribute("data-name"));
        setCourseId(e.target[e.target.selectedIndex].getAttribute("data-courseId"));
        setCourseImg(e.target[e.target.selectedIndex].getAttribute("data-img"));
        setCourseDuration(e.target[e.target.selectedIndex].getAttribute("data-duration"));
        setCourseSelected(true);
    }

    const buyCourse = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                contact: props.contactId,
                courseID: courseId
            }
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
    }


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
    }

    const fetchProductCategory = async () => {
        setShowLoader(true);
        let relult = await ProductServices.fetchCategory();
        setProductCatList(relult);
        setShowLoader(false);
    }

    const fetchProductList = async (catID) => {
        setShowLoader(true);
        let relult = await ProductServices.fetchProducts(catID);
        setProductList(relult.products);
        setShowLoader(false);
    }

    const choseSizeHandel = (e, key) => {
        e.preventDefault();
        setChosedSize(e.target.value);
        setSizeIndex(key);
    }

    const choseColorHandel = (e, key) => {
        setChosedColor(e.target.value);
        setColorIndex(key);
        console.log(e.target.value);
        console.log(key);
    }

    const chosePosProductHandel = (e) => {
        setPosSelectedProductIndex(e.target.value);
        console.log(e.target.value);
        setColors(productList[e.target.value].associatedColors);
        setSize(productList[e.target.value].size);
        setProductImg("https://wrapperbucket.s3.us-east-1.amazonaws.com/" + productList[e.target.value].image);
        setProductImgName(productList[e.target.value].image);

        let price = parseFloat(productList[e.target.value].price);
        let taxPercent = parseFloat(e.target[e.target.selectedIndex].getAttribute("data-tax"));
        let taxAmmount = (price * taxPercent) / 100;
        setProductPrice(price);
        setProductPriceTax(price + taxAmmount);

        setProductName(productList[e.target.value].name);
        setTax(taxPercent);
        resetProductHandel();

    }

    const resetProductHandel = () => {
        setChosedColor("");
        setChosedSize("");
        setColorIndex();
        setSizeIndex();
    }

    const buyProduct = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                "contact": props.contactId,
                "category": posSelectedCat,
                "categoryName": productCatName,
                "productName": productName,
                "colors": [chosedColor],
                "image": productImgName,
                "price": productPriceTax,
                "size": [chosedSize],
                "taxPercent": tax
            }
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
    }

    const paymentDateHandel = (e) => {
      setPaymentDate(e.target.value);
      console.log(paymentDate);
    }
    
    const addDownpaymentFn = (e) => {
      e.preventDefault();
      setAddDownpayment(true);
    };

    const delDownpaymentFn = (e) => {
      e.preventDefault();
      setAddDownpayment(false);
    }


    const toggleContactListFn = (e) => {
      e.preventDefault();;
  
      let contactListOp = toggleContactList;
  
      setToggleContactList({
        ...toggleContactList,
        status: e.target.value.trim() === "" ? false : true,
      });
    };

    return (
        <>
            <div className="contactTabsInner">

                <div className="transHeader pos">
                    <div class="backToTransction">
                        <button className="backBtn" onClick={props.backToTransList}><img src={arrow_forward} alt="" /></button>
                    </div>
                    <div>
                        <h3 className="headingTabInner">Make a Transaction {/* <span className="posTag">POS</span> */} </h3>
                        <span>* Explanatory text blurb should be here.</span>
                    </div>

                </div>
                <div className="chooseTransactionType">
                    <label>
                        <div class="circleRadio">
                            <input type="radio"
                                name="transactionType"
                                onChange={chooseTransctionTypePOS}
                            /><span></span>
                        </div> Product
                    </label>
                    <label>
                        <div class="circleRadio">
                            <input type="radio"
                                name="transactionType"
                                onChange={chooseTransctionTypeCourse}
                            /><span></span>
                        </div> Program
                    </label>
                </div>
                {choosePOS && 
                <div className="posSellingForm">
                    {showLoader && <Loader />}
                    {successMsg &&
                        <div className="formMsg success">{successMsg}</div>
                    }
                    {errorMsg &&
                        <div className="formMsg error">{errorMsg}</div>
                    }
                    {/* posSelectedCat={posSelectedCat}
                    chosePosProductHandel={chosePosProductHandel}
                    productList={productList}
                    posSelectedProductIndex={posSelectedProductIndex}
                    colors={colors}
                    colorIndex={colorIndex}
                    choseColorHandel={choseColorHandel}
                    size={size}
                    sizeIndex={sizeIndex}
                    choseSizeHandel={choseSizeHandel}
                    productPrice={productPrice}
                    productPriceHandel={productPriceHandel}
                    tax={tax}
                    chosedColor={chosedColor}
                    chosedSize={chosedSize}
                    productName={productName}
                    productCatName={productCatName}
                    productPriceTax={productPriceTax}
                    buyProduct={buyProduct} */}
                    <ProductTransaction
                    />
                </div>
                }
                {chooseCourse && 
                <div className="posSellingForm">
                    {showLoader && <Loader />}
                    {successMsg &&
                        <div className="formMsg success">{successMsg}</div>
                    }
                    {errorMsg &&
                        <div className="formMsg error">{errorMsg}</div>
                    }
                    <ProgramTransaction
                        toggleContactList={toggleContactList}
                        toggleContactListFn={toggleContactListFn}
                        setAddManually={setAddManually}
                        addManually={addManually}
                        communication={communication}
                        addDownpaymentFn={addDownpaymentFn}
                        addDownpayment={addDownpayment}
                        delDownpaymentFn={delDownpaymentFn}
                        choseCatHandel={choseCatHandel}
                        paymentDateHandel={paymentDateHandel}
                        paymentDate={paymentDate}
                        courseSelected={courseSelected}
                        buyCourse={buyCourse}
                        setCommunication={setCommunication}
                    />
                </div>
                }
            </div>
        </>
    );
}

export default TransactionChoose;