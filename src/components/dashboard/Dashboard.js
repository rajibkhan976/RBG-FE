import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import DashboardControls from "./DashboardControl";
import DashboardFooter from "../shared/FooterDashboard";
import Dash1 from '../../../src/assets/images/dash1.svg';
import Dragable from '../../../src/assets/images/dragable.svg';
import arrowDown from "../../../src/assets/images/arrowDown.svg";
import dashMain from "../../../src/assets/images/dashboardMain.svg";
import upGraph from "../../../src/assets/images/upGraph.svg";
import chart from "../../../src/assets/images/chart.svg";

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
      {/* <a href="javascript:void(0)" target="_blank"> */}
        {/* https://xd.adobe.com/view/3e68ffa8-df37-4768-8446-0f7de594fdf4-6b3b/screen/70c06959-7b7a-469e-9e62-73ea48cc35a3?fullscreen */}
        {/* <span className="prototypeBatch">Prototype</span> */}
        {/* <h1>Dashboard</h1> */}
      {/* </a> */}
      {/* {loggedInUser && loggedInUser.isAssociationOwner ? <div className="userListBody">
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
      </div> : ''} */}

      <div className="mrrWraper">
        {/* <div className="userListHead"> */}
          <h2 className="inDashboardHeader">Dashboard</h2>
          <p className="userListAbout">Get a clear view of your task</p>
          {/* </div> */}
        <div className="widgetWrapers">
          <div className="individualWidgwet">
            <div className="widhetInfoWraper">
              <div className="widgetIcon">
                <img src={Dash1} /> 
                <h3>Monthly Recurring Revenue Growth</h3>
                <figure>
                  <img src ={Dragable} className="dragable" />
                </figure>
              </div>
              <div className="formField w-100 dashboardWidgets formControl">
                  <select
                      style={{
                          backgroundImage: "url(" + arrowDown + ")",
                      }}>
                      <option value="">September</option>
                      
                  </select>
              </div>
              <div className="currentRevenueWraprt">
                  <img src={dashMain} className="currentRevinueIcon" alt="" />
                  <div className="currentRevInfo">
                    <h3>$45,000</h3>
                    <p>Total Revenue for this month</p>
                  </div>
                  <div className="projectedValue">
                    <p>Projected Value</p>
                    <h4>$50,000</h4>
                  </div>
              </div>
              <div className="previousRevenueWraper">
                <img src={upGraph} alt="" />
                <div className="previousRevenueInfo">
                  <h4>$40,000</h4>
                  <p>Revenue for the previous month</p>
                  <span className="previousMonth">August, 2021</span>
                </div>
              </div>
            </div>
          </div>

          <div className="individualWidgwet">
            <div className="widhetInfoWraper">
            <div className="widgetIcon">
                <img src={chart} /> 
                <h3>Monthly Recurring Revenue Growth (Set)</h3>
                <button class="creatUserBtn"><span>Set Goal</span></button>
                <figure>
                  <img src ={Dragable} className="dragable" />
                </figure>
              </div>
              <div className="formField w-100 dashboardWidgets formControl revenueGoals">
                  <select
                      style={{
                          backgroundImage: "url(" + arrowDown + ")",
                      }}>
                      <option value="">September</option>
                      
                  </select>
              </div>
              <p className="goalsInfo">Active Goal</p>
              <div className="barStatus">
                <progress class="progress1" value="43" max="100"></progress> 100
              </div>
              <div className="gymMemberWraper">
                <div className="gymMembersInfos">

                </div>

                <div className="gymMembersInfos">
                  
                </div>
              </div>  
              
            </div>
          </div>
          <div className="individualWidgwet"></div>

          <div className="individualWidgwet"></div>
          <div className="individualWidgwet"></div>
          <div className="individualWidgwet"></div>
        </div>
        <DashboardFooter />
        </div>
       <div className="mrrContraolsWraper">
           <div className="sideMenuHeader">
            <h3>Controls</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
         
         <DashboardControls />

        </div> 
        </div>
    </>
  );
};

export default Dashboard;
