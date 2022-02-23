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

const ProductPayment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [downPayments, setDownPayments] = useState([]);
  const [downPaymentActive, setDownPaymentActive] = useState(false);
  const [tempDownPayObj, setTempDownPayObj] = useState(null)

  const checkAndSetDownPayments = (e) => {
    e.preventDefault();
  };

  return (
    <form className="productPaymentTransaction">
      <div className="gridCol">
        <div className="cartProductInner productDownPayment">
          <header class="informHeader d-flex f-align-center f-justify-between">
            <h5>
              Down Payment{" "}
              <span class="cartCount">
                {downPayments.length > 0 ? downPayments.length : 0}
              </span>
            </h5>

            <label
              className={downPaymentActive ? "toggleBtn active" : "toggleBtn"}
            >
              <input
                type="checkbox"
                name="down-payment-active"
                onChange={() => setDownPaymentActive(!downPaymentActive)}
              />
              <span className="toggler"></span>
            </label>
          </header>
          {downPaymentActive && (
            <div className="bodytransactionForm">
              {downPayments &&
                downPayments.length > 0 &&
                downPayments.map((downpay, i) => (
                    <></>
                //   <div className="newDownpayment">
                //     <button
                //       className="addNewDownpayment"
                //       onClick={props.addDownpaymentFn}
                //     >
                //       + Add
                //     </button>
                //     <div className="transaction_form products forDownpayment">
                //       <div className="formsection gap">
                //         <label className="labelWithInfo">
                //           <span className="labelHeading">Select Category</span>
                //           <span className="infoSpan">
                //             <img src={info_icon} alt="" />
                //             <span class="tooltiptextInfo">
                //               Lorem Ipsum is simply dummy text of the printing
                //               and typesetting industry.
                //             </span>
                //           </span>
                //         </label>
                //         <select className="selectBox">
                //           <option value="">Select category</option>
                //         </select>
                //       </div>
                //       <div className="formsection gap">
                //         <div className="leftSecTransaction">
                //           <label className="labelWithInfo">
                //             <span className="labelHeading">Amount</span>
                //             <span className="infoSpan">
                //               <img src={info_icon} alt="" />
                //               <span class="tooltiptextInfo amount">
                //                 Lorem Ipsum is simply dummy text of the printing
                //                 and typesetting industry.
                //               </span>
                //             </span>
                //           </label>
                //           <input
                //             type="number"
                //             placeholder="149"
                //             class="editableInput numberType"
                //             value="149"
                //           />
                //         </div>
                //         <div className="rightSecTransaction">
                //           <label className="labelWithInfo paymentTime">
                //             <span className="labelHeading">
                //               I want to Pay Later
                //             </span>
                //             {/* <span className="infoSpan">
                //                 <img src={info_icon} alt="" />
                //                 <span class="tooltiptextInfo paymentDate">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                //           </span> */}
                //             <label
                //               className={
                //                 props.communicationDownpayment
                //                   ? "toggleBtn active"
                //                   : "toggleBtn"
                //               }
                //             >
                //               <input
                //                 type="checkbox"
                //                 name="check-communication"
                //                 onChange={(e) =>
                //                   e.target.checked
                //                     ? props.setCommunicationDownpayment(true)
                //                     : props.setCommunicationDownpayment(false)
                //                 }
                //               />
                //               <span className="toggler"></span>
                //             </label>
                //           </label>
                //           <div
                //             className={
                //               props.communicationDownpayment
                //                 ? "paymentNow"
                //                 : "paymentNow display"
                //             }
                //           >
                //             <p>
                //               Payment date <span>Now</span>
                //             </p>
                //           </div>
                //           <div
                //             className={
                //               props.communicationDownpayment
                //                 ? "paymentNow display"
                //                 : "paymentNow"
                //             }
                //           >
                //             <input
                //               type="date"
                //               placeholder="mm/dd/yyyy"
                //               onChange={props.paymentDateHandel1}
                //               class="editableInput"
                //               value={props.paymentDate1}
                //             />
                //           </div>
                //         </div>
                //       </div>
                //       <div className="formsection gap">
                //         <div className="leftSecTransaction">
                //           <label className="labelWithInfo">
                //             <span className="labelHeading">Payment Type</span>
                //             <span className="infoSpan">
                //               <img src={info_icon} alt="" />
                //               <span class="tooltiptextInfo paymentType">
                //                 Lorem Ipsum is simply dummy text of the printing
                //                 and typesetting industry.
                //               </span>
                //             </span>
                //           </label>
                //           <select className="selectBox">
                //             <option value="">Recurring</option>
                //           </select>
                //         </div>
                //         <div className="rightSecTransaction">
                //           <label className="labelWithInfo">
                //             <span className="labelHeading">Payment Status</span>
                //             <span className="infoSpan">
                //               <img src={info_icon} alt="" />
                //               <span class="tooltiptextInfo paymentStatus">
                //                 Lorem Ipsum is simply dummy text of the printing
                //                 and typesetting industry.
                //               </span>
                //             </span>
                //           </label>
                //           <select className="selectBox">
                //             <option value="">Unpaid</option>
                //           </select>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                ))}
              <div className="newDownpayment">
                <button
                  className="addNewDownpayment"
                >
                  + Add
                </button>
                <div className="transaction_form products forDownpayment">
                  <div className="cmnFormRow gap">
                    <label className="labelWithInfo">
                      <span className="labelHeading">Title</span>
                      <span className="infoSpan">
                        <img src={info_icon} alt="" />
                        <span class="tooltiptextInfo">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </span>
                      </span>
                    </label>
                    <div className="cmnFormField">
                        <input className="cmnFieldStyle" />
                    </div>
                  </div>
                  <div className="formsection gap">
                    <div className="leftSecTransaction">
                      <label className="labelWithInfo">
                        <span className="labelHeading">Amount</span>
                        <span className="infoSpan">
                          <img src={info_icon} alt="" />
                          <span class="tooltiptextInfo amount">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </span>
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="149"
                        class="editableInput numberType"
                        value="149"
                      />
                    </div>
                    <div className="rightSecTransaction">
                      <label className="labelWithInfo paymentTime">
                        <span className="labelHeading">
                          I want to Pay Later
                        </span>
                        <label
                          className={
                            props.communicationDownpayment
                              ? "toggleBtn active"
                              : "toggleBtn"
                          }
                        >
                          <input
                            type="checkbox"
                            name="check-communication"
                            onChange={(e) =>
                              e.target.checked
                                ? props.setCommunicationDownpayment(true)
                                : props.setCommunicationDownpayment(false)
                            }
                          />
                          <span className="toggler"></span>
                        </label>
                      </label>
                      <div
                        className={
                          props.communicationDownpayment
                            ? "paymentNow"
                            : "paymentNow display"
                        }
                      >
                        <p>
                          Payment date <span>Now</span>
                        </p>
                      </div>
                      <div
                        className={
                          props.communicationDownpayment
                            ? "paymentNow display"
                            : "paymentNow"
                        }
                      >
                        <input
                          type="date"
                          placeholder="mm/dd/yyyy"
                          onChange={props.paymentDateHandel1}
                          class="editableInput"
                          value={props.paymentDate1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="formsection gap">
                    <div className="leftSecTransaction">
                      <label className="labelWithInfo">
                        <span className="labelHeading">Payment Type</span>
                        <span className="infoSpan">
                          <img src={info_icon} alt="" />
                          <span class="tooltiptextInfo paymentType">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </span>
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
                          <span class="tooltiptextInfo paymentStatus">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </span>
                        </span>
                      </label>
                      <select className="selectBox">
                        <option value="">Unpaid</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="gridCol"></div>
    </form>
  );
};

export default ProductPayment;
