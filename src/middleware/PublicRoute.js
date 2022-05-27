import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/authentication/AuthServices";

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => <Component {...props} />   }
    />
);