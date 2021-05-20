import React, { useState } from 'react';
import LeftMenu from "../shared/LeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";

const Dashboard = () => {
  document.title = "Dashboard";
  const [createButton, setCreateButton] = useState(null);

  const toggleCreate = (e) => {
    console.log('DASHBOARD STRUCTURE:::', createButton)
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
              <h1>Dashboard</h1>
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
