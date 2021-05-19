import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/authentication/AuthServices";

export const UnProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
             isLoggedIn() ? <Redirect to="/dashboard" /> : <Component {...props} />
        }
    />
);