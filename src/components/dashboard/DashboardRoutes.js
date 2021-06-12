import React from "react";
import { Route } from "react-router-dom";
import AuthRoutes from "../authentication/AuthRoutes";
import AutomationRoutes from "../automation/AutomationRoutes";
import ContactRoutes from "../contact/ContactRoutes";

const DashboardRouting = (props) => {
  return (
    <React.Fragment>
      <Route component={AuthRoutes} />
      <Route component={AutomationRoutes} />
      <Route component={ContactRoutes} />
    </React.Fragment>
  );
};

export default DashboardRouting;
