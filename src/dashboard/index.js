import { useState } from "react";

import DashboardRouting from "./DashboardRouting";
import LeftMenu from "../common/LeftMenu";
import HeaderDashboard from "../common/HeaderDashboard";

function Dashboard(props) {
  let [hoveredLink, setHoveredLink] = useState(null);

  const getHovered = (e) => {
    let hrefToHovered = e.target.getAttribute('href');
    setHoveredLink(hrefToHovered)
  }

  return (
    <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu getHovered={getHovered} />
        <div className="dashMain">
          <HeaderDashboard />
          <DashboardRouting hoveredLink={hoveredLink} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
