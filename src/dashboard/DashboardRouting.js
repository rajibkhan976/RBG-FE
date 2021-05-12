import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import UserControls from "./userControls";
import Automation from "./automation";
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
