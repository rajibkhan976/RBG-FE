import React, { useEffect, useState, useRef, useCallback } from "react";
import modalTopIcon from "../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../assets/images/cross.svg";
import profileAvatar from "../../../../assets/images/camera.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import loadImg from "../../../../assets/images/loadImg.gif";
import Loader from "../../../shared/Loader";
import config from "../../../../configuration/config";
import { CourseServices } from "../../../../services/setup/CourseServices";
import { Scrollbars } from "react-custom-scrollbars-2";
import { CustomizationServices } from "../../../../services/setup/CustomizationServices";
import * as actionTypes from "../../../../actions/types";
import { useDispatch } from "react-redux";

const AddCourseModal = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [courseData, setCourseData] = useState({
    category: "",
    name: "",
    desc: "",
    image: "",
    duration: 1,
    duration_months: "month",
    payment_type: "onetime",
    billing_cycle: "monthly",
    fees: "",
    ageGroup: "",
    ageGroupId: "",
    imageUrl: profileAvatar,
    tax: 0,
    disabledCycle: true
  });
  const [ageGroup, setAgeGroup] = useState([]);

  const [errorClass, setErrorClass] = useState({
    name: "",
    nameMsg: "",
    fees: "",
    feesMsg: "",
    duration: "",
    durationMsg: "",
    paymentType: "",
    paymentTypeMsg: "",
    ageGroupIdMsg: ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAgeGroup();
  },[]);

  let customOption = {
      _id: "default",
      createdAt: "0",
      createdBy: "0",
      max: "0",
      min: "0",
      name: "Select option",
      orgId: "0",
      updatedAt: "0",
      updatedBy: "0",
  }
  const fetchAgeGroup = async() => {
    try {
      const res = await CustomizationServices.fetchAgeGroup();
      setAgeGroup(res.agegroups);
      // alert("age group");
      
      if (!Object.keys(props.editCourseItem).length) {
        res.agegroups.splice(0,0,customOption);
        console.log(res.agegroups);
        setCourseData((prevState) => ({...prevState, ageGroupId: (res.agegroups.length)?res.agegroups[0]._id:""}));
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    }
  }

  const paymentType = [
    "Onetime",
    "Recurring"
  ];

  const [categories, setCategories] = useState([]);
  const [btnType, setBtnType] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    if (Object.keys(props.editCourseItem).length) {
      const updateItem = props.editCourseItem;
      const durationArr = updateItem.duration.split(" ");
      console.log("Update Item", updateItem);
      setCourseData({
        category: updateItem.categoryID,
        name: updateItem.name,
        desc: updateItem.description,
        image: updateItem.image,
        duration: durationArr[0],
        duration_months: durationArr[1],
        payment_type: updateItem.payment_type,
        billing_cycle: updateItem.billing_cycle,
        fees: updateItem.fees,
        ageGroup: updateItem?.ageGroup,
        ageGroupId: updateItem?.ageGroupId,
        id: updateItem._id,
        imageUrl: (updateItem.image) ? config.bucketUrl + updateItem.image : profileAvatar,
        tax: 0,
        disabledCycle: (updateItem.payment_type === "onetime") ? true : false
      });
      setIsEditing(true);
    };

  }, [props.editCourseItem])

  const handleImageUpload = (event) => {
    setCourseData({ ...courseData, imageUrl: loadImg });
    const files = event.target.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (read) => {
        // setLogo(read.target.result);
        CourseServices.imageUpload({
          file: read.target.result,
          name: files[0].name
        }).then((result) => {
          const avatar = result.data.publicUrl;
          setCourseData({ ...courseData, image: result.data.originalKey, imageUrl: result.data.publicUrl });
          console.log(avatar);
        }).catch(err => {
          console.log('Profile pic error', err);
          setCourseData({ ...courseData, imageUrl: profileAvatar });
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  const handleChange = (e) => {
    const elemName = e.target.name;
    const elemValue = e.target.value;
    const regex = {
      floatRegex: /[^0-9.]/,
      alphaRegex: /[^a-zA-Z0-9- ]/,
      intRegex: /[^0-9]/,
    };
    switch (elemName) {
      case "category":
        setCourseData({ ...courseData, category: elemValue });
        break;
      case "fees":
        if (!regex.floatRegex.test(elemValue)) {
          setCourseData({ ...courseData, fees: elemValue });
          setErrorClass(prevState => ({ ...prevState, fees: "", feesMsg: "" }));
        }
        break;
      case "courseName":
        if (!regex.alphaRegex.test(elemValue)) {
          setCourseData({ ...courseData, name: elemValue });
          setErrorClass(prevState => ({ ...prevState, name: "", nameMsg: "" }));
        }
        break;
      case "productDesc":
        setCourseData({ ...courseData, desc: elemValue });
        break;
      case "duration_num":
        if (!regex.intRegex.test(elemValue)) {
          setCourseData({ ...courseData, duration: elemValue });
          setErrorClass(prevState => ({ ...prevState, duration: "", durationMsg: "" }));
        }
        break;
      case "duration_months":
        setCourseData({ ...courseData, duration_months: elemValue, billing_cycle: (elemValue == "week" ? "weekly" : (elemValue == "month" ? "monthly" : "yearly")) });
        break;
      case "paymentType":
        setCourseData({ ...courseData, payment_type: elemValue, disabledCycle: (elemValue === "onetime") ? true : false });
        setErrorClass(prevState => ({ ...prevState, paymentType: "", paymentTypeMsg: "" }));
        break;
      case "billingCycle":
        setCourseData({ ...courseData, billing_cycle: elemValue });
        setErrorClass(prevState => ({ ...prevState, paymentType: "", paymentTypeMsg: "" }));
        break;
      case "age_group":
        setCourseData({ ...courseData, ageGroupId: elemValue });
        setErrorClass(prevState=> ({ ...prevState, ageGroupId: "", ageGroupIdMsg:""}));
        break;
    }
  }

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setIsLoader(true);
    try {
      if (createValidation()) {
        const data = {
          category: (courseData.category) ? courseData.category : categories[0]._id,
          name: courseData.name,
          desc: (courseData.desc) ? courseData.desc : "",
          image: (courseData.image) ? courseData.image : "",
          duration: courseData.duration + " " + courseData.duration_months,
          payment_type: courseData.payment_type,
          billing_cycle: courseData.billing_cycle,
          fees: courseData.fees.toString(),
          ageGroup: courseData.ageGroupId
        };
        console.log("Data to be updated or added", data);
        let msg;
        if (courseData.id) {
          const updateData = { ...data, id: courseData.id };
          msg = await CourseServices.editCourse(updateData);
        } else {
          const res = await CourseServices.createCourse(data);
          if (!res._id) {
            // setErrorMsg("Error adding course. Please try again");
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: "Error while adding course, Please try again",
              typeMessage: 'error'
            });
          } else {
            msg = "Program added successfully";
          }
        }
        if (btnType !== "SaveNew") {
          console.log("Inisde Save");
          // setSuccessMsg(msg);
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: msg,
            typeMessage: 'success'
          });
          props.closeCourseModal("fetch");
          // setTimeout(function () {
          // }, messageDelay);
        } else {
          props.retriveCourses(false);
          props.retrieveCategories();
          console.log("Inside save and new");
          // setSuccessMsg(msg);
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: msg,
            typeMessage: 'success'
          });
          setCourseData({
            category: "",
            name: "",
            desc: "",
            image: "",
            duration: 1,
            duration_months: "month",
            payment_type: "onetime",
            billing_cycle: "monthly",
            fees: "",
            ageGroup: "Adults",
            imageUrl: profileAvatar,
            tax: 0
          });
        }
        setBtnType("");
      }
    } catch (e) {
      // setErrorMsg(e.message);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setIsLoader(false);
    }
  }

  const createValidation = () => {
    
    // return true;
    let bool = true;
    if (courseData.name === "") {
      bool = false;
      setErrorClass(prevState => ({ ...prevState, name: "error", nameMsg: "Please enter a valid program name" }));
    }
    console.log(courseData.ageGroupId);
    if(courseData.ageGroupId === 'default'){
      // alert("age group id");
      setErrorClass(prevState =>({...prevState, ageGroupId: "error", ageGroupIdMsg: "Please select any age group"}))
    }
    if (courseData.duration <= 0) {
      bool = false;
      setErrorClass(prevState => ({ ...prevState, duration: "error", durationMsg: "Program duration should not be 0 or empty" }));
    }

    if (courseData.fees === "" || parseFloat(courseData.fees) <= 0) {
      bool = false;
      setErrorClass(prevState => ({ ...prevState, fees: "error", feesMsg: "Program fees should not be 0 or empty" }));
    }
    //5 digit 2 decimal places
    let twoDecimalregex = /^\d{0,5}(\.\d{1,2})?$/;
    if (!twoDecimalregex.test(courseData.fees)) {
      setErrorClass(prevState => ({ ...prevState, fees: "error", feesMsg: "Program fees should not be more than 5 digit 2 decimal places" }));
    }

    if (courseData.duration == 1 && courseData.duration_months === "month" && courseData.payment_type === "recurring") {
      bool = false;
      setErrorClass(prevState => ({ ...prevState, duration: "error", durationMsg: "Recurring program duration should be more than 1 month atleast" }));
    } else if (courseData.duration_months === "month" && courseData.billing_cycle === "yearly" && courseData.payment_type === "recurring") {
      bool = false;
      setErrorClass(prevState => ({ ...prevState, paymentType: "error", paymentTypeMsg: "Recurring yearly billing cycle should have more than a year duration" }));
    } else if (courseData.duration == 1
      && courseData.duration_months === "year"
      && courseData.payment_type === "recurring"
      && courseData.billing_cycle === "yearly") {
      // throw new Error("Recurring program duration should be more than 1 year atleast for year billing cycle");
      bool = false;
      setErrorClass(prevState => ({ ...prevState, paymentType: "error", paymentTypeMsg: "Recurring program duration should be more than 1 year atleast for year billing cycle" }));
    }

    setTimeout(
      () => setErrorClass({
        name: "",
        nameMsg: "",
        fees: "",
        feesMsg: "",
        duration: "",
        durationMsg: "",
        paymentType: "",
        paymentTypeMsg: "",
        ageGroupIdMsg: ""        
      }),
      4000
    );

    return bool;
  }

  // const handleTaxCheck = (isChecked) => setCourseData({ ...courseData, tax: (isChecked) ? 1 : 0 });

  return (
    <>
      <div className="modalBackdrop modalProductAdd">
      <div className="dialogBg" onClick={props.closeCourseModal}></div>
        {isLoader ? <Loader /> : ''}
        <div className="slickModalBody">
          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeCourseModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={modalTopIcon} alt="" /></div>
            <h3>{(isEditing) ? "Edit" : "Add"} a Program</h3>
            <p>Choose a category to add a new program below</p>
          </div>
          <div className="modalForm addProgramFrom">
            <Scrollbars
              renderThumbVertical={(props) => <div className="thumb-vertical" />}
            >
              <form method="post" onSubmit={handleSubmit}>
                <div className="formControl">
                  <label>Select Category</label>
                  <select name="category" onChange={handleChange} value={courseData.category}>
                    {categories.map(cat => {
                      return (
                        <>
                          <option key={cat._id + "_cat"} value={cat._id}>{cat.name}</option>
                        </>
                      );
                    })}

                  </select>
                </div>

                <div className={"formControl " + errorClass.name}>
                  <label>Enter Program Name</label>
                  <input type="text" placeholder="Ex: Jujutsu program" name="courseName"
                    onChange={handleChange}
                    className="cmnFieldStyle"
                    value={courseData.name} />
                  <p className="errorMsg">{errorClass.nameMsg}</p>
                </div>

                <div className="formControl">
                  <label>Enter Program Description</label>
                  {/* <textarea name="productDesc" onChange={handleChange}>{courseData.desc}</textarea> */}
                  <input type="text" placeholder="Small description here" name="productDesc"
                    onChange={handleChange}
                    value={courseData.desc} />
                </div>

                <div className="formControl">
                  <label>Upload Program Picture</label>
                  <div className="profile">
                    <div className="profileUpload">
                      <input type="file" onChange={(e) => handleImageUpload(e)} />
                      {/* <span>Upload</span> */}
                    </div>
                    <div className="profilePicture">
                      <img src={courseData.imageUrl} alt="" />
                    </div>
                    <div className="profileText"> Program Picture</div>

                  </div>
                </div>

                <div className={"formControl " + errorClass.duration}>
                  <label>Duration</label>
                  <div className="formLeft">
                    <input type="text"
                      className="cmnFieldStyle"
                      name="duration_num"
                      onChange={handleChange}
                      value={courseData.duration} />
                    <p className="errorMsg">{errorClass.durationMsg}</p>
                  </div>
                  <div className={"formRight " + errorClass.duration}>
                    <select name="duration_months" onChange={handleChange} value={courseData.duration_months}>
                      <option value="week">Week(s)</option>
                      <option value="month">Month(s)</option>
                      <option value="year">Year(s)</option>
                    </select>
                  </div>
                </div>

                <div className={"formControl " + errorClass.paymentType}>
                  <div className="formLeft">
                    <label>Payment Type</label>
                    <select name="paymentType" className="cmnFieldStyle" onChange={handleChange} value={courseData.payment_type.toLowerCase()}>
                      {paymentType.map(pt => <option key={pt + "_pt"} value={pt.toLowerCase()}>{pt}</option>)}
                    </select>
                    <p className="errorMsg">{errorClass.paymentTypeMsg}</p>
                  </div>


                  <div className="formRight">
                    <label>Billing Cycle</label>
                    <select className="selectBox" name="billingCycle" onChange={handleChange} disabled={courseData.disabledCycle || courseData.duration_months == "month" || courseData.duration_months == "week"} value={courseData.billing_cycle}>
                      <option value="Weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    {/* {courseData.duration_months == "month" ?
                    <select className="selectBox" name="billingCycle" onChange={handleChange} disabled={courseData.disabledCycle} value={courseData.billing_cycle}>
                      <option value="monthly">Monthly</option>
                    </select>
                    : "" }
                    {courseData.duration_months == "week" ?
                    <select className="selectBox" name="billingCycle" onChange={handleChange} disabled={courseData.disabledCycle} value={courseData.billing_cycle}>
                      <option value="Weekly">Weekly</option>
                    </select>
                    : "" } */}
                  </div>
                </div>

                <div className="formControl">
                  <div className="formLeft">
                    <label>Select Age Group</label>
                        {/* <select
                          name="age_group"
                          value={courseData.ageGroupId}
                          defaultValue={"default"}
                          onChange={handleChange}
                        >
                          <option value={"default"}>Choose an option</option>
                          {ageGroup.map((ag, index)=>{
                            return(
                              <>
                              <option key={index} value={ag._id}>{ag.name}</option>
                              </>
                              
                            )
                          })}
                        </select> */}
              
                    
                    <select name="age_group" onChange={handleChange} value={courseData.ageGroupId} defaultValue={"default"}>
                      {ageGroup.map((ag, index) => {
                        return (
                          <>
                            <option key={index+ "_ag"} value={ag._id}>{ag.name}</option>                         
                          </>
                        );
                      })
                      }
                    </select>
                    <p className="errorMsg">{errorClass.ageGroupIdMsg}</p>
                  </div>

                  <div className={"formRight programModals " + errorClass.fees}>
                    <label>Fees</label>
                    <div className="preField">
                      {/* <span className="smallspan">* default currency is<strong> USD</strong></span> */}
                      <div className="unitAmount">$</div>
                      <input className="cmnFieldStyle" type="text" name="fees" placeholder="Ex: 99" onChange={handleChange} value={courseData.fees} />
                    </div>
                    <p className="errorMsg">{errorClass.feesMsg}</p>
                  </div>
                </div>
                {/* <div className="formControl">
                  <label className="labelStick2">
                    <div className="customCheckbox">
                      <input type="checkbox"
                        name="saleTax"
                        onChange={(e) => handleTaxCheck(e.target.checked)}
                        checked={(courseData.tax) ? true : false}
                      />
                      <span></span>
                    </div>
                    Add Sales Tax (10%)</label>
                </div> */}
                <div className="modalbtnHolder w-100">
                  {props.inProgramTransation === "yes" ?
                    <React.Fragment>
                      <button type="submit" name="save"
                        className="saveNnewBtn"
                        onClick={() => setBtnType("Save")}><span>Save and Select</span><img src={arrow_forward} /></button>
                    </React.Fragment> :
                    <React.Fragment>
                      <button type="submit" name="save"
                        className="saveNnewBtn"
                        onClick={() => setBtnType("Save")}><span>{(isEditing) ? "Update" : "Save"}</span><img src={arrow_forward} alt="" /></button>
                      <button type="submit" name="saveNew"
                        className="saveNnewBtn"
                        onClick={() => setBtnType("SaveNew")}><span>{(isEditing) ? "Update" : "Save"} &amp; New</span><img src={arrow_forward} alt="" /></button>
                    </React.Fragment>
                  }

                </div>
              </form>
            </Scrollbars>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddCourseModal;