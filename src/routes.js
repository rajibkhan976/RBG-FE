import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UnProtectedRoute } from "./middleware/UnProtectedRoute";
import { ProtectedRoute } from "./middleware/ProtectedRoute";
import { isLoggedIn } from "./services/authentication/AuthServices";
import MainComponent from './components/MainComponent'

import Login from "./components/authentication/login/Login";
import ForgetPassword from "./components/authentication/resetPassword/ForgetPassword";
import ResetPassword from "./components/authentication/resetPassword/ResetPassword";
import AuthActions from "./actions/AuthActions";

const Routes = () => {
  const logState = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  if (!isLoggedIn()) {
    // dispatch(AuthActions.logout());
  }
  console.log("Log State", logState);
  return (
    <React.Suspense fallback={<div />}>
      <Switch>
        {logState ? (
          <UnProtectedRoute
            exact
            path="/login"
            component={() => <Redirect to="/" />}
          />
        ) : (
          <UnProtectedRoute exact path="/login" component={Login} />
        )}
        <UnProtectedRoute
          exact
          path="/login"
          component={() => {
            console.log("Login CALLLL ");
            return <Login />;
          }}
        />
        <UnProtectedRoute
          exact
          path="/forgot-password"
          component={() => {
            console.log("Forget Password call");
            return <ForgetPassword />;
          }}
        />
        <UnProtectedRoute
          exact
          path="/reset-password/*"
          component={() => {
            console.log("Reset Password call");
            return <ResetPassword />;
          }}
        />
        <ProtectedRoute
          exact
          path="/"
          component={() => {
            console.log("Dashboard CALLLL ");
            return <MainComponent />;
          }}
        />
        <ProtectedRoute path="/" component={MainComponent} />
      </Switch>
    </React.Suspense>
  );
};

export default Routes;