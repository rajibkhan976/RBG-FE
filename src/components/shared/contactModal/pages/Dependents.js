import React, { useEffect, useState } from "react";

import Loader from "../../Loader";
import { ContactService } from "../../../../services/contact/ContactServices";
import { DependentServices } from "../../../../services/contact/DependentServices";
import { utils } from "../../../../helpers";

import dndFalse from "../../../../assets/images/dnd_false.png"
import dnd from "../../../../assets/images/dnd_true.png"
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import updown from "../../../../assets/images/updown.png";
import icon_dependent from "../../../../assets/images/dependent.svg";
import icon_dependent_dark from "../../../../assets/images/dependent-dark.svg";
import dot3gray from "../../../../assets/images/dot3gray.svg";
import cross from "../../../../assets/images/cross.svg";
import Scrollbars from "react-custom-scrollbars-2";

const initialDependentState = {
  name: '',
  dob: '',
  gender: 'male',
  isCommunication: false,
  countryCode: "US",
  dailCode: '+1',
  phone: '',
  email: '',
  dnc: false,
  existingContactId: '',
  isExistingContact: false
}

const Dependents = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState([]);
  const [addManually, setAddManually] = useState(false)
  const [dependentList, setDependentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [addDependentModal, setAddDependentModal] = useState(false);
  const [option, setOption] = useState(null);
  const [notifStatus, setNotifStatus] = useState(false)
  const [toggleContactList, setToggleContactList] = useState({
    status: false,
    contacts: [],
    isCross: false
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    dob: "",
    phone: "",
    email: ""
  });

  const [dependant, setDependant] = useState({
    ...initialDependentState,
    guardianId: props.contactId ? props.contactId : null,
  });
  const [isAlert, setIsAlert] = useState({
    show: false,
    id: null,
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const messageDelay = 5000; // ms
  /**
   * Auto hide success or error message
   */
  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

  const fetchCountry = async () => {
    try {
      let countryResponse = await ContactService.fetchCountry();
      if (countryResponse.length) {
        setPhoneCountryCode(countryResponse);
      }
    } catch (e) {
      console.log('Error in dependent country fetch', e);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  /**
   * Country code options
   */
  const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
    return (
      <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
    )
  }
  ) : '';
  /**
   * Handle country code drop-down
   * @param {*} event 
   */
  const handelBasicinfoMobilePhon = (event) => {
    const { name, value } = event.target;
    if (name == "countryCode") {
      const daileCodeindex = event.target[event.target.selectedIndex];
      let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
      setDependant(prevState => ({ ...prevState, dailCode: dailCode }));
    }

    setDependant(prevState => ({ ...prevState, [name]: value }));
  };

  const disableFutureDate = () => {
    const today = new Date();
    const dd = String(today.getDate() - 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };


  const fetchContactDependents = async () => {
    try {
      setIsLoader(true);
      const pageId = utils.getQueryVariable('page');
      const queryParams = new URLSearchParams();
      queryParams.append("contact", props.contactId);
      const contactDependents = await DependentServices.fetchDependents(pageId, queryParams);
      console.log('contact dependents', contactDependents);
      if (contactDependents.dependents.length) {
        setDependentList(contactDependents.dependents);
      }
    } catch (e) {
      console.log('Error in fetch contact dependents', e);
    } finally {
      setIsLoader(false);
    }
  }

  useEffect(() => {
    fetchContactDependents();
  }, []);

  const addDependentModalFn = () => {
    setAddDependentModal(true);
  };
  /**
   * Handle dependent name change
   * @param {*} e 
   */
  const handleDenependentName = async (e) => {
    e.preventDefault();
    console.log('contact typing...', e.target.value)
    //Set dependant name
    setDependant({ ...dependant, name: e.target.value });
    //Name character limit
    if (e.target.value.length >= 30) {
      //Length 30 char limit
      console.log('char checking');
      setFormErrors({ ...formErrors, name: 'Name should not be more than 30 characters' });
      setIsDisabled(true);
    }
    //Name special character checking
    let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (isSpecialCharacterformat.test(e.target.value)) {
      console.log('Special checkig');
      setFormErrors({ ...formErrors, name: "Name should not contain any special characters" });
      setIsDisabled(true);
    }

    //Search in the contact list and display in drop-down
    if (e.target.value.length >= 3 && e.target.value.length <= 30 && !isSpecialCharacterformat.test(e.target.value)) {
      try {
        setProcessing(true);
        let operationMethod = "searchContacts";
        let payload = {
          "guardianId": props.contactId,
          "keyword": e.target.value
        }
        await DependentServices[operationMethod](payload)
          .then(result => {
            console.log("Search contacts result", result)
            if (result && result.contacts.length) {
              setToggleContactList({ ...toggleContactList, contacts: result.contacts, status: true });
            }
          })
      } catch (e) {
        console.log('Error in contact search: ', e)
      } finally {
        setProcessing(false);
        setAddManually(true);
        setIsDisabled(false);
        setFormErrors({ ...formErrors, name: "" })
      }
    }
  }

  const handleContactSelect = (e) => {
    console.log('Contact selected', e.currentTarget.dataset.id);
    if (toggleContactList.contacts.length) {
      //Filter contacts by selected id
      let filteredContact = toggleContactList.contacts.filter(contact => {
        return contact._id === e.currentTarget.dataset.id
      });
      //Update dependant state
      setDependant({
        ...dependant,
        isExistingContact: true,
        existingContactId: filteredContact[0]._id,
        name: (filteredContact[0].firstName ? filteredContact[0].firstName : '') + ' ' + (filteredContact[0].lastName ? filteredContact[0].lastName : ''),
        dob: (filteredContact[0].dob ? filteredContact[0].dob : ''),
        gender: (filteredContact[0].gender ? filteredContact[0].gender : ''),
        isCommunication: (filteredContact[0].email || filteredContact[0].phone.number ? true : false),
        email: filteredContact[0].email ? filteredContact[0].email : '',
        phone: filteredContact[0].phone.number ? filteredContact[0].phone.number : '',
      })
      setToggleContactList({ ...toggleContactList, status: false, isCross: true });
      console.log('Filter contact', filteredContact);
    }
  }

  const toggleContactListFn = (e) => {
    e.preventDefault();
    setToggleContactList({
      ...toggleContactList,
      status: false,
    });
  };

  const closeModal = () => {
    setAddDependentModal(false);
    setDependant(
      {
        ...initialDependentState,
        guardianId: props.contactId ? props.contactId : null,
      }
    );
    setAddManually(false);
    setToggleContactList({
      ...toggleContactList,
      status: false,
      contacts: [],
      isCross: false
    })
  };

  /**
   * Reset state after clicking on cross
   */
  const resetDependent = (e) => {
    e.preventDefault();
    setDependant(
      {
        ...initialDependentState,
        guardianId: props.contactId ? props.contactId : null,
      }
    );
    setToggleContactList({
      ...toggleContactList,
      status: false,
      contacts: [],
      isCross: false
    })
  }


  /**
   * Handle date of brith change
   * @param {*} e 
   */
  const handleDobChange = (e) => {
    setDependant({ ...dependant, dob: e.target.value });
  }
  /**
   * Handle gender change
   * @param {*} e 
   */
  const handleGenderChange = (e) => {
    console.log('Gender change', e.target.value);
    setDependant({ ...dependant, gender: e.target.value });
  }
  /**
   * Handle communication toggle
   * @param {*} e 
   */
  const handleCommunicationToggle = (e) => {
    let communicationflag = e.target.checked;
    setDependant({ ...dependant, isCommunication: communicationflag });
  }
  /**
   * Handle email change
   * @param {*} event 
   */
  const handleEmailChange = (event) => {
    event.preventDefault();
    setDependant({ ...dependant, email: event.target.value });
  };
  /**
   * Validate email address
   */
  const validateEmailField = () => {
    if (dependant.email) {
      let emailValid = dependant.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      setFormErrors({
        ...formErrors,
        email: !emailValid ? "Invalid email address" : "",
      });
    }
  }
  /**
   * Handle phone change
   * @param {*} event 
   */
  const handlePhoneChange = (event) => {
    event.preventDefault();
    setDependant({ ...dependant, phone: event.target.value });
  };
  /**
   * Validate phone number
   */
  const validatePhoneField = () => {
    if (dependant.phone) {
      let phoneValid = dependant.phone.match(/^[0-9\b]+$/);
      setFormErrors({
        ...formErrors,
        phone: !phoneValid ? "Invalid phone number" : "",
      });
    }
  }
  /**
   * Handle dnc change
   * @param {*} e 
   */
  const handleDncChange = (e) => {
    setDependant({ ...dependant, dnc: e.target.checked })
  }
  /**
   * Handle form submit
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    let formErrorsCopy = formErrors;
    let isError = false;


    /**
     * Check name field
     */
    if (!dependant.name) {
      isError = true;
      formErrorsCopy.name = "Please fillup the name";
    }

    /**
     * Check dob field
     */
    if (!dependant.dob) {
      isError = true;
      formErrorsCopy.dob = "Please fillup the date of birth";
    }


    if (dependant.isCommunication) {
      /**
       * Check phone field
       */
      if (!dependant.phone && !dependant.email) {
        isError = true;
        formErrorsCopy.phone = "Please fillup the phone number";
      }
      /**
       * Check email field
       */
      if (!dependant.phone && !dependant.email) {
        isError = true;
        formErrorsCopy.email = "Please fillup the email address";
      }
    }

    console.log('add dependents', formErrors, dependant);

    if (isError) {
      /**
       * Set form errors
       */
      setFormErrors({
        ...formErrors,
        name: formErrorsCopy.name,
        dob: formErrorsCopy.dob,
        phone: formErrorsCopy.phone,
        email: formErrorsCopy.email
      });
      //Reset errors
      setTimeout(
        () => setFormErrors({
          ...formErrors,
          name: "",
          dob: "",
          phone: "",
          email: ""
        }),
        5000
      );
    } else {
      /**
       * Submit the form
       */
      console.log('submit the form');
      setIsLoader(true);
      try {
        let operationMethod = "createDependent";
        await DependentServices[operationMethod](dependant)
          .then(result => {
            console.log("Create dependent result", result)
            let msg = 'Dependent created successfully';
            setSuccessMsg(msg);
            //Close dependent create modal
            setTimeout(() => {
              closeModal();
              fetchContactDependents();
            },
              messageDelay
            );
          })

      } catch (e) {
        /**
         * Segregate error by http status
         */
        setProcessing(false);
        console.log("In dependent create", e.message);
        if (e.response && e.response.status == 403) {
          setErrorMsg("You dont have permission to perform this action");
        }
        else if (e.message) {
          setErrorMsg(e.message);
        }
      } finally {
        setIsLoader(false);
        setProcessing(false);
      }
    }
  }

  const toggleOptions = (index) => {
    // setOption(index !== null ? (option !== null ? null : index) : null);
    setOption(index !== option ? index : null);
  };


  /**
   * Archive dependent
   */
  const archiveDependent = async (dependent, isConfirmed = null) => {
    console.log('archive dependent', dependent);

    let dependentId = dependent._id;
    if (!isConfirmed && dependentId) {
      setIsAlert({
        show: true,
        id: dependentId,
      });
      setOption(null);
    } else if (isConfirmed == "yes") {
      try {

        /**
         * Archive the dependent
         */
        const result = await DependentServices.archiveDependent(isAlert.id)
        if (result) {
          console.log('Dependent archive result', result);
          setOption(null);
          setSuccessMsg("Dependent archived successfully");
          setIsAlert({
            show: false,
            id: null,
          });
          fetchContactDependents();
        }
      } catch (e) {
        console.log("Error in archive dependent", e);
        setErrorMsg(e.message);
      }
    } else {
      setIsAlert({
        show: false,
        id: null,
      });
    }
  }

  const chageDND = (e) => {
    setNotifStatus(e.target.checked);
    document.activeElement.blur()
  }

  return (
    <>
      <div className="contactTabsInner">
        <h3 className="headingTabInner">Dependents</h3>
        {dependentList.length > 0 && (
          <div className="transHeader">
            <button className="saveNnewBtn" onClick={() => addDependentModalFn()}>
              Add a Dependent <img src={arrow_forward} alt="" />
            </button>
            <span>* Explanatory text blurb should be here.</span>
          </div>
        )}
        {!dependentList.length &&
          <p className="subheadingTabInner">
            * Explanatory text blurb should be here.
          </p>}


        <div className="dependentsListing">
          {isLoader ? <Loader /> : ""}
          {/* {isAlert.show ? (
            <ConfirmBox
              callback={(isConfirmed) => archiveDependent(isAlert.id, isConfirmed)}
              message="Are you sure, you want to archive the dependent?"
            />
          ) : (
            ""
          )} */}
          {successMsg && <div className="popupMessage success innerDrawerMessage">
            <p>{successMsg}</p>
          </div>}
          {errorMsg && <div className="popupMessage error innerDrawerMessage">
            <p>{errorMsg}</p>
          </div>}
          {dependentList.length > 0 ? (
            <>
              <div className="row head">
                <div className="cell">Dependent Name</div>
                <div className="cell">Last Attendance</div>
                <div className="cell">Active Course</div>
                <div className="cell">DOB</div>
              </div>
              {dependentList.map((dependent, i) => (
                <>
                  <div
                    className={
                      (dependent.isArchived || (isAlert.show && (isAlert.id === dependent._id))) ? "row archivedDependent" : "row"
                    }
                    key={i}
                  >
                    <div className="cell">
                      <div className="d-flex">
                        <div className="iconCont">
                          <span>
                            <img src={icon_dependent} alt="" />
                          </span>
                        </div>
                        <div className="textCont">
                          <h4>
                            <em>{dependent.name ? dependent.name : ((dependent.firstName ? dependent.firstName : '') + ' ' + (dependent.lastName ? dependent.lastName : ''))}</em>
                            <div className="dndCheckbox">
                              {!dependent.dnc && <span onClick={(e) => {
                                setNotifStatus(true)
                                e.target.blur()
                              }
                              }>
                                <img src={dnd} alt="Do not send notifications" />
                              </span>}
                              {dependent.dnc &&
                                <span onClick={(e) => {
                                  setNotifStatus(false)
                                  e.target.blur()
                                }}>
                                  <img src={dndFalse} alt="Do not send notifications" />
                                </span>
                              }
                            </div>
                          </h4>
                          <span className="d-flex">
                            {dependent.isCommunication && dependent.phone ? dependent.phone.dailCode + dependent.phone.number : ''}
                            {dependent.phone && dependent.email ? " | " : ''}
                            <a
                              className="mailCont"
                              href={dependent.isCommunication && dependent.email ? "mailto:" + dependent.email : ""}
                            >

                              {dependent.isCommunication && dependent.email ? dependent.email : ''}
                            </a>
                          </span>
                          <span className="dependentDoj">{dependent.doj}</span>
                        </div>
                      </div>
                    </div>
                    <div className="cell">
                      <span className="dependentLast">
                        {dependent.lastAttend ? dependent.lastAttend : "N/A"}
                      </span>
                    </div>
                    <div className="cell">
                      <span className="dependentCourse">
                        {dependent.course ? dependent.course : "N/A"}
                      </span>
                    </div>
                    <div className="cell">
                      <span className="dependentDob">{dependent.dob}</span>
                      <button
                        className="btn optionDependent"
                        onClick={() => {
                          toggleOptions(i);
                        }}>
                        <img src={dot3gray} alt="" />
                      </button>
                      <div
                        className={
                          option === i
                            ? "dropdownOptions listOpen"
                            : "listHide"
                        }
                      >
                        <button
                          className="btn btnDelete"
                          onClick={() => {
                            archiveDependent(dependent);
                          }}
                        >
                          <span>
                            <svg
                              className="deleteIcon"
                              xmlns="http://www.w3.org/2000/svg"
                              width="12.347"
                              height="13.553"
                              viewBox="0 0 12.347 13.553"
                            >
                              <g transform="translate(0.75 0.75)">
                                <path
                                  className="a"
                                  d="M3,6H13.847"
                                  transform="translate(-3 -3.589)"
                                />
                                <path
                                  className="a"
                                  d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                  transform="translate(-3.795 -2)"
                                />
                                <line
                                  className="a"
                                  y2="3"
                                  transform="translate(4.397 6.113)"
                                />
                                <line
                                  className="a"
                                  y2="3"
                                  transform="translate(6.397 6.113)"
                                />
                              </g>
                            </svg>
                          </span>
                          Archive
                        </button>
                      </div>
                      {dependent.isArchived && <div className="archivedMessage">
                        Archived </div>}


                      {isAlert.show && (isAlert.id === dependent._id) && <div className="archivedMessage">
                        Are you sure you want to archive this Dependents? <div className="buttonsArchived"><button className="btn" onClick={() => archiveDependent( dependent,"yes")}>Yes</button><button className="btn" onClick={() => archiveDependent(dependent,"cancel")}>No</button></div></div>}
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="createNew">
              <p>This contact doesn’t have a dependent yet.</p>
              <button
                className="saveNnewBtn"
                onClick={() => addDependentModalFn()}
              >
                <span>Add a Dependent</span>
                <img className="" src={arrow_forward} alt="" />
              </button>
            </div>
          )}
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
                <img src={icon_dependent_dark} alt="" />
              </div>
              <h3>{isEditing ? "Edit " : "Add a "}Dependent</h3>
              {successMsg && <div className="popupMessage success">
                <p>{successMsg}</p>
              </div>}
              {errorMsg && <div className="popupMessage error">
                <p>{errorMsg}</p>
              </div>}
            </div>
            <div className="modalForm">

              <Scrollbars
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical" />
                )}
              >
                <form method="post" onSubmit={handleSubmit}>
                  <div className="cmnFormRow">
                    <div className="cmnFieldName d-flex f-justify-between">
                      Name
                      {/*addManually &&
                        <button
                          className="inlinle-btn"
                          onClick={(e) => {
                            e.preventDefault()
                            setAddManually(false)
                          }}
                        >
                          Select from Contacts
                        </button>*/}
                    </div>
                    {console.log('Dependent before name', dependant)}
                    <div
                      className={
                        toggleContactList.status
                          ? "cmnFormField listActive"
                          : (formErrors.name ? "cmnFormField errorField" : "cmnFormField")
                      }
                    >
                      <input
                        className={processing ? "cmnFieldStyle loading" : "cmnFieldStyle"}
                        type="text"
                        placeholder="Eg. Steve Martyns"
                        onChange={(e) => handleDenependentName(e)}
                        style={{
                          backgroundImage: toggleContactList.status
                            ? `url(${updown})`
                            : "",
                        }}
                        value={dependant.name ? dependant.name : ''}
                        disabled={toggleContactList.isCross}
                      />
                      {toggleContactList.isCross ?
                        <button className="btn crossDependent" onClick={(e) => resetDependent(e)}>
                          <img src={cross} alt="cross" />
                        </button> : ''}
                      {console.log('Error message', formErrors)}
                      {formErrors.name ? (
                        <span className="errorMsg">{formErrors.name}</span>
                      ) : null}
                      {toggleContactList.status && (
                        <>
                          <div className="contactListItems">
                            <ul>
                              {toggleContactList.contacts.map((contact =>
                                <li key={contact._id} data-id={contact._id} onClick={(e) => { handleContactSelect(e) }}>
                                  {(contact.firstName ? contact.firstName : '') + ' ' + (contact.lastName ? contact.lastName : '')}
                                </li>
                              ))}
                            </ul>
                            <button
                              className="btn"
                              onClick={(e) => {
                                e.preventDefault()
                                setAddManually(true)
                                toggleContactListFn(e)
                              }}
                            >+ Add Manually</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {addManually &&
                    <div className="cmnFormRow">
                      <div className="cmnFormCol">
                        <div className="cmnFieldName">Birthday</div>
                        <div className={formErrors.dob ? "cmnFormField errorField" : "cmnFormField"}>
                          <input
                            className="cmnFieldStyle"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            onChange={handleDobChange}
                            value={dependant.dob ? dependant.dob : ''}
                            max={disableFutureDate()}
                            disabled={toggleContactList.isCross && dependant.dob}
                          />
                        </div>
                      </div>
                      <div className="cmnFormCol">
                        <div className="cmnFieldName">Gender</div>
                        {console.log('In dom before buttons', dependant)}
                        <div className="cmnFormField radioGroup" onChange={handleGenderChange}>
                          <label className="cmnFormRadioLable">
                            <div className="circleRadio">
                              <input type="radio" value="male" name="genderDependent" defaultChecked={dependant.gender === 'male'} />
                              <span></span>
                            </div>
                            Male
                          </label>
                          <label className="cmnFormRadioLable">
                            <div className="circleRadio">
                              <input type="radio" value="female" name="genderDependent" defaultChecked={dependant.gender === 'female'} />
                              <span></span>
                            </div>
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="inFormFieldHeader d-flex w-100 f-align-center f-justify-between">
                    <h5>Communication</h5>
                    <label
                      className={
                        dependant.isCommunication ? "toggleBtn active" : "toggleBtn"
                      }
                    >
                      <input
                        type="checkbox"
                        name="check-communication"
                        onChange={(e) => handleCommunicationToggle(e)}
                      />
                      <span className="toggler"></span>
                    </label>
                  </div>
                  {dependant.isCommunication && (
                    <>
                      <div className="cmnFormRow">
                        <div className="cmnFieldName">Enter Phone No</div>
                        <div className={formErrors.phone ? "cmnFormField countryCodeField errorField" : "cmnFormField countryCodeField"}>
                          <div className="countryCode cmnFieldStyle">
                            <div className="countryName">{dependant.countryCode}</div>
                            <div className="daileCode">{dependant.dailCode}</div>
                            <select className="selectCountry" name="countryCode" defaultValue={dependant.countryCode} onChange={handelBasicinfoMobilePhon} disabled={toggleContactList.isCross}>
                              {countrycodeOpt}
                            </select>
                          </div>
                          <input
                            type="text"
                            className="cmnFieldStyle"
                            placeholder="Eg. 5143654785"
                            onChange={(e) => handlePhoneChange(e)}
                            onBlur={() => validatePhoneField()}
                            value={dependant.phone}
                            disabled={dependant.phone && toggleContactList.isCross}
                          />
                          {formErrors.phone ? (
                            <span className="errorMsg">{formErrors.phone}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="cmnFormRow">
                        <div className="cmnFieldName">Enter Email Address</div>
                        <div className={formErrors.email ? "cmnFormField errorField" : "cmnFormField"}>
                          <input
                            placeholder="Eg. jon.doe@gmail.com"
                            className="cmnFieldStyle"
                            type="email"
                            onChange={(e) => handleEmailChange(e)}
                            onBlur={() => validateEmailField()}
                            disabled={dependant.email && toggleContactList.isCross}
                          />
                          {formErrors.email ? (
                            <span className="errorMsg">{formErrors.email}</span>
                          ) : null}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="cmnFormRow noteForm checkDNC">
                    <label>
                      <div className="customCheckbox">
                        <input type="checkbox" name="doNotContact" onChange={(e) => handleDncChange(e)} />
                        <span></span>
                      </div>
                      Activate DNC (Do Not Contact) for this dependent
                    </label>
                  </div>

                  <div className="modalbtnHolder w-100">
                    <button className="saveDependent saveNnewBtn" disabled={isDisabled}>
                      Add Dependent <img src={arrow_forward} alt="" />
                    </button>
                  </div>
                </form>
              </Scrollbars>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dependents;
