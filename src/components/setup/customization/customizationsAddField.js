import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import crossTop from "../../../../src/assets/images/cross.svg";
import arrow_forward from "../../../../src/assets/images/arrow_forward.svg";
import custom_icon from "../../../../src/assets/images/custom_icon.svg";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";

import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch } from "react-redux";
import { saveEmailSubjectAction, fetchCustomerListAction, editCustomerFieldAction, EmailSubjectAction } from "../../../actions/EmailSubjectAction";


const CustomizationsAddField = (props) => {

  const messageDelay = 10000;
  const [isLoader, setIsLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [customField, setCustomField] = useState(props.ele);
  const [hasError, setHasError] = useState(true)
  const [customFieldErrors, setCustomFieldErrors] = useState({
    // name: "Please enter Field name",
    // type: "Please select a Field type",
    // defaultValue: "Default value cannot be empty"
    name: "",
    type: "",
    defaultValue: ""
  })
  const dispatch = useDispatch();
  // useEffect(() =>{
    // console.log('PPPPP', props)
  // });

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

useEffect(()=>{
  // console.log("customFieldErrors ::::::::::: ", customFieldErrors);
}, [customFieldErrors]);

  const handleSubmit =(e) =>{
   e.prevent.default();
  };

  const fieldNameHandel = (event) => {
      let val = event.target.value;
      let valAlias

      if(val !== "" && val.length > 0) {
        let reg = /^[A-Za-z0-9 -]*$/
        let regSpaceNum = /^[ 0-9 -]*$/

        let isValidValue = reg.test(val)
        let isStartValidValue = regSpaceNum.test(val[0])

        if(isValidValue && !isStartValidValue) {
          valAlias = val.charAt(0).toLowerCase() + val.slice(1).split(" ").join("_");
          setHasError(false)
          setCustomFieldErrors({
            ...customFieldErrors,
            name: ""
          })

          setCustomField({...customField, name: val, alias: valAlias});
        }
        else {
          // console.log("VAL:::", val);
          
          setHasError(true)
          setCustomFieldErrors({
            ...customFieldErrors,
            name: "Field name cannot start with space or number or -"
          })
          // console.log(customField);
          setCustomField({...customField, name: customField.name, alias: customField.alias});
        }
      }
      else {
        setHasError(true)
        setCustomFieldErrors({
          ...customFieldErrors,
          name: "Field name cannot be empty"
        })
      }
  };

  const fieldTypeHandel = (event) => {
    let val = event.target.value;
    
    if(val !== "" && val.length > 0) {
      setCustomField({...customField, type: val});
      setHasError(false)
      setCustomFieldErrors({
        ...customFieldErrors,
        type: ""
      })


      if(val == "email" && customField.defaultValue && customField.defaultValue.length > 0) {
        let regEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
        let isValidateEmail = regEmail.test(val);

        if(!isValidateEmail){
          setHasError(true)
          setCustomFieldErrors({
            ...customFieldErrors,
            defaultValue: "Please provide valid email"
          })
        }
      }
    } else {
      setHasError(true)
      setCustomFieldErrors({
        ...customFieldErrors,
        type: "Please enter Field type"
      })
    }
  };

  const defaultValueHandel = (event) => {
    let val = event.target.value;
    if(val !== "" && val.length > 0) {
      if(customField.type === "email") {
        let regEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
        let isValidateEmail = regEmail.test(val);

        if(isValidateEmail){
          setCustomField({...customField, defaultValue: val});
          setHasError(false)
          setCustomFieldErrors({
            ...customFieldErrors,
            defaultValue: ""
          })
        }
        else {
          setHasError(true)
          setCustomFieldErrors({
            ...customFieldErrors,
            defaultValue: "Please provide valid email"
          })
        }
      }
      else {
        setCustomField({...customField, defaultValue: val});
        setHasError(false)
        setCustomFieldErrors({
          ...customFieldErrors,
          defaultValue: ""
        })
      }
    }
    else {
      setCustomField({...customField, defaultValue: val});
      setHasError(false)
      setCustomFieldErrors({
        ...customFieldErrors,
        defaultValue: ""
      })
    }
  };


  const addCustomField = async (status) => {
    let errorPlaceholder = {...customFieldErrors};
    // console.log("HAS ERROR:::", customField.name, customField.name !== "", customField.type, customField.type !== "", customFieldErrors.name !== "", customFieldErrors.type !== "", customFieldErrors);
    if(customField.name && customField.name !== "" && customField.type && customField.type !== "" && customFieldErrors.name === "" && customFieldErrors.type === "") {
      if(!hasError) {
        if (props.editStatus) {
          editField();
        } else {
          if (status) {
            createField(status);
            props.savedNew();
          } else {
            await createField(status);
            props.closeAddCustomModal(true);
          }        
        }
      }
      else {
        setErrorMsg("Please fill up the fields properly");
      }
    }
    else {
      setErrorMsg("Please fill up the fields properly");
      if(!customField.name || customField.name === "") {
        setHasError(true)
        errorPlaceholder.name = "Field name cannot be empty"
      }
      if(!customField.type || customField.type === ""){
        setHasError(true)
        errorPlaceholder.type = "Please enter Field type"
      }
      setCustomFieldErrors(errorPlaceholder)
    }
      
  }

  const createField = async (status) => {
    console.log(status);
    try {
      setIsLoader(true);
      // const result = await CustomizationServices.addCustomField(customField);
      // props.successMessage(result.message);
      dispatch(saveEmailSubjectAction(customField));
      dispatch(fetchCustomerListAction());
      dispatch(EmailSubjectAction());
    } catch (e) {
      // props.errorMessage(e.message);
    } finally {
      setIsLoader(false);
      if(status){
        setCustomField({
          ...customField,
          name: "", type: "", defaultValue: "", alias: "", status: "", _id: ""
        })
      }
      else{
        setCustomField({
          ...customField,
          name: "", type: "", defaultValue: "", alias: "", status: "", _id: ""
        })
      }
    }
  }
  const editField = async () => {
    try {
      setIsLoader(true);
      const payload = {
        name: customField.name,
        type: customField.type,
        defaultValue: customField.defaultValue,
        alias: customField.alias,
        status: customField.status
      };
      // console.log("al bal chal", props.ele);
      // const res = await CustomizationServices.editCustomField(props.ele._id, payload);
      // setSuccessMsg(res.message);

      dispatch(editCustomerFieldAction(props.ele._id, payload));
      dispatch(fetchCustomerListAction());
      // dispatch(EmailSubjectAction());
      setCustomField({
        ...customField, name: "", type: "", defaultValue: "", alias: "", status: "", _id: ""
      });
    } catch (e) {
      // setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
      props.closeAddCustomModal(true);
    }
  }

  const closeModal = () => {
    props.closeAddCustomModal(false);
  }

  // useEffect(()=>{
  //   console.log("props", props);
  // },[])
  

     return(
        <div className="modalBackdrop">
            <div className="dialogBg" onClick={closeModal}></div>
            {isLoader ? <Loader /> : ''}
            {successMsg &&
              <SuccessAlert message={successMsg} extraclassName="pullUp" />
            }
            {errorMsg &&
              <ErrorAlert message={errorMsg} extraclassName="pullUp" />
            }
            <div className="slickModalBody">
                <div className="slickModalHeader">
                <button className="topCross" onClick={closeModal}><img src={crossTop} alt="" /></button>  
                <div className="circleForIcon"><img src={custom_icon} alt="" /></div>
                <h3>Add a Custom Field</h3>
                <p>Fill out below details to create a custom field</p>
                </div>
                <div className="modalForm auto">
                {/* <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />}> */}
                  {console.log("custom fielddddddddd", customField)}
                    <form method="post" onSubmit={handleSubmit}>
                    <div className={customFieldErrors.name ? "formControl error" : "formControl"}>
                        <label>Field Name</label>
                        <input 
                          type="text" 
                          name="" 
                          onChange={fieldNameHandel} 
                          value={customField.name}
                          defaultValue={customField && customField?.name}
                          className="cmnFieldStyle"
                        />
                        {customFieldErrors.name && <p className="errorMsg">{customFieldErrors.name}</p>}
                    </div>
                    
                    <div className={customFieldErrors.type ? "formControl error" : "formControl"}>
                        <label>Field Type</label>
                        <select name="category" onChange={fieldTypeHandel} value={customField?.type} className="cmnFieldStyle" defaultValue={customField && customField?.type}>
                            <option value="">Select field type</option>
                            <option value="text">Text</option>
                            <option value="number">Phone</option>
                            <option value="email">Email</option>
                            <option value="textarea">Textarea</option>
                        </select>
                        {customFieldErrors.type && <p className="errorMsg">{customFieldErrors.type}</p>}
                    </div>
                    <div className={customFieldErrors.defaultValue ? "formControl error" : "formControl"}>
                        <label>Default Value</label>
                        {customField?.type === "email" && <input type="email" name="" value={customField?.defaultValue} onChange={defaultValueHandel} className="cmnFieldStyle" defaultValue={customField && customField.defaultValue} />}
                        {customField?.type !== "email" && <input type="text" name="" value={customField?.defaultValue} onChange={defaultValueHandel} className="cmnFieldStyle"  defaultValue={customField && customField.defaultValue} />}
                        {customFieldErrors.defaultValue && <p className="errorMsg">{customFieldErrors.defaultValue}</p>}
                    </div>
                    <div className={customFieldErrors.fieldAlias ? "formControl error" : "formControl"}>
                        <label>Field Alias</label>
                        <div className="cmnFieldStyle d-flex f-align-center fieldAlias">{customField?.alias}</div>
                    </div>
                    <div className="modalbtnHolder">
                        <button type="button" name="save"
                        className="saveNnewBtn" onClick={() => addCustomField (false)}>
                        <span>Save</span><img src={arrow_forward} alt="" /></button>
                        { props.origin === 'settings' ? (props.editStatus ? "" :
                            <button type="button" name="save"
                                    className="saveNnewBtn" onClick={() => addCustomField (true)}>
                                <span>Save &amp; New</span><img src={arrow_forward} alt="" /></button>) : "" }
                    </div>
                    </form>
                {/* </Scrollbars> */}
                </div>

            </div>
        </div>
     )
};

export default CustomizationsAddField;