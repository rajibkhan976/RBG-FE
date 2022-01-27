import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import crossTop from "../../../../src/assets/images/cross.svg";
import arrow_forward from "../../../../src/assets/images/arrow_forward.svg";
import custom_icon from "../../../../src/assets/images/custom_icon.svg";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";

import { Scrollbars } from "react-custom-scrollbars-2";

const CustomizationsAddField = (props) => {

  const messageDelay = 10000;
  const [isLoader, setIsLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [customField, setCustomField] = useState({
    name: props.ele ? props.ele.fieldName : "",
    type: props.ele ? props.ele.fieldType : "",
    defaultValue: props.ele ? props.ele.fieldDefault : "",
    alias: props.ele ? props.ele.alias : "",
    status: props.ele ? props.ele.status : ""
  });

//   const [errorMsg, setErrorMsg] = useState({
//       name: "Please fill up the field name",
//       type: "Please select the field type",
//       defaultVal: "Please enter default value",
//       alias: "Please enter alias name"
//   });


  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);


  const handleSubmit =(e) =>{
   e.prevent.default();
  };

  const fieldNameHandel = (event) => {
      let val = event.target.value;
      setCustomField({...customField, name: val});
  };

  const fieldTypeHandel = (event) => {
    let val = event.target.value;
    setCustomField({...customField, type: val});
  };

  const defaultValueHandel = (event) => {
    let val = event.target.value;
    setCustomField({...customField, defaultValue: val});
  };

  const fieldAliasHandel = (event) => {
    let val = event.target.value;
    setCustomField({...customField, alias: val});
    console.log(customField);
  };

  const addCustomField = async (e) => {
    console.log(customField);
    if(customField.name !== "" && customField.type !== "" && customField.defaultValue !== "" && customField.defaultValue !== "") {
      if (props.editStatus) {
        editField();
      } else {
        try {
          setIsLoader(true);
          const result = await CustomizationServices.addCustomField(customField);
          setSuccessMsg("Custom field added successfully");
        } catch (e) {
          setErrorMsg(e.message);
            console.log(e.message);
        } finally {
          setIsLoader(false);
          props.closeAddCustomModal(true);
        }  
      }
      
    } else {
      setErrorMsg("Please fill up the fields properly");
    }

    // if(customField.name !== "" && customField.type !== "" && customField.defaultValue !== "" && customField.defaultValue !== "") {
    //   console.log("Form OK");
    // } else {
    //   setErrorMsg("Please fill up the fields properly");
    // }
      
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
      const res = await CustomizationServices.editCustomField(props.ele._id, payload);
      setSuccessMsg(res.message);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
      props.closeAddCustomModal(true);
    }
  }

  const closeModal = () => {
    setCustomField({
      name: "",
      type: "",
      defaultValue: "",
      alias: "",
      status: ""
    });
    props.closeAddCustomModal(false);
  }
  

     return(
        <div className="modalBackdrop">
            {isLoader ? <Loader /> : ''}
            {successMsg &&
              <SuccessAlert message={successMsg} extraClass="pullUp" />
            }
            {errorMsg &&
              <ErrorAlert message={errorMsg} extraClass="pullUp" />
            }
            <div className="slickModalBody">
                <div className="slickModalHeader">
                <button className="topCross" onClick={closeModal}><img src={crossTop} alt="" /></button>  
                <div className="circleForIcon"><img src={custom_icon} alt="" /></div>
                <h3>Add a Custom Field</h3>
                <p>Fill out below details to create a custom field</p>
                </div>
                <div className="modalForm">
                <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />}>
                    <form method="post" onSubmit={handleSubmit}>
                    <div className="formControl">
                        <label>Field Name</label>
                        <input type="text" name="" onChange={fieldNameHandel} value={customField.name} />
                    </div>
                    
                    <div className="formControl">
                        <label>Field Type</label>
                        <select name="category" onChange={fieldTypeHandel} defaultValue={props.ele ? props.ele.fieldType : ""}>
                            <option value="">Select field type</option>
                            <option value="text">Text</option>
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                            <option value="textarea">Textarea</option>
                        </select>
                    </div>
                    <div className="formControl">
                        <label>Default Value</label>
                        <input type="text" name="" onChange={defaultValueHandel} value={customField.defaultValue}/>
                    </div>
                    <div className="formControl">
                        <label>Field Alias</label>
                        <input type="text" name="" onChange={fieldAliasHandel} value={customField.alias}/>
                    </div>
                    <div className="modalbtnHolder">
                        <button type="button" name="save"
                        className="saveNnewBtn" onClick={addCustomField}>
                        <span>Save</span><img src={arrow_forward} alt="" /></button>
                        <button type="button" name="save"
                        className="saveNnewBtn" onClick={addCustomField}>
                        <span>Save &amp; New</span><img src={arrow_forward} alt="" /></button>
                    </div>
                    </form>
                </Scrollbars>
                </div>

            </div>
        </div>
     )
};

export default CustomizationsAddField;
