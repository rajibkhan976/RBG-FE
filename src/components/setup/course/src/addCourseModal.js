import React, { useEffect, useState, useRef } from "react";
import modalTopIcon from "../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../assets/images/cross.svg";
import profileAvatar from "../../../../assets/images/camera.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import loadImg from "../../../../assets/images/loadImg.gif";
import Loader from "../../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
import config from "../../../../configuration/config";
import { CourseServices } from "../../../../services/setup/CourseServices";
import { Scrollbars } from "react-custom-scrollbars-2";

const AddCourseModal = (props) => {
  const messageDelay = 5000;
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    ageGroup: "Adults",
    imageUrl: profileAvatar,
    tax: 0,
    disabledCycle: true
  });
  const [ageGroup, setAgeGroup] = useState([
    "Adults",
    "Juniors",
    "LII Dragons",
    "Teens"
  ]);

  const [errorClass, setErrorClass] = useState({
    name: "",
    nameMsg: "",
    fees: "",
    feesMsg: "",
    duration: "",
    durationMsg: "",
    paymentType: "",
    paymentTypeMsg: ""
  });

  const [paymentType, setpaymentType] = useState([
    "Onetime",
    "Recurring"
  ]);

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
        category: updateItem.categoryID[0],
        name: updateItem.name,
        desc: updateItem.description,
        image: updateItem.image,
        duration: durationArr[0],
        duration_months: durationArr[1],
        payment_type: updateItem.payment_type,
        billing_cycle: updateItem.billing_cycle,
        fees: updateItem.fees,
        ageGroup: updateItem.ageGroup,
        id: updateItem._id,
        imageUrl: (updateItem.image) ? config.bucketUrl + updateItem.image : profileAvatar,
        tax: 0,
        disabledCycle: (updateItem.payment_type === "onetime") ? true : false
      });
      setIsEditing(true);
    };

  }, [props.editCourseItem])

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

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
        setCourseData({ ...courseData, duration_months: elemValue });
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
        setCourseData({ ...courseData, ageGroup: elemValue });
        break;
    }
  }

  const handleSubmit = async (e) => {
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
          ageGroup: courseData.ageGroup,
          tax: "0"
        };
        console.log("Data to be updated or added", data);
        let msg;
        if (courseData.id) {
          const updateData = { ...data, id: courseData.id };
          msg = await CourseServices.editCourse(updateData);
        } else {
          const res = await CourseServices.createCourse(data);
          if (!res._id) {
            setErrorMsg("Error adding course. Please try again");
          } else {
            msg = "Program added successfully";
          }
        }
        if (btnType !== "SaveNew") {
          console.log("Inisde Save");
          setSuccessMsg(msg);
          setTimeout(function () {
            props.closeCourseModal("fetch");
          }, messageDelay);
        } else {
          props.retriveCourses(false);
          props.retrieveCategories();
          console.log("Inside save and new");
          setSuccessMsg(msg);
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
      setErrorMsg(e.message);
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
        paymentTypeMsg: ""
      }),
      4000
    );

    return bool;
  }

  const handleTaxCheck = (isChecked) => setCourseData({ ...courseData, tax: (isChecked) ? 1 : 0 });

  return (
    <>
      {successMsg &&
        <SuccessAlert message={successMsg} extraclassName="coursePopupMsg"></SuccessAlert>
      }
      {errorMsg &&
        <ErrorAlert message={errorMsg} extraclassName="coursePopupMsg"></ErrorAlert>
      }
      <div className="modalBackdrop modalProductAdd">
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
                  <input type="text" placeholder="Ex: v-shape gym vest" name="courseName"
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
                    <select className="selectBox" name="billingCycle" onChange={handleChange} disabled={courseData.disabledCycle} value={courseData.billing_cycle}>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <div className="formControl">
                  <div className="formLeft">
                    <label>Select Age Group</label>
                    <select name="age_group" onChange={handleChange} value={courseData.ageGroup}>
                      {ageGroup.map(ag => {
                        return (
                          <>
                            <option key={ag + "_ag"} value={ag}>{ag}</option>
                          </>
                        );
                      })}

                    </select>
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