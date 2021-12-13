import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import crossTop from "../../../../src/assets/images/cross.svg";
import arrow_forward from "../../../../src/assets/images/arrow_forward.svg";
import custom_icon from "../../../../src/assets/images/custom_icon.svg";

import { Scrollbars } from "react-custom-scrollbars-2";

const CustomizationsAddField = (props) => {

  const [isLoader, setIsLoader] = useState(false);
  const [customField, setCustomField] = useState({
    name: "",
    type: "",
    defaultValue: "",
    alias: ""
  });


  const handleSubmit =(e) =>{
   e.prevent.default();
  };

  const fieldNameHandel = (event) => {
      let val = event.target.value;
      setCustomField({...setCustomField, name: val});
  };

  const fieldTypeHandel = (event) => {
    let val = event.target.value;
    setCustomField({...setCustomField, type: val});
  };

  const defaultValueHandel = (event) => {
    let val = event.target.value;
    setCustomField({...setCustomField, defaultValue: val});
  };

  const fieldAliasHandel = (event) => {
    let val = event.target.value;
    setCustomField({...setCustomField, alias: val});
  };

  

     return(
        <div className="modalBackdrop">
            <div className="slickModalBody">
                <div className="slickModalHeader">
                <button className="topCross" onClick={props.closeAddCustomModal}><img src={crossTop} alt="" /></button>  
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
                        <select name="category" onChange={fieldTypeHandel}>
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
                        <button type="submit" name="save"
                        className="saveNnewBtn">
                        <span>Save</span><img src={arrow_forward} alt="" /></button>
                        <button type="submit" name="save"
                        className="saveNnewBtn">
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
