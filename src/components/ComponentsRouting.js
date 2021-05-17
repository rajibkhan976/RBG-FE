import { useState } from "react";

import DashboardRouting from "./DashboardRoutes";
import LeftMenu from "../shared/LeftMenu";

function Dashboard(props) {
  return (
    <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu />
        <div className="dashMain">
          <DashboardRouting />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
