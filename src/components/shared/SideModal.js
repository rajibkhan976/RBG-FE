import camera_icon from "../../assets/images/camera_icon.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import plus_icon from "../../assets/images/plus_icon.svg";
import arrowDown from "../../assets/images/arrowDown.svg";

const SideModal = (props) => {
  const closeSideMenu = (e) => {
    e.preventDefault();
    props.setCreateButton(null);
  };

  return (
    <>
      {props.createButton !== null && (   
        <div
          className={
            props.createButton === "user"
              ? "sideMenuOuter createSideModal sideUser"
              : props.createButton === "roles"
              ? "sideMenuOuter createSideModal sideRoles"
              : props.createButton === "groups"
              ? "sideMenuOuter createSideModal sideGroups"
              : "sideMenuOuter createSideModal"
          }
        >
          <div className="sideMenuInner">
            <button
              className="btn btn-closeSideMenu"
              onClick={(e) => closeSideMenu(e)}
            >
              <span></span>
              <span></span>
            </button>
            {props.createButton === "user" ? (
              <>
                <div className="sideMenuHeader">
                  <h3>Create an User</h3>
                  <p>
                    Create multiple sub-users with different access permissions
                    of your business.
                  </p>
                </div>

                <div className="sideMenuBody">
                  <form className="formBody">
                    <div className="setProfilePic">
                      <p className="profilePicHeading">Set profile picture</p>
                      <div className="formField">
                        <label className="inputLabel">
                          <input type="file" />
                          <span>
                            <figure
                              style={{
                                backgroundImage: "url(" + camera_icon + ")",
                              }}
                            ></figure>
                            Profile picture
                          </span>
                        </label>
                        <button className="btn uploadLink">Upload</button>
                      </div>
                    </div>
                    <div className="formInputs">
                      <div className="infoField">
                        <p className="infoFieldHead">Personal Information</p>
                        <div className="infoInputs">
                          <ul>
                            <li>
                              <div className="formField w-50">
                                <p>First Name</p>
                                <div className="inFormField">
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Ex. Adam"
                                  />
                                </div>
                              </div>
                              <div className="formField w-50">
                                <p>Last Name</p>
                                <div className="inFormField">
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Ex. Smith"
                                  />
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="formField w-50">
                                <p>Phone No</p>
                                <div className="inFormField">
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Eg. (555) 555-1234"
                                  />
                                </div>
                              </div>
                              <div className="formField w-50">
                                <p>Email</p>
                                <div className="inFormField">
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Adam.smith@domain.com"
                                  />
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="infoField assignRoleGroup">
                        <p className="infoFieldHead">Assign Role & Group</p>
                        <div className="infoInputs">
                          <ul>
                            <li>
                              <div className="formField w-50">
                                <p>Default user role</p>
                                <div className="inFormField">
                                  <select
                                    style={{
                                      backgroundImage: "url(" + arrowDown + ")",
                                    }}
                                  >
                                    <option value="null">Gym Staff</option>
                                  </select>
                                </div>
                              </div>
                              <div className="formField w-50">
                                <p>Select a group</p>
                                <div className="inFormField">
                                  <select
                                    style={{
                                      backgroundImage: "url(" + arrowDown + ")",
                                    }}
                                  >
                                    <option value="null">
                                      Adam.smith@domain.com
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="permission">
                      <p className="permissionHead">Manage permissions</p>
                      <div className="InputsContainer">
                        <ul>
                          <li className="inputsContainerHead">
                            <p>
                              Entity{" "}
                              <button className="btn-link">Select All</button>
                            </p>
                            <p>Read</p>
                            <p>Add</p>
                            <p>Update</p>
                            <p>Delete</p>
                            <p>Import</p>
                            <p>Export</p>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Authentication</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Contacts</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Automations</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Communication</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Appointments</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Products</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Waiver</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Billing</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Reports</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Data Administration</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                        </ul>
                      </div>
                      <p className="staredInfo">
                        * You can customize permissions for this user based on
                        your need.
                      </p>
                      <div className="newGroupName">
                        <div className="formField w-50">
                          <p>Create a new group with the new permissions *</p>
                          <div className="inFormField">
                            <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Enter a new group name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="enableNotification">
                        <label>
                          <input type="checkbox" name="" id="" />
                          <span>
                            Notify users by mail on adding them to this group{" "}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="permissionButtons">
                      <button className="creatUserBtn createBtn">
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create an user</span>
                      </button>
                      <button className="saveNnewBtn">
                        <span>Save & New</span>
                        <img className="" src={arrow_forward} alt="" />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : props.createButton === "roles" ? (
              <>
                <div className="sideMenuHeader">
                  <h3>Create an user role</h3>
                  <p>
                    We got you covered! Limit your Gym Staffs to access your
                    business information.
                  </p>
                </div>

                <div className="sideMenuBody">
                  <div className="formField">
                    <p>Enter role name</p>
                    <div className="inFormField">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Ex. Manager"
                      />
                    </div>
                  </div>

                  <div className="permissionButtons enterRoleNameBtn">
                    <button className="creatUserBtn createBtn">
                      <img className="plusIcon" src={plus_icon} alt="" />
                      <span>Create role</span>
                    </button>
                    <button className="saveNnewBtn">
                      <span>Save & New</span>
                      <img className="" src={arrow_forward} alt="" />
                    </button>
                  </div>
                </div>
              </>
            ) : props.createButton === "groups" ? (
              <>
                <div className="sideMenuHeader">
                  <h3>Create a Group</h3>
                  <p>
                  Enter group name
                  </p>
                </div>

                <div className="sideMenuBody">
                  <form className="formBody">
                    <div className="newGroupName">
                      <div className="formField w-50">
                        <p>Enter group name</p>
                        <div className="inFormField">
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Ex. Gym Staffs"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="permission">
                      <p className="permissionHead">Manage permissions</p>
                      <div className="InputsContainer">
                        <ul>
                          <li className="inputsContainerHead">
                            <p>
                              Entity{" "}
                              <button className="btn-link">Select All</button>
                            </p>
                            <p>Read</p>
                            <p>Add</p>
                            <p>Update</p>
                            <p>Delete</p>
                            <p>Import</p>
                            <p>Export</p>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Authentication</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Contacts</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Automations</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Communication</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Appointments</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Products</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Waiver</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Billing</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Reports</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                          <li className="inputCheckBox">
                            <span>
                              <input type="checkbox" name="" id="" />
                              <p>+ Data Administration</p>
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                              <input type="checkbox" name="" id="" />
                            </span>
                          </li>
                        </ul>
                      </div>
                      <p className="staredInfo">
                        * Customize permissions for this user based on your
                        need.
                      </p>
                      <div className="enableNotification">
                        <label>
                          <input type="checkbox" name="" id="" />
                          <span>
                            Notify users by mail on adding them to this group{" "}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="permissionButtons">
                      <button className="creatUserBtn createBtn">
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create a group</span>
                      </button>
                      <button className="saveNnewBtn">
                        <span>Save & New</span>
                        <img className="" src={arrow_forward} alt="" />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideModal;
