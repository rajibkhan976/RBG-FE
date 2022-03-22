import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import DashboardControls from "./DashboardControl";

import DashboardImg from "../../assets/images/Dashboard.jpg";
import DashboardImg2 from "../../assets/images/Dashboard.png";
import arrowLong from "../../assets/images/arrowLong.png";


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
    <div className="dashInnerUI">
      <a href="javascript:void(0)" target="_blank">
        {/* https://xd.adobe.com/view/3e68ffa8-df37-4768-8446-0f7de594fdf4-6b3b/screen/70c06959-7b7a-469e-9e62-73ea48cc35a3?fullscreen */}
        {/* <span className="prototypeBatch">Prototype</span> */}
        {/* <h1>Dashboard</h1> */}
      </a>
      {loggedInUser && loggedInUser.isAssociationOwner ? <div className="userListBody">
        <div className="listBody">
          <ul className="tableListing">
            <li className="listHeading userRole">
              <div className="userName ">Organization Name</div>
              <div className="phoneNum assignedPeople ">Active Member</div>
            </li>
            <li className="owerInfo userRole">
              <div className="userName">
                <button className="btn"><p>Tier5 martial arts</p></button>
              </div>
              <div className="phoneNum">
                <button className="btn">2</button>
              </div>
            </li>
          </ul>
        </div>
      </div> : ''}

      {/* <div className="mrrWraper">
        <h2 className="inDashboardHeader">Dashboard</h2>
        <p className="userListAbout">Get a clear view of your task</p>
        </div> */}

        <div className="dashboardWraperImg">
         <img src={DashboardImg2} className="dashboardimg" alt="" />
         {/* <div className="arrowPoint">
           <img src={arrowLong} alt="" />
         </div> */}

        </div>
        {/* <div className="mrrContraolsWraper"> */}
          {/* <div className="sideMenuHeader">
            <h3>Controls</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div> */}
         
         {/* <DashboardControls /> */}

        {/* </div> */}
        </div>
    </>
  );
};

export default Dashboard;
