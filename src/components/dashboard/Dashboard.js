import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import DashboardControls from "./DashboardControl";


const Dashboard = () => {

  const [createButton, setCreateButton] = useState(null);
  const loggedInUser = useSelector((state) => state.user.data);
  
  useEffect(() => {
    document.title = "Red Belt Gym - Dashboard"
  });


  const toggleCreate = (e) => {
    console.log("DASHBOARD STRUCTURE:::", createButton);
    setCreateButton(e);
  };


  return (
    <>
      <a href="javascript:void(0)" target="_blank">
        {/* https://xd.adobe.com/view/3e68ffa8-df37-4768-8446-0f7de594fdf4-6b3b/screen/70c06959-7b7a-469e-9e62-73ea48cc35a3?fullscreen */}
        {/* <span className="prototypeBatch">Prototype</span> */}
        {/* <h1>Dashboard</h1> */}
      </a>
      {loggedInUser && loggedInUser.isAssociationOwner ? <div className="userListBody">
        <div className="listBody">
          <ul className="tableListing">
            <li class="listHeading userRole">
              <div class="userName ">Organization Name</div>
              <div class="phoneNum assignedPeople ">Active Member</div>
            </li>
            <li className="owerInfo userRole">
              <div class="userName">
                <button class="btn"><p>Tier5 martial arts</p></button>
              </div>
              <div class="phoneNum">
                <button class="btn">2</button>
              </div>
            </li>
          </ul>
        </div>
      </div> : ''}

      <div className="mrrWraper">
        <h2 className="inDashboardHeader">Dashboard</h2>
        <p className="userListAbout">Get a clear view of your task</p>
        </div>
        <div className="mrrContraolsWraper">
          <div className="sideMenuHeader">
            <h3>Controls</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
         
         <DashboardControls />

        </div>
    </>
  );
};

export default Dashboard;
