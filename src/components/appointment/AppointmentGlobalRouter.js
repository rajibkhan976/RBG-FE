import React, {useState} from "react";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import AppointmentGlobal from "./AppointmentGlobal";
import DashboardFooter from "../shared/FooterDashboard"

const AppointmentGlobalRouting = (props) => {

  return (
    <React.Fragment>
      {/* <InnerLeftMenu routeMenu="appointmentGlobal"/> */}
      <div className="dashboardElComponent">       
        <div className="dashInnerStructure appointmentGlobalPage">
          <AppointmentGlobal/>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppointmentGlobalRouting;
