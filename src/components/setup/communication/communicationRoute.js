import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import InnerLeftMenu from "../../shared/InnerLeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import CallSetup from "./call/callSetup";
import SmsSetup from "./sms/smsSetup";
import EmailSetup from "./email/emailSetup";

const CommunicationRoutes = (props) => {
  const [randomID, setRandomID] = useState(Math.random().toString());
  const renderID = (randomID) => {
    console.log("Random ID", randomID);
  }
  return (
    <React.Fragment>
      <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
      <div className="dashboardElComponent">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Route path="/call-setup" component={CallSetup} />
          {/* <Route
            path="/roles"
            render={(props) => <Roles key={randomID} {...props} />}
          /> */}
          <Route path="/sms-setup" component={SmsSetup} />
          <Route path="/email-setup" component={EmailSetup} />
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CommunicationRoutes;
