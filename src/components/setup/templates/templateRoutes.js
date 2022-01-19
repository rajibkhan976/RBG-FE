import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import InnerLeftMenu from "../../shared/InnerLeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import AudioListing from "./audio/AudioListing";
import EmailTemplate from "./email/emailTemplate";
import SmsTemplate from "./sms/smsTemplate";

const TemplateRoutes = (props) => {
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
           <Route path="/email-template" component={EmailTemplate} />
          {/* <Route
            path="/roles"
            render={(props) => <Roles key={randomID} {...props} />}
          /> */}
          <Route path="/sms-template" component={SmsTemplate} />
          <Route path="/audio-template" component={AudioListing} />
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TemplateRoutes;
