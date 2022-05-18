import React from "react";

import plus_icon from "../../assets/images/plus_icon.svg";

const Appointmenthead = (props) => {
  return (
    <div className="userListHead">
      <div className="listInfo">
        <ul className="listPath">
          <li>Setup</li>
          <li>Global Calendar</li>
        </ul>
        <h2 className="inDashboardHeader">Appointment</h2>
        <p className="userListAbout">
        Manage and Create Upcoming Appointment for your Organization 
        </p>
      </div>

      <button className="creatUserBtn" onClick={()=>props.setCreateAppointmentModal(true)}>
        <img className="plusIcon" src={plus_icon} alt="" />
        <span>Create</span>
      </button>
    </div>
  );
};

export default Appointmenthead;
