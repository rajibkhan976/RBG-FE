import React, { useState } from 'react';
import UsersListing from "./UsersListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";


const Users = (props) => {
  const [createButton, setCreateButton] = useState(null);
  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  return (
    <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu />
          <div className="dashboardElComponent">
            <HeaderDashboard toggleCreate={(e) => toggleCreate(e)} />
            <div className="dashInnerStructure">
              <UsersListing />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
