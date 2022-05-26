import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import cam from "../../../assets/images/cam.svg";
import saveEdit from "../../../assets/images/saveEdit.svg";
import delEdit from "../../../assets/images/delEdit.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import profile_img from "../../../assets/images/chooseImg.svg";
import config from "../../../configuration/config";
import { PersonalDetailsServices } from "../../../services/personalDetails/PersonalDetailsServices";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";
import { useSelector } from "react-redux";

const PersonalDetails = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [getCountry, setGetCountry] = useState([]);
  const [timezoneData, setTimezoneData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [formValues, setformValues] = useState({
    currentPassword: "", 
    newPassword: "", 
    confirmNewPassword: "",
    timezones: "",
    countryLists: ""
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [editDetails, setEditDetails] = useState({
    name: "",
    image: ""
  });
    const [accDetailErrors, setAccDetailErrors] = useState({});
    const [userData, setUserData] = useState({});
    const loggedInUser = useSelector((state) => state.user.data);

    useEffect(() => {
      setUserData(loggedInUser);
    }, [loggedInUser]);


    const handleFileChange = (e) => {
      if (e.target.files[0] && (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/jpeg")) {
        if ( e.target.files[0].size < 5000000){
          let fileOrf = e.target.files[0];
          getBase64(fileOrf).then(result => {
            setFile(result);
            setEditDetails({
              ...editDetails,
              image: result
            });
            }).catch(err => {
              console.log(err);
            });
          setFileName(e.target.files[0].name);
        } else {
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Max size allowed is 4 MB",
            typeMessage: 'error'
          });
        }
        
      } else {
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Only JPG,JPEG & PNG format allowed. ",
          typeMessage: 'error'
        });
      }
      
  }
  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
    const handleEditName = (e) => {
      let val = e.target.value;
      // setAccountName ({personalName: val});
      // console.log('accountName', accountName);
      setEditDetails ({
        ...editDetails,
        name: val
      });
      //console.log('Edited accountName', editedName);
    }

    const validatePersonalDetail = async (values) => {
      console.log("Name ids", values)
      let errorsDisplay ={};       
      if (values.name.length >30) {
        console.log("length of the name is", values.name);
        errorsDisplay.name = "Name must be within 30 characters";        
      }  
      if (values.name.replace(/\s/g, '').length===0) {
        console.log("length of the name is", values.name);
        errorsDisplay.name = "Enter proper name.";        
      }
      if (!values.name) {
        console.log("length of the name is", values.name);
        errorsDisplay.name = "Name is required!";        
      }    
      setAccDetailErrors(errorsDisplay);
      return errorsDisplay;
      
    };
  

    const personalInfosSave = async (e) => {
      e.preventDefault();    
      let validationResp = await validatePersonalDetail(editDetails);
      if (!validationResp.name) {
        setToggleEditName(false);
        
        // var spacing = editedName.personalName.split(" ");  // Gets the first index where a space occour
        // var first_name = spacing[0] // Gets the first part
        // var last_name = spacing[1] ? spacing[1] : "";  // Gets the later part
        var editName = editDetails.name.replace(/^\s+|\s+$/gm,'');
        console.log("Edited name without space:", editName);
        if(editName.indexOf(" ") > 0){
          var spacing = editName.indexOf(" "); // Gets the first index where a space occour
          console.log("Spacing is :", spacing);
          var first_name = editName.substr(0, spacing).replace(/^\s+|\s+$/gm,''); // Gets the first part
          var last_name = editName.substr(spacing + 1).replace(/^\s+|\s+$/gm,''); // Gets the later part

        } else{
          var first_name = editName.replace(/^\s+|\s+$/gm,'');
          var last_name = ""; // Gets the later part
        }
        
        // var spacing = editDetails.name.indexOf(" "); // Gets the first index where a space occour
        // console.log("Spacing is :", spacing);
        // var first_name = editDetails.name.substr(0, spacing); // Gets the first part
        // var last_name = editDetails.name.substr(spacing + 1); // Gets the later part

        setIsLoader(true);
        let payload = {
          firstName: first_name ,
          lastName: last_name,
          file: file ? file : "",
          filename: fileName ? fileName : ""
        }
        console.log(payload)
        try {
          let resp = await PersonalDetailsServices.updateAccountDetail(payload);
          //console.log("Response of Account Deails", resp);
          getPersonalDetailList()
          // Success toaster
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: resp,
            typeMessage: 'success'
          });

          // Success toaster
        } catch (e) {
          // Error toaster
          //console.log('Error error error error')          
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

    // personal details name validation end

    


  const handleChangeNew = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, value);
    setformValues ({...formValues, [name]: value});
    setformErrors ({...formErrors, [name]: ""});
  };


  const handleSubmit = async (e) => {
    setIsLoader(true);
    e.preventDefault();
    let errorCheck = validate(formValues);
  //console.log(errorCheck);
    if (Object.keys(errorCheck).length === 0){
      //console.log(formValues);


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

        // Prior of reseting the values of passwords to blank
        console.log("Curresnt password prior rest", formValues.currentPassword);
        console.log("New password after prior", formValues.newPassword);
        console.log("Confirm password prior rest", formValues.confirmNewPassword);
        // Prior of reseting the values of passwords to blank

        let response = await PersonalDetailsServices.updateBasicSetting(payload);
        //console.log("response of basic settings", response);
        // Success toaster
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: response,
          typeMessage: 'success'
        });
      } catch (e) {
        //console.log('ppppppp')
        // Error toaster
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
      } finally {
       
        // Reset the values of passwords to blank
        setIsLoader(false);
        const tempFormValues = {...formValues};
        // console.log("tempFormValues 259 ::: :::: ", tempFormValues )
        tempFormValues.currentPassword="";
        tempFormValues.newPassword="";
        tempFormValues.confirmNewPassword="";
        // console.log("tempFormValues 263 ::: :::: ", tempFormValues )
        setformValues(tempFormValues)
        // Reset the values of passwords to blank
        // setformValues({
        //   ...formValues,
        //   currentPassword:null,
        //   newPassword: null,
        //   confirmNewPassword:null
        // })

        // console.log("Curresnt password after rest", formValues.currentPassword);
        // console.log("New password after rest", formValues.newPassword);
        // console.log("Confirm password after rest", formValues.confirmNewPassword);
        
        
      }
    } else {
      setIsLoader(false);
      setformErrors(errorCheck);
    }
    setisSubmit(true);



  };

  // useEffect(()=>{
  //   console.log("formValues")
  // },[formValues])

  const validate = (values) => {
    //console.log("The values are:", values);
    const errors ={};
    let passwordValid;
      passwordValid = values.newPassword.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/);
    // if (values.newPassword.length < 8) {
    //   errors.newPassword = "New password must be of 8 characters"
    // } 
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
    } else if(!passwordValid && values.currentPassword && values.confirmNewPassword) {
      errors.newPassword = "New password must contain @/#/!, numeric, character, one upper case, one lower case."
    } else if(values.newPassword.length < 8 && values.currentPassword && !values.confirmNewPassword) {
      errors.newPassword = "New password is required and must be of minimum 8 characters."
    }
    if (values.currentPassword === values.newPassword) {
      errors.newPassword = "New password and current cannot be same!"
    }  
    if (!values.currentPassword && values.newPassword && values.confirmNewPassword) {
      errors.currentPassword = "Current Password is required!"
    }  
    if (values.confirmNewPassword && !values.newPassword && values.currentPassword) {
      errors.newPassword = "New password is required and must be of minimum 8 characters."   
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
    //console.log(formErrors);
    if(Object.keys(formErrors).length ===0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors]);

  const [toggleEditName, setToggleEditName] = useState({
    status: false,
  });

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, 5000);
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, 5000);
    if (isLoader) setTimeout(() => { setIsLoader(false) }, 8000);
  }, [errorMsg, successMsg]);

  const toggleEditNameFn = (e) => {
    e.preventDefault();
    setEditDetails({
      ...editDetails,
      name: personalData.firstName + " " + personalData.lastName,
      image: config.bucketUrl + personalData.image
    })
    // setting the edited value back to that of current value
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

const getCountryList = async () => {
  try {
    setIsLoader(true);
    const response = await PersonalDetailsServices.fetchCountryDetail();
    setGetCountry(response);
  } catch (e) {
    console.log(e.message);
  } finally {
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
    setPersonalData(personalDetailList);
    
    setUserData({
      ...userData,
      fullName: personalDetailList.firstName + " " + personalDetailList.lastName,
      name: personalDetailList.firstName,
      image: personalDetailList.image      
    });
    console.log("formValues :::: ", formValues)
    setformValues ({...formValues, country: personalDetailList.country, timezones: personalDetailList.timezone, countryLists: personalDetailList && personalDetailList && personalDetailList.country ? personalDetailList.country._id : "" });
  } catch (e) {
    console.log(e.message);
  }
};
//  useEffect(() => {
//   dispatch({
//     type: actionTypes.USER_DATA,
//     data: userData
//   });
//  }, [userData])
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
            <p className="userListAbout">Manage your personal information.</p>
          </div>
        </div>



        <div className="gymDetails personalPage">
          <div className="gymdetails_left">
            <h3 className="leftSectionHeader">Account Details</h3>
              <div className="showing_gym_data personalInfos">
                <div className="gymName">
                
                  <div className="profilePicture personalDetailPage">
                    <span className={toggleEditName.status ? "profileImgSection hideThis" : "profileImgSection"}>
                     

                      {personalData.image ? <img src={personalData.image ? config.bucketUrl + personalData.image : profile_img} className={file ? "profileImage hideThis" : "profileImage"} alt="" /> 
                      : <img src={profile_img}  className={file ? "profileImage hideThis" : "profileImage"} alt="" />} 

                      {file && (
                      	<>
                          <img src={file} className="profileImage" alt="" /> 
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
                              <img src={ editDetails.image ? editDetails.image : profile_img} className="profileImage" alt="" /> 
                              <span className="hoverEffects">
                                <img src={cam} className="camImg" alt="" />
                              </span>                             
                                                 
                            </span>
                            
                          </span>
                        </>
                      )}  
                    <span className={toggleEditName.status ? "profileNameDisplay hideThis" : "profileNameDisplay"}>
                    <span className="profileName" >{personalData.firstName + " " + personalData.lastName}</span>

                      
                      <button className="editPersonalName" onClick={(e) => toggleEditNameFn(e)}><img src={edit_gym} alt=""/></button>
                    </span>
                    {toggleEditName.status && (
                      	<>
                        <form>
                          <span className="profileNameDisplayEdits">
                          
                           {/* <input className="editPersonalDetailsNames" value={accountName.personalName}  type="text" onChange={handleEditName} name="" />  */}
                           <input className="editPersonalDetailsNames" value={editDetails.name}  type="text" onChange={handleEditName} name="" /> 
                        
                          <span className="errorMsg">{accDetailErrors.name}</span> 

                            <button className="editPersonalNameSave" onClick={personalInfosSave}><img src={saveEdit} alt=""/></button>
                            <button className="editPersonalNameDelete" onClick={personalInfosReject}><img src={delEdit} alt=""/></button>
                          </span>
                          </form>
                        </>
                      )}  
                  </div>
                </div>
                <div className="gymInfo full">
                  <p className="textType1">Email <span>:</span></p>

                  {personalData ? <p className="textType4" >{personalData.email}</p>
                     : 'No email provided'}                       
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
                    <select
                        name="timezones"
                        style={{
                            backgroundImage: "url(" + arrowDown + ")",
                        }} 
                        value={formValues ? formValues.timezones : ""}
                        onChange={handleChangeNew}
                        >
                        <option value="">Select Timezone</option>
                     {timezoneData ? timezoneData.map((zones, i) => {
                      return (
                      <option key={i} 
                        value={zones.zoneName}
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
                        value={formValues ? formValues.countryLists : ""}
                        onChange={handleChangeNew}
                         >
                        <option value="">Select Country</option>
                      {getCountry ? getCountry.map((country, i) => {
                      return (
                      <option key={i}
                        value={country._id}                                        
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
                   <input type="password" name="currentPassword" value={formValues.currentPassword} onChange={handleChangeNew} />
                   <span className="errorMsg">{formErrors.currentPassword}</span>
                  </div>
                  
                  <div className="formControl">
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={formValues.newPassword} onChange={handleChangeNew} />
                    <span className="errorMsg">{formErrors.newPassword}</span>
                  </div>
                  <div className="formControl">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmNewPassword" value={formValues.confirmNewPassword} onChange={handleChangeNew} />
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
