import React, { useState, useEffect } from "react";
import search_icon_white from "../../assets/images/search_icon_white.svg";
import phone_icon_small_blue from "../../assets/images/phone_icon_small_blue.svg";
import mobile_icon_blue from "../../assets/images/mobile_icon_blue.svg";
import image_icon_blue from "../../assets/images/image_icon_blue.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import button_loading_icon from "../../assets/images/button_loading_icon.svg";
import { UserServices } from "../../services/authentication/UserServices";
import { NumberServices } from "../../services/number/NumberServices";
import Loader from "../shared/Loader";

const BuyAndAssignNumber = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [searchLoadStatus, setSearchLoadStatus] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState(false);
  const [orgOwnerList, setOrgOwnerList] = useState(false);
  const [assignTo, setAssignTo] = useState(false);
  const [country, setCountry] = useState("US");
  const [region, setRegion] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [type, setType] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [formErrors, setFormErrors ]= useState({
    assignTo: "",
    country: ""
  });
  const [saveAndNew, setSaveAndNew] = useState(false);
  /**
   * Handle any field's change 
   * It call call dynamic method to set const value
   * No need to defin didacated change function
   * until its not required
   * 
   * @param {object} event 
   * @param {string} constName name of the constant with first char upper case
   * @example if set const method is setAreaCode 
   * then pass constName param as AreaCode
   * 
   * @return void
   */
   const handleChange = (event, constName) => {
    eval("set" + constName + "(event.target.value)");
  }

  /**
   * Validate search form
   * @returns boolean
   */
  const validateForm = async () => {
    let isOk = true;
    let errors = {};

    if (assignTo) {
      errors.assignTo = ""; 
    } else {
      errors.assignTo = "Please select a gym owner"; 
      isOk = false;
    }
    setFormErrors(errors);
    return isOk;
  }

  /**
   * Search twilio numbers
   * @param {*} event 
   * @returns 
   */
  const searchNumber = async (event) => {
    event.preventDefault();  

    if (! await validateForm() ) {
      console.log("validation failed", formErrors)
      return false;
    }

    setSearchLoadStatus(true);    
    setProcessing(true);

    // Prepare paylod obj
    let searchPayload = {
      "orgOwnerId": assignTo,
      "type": type,
      "country": country,
      "region": region,
      "areaCode": areaCode
    }
    try {
      let numbers = await NumberServices.search(searchPayload);
      setAvailableNumbers(numbers);
    } catch (e) {
      props.errorMsg(e.message);
    } finally {
      setSearchLoadStatus(false);
      setProcessing(false);
    }
   
  };
  
  /**
   * Fetch all org owners
   */
  const fetchOrgOwners = async () => {
    setIsLoader(true);
    let owners = await UserServices.fetchOwners();
    setOrgOwnerList(owners);
    setIsLoader(false);
  }

  useEffect(() => {
    setType("local");
    fetchOrgOwners();
  }, []);

  const handleSaveAndNew = () => {
    setSaveAndNew(true);
  }

  /**
   * Reset form data
   * except owner list
   */
  const resetForm = () => {
    setAvailableNumbers(false);
    setAssignTo("");
    setRegion("");
    setAreaCode("");
    setSaveAndNew(false);
  }

  /**
   * Handle final submit to purchase the number
   * and assign the number
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("selectedNumber", selectedNumber, availableNumbers[selectedNumber])
    setProcessing(true);
    setIsLoader(true);

    try {
      let numberDetails =  availableNumbers[selectedNumber];
      let purchasePayload = {
        orgOwnerId: assignTo,
        phoneNumber: numberDetails.phoneNumber,
        country: numberDetails.isoCountry,
        postalCode: numberDetails.postalCode,
        region: numberDetails.region,
      }
      let purchaseResp = await NumberServices.purchase(purchasePayload);
      props.successMsg('Number assigned successfully');   
      
      props.prependRecord(purchaseResp);

      if (saveAndNew) {
        resetForm();
        fetchOrgOwners();
      } else {
        props.closeModal();
      }

    } catch (e) {
      props.errorMsg(e.message);      
    } finally {
      setProcessing(false);   
      setIsLoader(false);  
    }

  }

  return (
    <div className="sideMenuOuter">
      {isLoader ? <Loader /> : ''}
      <div className="sideMenuInner buyNumberModal">
        <button className="btn btn-closeSideMenu" onClick={props.closeModal}>
          <span></span>
          <span></span>
        </button>
        <div className="sideMenuHeader">
          <h3>Buy & Assign Number</h3>
          <p>Lorem Epsom dollar sit amen</p>
        </div>
        <div className="sideMenuBody">
          <form className="formBody" onSubmit={handleSubmit}>
            <div className="infoInputs">
              <div className="cmnFormRow">
                <div className="cmnFieldName">Assign to</div>
                <div className="cmnFormField">
                  <select 
                    name="" 
                    className="cmnFieldStyle selectBox"
                    onChange = { (e) => handleChange(e, "AssignTo") }
                    value={assignTo} >
                      <option value="">Select a Gym Owner</option>
                      { orgOwnerList ? orgOwnerList.map( (ow, key) => {
                        return (
                          <React.Fragment key={key + "_ow"}>
                              <option value={ow._id}>{ow.firstName + " " + ow.lastName}</option>
                          </React.Fragment>
                        );
                      }) : "No record found"}
                  </select>
                </div> 
                 {formErrors.assignTo &&
                  <span className="errorMsg">{formErrors.assignTo}</span>
                }
              </div>
              <div className="cmnFormRow">
                <p className="formSecHeading">Search for Available Numbers</p>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFieldName">Select Country</div>
                <div className="cmnFormField">
                  <select name=""  className="cmnFieldStyle selectBox">
                    <option value="US">United States</option>
                  </select>
                </div>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFieldName">Type {type}</div>
                <div className="cmnFormField radioGroup">
                  <label className="cmnFormRadioLable">
                    <div className="circleRadio">
                      <input 
                        type="radio" 
                        name="type" 
                        value="local" 
                        checked={type == "local"}
                        onChange = { (e) => handleChange(e, "Type") } />
                      <span></span>
                    </div>
                    Local
                  </label>
                  <label className="cmnFormRadioLable">
                    <div className="circleRadio">
                      <input 
                        type="radio" 
                        name="type" 
                        value="mobile" 
                        checked={type == "mobile"}
                        onChange = { (e) => handleChange(e, "Type") } />
                      <span></span>
                    </div>
                    Mobile
                  </label>
                  <label className="cmnFormRadioLable">
                    <div className="circleRadio">
                      <input 
                        type="radio" 
                        name="type" 
                        value="tollFree"
                        checked={type == "tollFree"}
                        onChange = { (e) => handleChange(e, "Type") }  />
                      <span></span>
                    </div>
                    Toll free
                  </label>
                </div>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Enter Region</div>
                  <div className="cmnFormField">
                    <input type="text" 
                    className="cmnFieldStyle" 
                    placeholder="Optional"
                    onChange = { (e) => handleChange(e, "Region") }/>
                  </div>
                </div>
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Enter Area Code</div>
                  <div className="cmnFormField">
                    <input type="text" 
                    className="cmnFieldStyle" 
                    placeholder="Optional"
                    onChange = { (e) => handleChange(e, "AreaCode") }/>
                  </div>
                </div>
              </div>
              {/* <div className="cmnFormRow">
                <div className="cmnFieldName">Choose Address</div>
                <div className="cmnFormField">
                  <select name="" id="" className="cmnFieldStyle selectBox">
                    <option value="">Choose an Address (Optional)</option>
                  </select>
                </div>
              </div> */}
              <div className="cmnFormRow">
                <button
                  className={
                    searchLoadStatus
                      ? "saveNnewBtn numSearch searching"
                      : "saveNnewBtn numSearch"
                  }
                  type="submit" 
                  onClick={searchNumber}
                >
                  <img
                    src={
                      searchLoadStatus ? button_loading_icon : search_icon_white
                    }
                    alt=""
                  />{" "}
                  {searchLoadStatus ? "" : "Search"}
                </button>
              </div>

              {availableNumbers ? 
              <>
                <div className="formSecHeading">Available Numbers</div>
              
              <div className="availNumList">
                <table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Capacity</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableNumbers.map( (el, key) => {
                      return (
                        <React.Fragment key={key + "_num"}>
                          <tr>
                            <td>{el.phoneNumber}</td>
                            <td>
                              <div className="numberCapacity">
                                <span>
                                  <img src={phone_icon_small_blue} alt="" />
                                </span>
                                <span>
                                  <img src={mobile_icon_blue} alt="" />
                                </span>
                                <span>
                                  <img src={image_icon_blue} alt="" />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="circleRadio">
                                <input type="radio" 
                                  name="selectedNumber" 
                                  value={key} 
                                  onClick={ (e) => handleChange(e, "SelectedNumber") } />
                                <span></span>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    } ) }
                    {!availableNumbers.length && 
                      <tr>
                        <td colSpan="3" align="center">No record found</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              
              <div className="cmnFormRow">
                <div className="formActBtnWrap numList">
                  <button 
                    disabled={processing} 
                    className="saveNnewBtn numSave">
                    Save <img src={arrow_forward} alt="" />
                  </button>
                  <button 
                    disabled={processing}
                    className="saveNnewBtn numSaneNnew" 
                    type="submit"
                    onClick={handleSaveAndNew}>
                    Save & New <img src={arrow_forward} alt="" />
                  </button>
                </div>
              </div>
              </>
              : ""}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyAndAssignNumber;
