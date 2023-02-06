import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import contact from "./contact";
import SidebarLogo from "../../assets/images/logo_128_28.svg";

const ContactRoutes = (props) => {
  return (
    <React.Fragment>
      <div className="menuDetails lessLeftMenu">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
      </div>
      {/* <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="contact"/> */}
      <div className="dashboardElComponent fullWithContainer">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Switch>
            <Route exact path="/contacts" component={contact} />
          </Switch>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ContactRoutes;
