import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserControls from "./userControls";
import Automation from "./automation";
import ContactsComponent from "./contacts";

const DashboardRouting = (props) => {
  let [linkHovered, setLinkHovered] = useState('/user-controls');
  useEffect(() => {
    setLinkHovered(props.hoveredLink);
  });

  return (
    <div className="dashboardView">
      <Switch>
        <Redirect exact from="/" to="/user-controls" />
        <Route path="/user-controls">
          <UserControls linkHovered={linkHovered} />
        </Route>
        <Route path="/automation">
          <Automation linkHovered={linkHovered} />
        </Route>
        <Route path="/contacts">
          <ContactsComponent linkHovered={linkHovered} />
        </Route>
      </Switch>
    </div>
  );
};

export default DashboardRouting;
