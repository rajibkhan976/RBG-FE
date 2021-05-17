import { useEffect, useState } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import DashboardFooter from "../../shared/FooterDashboard";
import HeaderDashboard from "../../shared/HeaderDashboard";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import AutomationLists from "./automationLists/AutomationLists";

function Automation(props) {
  const [createButton, setCreateButton] = useState("");

  const toggleCreate = (e) => {
    console.log(e);
  };

  useEffect(() => {});

  return (
    <>
      <div className="menuDetails">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
        <ul>
          <li>
            <NavLink
              className="leftMenuInnerLink"
              to="/automation/automation-list"
            >
              Automation Lists
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="dashboardElComponent">
        <HeaderDashboard toggleCreate={toggleCreate} />
        <div className="dashInnerStructure">
          <div className="dashInnerUI">
            <Switch>
              <Redirect
                exact
                from="/automation"
                to="/automation/automation-list"
              />
              <Route
                strict
                path="/automation/automation-list"
                component={AutomationLists}
              />
            </Switch>
          </div>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
}

export default Automation;
