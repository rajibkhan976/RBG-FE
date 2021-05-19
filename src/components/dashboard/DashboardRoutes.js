import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoutes from "../authentication/AuthRoutes";
import AutomationRoutes from "../automation/AutomationRoutes";


const DashboardRouting = (props) => {
  return (
    <React.Fragment>
      <Route component={AuthRoutes} />
      <Route component={AutomationRoutes} />
    </React.Fragment>
  );
};

export default DashboardRouting;
