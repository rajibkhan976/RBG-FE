import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import Roles from "./roles/Roles";
import Groups from "./groups/Groups";
import Users from "./users/Users";

const AuthRoutes = (props) => {
  return (
    <Switch>
      <ProtectedRoute exact path="/roles" component={Roles} />
      <ProtectedRoute exact path="/groups" component={Groups} />
      <ProtectedRoute exact path="/users" component={Users} />
    </Switch>
  );
}

export default AuthRoutes;
