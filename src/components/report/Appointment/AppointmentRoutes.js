import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../../middleware/ProtectedRoute";
import DashboardFooter from "../../shared/FooterDashboard";
import HeaderDashboard from "../../shared/HeaderDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import Appointment from "./Appointment";


const AppointmentRoutes = (props) => {
  return (
    <React.Fragment>
      <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="report"/>
      <div className="dashboardElComponent">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Switch>
            <Route exact path="/appointment" component={Appointment} />
          </Switch>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AppointmentRoutes;
