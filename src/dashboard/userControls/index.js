import { useEffect, useState } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import DashboardFooter from "../../common/FooterDashboard";
import HeaderDashboard from "../../common/HeaderDashboard";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import UserControlsRoles from "./components/UserControlsRoles";
import UserControlsGroups from "./components/UserControlsGroups";
import UserControlsUsers from "./components/UserControlsUsers";

import white_arrow_right from '../../assets/images/white_arrow_right.svg';
import undraw_personal_settings_kihd from '../../assets/images/undraw_personal_settings_kihd.svg';

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
              <div className="Indicator"></div>
              <div className="linkDetails">
                <p className="linkHeading">Roles</p>
                <span className="notificationNumber">10</span>
                <br />
                <p className="linkAbout">Manage user roles</p>
              </div>
              <img className="arrowIcon" src={white_arrow_right} alt="" />
            </NavLink>
          </li>
          <li>
            <NavLink className="leftMenuInnerLink" to="/user-controls/groups">
              <div className="Indicator"></div>
              <div className="linkDetails">
                <p className="linkHeading">Groups</p>
                <span className="notificationNumber">5</span>
                <br />
                <p className="linkAbout">Manage user groups</p>
              </div>
              <img className="arrowIcon" src={white_arrow_right} alt="" />
            </NavLink>
          </li>
          <li>
            <NavLink className="leftMenuInnerLink" to="/user-controls/users">
              <div className="active Indicator"></div>
              <div className="linkDetails">
                <p className="linkHeading">Users</p>
                <span className="notificationNumber">48</span>
                <br />
                <p className="linkAbout">Manage users & sub-users</p>
              </div>
              <img className="arrowIcon" src={white_arrow_right} alt="" />
            </NavLink>
          </li>
        </ul>
        <div className="linkImg">
          <img src={undraw_personal_settings_kihd} alt="" />
        </div>
      </div>
      <div className="dashboardElComponent">
        <HeaderDashboard />

        <div className="dashInnerStructure">
          <Switch>
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
          </Switch>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
}

export default UserControls;
