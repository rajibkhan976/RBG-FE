import React, {useEffect, useState, useRef} from "react";
import { useDispatch } from "react-redux";

import * as actionTypes from "../../../../actions/types";
import {ContactService} from "../../../../services/contact/ContactServices";

import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import { SmsSetupService } from "../../../../services/setup/SmsConfigServices";
import Loader from "../../../shared/Loader";


const CallConfiguration = (props) => {
  const dispatch = useDispatch();
  const saveConfig = useRef(null)
  const saveAndNewConfig = useRef(null)
  const formBody = useRef(null)
  const [configLoader, setConfigLoader] = useState(false)
  const [phoneCountryCode, setPhoneCountryCode] = useState([])
  const [smsConfig, setSmsConfig] = useState({})
  const [smsEditId, setSmsEditId] = useState(null)
  const [smsErrors, setSMSErrors] = useState({
    name: "",
    responseType: "",
    isSMSNotification: "",
    countryCode: "",
    dialCode: "",
    number: ""
})
const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
};
  const handleCheckboxEnableSms = (e) => {
    console.log('HCE',e.target.checked, smsConfig)
    setSmsConfig({
      ...smsConfig,
      isSMSNotification: e.target.checked ? true : false,
      countryCode: "US",
      dialCode: "+1",
      number: ""
    })
  } 

  const getNumberDetails = (e) => {
    const selectedCountryNum = phoneCountryCode.filter(el => el.code === e.target.value)[0];
    
    if(e.target.getAttribute('name') === "countrycode") {
      if(e.target.value.trim() !== "") {
        setSmsConfig({
          ...smsConfig,
          countryCode: selectedCountryNum.code,
          dialCode: selectedCountryNum.prefix
        })
        setSMSErrors({
          ...smsErrors,
          countryCode: "",
          dialCode: ""
        })
      }
      else {
        setSMSErrors({
          ...smsErrors,
          countryCode: "Please select country code."
        })
      }
    }
    if(e.target.getAttribute('name') === "phonenumber") {
      if(e.target.value.trim() !== "" && (e.target.value.length >= 8 && e.target.value.length <= 20)) {
        let pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(e.target.value)) {
          setSMSErrors({
            ...smsErrors,
            number: "Number provided is not valid"
          })
        } else {
          setSMSErrors({
            ...smsErrors,
            number: ""
          })
        }
      } else {
        setSMSErrors({
          ...smsErrors,
          number: "Please provide a valid number"
        })
      }
      setSmsConfig({
        ...smsConfig, 
        number: e.target.value
      });
    }
  }

  const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
    return (
        <option 
          value={el.code} 
          data-dailcode={el.prefix} 
          key={key}
        >{el.code} ({el.prefix})</option>
    )
  }
  ) : '';

  const smsConfigNameMod = (e) => {
    if(e.target.value.trim() === "") {
      setSMSErrors({
        ...smsErrors,
        name: "Please provide a config name"
      })
    }
    else {
      if(e.target.value.trim().length > 30) {
        setSMSErrors({
          ...smsErrors,
          name: "Config name cannot be more than 30 characters"
        })
      } else {
        setSMSErrors({
          ...smsErrors,
          name: ""
        })
      }
    }
    setSmsConfig({
      ...smsConfig,
      name: e.target.value
    })
  }

  const smsConfigResponseTypeMod = (e) => {
    console.log(e.target.value);
  }

  const validateConfig = () => {
    if(smsConfig.isSMSNotification) {
      if(smsConfig.countryCode.trim() === "") {
      // console.log("here");
        setSMSErrors({
          ...smsErrors,
          countryCode: "Please select a country code"
        })
        return false
      }
      if(smsConfig.number.trim() === "" || smsConfig.number.length < 8 || smsConfig.number.length > 20) {
      // console.log("here");
        setSMSErrors({
          ...smsErrors,
          number: "Please provide a valid number"
        })
        return false
      }
    }
    if(smsConfig.name.trim() === "") {
    console.log("here");
      console.log("here");
      setSMSErrors({
        ...smsErrors,
        name: "Please provide a config name"
      })
      return false
    }
    if(smsConfig.name.trim().length > 30){
      console.log("here");
      setSMSErrors({
        ...smsErrors,
        name: "Config name cannot be more than 30 characters"
      })
      return false
    }
    if(smsConfig.responseType.trim() === "") {
    console.log("here");
      console.log("here");
      setSMSErrors({
        ...smsErrors,
        responseType: "Please provide a Response type"
      })
      return false
    }

    if(
      (smsConfig.isSMSNotification && (smsConfig.countryCode.trim() !== "" && smsConfig.number.trim() !== "" && smsConfig.name.trim() !== "" && smsConfig.responseType.trim() !== "")) ||
      (!smsConfig.isSMSNotification && (smsConfig.name.trim() !== "" && smsConfig.responseType.trim() !== ""))
    ) {
      return true
    }
  }
  
  const submitSMSConfig = async (e) => {
    e.preventDefault()

    console.log("smsErrors:::::", smsErrors);
    
    const validatedForm = validateConfig()

    if(validatedForm){
      setConfigLoader(true);
      try {
        console.log("smsConfig", props.isEditing);
        let result  = Object.keys(props.isEditing).length === 0 ? await SmsSetupService.saveSmsConfig(smsConfig) : await SmsSetupService.updateSmsConfig(smsConfig, smsEditId);
        if(result){
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "SMS configuration saved successfully.",
            typeMessage: 'success'
          });
          
          if(e.target === saveAndNewConfig.current) {
              formBody.current.reset()
              setSmsConfig({
              name: "", //"Configuration 5"
              responseType: "instant-message", //"instant-message"
              isSMSNotification: false, //true
              countryCode: "", //US
              dialCode: "", //+1
              number: "" //007
            })
          }
          else {
            props.closeModal(false)
          }
        }
      } catch (error) {
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error.message,
          typeMessage: 'error'
        });
        setConfigLoader(false);
      } finally {
        setConfigLoader(false);
      }
    }
  }

  useEffect(() => {
    console.log("smsConfig", smsConfig.isSMSNotification);
  }, [smsConfig.isSMSNotification])

  useEffect(()=>{
    setConfigLoader(true)
    
    try {
      fetchCountry()   
      setSmsConfig({
        name: Object.keys(props.isEditing).length !== 0 ? props.isEditing.name: "",
        responseType: Object.keys(props.isEditing).length !== 0 ? props.isEditing.responseType : "instant-message",
        isSMSNotification: Object.keys(props.isEditing).length !== 0 ? props.isEditing.isSMSNotification : false,
        countryCode: Object.keys(props.isEditing).length !== 0 ? props.isEditing.phone.countryCode : "US",
        dialCode: Object.keys(props.isEditing).length !== 0 ? props.isEditing.phone.dialCode : "+1",
        number: Object.keys(props.isEditing).length !== 0 ? props.isEditing.phone.number : ""
      })   
      Object.keys(props.isEditing).length !== 0 && setSmsEditId(props.isEditing._id)
      setConfigLoader(false)
    } catch (error) {
      setConfigLoader(false)
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: error,
        typeMessage: 'error'
      });
    }
  },[])
    return (
      <div className="sideMenuOuter">
      {configLoader ? <Loader /> : ''}
        <div className="sideMenuInner smsConfigModal">
          {/* {isLoader ? <Loader /> : ""} */}
          <button className="btn btn-closeSideMenu" onClick={props.closeModal}>
            <span></span>
            <span></span>
          </button>
          <div className="sideMenuHeader">
            <h3>Create a SMS Configuration</h3>
            <p>Setup SMS related all configurations</p>
          </div>
          <div className="sideMenuBody">
            <form className="formBody" onSubmit={submitSMSConfig} ref={formBody}>
              <div className="cmnFormRow">
                <div className={smsErrors.name ? "cmnFormCol error" : "cmnFormCol"}>
                  <div className="cmnFieldName">Config Name</div>
                  <div className="cmnFormField">
                    <input
                      type="text"
                      className="cmnFieldStyle"
                      onChange={smsConfigNameMod}
                      value={smsConfig?.name?.trim() !== "" ? smsConfig.name : ""}
                    />
                  </div>
                  {smsErrors.name ? <p className="errorMsg">{smsErrors.name}</p> : ""}
                </div>
                <div className={smsErrors.responseType ? "cmnFormCol error" : "cmnFormCol"}>
                  <div className="cmnFieldName">Response Type</div>
                  <div className="cmnFormField">
                    <select 
                      className="cmnFieldStyle" 
                      onChange={smsConfigResponseTypeMod}
                      value={smsConfig.responseType ? smsConfig.responseType : ""}
                    >
                      <option value="instant-message">Instant Message</option>
                    </select>
                  </div>
                  {smsErrors.responseType ? <p className="errorMsg">{smsErrors.name}</p> : ""}
                </div>
              </div>
              
              <div className="cmnFormRow setupForms sms">
                    <h4 className="formSecHeading">Setup</h4>
                    <div className="setupFormLists">
                        <div className="setupFormRow">
                            <div className="setupFormRowHead">
                                <label>
                                    <div className="customCheckbox">
                                      {console.log('value',smsConfig, smsConfig && smsConfig.isSMSNotification)}
                                        <input 
                                          type="checkbox" 
                                          onChange={handleCheckboxEnableSms}
                                          checked={smsConfig && smsConfig.isSMSNotification}
                                        /><span></span>
                                    </div>
                                    <span className="fomrListHeadName">Enable SMS notification</span>
                                </label>
                            </div>
                            
                            {smsConfig && smsConfig.isSMSNotification ? (
                               <div className="setupFormRowBody">
                                 <div className="cmnFormRow addNumForm">
                                     
                                          <div className={(smsErrors.countryCode || smsErrors.dialCode || smsErrors.number) ? "cmnFormRow full_width error" : "cmnFormRow full_width"}>
                                              <div className="cmnFormField countryCodeField">
                                                  <div className="countryCode cmnFieldStyle">
                                                      <div className="countryName">{smsConfig?.countryCode ? smsConfig.countryCode : "US"}</div>
                                                      <div className="daileCode">{smsConfig?.dialCode ? smsConfig.dialCode : "+1"}</div>
                                                      <select 
                                                        className="selectCountry" 
                                                        onChange={(e)=>getNumberDetails(e)}
                                                        name="countrycode"
                                                        value={smsConfig.countryCode}
                                                      >
                                                        {countrycodeOpt}
                                                      </select>
                                                  </div>
                                                  <input 
                                                    type="number" 
                                                    className="cmnFieldStyle" 
                                                    name="phonenumber"
                                                    onChange={(e)=>getNumberDetails(e)}
                                                    value={smsConfig.number ? smsConfig.number : ""}
                                                    // disabled={smsConfig.countryCode.trim() === "" && smsConfig.dialCode.trim() === ""}
                                                  />
                                              </div>
                                              {/* <button className="cmnBtn"><span>Save</span><img src={arrow_forward} alt=""/></button> */}
                                              {smsErrors.number ? <p className="errorMsg">{smsErrors.number}</p> : ""}
                                          </div>
                                      
                                  </div>
                               </div>
                            ) : ""}
                        </div>
                    </div>
                </div>
              
              <footer className="text-center">
                <button className="cmnBtn" ref={saveConfig} onClick={submitSMSConfig}><span>Save</span><img src={arrow_forward} alt=""/></button> 
                &nbsp;   
                {smsEditId == null ? <button className="cmnBtn" ref={saveAndNewConfig} onClick={submitSMSConfig}><span>Save &amp; New</span><img src={arrow_forward} alt=""/></button>  : ""}
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
}


export default CallConfiguration;