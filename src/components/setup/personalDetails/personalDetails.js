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


    // const [accountName, setAccountName] = useState({
    //   personalName: ""
    // });
    // const [accDetailErrors, setAccDetailErrors] = useState({});
    // const [isSave, setisSave] = useState(false);


    // const handleEditName = (e) => {
    //   let val = e.target.value;
    //   setAccountName ({...accountName, personalName: val});
    //   console.log(accountName);
    // }

    // const validatePersonalDetail = (values) => {
    //   const errors ={};
    //   if (!values.personalName) {
    //     errors.personalName = "Personal name is required!"
    //   }  
    //     return errors;
      
    // };
  

    const closeModalSave = () => {
      setToggleEditName(false);
      setLoader(true);
      setTimeout(() => { setLoader(false); }, 4000);

      // setAccDetailErrors(validatePersonalDetail(accountName));
      // setisSave(true);
    };

    // useEffect (()=> {
    //   console.log(accDetailErrors);
    //   if(Object.keys(accDetailErrors).length ===0 && isSave){
    //     console.log(accountName);}},[accDetailErrors]);
    
      // const [toggleEditName, setToggleEditName] = useState({
      //   status: false,
      // });

  // const initialValues= {currentPassword: "", newPassword: "", confirmNewPassword: ""};
  // console.log("Type of value" ,typeof initialValues);
  const [formValues, setformValues] = useState({
    currentPassword: "", 
    newPassword: "", 
    confirmNewPassword: ""
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);

const handleChange = (e) => {
  let val = e.target.value;
  setformValues ({...formValues, currentPassword: val});
  console.log(formValues)
};

const handleChangenewPassword = (e) => {
  let val = e.target.value;
  setformValues ({...formValues, newPassword: val});
  console.log(formValues)
};

const handleChangeConfirmNewPassword = (e) => {
  let val = e.target.value;
  setformValues ({...formValues, confirmNewPassword: val});
  console.log(formValues)
};


const handleSubmit = (e) => {
  e.preventDefault();
  setformErrors(validate(formValues));
  setisSubmit(true);
  //console.log(formValues);
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


  return errors;
  
};

useEffect (()=> {
  console.log(formErrors);
  if(Object.keys(formErrors).length ===0 && isSubmit){
    console.log(formValues);}},[formErrors]);

  const [toggleEditName, setToggleEditName] = useState({
    status: false,
  });



  const toggleEditNameFn = (e) => {
    e.preventDefault();
    setToggleEditName({
      ...toggleEditName,
      status: !toggleEditName.status,
    });
  };



  const closeModalReject = () => {
    setToggleEditName(false);
    setFile(false);
  };
 

// Setting up Country && list timezone
const [getCountry, setGetCountry] = useState([]);
const [timezoneData, setTimezoneData] = useState([]);

const getCountryList = async () => {
  try {
    const response = await PersonalDetailsServices.fetchCountryDetail();
    console.log("Country List --", response);
    setGetCountry(response.name);
    console.log("CountryNames", setGetCountry.name);
  } catch (e) {
    console.log(e.message);
  }
};
useEffect(() => {
  getCountryList();
  getTimeZoneList();
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
                      <img src={profile_png} className={file ? "profileImage hideThis" : "profileImage"} alt="" />
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
                      <span className="profileName">Jonathan Doe</span>
                      <button className="editPersonalName" onClick={(e) => toggleEditNameFn(e)}><img src={edit_gym} alt=""/></button>
                    </span>
                    {toggleEditName.status && (
                      	<>
                          <span className="profileNameDisplayEdits">
                          <input className="editPersonalDetailsNames" defaultValue="Jonathan Doe" type="text" name="" maxlength="29" />
                          {/* onChange={handleEditName} */}
                          {/* <span className="errorMsg">{accDetailErrors.personalName}</span> */}

                            <button className="editPersonalNameSave" onClick={() => closeModalSave()}><img src={saveEdit} alt=""/></button>
                            <button className="editPersonalNameDelete" onClick={() => closeModalReject()}><img src={delEdit} alt=""/></button>
                          </span>
                        </>
                      )}  
                  </div>
                 
                  
                </div>
                <div className="gymInfo full">
                  <p className="textType1">Email <span>:</span></p>
                    <p className="textType4">kallol.banerjee@tier5.in</p>
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


          <div className="gymdetails_right">
              <div className="holidayListHeader">
                <h3>Basic Settings</h3>                  
              </div>
              <form onSubmit={handleSubmit}>
              <div className="detailsForm">
                
                  <div className="formControl">
                    <label>Timezone</label>
                    <select
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }}>
                        <option value="">-</option>
                     {timezoneData ? timezoneData.map(zones => {
                      // return (
                      // <option
                      //   value={timezoneData}
                      //   data-timezone={timezoneData.zoneName}
                      //   selected={(timezoneData.zoneName === PersonalDetailsServices?.timezoneList) ? true : false }
                      // >{timezoneData.countryCode} - {timezoneData.zoneName}</option>
                      // );
                    }) : ''}                                     
                    </select>
                  </div>
                  <div className="formControl">
                    <label>Select Country</label>
                    <select
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }}>
                        <option value="">-</option>
                      {getCountry ? getCountry.map(zone => {
                      return (
                      <option
                        value={zone.setGetCountry}
                        selected={(zone.setGetCountry === PersonalDetailsServices?.setGetCountry) ? true : false }
                        // selected={(parseInt(zone.gmtOffset) === detectedTimezone.gmtOffset) ? true : ""}
                      >{zone.setGetCountry}</option>
                      );
                    }) : ''}                     
                    </select>
                  </div>
                
              </div>

              <div className="holidayListHeader passwordSection">
                <h3>Change Password</h3>                  
              </div>
              <div className="detailsForm">
               
                  <div className="formControl">
                    <label>Current Password</label>
                   <input type="password" name="" defaultvalue={formValues.currentPassword} onChange={handleChange} />
                   <span className="errorMsg">{formErrors.currentPassword}</span>
                  </div>
                  
                  <div className="formControl">
                    <label>New Password</label>
                    <input type="password" name="" defaultvalue={formValues.newPassword} onChange={handleChangenewPassword} />
                    <span className="errorMsg">{formErrors.newPassword}</span>
                  </div>
                  <div className="formControl">
                    <label>Confirm New Password</label>
                    <input type="password" name="" defaultvalue={formValues.confirmNewPassword} onChange={handleChangeConfirmNewPassword} />
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
