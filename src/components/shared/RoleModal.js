import camera_icon from "../../assets/images/camera_icon.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import plus_icon from "../../assets/images/plus_icon.svg";
import arrowDown from "../../assets/images/arrowDown.svg";
import { useState, useEffect } from "react";
import { RoleServices } from "../../services/authentication/RoleServices";
import { history } from "../../helpers";

const RoleModal = (props) => {
  const closeSideMenu = (e) => {
    e.preventDefault();
    props.setCreateButton(null);
  };

  const editRole = props.createButton ? props.createButton : false;
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
  });
  const [saveAndNew, setSaveAndNew] = useState(false);
  
  useEffect(() => {

    /** Fillup states */ 
    if (editRole && editRole._id && !id) {
      setId(editRole._id);
      setName(editRole.name);
      setSlug(editRole.slug);
      setDescription(editRole.description);
      setStatus(editRole.status);
    }

  });

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);

    let roleSlug = event.target.value ? ((event.target.value).toLowerCase()).replace(" ", "-") : "";
    setSlug(roleSlug);
  }
  
  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  }

  const handleSaveAndNew = () => {
    setSaveAndNew(true);
  }

  const resetRoleForm = () => {
    setName(null);
    setDescription(null);
    setSuccessMsg(null);
    setErrorMsg(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    let isError = false;

    /**
     * Check name field
     */
    if (!name) {
      isError = true;
      formErrors.name = "Please fillup the name";
    } else {
      formErrors.name = null;
    }

    /**
     * Check description field
     */
    if (!description) {
      isError = true;
      formErrors.description = "Please fillup the description";
    } else {
      formErrors.description = null
    }

    /**
     * Check the erros flag
     */
    if (isError) {
      /**
       * Set form errors
       */
      setProcessing(false);
      setFormErrors({
        name: formErrors.name,
        description: formErrors.description
      });
      console.log('formErrors', formErrors)
    } else {
      /**
       * Submit role create form
       */
      let payload = {
        name: name,
        slug: slug,
        description: description,
        status: status
      };

      /**
       * Lets decide the operation type
       */
      let oprationMethod = "createRole";
      if (editRole && editRole._id) {
        oprationMethod = "editRole";
        payload.id = id;
      }

      try {
        await RoleServices[oprationMethod](payload)
          .then(result => {
            console.log("Create role result", result)
                        
            setSuccessMsg(result);
            
            /**
             * Reset modal
             */
            setTimeout(() => {
              if (saveAndNew) {
                setSaveAndNew(false);
                props.setCreateButton(null);
                props.setCreateButton('role');
              } else {
                props.setCreateButton(null);
              }
              setProcessing(false);
              resetRoleForm();
              history.go(0)
            }, 2000)
            
          })
      } catch (e) {
        
        /**
         * Segregate error by http status
         */
        setProcessing(false);
        console.log("Error in role create", e)
        if (e.response && e.response.status == 403) {
          setErrorMsg("You dont have permission to perform this action");
        }
        else if (e.response && e.response.data.message) {
          setErrorMsg(e.response.data.message);
        }
        
      }
    }
  }


  return (
    <>  
      {props.createButton !== null && (
        <div className="sideMenuOuter createSideModal sideRoles">
          <div className="sideMenuInner">
            <button
              className="btn btn-closeSideMenu"
              onClick={(e) => closeSideMenu(e)}
            >
              <span></span>
              <span></span>
            </button>
            
            <>
              <div className="sideMenuHeader">
                
                <h3>{editRole && editRole._id ? "Edit" : "Create"} an user role</h3>
                <p>
                  We got you covered! Limit your Gym Staffs to access your
                  business information.
                  </p>
              </div>

              <div className="sideMenuBody">
                
                {successMsg && 
                  <div className="success successMsg">
                    <p>{successMsg}</p>
                  </div>
                }
                {errorMsg &&
                  <div className="error errorMsg">
                    <p>{errorMsg}</p>
                  </div>
                }
                {formErrors && 
                  <div className="error errorMsg">
                    {formErrors.name &&
                    <p>{formErrors.name}</p>}
                  
                    {formErrors.description &&
                    <p>{formErrors.description}</p>}
                  </div>
                }
                <form onSubmit={handleSubmit}>
                  <div className="formField">
                    <p>Enter role name</p>
                    <div className="inFormField">
                      <input
                        type="text"
                        name="name"
                        defaultValue={name}
                        onChange={handleNameChange}
                        placeholder="Ex. Manager"
                      />
                    </div>
                  </div>
                  <div className="formField">
                    <p>Enter role description</p>
                    <div className="inFormField">
                      <textarea
                        name="description"
                        onChange={handleDescriptionChange}
                        id=""
                        placeholder="Ex. Managers of production"
                        defaultValue={description}
                      >
                      </textarea>
                    </div>
                  </div>

                  <div className="permissionButtons enterRoleNameBtn">
                    <button disabled={processing}  className="creatUserBtn createBtn">
                      <img className="plusIcon" src={plus_icon} alt="" />
                      <span>{editRole && editRole._id ? "Edit" : "Create"} role</span>
                    </button>
                    {!editRole && (
                      <button disabled={processing} className="saveNnewBtn"
                          onClick={handleSaveAndNew}
                        >
                          <span>Save & New</span>
                          <img className="" src={arrow_forward} alt="" />
                        </button>
                    )}
                    </div>
                </form>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleModal;
