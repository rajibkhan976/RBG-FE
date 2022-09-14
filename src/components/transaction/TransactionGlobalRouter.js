import React, {useState} from "react";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import TransactionGlobal from "./TransactionGlobal";
import DashboardFooter from "../shared/FooterDashboard"

const TransactionGlobalRouter = (props) => {

  return (
    <React.Fragment>
      {/* <InnerLeftMenu routeMenu="appointmentGlobal"/> */}
      <div className="dashboardElComponent">       
        <div className="dashInnerStructure appointmentGlobalPage">
          <TransactionGlobal/>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TransactionGlobalRouter;
