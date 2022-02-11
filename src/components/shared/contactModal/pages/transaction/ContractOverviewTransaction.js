import React, { useEffect, useState, useRef } from "react";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/downpayment.svg";
import modalTopIcon from "../../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import profileAvatar from "../../../../../assets/images/camera.svg";
import chooseImg from "../../../../../assets/images/chooseImg.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import Loader from "../../../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";



const ContractOverviewTransaction = (props) => {
  
  const [contractOverview, setContractOverview] = useState(false);

  const [isLoader, setIsLoader] = useState(false);

  const [addPogramModal, setAddPogramModal] = useState(false);
  
  const addPogramModalFn = () => {
    setAddPogramModal(true);
  };


  const closePogramModal = () => {
    setAddPogramModal(false);
  };
  
  const contractOverviewFn = (e) => {
    e.preventDefault();
    setContractOverview(true);
  };


 


    return (
      <div className="posSellingForm contractOverview">
                    {props.showLoader && <Loader />}
                    {props.successMsg &&
                        <div className="formMsg success"></div>
                    }
                    {props.errorMsg &&
                        <div className=""></div>
                    }



<div className="productAvailable downpayment active">
                          <div className="downPaymentToogle">
                          <h3 className="commonHeadding">Down Payment <span className="downPaymentsCount">2 </span></h3>
                            <label
                                className={props.communication ? "toggleBtn active" : "toggleBtn"
                                }
                              >
                                <input
                                  type="checkbox"
                                  name="check-communication"
                                  onChange={(e) =>
                                    e.target.checked
                                      ? props.setCommunication(true)
                                      : props.setCommunication(false)
                                  }
                                />
                                <span className="toggler"></span>
                              </label>
                              
                            </div>
                            <div className="previewBox">
                                <div className={props.communication ? "previewImgBox course" : "previewImgBox course display"
                                }>
                                    <img src={downpayment} alt="" />

                                </div>
                                <div className={props.communication ? "previewDownpaymentBox display" : "previewDownpaymentBox"
                                }>
                                   <div className="NewDownpayment">
                                    <form>
                                      <button className="addNewDownpayment" onClick={props.addDownpaymentFn}>+ Add</button>
                                      <div className="transaction_form products forDownpayment">
                                        <div className="formsection gap">
                                        <label className="labelWithInfo">
                                            <span className="labelHeading">Select Category</span>
                                              <span className="infoSpan">
                                                  <img src={info_icon} alt="" />
                                                  <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                              </span>
                                         </label>
                                            <select className="selectBox">
                                                <option value="">Select category</option>
                                            </select>
                                        </div>
                                        <div className="formsection gap">                                
                                            <div className="leftSecTransaction">
                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Amount</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo amount">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                  </span>
                                            </label>
                                                <input type="number" placeholder="149" class="editableInput numberType" value="149"/>
                                            </div>
                                            <div className="rightSecTransaction">

                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Date</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <input type="date" placeholder="mm/dd/yyyy" onChange={props.paymentDateHandel1}  class="editableInput" value={props.paymentDate1} />

                                            </div>
                                        </div>
                                        <div className="formsection gap">
                                
                                          <div className="leftSecTransaction">
                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Type</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo paymentType">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
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
                                                      <span class="tooltiptextInfo paymentStatus">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <select className="selectBox">
                                                  <option value="">Unpaid</option>
                                              </select>
                                          </div>
                                        </div>
                                      </div>
                                     </form>
                                   </div>


                                  {props.addDownpayment && (
                                   <div className="NewDownpayment">
                                    <form>
                                      <button className="delNewDownpayment" onClick={props.delDownpaymentFn}><img src={deleteBtn} alt="" /> Delete</button>
                                      <div className="transaction_form products forDownpayment">
                                        <div className="formsection gap">
                                        <label className="labelWithInfo">
                                                <span className="labelHeading">Select Category</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                            <select className="selectBox" onChange={props.choseCatHandel}>
                                                <option value="">Select category</option>
                                            </select>
                                        </div>
                                        <div className="formsection gap">                                
                                            <div className="leftSecTransaction">
                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Amount</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo amount">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                                <input type="number" placeholder="149" class="editableInput numberType" value="149"/>
                                            </div>
                                            <div className="rightSecTransaction">

                                            <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Date</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <input type="date" placeholder="mm/dd/yyyy" onChange={props.paymentDateHandel} class="editableInput" value={props.paymentDate} />
                                            </div>
                                        </div>
                                        <div className="formsection gap">
                                
                                          <div className="leftSecTransaction">
                                          <label className="labelWithInfo">
                                                <span className="labelHeading">Payment Type</span>
                                                  <span className="infoSpan">
                                                      <img src={info_icon} alt="" />
                                                      <span class="tooltiptextInfo paymentType">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
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
                                                      <span class="tooltiptextInfo paymentStatus">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </label>
                                              <select className="selectBox">
                                                  <option value="">Unpaid</option>
                                              </select>
                                          </div>
                                        </div>
                                      </div>
                                     </form>
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
                                            <button className="topCross" onClick={props.closeCourseModal}><img src={crossTop} alt="" /></button>
                                            <div className="circleForIcon"><img src={modalTopIcon} alt="" /></div>
                                            <h3 className="courseModalHeading">Add a Program</h3>
                                            <p className="courseModalPara">Choose a category to add a new program below</p>
                                          </div>
                                          <div className="modalForm pograms">
                                            <Scrollbars>
                                              <form method="post">
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

                                                <div className="formControl">
                                                  <label>Upload Program Picture</label>
                                                  <div className="profile uploads">
                                                    <div className="profileUpload">
                                                      <input type="file"  />
                                                      <span className="uploadText">Upload</span>
                                                    </div>
                                                    <div className="profilePicture">
                                                      <img src={chooseImg} alt="" />
                                                    </div>
                                                    <div className="profileText"> Course Picture</div>

                                                  </div>
                                                </div>

                                                <div className="formControl">
                                                  <label className="labelWithInfo">
                                                    <span className="labelHeading">Duration</span>
                                                      <span className="infoSpan">
                                                          <img src={info_icon} alt="" />
                                                          <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
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
                                                          <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
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
                                                          <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
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
                                                    className="saveNnewBtn"><span>Update</span><img src={arrow_forward} alt="" /></button>
                                                  <button type="submit" name="saveNew"
                                                    className="saveNnewBtn"><span>Save &amp; New</span><img src={arrow_forward} alt="" /></button>
                                                </div>
                                              </form>
                                            </Scrollbars>
                                          </div>

                                        </div>
                                  </div>
                                )}


                            {/* <button class={props.courseSelected ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={props.buyCourse}>Buy <img src={aaroww} alt="" /></button> */}
                        </div>                    

<div className="transaction_form products forProducts"></div>

      </div>
    );
};

export default ContractOverviewTransaction;