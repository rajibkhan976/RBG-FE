import React, { useState } from 'react';
import GroupsListing from "./GroupsListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";

const Groups = (props) => {
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
              <GroupsListing />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
