import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../actions/types";
import aaroww from "../../../../assets/images/arrow_forward.svg";
import arrow_forward from "../../../../assets/images/backIcon.svg";
import camera from "../../../../assets/images/camera.svg";
import categoryTag from "../../../../assets/images/categoryTag.svg";
import { BillingServices } from "../../../../services/billing/billingServices";
import { CourseServices } from "../../../../services/setup/CourseServices";
import { ProductServices } from "../../../../services/setup/ProductServices";
import Loader from "../../Loader";



const TransactionChoose = (props) => {

    const messageDelay = 10000;

    const [choosePOS, setChoosetPOS] = useState(false);
    const [chooseCourse, setChooseCourse] = useState(false);
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

    const chosePosCatHandel = (e) => {
        setPosSelectedCat(e.target.value);
        fetchProductList(e.target.value);
        setProductCatName(e.target[e.target.selectedIndex].getAttribute("data-name"));
        resetProductHandel();
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
                {choosePOS && <div className="posSellingForm">
                    {showLoader && <Loader />}
                    {successMsg &&
                        <div className="formMsg success">{successMsg}</div>
                    }
                    {errorMsg &&
                        <div className="formMsg error">{errorMsg}</div>
                    }
                    <form>
                        <div className="transaction_form">
                            <div className="formsection gap">
                                <label>Select Program</label>
                                <select className="selectBox" onChange={chosePosCatHandel}>
                                    <option value="" >Select Pogram</option>
                                    {productCatList.map((item, key) => (
                                        <option key={"productCat_" + key} value={item._id} data-name={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={posSelectedCat ? "formsection gap" : "formsection gap disabled"}>
                                <label>Select Product</label>
                                <select className="selectBox" onChange={chosePosProductHandel}>
                                    <option>Select Product</option>
                                    {productList.map((item, key) => (
                                        <option key={"productKey_" + key} value={key} data-tax={item.taxPercent} >{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div class={posSelectedProductIndex ? "formControl" : "formControl hide"}>
                                <label>Available Colours</label>
                                <div class="pickColor">
                                    {/* <button className={"addColor"} style={{ backgroundColor: "#834140" }}>
                                         <img src={addActive ? tick : ""} alt=""/>
                                    </button> */}
                                    {colors.map((item, key) => (
                                        <button type="button" className={colorIndex === key ? "addColor active " + item : "addColor " + item}
                                            style={{ backgroundColor: item.colorcode }}
                                            onClick={(event) => {
                                                choseColorHandel(event, key)
                                            }}
                                            value={item.label}
                                            key={key} >

                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div class={posSelectedProductIndex ? "formControl" : "formControl hide"}>
                                <label>Available Sizes</label>
                                <div class="pickSize">
                                    {/* <button className={addActive2 ? "size active" :  "size"}  onClick={activeClassHandler2}>S</button> */}
                                    {size.map((item, key) => (
                                        <button type="button" className={sizeIndex === key ? "size active" : "size"} onClick={(e) => choseSizeHandel(e, key)} value={item} >{item}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="formsection">
                                <label>Price</label>
                                <input type="text" placeholder="Ex: 99" className="editableInput"
                                    value={productPrice}
                                    onChange={productPriceHandel} />
                                {(tax !== 0) ? <span className="tax"> X {tax}% tax will be applicable</span> : ''}
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable">
                            <h3 className="commonHeadding">Preview Windows</h3>
                            <div className="previewBox">
                                <div className="previewImgBox">
                                    <span className={chosedColor ? "sizeTag " + chosedColor : "sizeTag"}>{chosedSize}</span>
                                    <img src={productImg} alt="" />
                                </div>
                                <h3>{productName}</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> {productCatName}</p>

                                <h4>$ {productPriceTax}</h4>
                                <span className="tax"> * Amount showing including taxes </span>
                            </div>

                            <button class={chosedColor && chosedSize && productPrice ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={buyProduct}>Buy <img src={aaroww} alt="" /></button>
                        </div>
                    </form>
                </div>
                }
                {chooseCourse && <div className="posSellingForm">
                    {showLoader && <Loader />}
                    {successMsg &&
                        <div className="formMsg success">{successMsg}</div>
                    }
                    {errorMsg &&
                        <div className="formMsg error">{errorMsg}</div>
                    }
                    <form>
                        <div className="transaction_form">
                            <div className="formsection gap">
                                <label>Select Category</label>
                                <select className="selectBox" onChange={choseCatHandel}>
                                    <option value="">Select category</option>
                                    {courseCategory.map((item, key) => (
                                        <option key={"category_" + key} value={item._id} data-name={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={courseList.length > 0 ? "formsection gap" : "formsection gap disabled"}>
                                <label>Select program</label>
                                <select className="selectBox" onChange={getCourseFees} value={courseFees ? courseFees : ''}>
                                    {courseList.length > 0 ? <option value="">Select a course</option> : ""}
                                    {courseList.length > 0 ? courseList.map((item, key) => {
                                        return (<option key={"course_" + key} value={item.fees} data-name={item.name} data-img={item.image} data-duration={item.duration} data-courseId={item._id}>{item.name}</option>)
                                    }) : <option>No programs available</option>}
                                </select>
                            </div>

                            <div className={courseFees ? "formsection" : "formsection disabled"}>
                                <label>Price</label>
                                <div className="cmnFieldStyle editableInput">{courseFees}</div>
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable active">
                            <h3 className="commonHeadding">Preview Windows</h3>
                            <div className="previewBox">
                                <div className="previewImgBox course">
                                    <span className="sizeTag duration">{courseDuration ? courseDuration + "(s)" : ""}</span>
                                    <img src={"https://wrapperbucket.s3.us-east-1.amazonaws.com/" + courseImg} alt="" />

                                </div>
                                <h3>{ courseName }</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> { catName }</p>
                                   
                                <h4>$ { Number(courseFees).toFixed(2) }</h4>
                                <span className="tax"> * Amount showing including taxes </span>
                            </div>

                            <button class={courseSelected ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={buyCourse}>Buy <img src={aaroww} alt="" /></button>
                        </div>
                    </form>
                </div>
                }
            </div>
        </>
    );
}

export default TransactionChoose;