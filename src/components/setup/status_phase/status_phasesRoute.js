import React, { useEffect, useState } from "react";
import {Route } from "react-router-dom";

import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import DashboardFooter from "../../shared/FooterDashboard";
import StatusPhases from "./status_phases";


const StatusPhasesRouter = (props) => {
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
                  <Route path="/phases-status" component={StatusPhases} />
                  <DashboardFooter />
                  </div>
              </div>
          </>  
      )
};

export default StatusPhasesRouter;
