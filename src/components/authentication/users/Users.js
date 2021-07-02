import React, { useState } from 'react';
import UsersListing from "./UsersListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import Filter from '../../shared/FilterAuth.js';
import SideModal from '../../shared/SideModal';
import UserModal from './UserModal';
import UserFilter from './UserFilter';
import ConfirmBox from '../../shared/confirmBox';


const Users = (props) => {
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);

  const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);

  const toggleLeftSubMenu = (status = false) => {
    setShowLeftSubMenu(status)
  };

  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e)
  }

  return (
    <div className="mainComponent">
      {/* <ConfirmBox/> */}
      <div className={"dashboardBody d-flex f-align-center "  + (showLeftSubMenu ? "openSubmenu" : "")}>
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu toggleLeftSubMenu={toggleLeftSubMenu}  />
          <div className="dashboardElComponent">
            <HeaderDashboard
              toggleCreate={toggleCreate}
              stateFilter={stateFilter}
            />
            <div className="dashInnerStructure">
              <UsersListing
                toggleFilter={toggleFilter}
                toggleCreate={toggleCreate}
              />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
      <UserFilter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
      />
      <UserModal
        createButton={createButton}
        setCreateButton={setCreateButton}
      />
    </div>
  );
};

export default Users;
