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
import dc from "../../../src/assets/images/dc.svg";
import dashCal from "../../../src/assets/images/dashCal.svg";

import GoalSetModal from "./goalSetModal";


import arrow1 from "../../assets/images/arrow1.svg";
import DashboardImg from "../../assets/images/Dashboard.jpg";
import DashboardImg2 from "../../assets/images/Dashboard.png";
import arrowLong from "../../assets/images/arrowLong.png";
import Loader from "../shared/Loader";


import month from "../../assets/images/month.svg";
import uparrow_icon_grey from "../../assets/images/uparrow_icon_grey.svg";
//import arrowLong from "../../assets/images/arrowLong.svg";
import filter from "../../assets/images/filter.svg";

import info_3dot_icon from "../../assets/images/info_3dot_icon.svg";

const Dashboard = () => {

   const [isModal, setIsModal] = useState(false);
     const openModal = () => {
       setIsModal(true);
     }
     const hideModal = () => {
         setIsModal(false);
     }

  const [createButton, setCreateButton] = useState(null);
  const loggedInUser = useSelector((state) => state.user.data);
  
  const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
  
  const [assocOwnerData, setAssocOwnerData] = useState([
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    },
    {
      "name"  : "Gym Association" ,
      "activeMember" : "999",
      "reveneu"   : "989987"
    }
  ]);
  const [option, setOption] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [openMonthDrop, setOpenMonthDrop] = useState(false);
  
  
  useEffect(() => {
    document.title = "Red Belt Gym - Dashboard"
  });


  const toggleCreate = (e) => {
    console.log("DASHBOARD STRUCTURE:::", createButton);
    setCreateButton(e);
  };
  const openFilterModal = () => {
    setProdFilterModalStatus(true);
  };

  const closeFilterModal = () => {
    setProdFilterModalStatus(false);
  }
  const toogleActionList = (index) => {
    setOption(index !== option ? index : null);
  };
  
  const openDropHanler = () => {
    setOpenMonthDrop(!openMonthDrop);
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
              <div class="activemember assignedPeople ">Active Member</div>
            </li>
            <li className="owerInfo userRole">
              <div class="userName">
                <button class="btn"><p>Tier5 martial arts</p></button>
              </div>
              <div class="activemember">
                <button class="btn">2</button>
              </div>
            </li>
          </ul>
        </div>
      </div> : ''} */}
    
      {/* {//original design here.................................................................................................................................} */}
       <div className="mrrWraper">
       
          <h2 className="inDashboardHeader">Dashboard</h2>
          <p className="userListAbout">Get a clear view of your task</p>
      
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
                <button class="creatUserBtn" onClick={() =>openFilterModal()}><span>Set Goal</span></button>
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
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">560</h4>
                  </div>
                  <p className="monthlyMemberPara">Previous month <br />gymmembers</p>
                  <p className="monthDetails">August 2021</p>
                </div>

                <div className="gymMembersInfos">
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">760</h4>
                    <div className="monthlyProfitLoss profit">
                      <div class="arrow-up profit"></div>
                      <p>7.8%</p>
                    </div>
                  </div>
                  <p className="monthlyMemberPara">Present month <br />gymmembers</p>
                  <p className="monthDetails">September 2021</p>
                </div>
              </div>  
              
            </div>
          </div>
          <div className="individualWidgwet">
            <div className="widhetInfoWraper">
            <div className="widgetIcon">
                <img src={chart} /> 
                <h3>Monthly Recurring Revenue Growth (Showed)</h3>
                <button class="creatUserBtn" onClick={() =>openFilterModal()}><span>Set Goal</span></button>
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
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">560</h4>
                  </div>
                  <p className="monthlyMemberPara">Previous month <br />gymmembers</p>
                  <p className="monthDetails">August 2021</p>
                </div>

                <div className="gymMembersInfos">
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">760</h4>
                    <div className="monthlyProfitLoss profit">
                      <div class="arrow-up profit"></div>
                      <p>7.8%</p>
                    </div>
                  </div>
                  <p className="monthlyMemberPara">Present month <br />gymmembers</p>
                  <p className="monthDetails">September 2021</p>
                </div>
              </div>  
              
            </div>
          </div>

          <div className="individualWidgwet">
            <div className="widhetInfoWraper">
            <div className="widgetIcon">
                <img src={chart} /> 
                <h3>Monthly Recurring Revenue Growth (Signed)</h3>
                <button class="creatUserBtn" onClick={() =>openFilterModal()}><span>Set Goal</span></button>
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
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">560</h4>
                  </div>
                  <p className="monthlyMemberPara">Previous month <br />gymmembers</p>
                  <p className="monthDetails">August 2021</p>
                </div>

                <div className="gymMembersInfos">
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">760</h4>
                    <div className="monthlyProfitLoss profit">
                      <div class="arrow-up profit"></div>
                      <p>7.8%</p>
                    </div>
                  </div>
                  <p className="monthlyMemberPara">Present month <br />gymmembers</p>
                  <p className="monthDetails">September 2021</p>
                </div>
              </div>  
              
            </div>
          </div>
          <div className="individualWidgwet">
            <div className="widhetInfoWraper">
            <div className="widgetIcon">
                <img src={dashCal} /> 
                <h3>Monthly Appointment Statistics</h3>
                <button class="creatUserBtn" onClick={() =>openFilterModal()}><span>Set Goal</span></button>
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
                <progress class="progress2" value="29" max="100"></progress> 100
              </div>
              <div className="gymMemberWraper">
                <div className="gymMembersInfos">
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">20,365</h4>
                  </div>
                  <p className="monthlyMemberPara">Previous month <br />gymmembers</p>
                  <p className="monthDetails">August 2021</p>
                </div>

                <div className="gymMembersInfos">
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">19,369</h4>
                    <div className="monthlyProfitLoss loss">
                      <div class="arrow-up loss"></div>
                      <p>7.8%</p>
                    </div>
                  </div>
                  <p className="monthlyMemberPara">Present month <br />gymmembers</p>
                  <p className="monthDetails">September 2021</p>
                </div>
              </div>  
              
            </div>
          </div>
          <div className="individualWidgwet">
            <div className="widhetInfoWraper">
            <div className="widgetIcon">
                <img src={chart} /> 
                <h3>Monthly Recurring Revenue Growth (Showed)</h3>
                <button class="creatUserBtn" onClick={() =>openFilterModal()}><span>Set Goal</span></button>
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
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">560</h4>
                  </div>
                  <p className="monthlyMemberPara">Previous month <br />gymmembers</p>
                  <p className="monthDetails">August 2021</p>
                </div>

                <div className="gymMembersInfos">
                  <div className="monthlyMembers">
                    <img src={dc} />
                    <h4 className="monthlyMemberHeading">760</h4>
                    <div className="monthlyProfitLoss profit">
                      <div class="arrow-up profit"></div>
                      <p>7.8%</p>
                    </div>
                  </div>
                  <p className="monthlyMemberPara">Present month <br />gymmembers</p>
                  <p className="monthDetails">September 2021</p>
                </div>
              </div>  
              
            </div>
          </div>
        </div>
        <DashboardFooter />
        </div>
       <div className="mrrContraolsWraper">
           <div className="sideMenuHeader">
            <h3>Controls</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
         
         <DashboardControls />
         {(prodFilterModalStatus === true) &&
          <GoalSetModal 
            closeModal={closeFilterModal}
        
         />
         }
         
        </div>  

        {/* {//association owner type1 design here.................................................................................................................................} */}
           {/* <div className="accosiationDashboard" >
            {isLoader ? <Loader /> : ''}
            <div className="contactHead">
                  <div className="userListHead">
                      <div className="listInfo">    
                          <h2 className="inDashboardHeader">Dashboard</h2>
                          <p className="userListAbout">Lorem ispum dolar sit</p>
                      </div>
                      <div className="listFeatures">
                        <div className="realative">
                            <button className="searchBar formControl association" onClick={openDropHanler}>
                                <img className="monthIcons" src={month} alt=""/>
                                <span>Month</span>
                                <div className="arrow"><img src={arrow1} alt=""/></div>
                            </button>
                            { openMonthDrop &&
                                <ul className="timeSpanDropDown">
                                <li>
                                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="monthIcons">
                                      <path d="M13.8771 2.40328H12.1951V0.988281H10.7951V2.40328H5.18309V0.988281H3.78309V2.40328H2.11809C1.82052 2.40328 1.53514 2.52149 1.32472 2.73191C1.1143 2.94232 0.996094 3.22771 0.996094 3.52528V13.8883C0.995963 14.0357 1.02489 14.1817 1.08121 14.318C1.13754 14.4542 1.22017 14.578 1.32437 14.6823C1.42857 14.7866 1.5523 14.8693 1.68849 14.9258C1.82468 14.9822 1.97067 15.0113 2.11809 15.0113H13.8771C14.0245 15.0113 14.1705 14.9822 14.3067 14.9258C14.4429 14.8693 14.5666 14.7866 14.6708 14.6823C14.775 14.578 14.8576 14.4542 14.914 14.318C14.9703 14.1817 14.9992 14.0357 14.9991 13.8883V3.52528C14.9991 3.22771 14.8809 2.94232 14.6705 2.73191C14.4601 2.52149 14.1747 2.40328 13.8771 2.40328ZM13.5971 13.6083H2.37909V6.59728H13.5971V13.6083ZM13.5971 5.19428H2.37909V3.78828H13.5971V5.19428Z"/>
                                  </svg>
                                   <button>Month</button>
                                </li> 
                                <li>
                                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="monthIcons">
                                      <path d="M13.8771 2.40328H12.1951V0.988281H10.7951V2.40328H5.18309V0.988281H3.78309V2.40328H2.11809C1.82052 2.40328 1.53514 2.52149 1.32472 2.73191C1.1143 2.94232 0.996094 3.22771 0.996094 3.52528V13.8883C0.995963 14.0357 1.02489 14.1817 1.08121 14.318C1.13754 14.4542 1.22017 14.578 1.32437 14.6823C1.42857 14.7866 1.5523 14.8693 1.68849 14.9258C1.82468 14.9822 1.97067 15.0113 2.11809 15.0113H13.8771C14.0245 15.0113 14.1705 14.9822 14.3067 14.9258C14.4429 14.8693 14.5666 14.7866 14.6708 14.6823C14.775 14.578 14.8576 14.4542 14.914 14.318C14.9703 14.1817 14.9992 14.0357 14.9991 13.8883V3.52528C14.9991 3.22771 14.8809 2.94232 14.6705 2.73191C14.4601 2.52149 14.1747 2.40328 13.8771 2.40328ZM13.5971 13.6083H2.37909V6.59728H13.5971V13.6083ZM13.5971 5.19428H2.37909V3.78828H13.5971V5.19428Z"/>
                                  </svg>
                                  <button>Year</button>
                                </li> 
                              </ul>
                            }
                            
                        </div>
                         
                          <button className="saveNnewBtn appExport expContactBtn"><img src={uparrow_icon_grey} alt=""/> Export</button>       
                      </div>
                  </div>
              </div>
              <div className="userListBody">
                <div className="listBody contactListingTable" >  
                    <ul className="tableListing">
                      <li className="listHeading ">
                          <div className="name ">Organization Name</div>
                          <div className="activemember">Active Member</div>
                          <div className="revenew ">Revenue </div>
                      </li>
                        {assocOwnerData.map((elem, key) => {
                            return (
                              <li key={key}>
                                  <div className="name">
                                      <button className="btn"><p>{elem.name}</p></button>
                                  </div>
                                  <div className="activemember">
                                      <button className="btn">{elem.activeMember}</button>
                                  </div>
                                  <div className="revenew">
                                      <button className="btn">{elem.reveneu}</button>
                                      <div className="info_3dot_icon"><button className="btn"  onClick={() => toogleActionList(key)}><img src={info_3dot_icon} alt=""/></button>
                                      </div>
                                      <div
                                            className={
                                              option === key
                                                ? "dropdownOptions listOpen"
                                                : "listHide"
                                            }
                                          >
                                            {" "}
                                           
                                            <button
                                              className="btn btnEdit"
                                            
                                            >
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 13.553 13.553"
                                                  className="editIcon"
                                                >
                                                  <g transform="translate(0.75 0.75)">
                                                    <path
                                                      className="a"
                                                      d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                                      transform="translate(-2 -2.795)"
                                                    ></path>
                                                    <path
                                                      className="a"
                                                      d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                                      transform="translate(-4.384 -2)"
                                                    ></path>
                                                  </g>
                                                </svg>
                                              </span>{" "}
                                              Edit
                                            </button>
                                            <button
                                              className="btn btnDelete"
                                             
                                            >
                                              <span>
                                                <svg
                                                  className="deleteIcon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="12.347"
                                                  height="13.553"
                                                  viewBox="0 0 12.347 13.553"
                                                >
                                                  <g transform="translate(0.75 0.75)">
                                                    <path
                                                      className="a"
                                                      d="M3,6H13.847"
                                                      transform="translate(-3 -3.589)"
                                                    />
                                                    <path
                                                      className="a"
                                                      d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                      transform="translate(-3.795 -2)"
                                                    />
                                                    <line
                                                      className="a"
                                                      y2="3"
                                                      transform="translate(4.397 6.113)"
                                                    />
                                                    <line
                                                      className="a"
                                                      y2="3"
                                                      transform="translate(6.397 6.113)"
                                                    />
                                                  </g>
                                                </svg>
                                              </span>
                                              Delete
                                            </button>
                                      </div>
                                  </div>
                              </li>
                            )
                          })
                        }

                      
                  </ul>
 
                </div>
              </div> 
              <div class="paginationOuter">
                <ul>
                  <li>
                    <button class="btn paginationBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" fill="#305671"></path>
                      </svg>
                    </button>
                  </li>
                  <li id="1">
                    <button class="btn paginationBtn" value="1">1</button>
                  </li>
                  <li id="2"><button class="btn paginationBtn" value="2">2</button></li>
                  <li id="3">
                      <button class="btn paginationBtn" value="3">3</button>
                  </li>
                  <li id="4">
                    <button class="btn paginationBtn active" value="4">4</button>
                  </li>
                  <li id="5">
                    <button class="btn paginationBtn" value="5">5</button>
                    </li>
                   
                    <li>
                      <button class="btn paginationBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
                          <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#305671"></path>
            v           </svg>
                      </button></li></ul></div>
            </div>  */}

        {/* {//association owner type2 design here.................................................................................................................................} */}
          {/* <div className="accosiationDashboard" >
                    {isLoader ? <Loader /> : ''}
            <div className="contactHead">
                  <div className="userListHead">
                      <div className="listInfo">    
                          <h2 className="inDashboardHeader">Dashboard</h2>
                          <p className="userListAbout">Lorem ispum dolar sit</p>
                      </div>
                      
                  </div>
              </div>
              <div className="userListBody">
                <div className="listBody contactListingTable" >  
                    <ul className="tableListing">
                      <li className="listHeading userRole">
                          <div className="name type2">Organization Name</div>
                          <div className="activemember type2">Active Member</div>       
                      </li>
                        {assocOwnerData.map((elem, key) => {
                            return (
                              <li className="owerInfo userRole" key={key}>
                                  <div className="name">
                                      <button className="btn"><p>{elem.name}</p></button>
                                  </div>
                                  <div className="activemember">
                                      <button className="btn">{elem.activeMember}</button>
                                  </div>
                                 
                              </li>
                            )
                          })
                        }

                      
                  </ul>
 
                </div>
              </div> 
              <div class="paginationOuter">
                <ul>
                  <li>
                    <button class="btn paginationBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" fill="#305671"></path>
                      </svg>
                    </button>
                  </li>
                  <li id="1">
                    <button class="btn paginationBtn" value="1">1</button>
                  </li>
                  <li id="2"><button class="btn paginationBtn" value="2">2</button></li>
                  <li id="3">
                      <button class="btn paginationBtn" value="3">3</button>
                  </li>
                  <li id="4">
                    <button class="btn paginationBtn active" value="4">4</button>
                  </li>
                  <li id="5">
                    <button class="btn paginationBtn" value="5">5</button>
                    </li>
                   
                    <li>
                      <button class="btn paginationBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
                          <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#305671"></path>
            v           </svg>
                      </button></li></ul></div>
            </div>
           */}
            
        </div>
    </>
  );
};

export default Dashboard;
