import React, {useState} from "react";
import { Route } from "react-router-dom";
import AuthRoutes from "../authentication/AuthRoutes";
import AutomationRoutes from "../automation/AutomationRoutes";
import ContactRoutes from "../contact/ContactRoutes";
import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import NotFound from "../shared/NotFound";
import Dashboard from "./Dashboard";

const DashboardRouting = (props) => {

  return (
    <React.Fragment>
      <InnerLeftMenu routeMenu="dashboard"/>
      <div className="dashboardElComponent">
       
        <div className="dashInnerStructure dashboardPage">
          <Dashboard/>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardRouting;
