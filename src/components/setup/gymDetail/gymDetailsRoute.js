import React, {useState} from "react";
import {Route } from "react-router-dom";

import InnerLeftMenu from "../../shared/InnerLeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import GymDetails from "./gymDetails";


const GymDetailsRouter = (props) => {
    const [randomID, setRandomID] = useState(Math.random().toString());
    const renderID = (randomID) => {
        console.log("Random ID", randomID);
    }
    return (
        <React.Fragment>
            <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
            <div className="dashboardElComponent">
                {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
                <div className="dashInnerStructure">
                <Route path="/gym-details" component={GymDetails} />
                <DashboardFooter />
                </div>
            </div>
        </React.Fragment>
    );
}
export default GymDetailsRouter;