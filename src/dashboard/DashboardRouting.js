import { Route, Switch, Redirect } from "react-router-dom";
import UserControls from "./userControls";
import Automation from "./automation";
import ContactsComponent from "./contacts";

const DashboardRouting = () => {
  return (
    <div className="dashboardView">
      <Switch>
        <Redirect exact from="/" to="/user-controls" />
        <Route exact path="/user-controls" component={UserControls} />
        <Route exact path="/automation" component={Automation} />
        <Route exact path="/contacts" component={ContactsComponent} />
      </Switch>
    </div>
  );
};

export default DashboardRouting;
