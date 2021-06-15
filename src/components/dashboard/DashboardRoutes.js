import React from "react";
import { Route } from "react-router-dom";
import AuthRoutes from "../authentication/AuthRoutes";
import AutomationRoutes from "../automation/AutomationRoutes";
import ContactRoutes from "../contact/ContactRoutes";
import NotFound from "../shared/NotFound";

const DashboardRouting = (props) => {
  return (
    <React.Fragment>
      <Route component={AuthRoutes} />
      <Route component={AutomationRoutes} />
      <Route component={ContactRoutes} />
      <Route path={["*", "/404"]} component={NotFound}/>
    </React.Fragment>
  );
};

export default DashboardRouting;
