import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Roles from "./roles/Roles";
import Groups from "./groups/Groups";
import Users from "./users/Users";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";
import NotFound from "../shared/NotFound";

const AuthRoutes = (props) => {
  
  return (
    <React.Fragment>
      <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="auth"/>
      <div className="dashboardElComponent">
        <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} />
        <div className="dashInnerStructure">
          <Switch>
            <Route path="/roles" component={Roles} />
            <Route path="/groups" component={Groups}/>
            <Route path="/users" component={Users}/>
          </Switch>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthRoutes;
