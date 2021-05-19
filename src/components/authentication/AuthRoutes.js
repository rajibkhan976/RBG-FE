import React from "react";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import Roles from "./roles/Roles";
import Groups from "./groups/Groups";
import Users from "./users/Users";

const AuthRoutes = (props) => {
  return (
    <React.Fragment>
      <ProtectedRoute exact path="/roles" component={Roles} />
      <ProtectedRoute exact path="/groups" component={Groups} />
      <ProtectedRoute exact path="/users" component={Users} />
    </React.Fragment>
  );
}

export default AuthRoutes;
