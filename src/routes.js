import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UnProtectedRoute } from "./middleware/UnProtectedRoute";
import { ProtectedRoute } from "./middleware/ProtectedRoute";
import { PublicRoute } from "./middleware/PublicRoute";
import { isLoggedIn } from "./services/authentication/AuthServices";
import MainComponent from './components/MainComponent'

import Login from "./components/authentication/login/Login";
import ForgetPassword from "./components/authentication/resetPassword/ForgetPassword";
import ResetPassword from "./components/authentication/resetPassword/ResetPassword";
import MemberComponent from "./components/MemberComponent"
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./components/termsAndConditions/TermsAndConditions";

const Routes = () => {
  const logState = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  if (!isLoggedIn()) {
    // dispatch(AuthActions.logout());
  }
  return (
    <React.Suspense fallback={<div />}>
      <Switch>
        {console.log("Loging state::::::::", logState)}
        {logState ? (
          <UnProtectedRoute
            exact
            path="/login"
            component={() => <Redirect to="/" />}
          />
        ) : ""}
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
        <PublicRoute
          exact
          path="/check-in-portal"
          component={() => {
            console.log("Reset Password call");
            return <MemberComponent />;
          }}
        /> 
        <PublicRoute
          exact
          path="/privacy-policy"
          component={() => {
            console.log('hhhhhhhhhhh')
            return <PrivacyPolicy />;
          }}
        />
        <PublicRoute
          exact
          path="/terms-and-conditions"
          component={() => {
            return <TermsAndConditions />;
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