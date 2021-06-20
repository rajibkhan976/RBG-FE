import React from "react";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import Automation from "./automationLists/Automation";
import { history } from "../../helpers";

const AutomationRoutes = (props) => {
  return (
    <React.Fragment>
      <ProtectedRoute path={["/automation-list", "/automation-builder", "/automation-details"]} component={Automation}/>
    </React.Fragment>
  );
}

export default AutomationRoutes;
