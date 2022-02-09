import React from 'react';
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import updown from "../../../../../assets/images/updown.png";
import deleteBtn from "../../../../../assets/images/deleteBtn.svg";
import downpayment from "../../../../../assets/images/downpayment.svg";

const ProgramTransaction = (props) => {
    return (
        <form>
                        <div className="transaction_form products forProducts">



                          {/* Custom Select Box with inbuild Button starts */}

                          <div className="formsection gap">

                              <div className="cmnFormRow">
                                <span className="labelWithInfo">
                                      <label>Select Category</label>
                                      <span className="infoSpan">
                                          <img src={info_icon} alt="" />
                                          <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                      </span>
                                </span>
                                {/* <div className="cmnFieldName d-flex f-justify-between">
                                  Name
                                  {addManually && 
                                  <button
                                    className="inlinle-btn"
                                    onClick={(e)=>{
                                      e.preventDefault()
                                      setAddManually(false)
                                    }}
                                  >
                                    Select from Contacts
                                  </button>}
                                </div> */}
                                <div
                                  className={props.toggleContactList.status
                                      ? "cmnFormField programsTransaction listActive"
                                      : "cmnFormField programsTransaction"
                                  }
                                >
                                  <input
                                    className="cmnFieldStyle"
                                    type="text"
                                    placeholder="Eg. Steve Martyns"
                                    onChange={(e)=>props.toggleContactListFn(e)}
                                    style={{
                                      backgroundImage: props.toggleContactList.status
                                        ? `url(${updown})`
                                        : "",
                                    }}
                                  />
                                  {/* <span className="errorMsg">Please provide name.</span> */}
                                  {props.toggleContactList.status && (
                                    <>
                                      <div className="contactListItems">
                                        <button 
                                          className="btn"
                                          onClick={(e)=>{
                                            e.preventDefault()
                                            props.setAddManually(true)
                                            props.toggleContactListFn(e)
                                          }}
                                        >+ Add Manually</button>
                                        <ul>
                                          <li>Abhisek Bose1</li>
                                        </ul>          
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              {/* {props.addManually &&
                                <div className="cmnFormRow">
                                  <div className="cmnFormCol">
                                    <div className="cmnFieldName">Birthday</div>
                                    <div className="cmnFormField">
                                      <input
                                        className="cmnFieldStyle"
                                        type="date"
                                        placeholder="dd/mm/yyyy"
                                      />
                                    </div>
                                  </div>
                                  <div className="cmnFormCol">
                                    <div className="cmnFieldName">Gender</div>
                                    <div className="cmnFormField radioGroup">
                                      <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                          <input type="radio" name="gender-dep" />
                                          <span></span>
                                        </div>
                                        Male
                                      </label>
                                      <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                          <input type="radio" name="gender-dep" />
                                          <span></span>
                                        </div>
                                        Female
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              } */}


                              </div>

                              {/* Custom Select Box with inbuild Button ends */}



                            <div className="formsection gap">
                                <span className="labelWithInfo">
                                    <label>Select Category</label>
                                    <span className="infoSpan">
                                        <img src={props.info_icon} alt="" />
                                        <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span>
                                <select className="selectBox">
                                    <option value="">Select category</option>
                                </select>
                            </div>

                            <div className="formsection gap">
                                <span className="labelWithInfo">
                                    <label>Duration</label>
                                    <span className="infoSpan">
                                        <img src={props.info_icon} alt="" />
                                        <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span>
                                <span className="leftSecTransaction">
                                    <input type="text" placeholder="12" class="editableInput" value="12" />
                                </span>
                                <span className="rightSecTransaction">
                                    <select className="selectBox">
                                        <option value="">Month(s)</option>
                                    </select>
                                </span>
                            </div>


                            <div className="formsection gap">
                                
                                <span className="leftSecTransaction">

                                    <span className="labelWithInfo">
                                        <label>Payment Type</label>
                                        <span className="infoSpan">
                                            <img src={props.info_icon} alt="" />
                                            <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </span>
                                    <select className="selectBox">
                                        <option value="">Recurring</option>
                                    </select>
                                </span>
                                <span className="rightSecTransaction">

                                <span className="labelWithInfo">
                                    <label>Billing Cycle</label>
                                    <span className="infoSpan">
                                        <img src={props.info_icon} alt="" />
                                        <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span>
                                    <select className="selectBox">
                                        <option value="">Monthly</option>
                                    </select>
                                </span>
                            </div>

                            <div className="formsection gap">
                                <span className="labelWithInfo">
                                    <label>Tuition Amount</label>
                                    <span className="infoSpan">
                                        <img src={props.info_icon} alt="" />
                                        <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span>
                                <input type="number" placeholder="149" class="editableInput numberType" value="149"/>
                            </div>

                            <div className="formsection gap">
                                
                                <span className="leftSecTransaction">

                                    <span className="labelWithInfo">
                                        <label>First Billing Date</label>
                                        <span className="infoSpan">
                                            <img src={props.info_icon} alt="" />
                                            <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                        </span>
                                    </span>
                                    <input type="date" placeholder="mm/dd/yyyy" class="editableInput" value="02/02/2222" />
                                </span>
                                <span className="rightSecTransaction">

                                <span className="labelWithInfo">
                                    <label>Program Start Date</label>
                                    <span className="infoSpan">
                                        <img src={props.info_icon} alt="" />
                                        <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </span>
                                </span>
                                  <input type="date" placeholder="mm/dd/yyyy" class="editableInput" value="02/02/2222" />
                                </span>
                            </div>


                            <div className="formsection gap autoRenew">
                              <span className="labelWithInfo">
                                <label><div class="customCheckbox"><input type="checkbox" name="" id="" /><span></span></div>Auto Renewal</label>
                                <span className="infoSpan">
                                  <img src={props.info_icon} alt="" />
                                  <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
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
                              <h3 className="commonHeadding">Down Payment (S)</h3>
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
                                            <span className="labelWithInfo">
                                                <label>Select Category</label>
                                                <span className="infoSpan">
                                                    <img src={props.info_icon} alt="" />
                                                    <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </span>
                                            <select className="selectBox">
                                                <option value="">Select category</option>
                                            </select>
                                        </div>
                                        <div className="formsection gap">                                
                                            <span className="leftSecTransaction">
                                                <span className="labelWithInfo">
                                                    <label>Amount</label>
                                                    <span className="infoSpan">
                                                        <img src={props.info_icon} alt="" />
                                                        <span class="tooltiptextInfo amount">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                    </span>
                                                </span>
                                                <input type="number" placeholder="149" class="editableInput numberType" value="149"/>
                                            </span>
                                            <span className="rightSecTransaction">

                                            <span className="labelWithInfo">
                                                <label>Payment Date</label>
                                                <span className="infoSpan">
                                                    <img src={props.info_icon} alt="" />
                                                    <span class="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </span>
                                              <input type="date" placeholder="mm/dd/yyyy" class="editableInput" value="02/02/2222" />
                                            </span>
                                        </div>
                                        <div className="formsection gap">
                                
                                          <span className="leftSecTransaction">
                                              <span className="labelWithInfo">
                                                  <label>Payment Type</label>
                                                  <span className="infoSpan">
                                                      <img src={props.info_icon} alt="" />
                                                      <span class="tooltiptextInfo paymentType">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                  </span>
                                              </span>
                                              <select className="selectBox">
                                                  <option value="">Recurring</option>
                                              </select>
                                          </span>
                                          <span className="rightSecTransaction">

                                          <span className="labelWithInfo">
                                              <label>Payment Status</label>
                                              <span className="infoSpan">
                                                  <img src={props.info_icon} alt="" />
                                                  <span class="tooltiptextInfo paymentStatus">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                              </span>
                                          </span>
                                              <select className="selectBox">
                                                  <option value="">Unpaid</option>
                                              </select>
                                          </span>
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
                                            <span className="labelWithInfo">
                                                <label>Select Category</label>
                                                <span className="infoSpan">
                                                    <img src={props.info_icon} alt="" />
                                                    <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </span>
                                            <select className="selectBox" onChange={props.choseCatHandel}>
                                                <option value="">Select category</option>
                                            </select>
                                        </div>
                                        <div className="formsection gap">                                
                                            <span className="leftSecTransaction">
                                                <span className="labelWithInfo">
                                                    <label>Amount</label>
                                                    <span className="infoSpan">
                                                        <img src={props.info_icon} alt="" />
                                                        <span class="tooltiptextInfo amount">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                    </span>
                                                </span>
                                                <input type="number" placeholder="149" class="editableInput numberType" value="149"/>
                                            </span>
                                            <span className="rightSecTransaction">

                                            <span className="labelWithInfo">
                                                <label>Payment Date</label>
                                                <span className="infoSpan">
                                                    <img src={props.info_icon} alt="" />
                                                    <span class="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </span>
                                            </span>
                                              <input type="date" placeholder="mm/dd/yyyy" onChange={props.paymentDateHandel} class="editableInput" value={props.paymentDate} />
                                            </span>
                                        </div>
                                        <div className="formsection gap">
                                
                                          <span className="leftSecTransaction">
                                              <span className="labelWithInfo">
                                                  <label>Payment Type</label>
                                                  <span className="infoSpan">
                                                      <img src={props.info_icon} alt="" />
                                                      <span class="tooltiptextInfo paymentType">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                  </span>
                                              </span>
                                              <select className="selectBox">
                                                  <option value="">Recurring</option>
                                              </select>
                                          </span>
                                          <span className="rightSecTransaction">

                                          <span className="labelWithInfo">
                                              <label>Payment Status</label>
                                              <span className="infoSpan">
                                                  <img src={props.info_icon} alt="" />
                                                  <span class="tooltiptextInfo paymentStatus">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                              </span>
                                          </span>
                                              <select className="selectBox">
                                                  <option value="">Unpaid</option>
                                              </select>
                                          </span>
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

                            <button class={props.courseSelected ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={props.buyCourse}>Buy <img src={aaroww} alt="" /></button>
                        </div>
                    </form>
    );
};

export default ProgramTransaction;