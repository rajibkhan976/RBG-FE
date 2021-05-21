import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/authentication/AuthServices";
import Login from "../components/authentication/login/Login";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isLoggedIn() ? (
                <React.Fragment>
                    <Component {...props} params={props.match}/>
                </React.Fragment>
            ) : (
                <Redirect to="/login" component={Login} />
            )
        }
    />
);