import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import profileAvatar from "../../../assets/images/camera.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import listIcon from "../../../assets/images/list_icon.svg";
import LoaderImg from "../../../assets/images/loader.gif";
import cam from "../../../assets/images/cam.svg";
import saveEdit from "../../../assets/images/saveEdit.svg";
import delEdit from "../../../assets/images/delEdit.svg";
import dot3gray from "../../../assets/images/dot3gray.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import profile_img from "../../../assets/images/chooseImg.svg";
import profile_png from "../../../assets/images/profile.png";
import gymLogo from "../../../assets/images/gymLogo.svg";
// import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";
import { PersonalDetailsServices } from "../../../services/personalDetails/PersonalDetailsServices";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";


const PersonalDetails = (props) => {
const [loader,setLoader] = useState(false);
const [isLoader, setIsLoader] = useState(false);
const [successMsg, setSuccessMsg] = useState("");
const [errorMsg, setErrorMsg] = useState("");
const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
    function handleFileChange(e) {
        console.log("type of img", e.target.files[0].type);
        if (e.target.files[0] && e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/jpeg") {
          let fileOrf = e.target.files[0];
            getBase64(fileOrf).then(result => {
              setFile(result);
          }).catch(err => {
            console.log(err);
          });
            setFileName(e.target.files[0].name);
        } else {
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Only JPG,JPEG & PNG format allowed",
            typeMessage: 'error'
          });
        }
        
    }
   const getBase64 = file => {
      return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          console.log("Called", reader);
          baseURL = reader.result;
          console.log(baseURL);
          resolve(baseURL);
        };
        console.log(fileInfo);
      });
    };
// personal details name validation start
    const [accountName, setAccountName] = useState({
      personalName: ""
    });
    const [accDetailErrors, setAccDetailErrors] = useState({});
    const [isSave, setisSave] = useState(false);


    const handleEditName = (e) => {
      let val = e.target.value;
      setAccountName ({personalName: val});
      console.log('accountName', accountName);
    }

    const validatePersonalDetail = async (values) => {
      console.log("Name", values.personalName)
      let errorsDisplay ={};       
      if (values.personalName.length >30) {
        console.log("length of the name is", values.personalName.length);
        errorsDisplay.personalName = "Name must be within 30 characters";        
      }  
      if (!values.personalName) {
        errorsDisplay.personalName = "Name is required!";        
      }    
      setAccDetailErrors(errorsDisplay);
      return errorsDisplay;
      
    };
  

    const personalInfosSave = async (e) => {      
      let validationResp = await validatePersonalDetail(accountName);
      console.log("validationResp",validationResp)
      if (!validationResp.personalName) {
        setToggleEditName(false);

        var spacing = accountName.personalName.split(" ");  // Gets the first index where a space occour
        var first_name = spacing[0] // Gets the first part
        var last_name = spacing[1] ? spacing[1] : "";  // Gets the later part

        setIsLoader(true);
        let payload = {
          firstName: first_name,
          lastName: last_name,
          file: file ? file : "",
          filename: fileName ? fileName : ""
        }
        try {
          let resp = await PersonalDetailsServices.updateAccountDetail(payload);
          console.log("Response of Account Deails", resp);
          // Success toaster
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: resp,
            typeMessage: 'success'
          });

          // Success toaster
        } catch (e) {
          // Error toaster
          console.log('Error error error error')          
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: e.message,
            typeMessage: 'error'
          });
          // Error toaster
        } finally {
          setIsLoader(false);
        }
      

        
      }
    };

    const handleNameSubmit = (e) => {
      e.preventDefault();
      
      setisSave(true);
      //console.log(formValues);
    };

    useEffect (()=> {
      console.log(accDetailErrors);
      if(Object.keys(accDetailErrors).length ===0 && isSave){
        console.log(accountName);
      }
    },[accDetailErrors]); 

    // personal details name validation end
    
  const [formValues, setformValues] = useState({
    currentPassword: "", 
    newPassword: "", 
    confirmNewPassword: "",
    timezones: "",
    countryLists: ""
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);

const handleChangeNew = (e) => {
  const value = e.target.value;
  const name = e.target.name;
  // console.log(name, value);
  setformValues ({...formValues, [name]: value});
  setformErrors ({...formErrors, [name]: ""});
};


const handleSubmit = async (e) => {
  setIsLoader(true);
  e.preventDefault();
  let errorCheck = validate(formValues);
  console.log(errorCheck);
  if (Object.keys(errorCheck).length === 0){
    console.log(formValues);


    var Time_ZoneCode = formValues.timezones;
    var Country_Listings = formValues.countryLists;
    var Current_Passwords = formValues.currentPassword;
    var New_Passwords = formValues.newPassword;
    var Confirm_NewPasswords = formValues.confirmNewPassword;
    
    // console.log("Updated TimeZone:" , Time_ZoneCode);
    // console.log("Updated Country:" , Country_Listings);
    // console.log("Current Password:" , Current_Passwords);
    // console.log("Updated New Password:" , New_Passwords);
    // console.log("Updated Confirm Password:" , Confirm_NewPasswords);
    
    let payload = {
      countryId: Country_Listings,
      timezone: Time_ZoneCode 
    }
    
    if(Current_Passwords && New_Passwords && Confirm_NewPasswords) {
      payload.currentPassowrd = Current_Passwords;
      payload.newPassowrd = New_Passwords;
      payload.confirmPassowrd = Confirm_NewPasswords;
    }
    
    try {
      let response = await PersonalDetailsServices.updateBasicSetting(payload);
      console.log("response of basic settings", response);
      // Success toaster
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: response,
        typeMessage: 'success'
      });
    } catch (e) {
      console.log('ppppppp')
      // Error toaster
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setIsLoader(false);
    }
  } else {
    setIsLoader(false);
    setformErrors(errorCheck);
  }
  setisSubmit(true);



};

const validate = (values) => {
  console.log("The values are:", values);
  const errors ={};
  if (!values.currentPassword && !values.newPassword && values.confirmNewPassword) {
    errors.currentPassword = "Current Password is required!"
    errors.newPassword = "New Password is required!"
  }  
  if (!values.confirmNewPassword && !values.newPassword && values.currentPassword) {
    errors.newPassword = "New Password is required!"
    errors.confirmNewPassword = "Confirm Password is required!"    
  }
  if (!values.currentPassword && !values.confirmNewPassword && values.newPassword) {
    errors.confirmNewPassword = "Confirm Password is required!"
    errors.currentPassword = "Current Password is required!"
  }
  if (!values.currentPassword && values.newPassword && values.confirmNewPassword) {
    errors.currentPassword = "Current Password is required!"
  }  
  if (values.confirmNewPassword && !values.newPassword && values.currentPassword) {
    errors.newPassword = "New Password is required!"   
  }
  if (!values.confirmNewPassword && values.currentPassword && values.newPassword) {
    errors.confirmNewPassword = "Current Password is required!"
  }
  if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword = "Password is not matching!"
  }
  if (!values.timezones) {
    errors.timezones = "Timezone is required!"    
  }
  if (!values.countryLists) {
    errors.countryLists = "Country is required!"
  }
  return errors;  
};

useEffect (()=> {
  console.log(formErrors);
  if(Object.keys(formErrors).length ===0 && isSubmit){
    console.log(formValues);}},[formErrors]);

  const [toggleEditName, setToggleEditName] = useState({
    status: false,
  });

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, 5000);
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, 5000);
  }, [errorMsg, successMsg]);

  const toggleEditNameFn = (e, personalData) => {
    e.preventDefault();
    console.log('sadasdsadasd', personalData)
    
    setToggleEditName({
      ...toggleEditName,
      status: !toggleEditName.status,
    });
  };



  const personalInfosReject = () => {
    setToggleEditName(false);
    setAccDetailErrors(false);
    setFile(false);
  };
 

// Setting up Country && list timezone
const [getCountry, setGetCountry] = useState([]);
const [timezoneData, setTimezoneData] = useState([]);
const [personalData, setPersonalData] = useState([]);

const getCountryList = async () => {
  try {
    setIsLoader(true);
    const response = await PersonalDetailsServices.fetchCountryDetail();
    console.log("Country List --", response);
    setGetCountry(response);
  } catch (e) {
    console.log(e.message);
  }finally {
    setIsLoader(false);
  }
};
useEffect(() => {
  getCountryList();
  getTimeZoneList();
  getPersonalDetailList();
}, []);
 

const getTimeZoneList = async () => {
  try {
    setIsLoader(true);
    const timezoneList = await PersonalDetailsServices.fetchTimeZoneList();
    console.log("Timezone List --", timezoneList);
    setTimezoneData(timezoneList.zones);
  } catch (e) {
    console.log(e.message);
  }finally {
    setIsLoader(false);
  }
};

const getPersonalDetailList = async () => {
  try {
    const personalDetailList = await PersonalDetailsServices.fetchPersonalDetail();
    console.log("Personal Details --", personalDetailList);
    setPersonalData(personalDetailList);
    setAccountName({
      ...accountName,
      personalName: personalDetailList[0].firstName + " " + personalDetailList[0].lastName
    });
    setformValues ({...formValues, country: personalDetailList[0].country, timezones: personalDetailList[0].timezone, countryLists: personalDetailList[0].country._id });
  } catch (e) {
    console.log(e.message);
  }
};
 
  return (
    <>
    {(isLoader) ? <Loader /> : ''}
    <div className="dashInnerUI">
        <div className="userListHead detailsPage">
          <div className="listInfo">
            <ul className="listPath">
              <li>Settings </li>
              <li> Personal Details</li>
            </ul>
            <h2 className="inDashboardHeader">
              Personal Details
            </h2>
            <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
          </div>
        </div>



        <div className="gymDetails personalPage">
          <div className="gymdetails_left">
            <h3 className="leftSectionHeader">Account Details</h3>
              <div className="showing_gym_data personalInfos">
                <div className="gymName">
                
                  <div className="profilePicture personalDetailPage">
                    <span className={toggleEditName.status ? "profileImgSection hideThis" : "profileImgSection"}>
                     

                      {personalData ? personalData.map((personalDetailsImg, i) => {
                        console.log("personalDetailsImg", personalDetailsImg)
                      return (
                      <img key={"img-" + i} src={personalDetailsImg.image ? config.bucketUrl + personalDetailsImg.image : profile_img} className={file ? "profileImage hideThis" : "profileImage"} alt="" /> 
                      );
                    }) : <img src={profile_img}  className={file ? "profileImage hideThis" : "profileImage"} alt="" />} 

                      {file && (
                      	<>
                          <img src={file} className="profileImage" alt="" />
                          {loader && (
                                <>
                                  <span className="hoverEffects loadings">
                                    <img src={LoaderImg} className="camImg loadersImg" alt="" />
                                  </span> 
                                </>
                              )}  
                        </>
                      )}
                    </span>
                    {toggleEditName.status && (
                      	<>
                          <span className="editProfileImgWraper">
                            <span className="profileUpload">
                              <input type="file" onChange={handleFileChange} />
                            </span>
                            <span className="profileImgSection">
                              <img src={ file ? file : profile_img} className="profileImage" alt="" /> 
                              <span className="hoverEffects">
                                <img src={cam} className="camImg" alt="" />
                              </span>                             
                                                 
                            </span>
                            
                          </span>
                        </>
                      )}  
                    <span className={toggleEditName.status ? "profileNameDisplay hideThis" : "profileNameDisplay"}>
                    <span className="profileName" >{accountName.personalName}</span>

                      
                      <button className="editPersonalName" onClick={(e) => toggleEditNameFn(e, personalData)}><img src={edit_gym} alt=""/></button>
                    </span>
                    {toggleEditName.status && (
                      	<>
                        <form onSubmit={handleNameSubmit}>
                          <span className="profileNameDisplayEdits">
                          
                           <input className="editPersonalDetailsNames" value={accountName.personalName}  type="text" onChange={handleEditName} name="" /> 
                        
                          <span className="errorMsg">{accDetailErrors.personalName}</span> 

                            <button className="editPersonalNameSave" onClick={() => personalInfosSave()}><img src={saveEdit} alt=""/></button>
                            <button className="editPersonalNameDelete" onClick={() => personalInfosReject()}><img src={delEdit} alt=""/></button>
                          </span>
                          </form>
                        </>
                      )}  
                  </div>
                 
                  
                </div>
                <div className="gymInfo full">
                  <p className="textType1">Email <span>:</span></p>

                  {personalData ? personalData.map((personalDetails, i) => {
                      return (                      
                      <p className="textType4" key={i} >{personalDetails.email}</p>
                      );
                    }) : 'No email provided'}                       
                </div>
              </div>  
          </div>


          <div className="gymdetails_right personalDetailsInfosDisplay">
              <div className="holidayListHeader">
                <h3>Basic Settings</h3>                  
              </div>
              <form onSubmit={handleSubmit}>
              <div className="detailsForm">
                
                  <div className="formControl">
                    <label>Timezone</label>
                    {console.log("personalData", personalData)}
                    <select
                        name="timezones"
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }} 
                        onChange={handleChangeNew}
                        // defaultValue={personalData[0] ? personalData[0].timezone : ""}
                        >
                        <option value="">Select Timezone</option>
                     {timezoneData ? timezoneData.map((zones, i) => {
                      return (
                      <option key={i} 
                        value={zones.zoneName}
                        selected={(zones.zoneName === (personalData.length && personalData[0].timezone ? personalData[0].timezone : "")) ? true : false }
                      >{zones.countryCode} - {zones.zoneName}</option>
                      );
                    }) : ''}                                     
                    </select>
                    <span className="errorMsg">{formErrors.timezones}</span>
                  </div>
                  <div className="formControl">
                    <label>Select Country</label>
                    <select
                        name="countryLists"
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }} 
                        onChange={handleChangeNew} 
                        // defaultValue={personalData[0] && personalData[0].country ? personalData[0].country._id : ""}
                         >
                        <option value="">Select Country</option>
                      {getCountry ? getCountry.map((country, i) => {
                      return (
                      <option key={i}
                        value={country._id} 
                        selected={(country._id === (personalData.length && personalData[0].country._id ? personalData[0].country._id : "")) ? true : false }                                        
                      >{country.name}</option>
                      );
                    }) : ''}                     
                    </select>
                    <span className="errorMsg">{formErrors.countryLists}</span>
                  </div>
                
              </div>

              <div className="holidayListHeader passwordSection">
                <h3>Change Password</h3>                  
              </div>
              <div className="detailsForm">
               
                  <div className="formControl">
                    <label>Current Password</label>
                   <input type="password" name="currentPassword" defaultValue={formValues.currentPassword} onChange={handleChangeNew} />
                   <span className="errorMsg">{formErrors.currentPassword}</span>
                  </div>
                  
                  <div className="formControl">
                    <label>New Password</label>
                    <input type="password" name="newPassword" defaultValue={formValues.newPassword} onChange={handleChangeNew} />
                    <span className="errorMsg">{formErrors.newPassword}</span>
                  </div>
                  <div className="formControl">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmNewPassword" defaultValue={formValues.confirmNewPassword} onChange={handleChangeNew} />
                    <span className="errorMsg">{formErrors.confirmNewPassword}</span>
                  </div>
                  <div className="formControl">
                  <button type="submit" className="saveNnewBtn"><span>Save</span><img src={arrowRightWhite} alt="" /></button>
                  </div>                
              </div>
              </form>
          </div>
        </div>
    </div>
    </>
  );
};

export default PersonalDetails;
