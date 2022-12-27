import React, { useEffect, useState } from "react";
import CommunicationLog from "./CommunicationLog";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import { Route, Switch, useLocation } from "react-router-dom";
import DashboardFooter from "../shared/FooterDashboard";
import NotFound from "../shared/NotFound"; 
import "../../assets/css/communicationLog.css";


const CommunicationLogRoutes = (props) => {
	return (
		<React.Fragment>
		{/* <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="communicationLog"/> */}
		<div className="dashboardElComponent">
		  {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
		  <div className="dashInnerStructure">
			<Switch>
			  <Route exact path={"/communicationLog"} component={CommunicationLog} />
			 
			</Switch>
			<DashboardFooter />
		  </div>
		</div>
	  </React.Fragment>
	);
};

export default CommunicationLogRoutes;
