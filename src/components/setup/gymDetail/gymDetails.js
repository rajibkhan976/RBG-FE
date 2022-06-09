import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import profileAvatar from "../../../assets/images/camera.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import listIcon from "../../../assets/images/list_icon.svg";
import dot3gray from "../../../assets/images/dot3gray.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import gymLogo from "../../../assets/images/gymLogo.svg";
import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";
import ConfirmBox from "../../shared/confirmBox";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";
import Scrollbars from "react-custom-scrollbars-2";


const GymDetails = (props) => {
  document.title = "Red Belt Gym - Gym Details";
  const [option, setOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [editHoliday, setEditHoliday] = useState(false);
  const [holidayVal, setHolidayVal] = useState({
    id: "",
    startDay: "",
    endDay: "",
    name: ""
  });

  // START - Variable set while development --- Jit
  const [isLoader, setIsLoader] = useState(false);
  const [gymData, setGymData] = useState([]);
  const [editAccess, setEditAccess] = useState(true);
  const [holidayData, setHolidayData] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmBox, setDeleteConfirmBox] = useState(false);
  const [confirmChange, setConfirmChange] = useState(false);
  const [validateMsg, setValidateMsg] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    contactEmail: "",
    timezone: "",
    disabled: false,
    disabledAccess: false
  });
  const [timezoneData, setTimezoneData] = useState([]);
  const [detectedTimezone, setDetectedTimezone] = useState(useSelector(state => {
    return state.organization.location;
  }));
  const [phoneCountryCode, setPhoneCountryCode] = useState([
    {
      "code": "US",
      "name": "United States",
      "prefix": "+1"
    }
  ]);
  // END - Variable set while development --- Jit
  const fetchGymDetails = async () => {
    try {
      setIsLoader(true);
      const gymData = await GymDetailsServices.fetchGymDetail();
      console.log("Gym Details", gymData);
      // gymData.gymDetails.timezone = (gymData?.timezone) ? gymData?.timezone : detectedTimezone?.zoneName;
      // gymData.gymDetails.gmtOffset = (gymData?.gmtOffset) ? gymData?.gmtOffset : detectedTimezone?.gmtOffset;
      setGymData({...gymData.gymDetails, 
        contactPerson: (gymData.gymDetails?.contactPerson) ? gymData.gymDetails?.contactPerson : gymData.gymDetails?.ownerDetails?.firstName + " " + gymData.gymDetails?.ownerDetails?.lastName,
        contactEmail: (gymData.gymDetails?.contactEmail) ? gymData.gymDetails?.contactEmail : gymData.gymDetails?.ownerDetails?.email,
        phone: (gymData?.gymDetails?.phone) ? gymData?.gymDetails?.phone : gymData.gymDetails?.ownerDetails?.phone,
        countryCode: (gymData?.gymDetails?.countryCode) ? gymData?.gymDetails?.countryCode : gymData.gymDetails?.ownerDetails?.prefix,
        country: (gymData?.gymDetails?.country) ? gymData?.gymDetails?.country : gymData.gymDetails?.ownerDetails?.countryCode,
      });
      setEditAccess(gymData.editAccess);
      console.log("editAccess:::::::::::::::::::" , editAccess);
      console.log("gymDetails:::::::::::::::::::" , gymData.gymDetails);

      if(!gymData.gymDetails?.timezone) {
        setGymData(prevState => ({...prevState, 
          timezone: detectedTimezone?.zoneName, 
          gmtOffset: detectedTimezone?.gmtOffset}));
      }
      setHolidayData(gymData?.holidays);
      setValidateMsg({ ...validateMsg, disabledAccess: !gymData.editAccess });
      // if(!gymData?.gymDetails.timezone && detectedTimezone?.zoneName) setSuccessMsg(`Timezone auto detected as (${detectedTimezone.countryName} - ${detectedTimezone.zoneName}), but the data is not saved yet.`);
    } catch (e) {
      console.log(e.message);
      setErrorMsg(e.message);
      // Show error message from here
    } finally {
      setIsLoader(false);
    }
  };
  const getTimeZoneList = async () => {
    try {
      const timezoneList = await GymDetailsServices.fetchTimeZoneList();
      console.log("Timezone List --", timezoneList);
      setTimezoneData(timezoneList.zones);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchCountry = async () => {
    try {
      const codeData = await GymDetailsServices.fetchCountry();
      // console.log(codeData);
      setPhoneCountryCode(codeData);
    } catch (e) {
      setErrorMsg(e.message);
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchGymDetails();
    getTimeZoneList();
  }, []);

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, 5000);
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, 5000);
  }, [errorMsg, successMsg]);

  const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };
  const openAddHolidayModal = (holiday) => {
    setOpenModal(true, holiday);
  }
  const closeHolidayModal = () => {
    setOpenModal(false);
    //setEditHoliday(false);
    setHolidayVal(
      {
        ...holidayVal,
        _id: "",
        name: "",
        fromDate: "",
        toDate: ""
      }
    );
  };

  const editGymDetailsHandler = (event) => {
    event.preventDefault();
    setShowEditForm(true);
  }
  const closeGymDetailsHandler = (event) => {
    event.preventDefault();
    window.location.reload(false);
    setShowEditForm(false);
  }

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (read) => {
        GymDetailsServices.imageupload({
          file: read.target.result,
          name: files[0].name
        }).then((result) => {
          const avatar = result.data.publicUrl;
          // setLogo({ image: result.data.originalKey, imageUrl: result.data.publicUrl });
          setGymData({ ...gymData, logo: result.data.originalKey })
          console.log(avatar);
        }).catch(err => {
          console.log('Profile pic error', err);
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Gym Data", gymData);
    console.log("validateMsg Data", validateMsg);
    
    try {
      const isValid = validateField(e, true);
      if (isValid) {
        setIsLoader(true);
        const payload = {
          "orgName": gymData.name,
          "contactPerson": gymData.contactPerson,
          "phone": gymData.phone,
          "countryCode": (gymData.countryCode) ? gymData.countryCode : "+1",
          "country": (gymData.country) ? gymData.country : "US",
          "logo": gymData.logo,
          "contactEmail": gymData.contactEmail,
          "timeZone": gymData.timezone,
          "gmtOffset": (gymData.gmtOffset) ? gymData.gmtOffset : ''
        };
        console.log(payload);
        const updatedData = await GymDetailsServices.gymDetailUpdate(payload);
        setGymData(updatedData);
        console.log("Updated Data", updatedData);
        setSuccessMsg("Gym details updated successfully");
        setTimeout(() => { setShowEditForm(false) }, 5000);
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
    setConfirmChange(false);
  }

  const validateField = (e, validateViaSubmit = false) => {
    const alphaRegex = /^[a-z A-Z]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validateViaSubmit) {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      if (name === "name" && value.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, name: "Gym name should not be left empty" });
        
      } else if (name === "contactPerson" && !alphaRegex.test(value)) {
        setValidateMsg({ ...validateMsg, disabled: true, contactPerson: "Please enter a valid contact person name" });
      } else if (name === "phone" && !phoneRegex.test(value)) {
        setValidateMsg({ ...validateMsg, disabled: true, phone: "Please enter a valid 10 digit phone number" });
      } else if (name === "contactEmail" && !emailRegex.test(value)) {
        setValidateMsg({ ...validateMsg, disabled: true, contactEmail: "Please enter a valid email address" });
      } else if (name === "timezone" && value.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, timezone: "Please select a timezone" });
      } else if (name === "countryCode" && value.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, timezone: "Please select country code" });
      } else {
        setValidateMsg({
          name: "",
          contactPerson: "",
          phone: "",
          contactEmail: "",
          timezone: "",
          disabled: false
        });
        setConfirmChange(true);
      }
      if(name === "countryCode" && value.length) {
        const countryIndex = e.target[e.target.selectedIndex];
        const country = countryIndex !== undefined ? countryIndex.getAttribute("data-country") : "US";
        setGymData({ ...gymData, [name]: value, country:  country});
      } else if(name === "timezone" && value.length) {
        console.log("Timezone Offset", value);
        const timeZoneIndex = e.target[e.target.selectedIndex];
        const timezone = timeZoneIndex !== undefined ? timeZoneIndex.getAttribute("data-timezone") : "";
        setGymData({ ...gymData, [name]: timezone, gmtOffset:  value});
      } else {
        setGymData({ ...gymData, [name]: value });
      }
      
    } else {
      let bool = false;
      if (gymData.name.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, name: "Gym name should not be left empty" });
      } else if (!alphaRegex.test(gymData.contactPerson)) {
        setValidateMsg({ ...validateMsg, disabled: true, contactPerson: "Please enter a valid contact person name" });
      } else if (!phoneRegex.test(gymData.phone)) {
        setValidateMsg({ ...validateMsg, disabled: true, phone: "Please enter a valid 10 digit phone number" });
      } else if (!emailRegex.test(gymData.contactEmail)) {
        setValidateMsg({ ...validateMsg, disabled: true, contactEmail: "Please enter a valid email address" });
      } else if (typeof gymData.gmtOffset === 'undefined' || gymData.gmtOffset.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, timezone: "Please select a timezone" });
      } else if (gymData.countryCode.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, timezone: "Please select country code" });
      } else {
        setValidateMsg({
          name: "",
          contactPerson: "",
          phone: "",
          contactEmail: "",
          timezone: "",
          disabled: false
        });
        bool = true;
      }
      return bool;
    }
  };

  const deleteHoliday = async () => {
    try {
      setIsLoader(true);
      let result = await GymDetailsServices.gymHolidayDelete(deletedId);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
      setOption(false);
      setDeleteConfirmBox(false);
      setSuccessMsg("Holiday deleted successfully");
      fetchGymDetails();
    }
  };

  const deleteHolidayHandler = (e) => {
    setDeleteConfirmBox(true);
    setDeletedId(e.target.getAttribute("data-id"));
  };

  const deleteConfirm = (response) => {
    if (response === "yes") {
      console.log(response);
      deleteHoliday();
    } else {
      setDeleteConfirmBox(false);
    }
  };

  const editHolidayHandler = (elem) => {
    setEditHoliday(true);
    setHolidayVal(elem);
    console.log(holidayVal)
    setOpenModal(true);
    setOption(false);
  };




  return (
    <>

      {(isLoader) ? <Loader /> : ''}
      {successMsg &&
        <SuccessAlert message={successMsg} extraclassName=""></SuccessAlert>
      }
      {errorMsg &&
        <ErrorAlert message={errorMsg} extraclassName=""></ErrorAlert>
      }

      {deleteConfirmBox && <ConfirmBox message="Are you sure, you want to delete this holiday?" callback={deleteConfirm} />}

      <div className="dashInnerUI">
        <div className="userListHead">
          <div className="listInfo">
            <ul className="listPath">
              <li>Settings </li>
              <li> Gym Details</li>
            </ul>
            <h2 className="inDashboardHeader">
              Gym Details
            </h2>
            <p className="userListAbout">Manage your Gym details.</p>
          </div>
        </div>
        <div className="gymDetails">
          <div className="gymdetails_left">
            {!showEditForm &&
              <div className="showing_gym_data">
                <div className="gymName">
                  <div className="profilePicture">
                    <div className="logo_profile">
                     {(gymData?.logo) ? <img src={(gymData?.logo) ? "https://wrapperbucket.s3.us-east-1.amazonaws.com/" + gymData?.logo : gymLogo} alt="" />
                        : <img src={profileAvatar} alt="" />}
                    </div>

                    <span>{(gymData?.name) ? gymData?.name : "-"}</span>
                  </div>
                 
                  {editAccess  && 
                     <button><img src={edit_gym} alt="" onClick={editGymDetailsHandler} /></button>
                  }
                </div>
                <div className="gymInfo full">
                  <p className="textType1">Contact Person</p>

                  <p className="textType2">{(gymData?.contactPerson) ? gymData?.contactPerson : "-"}</p>
                </div>
                <div className="d-flex">
                  <div className="gymInfo half">
                    <p className="textType1">Contact No.</p>
                    <p className="textType3">{(gymData?.phone) ? gymData?.countryCode + " " + gymData.phone : "-"}</p>
                  </div>
                  <div className="gymInfo half">
                    <p className="textType1">Contact Email</p>
                    <p className="textType4">{(gymData?.contactEmail) ? gymData?.contactEmail : "-"}</p>
                  </div>
                </div>
                {/* <div className="gymBreak">
                      <img src={coffee} alt=""/>
                      <div>
                      Break Time
                      <h3>45 min</h3>
                      </div>
                  </div> */}
                <div className="formControl timezone gymInfo">
                  <p className="textType1">Timezone</p>
                  <select disabled>
                    <option>{(gymData?.timezone) ? gymData?.timezone : "-"}</option>
                  </select>
                </div>
              </div>
            }
            {/* form section.................... */}
            {showEditForm &&
              <form method="post" onSubmit={handleSubmit}>
                <div className="formControl">
                  <div className="profile">
                    <div className="profileUpload">
                      <input type="file" onChange={(e) => handleImageUpload(e)} />
                    </div>
                    <div className="profilePicture">
                      {(gymData?.logo) ? <img src={(gymData?.logo) ? "https://wrapperbucket.s3.us-east-1.amazonaws.com/" + gymData?.logo : gymLogo} alt="" />
                        : <img src={profileAvatar} alt="" />}
                    </div>
                    <div className="profileText"> Gym Logo</div>
                  </div>
                </div>
                <div className="formControl">
                  <label>Gym/Organization Name</label>
                  <input
                    type="text"
                    placeholder="Ex. Fitbit"
                    name="name"
                    value={gymData?.name}
                    onChange={validateField}
                  />
                  <div className="errorMsg">{validateMsg.name}</div>
                </div>
                <div className="formControl">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    placeholder="Ex. Jon Doe"
                    name="contactPerson"
                    value={gymData?.contactPerson}
                    onChange={validateField}
                  />
                  <div className="errorMsg">{validateMsg.contactPerson}</div>
                </div>
                <div className="formControl phone">
                  <label>Phone No</label>
                  <div className="cmnFormField">
                    <div className="countryCode cmnFieldStyle">
                      <div className="countryName">{(gymData.country) ? gymData.country : "US"}</div>
                      <div className="daileCode">{gymData.countryCode}</div>
                      <select className="selectCountry" name="countryCode"
                        onChange={validateField}
                        defaultValue={gymData?.countryCode}>
                        {phoneCountryCode ? phoneCountryCode.map((el, key) => {
                          return (
                            <option value={el.prefix} data-country={el.code} key={key} >{el.code} ({el.prefix})</option>
                          )
                        }
                        ) : ''}
                      </select>
                    </div>
                    <input type="phone" className="" name="phone" placeholder="Eg. 5552234454"
                      value={gymData?.phone}
                      onChange={validateField} />
                  </div>
                  <div className="errorMsg">{validateMsg.phone}</div>
                </div>
                <div className="formControl">
                  <label>Contact Email</label>
                  <input type="text" placeholder="Ex. admin@fitbit.come" name="contactEmail"
                    value={gymData?.contactEmail}
                    onChange={validateField} />
                  <div className="errorMsg">{validateMsg.contactEmail}</div>
                </div>
                {/* <div className="formControl breaktime">
                      <label>Break Time</label>
                      <input type="text" name=""/> <span>min</span>
                  </div> */}
                <div className="formControl timezone">
                  <label>Timezone</label>
                  <select name="timezone"
                    onChange={validateField}>
                      <option value="">-</option>
                    {timezoneData ? timezoneData.map(zone => {
                      return (<option
                        value={zone.gmtOffset}
                        data-timezone={zone.zoneName}
                        selected={(zone.zoneName === gymData?.timezone) ? true : false }
                        // selected={(parseInt(zone.gmtOffset) === detectedTimezone.gmtOffset) ? true : ""}
                      >{zone.countryCode} - {zone.zoneName}</option>);
                    }) : ''}
                  </select>
                  <div className="errorMsg">{validateMsg.timezone}</div>
                </div>
                <div className="btn-group">
                  <button className="common_blue_button" type="submit"
                    disabled={(validateMsg.disabled === true || validateMsg.disabledAccess === true)  ? true : false}>
                    Save <img alt="" src={arrowRightWhite} />
                  </button>
                  <button type="text" className="btn-link" onClick={closeGymDetailsHandler}>Cancel</button>
                </div>      
                
              </form>

            }
          </div> 
          <div className="gymdetails_right">
            {(holidayData.length === 0) &&
              <div className="emptyList">
                <div className="holidayListHeader">
                  <div>
                    <h3>Holiday List</h3>
                    <p>Explanatory text blurb here</p>
                  </div>
                </div>
                <div className="addInEmptySpace">
                  <img alt="" src={listIcon} />
                  <div>You haven’t created any holiday yet.</div>
                  {editAccess && 
                  <button className="common_blue_button" onClick={openAddHolidayModal}>
                    Add a Holiday <img alt="" src={arrowRightWhite} />
                  </button>
                  }
                </div>
              </div>
            }
            {(holidayData.length !== 0) &&
              <div className="holidayList">
                <div className="holidayListHeader">
                  <div>
                    <h3>Holiday List</h3>
                    <p>Manage your holidays</p>
                  </div>
                  <div>
                  {editAccess && 
                    <button className="common_blue_button" onClick={openAddHolidayModal}>
                      Add a Holiday <img alt="" src={arrowRightWhite} />
                    </button>
                  }
                  </div>
                </div>
                <div className="gymHolidayList header">
                  <div className="cell">Start Date</div>
                  <div className="cell">End Date</div>
                  <div className="cell">Holiday</div>
                </div>
                <div className="holidayListWrap">
                {holidayData.map((elem, key) => {
                  return (
                      
                  <div className="gymHolidayList">
                    <div className="cell">{elem.fromDate}</div>
                    <div className="cell">{elem.toDate}</div>
                    <div className="cell">
                      <span>{elem.name}</span>
                      {editAccess && 
                      <div className="sideEditOption">
                        <button onClick={() => {
                          toggleOptions(key);
                        }}>
                          <img src={dot3gray} alt="" />
                        </button>
                        
                        <div className={
                          option === key
                            ? "dropdownOptions listOpen"
                            : "listHide"
                        }>
                          <button className="btn btnEdit"
                            onClick={() => editHolidayHandler(elem)}
                          >
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                            </span>
                            Edit
                          </button>
                          <button className="btn btnDelete" data-id={elem._id} onClick={deleteHolidayHandler}>
                            <span>
                              <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                            </span>
                            Delete
                          </button>
                        </div>
                      </div>
                      }
                    </div>
                  </div>
                  )
                }
                )}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {openModal && <AddHolidayModal closeAddHolidayModal={closeHolidayModal}
        holiday={holidayVal}
        editHoliday={editHoliday}
        fetchGymDetails={fetchGymDetails}
      />}
    </>
  );
};

export default GymDetails;
