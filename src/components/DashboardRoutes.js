import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import UserControls from "./authentication/AuthRoutes";
import Automation from "./automation/AutomationRoutes";
import ContactsComponent from "./contacts";

const DashboardRouting = (props) => {
  useEffect(() => {
    
  });

  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/user-controls" />
        <Route path="/user-controls">
          <UserControls  />
        </Route>
        <Route path="/automation">
          <Automation />
        </Route>
        <Route path="/contacts">
          <ContactsComponent />
        </Route>
      </Switch>
    </>
  );
};

export default DashboardRouting;
