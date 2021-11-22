import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Roles from "./roles/Roles";
import Groups from "./groups/Groups";
import Users from "./users/Users";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";

const AuthRoutes = (props) => {
  const [randomID, setRandomID] = useState(Math.random().toString());
  const renderID = (randomID) => {
    console.log("Random ID", randomID);
  }
  return (
    <React.Fragment>
      <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="auth" reRender={(id) => renderID(id)} />
      <div className="dashboardElComponent">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Route path="/roles" component={Roles} />
          {/* <Route
            path="/roles"
            render={(props) => <Roles key={randomID} {...props} />}
          /> */}
          <Route path="/groups" component={Groups} />
          <Route path="/users" component={Users} />
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthRoutes;
