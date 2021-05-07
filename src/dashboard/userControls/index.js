import { useEffect } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import HeaderDashboard from "../../common/HeaderDashboard";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import UserControlsRoles from "./components/UserControlsRoles";
import UserControlsGroups from "./components/UserControlsGroups";
import UserControlsUsers from "./components/UserControlsUsers";

function UserControls(props) {
  useEffect(() => {});
  return (
    <>
      <div className="menuDetails">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
        <ul>
          <li>
            <NavLink className="leftMenuInnerLink" to="/user-controls/roles">
              Roles
            </NavLink>
          </li>
          <li>
            <NavLink className="leftMenuInnerLink" to="/user-controls/groups">
              Groups
            </NavLink>
          </li>
          <li>
            <NavLink className="leftMenuInnerLink" to="/user-controls/users">
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <div className="dashboardElComponent">
          <HeaderDashboard />

          <div className="dashInnerStructure">
            <Redirect exact from="/user-controls/" to="/user-controls/roles" />
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
        </div>
      </Switch>
    </>
  );
}

export default UserControls;
