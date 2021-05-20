import React from "react";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import Automation from "./automationLists/Automation";


const AutomationRoutes = (props) => {
  return (
    <React.Fragment>
      <ProtectedRoute path={["/automation-list", "/automation-builder", "/automation-details"]} component={Automation} />
    </React.Fragment>
  );
}

export default AutomationRoutes;
