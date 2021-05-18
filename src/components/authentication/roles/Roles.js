import React, { useState } from 'react';
import RolesListing from "./RolesListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";

const Roles = () => {
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
              <RolesListing />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
