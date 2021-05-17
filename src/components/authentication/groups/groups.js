import DashboardPagination from "../../shared/Pagination";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

const UserControlsGroups = (props) => {
  const toggleCreateHeader = () => {
    props.toggleCreate("groups");
  };

  const filterGroups = () => {
    props.toggleFilter("groups");
  };

  const editThisGroup = (e) => {

  };

  return (
    <div className="dashInnerUI">
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Groups</li>
          </ul>
          <h2 className="inDashboardHeader">User Groups (0)</h2>
          <p className="userListAbout">
            Create & manage groups for your business
          </p>
        </div>
        <div className="listFeatures">
          <div className="searchBar">
            <input type="search" name="" id="" placeholder="Search users" />
            <button className="searchIcon">
              <img src={search_icon} alt="" />
            </button>
          </div>
          <button className="btn btn-filter" onClick={filterGroups}>
            <p>Filter</p>
            <img className="filterIcon" src={filter_icon} alt="" />
          </button>
          <button className="creatUserBtn" onClick={toggleCreateHeader}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create a new group</span>
          </button>
        </div>
      </div>
      <div className="userListBody">
        <div className="listBody">
          <ul className="tableListing">
            <li className="listHeading userRole">
              <div className="userName">Group Name</div>
              <div className="phoneNum assignedPeople">
                No. of people assigned
              </div>
              <div className="createDate">Created on</div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn">
                  <p>Gym Manager</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> 2</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn" onClick={(e) => editThisGroup(e)}>
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn">
                  <p>Gym Manager</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> 2</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn" onClick={(e) => editThisGroup(e)}>
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn">
                  <p>Gym Manager</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> 2</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn" onClick={(e) => editThisGroup(e)}>
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn">
                  <p>Gym Manager</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> 2</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn" onClick={(e) => editThisGroup(e)}>
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn">
                  <p>Gym Manager</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> 2</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn" onClick={(e) => editThisGroup(e)}>
                    <img src={info_3dot_icon} alt="" />
                  </button>
                </div>
              </div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn">
                  <p>Gym Manager</p>
                </button>
              </div>
              <div className="phoneNum">
                <button className="btn"> 2</button>
              </div>
              <div className="createDate">
                <button className="btn">2nd Feb 2021</button>
                <div className="info_3dot_icon">
                  <button className="btn" onClick={(e) => editThisGroup(e)}>
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

export default UserControlsGroups;
