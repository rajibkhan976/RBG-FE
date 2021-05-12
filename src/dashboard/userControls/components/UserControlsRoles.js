import DashboardPagination from "../../../common/Pagination";

const UserControlsRoles = (props) => {
  return (
    <div className="dashInnerUI">
      <div className="hide">
        <div className="userListHead">
          <div className="listInfo">
            <p className="listPath">
              Users & Controls <span>></span> <span>Users</span>
            </p>
            <p className="userListNumber">User List (48)</p>
            <p className="userListAbout">
              Create & manage multiple sub-users with different access
            </p>
          </div>
          <div className="listFeatures">
            <div className="searchBar">
              <input type="search" name="" id="" placeholder="Search users" />
              <button className="searchIcon">
                <img src={search_icon} alt="" />
              </button>
            </div>
            <div className="filter">
              <p>Filter</p>
              <img className="filterIcon" src={filter_icon} alt="" />
            </div>
            <button className="creatUserBtn">
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Create an user</span>
            </button>
          </div>
        </div>
        <div className="userListBody">
          <div className="listBody">
            <ul>
              <li className="listHeading">
                <div className="userName">
                  User Name
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="phoneNum">
                  Phone No
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="emailID">
                  Email Id
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="role">
                  Role
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="assignedGroup">
                  Assigned Group
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="status">
                  Status
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="createDate">
                  Created on
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo">
                <div className="userName">
                  <a href="">
                    <img src={owner_img_1} alt="" />
                    <p>Richard Nile</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> (555) 555-1234</a>
                </div>
                <div className="emailID">
                  <a href=""> richard.nile99@gmail.com</a>
                </div>
                <div className="role">
                  <a href=""> Gym Owner</a>
                </div>
                <div className="assignedGroup">
                  <a href=""> Gym Staff</a>
                </div>
                <div className="status">
                  <a href=""> Active</a>
                </div>
                <div className="createDate">
                  <a href="">2nd Feb 2021</a>
                </div>
                <div className="info_3dot_icon">
                  <a href="">
                    
                    <img src={info_3dot_icon} alt="" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="pagination">
            <ul>
              <li>
                <a href="">1</a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li className="active">
                <a href="">4</a>
              </li>
              <li>
                <a href="">5</a>
              </li>
              <li>
                <img className="more_pages_Icon" src={more_pages_Icon} alt="" />
              </li>
              <li>
                <a href="">
                  <img src={arrow} alt="" />
                </a>
              </li>
            </ul>
          </div>
          <div className="copyRight">
            © 2021 Red Belt Gym, Inc. All rights reserved
          </div>
        </div>
        <div className="createNewUser">
          <div className="createForm hide">
            <div className="formBody">
              <div className="formHeading">
                <p>Create an User </p>
                <span>
                  Create multiple sub-users with different access permissions of
                  your business.
                </span>
                <a href="" className="cancelIcon">
                  <img src={cross_icon} alt="" />
                </a>
              </div>
              <div className="setProfilePic">
                <p className="profilePicHeading">Set profile picture</p>
                <a href="" className="uploadCamerIcon">
                  <img src={camera_icon} alt="" />
                </a>
                <span>Profile picture</span>
                <a href="" className="uploadLink">
                  Upload
                </a>
              </div>
              <div className="formInputs">
                <div className="InfoField">
                  <p className="InfoFieldHead">Personal Information</p>
                  <div className="InfoInputs">
                    <ul>
                      <li>
                        <div className="formField">
                          <p>First Name</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Ex. Adam"
                          />
                        </div>
                        <div className="formField">
                          <p>Last Name</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Ex. Smith"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="formField">
                          <p>Phone No</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Eg. (555) 555-1234"
                          />
                        </div>
                        <div className="formField">
                          <p>Email</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Adam.smith@domain.com"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="InfoField assignRoleGroup">
                  <p className="InfoFieldHead">Assign Role & Group</p>
                  <div className="InfoInputs">
                    <ul>
                      <li>
                        <div className="formField">
                          <p>Default user role</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Gym Owner"
                          />
                          <img
                            className="dropDownIcon"
                            src={arrowDown}
                            alt=""
                          />
                        </div>
                        <div className="formField">
                          <p>Select a group</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Adam.smith@domain.com"
                          />
                          <img
                            className="dropDownIcon"
                            src={arrowDown}
                            alt=""
                          />
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
                    <li className="InputsContainerHead">
                      <p>
                        Entity <a href="">Select All</a>
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
                  * You can customize permissions for this user based on your
                  need.
                </p>
                <div className="enableNotification">
                  <input type="checkbox" name="" id="" />
                  <p>Notify users by mail on adding them to this group </p>
                </div>
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
          </div>

          <div className="createForm hide">
            <div className="formBody">
              <div className="formHeading">
                <p>Create an User </p>
                <span>
                  Create multiple sub-users with different access permissions of
                  your business.
                </span>
                <a href="" className="cancelIcon">
                  <img src={cross_icon} alt="" />
                </a>
              </div>
              <div className="setProfilePic">
                <p className="profilePicHeading">Set profile picture</p>
                <a href="" className="uploadCamerIcon">
                  <img src={camera_icon} alt="" />
                </a>
                <span>Profile picture</span>
                <a href="" className="uploadLink">
                  Upload
                </a>
              </div>
              <div className="formInputs">
                <div className="InfoField">
                  <p className="InfoFieldHead">Personal Information</p>
                  <div className="InfoInputs">
                    <ul>
                      <li>
                        <div className="formField">
                          <p>First Name</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Ex. Adam"
                          />
                        </div>
                        <div className="formField">
                          <p>Last Name</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Ex. Smith"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="formField">
                          <p>Phone No</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Eg. (555) 555-1234"
                          />
                        </div>
                        <div className="formField">
                          <p>Email</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Adam.smith@domain.com"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="InfoField assignRoleGroup">
                  <p className="InfoFieldHead">Assign Role & Group</p>
                  <div className="InfoInputs">
                    <ul>
                      <li>
                        <div className="formField">
                          <p>Default user role</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Gym Owner"
                          />
                          <img
                            className="dropDownIcon"
                            src={arrowDown}
                            alt=""
                          />
                        </div>
                        <div className="formField">
                          <p>Select a group</p>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Adam.smith@domain.com"
                          />
                          <img
                            className="dropDownIcon"
                            src={arrowDown}
                            alt=""
                          />
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
                    <li className="InputsContainerHead">
                      <p>
                        Entity <a href="">Select All</a>
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
                  * You can customize permissions for this user based on your
                  need.
                </p>
                <div className="newGroupName">
                  <div className="formField">
                    <p>Create a new group with the new permissions *</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter a new group name"
                    />
                  </div>
                </div>
                <div className="enableNotification">
                  <input type="checkbox" name="" id="" />
                  <p>Notify users by mail on adding them to this group </p>
                </div>
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
          </div>

          <div className="createForm applyFilterForm hide">
            <p className="filterFormHeading">Apply Filter</p>
            <div className="filterFormBody">
              <div className="formField">
                <p>Select Group</p>
                <input type="text" name="" id="" placeholder="Gym Staff" />
                <img className="dropDownIcon" src={arrowDown} alt="" />
              </div>
              <div className="createdDate">
                <p>Created on</p>
                <div className="createdDateFields">
                  <div className="formField">
                    <p>From</p>
                    <input type="date" name="" id="" placeholder="dd/mm/yyyy" />
                  </div>
                  <div className="formField">
                    <p>To</p>
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="selectStatus">
                <div className="formField">
                  <p>Select Status</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Select Status"
                  />
                  <img className="dropDownIcon" src={arrowDown} alt="" />
                </div>
              </div>
              <div className="applyFilterBtn">
                <button className="saveNnewBtn">
                  <span>Apply Filter</span>
                  <img className="" src={arrow_forward} alt="" />
                </button>
                <a href="">Clear</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="userRoles hide">
        <div className="userListHead">
          <div className="listInfo">
            <p className="listPath">
              Users & Controls <span>></span> <span>Roles</span>
            </p>
            <p className="userListNumber">User Roles(0)</p>
            <p className="userListAbout">
              Create & manage roles for your users
            </p>
          </div>
        </div>
        <div className="userListBody">
          <div className="listBody">
            <ul>
              <li className="listHeading userRole">
                <div className="userName">
                  Role Name
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="phoneNum assignedPeople">
                  No. of people assigned
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="emailID">
                  Created on
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="createNew">
            <span>
              <img src={list_board_icon} alt="" />
              <p>You haven’t created any roles yet.</p>
            </span>
            <button className="creatUserBtn">
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Create an user</span>
            </button>
          </div>
        </div>
        <div className="copyRight">
          © 2021 Red Belt Gym, Inc. All rights reserved
        </div>
      </div>

      <div className="userRoles hide">
        <div className="userListHead">
          <div className="listInfo">
            <p className="listPath">
              Users & Controls <span>></span> <span>Roles</span>
            </p>
            <p className="userListNumber">User Roles(0)</p>
            <p className="userListAbout">
              Create & manage roles for your users
            </p>
          </div>

          <div className="listFeatures">
            <div className="searchBar">
              <input type="search" name="" id="" placeholder="Search users" />
              <button className="searchIcon">
                <img src={search_icon} alt="" />
              </button>
            </div>
            <div className="filter">
              <p>Filter</p>
              <img className="filterIcon" src={filter_icon} alt="" />
            </div>
            <button className="creatUserBtn">
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Create an user</span>
            </button>
          </div>
        </div>
        <div className="userListBody">
          <div className="listBody">
            <ul>
              <li className="listHeading userRole">
                <div className="userName">
                  Role Name
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="phoneNum assignedPeople">
                  No. of people assigned
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
                <div className="emailID">
                  Created on
                  <a href="" className="arrowUp">
                    <img src={arrowUp} alt="" />
                  </a>
                  <a href="" className="arrowDown">
                    <img src={arrowDown} alt="" />
                  </a>
                </div>
              </li>
              <li className="owerInfo userRole">
                <div className="userName">
                  <a href="">
                    <p>Gym Manager</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> 2</a>
                </div>
                <div className="emailID">
                  <a href="">2nd Feb 2021</a>
                </div>
                <a href="">
                  
                  <img src={info_3dot_icon} alt="" />
                </a>
              </li>
              <li className="owerInfo userRole">
                <div className="userName">
                  <a href="">
                    <p>Gym Manager</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> 2</a>
                </div>
                <div className="emailID">
                  <a href="">2nd Feb 2021</a>
                </div>
                <a href="">
                  
                  <img src={info_3dot_icon} alt="" />
                </a>
              </li>
              <li className="owerInfo userRole">
                <div className="userName">
                  <a href="">
                    <p>Gym Manager</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> 2</a>
                </div>
                <div className="emailID">
                  <a href="">2nd Feb 2021</a>
                </div>
                <a href="">
                  
                  <img src={info_3dot_icon} alt="" />
                </a>
              </li>
              <li className="owerInfo userRole">
                <div className="userName">
                  <a href="">
                    <p>Gym Manager</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> 2</a>
                </div>
                <div className="emailID">
                  <a href="">2nd Feb 2021</a>
                </div>
                <a href="">
                  
                  <img src={info_3dot_icon} alt="" />
                </a>
              </li>
              <li className="owerInfo userRole">
                <div className="userName">
                  <a href="">
                    <p>Gym Manager</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> 2</a>
                </div>
                <div className="emailID">
                  <a href="">2nd Feb 2021</a>
                </div>
                <a href="">
                  
                  <img src={info_3dot_icon} alt="" />
                </a>
              </li>
              <li className="owerInfo userRole">
                <div className="userName">
                  <a href="">
                    <p>Gym Manager</p>
                  </a>
                </div>
                <div className="phoneNum">
                  <a href=""> 2</a>
                </div>
                <div className="emailID">
                  <a href="">2nd Feb 2021</a>
                </div>
                <a href="">
                  
                  <img src={info_3dot_icon} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pagination">
          <ul>
            <li>
              <a href="">1</a>
            </li>
            <li>
              <a href="">2</a>
            </li>
            <li>
              <a href="">3</a>
            </li>
            <li className="active">
              <a href="">4</a>
            </li>
            <li>
              <a href="">5</a>
            </li>
            <li>
              <img className="more_pages_Icon" src={more_pages_Icon} alt="" />
            </li>
            <li>
              <a href="">
                <img src={arrow} alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div className="copyRight">
          © 2021 Red Belt Gym, Inc. All rights reserved
        </div>
      </div>

      <div className="createUserRole">
        <div className="createForm ">
          <div className="formBody">
            <div className="formHeading">
              <p>Create an user role</p>
              <span>
                We got you covered! Limit your Gym Staffs to access your
                business information.
              </span>
              <a href="" className="cancelIcon">
                <img src={cross_icon} alt="" />
              </a>
            </div>

            <div className="enterRoleName">
              <div className="formField">
                <p>Enter role name</p>
                <input type="text" name="" id="" placeholder="Ex. Manager" />
              </div>

              <div className="permissionButtons enterRoleNameBtn">
                <button className="creatUserBtn createBtn">
                  <img className="plusIcon" src={plus_icon} alt="" />
                  <span>Create an user</span>
                </button>
                <button className="saveNnewBtn">
                  <span>Save & New</span>
                  <img className="" src={arrow_forward} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardPagination />
    </div>
  );
};

export default UserControlsRoles;
