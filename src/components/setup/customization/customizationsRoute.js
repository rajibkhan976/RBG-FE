import React, { useEffect, useState } from "react";
import {Route } from "react-router-dom";

import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import Customizations from "./customizations";



const CustomizationRouter = (props) => {
  document.title = "Red Belt Gym - Customization";
  const [isLoader, setIsLoader] = useState(false);
  const [randomID, setRandomID] = useState(Math.random().toString());
  const renderID = (randomID) => {
      console.log("Random ID", randomID);
  }
  //const [filteredData, setFilteredData] = useState(null);
  return (
        <>
        <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
            <div className="dashboardElComponent">
                {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
                <div className="dashInnerStructure">
                <Route path="/customizations" component={Customizations} />
                <DashboardFooter />
                </div>
            </div>
        </>  
    )
};

export default CustomizationRouter;
