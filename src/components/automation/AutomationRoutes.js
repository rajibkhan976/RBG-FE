import React from "react";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import Automation from "./automationLists/Automation";


const AutomationRoutes = (props) => {
  return (
    <React.Fragment>
      <ProtectedRoute exact path="/automation-list" component={Automation} />
    </React.Fragment>
  );
}

export default AutomationRoutes;
