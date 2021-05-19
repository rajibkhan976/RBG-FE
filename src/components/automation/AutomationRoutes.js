import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import AutomationLists from "./automationLists/AutomationLists";


const AutomationRoutes = (props) => {
  return (
    <React.Fragment>
      <ProtectedRoute exact path="/automation-list" component={AutomationLists} />
    </React.Fragment>
  );
}

export default AutomationRoutes;
