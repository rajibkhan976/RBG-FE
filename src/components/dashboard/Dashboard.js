import React, { useState } from 'react';
import LeftMenu from "../shared/LeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";
import RolesListing from '../authentication/roles/RolesListing';
import Automation from '../automation/AutomationRoutes'
import InnerLeftMenu from "../shared/InnerLeftMenu";

const Dashboard = () => {
  document.title = "Dashboard";
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
              <Automation />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
