import { useState } from "react";
import DashboardPagination from "../../../common/Pagination";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";

const UserControlsGroups = (props) => {
  const toggleCreateHeader = () => {
    props.toggleCreate("groups");
  };


  const filterGroups = () => {
    props.toggleFilter("groups");
  }

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
      <DashboardPagination />
    </div>
  );
};

export default UserControlsGroups;
