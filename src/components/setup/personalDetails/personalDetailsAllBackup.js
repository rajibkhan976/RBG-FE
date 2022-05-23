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
import profile_img from "../../../assets/images/profile.svg";
import profile_png from "../../../assets/images/profile.png";
import gymLogo from "../../../assets/images/gymLogo.svg";
// import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";
import { PersonalDetailsServices } from "../../../services/personalDetails/PersonalDetailsServices";




const PersonalDetails = (props) => {
const [loader,setLoader] = useState(false);
  
  const [file, setFile] = useState(false);
    function handleFileChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

// personal details name validation start
    const [accountName, setAccountName] = useState({
      personalName: ""
    });
    const [accDetailErrors, setAccDetailErrors] = useState({});
    const [isSave, setisSave] = useState(false);


    const handleEditName = (e) => {
      let val = e.target.value;
      setAccountName ({...accountName, personalName: val});
      console.log(accountName);
    }

    const validatePersonalDetail = (values) => {
      const errorsDisplay ={};
      if (!values.personalName) {
        errorsDisplay.personalName = "Name is required!";        
      }  
        return errorsDisplay;
      
    };
  

    const closeModalSave = () => {
      if (accountName.personalName) {
        setToggleEditName(false);
      } else {
        setAccDetailErrors(false);
        setLoader(true);
       setTimeout(() => { setLoader(false); }, 4000)
      }  
      var spacing = accountName.personalName.indexOf(" ");  // Gets the first index where a space occour
      var first_name = accountName.personalName.substr(0, spacing); // Gets the first part
      var last_name = accountName.personalName.substr(spacing + 1);  // Gets the later part
     console.log("Updated First Name:" , first_name);

     console.log("Updated Last Name:" , last_name);
      

      
      // setToggleEditName(false);
      // setLoader(true);
      // setTimeout(() => { setLoader(false); }, 4000);

   
    };

    const handleNameSubmit = (e) => {
      e.preventDefault();
      setAccDetailErrors(validatePersonalDetail(accountName));
      setisSave(true);
      //console.log(formValues);
    };

    useEffect (()=> {
      console.log(accDetailErrors);
      if(Object.keys(accDetailErrors).length ===0 && isSave){
        console.log(accountName);
      }
    },[accDetailErrors]);
    
 

    // personal details name validation start
    
  // const initialValues= {currentPassword: "", newPassword: "", confirmNewPassword: ""};
  // console.log("Type of value" ,typeof initialValues);
  const [formValues, setformValues] = useState({
    currentPassword: "", 
    newPassword: "", 
    confirmNewPassword: "",
    timezones: "",
    countryLists: ""
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);

// const handleChange = (e) => {
//   let val = e.target.value;
//   setformValues ({...formValues, currentPassword: val});
//   console.log(formValues)
// };

// const handleChangenewPassword = (e) => {
//   let val = e.target.value;
//   setformValues ({...formValues, newPassword: val});
//   console.log(formValues)
// };

// const handleChangeConfirmNewPassword = (e) => {
//   let val = e.target.value;
//   setformValues ({...formValues, confirmNewPassword: val});
//   console.log(formValues)
// };

// const handleChangeTimezone = (e) => {
//   let val = e.target.value;
//   setformValues ({...formValues, timezones: val});
//   console.log(formValues)
// };

// const handleChangeCountry = (e) => {
//   let val = e.target.value;
//   setformValues ({...formValues, countryLists: val});
//   console.log(formValues)
// };

const handleChangeNew = (e) => {
  const value = e.target.value;
  const name = e.target.name;
  // console.log(name, value);
  setformValues ({...formValues, [name]: value});
  setformErrors ({...formErrors, [name]: ""});
};


const handleSubmit = (e) => {
  e.preventDefault();
  let errorCheck = validate(formValues);
  console.log(errorCheck);
  if (Object.keys(errorCheck).length === 0){
    console.log(formValues);
  } else {
    setformErrors(errorCheck);
  }
  setisSubmit(true);
};

const validate = (values) => {
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



  const toggleEditNameFn = (e, personalData) => {
    e.preventDefault();
    console.log('sadasdsadasd', personalData)
    if (personalData[0] !== undefined) {
      setAccountName({
        ...accountName,
        personalName: personalData[0].firstName + " " + personalData[0].lastName
      });
    }
    setToggleEditName({
      ...toggleEditName,
      status: !toggleEditName.status,
    });
  };



  const closeModalReject = () => {
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
    const response = await PersonalDetailsServices.fetchCountryDetail();
    console.log("Country List --", response);
    setGetCountry(response);
  } catch (e) {
    console.log(e.message);
  }
};
useEffect(() => {
  getCountryList();
  getTimeZoneList();
  getPersonalDetailList();
}, []);
 

const getTimeZoneList = async () => {
  try {
    const timezoneList = await PersonalDetailsServices.fetchTimeZoneList();
    console.log("Timezone List --", timezoneList);
    setTimezoneData(timezoneList.zones);
  } catch (e) {
    console.log(e.message);
  }
};

const getPersonalDetailList = async () => {
  try {
    const personalDetailList = await PersonalDetailsServices.fetchPersonalDetail();
    console.log("Personal Details --", personalDetailList);
    setPersonalData(personalDetailList);
  } catch (e) {
    console.log(e.message);
  }
};





const submitBasicSettings = (e) => {
  e.preventDefault();
  console.log("Click is working",formValues );
};

  
  return (
    <>
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
                      return (
                      <img src={personalDetailsImg.image ? personalDetailsImg.image : ""} className={file ? "profileImage hideThis" : "profileImage"} alt="" />
                      );
                    }) : <img src={file}  className={file ? "profileImage hideThis" : "profileImage"} alt="" />} 

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
                              <img src={file} className="profileImage" alt="" /> 
                              <span className="hoverEffects">
                                <img src={cam} className="camImg" alt="" />
                              </span> 

                              
                                                 
                            </span>
                            
                          </span>
                        </>
                      )}  
                    <span className={toggleEditName.status ? "profileNameDisplay hideThis" : "profileNameDisplay"}>
                    {personalData ? personalData.map((personalDetailsNames, i) => {
                      return (                      
                        <span className="profileName" key={i} >{personalDetailsNames.firstName} {personalDetailsNames.lastName}</span>
                      );
                    }) : ''} 

                      
                      <button className="editPersonalName" onClick={(e) => toggleEditNameFn(e, personalData)}><img src={edit_gym} alt=""/></button>
                    </span>
                    {toggleEditName.status && (
                      	<>
                        <form onSubmit={handleNameSubmit}>
                          <span className="profileNameDisplayEdits">
                          {/* {personalData ? personalData.map((personalDetailsNames, i) => {
                            return (                      
                             
                              <input className="editPersonalDetailsNames" key={i}  defaultValue={personalDetailsNames.firstName} type="text" name="" maxlength="29" />
                            );
                          }) : ''}  */}
                           <input className="editPersonalDetailsNames" value={accountName.personalName}  type="text" onChange={handleEditName} name="" /> 
                        
                          <span className="errorMsg">{accDetailErrors.personalName}</span> 

                            <button className="editPersonalNameSave" onClick={() => closeModalSave()}><img src={saveEdit} alt=""/></button>
                            <button className="editPersonalNameDelete" onClick={() => closeModalReject()}><img src={delEdit} alt=""/></button>
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
                {/* <div className="gymInfo full d-flex">
                  <div className="gymInfo half d-flex">
                    <p className="textType1">Plan <span>:</span></p>
                    <p className="textType3">Platinum</p>
                  </div>
                  <div className="gymInfo half textRight">
                  <button className="common_blue_button">Upgrade <img alt="" src={arrowRightWhite} /></button>
                  </div>
                </div> */}
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
                    <select
                        name="timezones"
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }} onChange={handleChangeNew}>
                        <option value="">Select Timezone</option>
                     {timezoneData ? timezoneData.map((zones, i) => {
                      return (
                      <option key={i} 
                        value={zones.zoneName}
                        data-timezone={zones.zoneName}
                        //selected={(zones.zoneName === PersonalDetailsServices?.zones) ? true : false }
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
                        }} onChange={handleChangeNew} >
                        <option value="">Select Country</option>
                      {getCountry ? getCountry.map((countryZones, i) => {
                      return (
                      <option key={i}
                        value={countryZones._id}                        
                      >{countryZones.name}</option>
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
                   <input type="password" name="currentPassword" defaultvalue={formValues.currentPassword} onChange={handleChangeNew} />
                   <span className="errorMsg">{formErrors.currentPassword}</span>
                  </div>
                  
                  <div className="formControl">
                    <label>New Password</label>
                    <input type="password" name="newPassword" defaultvalue={formValues.newPassword} onChange={handleChangeNew} />
                    <span className="errorMsg">{formErrors.newPassword}</span>
                  </div>
                  <div className="formControl">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmNewPassword" defaultvalue={formValues.confirmNewPassword} onChange={handleChangeNew} />
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
