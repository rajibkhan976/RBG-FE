import React, { useEffect, useState, useRef } from "react";
import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import plus_icon from "../../../../src/assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../src/assets/images/info_3dot_icon.svg";
import CustomizationsAddField from "./customizationsAddField";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import smallLoaderImg from "../../../../src/assets/images/loader.gif";
import ConfirmBox from "../../shared/confirmBox";

const Customizations = (props) => {
  document.title = "Red Belt Gym - Customization";
  const messageDelay = 5000;
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [option, setOption] = useState(null);
  const [toggleIndex, setToggleIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [taxData, setTaxData] = useState({
    tax: "",
    editAccess: false
  });
  const [disableBtn, setDisableBtn] = useState(false);
  const [customFieldList, setCustomFieldList] = useState([]);
  const [smallLoader, setSmallLoader] = useState(false);
  const [deleteFieldId, setDeleteFieldId] = useState();
  const [deletedFieldId, setDeletedFieldId] = useState();
  const [deleteConfirmBox, setDeleteConfirmBox] = useState(false);
  const [editedEle, setEditedEle] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkClickOutside = (e) => {
      
      if(typeof option != "object" && ref.current && !ref.current.contains(e.target)) {
          setOption(null);
      }  
  }

  document.addEventListener("click", checkClickOutside);
  return () => {
      document.removeEventListener("click", checkClickOutside);
  };
  });

  useEffect(() => {

    fetchSaleTax();
    fetchCustomFields();
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

  const fetchCustomFields = async (e) => {
    try {
      setIsLoader(true)
      const result = await CustomizationServices.fetchCustomFields();
      setCustomFieldList(result.customFields);
      
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
      setTimeout(() => {
        console.log("Custom Fields ===== " + JSON.stringify(customFieldList));
      }, 3000)
      
    }
  };

  const toggleOptions = (index) => {
    // console.log("Index",index);
    // setOption(index !== null ? (option !== null ? null : index) : null);
    setOption(index !== option ? index : null);
  };

  const openAddCusomFieldHandler = (event) => {
    setEditedEle({});
    setOpenModal(true);
  }
  const closeCustomModal = (param) => {
    setOpenModal(false);
    if(param){
      fetchCustomFields();
    }
    setIsEditing(false);
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

  const deleteHandel = (id) => {
    setDeleteFieldId(id);
    setDeleteConfirmBox(true);
  }

  const deleteField = async () => {
    try {
      setIsLoader(true);
      const res = await CustomizationServices.deleteCustomField(deleteFieldId);
      setDeletedFieldId(deleteFieldId);
      setSuccessMsg(res.message);
      setOption(null);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
      setDeleteConfirmBox(false);
      fetchCustomFields();
    }
  };

  const deleteConfirm = (response) => {
    if (response === "yes") {
      deleteField();
    } else {
      setDeleteConfirmBox(false);
    }
  };

  const toggleActive = async (elem, index) => {
    try {
      setToggleIndex(index);
      setSmallLoader(true);
      const payload = {
        name: elem.fieldName,
        type: elem.fieldType,
        defaultValue: elem.fieldDefault,
        alias: elem.alias,
        status: !elem.status
      };
      const res = await CustomizationServices.editCustomField(elem._id, payload);
      setCustomFieldList((elms) =>
        elms.map((el) => {
          if (el._id === elem._id) {
            el.status = !elem.status;
          }
          return { ...el };
        })
      );
      //customFieldList[index].status = !elem.status;
      setSuccessMsg(res.message);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setToggleIndex(null);
      setSmallLoader(false);
      console.log(customFieldList);
    }
  }

  const editHandel = (elem) => {
    setIsEditing(true)
    setOpenModal(true);
    setEditedEle({
      name: elem.fieldName,
      type: elem.fieldType,
      defaultValue: elem.fieldDefault,
      alias: elem.alias,
      status: elem.status,
      _id: elem._id
    });
  }

  const createSuccess = (msg) => {
    setSuccessMsg(msg);
  }

  const createError= (msg) => {
    setErrorMsg(msg);
  }



  return (
    <>
    {isLoader ? <Loader /> : ''}
      <div className="dashInnerUI customization">
        <div className="userListHead customization">
          <div className="listInfo">
            <ul className="listPath">
              <li>Settings </li>
              <li>Customization</li>
            </ul>
            <h2 className="inDashboardHeader">
              Customizations
            </h2>
            <p className="userListAbout">Manage tax and custom fields.</p>
            {successMsg &&
              <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
              <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {deleteConfirmBox && <ConfirmBox message="Are you sure, you want to delete this Custom Field?" callback={deleteConfirm} />}
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
            <button className="common_blue_button" type="submit"
              disabled={(disableBtn || taxData.editAccess === false) ? true : false}>Update
              <img src={arrowRightWhite} alt="" /></button>
          </form>
        </div>
      </div>
      <div className="customFieldListing">
        <div className="customFields">
          <h3>Custom Fields</h3>
          <button className="creatUserBtn"
            onClick={openAddCusomFieldHandler}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create Custom Field</span>
          </button>
        </div>
        <div className="userListBody">
          <ul className="customtableListing">
            <li className="listHeading">
              <div>Field Name</div>
              <div>Field Alias Name</div>
              <div>Field Type</div>
              <div className="space">Default Value</div>
              <div className="vacent"></div>
            </li>
            {customFieldList.map((elem, key) => {
              return (
                <li>
                  {/* <div>{elem.field_Name}</div>
                  <div>{elem.field_Alias_Name}</div>
                  <div>{elem.field_Type}</div>
                  <div> {elem.default_Value}</div> */}
                  <div>{elem.fieldName}</div>
                  <div>{elem.alias}</div>
                  <div>{elem.fieldType}</div>
                  <div> {elem.fieldDefault}</div>
                  <div>
                    <label className={elem.status ? "toggleBtn active" : "toggleBtn"}>
                      <input type="checkbox" checked={elem.status} onClick={() => toggleActive (elem, key)} /><span className="toggler"></span>
                    </label>
                    {toggleIndex === key && smallLoader ? <img src={smallLoaderImg} alt="loading" className="smallLoader" /> : ""}
                    <div className="info_3dot_icon" ref={ref}>
                      <button className="btn"
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
                      <button className="btn btnEdit" onClick={() => editHandel (elem)}>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                        </span>
                        Edit
                      </button>
                      <button className="btn btnDelete" data-id={elem._id} onClick={() => deleteHandel (elem._id)}>
                        <span>
                          <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
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
          ele={editedEle} 
          editStatus={isEditing}
          savedNew={() => fetchCustomFields ()} 
          successMessage={(msg) => createSuccess (msg)} 
          errorMessage={(msg) => createError (msg)}
        />
      }
    </>
  )
};

export default Customizations;
