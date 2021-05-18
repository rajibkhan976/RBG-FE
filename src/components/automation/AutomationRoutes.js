import { useEffect } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import AutomationLists from "./automationLists/AutomationLists";
import white_arrow_right from "../../assets/images/white_arrow_right.svg";

function Automation(props) {
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
              <div className="indicator"></div>
              <div className="linkDetails">
                <p className="linkHeading">Roles</p>
                <span className="notificationNumber">10</span>
                <br />
                <p className="linkAbout">Manage user roles</p>
              </div>
              <img className="arrowIcon" src={white_arrow_right} alt="" />
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
