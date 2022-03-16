import React, { useEffect, useState, useRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/no_downpayment.svg";
import modalTopIcon from "../../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import profileAvatar from "../../../../../assets/images/camera.svg";
import chooseImg from "../../../../../assets/images/chooseImg.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";

const ProgramTransaction = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [addPogramModal, setAddPogramModal] = useState(false);
  const [chooseCategory, setChooseCategory] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(null);
  const [programList, setProgramList] = useState([
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Jujutsu",
    },
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Unlimitted 1 year contract",
    },
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Junior martial arts",
    },
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Fitness kickboxing",
    },
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Little dragons",
    },
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Unlimitted 1 year contract",
    },
    {
      "_id": "61e91a3bc58a0c00092f50d0",
      "name": "Jujutsu",
    }
  ]);
  const selectProgramRef = useRef();
  

  const chooseCategoryFn = () => {
    setChooseCategory(true);
  };
  
  const addPogramModalFn = () => {
    setAddPogramModal(true);
  };


  const closePogramModal = () => {
    setAddPogramModal(false);
  };

  const [addManually, setAddManually] = useState(false);


  const [toggleContactList, setToggleContactList] = useState({
    status: false,
    listContent: [],
  });

  const toggleContactListFn = (e) => {
    e.preventDefault();

    let contactListOp = toggleContactList;

    setToggleContactList({
      ...toggleContactList,
      status: e.target.value.trim() === "" ? false : true,
    });
  };


  const [communication, setCommunication] = useState(false);
  const [downPayTime, setDownPayTime] = useState(false);
  const [downPayTime2, setDownPayTime2] = useState(false);
  const [firstBillingTime, setFirstBillingTime] = useState(false);

    const [addDownpayment, setAddDownpayment] = useState(false);
    const addDownpaymentFn = (e) => {
      e.preventDefault();
      setAddDownpayment(true);
    };
  
    const delDownpaymentFn = (e) => {
      e.preventDefault();
      setAddDownpayment(false);
    };
    const [paymentDate1, setPaymentDate1] = useState("");
    const paymentDateHandel1 = (e) => {
      setPaymentDate1(e.target.value);
      console.log(paymentDate1);
    };

    const [paymentDate, setPaymentDate] = useState("");

    const paymentDateHandel = (e) => {
      setPaymentDate(e.target.value);
      console.log(paymentDate);
    };

    const [firstBillingDate, setFirstBillingDate] = useState("");
    const firstBillingDateHandel = (e) => {
      setFirstBillingDate(e.target.value);
      console.log(firstBillingDate);
    };


    const selectProgram = (item, index) => {
      setSelectedProgram(item);
      setSelectedProgramIndex(index);
      setChooseCategory(false);
    };

    const checkOutsideClick = (e) => {
      console.log('out side click', e.target, selectProgramRef.current);
      if (!selectProgramRef && !selectProgramRef.current.contains(e.target)) {
        console.log("Return");
        return;
        
      }
      console.log("Out Return");
      setChooseCategory(false);
    };

    useEffect(() => {
      document.addEventListener("mousedown", checkOutsideClick);
      return () => {
          document.removeEventListener("mousedown", checkOutsideClick);
      }
    }, []);

    const closeAddProgModal = () => {
      setAddPogramModal(false);
    };


    return (
        <form>
                        <div className="transaction_form products forProducts">



                          {/* Custom Select Box with inbuild Button starts */}

                          <div className="formsection gap">

                              <div className="cmnFormRow">
                                <label className="labelWithInfo">
                                      <span className="labelHeading">Select Category</span>
                                      <span className="infoSpan">
                                          <img src={info_icon} alt="" />
                                          <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                      </span>
                                </label>
                                
                                <div
                                  className={chooseCategory
                                      ? "cmnFormField programsTransaction listActive"
                                      : "cmnFormField programsTransaction"
                                  }
                                >
                                  <input
                                    className="cmnFieldStyle"
                                    type="text"
                                    placeholder="Eg. Steve Martyns" value={selectedProgram ? selectedProgram.name : "Select a program"}
                                    //onChange={(e)=>props.toggleContactListFn(e)}
                                    onClick={chooseCategoryFn}
                                  />
                                  {chooseCategory && (
                                  // {props.toggleContactList.status && (
                                    <>
                                      <div className="contactListItems" ref={selectProgramRef}>
                                        <button 
                                          className="btn"
                                          onClick={(e)=>{
                                            e.preventDefault()
                                            setAddManually(true)
                                            toggleContactListFn(e)
                                            addPogramModalFn()
                                          }}
                                        >+ Add Manually</button>
                                        <ul>
                                          {programList.map((item, index) => {
                                            return (
                                              <li onClick={() => selectProgram (item, index)} key={index} className={selectedProgramIndex == index ? "active" : ""}>{item.name}</li>
                                            )
                                          })}
                                        </ul>          
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              


                              </div>

                              

                            <div className="formsection gap">
                                <label className="labelWithInfo">
                                    <span className="labelHeading">Duration</span>
                                    <span className="infoSpan">
                                        <img src={info_icon} alt="" />
                                        <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </label>
                                <span className="leftSecTransaction">
                                    <input type="text" className="editableInput" />
                                </span>
                                <span className="rightSecTransaction">
                                    <select className="selectBox">
                                        <option value="">Month(s)</option>
                                    </select>
                                </span>
                            </div>


                            <div className="formsection gap">
                                
                                <span className="leftSecTransaction">

                                    <label className="labelWithInfo">
                                      <span className="labelHeading">Payment Type</span>
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                    <select className="selectBox">
                                        <option value="">Recurring</option>
                                    </select>
                                </span>
                                <span className="rightSecTransaction">

                                {/* <span className="labelWithInfo">
                                  <span className="labelHeading">Billing Cycle</span>
                                    <span className="infoSpan">
                                        <img src={info_icon} alt="" />
                                        <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span> */}
                                <label className="labelWithInfo">
                                      <span className="labelHeading">Billing Cycle</span>
                                        <span className="infoSpan">
                                            <img src={props.info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                    <select className="selectBox">
                                        <option value="">Monthly</option>
                                    </select>
                                </span>
                            </div>

                            {/* <div className="formsection gap"> */}
                                {/* <span className="labelWithInfo">
                                    <label>Tuition Amount</label>
                                    <span className="infoSpan">
                                        <img src={props.info_icon} alt="" />
                                        <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span> */}
                                {/* <label className="labelWithInfo">
                                      <span className="labelHeading">Tution Amount</span>
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                <input type="number" placeholder="149" className="editableInput numberType" value="149"/> */}
                            {/* </div>cmnFormRow */}




                            <div className="formsection gap">
                                <div className="cmnFormCol">
                                    <label className='labelWithInfo'>
                                        <span>Tution Amount</span>
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                    <div className='cmnFormField preField'>
                                        <div className='unitAmount'>
                                            $
                                        </div>
                                        <input type="text" className="cmnFieldStyle" />
                                    </div>
                                </div>
                                <div className="cmnFormCol">
                                    <label className='labelWithInfo'>
                                        <span>Payment Mode</span>
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                    
                                    <div className='cmnFormField'>
                                        <select className='selectBox'>
                                            <option value="null">Cash</option>
                                            <option value="1">Card</option>
                                            <option value="2">Bank Transfer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>









                            <div className="formsection gap">
                                
                                <div className="leftSecTransaction">
                                    <label className="labelWithInfo">
                                      <span className="labelHeading">First Billing Date</span>
                                      <label className="labelWithInfo paymentTime firstBillTime">
                                            <span className="labelHeading">I want to Pay Later</span>
                                            <label
                                              className={firstBillingTime ? "toggleBtn active" : "toggleBtn"
                                              }
                                            >
                                              <input
                                                type="checkbox"
                                                name="check-communication"
                                                onChange={(e) =>
                                                  e.target.checked
                                                    ? setFirstBillingTime(true)
                                                    : setFirstBillingTime(false)
                                                }
                                              />
                                              <span className="toggler"></span>
                                            </label>
                                        </label>
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                    <div className={firstBillingTime ? "paymentNow" : "paymentNow display"} >
                                      <p>Payment date <span>Now</span></p>
                                    </div>
                                    <div className={firstBillingTime ? "paymentNow display" : "paymentNow"} >
                                      <input type="date" placeholder="mm/dd/yyyy" onChange={firstBillingDateHandel}  className="editableInput" defaultValue={firstBillingDate} />
                                    </div>
                                </div>
                                <div className="rightSecTransaction">

                                <label className="labelWithInfo">
                                      <span className="labelHeading">Program Start Date</span>
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </label>
                                <input type="date" placeholder="mm/dd/yyyy" onChange={props.programStartDateHandel}  className="editableInput" defaultValue={props.programStartDate} />
                                </div>
                            </div>


                            <div className="formsection gap autoRenew">
                              <span className="labelWithInfo">
                                <label><div className="customCheckbox"><input type="checkbox" name="" id="" /><span></span></div>Auto Renewal</label>
                                <span className="infoSpan">
                                  <img src={info_icon} alt="" />
                                  <span className="tooltiptextInfo">Recurring payment will continue irrespective of duration of the program until it's cancelled.</span>
                                </span>
                              </span>
                            </div>

                           

                            <div className="formsection gap autoRenew">
                                <div className="autoRenewDate">
                                  <img src={bell} alt="" />
                                  <p>Next Payment Due Date <span className="renewDate">03 / 01 / 2022</span></p>
                                </div>
                            </div>

                            {/* <div className={courseList.length > 0 ? "formsection gap" : "formsection gap disabled"}>
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
                            </div> */}
                        </div>
                        <div className="productAvailable downpayment active">
                          <div className="downPaymentToogle">
                          <header className="informHeader"><h5>Down Payment <span className="cartCount">0</span></h5></header>
                            <label
                                className={communication ? "toggleBtn active" : "toggleBtn"
                                }
                              >
                                <input
                                  type="checkbox"
                                  name="check-communication"
                                  onChange={(e) =>
                                    e.target.checked
                                      ? setCommunication(true)
                                      : setCommunication(false)
                                  }
                                />
                                <span className="toggler"></span>
                              </label>
                              
                            </div>
                            <div className="previewBox">
                                <div className={communication ? "previewImgBox course" : "previewImgBox course display"
                                }>
                                  <div className="nodownpaymentInfos">
                                    <img src={downpayment} alt="" />
                                    <p className="noDownpaymentText">Down Payment is Disabled</p>
                                  </div>
                                </div>
                                <div className={communication ? "previewDownpaymentBox display" : "previewDownpaymentBox"
                                }>
                                   <div className="newDownpayment">
                                    
                                      <button className="addNewDownpayment" onClick={addDownpaymentFn}>+ Add</button>
                                      <div className="transaction_form products forDownpayment">
                                        <div className="formsection gap">
                                          <label className="labelWithInfo">
                                              <span className="labelHeading">Title</span>
                                                <span className="infoSpan">
                                                    <img src={info_icon} alt="" />
                                                    <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                          </label>
                                            <input type="text" className="cmnFieldStyle" />
                                        </div>
                                        <div className="formsection gap">                                
                                            <div className="leftSecTransaction">
                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Amount</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo amount">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                  </span>
                                            </label>
                                                <input type="number" placeholder="149" className="editableInput numberType" value="149"/>
                                            </div>
                                            <div className="rightSecTransaction">

                                            <label className="labelWithInfo paymentTime">
                                                <span className="labelHeading">I want to Pay Later</span>
                                                  {/* <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span> */}
                                                <label
                                                  className={downPayTime ? "toggleBtn active" : "toggleBtn"
                                                  }
                                                >
                                                  <input
                                                    type="checkbox"
                                                    name="check-communication"
                                                    onChange={(e) =>
                                                      e.target.checked
                                                        ? setDownPayTime(true)
                                                        : setDownPayTime(false)
                                                    }
                                                  />
                                                  <span className="toggler"></span>
                                                </label>
                                            </label>
                                            <div className={downPayTime ? "paymentNow" : "paymentNow display"} >
                                              <p>Payment date <span>Now</span></p>
                                            </div>
                                            <div className={downPayTime ? "paymentNow display" : "paymentNow"} >
                                              <input type="date" placeholder="mm/dd/yyyy" onChange={paymentDateHandel1}  className="editableInput" value={paymentDate1} />
                                            </div>
                                            </div>
                                        </div>
                                        <div className="formsection gap">
                                
                                          <div className="leftSecTransaction">
                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Mode</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo paymentType">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <select className="selectBox">
                                                  <option value="">Recurring</option>
                                              </select>
                                          </div>
                                          <div className="rightSecTransaction">

                                          <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Status</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo paymentStatus">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <select className="selectBox">
                                                  <option value="">Unpaid</option>
                                              </select>
                                          </div>
                                        </div>
                                      </div>
                                     
                                   </div>


                                  {addDownpayment && (
                                   <div className="newDownpayment">
                                    
                                      <button className="delNewDownpayment" onClick={delDownpaymentFn}><img src={deleteBtn} alt="" /> Delete</button>
                                      <div className="transaction_form products forDownpayment">
                                        <div className="formsection gap">
                                          <label className="labelWithInfo">
                                                <span className="labelHeading">Title</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                            <input type="text" className="cmnFieldStyle" />
                                        </div>
                                        
                                        <div className="formsection gap">                                
                                            <div className="leftSecTransaction">
                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Amount</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo amount">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                                <input type="number" placeholder="149" className="editableInput numberType" value="149"/>
                                            </div>


                                            <div className="rightSecTransaction">

                                            <label className="labelWithInfo paymentTime">
                                                <span className="labelHeading">I want to Pay Later</span>
                                                  {/* <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span> */}
                                                <label
                                                  className={downPayTime2 ? "toggleBtn active" : "toggleBtn"
                                                  }
                                                >
                                                  <input
                                                    type="checkbox"
                                                    name="check-communication"
                                                    onChange={(e) =>
                                                      e.target.checked
                                                        ? setDownPayTime2(true)
                                                        : setDownPayTime2(false)
                                                    }
                                                  />
                                                  <span className="toggler"></span>
                                                </label>
                                            </label>
                                            <div className={downPayTime2 ? "paymentNow" : "paymentNow display"} >
                                              <p>Payment date <span>Now</span></p>
                                            </div>
                                            <div className={downPayTime2 ? "paymentNow display" : "paymentNow"} >
                                            <input type="date" placeholder="mm/dd/yyyy" onChange={paymentDateHandel} className="editableInput" value={paymentDate} />
                                            </div>
                                            </div>
                                        </div>
                                        <div className="formsection gap">
                                
                                          <div className="leftSecTransaction">
                                          <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Mode</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo paymentType">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <select className="selectBox">
                                                  <option value="">Recurring</option>
                                              </select>
                                          </div>
                                          <div className="rightSecTransaction">

                                          <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Status</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span className="tooltiptextInfo paymentStatus">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <select className="selectBox">
                                                  <option value="">Unpaid</option>
                                              </select>
                                          </div>
                                        </div>
                                      </div>
                                    
                                   </div>
                                  )}

                                </div>
                                {/* <h3>{ courseName }</h3>
                                <p className="category"> <img src={categoryTag} alt="" /> { catName }</p>
                                   
                                <h4>$ { Number(courseFees).toFixed(2) }</h4>
                                <span className="tax"> * Amount showing including taxes </span> */}
                            </div>


                                {addPogramModal && ( 
                                  <div className="modalDependent modalAddCourses modalBackdrop">
                                    {isLoader ? <Loader /> : ''}
                                        <div className="slickModalBody">
                                          <div className="slickModalHeader coursesModalHeader">
                                            <button type="button" className="topCross" onClick={closeAddProgModal}><img src={crossTop} alt="" /></button>
                                            <div className="circleForIcon"><img src={modalTopIcon} alt="" /></div>
                                            <h3 className="courseModalHeading">Add a Program</h3>
                                            <p className="courseModalPara">Choose a category to add a new program below</p>
                                          </div>
                                          <div className="modalForm pograms">
                                            {/* <Scrollbars> */}
                                              
                                                <div className="formControl">
                                                  <label>Select Category</label>
                                                  <select name="category">                    
                                                    <option value="">Select Category</option>
                                                  </select>
                                                </div>

                                                <div className="formControl">
                                                  <label>Enter Program Name</label>
                                                  <input type="text" placeholder="Ex: v-shape gym vest" name="courseName" />
                                                </div>

                                                <div className="formControl">
                                                  <label>Enter Program Description</label>
                                                  <input type="text" placeholder="Small description here" name="productDesc"/>
                                                </div>

                                                <div className="formControl cmnFormRow">
                                                  
                                                  <label className='cmnFieldName d-flex f-justify-between'>Upload Program Picture</label>
                                                    <div className='cmnFormField'>
                                                        <div className="imageUpload d-flex f-align-center">
                                                            <input 
                                                                type="file" 
                                                                accept='image/jpeg, image/jpg, image/png, image/gif, image/bmp'/>
                                                            <figure 
                                                                className="visualPicture">
                                                                
                                                                <img src={chooseImg} alt="" />
                                                            </figure>
                                                            <div className="uploadImageText" >Program picture</div>
                                                            <span className='staticUpload'>Upload</span>
                                                        </div>
                                                    </div>
                                                </div> 


                                                <div className="formControl">
                                                  <label className="labelWithInfo">
                                                    <span className="labelHeading">Duration</span>
                                                      <span className="infoSpan">
                                                          <img src={info_icon} alt="" />
                                                          <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                      </span>
                                                  </label>
                                                  {/* <label>Duration</label> */}
                                                  <div className="formLeft">
                                                    <input type="text" name="duration_num" />
                                                  </div>
                                                  <div className="formRight">
                                                    <select name="duration_months">
                                                      <option value="month">Month(s)</option>
                                                      <option value="year">Year(s)</option>
                                                    </select>
                                                  </div>
                                                </div>

                                                <div className="formControl">
                                                  <div className="formLeft">
                                                  <label className="labelWithInfo">
                                                    <span className="labelHeading">Payment Type</span>
                                                      <span className="infoSpan">
                                                          <img src={info_icon} alt="" />
                                                          <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                      </span>
                                                  </label>
                                                    {/* <label>Payment Type</label> */}
                                                    <select name="paymentType">
                                                      <option>Cash</option>
                                                    </select>
                                                  </div>


                                                  <div className="formRight">
                                                  <label className="labelWithInfo">
                                                    <span className="labelHeading">Billing Cycle</span>
                                                      <span className="infoSpan">
                                                          <img src={info_icon} alt="" />
                                                          <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                      </span>
                                                  </label>
                                                    {/* <label>Billing Cycle</label> */}
                                                    <select name="billingCycle">
                                                      <option value="monthly">Monthly</option>
                                                      <option value="yearly">Yearly</option>
                                                    </select>
                                                  </div>
                                                </div>

                                                {/* <div className="formControl">
                                                  <div className="formLeft">
                                                    <label>Select Age Group</label>
                                                    <select name="age_group">                      
                                                      <option>18+</option>
                                                    </select>
                                                  </div>

                                                  <div className="formRight">
                                                    <label>Fees</label>
                                                    <input type="text" name="fees" placeholder="Ex: 99" />
                                                    <span className="smallspan">* default currency is<strong> USD</strong></span>
                                                  </div>
                                                </div> */}
                                                {/* <div className="formControl">
                                                  <label className="labelStick2">
                                                    <div className="customCheckbox">
                                                      <input type="checkbox"
                                                        name="saleTax"/>
                                                      <span></span>
                                                    </div>
                                                    Add Sales Tax (10%)</label>
                                                </div> */}
                                                <div className="modalbtnHolder saveCourses">
                                                  <button type="submit" name="save"
                                                    className="saveNnewBtn programModal"><span>Update</span><img src={arrow_forward} alt="" /></button>
                                                  <button type="submit" name="saveNew"
                                                    className="saveNnewBtn programModal"><span>Save &amp; New</span><img src={arrow_forward} alt="" /></button>
                                                </div>
                                              
                                            {/* </Scrollbars> */}
                                          </div>

                                        </div>
                                  </div>
                                )}


                            {/* <button className={props.courseSelected ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={props.buyCourse}>Buy <img src={aaroww} alt="" /></button> */}
                        </div>
                        <div className="continueBuy">
                          <button className="saveNnewBtn" onClick={props.contractOverviewFn}>Continue to Buy <img src={aaroww} alt="" /></button>
                        </div>
                    </form>
    );
};

export default ProgramTransaction;