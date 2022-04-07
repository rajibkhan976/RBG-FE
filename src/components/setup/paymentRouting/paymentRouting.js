import React, { useEffect, useState } from "react";
import {Route } from "react-router-dom";

import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
// import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import PaymentSetup from "./paymentSetup";



const PaymentRouting = (props) => {
  document.title = "Red Belt Gym - Payment Setup";
//   const [isLoader, setIsLoader] = useState(false);
//   const [randomID, setRandomID] = useState(Math.random().toString());
  const renderID = (randomID) => {
      console.log("Random ID", randomID);
  }
  
  return (
        <>
            <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
            <div className="dashboardElComponent">
                {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
                <div className="dashInnerStructure">
                <Route path="/payment-setup" component={PaymentSetup} />
                <DashboardFooter />
                </div>
            </div>
        </>  
    )
};

export default PaymentRouting;
