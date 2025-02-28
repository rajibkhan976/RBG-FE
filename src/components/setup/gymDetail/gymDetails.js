import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import profileAvatar from "../../../assets/images/camera.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import listIcon from "../../../assets/images/list_icon.svg";
import dot3gray from "../../../assets/images/dot3gray.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import gymLogo from "../../../assets/images/gymLogo.svg";
import copyIcon from "../../../assets/images/copyIcon.svg";
import infos from "../../../assets/images/infos.svg";
import regenerate from "../../../assets/images/regenerate.svg";
import target_blank from "../../../assets/images/target_blank.svg";
import * as actionTypes from "../../../actions/types";
import env from "../../../configuration/env";

import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";
import ConfirmBox from "../../shared/confirmBox";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";
import {AttendanceServices} from "../../../services/attendance/attendanceServices";
import Scrollbars from "react-custom-scrollbars-2";
import { utils } from "../../../helpers";


const GymDetails = (props) => {
  document.title = "Red Belt Gym - Gym Details";
  const [option, setOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [editHoliday, setEditHoliday] = useState(false);
  const [holidayVal, setHolidayVal] = useState({
    id: "",
    // startDay: "",
    // endDay: "",
    name: "",
    fromDate: "",
    toDate: "",
  });

  // START - Variable set while development --- Jit
  const [isLoader, setIsLoader] = useState(false);
  const [gymData, setGymData] = useState([]);
  const [editAccess, setEditAccess] = useState(false);
  const [holidayData, setHolidayData] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteConfirmBox, setDeleteConfirmBox] = useState(false);
  const [confirmChange, setConfirmChange] = useState(false);
  const [accessCodeGen, setAccessCodeGen] = useState([]);

  const [copiedText, setCopiedText] = useState(false);
  const [copiedurl, setCopiedurl] = useState(false);
  const [hasTimezone, setHasTimezone] = useState(false);
  const [getGymData, setGetGymData] = useState([]);
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
  const reduxData  = useSelector((state) => state)
  const userData = useSelector((state) => (state.user?.data) ? state.user.data:"");
  const dispatch = useDispatch();
  // END - Variable set while development --- Jit
  const fetchGymDetails = async () => {
    try {
      setIsLoader(true);
      const gymData = await GymDetailsServices.fetchGymDetail();
      // console.clear()
      setGetGymData({
        ...getGymData,
        contactEmail: gymData?.gymDetails?.contactEmail,
        timeZone: gymData?.gymDetails?.timezone
      })
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
      setHasTimezone((gymData.gymDetails?.timezone)?true:false);
      if(!gymData.gymDetails?.timezone) {
        setGymData(prevState => ({...prevState, 
          timezone: detectedTimezone?.zoneName, 
          gmtOffset: detectedTimezone?.gmtOffset}));
      }
      setHolidayData(gymData?.holidays);
      setValidateMsg({ ...validateMsg, disabledAccess: !gymData.editAccess });
      // if(!gymData?.gymDetails.timezone && detectedTimezone?.zoneName) setSuccessMsg(`Timezone auto detected as (${detectedTimezone.countryName} - ${detectedTimezone.zoneName}), but the data is not saved yet.`);
    } catch (e) {
      setErrorMsg(e.message);
      // Show error message from here
    } finally {
      setIsLoader(false);
    }
  };
  const getTimeZoneList = async () => {
    try {
      const timezoneList = await GymDetailsServices.fetchTimeZoneList();
      setTimezoneData(timezoneList);
    } catch (e) {
    }
  };

  const fetchCountry = async () => {
    try {
      const codeData = await GymDetailsServices.fetchCountry();
      setPhoneCountryCode(codeData);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };
  const fetchAccessCode = async () => {
    try {
      setIsLoader(true);
      const accessCodeNumber = await AttendanceServices.fetchAccessCode();
      setAccessCodeGen(accessCodeNumber?.accessCode);
    } catch (e) {
     
    } finally {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    fetchCountry();
    fetchGymDetails();
    getTimeZoneList();
    fetchAccessCode();
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
    // window.location.reload(false);
    setShowEditForm(false);
    
    setGymData({
      ...gymData,
      contactEmail: getGymData.contactEmail,
      // timeZone: getGymData.timeZone,
    })
    // setHasTimezone((gymData.gymDetails?.timezone)?true:false);
    if(getGymData?.timeZone) {
      setGymData(prevState => (
        {...prevState, 
          timezone: getGymData?.timeZone, 
          gmtOffset: detectedTimezone?.gmtOffset}
      )
    );
    }
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
        }).catch(err => {
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = validateField(e, true);
      if (isValid) {
        setIsLoader(true);
        let timezoneObj = gymData?.timezone.split(/[-()]/)
        let timezoneInfo = {
          abbr : timezoneObj[0],
          name : timezoneObj[1],
          utc_offset : timezoneObj[2]
        }

        const payload = {
          "orgName": gymData.name,
          "contactPerson": gymData.contactPerson,
          "phone": gymData.phone,
          "countryCode": (gymData.countryCode) ? gymData.countryCode : "+1",
          "country": (gymData.country) ? gymData.country : "US",
          "logo": gymData.logo,
          "contactEmail": gymData.contactEmail,
          "timeZone": gymData.timezone,
          "timezoneInfo" : timezoneInfo,
          "gmtOffset": (gymData.gmtOffset) ? gymData.gmtOffset : timezoneObj[2]
        };

        console.clear()
        const updatedData = await GymDetailsServices.gymDetailUpdate(payload);
        setGymData(updatedData);
        setHasTimezone((gymData.timezone) ? true: false);
        dispatch({
          type: actionTypes.USER_DATA,
          data: {...userData, organizationTimezone: gymData.timezone.toString(), organizationTimezoneInfo : timezoneInfo}
        });
        // setSuccessMsg("Gym details updated successfully");
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Gym details updated successfully",
          typeMessage: 'success'
        })
        // setTimeout(() => { setShowEditForm(false) }, 5000);
        setShowEditForm(false)
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
      console.clear()
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
        const timeZoneIndex = e.target[e.target.selectedIndex];
        const timezone = timeZoneIndex !== undefined ? timeZoneIndex.getAttribute("data-timezone") : "";
        setGymData({ ...gymData, [name]: timezone, gmtOffset:  value});
      } else {
        setGymData({ ...gymData, [name]: value });
      }
      
    } else {
      console.clear()
      let bool = false;
      if (gymData.name.length === 0) {
        setValidateMsg({ ...validateMsg, disabled: true, name: "Gym name should not be left empty" });
      } else if (!alphaRegex.test(gymData.contactPerson)) {
        setValidateMsg({ ...validateMsg, disabled: true, contactPerson: "Please enter a valid contact person name" });
      } else if (!phoneRegex.test(gymData.phone)) {
        setValidateMsg({ ...validateMsg, disabled: true, phone: "Please enter a valid 10 digit phone number" });
      } else if (!emailRegex.test(gymData.contactEmail)) {
        setValidateMsg({ ...validateMsg, disabled: true, contactEmail: "Please enter a valid email address" });
      } else if (typeof gymData.timezone === 'undefined' || gymData.timezone.length === 0) {
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
      // setSuccessMsg("Holiday deleted successfully");
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "Holiday deleted successfully",
        typeMessage: 'success'
      })
      fetchGymDetails();
    }
  };

  const deleteHolidayHandler = (e) => {
    setDeleteConfirmBox(true);
    setDeletedId(e.target.getAttribute("data-id"));
  };

  const deleteConfirm = (response) => {
    if (response === "yes") {
      deleteHoliday();
    } else {
      setDeleteConfirmBox(false);
    }
  };

  const editHolidayHandler = (elem) => {
    setEditHoliday(true);
    setHolidayVal(elem);
    setOpenModal(true);
    setOption(false);
  };

 const copy = (text) =>{
    navigator.clipboard.writeText(text);
    //setCopiedText(true);
  }
//const generatedNo ="00";
const generatedNo = JSON.stringify(accessCodeGen);
const codeGentextCopy = generatedNo.split("");





const fetchAccessCodeGenerate = async () => {
  try {
    setIsLoader(true);
    const accessCodeNumber = await AttendanceServices.fetchAccessCodeGenerate();
    
    setAccessCodeGen(accessCodeNumber?.accessCode); 
  } catch (e) {
   
  } finally {
    setIsLoader(false);
  }
};
const regenerateCodeHandler = (e) =>{
  e.preventDefault();
  fetchAccessCodeGenerate();  
}
const timezoneOffset = useSelector((state)=>(state?.user?.data?.organizationTimezoneInfo?.utc_offset)? state.user.data.organizationTimezoneInfo.utc_offset:null)


const base_url = window.location.origin;







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
        <div className="gymDetails ">
          <div className="gymdetails_left">
            {!showEditForm &&
              <div className="showing_gym_data not_disabled_data">
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
                <div className="formControl timezone gymInfo show">
                  <p className="cmnFieldName timezoneLbl">Timezone:</p>
                  {/* <select>
                    <option>{(gymData?.timezone) ? gymData?.timezone : "-"}</option>
                  </select> */}
                  <p>{(gymData?.timezone) ? gymData?.timezone : "-"}</p>
                </div>
                {/* <div className="lineBreak"></div> */}
                <div className="formControl timezone gymInfo show">
                  <p className="cmnFieldName timezoneLbl">Organization Email: <span class="infoSpan"><img src={infos} alt=""/><span class="tooltiptextInfo">It will be used for Email sending purpose from this platform as 'From'</span></span></p>
                  {/* <input type="text" value={gymData.contactEmail} /> */}
                  <p className="">{gymData.contactEmail}</p>
                </div>
                <div className="formControl timezone gymInfo show">
                  <p className="cmnFieldName timezoneLbl">Contact Email:</p>
                  {/* <input type="text" value={gymData.code + "@" + env.EMAIL_DOMAIN} /> */}
                  <p className="">{gymData.code + "@" + env.EMAIL_DOMAIN}</p>
                </div>
                <div className={hasTimezone ? "hide" : "cz_timezoneWarning"}>The timezone is not saved yet. Please edit the details and save the timezone.</div>
                <div className="accessCode">
                  <h3>Access Code 
                  <span class="infoSpan"><img src={infos} alt=""/><span class="tooltiptextInfo">Access code for gym stuff</span></span>
                  </h3>
                  <div className="code">
                    {
                      codeGentextCopy.map((elem, key) => {
                        return (
                          <span key={key}>{elem}</span>
                        )
                      }
                      )
                    }
                    <div className="relative infoSpan">
                      <button className={copiedText ? "copy_button active" : "copy_button"} onClick={() => {copy(generatedNo);setCopiedText(true);}}><img src={copyIcon} alt=""/></button>
                      {/* {copiedText && <span class="tooltiptextInfo">Copied</span>} */}
                    </div>
                    
                  </div> 
                 
                  <div className="d-flex justify-center copyBtn infoSpan">
                      <button className={editAccess?"btn_regenerate gymOwner": "btn_regenerate"} onClick={regenerateCodeHandler} 
                        disabled={editAccess ? "" :"disabled"}
                      >
                        <img src={regenerate} alt=""/> Regenerate
                      </button> {/*//use class "gymOwner" in button for colorful button */}
                      {!editAccess && <span class="tooltiptextInfo">Regenerate has been disabled</span>}
                  </div>
                  <div className="copy_url_gen">
                  {/* {config.appUrl is now base_url } */}
                    <span>{base_url}/check-in-portal <button onClick={() => window.open(base_url + "/check-in-portal")}>
                      <img src={target_blank} alt=""/>
                      </button></span>
                    
                    <div className="relative infoSpan">
                      <button className={copiedurl ? "copy_button active" : "copy_button"} onClick={() => {copy(base_url +"/check-in-portal");setCopiedurl(true);}}><img src={copyIcon} alt=""/></button>
                      {/* {copiedText && <span class="tooltiptextInfo">Copied</span>} */}
                      
                    </div>
                  </div>
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
                  <label>Organization Email</label>
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
                    {timezoneData ? timezoneData.map(zone => {
                      return (<option
                        value={zone.utc_offset}
                        data-timezone={zone.abbr+"-"+zone.name+"("+zone.utc_offset+")"}
                        selected={(zone.name.toLowerCase() == gymData?.timezoneInfo.name.toLowerCase()) ? true : false }
                        // selected={(parseInt(zone.gmtOffset) === detectedTimezone.gmtOffset) ? true : ""}
                      >{zone.abbr} - {zone.name}({zone.utc_offset})</option>);
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
                    <p>Manage your holiday</p>
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
                    <p>Manage your holiday</p>
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
                <div className="holidayListWrap tt">
                {holidayData.map((elem, key) => {
                  return (
                      
                  <div className="gymHolidayList">
                    <div className="cell">
                      {utils.convertUTCToTimezone(elem?.fromDate, timezoneOffset).split(" ").splice(0,3).join(" ")}
                      </div>
                    <div className="cell">
                      {utils.convertUTCToTimezone(elem?.toDate, timezoneOffset).split(" ").splice(0,3).join(" ")}
                      </div>
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