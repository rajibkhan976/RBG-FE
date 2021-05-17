import DashboardPagination from "../../shared/Pagination";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

const UserControlsUsers = (props) => {
  const toggleCreateHeader = () => {
    props.toggleCreate("user");
  };

  const filterUsers = () => {
    props.toggleFilter("user");
  };

  return (
    <div className="dashInnerUI">
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Users</li>
          </ul>
          <h2 className="inDashboardHeader">User List (48)</h2>
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
          <button className="btn btn-filter" onClick={filterUsers}>
            <p>Filter</p>
            <img className="filterIcon" src={filter_icon} alt="" />
          </button>
          <button className="creatUserBtn" onClick={toggleCreateHeader}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create an user</span>
          </button>
        </div>
      </div>
      <div className="userListBody">
        <div className="listBody">
          <ul className="tableListing">
            <li className="listHeading">
              <div className="userName">User Name</div>
              <div className="phoneNum">Phone No</div>
              <div className="emailID">Email Id</div>
              <div className="role">Role</div>
              <div className="assignedGroup">Assigned Group</div>
              <div className="status">Status</div>
              <div className="createDate">Created on</div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo">
              <div className="userName">
                <button className="btn">
                  <img src={owner_img_1} alt="" />
                  <p>Richard Nile</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> (555) 555-1234</button>
              </div>
              <div className="emailID">
                <button className="btn"> richard.nile99@gmail.com</button>
              </div>
              <div className="role">
                <button className="btn"> Gym Owner</button>
              </div>
              <div className="assignedGroup">
                <button className="btn"> Gym Staff</button>
              </div>
              <div className="status">
                <button className="btn"> Active</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn">
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <DashboardPagination />
    </div>
  );
};

export default UserControlsUsers;
