import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UnProtectedRoute } from "./middleware/UnProtectedRoute";
import { ProtectedRoute } from "./middleware/ProtectedRoute";
import DashboardRoutes from "./components/dashboard/DashboardRoutes";

import Login from "./components/authentication/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

const Routes = () => {
  const logState = useSelector((state) => state.auth.isLoggedIn);

  return (
    <React.Suspense fallback={<div />}>
      <Switch>
        {logState ? (
          <UnProtectedRoute
            exact
            path={["/", "/login"]}
            component={() => <Redirect to="/dashboard" />}
          />
        ) : (
          <UnProtectedRoute exact path="/" component={Login} />
        )}
        <UnProtectedRoute
          exact
          path="/login"
          component={() => {
            console.log("Login CALLLL ");
            return <Login />;
          }}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={() => {
            console.log("Dashboard CALLLL ");
            return <Dashboard />;
          }}
        />
        <Route component={DashboardRoutes} />
      </Switch>
    </React.Suspense>
  );
};

export default Routes;