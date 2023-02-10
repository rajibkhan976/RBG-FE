import React from "react";

import plus_icon from "../../assets/images/plus_icon.svg";

const Attendancehead = (props) => {
  return (
    <div className="userListHead">
      <div className="listInfo">
        {/* <ul className="listPath">
          <li>Setup</li>
          <li>Global Calendar</li>
        </ul> */}
        <h2 className="inDashboardHeader">Attendance</h2>
        <p className="userListAbout">
          Manage and Create Upcoming Appointment for your Organization  
        </p>
      </div>
    </div>
  );
};

export default Attendancehead;
