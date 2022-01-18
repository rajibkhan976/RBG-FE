import React, { useEffect, useState } from "react";

import Loader from "../../Loader";
import { ContactService } from "../../../../services/contact/ContactServices";

import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import updown from "../../../../assets/images/updown.png";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import icon_dependent from "../../../../assets/images/dependent.svg";
import appointmentImg from "../../../../assets/images/appointments.svg";
import dot3gray from "../../../../assets/images/dot3gray.svg";
import cross from "../../../../assets/images/cross.svg";
import setupIcon from "../../../../assets/images/setupicon8.svg";
import Scrollbars from "react-custom-scrollbars-2";

const Appointment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [communication, setCommunication] = useState(false);
  const [addDependentModal, setAddDependentModal] = useState(false);
  const [toggleContactList, setToggleContactList] = useState({
    status: false,
    listContent: [],
  });

  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
  };

  const addDependentModalFn = () => {
    setAddDependentModal(true);
  };

  const toggleContactListFn = (e) => {
    e.preventDefault();

    let contactListOp = toggleContactList;

    setToggleContactList({
      ...toggleContactList,
      status: !toggleContactList.status,
    });
  };

  const closeModal = () => {
    setAddDependentModal(false);
    setCommunication(false);
  };

  useEffect(() => {
    fetchCountry();
  }, [phoneCountryCode]);

  return (
    <>
     <div className="contactTabsInner">
        <h3 className="headingTabInner">Appointment</h3>
        
          <div className="transHeader">
            <button className="saveNnewBtn" onClick={() => addDependentModalFn()}>
              Add an Appointment <img src={arrow_forward} alt="" />
            </button>
            <span>* Explanatory text blurb should be here.</span>

            <div className="noDataFound appointmentTab">
              <span>
                <span>This contact doesn’t have a appointment yet.</span>
              </span>
            </div>
          </div>
       
        
      </div>

      {addDependentModal && (
        <div className="modalDependent modalBackdrop">
          {isLoader ? <Loader /> : ""}
          <div className="slickModalBody">
            <div className="slickModalHeader">
              <button className="topCross" onClick={() => closeModal(false)}>
                <img src={cross} alt="" />
              </button>
              <div className="circleForIcon">
                <img src={appointmentImg} alt="" />
              </div>
              <h3>Set an Appointment</h3>
            </div>
            <div className="modalForm appointmentForm">
              {/* <Scrollbars
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical" />
                )}
              > */}
                <form method="post">
                  <div className="cmnFormRow">
                    <div className="cmnFieldName d-flex f-justify-between">
                      Name
                      <button
                        className="inlinle-btn"
                        onClick={(e) => toggleContactListFn(e)}
                      >
                        {toggleContactList.status
                          ? "Close Contact list"
                          : "Select from Contacts"}
                      </button>
                    </div>
                    <div
                      className={
                        toggleContactList.status
                          ? "cmnFormField listActive"
                          : "cmnFormField"
                      }
                    >
                      <input
                        className="cmnFieldStyle"
                        type="text"
                        placeholder="Eg. Steve Martyns"
                        style={{
                          backgroundImage: toggleContactList.status
                            ? `url(${updown})`
                            : "",
                        }}
                      />
                      <span className="errorMsg">Please provide name.</span>
                      {toggleContactList.status && (
                        <>
                          <div className="contactListItems">
                            <ul>
                              <li>Abhisek Bose1</li>
                            </ul>
                            <button className="btn">+ Add Manually</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
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
                  <div className="inFormFieldHeader d-flex w-100 f-align-center f-justify-between">
                    <h5>Communication</h5>
                    <label
                      className={
                        communication ? "toggleBtn active" : "toggleBtn"
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
                  {communication && (
                    <>
                      <div className="cmnFormRow">
                        <div className="cmnFieldName">Enter Phone No</div>
                        <div className="cmnFormField countryCodeField">
                          <div className="countryCode cmnFieldStyle">
                            <div className="countryName">USA</div>
                            <div className="daileCode">+1</div>
                            <select className="selectCountry">
                              {phoneCountryCode.length > 0 &&
                                phoneCountryCode.map((country, cIndex) => (
                                  <option
                                    value={
                                      country.code +
                                      "_" +
                                      country.prefix.replace("+", "")
                                    }
                                    key={"cnt-" + cIndex}
                                  >
                                    {country.code} ({country.prefix})
                                  </option>
                                ))}
                            </select>
                          </div>
                          <input
                            type="text"
                            className="cmnFieldStyle"
                            placeholder="Eg. 5143654785"
                          />
                        </div>
                      </div>

                      <div className="cmnFormRow">
                        <div className="cmnFieldName">Enter Email Address</div>
                        <div className="cmnFormField">
                          <input
                            placeholder="Eg. jon.doe@gmail.com"
                            className="cmnFieldStyle"
                            type="email"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="cmnFormRow noteForm checkDNC">
                    <label>
                      <div className="customCheckbox">
                        <input type="checkbox" name="" id="" />
                        <span></span>
                      </div>
                      Activate DNC (Do Not Contact) for this dependent
                    </label>
                  </div>

                  <div className="modalbtnHolder w-100">
                    <button className="saveDependent saveNnewBtn">
                      Add Appointment <img src={arrow_forward} alt="" />
                    </button>
                  </div>
                </form>
              {/* </Scrollbars> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
