import React, { useState, useEffect } from "react";
import aaroww from "../../../../assets/images/arrow_forward.svg";
import arrow_forward from "../../../../assets/images/backIcon.svg";
import tick from "../../../../assets/images/tick.svg";
import camera from "../../../../assets/images/camera.svg";
import categoryTag from "../../../../assets/images/categoryTag.svg";
import { CourseServices } from "../../../../services/setup/CourseServices";
import Loader from "../../Loader";

  

const TransactionChoose = (props) => {

    const messageDelay = 10000;

    const [choosePOS, setChoosetPOS] = useState(false);
    const [chooseCourse, setChooseCourse] = useState(false);
    const [courseCategory, setCourseCategory] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [courseFees, setCourseFees] = useState(0);
    const [courseName, setCourseName] = useState("Course not selected");
    const [courseId, setCourseId] = useState("");
    const [catName, setCatName] = useState("Category not selected");
    const [courseSelected, setCourseSelected] = useState(false);
    const [courseImg, setCourseImg] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    

    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg]);

    
    const chooseTransctionTypePOS = () => {
        setChoosetPOS(!choosePOS);
        setChooseCourse(false)
    }
    const chooseTransctionTypeCourse = () => {
        setChoosetPOS(false);
        setChooseCourse(!chooseCourse);
        fetchCourseCategories();
    }

    const [addActive, setAddActive] = useState(false);
    const activeClassHandler = (event) => {
        event. preventDefault();
        setAddActive(!addActive);
    };
    const [addActive2, setAddActive2] = useState(false);
    const activeClassHandler2 = (event) => {
        event. preventDefault();
        setAddActive2(!addActive2);
    };

    const fetchCourseCategories = async () => {
        setShowLoader(true);
        let result = await CourseServices.fetchCategory();
        setShowLoader(false);
        setCourseCategory(result);
        console.log(result);
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
            
            console.log("Buy course response- " + result);
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setShowLoader(false);
        }
        
    }


    return(
        <>
            <div className="contactTabsInner">
                
                <div className="transHeader pos">
                    <div class="backToTransction">
                        <button className="backBtn" onClick={props.backToTransList}><img src={arrow_forward} alt=""/></button>
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
                        </div> Course
                    </label>
                </div>
               { choosePOS && <div className="posSellingForm">
                    <form>
                        <div className="transaction_form">
                            <div className="formsection gap">
                                <label>Select Category</label>
                                <select className="selectBox">
                                    <option>Select Category</option>
                                </select>
                            </div>
                            <div className="formsection gap">
                                <label>Select Product</label>
                                <select className="selectBox">
                                    <option>Select Product</option>
                                </select>
                            </div>
                            <div class="formControl">
                                <label>Available Colours</label>
                                <div class="pickColor">
                                    <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#834140" }} onClick={activeClassHandler}>
                                         <img src={addActive ? tick : ""} alt=""/>
                                    </button>
                                    {/* <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#369ED5" }} onClick={activeClassHandler}>
                                        <img src={addActive ? tick : ""} alt=""/>
                                    </button>
                                    <button className={addActive ? "addColor active" :  "addColor"} style={{ backgroundColor: "#797D62" }} onClick={activeClassHandler}>
                                        <img src={addActive ? tick : ""} alt=""/>
                                    </button> */}
                                    <button className="addColor" style={{ backgroundColor: "#369ED5" }}></button>
                                    <button className="addColor"  style={{ backgroundColor: "#797D62" }}></button>
                                </div>
                            </div>
                            <div class="formControl">
                                <label>Available Sizes</label>
                                <div class="pickSize">
                                    <button className={addActive2 ? "size active" :  "size"}  onClick={activeClassHandler2}>S</button>
                                    {/* <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>M</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>L</button>
                                    <button className={addActive ? "size active" :  "size"}  onClick={activeClassHandler}>XL</button> */}
                                    <button className="size">M</button>
                                    <button className="size">L</button>
                                </div>
                            </div>
                            <div className="formsection">
                                <label>Price</label>
                                <input type="text" placeholder="Ex: 99" className="editableInput"/> <span className="tax"> * 10% tax will be applicable</span>
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable">
                            <h3 className="commonHeadding">Preview Windows</h3>
                            <div className="previewBox">
                                <div className="previewImgBox">
                                    <span className="sizeTag">S</span>
                                    <img src={camera} alt="" />
                                   <span> Preview image</span>
                                </div>
                                <h3>Product Name</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> Category</p>
                                   
                                <h4>$ 000</h4>
                                <span className="tax"> * Amount showing including taxes </span>
                            </div>

                            <button class="saveNnewBtn">Buy <img src={aaroww} alt=""/></button>
                        </div>
                    </form>
                </div>
               }
                { chooseCourse && <div className="posSellingForm">
                { showLoader && <Loader /> }
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
                                    { courseCategory.map((item, key) => (
                                        <option key={"category_" + key} value={item._id} data-name={ item.name }>{ item.name }</option>
                                    ))}
                                </select>
                            </div>
                            <div className="formsection gap">
                                <label>Select Course</label>
                                <select className="selectBox" onChange={getCourseFees} value={courseFees ? courseFees : ''}>
                                    { courseList.length > 0 ? <option value="">Select a course</option> : ""}
                                    { courseList.length > 0 ? courseList.map((item, key) => {
                                        return (<option key={"course_" + key} value={item.fees} data-name={item.name} data-img={item.image} data-duration={item.duration} data-courseId={item._id}>{ item.name }</option>)
                                        }) : <option>No courses available</option>}
                                </select>
                            </div>
                            
                            <div className="formsection">
                                <label>Price</label>
                                <div className="cmnFieldStyle editableInput">{ courseFees }</div>
                                <p>* default currency is <strong>USD</strong></p>
                            </div>
                        </div>
                        <div className="productAvailable active">
                            <h3 className="commonHeadding">Preview Windows</h3>
                            <div className="previewBox">
                                <div className="previewImgBox course">
                                    <span className="sizeTag duration">{courseDuration}</span>
                                    <img src={"https://wrapperbucket.s3.us-east-1.amazonaws.com/" + courseImg} alt="" />
                                 
                                </div>
                                <h3>{ courseName }</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> { catName }</p>
                                   
                                <h4>$ { courseFees }</h4>
                                <span className="tax"> * Amount showing including taxes </span>
                            </div>

                            <button class={courseSelected ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={buyCourse}>Buy <img src={aaroww} alt=""/></button>
                        </div>
                    </form>
                </div>
                }
            </div>
        </>
    );
}

export default TransactionChoose;