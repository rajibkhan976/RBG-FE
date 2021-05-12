import { useState } from "react";

import DashboardRouting from "./DashboardRouting";
import LeftMenu from "../common/LeftMenu";

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
