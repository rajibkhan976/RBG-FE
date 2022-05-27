import React, {useState} from "react";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import AttendanceGlobal from "./AttendanceGlobal";
import DashboardFooter from "../shared/FooterDashboard"

const AttendanceGlobalRouting = (props) => {

  return (
    <React.Fragment>
      {/* <InnerLeftMenu routeMenu="appointmentGlobal"/> */}
      <div className="dashboardElComponent">       
        <div className="dashInnerStructure attendanceGlobalPage">
          <AttendanceGlobal/>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AttendanceGlobalRouting;
