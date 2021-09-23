import React from "react";
import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import NumberListing from "./NumberListing";

const NumberRouting = (props) => {

  return (
    <React.Fragment>
      {/* <InnerLeftMenu routeMenu="dashboard"/> */}
      <div className="dashboardElComponent full">
        <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} />
        <div className="dashInnerStructure">
          <NumberListing/>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NumberRouting;