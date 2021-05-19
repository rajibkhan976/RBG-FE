import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { UnProtectedRoute } from "./middleware/UnProtectedRoute";
import { ProtectedRoute } from "./middleware/ProtectedRoute";
import DashboardRoutes from "./components/dashboard/DashboardRoutes";

import Login from "./components/authentication/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

const Routes = () => {
  const [logState, setLogState] = useState(false);

  return (
    <React.Suspense fallback={<div />}>
      <Switch>
        {logState ? (
          <Route
            exact
            path="/"
            component={() => <Redirect to="/dashboard" />}
          />
        ) : (
          <Route exact path="/" component={() => <Redirect to="/login" />} />
        )}
        <UnProtectedRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route component={DashboardRoutes} />
      </Switch>
    </React.Suspense>
  );
};

export default Routes;