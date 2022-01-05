import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import plus_icon from "../../../../src/assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../src/assets/images/info_3dot_icon.svg";
import CustomizationsAddField from "./customizationsAddField";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";

const Customizations = (props) => {
  document.title = "Red Belt Gym - Customization";
  const messageDelay = 5000;
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [option, setOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [taxData, setTaxData] = useState({
    tax: "",
    editAccess: false
  });
  const [disableBtn, setDisableBtn] = useState(false);


  useEffect(() => {
    fetchSaleTax();
  }, []);

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

  const fetchSaleTax = async () => {
    try {
      setIsLoader(true)
      const saleTaxData = await CustomizationServices.fetchTax();
      setTaxData(saleTaxData);
      setDisableBtn(!saleTaxData.editAccess);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  }

  const toggleOptions = (index) => {
    // console.log("Index",index);
    // setOption(index !== null ? (option !== null ? null : index) : null);
    setOption(index !== option ? index : null);
  };
  const [customFieldData, setCustomFieldData] = useState([
    {
      field_Name: "Street Number",
      field_Alias_Name: "street_number",
      field_Type: "text",
      default_Value: "",
      toogle: false
    },
    {
      field_Name: "Road Name",
      field_Alias_Name: "road_name",
      field_Type: "text",
      default_Value: "something",
      toogle: true
    },
    {
      field_Name: "PO Box",
      field_Alias_Name: "po_box",
      field_Type: "text",
      default_Value: "",
      toogle: false
    },
  ]);

  const statusToogle = (key, e) => {
    setCustomFieldData(!customFieldData.toogle);
  }
  const openAddCusomFieldHandler = (event) => {
    setOpenModal(true);
  }
  const closeCustomModal = () => {
    setOpenModal(false);
  }

  const taxAmountHandle = (event) => {
    const tax = event.target.value;
    const regexNumber = /^[0-9]+$/;
    console.log(regexNumber.test(tax))
    if (tax < 100 && (regexNumber.test(tax) || tax.length === 0)) {
      setTaxData({ ...taxData, tax: tax });
      if (tax.length === 0 || tax === "" || tax === "0") {
        setDisableBtn(true);
      } else {
        setDisableBtn(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoader(true);
      const payload = {
        "tax": taxData.tax
      };
      const res = await CustomizationServices.updateTax(payload);
      setSuccessMsg(res.message);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  }



  return (
    <>
    {isLoader ? <Loader /> : ''}
      <div className="dashInnerUI customization">
        <div class="userListHead customization">
          <div class="listInfo">
            <ul class="listPath">
              <li>Settings </li>
              <li>Customization</li>
            </ul>
            <h2 class="inDashboardHeader">
              Customizations
            </h2>
            <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
            {successMsg &&
              <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
              <ErrorAlert message={errorMsg}></ErrorAlert>
            }
          </div>
        </div>
        <div className="taxSetup">
          <h3>Tax Information</h3>
          <form id="saletaxFrm" onSubmit={handleSubmit}>
            <label>Enter the Tax amount in %</label>
            <input placeholder=""
              type="text"
              onChange={taxAmountHandle}
              value={taxData.tax}
              disabled={(taxData.editAccess) ? false : true} />
            <button class="btn" type="submit"
              disabled={(disableBtn || taxData.editAccess === false) ? true : false}>Save
              <img src={arrowRightWhite} alt="" /></button>
          </form>
        </div>
      </div>
      <div className="customFieldListing">
        <div className="customFields">
          <h3>Custom Fields</h3>
          <button class="creatUserBtn"
            onClick={openAddCusomFieldHandler}>
            <img class="plusIcon" src={plus_icon} alt="" />
            <span>Create Custom Field</span>
          </button>
        </div>
        <div className="userListBody">
          <ul class="customtableListing">
            <li class="listHeading">
              <div>Field Name</div>
              <div>Field Alias Name</div>
              <div>Field Type</div>
              <div className="space">Default Value</div>
              <div class="vacent"></div>
            </li>
            {customFieldData.map((elem, key) => {
              return (
                <li>
                  <div>{elem.field_Name}</div>
                  <div>{elem.field_Alias_Name}</div>
                  <div>{elem.field_Type}</div>
                  <div> {elem.default_Value}</div>
                  <div>
                    <label class={elem.toogle ? "toggleBtn active" : "toggleBtn"}>
                      <input type="checkbox"
                        onChange={(e) => {
                          statusToogle(e, key);
                        }} /><span class="toggler"></span>
                    </label>
                    <div class="info_3dot_icon">
                      <button class="btn"
                        onClick={() => {
                          toggleOptions(key);
                        }}>
                        <img src={info_3dot_icon} alt="" />
                      </button>
                    </div>
                    <div className={
                      option === key
                        ? "dropdownOptions listOpen"
                        : "listHide"
                    }>
                      <button class="btn btnEdit">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" class="editIcon"><g transform="translate(0.75 0.75)"><path class="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path class="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                        </span>
                        Edit
                      </button>
                      <button class="btn btnDelete">
                        <span>
                          <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path class="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line class="a" y2="3" transform="translate(4.397 6.113)"></line><line class="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                        </span>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
            }
          </ul>
        </div>

      </div>
      {openModal &&
        <CustomizationsAddField
          closeAddCustomModal={(param) => closeCustomModal(param)}
        />
      }
    </>
  )
};

export default Customizations;
