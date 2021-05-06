import { Route } from "react-router-dom";

import UserControlsRoles from "./components/UserControlsRoles";
import UserControlsGroups from "./components/UserControlsGroups";
import UserControlsUsers from "./components/UserControlsUsers";

function UserControls(props) {
  return (
    <div className="dashboardElComponent">
      <Route strict path="/user-controls/roles" component={UserControlsRoles} />
      <Route
        strict
        path="/user-controls/groups"
        component={UserControlsGroups}
      />
      <Route strict path="/user-controls/users" component={UserControlsUsers} />
    </div>
  );
}

export default UserControls;
