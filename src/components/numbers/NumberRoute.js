import React from "react";
import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import NumberListing from "./NumberListing";

const NumberRouting = (props) => {
  document.title = "Red Belt Gym - Number management";
  return (
    <React.Fragment>
      <InnerLeftMenu routeMenu="setup"/>
      {/* <div className="dashboardElComponent full"> */}
      <div className="dashboardElComponent">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <NumberListing/>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NumberRouting;