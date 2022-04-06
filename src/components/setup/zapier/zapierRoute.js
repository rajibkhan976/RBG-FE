import React, {useState} from "react";
import {Route } from "react-router-dom";

import InnerLeftMenu from "../../shared/InnerLeftMenu";
import DashboardFooter from "../../shared/FooterDashboard";
import Zapier from "./zapier";


const ZapierRouter = (props) => {
    const renderID = (randomID) => {
        console.log("Random ID", randomID);
    }
    return (
        <React.Fragment>
            <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
            <div className="dashboardElComponent">
                <div className="dashInnerStructure">
                    <Route path="/zapier" component={Zapier} />
                    <DashboardFooter />
                </div>
            </div>
        </React.Fragment>
    );
}

export default ZapierRouter;