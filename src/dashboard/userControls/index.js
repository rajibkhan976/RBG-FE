import { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import UserControlsRoles from "./components/UserControlsRoles";
import UserControlsGroups from "./components/UserControlsGroups";
import UserControlsUsers from "./components/UserControlsUsers";
import SidebarLogo from "../../assets/images/sidebar-logo.png";

function UserControls(props) {
  const [activeControls, setActiveControls] = useState("user-roles");
  useEffect(() => {
    let windowPathname = window.location.pathname;
    if (windowPathname === "/user-controls/roles") {
      setActiveControls("user-controls");
    } else if (windowPathname === "/user-controls/groups") {
      setActiveControls("user-groups");
    } else if (windowPathname === "/user-controls/users") {
      setActiveControls("user-users");
    } else {
      setActiveControls("404");
    }
  });
  return (
    <Switch>
      <div className="dashboardElComponent">
        <div className="menuDetails">
          <figure className="logoSidebar">
            <img src={SidebarLogo} alt="" />
          </figure>
          <Route strict path="/user-controls">
            <ul>
              <li>
                <NavLink
                  className={
                    activeControls === "user-controls"
                      ? "leftMenuInnerLink ucLinks selectedUC"
                      : "leftMenuInnerLink ucLinks"
                  }
                  to="/user-controls/roles"
                >
                  Roles
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    activeControls === "user-groups"
                      ? "leftMenuInnerLink ucLinks selectedUC"
                      : "leftMenuInnerLink ucLinks"
                  }
                  to="/user-controls/groups"
                >
                  Groups
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    activeControls === "user-users"
                      ? "leftMenuInnerLink ucLinks selectedUC"
                      : "leftMenuInnerLink ucLinks"
                  }
                  to="/user-controls/users"
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </Route>
          <Route strict path="/automation">
            <h2>automation details</h2>
          </Route>
          <Route strict path="/contacts">
            <h2>contacts details</h2>
          </Route>
        </div>
        <Route
          strict
          path="/user-controls/roles"
          component={UserControlsRoles}
        />
        <Route
          strict
          path="/user-controls/groups"
          component={UserControlsGroups}
        />
        <Route
          strict
          path="/user-controls/users"
          component={UserControlsUsers}
        />
      </div>
    </Switch>
  );
}

export default UserControls;
