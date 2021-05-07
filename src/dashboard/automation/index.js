import { useEffect } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import SidebarLogo from "../../assets/images/sidebar-logo.png";
import AutomationLists from "./components/AutomationLists";

function Automation(props) {
  useEffect(() => {      
  });

  return (
    <Switch>
      <div className="dashboardElComponent">
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
        <Redirect exact from="/automation" to="/automation/automation-list" />
        <Route strict path="/automation/automation-list" component={AutomationLists} />
      </div>
    </Switch>
  );
}

export default Automation;
