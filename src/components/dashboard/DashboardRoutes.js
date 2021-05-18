import { Route, Switch } from "react-router-dom";
import AuthRoutes from "../authentication/AuthRoutes";


const DashboardRouting = (props) => {
  return (
    <Switch>
      <Route component={AuthRoutes} />
    </Switch>
  );
};

export default DashboardRouting;
