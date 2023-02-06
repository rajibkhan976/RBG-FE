import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import Roles from "./roles/Roles";
import Groups from "./groups/Groups";
import Users from "./users/Users";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";
import Organizations from "./organizations/Organizations";
import Associations from "./associations/Associations";
import SidebarLogo from "../../assets/images/logo_128_28.svg";

const AuthRoutes = (props) => {
  const [randomID, setRandomID] = useState(Math.random().toString());
  const renderID = (randomID) => {
    console.log("Random ID", randomID);
  }
  const loggedInUser = useSelector((state) => state.user.data);
  console.log("logged in user", loggedInUser);
  return (
    <React.Fragment>
      <div className="menuDetails lessLeftMenu">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
      </div>
      { loggedInUser && loggedInUser.organization && loggedInUser.organizationCode === 'rbg' &&
        <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="auth" reRender={(id) => renderID(id)} />
      }
      <div className="dashboardElComponent fullWithContainer">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Route path="/roles" component={Roles} />
          {/* <Route
            path="/roles"
            render={(props) => <Roles key={randomID} {...props} />}
          /> */}
          <Route path="/groups" component={Groups} />
          <Route path="/users" component={Users} />
          <Route path="/organizations" component={Organizations} />
          <Route path="/associations" component={Associations} />
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthRoutes;
